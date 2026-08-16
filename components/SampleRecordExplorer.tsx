"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { SAMPLE_RECORD, type SampleRecordObject } from "@/lib/sample-record";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/** A cross-link jump in flight: which record was followed, from where. */
type CustodyFlight = { id: string; from: DOMRect };

/**
 * The landing page's inspectable sample record: one real end-to-end
 * instance of the assurance chain, explorable object by object. Rail is an
 * ARIA tabs pattern (roving tabindex, arrow keys); "Linked records"
 * buttons jump across the chain the way the product's own cross-links do.
 * All data is illustrative and labeled as such (lib/sample-record.ts).
 */
const cardMotion = {
  initial: { opacity: 0.4, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0.4, y: -8 },
  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
};

type SampleRecordExplorerProps = {
  /** Open this sample object first (must exist in SAMPLE_RECORD). */
  initialId?: string;
  /** Optional class on the outer liquid-glass shell. */
  className?: string;
};

function resolveInitialId(initialId?: string) {
  if (initialId && SAMPLE_RECORD.some((record) => record.id === initialId)) {
    return initialId;
  }
  return SAMPLE_RECORD[0].id;
}

export function SampleRecordExplorer({ initialId, className = "" }: SampleRecordExplorerProps) {
  const [activeId, setActiveId] = useState(() => resolveInitialId(initialId));
  const [interacted, setInteracted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const baseId = useId();
  /** Set by linked-record clicks; consumed once by the next RecordCard mount. */
  const flightRef = useRef<CustodyFlight | null>(null);

  useEffect(() => {
    const next = resolveInitialId(initialId);
    setActiveId(next);
    setInteracted(false);
  }, [initialId]);

  const activeIndex = Math.max(
    0,
    SAMPLE_RECORD.findIndex((record) => record.id === activeId)
  );
  const active = SAMPLE_RECORD[activeIndex];

  const tabDomId = (id: string) => `${baseId}-tab-${id}`;

  const jumpTo = (id: string) => {
    setInteracted(true);
    setActiveId(id);
    document.getElementById(tabDomId(id))?.focus();
  };

  const onTablistKeyDown = (event: React.KeyboardEvent) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      nextIndex = (activeIndex + 1) % SAMPLE_RECORD.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      nextIndex = (activeIndex - 1 + SAMPLE_RECORD.length) % SAMPLE_RECORD.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = SAMPLE_RECORD.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    jumpTo(SAMPLE_RECORD[nextIndex].id);
  };

  const card = <RecordCard record={active} onJump={jumpTo} flightRef={flightRef} reduced={reduced} />;

  return (
    <div className={`sample-record liquid-glass liquid-glass--strong lg-pad-md ${className}`.trim()}>
      <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-navy/10 pb-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
          Sample record · MV Certa Maris
        </span>
        <span className="text-[12.5px] text-structural">
          Illustrative data — not customer records. CertaMaris does not certify compliance.
        </span>
      </p>

      <div className="grid gap-5 lg:grid-cols-[15.5rem_minmax(0,1fr)]">
        <div
          role="tablist"
          aria-label="Sample record objects"
          aria-orientation="vertical"
          className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          onKeyDown={onTablistKeyDown}
        >
          {SAMPLE_RECORD.map((record, index) => {
            const isActive = record.id === active.id;
            return (
              <button
                key={record.id}
                id={tabDomId(record.id)}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  setInteracted(true);
                  setActiveId(record.id);
                }}
                className={`relative shrink-0 rounded-md border px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean lg:shrink ${
                  isActive
                    ? "border-ocean/60 bg-white shadow-card"
                    : "border-navy/10 bg-white/55 hover:border-navy/25 hover:bg-white/80"
                }`}
              >
                {isActive && interacted && !reduced ? (
                  <span key={`ping-${record.id}`} className="tab-ping" aria-hidden="true" />
                ) : null}
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[10.5px] font-semibold tracking-[0.08em] text-[#0e5a8a] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.06em] text-navy">
                    {record.id}
                  </span>
                </span>
                <span className="mt-0.5 block whitespace-nowrap text-[12.5px] font-medium text-structural lg:whitespace-normal">
                  {record.step}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={tabDomId(active.id)}
          className="min-w-0"
        >
          {reduced ? (
            card
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} {...cardMotion}>
                {card}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

function RecordCard({
  record,
  onJump,
  flightRef,
  reduced,
}: {
  record: SampleRecordObject;
  onJump: (id: string) => void;
  flightRef: React.MutableRefObject<CustodyFlight | null>;
  reduced: boolean;
}) {
  const headerIdRef = useRef<HTMLSpanElement>(null);
  const linked = record.links
    .map((id) => SAMPLE_RECORD.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is SampleRecordObject => Boolean(candidate));

  // Custody handoff: when this card was reached via a linked-record click,
  // fly the mono id chip from the clicked link to the card header.
  useEffect(() => {
    const flight = flightRef.current;
    if (!flight || flight.id !== record.id || reduced) return;
    flightRef.current = null;
    const target = headerIdRef.current;
    if (!target || typeof target.animate !== "function") return;
    const to = target.getBoundingClientRect();
    const chip = document.createElement("span");
    chip.textContent = record.id;
    chip.className = "custody-flight";
    chip.style.left = `${flight.from.left}px`;
    chip.style.top = `${flight.from.top}px`;
    document.body.appendChild(chip);
    const animation = chip.animate(
      [
        { transform: "translate(0, 0)", opacity: 0.95 },
        {
          transform: `translate(${to.left - flight.from.left}px, ${to.top - flight.from.top}px)`,
          opacity: 0.25,
        },
      ],
      { duration: 340, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );
    animation.onfinish = () => chip.remove();
    return () => chip.remove();
  }, [record.id, flightRef, reduced]);

  return (
    <article className="rounded-md border border-navy/12 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span ref={headerIdRef} className="font-mono text-[12px] font-semibold tracking-[0.06em] text-[#0e5a8a]">
          {record.id}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-structural">
          {record.step}
        </span>
        <StatusBadge status={record.status} label={record.statusLabel} />
      </div>

      <h3 className="mt-3 text-[19px] font-semibold leading-snug text-navy sm:text-[21px]">
        {record.title}
      </h3>
      <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-structural">{record.summary}</p>

      <dl className="mt-5 grid gap-x-8 gap-y-3 border-t border-navy/10 pt-4 sm:grid-cols-2">
        {record.fields.map(([term, detail]) => (
          <div key={term}>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">{term}</dt>
            <dd className="mt-1 text-[13.5px] leading-snug text-navy">{detail}</dd>
          </div>
        ))}
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Owner</dt>
          <dd className="mt-1 text-[13.5px] leading-snug text-navy">{record.owner}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Last updated</dt>
          <dd className="mt-1 text-[13.5px] leading-snug text-navy tabular-nums">{record.updated}</dd>
        </div>
      </dl>

      {linked.length > 0 ? (
        <div className="mt-5 border-t border-navy/10 pt-4">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#0e5a8a]">
            Linked records
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {linked.map((target) => (
              <li key={target.id}>
                <button
                  type="button"
                  onClick={(event) => {
                    const idSpan = event.currentTarget.querySelector("span");
                    flightRef.current = {
                      id: target.id,
                      from: (idSpan ?? event.currentTarget).getBoundingClientRect(),
                    };
                    onJump(target.id);
                  }}
                  className="inline-flex items-baseline gap-1.5 rounded-md border border-navy/15 bg-paper px-2.5 py-1.5 text-left transition-colors hover:border-ocean/60 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean"
                >
                  <span className="font-mono text-[11px] font-semibold text-[#0e5a8a]">{target.id}</span>
                  <span className="text-[12.5px] text-structural">{target.step}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
