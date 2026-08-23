"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { assuranceStages } from "@/lib/assurance-lifecycle";

export function AssuranceLifecycleTeaser() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const active = assuranceStages[activeIndex] ?? assuranceStages[0];

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

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.62fr)] lg:items-start">
        <ol className="lifecycle-teaser-grid" aria-label="Assurance record lifecycle">
          {assuranceStages.map((step, index) => {
            const activeStage = index === activeIndex;
            return (
              <li key={step.code} className="lifecycle-teaser-node">
                <button
                  type="button"
                  aria-pressed={activeStage}
                  aria-describedby={activeStage ? panelId : undefined}
                  className={`lifecycle-teaser-button${activeStage ? " is-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="font-mono text-[11px] font-semibold text-ocean-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[14px] font-semibold text-navy">{step.code}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <article id={panelId} aria-live="polite" className="rounded-md border border-ocean/20 bg-white p-4 shadow-card">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-deep">
            {String(activeIndex + 1).padStart(2, "0")} {active.code}
          </p>
          <h4 className="mt-2 text-[18px] font-semibold leading-snug text-navy">{active.label}</h4>
          <p className="mt-2 text-[14px] leading-relaxed text-structural">{active.sentence}</p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-structural">
            The next downstream record inherits context from this step so the release package can be inspected backward.
          </p>
        </article>
      </div>
    </div>
  );
}
