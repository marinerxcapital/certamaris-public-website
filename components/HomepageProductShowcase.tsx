"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { LiquidGlass } from "@/components/LiquidGlass";
import { ProductScreenFrame } from "@/components/ProductScreens";
import type { ProductProofScreen } from "@/lib/product-screens";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type ShowcaseStep = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  owner: string;
  decision: string;
  screen: ProductProofScreen;
};

/** Directional slide+fade between stages. Opacity never drops to 0 so the
 * panel stays legible even if an exit/enter frame is interrupted. */
const stageMotion = (direction: number) => ({
  initial: { opacity: 0.4, x: 26 * direction },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0.4, x: -18 * direction },
  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
});

export function HomepageProductShowcase({ steps }: { steps: ShowcaseStep[] }) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? "");
  const [direction, setDirection] = useState(1);
  const reduced = usePrefersReducedMotion();
  const baseId = useId();

  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === activeId)
  );
  const activeStep = steps[activeIndex] ?? steps[0];

  if (!activeStep) return null;

  const activeScreen = activeStep.screen;

  const select = (id: string) => {
    const to = steps.findIndex((step) => step.id === id);
    setDirection(to >= activeIndex ? 1 : -1);
    setActiveId(id);
  };

  /** Roving-focus arrow navigation per the ARIA tabs pattern (automatic activation). */
  const onTablistKeyDown = (event: React.KeyboardEvent, scope: "m" | "d") => {
    const forward = scope === "d" ? "ArrowDown" : "ArrowRight";
    const backward = scope === "d" ? "ArrowUp" : "ArrowLeft";
    let nextIndex: number | null = null;
    if (event.key === forward) nextIndex = (activeIndex + 1) % steps.length;
    else if (event.key === backward) nextIndex = (activeIndex - 1 + steps.length) % steps.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = steps.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    select(steps[nextIndex].id);
    document.getElementById(`${baseId}-${scope}-tab-${steps[nextIndex].id}`)?.focus();
  };

  const stageCounter = (
    <p className="mb-3 flex items-center gap-3" aria-hidden="true">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ocean tabular-nums">
        Stage {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
      </span>
      <span className="h-[3px] w-28 overflow-hidden rounded-full bg-ocean/15">
        <span
          className="block h-full rounded-full bg-ocean"
          style={{
            width: `${((activeIndex + 1) / steps.length) * 100}%`,
            transition: reduced ? "none" : "width 280ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </span>
    </p>
  );

  const detailGrid = (
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
  );

  const mobilePanel = (
    <article className="grid gap-4">
      <LiquidGlass variant="strong" padding="md">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-structural">{activeStep.kicker}</p>
        <h3 className="mt-2 text-[20px] font-semibold leading-snug text-navy">{activeStep.title}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-structural">{activeStep.body}</p>
      </LiquidGlass>
      <LiquidGlass variant="default" padding="sm">
        <ProductScreenFrame
          src={activeScreen.src}
          fullSrc={activeScreen.fullSrc}
          alt={activeScreen.alt}
          label={activeScreen.label}
          width={activeScreen.width}
          height={activeScreen.height}
          annotations={activeScreen.annotations}
          interactive={false}
          priority
          sizes="100vw"
          className="product-showcase-frame"
        />
      </LiquidGlass>
      <LiquidGlass variant="subtle" padding="md">{detailGrid}</LiquidGlass>
    </article>
  );

  const desktopPanel = (
    <>
      <LiquidGlass variant="strong" padding="sm">
        <ProductScreenFrame
          src={activeScreen.src}
          fullSrc={activeScreen.fullSrc}
          alt={activeScreen.alt}
          label={activeScreen.label}
          width={activeScreen.width}
          height={activeScreen.height}
          annotations={activeScreen.annotations}
          interactive={false}
          priority
          sizes="(min-width: 1280px) 52vw, (min-width: 768px) 86vw, 100vw"
          className="product-showcase-frame"
        />
      </LiquidGlass>
      <LiquidGlass variant="subtle" padding="md" className="mt-4">
        {detailGrid}
      </LiquidGlass>
    </>
  );

  return (
    <>
      <div className="grid min-w-0 gap-4 lg:hidden">
        {stageCounter}
        <div
          className="flex w-full min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1"
          role="tablist"
          aria-label="Product workflow stages"
          onKeyDown={(event) => onTablistKeyDown(event, "m")}
        >
          {steps.map((step, index) => {
            const isActive = step.id === activeStep.id;
            return (
              <button
                key={step.id}
                id={`${baseId}-m-tab-${step.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-m-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(step.id)}
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

        <div
          id={`${baseId}-m-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-m-tab-${activeStep.id}`}
        >
          {reduced ? (
            mobilePanel
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeStep.id} {...stageMotion(direction)}>
                {mobilePanel}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="hidden gap-8 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div
          className="lg:sticky lg:top-28"
          id={`${baseId}-d-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-d-tab-${activeStep.id}`}
        >
          {stageCounter}
          {reduced ? (
            desktopPanel
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeStep.id} {...stageMotion(direction)}>
                {desktopPanel}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div
          className="grid gap-3"
          role="tablist"
          aria-label="Product workflow stages"
          aria-orientation="vertical"
          onKeyDown={(event) => onTablistKeyDown(event, "d")}
        >
          {steps.map((step) => {
            const isActive = step.id === activeStep.id;
            return (
              <button
                key={step.id}
                id={`${baseId}-d-tab-${step.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-d-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(step.id)}
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
