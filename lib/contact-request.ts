export const MAX_CONTACT_BODY_BYTES = 32 * 1024;
export const MIN_CONTACT_SUBMIT_MS = 2_000;

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  company: 160,
  fleetSize: 80,
  vesselCount: 80,
  objective: 240,
  timeline: 120,
  message: 4_000,
  role: 120,
  currentProcess: 1_500,
  documentRequestType: 160,
  idempotencyKey: 128,
} as const;

export const CONTACT_INTENTS = [
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
] as const;

export type ContactIntent = (typeof CONTACT_INTENTS)[number];

export type NormalizedContact = {
  name: string;
  email: string;
  company: string;
  fleetSize: string;
  vesselCount: string;
  objective: string;
  timeline: string;
  message: string;
  role: string;
  currentProcess: string;
  intent: ContactIntent;
  subjectTag: string;
  documentRequestType: string;
  securityPackageIntent?: boolean;
  formStartedAt?: number;
  idempotencyKey?: string;
};

export type ContactValidationResult =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; contact: NormalizedContact }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALES_INTENTS = new Set<ContactIntent>(["demo", "sales", "readiness", "procurement"]);
const ALLOWED_KEYS = new Set([
  "name",
  "email",
  "company",
  "fleetSize",
  "vesselCount",
  "primaryNeed",
  "objective",
  "timing",
  "timeline",
  "message",
  "role",
  "currentProcess",
  "intent",
  "intentSelect",
  "subjectTag",
  "documentRequestType",
  "securityPackageIntent",
  "documentInterest",
  "company_website",
  "formStartedAt",
  "idempotencyKey",
]);

function asString(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }
  return "";
}

function parseBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "boolean") return value;
  const normalized = asString(value).toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;
  return undefined;
}

function tooLong(label: string, value: string, maximum: number): ContactValidationResult | null {
  return value.length > maximum
    ? { ok: false, error: `${label} exceeds the maximum allowed length.` }
    : null;
}

export function validateContactInput(input: unknown, now = Date.now()): ContactValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Invalid request body." };
  }

  const body = input as Record<string, unknown>;
  const unexpected = Object.keys(body).find((key) => !ALLOWED_KEYS.has(key));
  if (unexpected) return { ok: false, error: "Request contains an unsupported field." };

  if (asString(body.company_website)) return { ok: true, honeypot: true };

  const intentValue = asString(body.intent || body.intentSelect || "demo").toLowerCase();
  if (!CONTACT_INTENTS.includes(intentValue as ContactIntent)) {
    return { ok: false, error: "Invalid contact request type." };
  }
  const intent = intentValue as ContactIntent;

  const contact: NormalizedContact = {
    name: asString(body.name),
    email: asString(body.email).toLowerCase(),
    company: asString(body.company),
    fleetSize: asString(body.fleetSize),
    vesselCount: asString(body.vesselCount),
    objective: asString(body.objective || body.primaryNeed),
    timeline: asString(body.timeline || body.timing),
    message: asString(body.message),
    role: asString(body.role),
    currentProcess: asString(body.currentProcess),
    intent,
    subjectTag: `[${intent}]`,
    documentRequestType: asString(body.documentRequestType),
    securityPackageIntent:
      parseBoolean(body.securityPackageIntent) ?? parseBoolean(body.documentInterest),
    idempotencyKey: asString(body.idempotencyKey) || undefined,
  };

  const lengthChecks: Array<[string, string, number]> = [
    ["Name", contact.name, CONTACT_FIELD_LIMITS.name],
    ["Email", contact.email, CONTACT_FIELD_LIMITS.email],
    ["Company", contact.company, CONTACT_FIELD_LIMITS.company],
    ["Fleet size", contact.fleetSize, CONTACT_FIELD_LIMITS.fleetSize],
    ["Vessel count", contact.vesselCount, CONTACT_FIELD_LIMITS.vesselCount],
    ["Objective", contact.objective, CONTACT_FIELD_LIMITS.objective],
    ["Timeline", contact.timeline, CONTACT_FIELD_LIMITS.timeline],
    ["Message", contact.message, CONTACT_FIELD_LIMITS.message],
    ["Role", contact.role, CONTACT_FIELD_LIMITS.role],
    ["Current process", contact.currentProcess, CONTACT_FIELD_LIMITS.currentProcess],
    ["Document request type", contact.documentRequestType, CONTACT_FIELD_LIMITS.documentRequestType],
    ["Idempotency key", contact.idempotencyKey ?? "", CONTACT_FIELD_LIMITS.idempotencyKey],
  ];
  for (const [label, value, maximum] of lengthChecks) {
    const failure = tooLong(label, value, maximum);
    if (failure) return failure;
  }

  if (!contact.name || !contact.email || !contact.message) {
    return { ok: false, error: "Name, email, and message are required." };
  }
  if (!EMAIL_RE.test(contact.email)) return { ok: false, error: "Invalid email address." };

  if (SALES_INTENTS.has(intent)) {
    if (!contact.company || !contact.fleetSize || !contact.objective || !contact.timeline) {
      return {
        ok: false,
        error: "For sales and readiness requests, company, fleet size, objective, and timeline are required.",
      };
    }
  }

  if (body.formStartedAt !== undefined && body.formStartedAt !== "") {
    const started = Number(body.formStartedAt);
    if (!Number.isFinite(started)) return { ok: false, error: "Invalid form timing value." };
    const elapsed = now - started;
    if (elapsed >= 0 && elapsed < MIN_CONTACT_SUBMIT_MS) {
      return { ok: false, error: "Please take a moment to complete the form before submitting." };
    }
    contact.formStartedAt = started;
  }

  return { ok: true, honeypot: false, contact };
}

export function formDataToContactInput(formData: FormData): Record<string, unknown> {
  return Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, String(value)]));
}

export async function readContactRequest(request: Request): Promise<
  | { ok: true; input: unknown; nativeForm: boolean }
  | { ok: false; status: number; error: string; nativeForm: boolean }
> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_CONTACT_BODY_BYTES) {
    return { ok: false, status: 413, error: "Request body is too large.", nativeForm: false };
  }

  const contentType = (request.headers.get("content-type") ?? "").toLowerCase();
  const nativeForm =
    contentType.startsWith("application/x-www-form-urlencoded") ||
    contentType.startsWith("multipart/form-data");
  if (!nativeForm && !contentType.startsWith("application/json")) {
    return { ok: false, status: 415, error: "Unsupported content type.", nativeForm };
  }

  const raw = await request.arrayBuffer();
  if (raw.byteLength > MAX_CONTACT_BODY_BYTES) {
    return { ok: false, status: 413, error: "Request body is too large.", nativeForm };
  }

  try {
    const clone = new Request(request.url, {
      method: "POST",
      headers: request.headers,
      body: raw,
    });
    if (nativeForm) return { ok: true, input: formDataToContactInput(await clone.formData()), nativeForm };
    return { ok: true, input: JSON.parse(new TextDecoder().decode(raw)), nativeForm };
  } catch {
    return { ok: false, status: 400, error: "Invalid request body.", nativeForm };
  }
}

export function contactDeliveryPayload(contact: NormalizedContact) {
  return {
    name: contact.name,
    email: contact.email,
    company: contact.company || "Not provided",
    message: contact.message,
    intent: contact.intent,
    subjectTag: contact.subjectTag,
    source: "certamaris-website",
    fleetSize: contact.fleetSize || "Not specified",
    vesselCount: contact.vesselCount || "Not specified",
    primaryNeed: contact.objective || contact.intent,
    objective: contact.objective || "Not specified",
    timing: contact.timeline || "Not specified",
    timeline: contact.timeline || "Not specified",
    role: contact.role || "Not specified",
    currentProcess: contact.currentProcess || "Not specified",
    documentRequestType: contact.documentRequestType || "Not specified",
    securityPackageIntent: contact.securityPackageIntent ?? false,
  };
}
