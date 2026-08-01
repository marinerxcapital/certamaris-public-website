type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  fleetSize?: string;
  vesselCount?: string;
  primaryNeed?: string;
  objective?: string;
  timing?: string;
  timeline?: string;
  message?: string;
  role?: string;
  currentProcess?: string;
  intent?: string;
  subjectTag?: string;
  documentRequestType?: string;
  /** Optional: boolean or string; truthy means security package / NDA request. */
  securityPackageIntent?: boolean | string;
  /** Honeypot — if filled, treat as bot success no-op. */
  company_website?: string;
  /** Client form open timestamp (ms) for min time-to-submit. */
  formStartedAt?: number | string;
};

type Env = {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  CONTACT_FORWARD_ENDPOINT?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_HOST = "certamaris.com";
const ONE_WEEK_CACHE = "public, max-age=604800, stale-while-revalidate=86400";
const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";
const HTML_CACHE = "public, max-age=0, must-revalidate";
const MIN_SUBMIT_MS = 2000;
const MAX_MESSAGE = 4000;

const SALES_INTENTS = new Set(["demo", "sales", "readiness", "procurement"]);
const VALID_INTENTS = new Set([
  "demo",
  "sales",
  "readiness",
  "procurement",
  "security",
  "privacy",
  "support",
  "partnership",
  "press",
  "careers",
  "disclosure",
]);

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy-Report-Only":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://cdn.aidesigner.ai; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; font-src 'self' data:; connect-src 'self' https://app.certamaris.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${SITE_HOST}`) {
      url.hostname = SITE_HOST;
      return withHeaders(Response.redirect(url.toString(), 301), request);
    }

    // Permanent redirect: legacy sample-platform → product demo hub
    if (url.pathname === "/sample-platform" || url.pathname === "/sample-platform/") {
      url.pathname = "/demo";
      return withHeaders(Response.redirect(url.toString(), 301), request);
    }

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return withHeaders(json({ error: "Method not allowed." }, 405), request);
      }
      return withHeaders(await handleContact(request, env), request);
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

function withHeaders(response: Response, request: Request): Response {
  const url = new URL(request.url);
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }

  if (url.pathname.startsWith("/_next/static/")) {
    headers.set("Cache-Control", IMMUTABLE_CACHE);
  } else if (isStableAsset(url.pathname)) {
    headers.set("Cache-Control", ONE_WEEK_CACHE);
  } else if (url.pathname === "/api/contact") {
    headers.set("Cache-Control", "no-store");
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

function parseSecurityPackageIntent(value: boolean | string | undefined): boolean | undefined {
  if (value === undefined || value === "") return undefined;
  if (typeof value === "boolean") return value;
  const normalized = String(value).trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "on") return true;
  if (normalized === "false" || normalized === "0" || normalized === "no" || normalized === "off") return false;
  return Boolean(normalized);
}

function normalizeIntent(raw: string | undefined): string {
  const key = (raw ?? "demo").trim().toLowerCase();
  if (VALID_INTENTS.has(key)) return key;
  return "demo";
}

function intentSubjectTag(intent: string, provided?: string): string {
  if (provided && provided.trim()) return provided.trim();
  return `[${intent}]`;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  // Honeypot: pretend success so bots do not retry with corrected fields.
  if (body.company_website && String(body.company_website).trim()) {
    return json({ ok: true });
  }

  // Min time-to-submit (when client sends formStartedAt).
  if (body.formStartedAt !== undefined && body.formStartedAt !== "") {
    const started = Number(body.formStartedAt);
    if (Number.isFinite(started)) {
      const elapsed = Date.now() - started;
      // Allow clock skew; reject only clearly instant bot submits.
      if (elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
        return json({ error: "Please take a moment to complete the form before submitting." }, 400);
      }
    }
  }

  const intent = normalizeIntent(body.intent);
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const fleetSize = (body.fleetSize ?? "").trim();
  const vesselCount = (body.vesselCount ?? "").trim();
  const objective = (body.objective ?? body.primaryNeed ?? "").trim();
  const timeline = (body.timeline ?? body.timing ?? "").trim();
  const message = (body.message ?? "").trim();
  const role = (body.role ?? "").trim();
  const currentProcess = (body.currentProcess ?? "").trim();
  const documentRequestType = (body.documentRequestType ?? "").trim();
  const subjectTag = intentSubjectTag(intent, body.subjectTag);
  const securityPackageIntent = parseSecurityPackageIntent(body.securityPackageIntent);
  const salesShaped = SALES_INTENTS.has(intent);

  if (!name || !email || !message) {
    return json({ error: "Name, email, and message are required." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: "Invalid email address." }, 400);
  }
  if (message.length > MAX_MESSAGE) {
    return json({ error: "Message is too long." }, 400);
  }

  // Sales-shaped intents keep the richer required set (with legacy primaryNeed/timing aliases).
  if (salesShaped) {
    if (!company || !fleetSize || !objective || !timeline) {
      return json(
        {
          error:
            "For sales and readiness requests, company, fleet size, objective, and timeline are required.",
        },
        400
      );
    }
  }

  if (env.CONTACT_FORWARD_ENDPOINT) {
    try {
      const forwardBody: Record<string, string | boolean> = {
        name,
        email,
        company: company || "Not provided",
        message,
        intent,
        subjectTag,
        source: "certamaris-website",
        // Legacy-compatible fields for existing forward consumers
        fleetSize: fleetSize || "Not specified",
        primaryNeed: objective || intent,
        timing: timeline || "Not specified",
      };
      if (role) forwardBody.role = role;
      if (vesselCount) forwardBody.vesselCount = vesselCount;
      if (objective) forwardBody.objective = objective;
      if (timeline) forwardBody.timeline = timeline;
      if (currentProcess) forwardBody.currentProcess = currentProcess;
      if (documentRequestType) forwardBody.documentRequestType = documentRequestType;
      if (securityPackageIntent !== undefined) forwardBody.securityPackageIntent = securityPackageIntent;

      const forwarded = await fetch(env.CONTACT_FORWARD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forwardBody),
      });

      if (!forwarded.ok) {
        return json(
          {
            error:
              "Delivery failed. Please email skyler@certamaris.com or sales@certamaris.com with the same details.",
          },
          502
        );
      }
    } catch {
      // Match app/api/contact/route.ts — network/DNS failures must not become unhandled Worker throws.
      return json(
        {
          error:
            "Delivery failed. Please email skyler@certamaris.com or sales@certamaris.com with the same details.",
        },
        502
      );
    }
  } else {
    console.warn("CONTACT_FORWARD_ENDPOINT is not configured; validated contact submission was not delivered.");
    return json(
      {
        error:
          "Contact delivery is not configured yet. Please email skyler@certamaris.com or sales@certamaris.com with the same details.",
      },
      503
    );
  }

  return json({ ok: true });
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
