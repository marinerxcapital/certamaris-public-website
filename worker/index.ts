type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  fleetSize?: string;
  message?: string;
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
const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy-Report-Only":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; font-src 'self' data:; connect-src 'self' https://app.certamaris.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${SITE_HOST}`) {
      url.hostname = SITE_HOST;
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

  const match = url.pathname.match(/^\/([^/]+)\/__next\.([^.]+)\.__PAGE__\.txt$/);
  if (match && match[1] === match[2]) {
    url.pathname = `/${match[1]}/__next.${match[1]}/__PAGE__.txt`;
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
    pathname.startsWith("/bg/") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/video/") ||
    pathname.startsWith("/og/") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png" ||
    pathname === "/apple-icon.png"
  );
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const fleetSize = (body.fleetSize ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !company || !fleetSize || !message) {
    return json({ error: "All fields are required." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: "Invalid email address." }, 400);
  }
  if (message.length > 4000) {
    return json({ error: "Message is too long." }, 400);
  }

  if (env.CONTACT_FORWARD_ENDPOINT) {
    const forwarded = await fetch(env.CONTACT_FORWARD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, fleetSize, message, source: "certamaris-website" }),
    });

    if (!forwarded.ok) {
      return json({ error: "Delivery failed. Please try again shortly." }, 502);
    }
  } else {
    console.warn("CONTACT_FORWARD_ENDPOINT is not configured; validated contact submission was not delivered.");
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
