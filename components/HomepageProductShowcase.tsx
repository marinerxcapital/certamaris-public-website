"use client";

import { useState } from "react";
import { ProductScreenFrame } from "@/components/ProductScreens";
import type { ProductProofScreen } from "@/lib/product-screens";

type ShowcaseStep = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  owner: string;
  decision: string;
  screen: ProductProofScreen;
};

export function HomepageProductShowcase({ steps }: { steps: ShowcaseStep[] }) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? "");
  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === activeId)
  );
  const activeStep = steps[activeIndex] ?? steps[0];

  if (!activeStep) return null;

  return (
    <>
      <div className="grid gap-6 lg:hidden">
        {steps.map((step, index) => (
          <article key={step.id} className="grid gap-4">
            <div className="rounded-md border border-navy/10 bg-white/76 p-5">
              <span className="mb-3 flex items-center gap-3">
                <span className="font-mono text-[12px] text-ocean">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-structural">{step.kicker}</span>
              </span>
              <h3 className="text-[20px] font-semibold leading-snug text-navy">{step.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-structural">{step.body}</p>
            </div>
            <ProductScreenFrame
              {...step.screen}
              interactive={false}
              priority={index === 0}
              sizes="100vw"
              className="product-showcase-frame"
            />
            <div className="grid gap-3 rounded-md border border-navy/10 bg-white/82 p-4 text-[13.5px] leading-relaxed text-structural">
              <p>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Owner</span>
                <span className="mt-1 block text-navy">{step.owner}</span>
              </p>
              <p>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Captured decision</span>
                <span className="mt-1 block text-navy">{step.decision}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden gap-8 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
      <div className="lg:sticky lg:top-28">
        <ProductScreenFrame
          {...activeStep.screen}
          interactive={false}
          priority
          sizes="(min-width: 1280px) 52vw, (min-width: 768px) 86vw, 100vw"
          className="product-showcase-frame"
        />
        <div className="mt-4 grid gap-3 rounded-md border border-navy/10 bg-white/82 p-4 text-[13.5px] leading-relaxed text-structural backdrop-blur-sm sm:grid-cols-2">
          <p>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Owner</span>
            <span className="mt-1 block text-navy">{activeStep.owner}</span>
          </p>
          <p>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Captured decision</span>
            <span className="mt-1 block text-navy">{activeStep.decision}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-3" aria-label="Product workflow stages">
        {steps.map((step, index) => {
          const isActive = step.id === activeStep.id;
          return (
            <button
              key={step.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(step.id)}
              className={`rounded-md border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean ${
                isActive
                  ? "border-ocean/45 bg-white shadow-card"
                  : "border-navy/10 bg-white/64 hover:border-ocean/25 hover:bg-white/86"
              }`}
            >
              <span className="mb-3 flex items-center gap-3">
                <span className="font-mono text-[12px] text-ocean">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-structural">{step.kicker}</span>
              </span>
              <span className="block text-[19px] font-semibold leading-snug text-navy">{step.title}</span>
              <span className="mt-2 block text-[14.5px] leading-relaxed text-structural">{step.body}</span>
            </button>
          );
        })}
      </div>
    </div>
    </>
  );
}
