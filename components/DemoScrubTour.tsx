"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { PersonaPicker, usePersonaSelection } from "@/components/PersonaEntry";
import { DEMO_SCRUB_BEATS, getDemoScrubBeatIndex } from "@/lib/demo-scrub";
import { getPersona } from "@/lib/personas";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const AUTO_MS = 5200;

const beatMotion = {
  initial: { opacity: 0.55, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0.55, y: -8 },
  transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const },
};

/**
 * Cinematic scrub tour for /demo: drag or click the custody rail, or play
 * through sanitized product beats. Opacity never drops to 0 (README §8).
 */
export function DemoScrubTour() {
  const reduced = usePrefersReducedMotion();
  const { persona, ready, select, clear } = usePersonaSelection();
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const scrubRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const beatId = persona?.demoBeatId ?? new URLSearchParams(window.location.search).get("beat");
    setIndex(getDemoScrubBeatIndex(beatId));
  }, [ready, persona?.demoBeatId]);

  const beat = DEMO_SCRUB_BEATS[index] ?? DEMO_SCRUB_BEATS[0];
  const progress = DEMO_SCRUB_BEATS.length <= 1 ? 1 : index / (DEMO_SCRUB_BEATS.length - 1);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(DEMO_SCRUB_BEATS.length - 1, next));
    setIndex(clamped);
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => {
        if (current >= DEMO_SCRUB_BEATS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, reduced]);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const onRailKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(DEMO_SCRUB_BEATS.length - 1);
    }
  };

  return (
    <div className="scrub-tour liquid-glass liquid-glass--strong lg-pad-md">
      <div className="flex flex-col gap-4 border-b border-navy/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
            Scrub tour · REQ → PKG
          </p>
          <p className="mt-1 text-[14px] text-structural">
            Drag the rail or select a beat. Screens are sanitized product captures — not live
            customer data or outcome guarantees.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!reduced ? (
            <button
              type="button"
              className="scrub-play"
              aria-pressed={playing}
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? "Pause" : "Play tour"}
            </button>
          ) : null}
          <span className="font-mono text-[12px] tabular-nums text-[#0e5a8a]">
            {String(index + 1).padStart(2, "0")} / {String(DEMO_SCRUB_BEATS.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {ready ? (
        <div className="mt-4">
          <PersonaPicker
            variant="compact"
            selectedId={persona?.id ?? null}
            onSelect={(id) => {
              select(id);
              const next = getPersona(id);
              if (next) goTo(getDemoScrubBeatIndex(next.demoBeatId));
            }}
            onClear={
              persona
                ? () => {
                    clear();
                    goTo(0);
                  }
                : undefined
            }
          />
        </div>
      ) : null}

      <div className="scrub-rail mt-6" onKeyDown={onRailKeyDown}>
        <div className="scrub-track" aria-hidden="true">
          <div className="scrub-track-fill" style={{ width: `${Math.max(4, progress * 100)}%` }} />
        </div>
        <input
          ref={scrubRef}
          id={labelId}
          className="scrub-range"
          type="range"
          min={0}
          max={DEMO_SCRUB_BEATS.length - 1}
          step={1}
          value={index}
          aria-label="Scrub product tour beats"
          aria-valuetext={`${beat.index} ${beat.title}`}
          onChange={(event) => {
            setPlaying(false);
            goTo(Number(event.target.value));
          }}
        />
        <ol className="scrub-beats" aria-label="Tour beats">
          {DEMO_SCRUB_BEATS.map((item, beatIndex) => {
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
                  <span className="scrub-beat-index">{item.index}</span>
                  <span className="scrub-beat-code">{item.code}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        <div className="min-w-0">
          {reduced || !hydrated ? (
            <BeatCopy beat={beat} />
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={beat.id} {...beatMotion}>
                <BeatCopy beat={beat} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="min-w-0">
          {reduced || !hydrated ? (
            <ProductScreenFrame
              {...beat.screen}
              priority={index === 0}
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={beat.id} {...beatMotion}>
                <ProductScreenFrame
                  {...beat.screen}
                  priority={index === 0}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

function BeatCopy({ beat }: { beat: (typeof DEMO_SCRUB_BEATS)[number] }) {
  return (
    <article className="scrub-copy">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
        {beat.index}
      </p>
      <h3 className="mt-3 text-[22px] font-semibold leading-snug text-navy sm:text-[26px]">{beat.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-structural">{beat.body}</p>
      <dl className="mt-5 grid gap-3 border-t border-navy/10 pt-4 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Owner</dt>
          <dd className="mt-1 text-[13.5px] text-navy">{beat.owner}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">Decision</dt>
          <dd className="mt-1 text-[13.5px] text-navy">{beat.decision}</dd>
        </div>
      </dl>
    </article>
  );
}
