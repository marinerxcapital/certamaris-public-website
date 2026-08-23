"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import {
  calculatePricingEstimate,
  DEFAULT_PRICING_STATE,
  formatUsd,
  ONBOARD_ASSESSMENT_USD,
  PRICING_MAX_VESSELS,
  PRICING_MIN_VESSELS,
  PRICING_RANGE_MAX_VESSELS,
  REMOTE_QA_REPORT_USD,
  clampVesselCount,
  parsePricingSearchParams,
  serializePricingSearchParams,
  type PricingCalculatorState,
} from "@/lib/pricing-calculator";

function hydrateFromQuery(): PricingCalculatorState {
  if (typeof window === "undefined") return DEFAULT_PRICING_STATE;
  return parsePricingSearchParams(new URLSearchParams(window.location.search));
}

export function PricingCalculator() {
  const [input, setInput] = useState<PricingCalculatorState>(DEFAULT_PRICING_STATE);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setInput(hydrateFromQuery());
    setHydrated(true);
  }, []);

  useEffect(() => {
    const onPopState = () => setInput(hydrateFromQuery());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const estimate = useMemo(() => calculatePricingEstimate(input), [input]);
  const query = serializePricingSearchParams(estimate.state).toString();
  const shareUrl = hydrated && typeof window !== "undefined" ? `${window.location.origin}/pricing?${query}` : `/pricing?${query}`;
  const minimumApplies = estimate.billedVessels > estimate.state.contractedVessels;
  const invalid = !estimate.validation.valid;

  const update = (patch: Partial<PricingCalculatorState>) => {
    setCopied(false);
    setInput((current) => {
      const next = { ...current, ...patch };
      if (patch.totalFleetVessels !== undefined && next.contractedVessels > patch.totalFleetVessels) {
        next.contractedVessels = patch.totalFleetVessels;
      }
      if (patch.contractedVessels !== undefined && patch.contractedVessels > next.totalFleetVessels) {
        next.contractedVessels = next.totalFleetVessels;
      }
      return next;
    });
  };

  const copyShareUrl = async () => {
    const nextPath = `/pricing?${query}`;
    window.history.pushState(null, "", nextPath);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const quoteHref = `/contact?intent=procurement&fleet=${estimate.state.totalFleetVessels}&contracted=${estimate.state.contractedVessels}&tier=${estimate.tier.id}&estimatedAnnual=${estimate.annualTotalUsd}`;

  return (
    <div className="liquid-glass liquid-glass--subtle lg-pad-lg" data-qa="pricing-calculator-v2">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean-deep">
              Live fleet estimate
            </p>
            <StatusBadge status="caution" label="Non-binding estimate" />
          </div>
          <h2 id="pricing-calculator-heading" className="section-h2 section-h2--lg mb-4">
            Estimate annual platform and optional assurance services.
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-structural">
            Enter total fleet and contracted-vessel scope separately. The estimate uses published annual platform
            pricing plus optional remote QA-reviewed reports or on-board assessment anchors.
          </p>

          <div className="mt-6 grid gap-5" aria-labelledby="pricing-calculator-heading">
            <VesselInput
              id="calc-total-fleet"
              label="Total fleet vessels"
              value={estimate.state.totalFleetVessels}
              onChange={(value) => update({ totalFleetVessels: value })}
            />
            <VesselInput
              id="calc-contracted"
              label="Contracted vessels"
              value={estimate.state.contractedVessels}
              onChange={(value) => update({ contractedVessels: value })}
            />
            {invalid ? (
              <p id="pricing-error" className="rounded-md border border-status-critical/25 bg-white/70 p-3 text-[13px] font-medium leading-relaxed text-status-critical">
                {estimate.validation.errors.join(" ")}
              </p>
            ) : null}
            <fieldset className="grid gap-3">
              <legend className="text-[13.5px] font-semibold text-navy">Optional services</legend>
              <Toggle
                id="remote-qa"
                checked={estimate.state.remoteQaReports}
                label="Remote QA-reviewed reports"
                detail={`${formatUsd(REMOTE_QA_REPORT_USD)} / contracted vessel`}
                onChange={(checked) => update({ remoteQaReports: checked })}
              />
              <Toggle
                id="onboard-assessments"
                checked={estimate.state.onboardAssessments}
                label="On-board assessments"
                detail={`${formatUsd(ONBOARD_ASSESSMENT_USD)} / contracted vessel; travel is additional`}
                onChange={(checked) => update({ onboardAssessments: checked })}
              />
            </fieldset>
          </div>
        </div>

        <div
          role="status"
          aria-live="polite"
          className="rounded-md border border-ocean/20 bg-white/82 p-5 shadow-[0_10px_24px_rgba(11,42,74,0.06)]"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean-deep">{estimate.tier.name}</p>
          <p className="mt-2 font-display text-[34px] font-semibold leading-none text-navy sm:text-[40px]">
            {formatUsd(estimate.annualTotalUsd)}
            <span className="ml-2 font-body text-[15px] font-normal text-structural">estimate</span>
          </p>
          <dl className="mt-4 grid gap-2 text-[13.5px] leading-relaxed text-structural">
            <Line label="Platform fee" value={formatUsd(estimate.platformAnnualUsd)} />
            <Line label="Contracted-vessel licenses" value={formatUsd(estimate.licenseAnnualUsd)} />
            <Line label="Remote QA-reviewed reports" value={formatUsd(estimate.remoteQaAnnualUsd)} />
            <Line label="On-board assessments" value={formatUsd(estimate.onboardAnnualUsd)} />
            <Line label="Contracted / total vessels" value={`${estimate.state.contractedVessels} / ${estimate.state.totalFleetVessels}`} />
          </dl>
          <p className="mt-3 text-[12.5px] leading-relaxed text-structural">
            {formatUsd(estimate.tier.platformFeeUsd)} platform + {formatUsd(estimate.tier.perVesselUsd)} x{" "}
            {estimate.billedVessels} billed vessel{estimate.billedVessels === 1 ? "" : "s"}.
            {minimumApplies ? ` ${estimate.tier.name} minimum applies.` : " Billing matches contracted-vessel count."}
          </p>
          <p className="mt-3 rounded-md border border-navy/10 bg-paper/70 p-3 text-[12.5px] leading-relaxed text-structural">
            This is a non-binding estimate, not a formal quote. Final pricing is subject to confirmed scope, contract
            terms, taxes, travel, expenses, and customer-specific services.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={quoteHref} aria-disabled={invalid} className={invalid ? "pointer-events-none opacity-55" : ""}>
              Scope this estimate
            </Button>
            <Button href="#package-comparison" variant="secondary">
              Compare packages
            </Button>
            <button
              type="button"
              onClick={copyShareUrl}
              disabled={invalid}
              className="min-h-11 rounded-md border border-navy/20 bg-white/70 px-4 py-2 text-[14px] font-semibold text-navy transition hover:border-ocean/40 hover:text-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55"
            >
              {copied ? "Estimate link copied" : "Share estimate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VesselInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const rangeValue = Math.min(value, PRICING_RANGE_MAX_VESSELS);
  return (
    <div className="grid gap-3">
      <label htmlFor={id} className="text-[13.5px] font-semibold text-navy">
        {label}
      </label>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_6.5rem] sm:items-center">
        <input
          id={id}
          type="range"
          min={PRICING_MIN_VESSELS}
          max={PRICING_RANGE_MAX_VESSELS}
          value={rangeValue}
          step={1}
          aria-valuetext={value >= PRICING_RANGE_MAX_VESSELS ? `${value} vessels, range at 60 plus` : `${value} vessels`}
          className="w-full accent-[#1478B8]"
          onChange={(event) => onChange(clampVesselCount(Number(event.target.value)))}
        />
        <input
          type="number"
          min={PRICING_MIN_VESSELS}
          max={PRICING_MAX_VESSELS}
          value={value}
          aria-label={`${label} exact count`}
          className="min-h-11 rounded-md border border-navy/20 bg-white px-3 py-2 font-mono text-[14px] text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
          onChange={(event) => {
            if (event.target.value === "") return;
            onChange(clampVesselCount(Number(event.target.value)));
          }}
        />
      </div>
    </div>
  );
}

function Toggle({
  id,
  checked,
  label,
  detail,
  onChange,
}: {
  id: string;
  checked: boolean;
  label: string;
  detail: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-md border border-navy/10 bg-white/70 p-3 hover:border-ocean/35"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 accent-[#1478B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean"
      />
      <span>
        <span className="block text-[14px] font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-structural">{detail}</span>
      </span>
    </label>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-navy/8 pb-2 last:border-0">
      <dt>{label}</dt>
      <dd className="font-mono text-navy">{value}</dd>
    </div>
  );
}
