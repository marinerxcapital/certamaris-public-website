"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/Button";
import {
  packageTiers,
  recommendPackage,
  type RecommenderInput,
  type PackageTierId,
} from "@/lib/faq-pricing";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";

const vesselOptions: { value: RecommenderInput["vesselCount"]; label: string }[] = [
  { value: "1-5", label: "1–5 vessels" },
  { value: "6-20", label: "6–20 vessels" },
  { value: "21-50", label: "21–50 vessels" },
  { value: "50+", label: "50+ vessels" },
];

const companyOptions: { value: RecommenderInput["companyCount"]; label: string }[] = [
  { value: "1", label: "1 company / manager" },
  { value: "2-5", label: "2–5 companies or managers" },
  { value: "6+", label: "6+ organizations" },
];

const timelineOptions: { value: RecommenderInput["surveyTimeline"]; label: string }[] = [
  { value: "urgent", label: "Survey / review in progress or imminent" },
  { value: "90-days", label: "Within 90 days" },
  { value: "this-year", label: "This year" },
  { value: "exploratory", label: "Exploratory" },
];

export function PackageRecommender() {
  const [vesselCount, setVesselCount] = useState<RecommenderInput["vesselCount"]>("1-5");
  const [companyCount, setCompanyCount] = useState<RecommenderInput["companyCount"]>("1");
  const [needsSso, setNeedsSso] = useState(false);
  const [needsIntegrations, setNeedsIntegrations] = useState(false);
  const [surveyTimeline, setSurveyTimeline] =
    useState<RecommenderInput["surveyTimeline"]>("exploratory");
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(
    () =>
      recommendPackage({
        vesselCount,
        companyCount,
        needsSso,
        needsIntegrations,
        surveyTimeline,
      }),
    [vesselCount, companyCount, needsSso, needsIntegrations, surveyTimeline]
  );

  return (
    <div className="premium-card p-6 sm:p-8">
      <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean mb-2">Package guide</p>
      <h3 className="text-[22px] font-semibold mb-2">Which package shape fits?</h3>
      <p className="text-[14px] text-structural leading-relaxed mb-6">
        Answer a few scoping questions. We recommend a package <strong>by name only</strong> — no prices, no
        commitment. Final commercial scope is confirmed with CertaMaris.
      </p>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <Fieldset legend="Vessel count">
          <div className="grid sm:grid-cols-2 gap-2">
            {vesselOptions.map((opt) => (
              <RadioChip
                key={opt.value}
                name="vesselCount"
                checked={vesselCount === opt.value}
                onChange={() => {
                  setVesselCount(opt.value);
                  setSubmitted(false);
                }}
                label={opt.label}
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Companies / managers in scope">
          <div className="grid sm:grid-cols-3 gap-2">
            {companyOptions.map((opt) => (
              <RadioChip
                key={opt.value}
                name="companyCount"
                checked={companyCount === opt.value}
                onChange={() => {
                  setCompanyCount(opt.value);
                  setSubmitted(false);
                }}
                label={opt.label}
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Survey / readiness timeline">
          <div className="grid sm:grid-cols-2 gap-2">
            {timelineOptions.map((opt) => (
              <RadioChip
                key={opt.value}
                name="surveyTimeline"
                checked={surveyTimeline === opt.value}
                onChange={() => {
                  setSurveyTimeline(opt.value);
                  setSubmitted(false);
                }}
                label={opt.label}
              />
            ))}
          </div>
        </Fieldset>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label className="inline-flex items-start gap-2.5 cursor-pointer text-[14px] text-navy">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#1478B8]"
              checked={needsSso}
              onChange={(e) => {
                setNeedsSso(e.target.checked);
                setSubmitted(false);
              }}
            />
            <span>We need SSO (and likely SCIM)</span>
          </label>
          <label className="inline-flex items-start gap-2.5 cursor-pointer text-[14px] text-navy">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#1478B8]"
              checked={needsIntegrations}
              onChange={(e) => {
                setNeedsIntegrations(e.target.checked);
                setSubmitted(false);
              }}
            />
            <span>We need integrations or API access</span>
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#0e3a68]"
        >
          Show recommended package
        </button>
      </form>

      {submitted && (
        <div
          role="status"
          className="mt-6 rounded-md border border-ocean/25 bg-ocean/5 p-5"
          aria-live="polite"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ocean mb-1">Suggested package</p>
          <p className="text-[20px] font-semibold text-navy mb-1">{result.tier.name}</p>
          <p className="text-[14px] text-structural mb-3">{result.tier.summary}</p>
          <ul className="mb-4 space-y-2">
            {result.rationale.map((reason) => (
              <li key={reason} className="flex gap-2 text-[13.5px] leading-relaxed text-structural">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                {reason}
              </li>
            ))}
          </ul>
          <p className="text-[12.5px] text-structural leading-relaxed mb-4">
            This is guidance only. Packages describe capability shape — not a quote. Pricing is engagement-scoped.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/contact?intent=sales&package=${result.tier.id}`}>{PRIMARY_CTA_LABEL}</Button>
            <Button href="#package-comparison" variant="secondary">
              Compare all packages
            </Button>
          </div>
          <PackageStrip highlight={result.tier.id} />
        </div>
      )}
    </div>
  );
}

function PackageStrip({ highlight }: { highlight: PackageTierId }) {
  return (
    <ul className="mt-5 grid gap-2 sm:grid-cols-3" aria-label="All package names">
      {packageTiers.map((tier) => {
        const active = tier.id === highlight;
        return (
          <li
            key={tier.id}
            className={`rounded-sm border px-3 py-2 text-center text-[13px] font-medium ${
              active ? "border-ocean bg-white text-navy" : "border-navy/10 text-structural"
            }`}
          >
            {tier.name}
            {active ? (
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-ocean">
                Suggested
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[13.5px] font-medium text-navy">{legend}</legend>
      {children}
    </fieldset>
  );
}

function RadioChip({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2.5 text-[13.5px] leading-snug ${
        checked ? "border-ocean bg-ocean/5 text-navy" : "border-navy/15 text-structural"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-[#1478B8]" />
      {label}
    </label>
  );
}
