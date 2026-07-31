"use client";

import { useState, type FormEvent } from "react";
import { APP_SALES_EMAIL, NEXT_PUBLIC_CONTACT_ENDPOINT } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const fleetSizes = ["1-5 vessels", "6-20 vessels", "21-50 vessels", "50+ vessels"];
const primaryNeeds = [
  "Readiness workflow",
  "Evidence and findings",
  "IACS UR E26/E27 mapping",
  "Governance reporting",
  "Pricing and scope",
  "Security package / procurement",
];
const timingOptions = ["Now / active review", "Next 90 days", "This year", "Exploratory"];
const roleOptions = ["DPA", "Technical manager", "CISO", "Procurement", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots tend to fill every field, humans never see or fill this one.
    if (data.get("company_website")) {
      setSubmittedAt(new Date().toISOString());
      setStatus("success");
      return;
    }

    const nextErrors: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const fleetSize = String(data.get("fleetSize") ?? "").trim();
    const primaryNeed = String(data.get("primaryNeed") ?? "").trim();
    const timing = String(data.get("timing") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const securityPackageIntent = data.get("securityPackageIntent") === "on";

    if (!name) nextErrors.name = "Enter your name.";
    if (!email) nextErrors.email = "Enter a work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!company) nextErrors.company = "Enter your company name.";
    if (!fleetSize) nextErrors.fleetSize = "Select a fleet size.";
    if (!primaryNeed) nextErrors.primaryNeed = "Select the conversation focus.";
    if (!timing) nextErrors.timing = "Select a planning horizon.";
    if (!message) nextErrors.message = "Tell us briefly what you're looking for.";
    else if (message.length > 4000) nextErrors.message = "Keep the note under 4,000 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const endpoint = NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
      const payload: Record<string, string | boolean> = {
        name,
        email,
        company,
        fleetSize,
        primaryNeed,
        timing,
        message,
      };
      if (role) payload.role = role;
      if (securityPackageIntent) payload.securityPackageIntent = true;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      setSubmittedAt(new Date().toISOString());
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    const displayTime = submittedAt
      ? new Date(submittedAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : null;

    return (
      <div role="status" className="border border-hairline-strong rounded-sm p-8 bg-paper" style={{ borderColor: "var(--hairline-strong)" }}>
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean mb-2">Request received</p>
        <h3 className="text-[20px] font-semibold mb-2">Thanks. Your request has been sent.</h3>
        {displayTime && (
          <p className="text-[13px] text-structural mb-3 font-mono">
            Submitted {displayTime}
          </p>
        )}
        <p className="text-[14.5px] text-structural leading-relaxed mb-3">
          This is a routed request, not a calendar booking. It does not reserve a meeting time.
        </p>
        <p className="text-[14.5px] text-structural leading-relaxed">
          We will follow up using the email you provided, as soon as practical. The details you shared help us route
          the conversation around fleet scope, evidence condition, readiness pressure, and the next practical step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-describedby="contact-form-note">
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-ocean mb-2">Readiness intake</p>
        <h2 className="text-[24px] sm:text-[28px] leading-[1.12] mb-2">Start with the operating context.</h2>
        <p id="contact-form-note" className="text-[14px] leading-relaxed text-structural">
          This request does not create a calendar booking by itself. It gives CertaMaris enough context to route the
          next conversation around your fleet and current readiness pressure. Optional fields below help with routing
          only and are not required to submit.
        </p>
      </div>

      {/* Honeypot field: hidden from sighted and screen-reader users, bots still fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company_website">Company website</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" error={errors.name} autoComplete="name" helper="Who should be contacted." required />
        <Field label="Work email" name="email" type="email" error={errors.email} autoComplete="email" helper="Use the address you want the follow-up routed to." required />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Company" name="company" error={errors.company} autoComplete="organization" helper="Operator, manager, yard, insurer, or advisory organization." required />
        <SelectField label="Fleet size" name="fleetSize" error={errors.fleetSize} options={fleetSizes} helper="Approximate scope is enough." required />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField label="Conversation focus" name="primaryNeed" error={errors.primaryNeed} options={primaryNeeds} helper="Helps avoid a generic product tour." required />
        <SelectField label="Planning horizon" name="timing" error={errors.timing} options={timingOptions} helper="Use the closest option." required />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField
          label="Role"
          name="role"
          options={roleOptions}
          helper="Optional — helps route your request. Not required to submit."
          required={false}
          placeholder="Select a role (optional)"
        />
        <div className="flex flex-col justify-end">
          <div className="rounded-sm border px-3.5 py-3" style={{ borderColor: "var(--hairline-strong)" }}>
            <label htmlFor="securityPackageIntent" className="flex items-start gap-3 cursor-pointer">
              <input
                id="securityPackageIntent"
                name="securityPackageIntent"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border accent-[#1478B8]"
                style={{ borderColor: "var(--hairline-strong)" }}
              />
              <span>
                <span className="block text-[13.5px] font-medium text-navy">
                  I&apos;m requesting a security package / NDA materials for procurement
                </span>
                <span className="mt-1 block text-[12.5px] leading-relaxed text-structural">
                  Optional — for routing only. Not required to submit.
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-[13.5px] font-medium text-navy mb-1.5">
          What should we understand before the call?{" "}
          <span className="font-normal text-structural" aria-hidden="true">
            (required)
          </span>
        </label>
        <p id="message-helper" className="mb-2 text-[12.5px] leading-relaxed text-structural">
          Useful context: upcoming survey or review pressure, current evidence condition, vessel scope, or the workflow
          that is breaking down.
        </p>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-required="true"
          className="w-full border rounded-sm px-3.5 py-2.5 text-[15px] bg-white"
          style={{ borderColor: errors.message ? "var(--status-critical)" : "var(--hairline-strong)" }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-helper message-error" : "message-helper"}
        />
        {errors.message && (
          <p id="message-error" className="text-[13px] mt-1.5" style={{ color: "var(--status-critical)" }}>
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-[14px] rounded-sm px-4 py-3" style={{ background: "var(--status-critical-bg)", color: "var(--status-critical)" }}>
          The website could not deliver this request. Please email {""}
          <a href={`mailto:${APP_SALES_EMAIL}`} className="underline">
            {APP_SALES_EMAIL}
          </a>{" "}
          directly with the same details.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-md bg-[#1478B8] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0f639a] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send readiness request"}
      </button>
    </form>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
  helper,
  required = false,
  placeholder = "Select an option",
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
  helper: string;
  required?: boolean;
  placeholder?: string;
}) {
  const helperId = `${name}-helper`;
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="block text-[13.5px] font-medium text-navy mb-1.5">
        {label}
        {required ? (
          <span className="font-normal text-structural" aria-hidden="true">
            {" "}
            (required)
          </span>
        ) : (
          <span className="font-normal text-structural" aria-hidden="true">
            {" "}
            (optional)
          </span>
        )}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        aria-required={required ? true : undefined}
        className="w-full border rounded-sm bg-white px-3.5 py-2.5 text-[15px]"
        style={{ borderColor: error ? "var(--status-critical)" : "var(--hairline-strong)" }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${helperId} ${errorId}` : helperId}
        defaultValue=""
      >
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p id={helperId} className="mt-1.5 text-[12.5px] leading-relaxed text-structural">
        {helper}
      </p>
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px]" style={{ color: "var(--status-critical)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  autoComplete,
  helper,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  autoComplete?: string;
  helper: string;
  required?: boolean;
}) {
  const helperId = `${name}-helper`;
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="block text-[13.5px] font-medium text-navy mb-1.5">
        {label}
        {required ? (
          <span className="font-normal text-structural" aria-hidden="true">
            {" "}
            (required)
          </span>
        ) : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-required={required ? true : undefined}
        className="w-full border rounded-sm bg-white px-3.5 py-2.5 text-[15px]"
        style={{ borderColor: error ? "var(--status-critical)" : "var(--hairline-strong)" }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${helperId} ${errorId}` : helperId}
      />
      <p id={helperId} className="mt-1.5 text-[12.5px] leading-relaxed text-structural">
        {helper}
      </p>
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px]" style={{ color: "var(--status-critical)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
