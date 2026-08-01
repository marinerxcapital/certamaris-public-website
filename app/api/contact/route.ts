import { NextResponse } from "next/server";
import { CONTACT_FORWARD_ENDPOINT } from "@/lib/constants";
import {
  contactDeliveryPayload,
  readContactRequest,
  validateContactInput,
} from "@/lib/contact-request";

export const runtime = "nodejs";
// Production static exports are served by worker/index.ts, which owns this
// route at the edge. Keep the Next handler for local/serverful parity without
// making the static exporter attempt to execute a request-time route.
export const dynamic = "force-static";

const CONTACT_FORWARD_SECRET = process.env.CONTACT_FORWARD_SECRET ?? "";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const parsed = await readContactRequest(request);
  if (!parsed.ok) return contactResponse(request, parsed.nativeForm, parsed.status, requestId, parsed.error);

  const validated = validateContactInput(parsed.input);
  if (!validated.ok) return contactResponse(request, parsed.nativeForm, 400, requestId, validated.error);
  if (validated.honeypot) return contactResponse(request, parsed.nativeForm, 200, requestId);

  if (!CONTACT_FORWARD_ENDPOINT || !CONTACT_FORWARD_SECRET) {
    console.info(
      JSON.stringify({
        event: "contact_delivery",
        requestId,
        intent: validated.contact.intent,
        status: "provider_unavailable",
      }),
    );
    return contactResponse(
      request,
      parsed.nativeForm,
      503,
      requestId,
      "Contact delivery is not configured yet. Please email skyler@certamaris.com or sales@certamaris.com with the same details.",
    );
  }

  try {
    const body = JSON.stringify(contactDeliveryPayload(validated.contact));
    const timestamp = String(Date.now());
    const signature = await hmacHex(CONTACT_FORWARD_SECRET, `${timestamp}.${body}`);
    const idempotencyKey = validated.contact.idempotencyKey || requestId;
    const forwarded = await fetch(CONTACT_FORWARD_ENDPOINT, {
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
  } catch (error) {
    console.info(
      JSON.stringify({
        event: "contact_delivery",
        requestId,
        intent: validated.contact.intent,
        status: "delivery_failed",
        errorClass: error instanceof Error ? error.name : "delivery_error",
      }),
    );
    return contactResponse(
      request,
      parsed.nativeForm,
      502,
      requestId,
      "Delivery failed. Please email skyler@certamaris.com or sales@certamaris.com with the same details.",
    );
  }

  return contactResponse(request, parsed.nativeForm, 200, requestId);
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
  );
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

function contactResponse(
  request: Request,
  nativeForm: boolean,
  status: number,
  requestId: string,
  error?: string,
) {
  if (nativeForm) {
    const target = new URL(status >= 200 && status < 300 ? "/contact/submitted" : "/contact/delivery-failed", request.url);
    if (status === 413) target.searchParams.set("reason", "too-large");
    const response = NextResponse.redirect(target, 303);
    response.headers.set("X-Request-ID", requestId);
    return response;
  }
  return NextResponse.json(
    status >= 200 && status < 300 ? { ok: true, requestId } : { error, requestId },
    { status, headers: { "Cache-Control": "no-store", "X-Request-ID": requestId } },
  );
}
