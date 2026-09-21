"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { DomainIcon } from "@/components/DomainIcons";
import { assuranceStages } from "@/lib/assurance-lifecycle";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function AssuranceLifecycleTeaser() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const panelId = useId();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = usePrefersReducedMotion();
  const active = assuranceStages[activeIndex] ?? assuranceStages[0];
  const goTo = (index: number, moveFocus = false) => {
    const next = Math.max(0, Math.min(assuranceStages.length - 1, index));
    setActiveIndex(next);
    if (moveFocus) {
      requestAnimationFrame(() => buttonRefs.current[next]?.focus());
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("js");
    setMounted(true);
  }, []);

  useEffect(() => {
    const lifecycleCode = new URLSearchParams(window.location.search).get("lifecycle")?.toUpperCase();
    if (!lifecycleCode) return;
    const requestedIndex = assuranceStages.findIndex((stage) => stage.code === lifecycleCode);
    if (requestedIndex >= 0) setActiveIndex(requestedIndex);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (reduced) {
      setRevealed(true);
      return;
    }
    setRevealed(false);
    const frame = window.requestAnimationFrame(() => setRevealed(true));
    return () => window.cancelAnimationFrame(frame);
  }, [mounted, reduced]);

  return (
    <div className="liquid-glass liquid-glass--strong lg-pad-md" data-qa="assurance-lifecycle-teaser">
      <div className="flex flex-col gap-4 border-b border-navy/10 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-deep">
            Interactive assurance record
          </p>
          <h3 className="mt-2 text-[20px] font-semibold leading-snug text-navy">
            REQ to PKG is a linked record, not ten isolated checklists.
          </h3>
        </div>
        <Link href="/demo#chain-inspector" className="text-[14px] font-semibold text-ocean hover:underline">
          Inspect the full chain
        </Link>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.55fr)] lg:items-start">
        <ol
          className={`lifecycle-teaser-graph${revealed ? " is-revealed" : ""}`}
          aria-label="Assurance record lifecycle"
        >
          {assuranceStages.map((step, index) => {
            const activeStage = index === activeIndex;
            return (
              <li
                key={step.code}
                className="lifecycle-teaser-node"
                style={
                  reduced
                    ? undefined
                    : {
                        transitionDelay: revealed ? `${index * 35}ms` : "0ms",
                      }
                }
              >
                <button
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  type="button"
                  aria-pressed={activeStage}
                  aria-describedby={activeStage ? panelId : undefined}
                  className={`lifecycle-teaser-button${activeStage ? " is-active" : ""}`}
                  onMouseEnter={() => goTo(index)}
                  onFocus={() => goTo(index)}
                  onClick={() => goTo(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                      event.preventDefault();
                      goTo(index + 1, true);
                    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                      event.preventDefault();
                      goTo(index - 1, true);
                    } else if (event.key === "Home") {
                      event.preventDefault();
                      goTo(0, true);
                    } else if (event.key === "End") {
                      event.preventDefault();
                      goTo(assuranceStages.length - 1, true);
                    }
                  }}
                >
                  <DomainIcon id={step.code} className="lifecycle-teaser-icon h-4 w-4 shrink-0" />
                  <span className="lifecycle-teaser-code">{step.code}</span>
                  <span className="lifecycle-teaser-label">{step.label}</span>
                </button>
                {index < assuranceStages.length - 1 ? (
                  <span className="lifecycle-teaser-connector" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ol>

        <article id={panelId} aria-live="polite" className="rounded-md border border-ocean/20 bg-white p-4 shadow-card">
          <div className="flex items-center gap-2">
            <DomainIcon id={active.code} className="h-5 w-5 text-ocean" />
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-deep">
              {String(activeIndex + 1).padStart(2, "0")} {active.code}
            </p>
          </div>
          <h4 className="mt-2 text-[18px] font-semibold leading-snug text-navy">{active.label}</h4>
          <p className="mt-2 text-[14px] leading-relaxed text-structural">{active.sentence}</p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-structural">
            The next downstream record inherits context from this step so the release package can be inspected
            backward.
          </p>
        </article>
      </div>
    </div>
  );
}
