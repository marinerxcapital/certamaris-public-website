import { NextResponse } from "next/server";
import { CONTACT_FORWARD_ENDPOINT } from "@/lib/constants";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  fleetSize?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const message = (body.message ?? "").trim();

  if (!name || !email || !company || !fleetSize || !message) {
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
   * environment variable is configured, submissions are accepted and
   * validated but no delivery is claimed.
   */
  if (CONTACT_FORWARD_ENDPOINT) {
    try {
      await fetch(CONTACT_FORWARD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, fleetSize, message, source: "certamaris-website" }),
      });
    } catch {
      console.error("Contact forwarding failed.");
      return NextResponse.json({ error: "Delivery failed. Please try again shortly." }, { status: 502 });
    }
  } else {
    console.warn("CONTACT_FORWARD_ENDPOINT is not configured; validated contact submission was not delivered.");
  }

  return NextResponse.json({ ok: true });
}
