import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTACT_INTENTS,
  MAX_CONTACT_BODY_BYTES,
  readContactRequest,
  validateContactInput,
} from "./contact-request.ts";

const valid = {
  name: "Production QA",
  email: "qa@certamaris.com",
  company: "CertaMaris",
  fleetSize: "1–5 vessels",
  objective: "Readiness",
  timeline: "This year",
  message: "Controlled contact delivery test.",
  intent: "demo",
  formStartedAt: Date.now() - 5_000,
  idempotencyKey: "qa-idempotency-key",
};

test("normalizes a valid contact request and controls its subject tag", () => {
  const result = validateContactInput({ ...valid, subjectTag: "untrusted" });
  assert.equal(result.ok, true);
  if (!result.ok || result.honeypot) return;
  assert.equal(result.contact.subjectTag, "[demo]");
  assert.equal(result.contact.email, "qa@certamaris.com");
});

test("accepts every supported routing intent without trusting a client subject", () => {
  for (const intent of CONTACT_INTENTS) {
    const result = validateContactInput({
      ...valid,
      intent,
      subjectTag: "[untrusted-client-value]",
    });
    assert.equal(result.ok, true, intent);
    if (!result.ok || result.honeypot) continue;
    assert.equal(result.contact.subjectTag, `[${intent}]`);
  }
});

test("rejects unsupported fields and oversized values", () => {
  assert.deepEqual(validateContactInput({ ...valid, admin: true }), {
    ok: false,
    error: "Request contains an unsupported field.",
  });
  const oversized = validateContactInput({ ...valid, name: "x".repeat(101) });
  assert.equal(oversized.ok, false);
});

test("retains honeypot no-op behavior", () => {
  assert.deepEqual(validateContactInput({ company_website: "spam.example" }), {
    ok: true,
    honeypot: true,
  });
});

test("enforces form timing when supplied and accepts omission for progressive fallback", () => {
  const tooFast = validateContactInput({ ...valid, formStartedAt: Date.now() });
  assert.equal(tooFast.ok, false);
  const omitted = { ...valid } as Partial<typeof valid>;
  delete omitted.formStartedAt;
  assert.equal(validateContactInput(omitted).ok, true);
});

test("rejects unsupported content types and oversized request bodies", async () => {
  const unsupported = await readContactRequest(
    new Request("https://certamaris.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "test",
    }),
  );
  assert.equal(unsupported.ok, false);
  if (!unsupported.ok) assert.equal(unsupported.status, 415);

  const oversized = await readContactRequest(
    new Request("https://certamaris.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "x".repeat(MAX_CONTACT_BODY_BYTES + 1),
    }),
  );
  assert.equal(oversized.ok, false);
  if (!oversized.ok) assert.equal(oversized.status, 413);
});

test("parses the progressive form encoding", async () => {
  const body = new URLSearchParams(
    Object.entries(valid).map(([key, value]) => [key, String(value)]),
  );
  const parsed = await readContactRequest(
    new Request("https://certamaris.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }),
  );
  assert.equal(parsed.ok, true);
  if (parsed.ok) {
    assert.equal(parsed.nativeForm, true);
    assert.equal(validateContactInput(parsed.input).ok, true);
  }
});
