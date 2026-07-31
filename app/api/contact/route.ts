import { NextResponse } from "next/server";
import { CONTACT_FORWARD_ENDPOINT } from "@/lib/constants";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  fleetSize?: string;
  primaryNeed?: string;
  timing?: string;
  message?: string;
  /** Optional routing field — not required for submit. */
  role?: string;
  /** Optional: boolean or string; truthy means security package / NDA request. */
  securityPackageIntent?: boolean | string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseSecurityPackageIntent(value: boolean | string | undefined): boolean | undefined {
  if (value === undefined || value === "") return undefined;
  if (typeof value === "boolean") return value;
  const normalized = String(value).trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "on") return true;
  if (normalized === "false" || normalized === "0" || normalized === "no" || normalized === "off") return false;
  // Accept free-form string as truthy intent signal for backward-compatible clients
  return Boolean(normalized);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const fleetSize = (body.fleetSize ?? "").trim();
  const primaryNeed = (body.primaryNeed ?? "").trim();
  const timing = (body.timing ?? "").trim();
  const message = (body.message ?? "").trim();
  const role = (body.role ?? "").trim();
  const securityPackageIntent = parseSecurityPackageIntent(body.securityPackageIntent);

  if (!name || !email || !company || !fleetSize || !primaryNeed || !timing || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  /**
   * INTEGRATION POINT — CONTACT FORWARDING
   * ---------------------------------------
   * Set CONTACT_FORWARD_ENDPOINT to a webhook, transactional email API, or
   * CRM intake endpoint to actually deliver these submissions. Until that
   * environment variable is configured, the form returns 503 so the website
   * does not create a false "request received" state.
   */
  if (CONTACT_FORWARD_ENDPOINT) {
    try {
      const forwardBody: Record<string, string | boolean> = {
        name,
        email,
        company,
        fleetSize,
        primaryNeed,
        timing,
        message,
        source: "certamaris-website",
      };
      if (role) forwardBody.role = role;
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
