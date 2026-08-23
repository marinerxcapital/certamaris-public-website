"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { pricingCalculatorTiers } from "@/lib/faq-pricing";

const MIN_VESSELS = 1;
const RANGE_MAX_VESSELS = 60;
const NUMBER_MAX_VESSELS = 500;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function clampVessels(value: number): number {
  if (!Number.isFinite(value)) return MIN_VESSELS;
  return Math.max(MIN_VESSELS, Math.min(NUMBER_MAX_VESSELS, Math.round(value)));
}

function tierFor(vesselCount: number) {
  return pricingCalculatorTiers.find((tier) => vesselCount <= tier.maxVessels) ?? pricingCalculatorTiers[0];
}

export function PricingCalculator() {
  const [vesselCount, setVesselCount] = useState(5);

  const estimate = useMemo(() => {
    const tier = tierFor(vesselCount);
    const billedVessels = Math.max(vesselCount, tier.minVessels);
    const annualTotal = tier.platformFeeUsd + tier.perVesselUsd * billedVessels;
    return { tier, billedVessels, annualTotal };
  }, [vesselCount]);

  const quoteHref = `/contact?intent=procurement&vessels=${vesselCount}&tier=${estimate.tier.id}&estimatedAnnual=${estimate.annualTotal}`;
  const rangeValue = Math.min(vesselCount, RANGE_MAX_VESSELS);
  const minimumApplies = estimate.billedVessels > vesselCount;

  return (
    <div className="liquid-glass liquid-glass--subtle lg-pad-lg">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:items-center">
        <div>
          <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ocean-deep">
            Live fleet estimate
          </p>
          <h2 id="pricing-calculator-heading" className="section-h2 section-h2--lg mb-4">
            Estimate your annual platform cost.
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-structural">
            Enter a vessel count to compute the published annual platform fee plus contracted-vessel licensing. This
            does not include optional services, remote QA-reviewed reports, taxes, travel, or expenses.
          </p>

          <div className="mt-6 grid gap-4" aria-labelledby="pricing-calculator-heading">
            <label htmlFor="calc-vessels" className="text-[13.5px] font-semibold text-navy">
              Number of vessels
            </label>
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_6.5rem] sm:items-center">
              <input
                id="calc-vessels"
                type="range"
                min={MIN_VESSELS}
                max={RANGE_MAX_VESSELS}
                value={rangeValue}
                step={1}
                aria-describedby="calc-vessels-help"
                aria-valuetext={vesselCount >= RANGE_MAX_VESSELS ? `${vesselCount} vessels, range at 60 plus` : `${vesselCount} vessels`}
                className="w-full accent-[#1478B8]"
                onChange={(event) => setVesselCount(clampVessels(Number(event.target.value)))}
              />
              <input
                id="calc-vessels-num"
                type="number"
                min={MIN_VESSELS}
                max={NUMBER_MAX_VESSELS}
                value={vesselCount}
                aria-label="Exact vessel count"
                className="min-h-11 rounded-md border border-navy/20 bg-white px-3 py-2 font-mono text-[14px] text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
                onChange={(event) => {
                  if (event.target.value === "") return;
                  setVesselCount(clampVessels(Number(event.target.value)));
                }}
              />
            </div>
            <p id="calc-vessels-help" className="text-[12.5px] leading-relaxed text-structural">
              Slider covers 1-60 vessels; use the exact-count field for larger fleets up to 500.
            </p>
          </div>
        </div>

        <div
          role="status"
          aria-live="polite"
          className="rounded-md border border-ocean/20 bg-white/78 p-5 shadow-[0_10px_24px_rgba(11,42,74,0.06)]"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean-deep">{estimate.tier.name}</p>
          <p className="mt-2 font-display text-[34px] font-semibold leading-none text-navy sm:text-[40px]">
            {usd.format(estimate.annualTotal)}
            <span className="ml-2 font-body text-[15px] font-normal text-structural">/ year</span>
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-structural">
            {usd.format(estimate.tier.platformFeeUsd)} platform + {usd.format(estimate.tier.perVesselUsd)} x{" "}
            {estimate.billedVessels} vessel{estimate.billedVessels === 1 ? "" : "s"}
          </p>
          {minimumApplies ? (
            <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-status-caution">
              Billing at the {estimate.tier.minVessels}-vessel {estimate.tier.name} minimum.
            </p>
          ) : (
            <p className="mt-2 text-[12.5px] leading-relaxed text-structural">
              Billing matches the entered vessel count.
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={quoteHref}>Get this exact quote</Button>
            <Button href="#package-comparison" variant="secondary">
              Compare packages
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
