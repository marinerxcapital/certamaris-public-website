"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { productProofScreens, type ProductProofScreen } from "@/lib/product-screens";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type CinematicStage = {
  id: string;
  code: string;
  label: string;
  title: string;
  body: string;
  owner: string;
  decision: string;
  screen: ProductProofScreen;
};

const STAGES: CinematicStage[] = [
  {
    id: "requirement",
    code: "REQ",
    label: "Requirement",
    title: "Capture the obligation before scope drifts.",
    body: "Keep IMO, IACS, SMS, and internal controls as owned requirement records — not scattered interpretations.",
    owner: "Compliance lead",
    decision: "Applicability and control ownership",
    screen: productProofScreens.requirementMapping,
  },
  {
    id: "evidence",
    code: "EVD",
    label: "Evidence",
    title: "Prove coverage with freshness and custodian context.",
    body: "Evidence is useful only when the system shows what it supports, who owns it, and whether it is still current.",
    owner: "Evidence custodian",
    decision: "Accept, request, or exception",
    screen: productProofScreens.evidenceCoverage,
  },
  {
    id: "finding",
    code: "FND",
    label: "Finding",
    title: "Separate condition, criterion, and consequence.",
    body: "Findings stay linked to the requirement and evidence that produced them so review can inspect the basis.",
    owner: "Reviewer",
    decision: "Severity and follow-up path",
    screen: productProofScreens.findingsRegister,
  },
  {
    id: "corrective-action",
    code: "CAP",
    label: "Corrective action",
    title: "Remediate with owners, dates, and verification.",
    body: "Corrective actions remain time-bound and connected to verification evidence before closure is treated as complete.",
    owner: "Action owner",
    decision: "Plan, due date, verification",
    screen: productProofScreens.correctiveActions,
  },
  {
    id: "readiness",
    code: "PKG",
    label: "Readiness",
    title: "Release a package from approved records.",
    body: "Scope, evidence, findings, actions, and exceptions assemble into a controlled readiness package — not a document scramble.",
    owner: "Accountable reviewer",
    decision: "Package readiness and sign-off",
    screen: productProofScreens.auditReadiness,
  },
];

const AUTO_MS = 4800;

const stageMotion = {
  initial: { opacity: 0.45, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0.45, y: -10 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
};

/**
 * Homepage signature moment: REQ → EVD → FND → CAP → PKG with sticky proof
 * stage and scrub rail. Reduced motion disables autoplay and crossfades.
 */
export function ProductCinematicMoment() {
  const reduced = usePrefersReducedMotion();
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [inView, setInView] = useState(false);

  const stage = STAGES[index] ?? STAGES[0];
  const progress = STAGES.length <= 1 ? 1 : index / (STAGES.length - 1);

  const goTo = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(STAGES.length - 1, next)));
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.28 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!hydrated || reduced || !inView) return;
    setPlaying(true);
  }, [hydrated, reduced, inView]);

  useEffect(() => {
    if (!inView) setPlaying(false);
  }, [inView]);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => {
        if (current >= STAGES.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, reduced]);

  const onRailKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setPlaying(false);
      goTo(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setPlaying(false);
      goTo(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      setPlaying(false);
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPlaying(false);
      goTo(STAGES.length - 1);
    }
  };

  const copy = (
    <article>
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-ocean">
        {String(index + 1).padStart(2, "0")} · {stage.code} · {stage.label}
      </p>
      <h3 className="mt-3 text-[22px] font-semibold leading-snug text-navy sm:text-[26px]">{stage.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-structural">{stage.body}</p>
      <dl className="mt-5 grid gap-3 border-t border-navy/10 pt-4 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Owner</dt>
          <dd className="mt-1 text-[13.5px] text-navy">{stage.owner}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Decision</dt>
          <dd className="mt-1 text-[13.5px] text-navy">{stage.decision}</dd>
        </div>
      </dl>
    </article>
  );

  const frame = (
    <ProductScreenFrame
      src={stage.screen.src}
      fullSrc={stage.screen.fullSrc}
      alt={stage.screen.alt}
      label={stage.screen.label}
      width={stage.screen.width}
      height={stage.screen.height}
      annotations={stage.screen.annotations}
      interactive={false}
      priority={index === 0}
      sizes="(min-width: 1024px) 48vw, 100vw"
      className="product-showcase-frame"
    />
  );

  return (
    <div ref={rootRef} className="cinematic-moment" data-qa="product-cinematic-moment">
      <div className="flex flex-col gap-4 border-b border-navy/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean">
            Signature product moment · REQ → PKG
          </p>
          <h2 className="section-h2 section-h2--lg mt-3">
            One linked record from requirement to readiness package.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-structural">
            Scrub the five operating beats. Each screen is a sanitized product capture — not live customer data
            or an outcome guarantee.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {!reduced ? (
            <button
              type="button"
              className="scrub-play"
              aria-pressed={playing}
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? "Pause" : "Play"}
            </button>
          ) : null}
          <Link href="/demo#scrub-tour" className="text-[14px] font-semibold text-ocean hover:underline">
            Full product tour
          </Link>
          <Link href="/platform" className="text-[14px] font-semibold text-ocean hover:underline">
            Platform &amp; fleet workbench
          </Link>
        </div>
      </div>

      <div className="scrub-rail mt-6" onKeyDown={onRailKeyDown}>
        <div className="scrub-track" aria-hidden="true">
          <div className="scrub-track-fill" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <input
          id={labelId}
          className="scrub-range"
          type="range"
          min={0}
          max={STAGES.length - 1}
          step={1}
          value={index}
          aria-label="Scrub assurance stages"
          aria-valuenow={index}
          aria-valuetext={`${stage.code} ${stage.label}`}
          onChange={(event) => {
            setPlaying(false);
            goTo(Number(event.target.value));
          }}
        />
        <ol className="scrub-beats cinematic-beats" aria-label="Assurance stages">
          {STAGES.map((item, beatIndex) => {
            const active = beatIndex === index;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`scrub-beat${active ? " is-active" : ""}${beatIndex < index ? " is-passed" : ""}`}
                  aria-current={active ? "step" : undefined}
                  onClick={() => {
                    setPlaying(false);
                    goTo(beatIndex);
                  }}
                >
                  <span className="scrub-beat-index">{String(beatIndex + 1).padStart(2, "0")}</span>
                  <span className="scrub-beat-code">{item.code}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="min-w-0 lg:sticky lg:top-28">
          {reduced || !hydrated ? (
            frame
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={stage.id} {...stageMotion}>
                {frame}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="min-w-0 rounded-lg border border-navy/10 bg-white p-5 shadow-card sm:p-6">
          {reduced || !hydrated ? (
            copy
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={stage.id} {...stageMotion}>
                {copy}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
