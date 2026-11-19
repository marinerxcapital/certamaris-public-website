import assert from "node:assert/strict";
import test from "node:test";
import worker from "./index.ts";

const validContact = {
  name: "Production QA",
  email: "qa@certamaris.com",
  company: "CertaMaris",
  fleetSize: "1–5 vessels",
  objective: "Readiness",
  timeline: "This year",
  message: "Controlled endpoint test.",
  intent: "demo",
  formStartedAt: Date.now() - 5_000,
  idempotencyKey: "worker-endpoint-test",
};

function env(options: { limited?: boolean; delivery?: "success" | "failure" | "missing" } = {}) {
  const kv = new Map<string, string>();
  const delivered: unknown[] = [];
  return {
    bindings: {
      ASSETS: {
        fetch: async () =>
          new Response("<!doctype html><style>body{color:#071a33}</style><script>self.__qa=true</script>", {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          }),
      },
      CONTACT_RATE_LIMITER: { limit: async () => ({ success: !options.limited }) },
      CONTACT_GLOBAL_RATE_LIMITER: { limit: async () => ({ success: true }) },
      CONTACT_IDEMPOTENCY: {
        get: async (key: string) => kv.get(key) ?? null,
        put: async (key: string, value: string) => void kv.set(key, value),
        delete: async (key: string) => void kv.delete(key),
      },
      ...(options.delivery === "missing"
        ? {}
        : {
            CONTACT_EMAIL_FROM: "website@certamaris.com",
            CONTACT_EMAIL_TO: "intake@certamaris.com",
            CONTACT_EMAIL: {
              send: async (message: unknown) => {
                if (options.delivery === "failure") throw new Error("provider rejected");
                delivered.push(message);
                return { messageId: "receipt-1" };
              },
            },
          }),
    },
    delivered,
  };
}

function post(body: string, contentType = "application/json") {
  return new Request("https://certamaris.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": contentType, "CF-Connecting-IP": "192.0.2.10" },
    body,
  });
}

test("security headers hash inline blocks and enforce the required directives", async () => {
  const response = await worker.fetch(new Request("https://certamaris.com/"), env().bindings);
  const csp = response.headers.get("content-security-policy") ?? "";
  assert.match(csp, /script-src 'self' https:\/\/static\.cloudflareinsights\.com 'sha256-/);
  assert.match(csp, /style-src 'self' 'sha256-/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /upgrade-insecure-requests/);
  assert.doesNotMatch(csp, /script-src[^;]*'unsafe-inline'/);
  assert.equal(response.headers.get("x-frame-options"), "DENY");
});

test("contact endpoint returns 405 with Allow and applies security headers", async () => {
  const response = await worker.fetch(new Request("https://certamaris.com/api/contact"), env().bindings);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

test("conditional HTML revalidation retains the cached hashed CSP", async () => {
  const bindings = env().bindings;
  bindings.ASSETS.fetch = async () => new Response(null, {
    status: 304,
    headers: { "Content-Type": "text/html; charset=utf-8", ETag: '"same-html"' },
  });
  const response = await worker.fetch(new Request("https://certamaris.com/demo", {
    headers: { "If-None-Match": '"same-html"' },
  }), bindings);
  assert.equal(response.status, 304);
  assert.equal(response.headers.get("etag"), '"same-html"');
  // Sending a new hashless policy would overwrite the cached 200 policy and
  // block Next's inline hydration scripts on reload.
  assert.equal(response.headers.get("content-security-policy"), null);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(await response.text(), "");
});

test("contact endpoint rejects oversized requests and rate-limited sources", async () => {
  const oversized = await worker.fetch(post("x".repeat(32 * 1024 + 1)), env().bindings);
  assert.equal(oversized.status, 413);
  const limited = await worker.fetch(post(JSON.stringify(validContact)), env({ limited: true }).bindings);
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "60");
});

test("contact endpoint reports provider success, failure, and missing integration honestly", async () => {
  const successEnv = env({ delivery: "success" });
  const success = await worker.fetch(post(JSON.stringify(validContact)), successEnv.bindings);
  assert.equal(success.status, 200);
  assert.equal(successEnv.delivered.length, 1);
  assert.ok(success.headers.get("x-request-id"));

  const failure = await worker.fetch(
    post(JSON.stringify({ ...validContact, idempotencyKey: "failure-test" })),
    env({ delivery: "failure" }).bindings,
  );
  assert.equal(failure.status, 502);

  const missing = await worker.fetch(
    post(JSON.stringify({ ...validContact, idempotencyKey: "missing-test" })),
    env({ delivery: "missing" }).bindings,
  );
  assert.equal(missing.status, 503);
});

test("native fallback redirects without exposing submitted values", async () => {
  const body = new URLSearchParams(Object.entries(validContact).map(([key, value]) => [key, String(value)]));
  const response = await worker.fetch(post(body.toString(), "application/x-www-form-urlencoded"), env().bindings);
  assert.equal(response.status, 303);
  assert.equal(response.headers.get("location"), "https://certamaris.com/contact/submitted");
  assert.doesNotMatch(response.headers.get("location") ?? "", /qa%40|Production|Controlled/);
});

test("legacy and duplicate-intent routes permanently redirect to canonical destinations", async () => {
  const redirects = new Map([
    ["/industries", "/who-we-serve"],
    ["/sample-platform", "/demo"],
    ["/platform/corporate-control-plane", "/platform/client-company-portal"],
    ["/privacy", "/legal/privacy"],
    ["/terms", "/legal/terms"],
    ["/trust/subprocessors", "/legal/subprocessors"],
  ]);

  for (const [source, target] of redirects) {
    const response = await worker.fetch(new Request(`https://certamaris.com${source}`), env().bindings);
    assert.equal(response.status, 301, source);
    assert.equal(response.headers.get("location"), `https://certamaris.com${target}`, source);
  }
});
