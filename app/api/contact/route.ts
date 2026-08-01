import { NextResponse } from "next/server";
import { CONTACT_FORWARD_ENDPOINT } from "@/lib/constants";

export const runtime = "nodejs";

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
  company_website?: string;
  formStartedAt?: number | string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.company_website && String(body.company_website).trim()) {
    return NextResponse.json({ ok: true });
  }

  if (body.formStartedAt !== undefined && body.formStartedAt !== "") {
    const started = Number(body.formStartedAt);
    if (Number.isFinite(started)) {
      const elapsed = Date.now() - started;
      if (elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
        return NextResponse.json(
          { error: "Please take a moment to complete the form before submitting." },
          { status: 400 }
        );
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
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  if (salesShaped) {
    if (!company || !fleetSize || !objective || !timeline) {
      return NextResponse.json(
        {
          error:
            "For sales and readiness requests, company, fleet size, objective, and timeline are required.",
        },
        { status: 400 }
      );
    }
  }

  /**
   * INTEGRATION POINT — CONTACT FORWARDING
   * ---------------------------------------
   * Set CONTACT_FORWARD_ENDPOINT to a webhook, transactional email API, or
   * CRM intake endpoint to actually deliver these submissions. Until that
   * environment variable is configured, the form returns 503 so the website
   * does not create a false "request received" state.
   *
   * Payload includes intent + subjectTag for internal routing (not a CRM invent).
   */
  if (CONTACT_FORWARD_ENDPOINT) {
    try {
      const forwardBody: Record<string, string | boolean> = {
        name,
        email,
        company: company || "Not provided",
        message,
        intent,
        subjectTag,
        source: "certamaris-website",
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

      const forwarded = await fetch(CONTACT_FORWARD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forwardBody),
      });
      if (!forwarded.ok) {
        console.error("Contact forwarding returned non-OK status.", forwarded.status);
        return NextResponse.json(
          { error: "Delivery failed. Please use the direct email fallback." },
          { status: 502 }
        );
      }
    } catch {
      console.error("Contact forwarding failed.");
      return NextResponse.json(
        { error: "Delivery failed. Please use the direct email fallback." },
        { status: 502 }
      );
    }
  } else {
    console.warn("CONTACT_FORWARD_ENDPOINT is not configured; validated contact submission was not delivered.");
    return NextResponse.json(
      { error: "Contact delivery is not configured. Please email sales directly." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
