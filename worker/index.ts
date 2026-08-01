import {
  contactDeliveryPayload,
  readContactRequest,
  validateContactInput,
  type NormalizedContact,
// @ts-expect-error Wrangler and Node 22 type-stripping resolve the explicit TypeScript source extension.
} from "../lib/contact-request.ts";

type RateLimitBinding = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};

type KvBinding = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
};

type SendEmailBinding = {
  send(message: {
    to: string;
    from: string;
    replyTo?: string;
    subject: string;
    text: string;
  }): Promise<{ messageId: string }>;
};

type Env = {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  CONTACT_FORWARD_ENDPOINT?: string;
  CONTACT_FORWARD_SECRET?: string;
  CONTACT_EMAIL?: SendEmailBinding;
  CONTACT_EMAIL_FROM?: string;
  CONTACT_EMAIL_TO?: string;
  CONTACT_IDEMPOTENCY?: KvBinding;
  CONTACT_RATE_LIMITER?: RateLimitBinding;
  CONTACT_GLOBAL_RATE_LIMITER?: RateLimitBinding;
  STATUS_APP_URL?: string;
  STATUS_API_URL?: string;
};

const SITE_HOST = "certamaris.com";
const ONE_WEEK_CACHE = "public, max-age=604800, stale-while-revalidate=86400";
const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";
// Let Cloudflare cache the static HTML at the edge while browsers revalidate.
// This keeps warm-cache TTFB consistent across the route groups, including solutions.
const HTML_CACHE = "public, max-age=0, s-maxage=300, stale-while-revalidate=86400";
const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Frame-Options": "DENY",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${SITE_HOST}`) {
      url.hostname = SITE_HOST;
      return withHeaders(Response.redirect(url.toString(), 301), request);
    }

    // Permanent redirect: legacy industries route → canonical audience hub
    if (url.pathname === "/industries" || url.pathname === "/industries/") {
      url.pathname = "/who-we-serve";
      return withHeaders(Response.redirect(url.toString(), 301), request);
    }

    // Permanent redirect: legacy sample-platform → product demo hub
    if (url.pathname === "/sample-platform" || url.pathname === "/sample-platform/") {
      url.pathname = "/demo";
      return withHeaders(Response.redirect(url.toString(), 301), request);
    }

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        const response = json({ error: "Method not allowed." }, 405);
        response.headers.set("Allow", "POST");
        return withHeaders(response, request);
      }
      return withHeaders(await handleContact(request, env), request);
    }

    if (url.pathname === "/api/status") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        const response = json({ error: "Method not allowed." }, 405);
        response.headers.set("Allow", "GET, HEAD");
        return withHeaders(response, request);
      }
      return withHeaders(await handleStatus(env), request);
    }

    const assetRequest = rewriteRscRequest(request);
    const response = await env.ASSETS.fetch(assetRequest);
    return withHeaders(response, request);
  },
};

function rewriteRscRequest(request: Request): Request {
  const url = new URL(request.url);
  if (!url.searchParams.has("_rsc")) return request;

  const marker = "/__next.";
  const markerIndex = url.pathname.indexOf(marker);
  if (markerIndex > 0 && url.pathname.endsWith(".txt")) {
    const routePath = url.pathname.slice(0, markerIndex);
    url.pathname = routePath === "/" ? "/index.txt" : `${routePath}.txt`;
    return new Request(url.toString(), request);
  }

  return request;
}

async function withHeaders(response: Response, request: Request): Promise<Response> {
  const url = new URL(request.url);
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  headers.set("Content-Security-Policy", await contentSecurityPolicy(response));

  if (url.pathname.startsWith("/_next/static/")) {
    headers.set("Cache-Control", IMMUTABLE_CACHE);
  } else if (isStableAsset(url.pathname)) {
    headers.set("Cache-Control", ONE_WEEK_CACHE);
  } else if (url.pathname === "/api/contact") {
    headers.set("Cache-Control", "no-store");
  } else if (url.pathname === "/api/status") {
    headers.set("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=120");
  } else if (headers.get("content-type")?.includes("text/html")) {
    headers.set("Cache-Control", HTML_CACHE);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function isStableAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/brand/") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/og/") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png" ||
    pathname === "/apple-icon.png"
  );
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  const sourceKey = request.headers.get("cf-connecting-ip") || "unknown-source";

  try {
    if (!env.CONTACT_RATE_LIMITER || !env.CONTACT_GLOBAL_RATE_LIMITER) {
      return contactResponse(request, false, 503, requestId, "Contact protection is temporarily unavailable.");
    }
    const [sourceLimit, globalLimit] = await Promise.all([
      env.CONTACT_RATE_LIMITER.limit({ key: sourceKey }),
      env.CONTACT_GLOBAL_RATE_LIMITER.limit({ key: "contact-global" }),
    ]);
    if (!sourceLimit.success || !globalLimit.success) {
      const response = contactResponse(
        request,
        false,
        429,
        requestId,
        "Too many requests. Please wait before trying again.",
      );
      response.headers.set("Retry-After", "60");
      logContact(requestId, "unknown", "rate_limited", startedAt);
      return response;
    }
  } catch {
    logContact(requestId, "unknown", "rate_limit_error", startedAt, "rate_limit_unavailable");
    return contactResponse(request, false, 503, requestId, "Contact protection is temporarily unavailable.");
  }

  const parsed = await readContactRequest(request);
  if (!parsed.ok) return contactResponse(request, parsed.nativeForm, parsed.status, requestId, parsed.error);

  const validated = validateContactInput(parsed.input);
  if (!validated.ok) return contactResponse(request, parsed.nativeForm, 400, requestId, validated.error);
  if (validated.honeypot) return contactResponse(request, parsed.nativeForm, 200, requestId);

  const contact = validated.contact;
  const idempotencyKey = contact.idempotencyKey || (await derivedIdempotencyKey(contact));
  const storageKey = `contact:${idempotencyKey}`;

  if (!env.CONTACT_IDEMPOTENCY) {
    logContact(requestId, contact.intent, "idempotency_error", startedAt, "kv_binding_unavailable");
    return contactResponse(request, parsed.nativeForm, 503, requestId, "Contact delivery is temporarily unavailable.");
  }

  let existing: string | null;
  try {
    existing = await env.CONTACT_IDEMPOTENCY.get(storageKey);
  } catch {
    logContact(requestId, contact.intent, "idempotency_error", startedAt, "kv_read_failed");
    return contactResponse(request, parsed.nativeForm, 503, requestId, "Contact delivery is temporarily unavailable.");
  }
  if (existing?.startsWith("delivered:")) {
    logContact(requestId, contact.intent, "duplicate", startedAt);
    return contactResponse(request, parsed.nativeForm, 200, requestId, undefined, true);
  }
  if (existing?.startsWith("pending:")) {
    const response = contactResponse(
      request,
      parsed.nativeForm,
      409,
      requestId,
      "This request is already being delivered. Please wait before retrying.",
    );
    response.headers.set("Retry-After", "15");
    return response;
  }

  try {
    // A full-day pending marker prevents duplicate native-email delivery if the
    // provider accepts the message but the final KV write is interrupted.
    await env.CONTACT_IDEMPOTENCY.put(storageKey, `pending:${Date.now()}`, {
      expirationTtl: 86_400,
    });
  } catch {
    logContact(requestId, contact.intent, "idempotency_error", startedAt, "kv_write_failed");
    return contactResponse(request, parsed.nativeForm, 503, requestId, "Contact delivery is temporarily unavailable.");
  }
  try {
    const providerReceipt = await deliverContact(contact, idempotencyKey, requestId, env);
    try {
      await env.CONTACT_IDEMPOTENCY.put(storageKey, `delivered:${providerReceipt}`, {
        expirationTtl: 86_400,
      });
    } catch {
      // Delivery was accepted. The existing pending marker remains in place to
      // suppress retries and the failure is observable without exposing PII.
      logContact(requestId, contact.intent, "delivered_kv_finalize_failed", startedAt, "kv_write_failed");
    }
    logContact(requestId, contact.intent, "delivered", startedAt);
    return contactResponse(request, parsed.nativeForm, 200, requestId);
  } catch (error) {
    try {
      await env.CONTACT_IDEMPOTENCY.delete(storageKey);
    } catch {
      // Preserve the delivery error; a stale pending marker is safer than a
      // duplicate message and expires automatically.
    }
    const errorClass = error instanceof Error ? error.name : "delivery_error";
    logContact(requestId, contact.intent, "delivery_failed", startedAt, errorClass);
    return contactResponse(
      request,
      parsed.nativeForm,
      error instanceof DeliveryUnavailableError ? 503 : 502,
      requestId,
      "Delivery failed. Please email skyler@certamaris.com or sales@certamaris.com with the same details.",
    );
  }
}

async function handleStatus(env: Env): Promise<Response> {
  const checkedAt = new Date().toISOString();
  const [app, api] = await Promise.all([
    probeService(env.STATUS_APP_URL ?? "https://app.certamaris.com/auth/login", (status) => status === 200),
    probeService(env.STATUS_API_URL ?? "https://api.certamaris.com/api/health", (status) => status >= 200 && status < 300),
  ]);

  return json({
    checkedAt,
    components: [
      { id: "website", name: "Public website", status: "operational" },
      { id: "application", name: "CertaMaris application", status: app },
      { id: "api", name: "CertaMaris API", status: api },
    ],
  });
}

async function probeService(url: string, accepts: (status: number) => boolean): Promise<"operational" | "degraded"> {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(5_000),
      headers: { "User-Agent": "CertaMaris-Status-Monitor/1.0" },
    });
    return accepts(response.status) ? "operational" : "degraded";
  } catch {
    return "degraded";
  }
}

async function contentSecurityPolicy(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";
  const scriptHashes: string[] = [];
  const styleHashes: string[] = [];

  if (contentType.includes("text/html")) {
    const html = await response.clone().text();
    for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
      if (match[1]) scriptHashes.push(`'sha256-${await sha256Base64(match[1])}'`);
    }
    for (const match of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
      if (match[1]) styleHashes.push(`'sha256-${await sha256Base64(match[1])}'`);
    }
  }

  return [
    "default-src 'self'",
    `script-src 'self' https://static.cloudflareinsights.com${scriptHashes.length ? ` ${[...new Set(scriptHashes)].join(" ")}` : ""}`,
    `style-src 'self'${styleHashes.length ? ` ${[...new Set(styleHashes)].join(" ")}` : ""}`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data:",
    "media-src 'self'",
    "font-src 'self' data:",
    "connect-src 'self' https://app.certamaris.com",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ") + ";";
}

async function sha256Base64(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  let binary = "";
  for (const byte of new Uint8Array(digest)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

class DeliveryUnavailableError extends Error {}

async function deliverContact(
  contact: NormalizedContact,
  idempotencyKey: string,
  requestId: string,
  env: Env,
): Promise<string> {
  const payload = contactDeliveryPayload(contact);

  if (env.CONTACT_EMAIL && env.CONTACT_EMAIL_FROM && env.CONTACT_EMAIL_TO) {
    const result = await env.CONTACT_EMAIL.send({
      to: env.CONTACT_EMAIL_TO,
      from: env.CONTACT_EMAIL_FROM,
      replyTo: contact.email,
      subject: `${contact.subjectTag} CertaMaris website request`,
      text: Object.entries(payload)
        .map(([key, value]) => `${key}: ${String(value)}`)
        .join("\n"),
    });
    return result.messageId;
  }

  if (!env.CONTACT_FORWARD_ENDPOINT || !env.CONTACT_FORWARD_SECRET) {
    throw new DeliveryUnavailableError("No approved delivery provider is configured.");
  }

  const body = JSON.stringify(payload);
  const timestamp = String(Date.now());
  const signature = await hmacHex(env.CONTACT_FORWARD_SECRET, `${timestamp}.${body}`);
  const forwarded = await fetch(env.CONTACT_FORWARD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
      "X-CertaMaris-Request-ID": requestId,
      "X-CertaMaris-Timestamp": timestamp,
      "X-CertaMaris-Signature": `sha256=${signature}`,
    },
    body,
  });
  if (!forwarded.ok) throw new Error(`Forwarder rejected request with ${forwarded.status}.`);
  return forwarded.headers.get("x-request-id") || requestId;
}

async function hmacHex(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function derivedIdempotencyKey(contact: NormalizedContact): Promise<string> {
  const stable = JSON.stringify([
    contact.email,
    contact.intent,
    contact.message,
    contact.company,
    contact.objective,
  ]);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(stable));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function contactResponse(
  request: Request,
  nativeForm: boolean,
  status: number,
  requestId: string,
  error?: string,
  duplicate = false,
): Response {
  if (nativeForm) {
    const target = new URL(status >= 200 && status < 300 ? "/contact/submitted" : "/contact/delivery-failed", request.url);
    if (status === 429) target.searchParams.set("reason", "rate-limited");
    if (status === 413) target.searchParams.set("reason", "too-large");
    return new Response(null, {
      status: 303,
      headers: { Location: target.toString(), "X-Request-ID": requestId },
    });
  }
  const response = json(
    status >= 200 && status < 300 ? { ok: true, requestId, duplicate } : { error, requestId },
    status,
  );
  response.headers.set("X-Request-ID", requestId);
  return response;
}

function logContact(
  requestId: string,
  intent: string,
  status: string,
  startedAt: number,
  errorClass?: string,
) {
  console.info(
    JSON.stringify({
      event: "contact_delivery",
      requestId,
      intent,
      status,
      latencyMs: Math.max(0, Date.now() - startedAt),
      ...(errorClass ? { errorClass } : {}),
    }),
  );
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
