"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { APP_SALES_EMAIL, APP_SCHEDULING_URL, NEXT_PUBLIC_CONTACT_ENDPOINT } from "@/lib/constants";
import {
  DOCUMENT_REQUEST_OPTIONS,
  FLEET_SIZE_OPTIONS,
  getContactIntent,
  OBJECTIVE_OPTIONS,
  ROLE_OPTIONS,
  TIMELINE_OPTIONS,
  type ContactIntentId,
  VESSEL_COUNT_OPTIONS,
} from "@/lib/faq-pricing";

type Status = "idle" | "submitting" | "success" | "error";

const MIN_SUBMIT_MS = 2500;

type ContactFormProps = {
  /** Override when not reading from URL (e.g. embedded on pricing). */
  defaultIntent?: ContactIntentId | string;
  /** Hide the intent switcher (fixed path). */
  lockIntent?: boolean;
  className?: string;
};

export function ContactForm({ defaultIntent = "demo", lockIntent = false, className = "" }: ContactFormProps) {
  const searchParams = useSearchParams();
  const urlIntent = searchParams.get("intent");
  const [intentId, setIntentId] = useState(() => getContactIntent(urlIntent ?? defaultIntent).id);
  const intent = useMemo(() => getContactIntent(intentId), [intentId]);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now());
  const hasScheduling = Boolean(APP_SCHEDULING_URL.trim());

  useEffect(() => {
    if (lockIntent) return;
    const next = getContactIntent(urlIntent ?? defaultIntent).id;
    setIntentId(next);
  }, [urlIntent, defaultIntent, lockIntent]);

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

    const elapsed = Date.now() - formStartedAt;
    if (elapsed < MIN_SUBMIT_MS) {
      setErrors({ form: "Please take a moment to complete the form before submitting." });
      return;
    }

    const nextErrors: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const fleetSize = String(data.get("fleetSize") ?? "").trim();
    const vesselCount = String(data.get("vesselCount") ?? "").trim();
    const objective = String(data.get("objective") ?? "").trim();
    const timeline = String(data.get("timeline") ?? "").trim();
    const currentProcess = String(data.get("currentProcess") ?? "").trim();
    const documentRequestType = String(data.get("documentRequestType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const documentInterest = data.get("documentInterest") === "on";

    if (!name) nextErrors.name = "Enter your name.";
    if (!email) nextErrors.email = "Enter a work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (intent.salesFields && !company) nextErrors.company = "Enter your company name.";
    if (!intent.salesFields && !company && intent.id !== "disclosure" && intent.id !== "careers") {
      // Company preferred but not hard-required for non-sales paths except disclosure/careers.
    }
    if (intent.salesFields) {
      if (!fleetSize) nextErrors.fleetSize = "Select a fleet size.";
      if (!vesselCount) nextErrors.vesselCount = "Select a vessel count range.";
      if (!objective) nextErrors.objective = "Select an objective.";
      if (!timeline) nextErrors.timeline = "Select a timeline.";
    }
    if (!message) nextErrors.message = "Tell us briefly what you need.";
    else if (message.length > 4000) nextErrors.message = "Keep the note under 4,000 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const order = [
        "name",
        "email",
        "company",
        "fleetSize",
        "vesselCount",
        "objective",
        "timeline",
        "message",
      ] as const;
      const first = order.find((key) => nextErrors[key]);
      if (first) {
        window.requestAnimationFrame(() => {
          document.getElementById(first)?.focus();
        });
      }
      return;
    }

    setStatus("submitting");
    try {
      const endpoint = NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
      const payload: Record<string, string | boolean | number> = {
        name,
        email,
        company,
        message,
        intent: intent.id,
        subjectTag: intent.subjectTag,
        formStartedAt,
        // Legacy-compatible mirrors for older forward endpoints
        primaryNeed: objective || intent.label,
        timing: timeline || "Not specified",
        fleetSize: fleetSize || "Not specified",
      };
      if (role) payload.role = role;
      if (vesselCount) payload.vesselCount = vesselCount;
      if (objective) payload.objective = objective;
      if (timeline) payload.timeline = timeline;
      if (currentProcess) payload.currentProcess = currentProcess;
      if (documentRequestType && documentRequestType !== "None") {
        payload.documentRequestType = documentRequestType;
      }
      if (documentInterest || intent.id === "security" || intent.id === "procurement") {
        payload.securityPackageIntent = documentInterest || intent.id === "security";
      }

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
      <div role="status" className={`liquid-glass liquid-glass--strong lg-pad-lg ${className}`} tabIndex={-1}>
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean mb-2">Request received</p>
        <h3 className="text-[20px] font-semibold mb-2">Thanks. Your request has been sent.</h3>
        {displayTime && (
          <p className="text-[13px] text-structural mb-3 font-mono">Submitted {displayTime}</p>
        )}
        <p className="text-[14.5px] text-structural leading-relaxed mb-3">
          Submit your details and we will contact you to arrange a suitable time. This form does not book a calendar
          slot by itself.
        </p>
        <p className="text-[14.5px] text-structural leading-relaxed mb-4">
          Your request was tagged <span className="font-mono text-navy">{intent.subjectTag}</span> for internal routing.
          We will follow up using the email you provided, as soon as practical.
        </p>
        {hasScheduling && (
          <p className="text-[14px] text-structural leading-relaxed">
            Prefer to pick a time yourself?{" "}
            <a
              href={APP_SCHEDULING_URL}
              className="font-medium text-ocean hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the scheduling link
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`space-y-6 ${className}`}
      aria-describedby="contact-form-note"
    >
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-ocean mb-2">{intent.eyebrow}</p>
        <h2 className="text-[24px] sm:text-[28px] leading-[1.12] mb-2">{intent.title}</h2>
        <p id="contact-form-note" className="text-[14px] leading-relaxed text-structural">
          {intent.intro} This is a routed request, not a live chat or CRM portal.
        </p>
      </div>

      {!lockIntent && (
        <div>
          <label htmlFor="intent" className="block text-[13.5px] font-medium text-navy mb-1.5">
            How can we help?
          </label>
          <select
            id="intent"
            name="intentSelect"
            value={intentId}
            onChange={(e) => setIntentId(getContactIntent(e.target.value).id)}
            className="w-full border rounded-sm bg-white px-3.5 py-2.5 text-[15px]"
            style={{ borderColor: "var(--hairline-strong)" }}
          >
            {[
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
            ].map((id) => {
              const cfg = getContactIntent(id);
              return (
                <option key={cfg.id} value={cfg.id}>
                  {cfg.label}
                </option>
              );
            })}
          </select>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-structural">
            Changes the fields and routes the request with a subject tag for internal email handling.
          </p>
        </div>
      )}

      {/* Honeypot field: hidden from sighted and screen-reader users, bots still fill it. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="company_website">Company website</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="formStartedAt" value={String(formStartedAt)} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Name"
          name="name"
          error={errors.name}
          autoComplete="name"
          helper="Who should be contacted."
          required
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          error={errors.email}
          autoComplete="email"
          helper="Use the address you want the follow-up routed to."
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Company"
          name="company"
          error={errors.company}
          autoComplete="organization"
          helper="Operator, manager, yard, insurer, advisory, or media organization."
          required={intent.salesFields}
        />
        <SelectField
          label="Role"
          name="role"
          options={[...ROLE_OPTIONS]}
          helper="Helps route your request. Optional."
          required={false}
          placeholder="Select a role (optional)"
        />
      </div>

      {intent.salesFields && (
        <>
          <div className="grid sm:grid-cols-2 gap-5">
            <SelectField
              label="Fleet size"
              name="fleetSize"
              error={errors.fleetSize}
              options={[...FLEET_SIZE_OPTIONS]}
              helper="Approximate scope is enough."
              required
            />
            <SelectField
              label="Vessel count"
              name="vesselCount"
              error={errors.vesselCount}
              options={[...VESSEL_COUNT_OPTIONS]}
              helper="Range is fine — used for routing and scoping only."
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <SelectField
              label="Objective"
              name="objective"
              error={errors.objective}
              options={[...OBJECTIVE_OPTIONS]}
              helper="Helps avoid a generic product tour."
              required
            />
            <SelectField
              label="Timeline"
              name="timeline"
              error={errors.timeline}
              options={[...TIMELINE_OPTIONS]}
              helper="Use the closest option."
              required
            />
          </div>

          <div>
            <label htmlFor="currentProcess" className="block text-[13.5px] font-medium text-navy mb-1.5">
              Current process{" "}
              <span className="font-normal text-structural" aria-hidden="true">
                (optional)
              </span>
            </label>
            <p id="currentProcess-helper" className="mb-2 text-[12.5px] leading-relaxed text-structural">
              How you track cyber evidence, findings, or readiness today (spreadsheets, SMS tools, email, etc.).
            </p>
            <textarea
              id="currentProcess"
              name="currentProcess"
              rows={3}
              className="w-full border rounded-sm px-3.5 py-2.5 text-[15px] bg-white"
              style={{ borderColor: "var(--hairline-strong)" }}
              aria-describedby="currentProcess-helper"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <SelectField
              label="Document request"
              name="documentRequestType"
              options={[...DOCUMENT_REQUEST_OPTIONS]}
              helper="Optional — procurement or security materials interest."
              required={false}
              placeholder="Select if needed (optional)"
            />
            <div className="flex flex-col justify-end">
              <div className="rounded-sm border px-3.5 py-3" style={{ borderColor: "var(--hairline-strong)" }}>
                <label htmlFor="documentInterest" className="flex items-start gap-3 cursor-pointer">
                  <input
                    id="documentInterest"
                    name="documentInterest"
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 rounded border accent-[#1478B8]"
                    style={{ borderColor: "var(--hairline-strong)" }}
                  />
                  <span>
                    <span className="block text-[13.5px] font-medium text-navy">
                      I&apos;m interested in procurement / security documents
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-relaxed text-structural">
                      Optional — for routing only. Not required to submit.
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </>
      )}

      {(intent.id === "security" || intent.id === "procurement") && !intent.salesFields && (
        <SelectField
          label="Document request type"
          name="documentRequestType"
          options={[...DOCUMENT_REQUEST_OPTIONS].filter((o) => o !== "None")}
          helper="What materials or support do you need?"
          required={false}
          placeholder="Select document type (optional)"
        />
      )}

      <div>
        <label htmlFor="message" className="block text-[13.5px] font-medium text-navy mb-1.5">
          Message{" "}
          <span className="font-normal text-structural" aria-hidden="true">
            (required)
          </span>
        </label>
        <p id="message-helper" className="mb-2 text-[12.5px] leading-relaxed text-structural">
          {intent.salesFields
            ? "Useful context: upcoming survey or review pressure, evidence condition, vessel scope, or the workflow that is breaking down."
            : "Share the context we need to route this correctly. Avoid pasting secrets or exploit payloads."}
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

      <p className="text-[12.5px] leading-relaxed text-structural">
        By submitting, you agree we may use the details you provide to respond to this request. See our{" "}
        <a href="/privacy" className="text-ocean hover:underline">
          Privacy notice
        </a>
        . We do not sell contact data.
      </p>

      {(status === "error" || errors.form) && (
        <p
          role="alert"
          className="text-[14px] rounded-sm px-4 py-3"
          style={{ background: "var(--status-critical-bg)", color: "var(--status-critical)" }}
        >
          {errors.form ?? (
            <>
              The website could not deliver this request. Please email{" "}
              <a href={`mailto:${APP_SALES_EMAIL}`} className="underline">
                {APP_SALES_EMAIL}
              </a>{" "}
              directly with the same details.
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-md bg-[#1478B8] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0f639a] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : intent.submitLabel}
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
        ) : (
          <span className="font-normal text-structural" aria-hidden="true">
            {" "}
            (optional)
          </span>
        )}
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
