"use client";

import { useState } from "react";
import { LiquidGlass } from "@/components/LiquidGlass";
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

  const activeScreen = activeStep.screen;

  return (
    <>
      <div className="grid gap-4 lg:hidden">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Product workflow stages"
        >
          {steps.map((step, index) => {
            const isActive = step.id === activeStep.id;
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(step.id)}
                className={`liquid-glass lg-pad-sm shrink-0 text-left text-[13px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean ${
                  isActive ? "liquid-glass--strong" : "liquid-glass--interactive"
                }`}
              >
                <span className="font-mono text-[10px] font-medium text-ocean">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-0.5 block max-w-[9rem] truncate">{step.kicker}</span>
              </button>
            );
          })}
        </div>

        <article className="grid gap-4">
          <LiquidGlass variant="strong" padding="md">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-structural">{activeStep.kicker}</p>
            <h3 className="mt-2 text-[20px] font-semibold leading-snug text-navy">{activeStep.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-structural">{activeStep.body}</p>
          </LiquidGlass>
          <LiquidGlass variant="default" padding="sm">
            <ProductScreenFrame
              src={activeScreen.src}
              alt={activeScreen.alt}
              label={activeScreen.label}
              annotations={activeScreen.annotations}
              interactive={false}
              priority
              sizes="100vw"
              className="product-showcase-frame"
            />
          </LiquidGlass>
          <LiquidGlass variant="subtle" padding="md">
            <div className="grid gap-3 text-[13.5px] leading-relaxed text-structural sm:grid-cols-2">
              <p>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Owner</span>
                <span className="mt-1 block text-navy">{activeStep.owner}</span>
              </p>
              <p>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Captured decision</span>
                <span className="mt-1 block text-navy">{activeStep.decision}</span>
              </p>
            </div>
          </LiquidGlass>
        </article>
      </div>

      <div className="hidden gap-8 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <LiquidGlass variant="strong" padding="sm">
            <ProductScreenFrame
              src={activeScreen.src}
              alt={activeScreen.alt}
              label={activeScreen.label}
              annotations={activeScreen.annotations}
              interactive={false}
              priority
              sizes="(min-width: 1280px) 52vw, (min-width: 768px) 86vw, 100vw"
              className="product-showcase-frame"
            />
          </LiquidGlass>
          <LiquidGlass variant="subtle" padding="md" className="mt-4">
            <div className="grid gap-3 text-[13.5px] leading-relaxed text-structural sm:grid-cols-2">
              <p>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Owner</span>
                <span className="mt-1 block text-navy">{activeStep.owner}</span>
              </p>
              <p>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Captured decision</span>
                <span className="mt-1 block text-navy">{activeStep.decision}</span>
              </p>
            </div>
          </LiquidGlass>
        </div>

        <div className="grid gap-3" aria-label="Product workflow stages">
          {steps.map((step) => {
            const isActive = step.id === activeStep.id;
            return (
              <button
                key={step.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(step.id)}
                className={`liquid-glass lg-pad-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean ${
                  isActive ? "liquid-glass--strong" : "liquid-glass--interactive"
                }`}
              >
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-structural">
                  {step.kicker}
                </span>
                <span className="block text-[18px] font-semibold leading-snug text-navy">{step.title}</span>
                <span className="mt-2 block text-[14.5px] leading-relaxed text-structural">{step.body}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
