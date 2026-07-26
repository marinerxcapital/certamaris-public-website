"use client";

import { useState, type FormEvent } from "react";
import { NEXT_PUBLIC_CONTACT_ENDPOINT } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const fleetSizes = ["1–5 vessels", "6–20 vessels", "21–50 vessels", "50+ vessels"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots tend to fill every field, humans never see or fill this one.
    if (data.get("company_website")) {
      setStatus("success");
      return;
    }

    const nextErrors: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const fleetSize = String(data.get("fleetSize") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) nextErrors.name = "Enter your name.";
    if (!email) nextErrors.email = "Enter a work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!company) nextErrors.company = "Enter your company name.";
    if (!fleetSize) nextErrors.fleetSize = "Select a fleet size.";
    if (!message) nextErrors.message = "Tell us briefly what you're looking for.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const endpoint = NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, fleetSize, message }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-hairline-strong rounded-sm p-8 bg-paper" style={{ borderColor: "var(--hairline-strong)" }}>
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean mb-2">Request received</p>
        <h3 className="text-[20px] font-semibold mb-2">Thanks — we'll be in touch shortly.</h3>
        <p className="text-[14.5px] text-structural leading-relaxed">
          A member of the CertaMaris team will reach out to schedule your readiness call, typically within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field — hidden from sighted and screen-reader users, bots still fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company_website">Company website</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" error={errors.name} autoComplete="name" />
        <Field label="Work email" name="email" type="email" error={errors.email} autoComplete="email" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Company" name="company" error={errors.company} autoComplete="organization" />
        <div>
          <label htmlFor="fleetSize" className="block text-[13.5px] font-medium text-navy mb-1.5">
            Fleet size
          </label>
          <select
            id="fleetSize"
            name="fleetSize"
            className="w-full border rounded-sm px-3.5 py-2.5 text-[15px] bg-white"
            style={{ borderColor: errors.fleetSize ? "var(--status-critical)" : "var(--hairline-strong)" }}
            aria-invalid={Boolean(errors.fleetSize)}
            aria-describedby={errors.fleetSize ? "fleetSize-error" : undefined}
            defaultValue=""
          >
            <option value="" disabled>
              Select fleet size
            </option>
            {fleetSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {errors.fleetSize && (
            <p id="fleetSize-error" className="text-[13px] mt-1.5" style={{ color: "var(--status-critical)" }}>
              {errors.fleetSize}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-[13.5px] font-medium text-navy mb-1.5">
          What are you looking to solve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full border rounded-sm px-3.5 py-2.5 text-[15px] bg-white"
          style={{ borderColor: errors.message ? "var(--status-critical)" : "var(--hairline-strong)" }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-[13px] mt-1.5" style={{ color: "var(--status-critical)" }}>
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-[14px] rounded-sm px-4 py-3" style={{ background: "var(--status-critical-bg)", color: "var(--status-critical)" }}>
          Something went wrong sending your request. Please try again, or email {""}
          <a href="mailto:sales@certamaris.com" className="underline">
            sales@certamaris.com
          </a>{" "}
          directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-sm bg-[#1478B8] px-7 py-3 text-[15px] font-semibold text-white hover:bg-[#0f639a] transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request a readiness call"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[13.5px] font-medium text-navy mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="w-full border rounded-sm px-3.5 py-2.5 text-[15px] bg-white"
        style={{ borderColor: error ? "var(--status-critical)" : "var(--hairline-strong)" }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-[13px] mt-1.5" style={{ color: "var(--status-critical)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
