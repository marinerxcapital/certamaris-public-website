"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { PersonaPicker, usePersonaSelection } from "@/components/PersonaEntry";
import { DEMO_SCRUB_BEATS, getDemoScrubBeatIndex } from "@/lib/demo-scrub";
import { getPersona } from "@/lib/personas";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const AUTO_MS = 5200;

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
  const scrubRef = useRef<HTMLInputElement>(null);

  // Initial restore, once after hydration. An explicit, valid ?beat= wins;
  // the persona's beat applies only when the URL names no (valid) beat.
  // Later persona changes move the beat from their own click handlers below.
  const restoredRef = useRef(false);
  useEffect(() => {
    if (!ready || restoredRef.current) return;
    restoredRef.current = true;
    const beatParam = new URLSearchParams(window.location.search).get("beat");
    const hasExplicitBeat = DEMO_SCRUB_BEATS.some(
      (item) => item.id === beatParam,
    );
    setIndex(
      getDemoScrubBeatIndex(
        hasExplicitBeat ? beatParam : persona?.demoBeatId,
      ),
    );
  }, [ready, persona?.demoBeatId]);

  const beat = DEMO_SCRUB_BEATS[index] ?? DEMO_SCRUB_BEATS[0];
  const progress =
    DEMO_SCRUB_BEATS.length <= 1 ? 1 : index / (DEMO_SCRUB_BEATS.length - 1);

  /**
   * Mirror the beat into ?beat= with replaceState only (never pushState, so
   * scrubbing does not add history entries). Other params and the hash are
   * preserved; `null` removes the param.
   */
  const writeBeatToUrl = useCallback((beatIndex: number | null) => {
    try {
      const url = new URL(window.location.href);
      if (beatIndex === null) url.searchParams.delete("beat");
      else url.searchParams.set("beat", DEMO_SCRUB_BEATS[beatIndex].id);
      // Pass null (not history.state): Next's patched history API only syncs its
      // router state when the data is not its own internal state, and a stale
      // router URL would later be written back over this one.
      window.history.replaceState(
        null,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    } catch {
      // Ignore environments that block history mutation (e.g. sandboxed iframes).
    }
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(DEMO_SCRUB_BEATS.length - 1, next));
      setIndex(clamped);
      writeBeatToUrl(clamped);
    },
    [writeBeatToUrl],
  );

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      if (index >= DEMO_SCRUB_BEATS.length - 1) setPlaying(false);
      else goTo(index + 1);
    }, AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, reduced, goTo]);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  const onRailKeyDown = (event: React.KeyboardEvent) => {
    if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) {
      setPlaying(false);
    }
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
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean-deep">
            Scrub tour · REQ → PKG
          </p>
          <p className="mt-1 text-[14px] text-structural">
            Drag the rail or select a beat. Screens are sanitized product
            captures — not live customer data or outcome guarantees.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!reduced ? (
            <button
              type="button"
              className="scrub-play"
              aria-pressed={playing}
              onClick={() => {
                if (playing) {
                  setPlaying(false);
                  return;
                }
                // Playing from the final beat would otherwise idle for one
                // interval and stop; restart the walkthrough instead.
                if (index >= DEMO_SCRUB_BEATS.length - 1) goTo(0);
                setPlaying(true);
              }}
            >
              {playing ? "Pause" : "Play tour"}
            </button>
          ) : null}
          <span className="font-mono text-[12px] tabular-nums text-ocean-deep">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(DEMO_SCRUB_BEATS.length).padStart(2, "0")}
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
                    setIndex(0);
                    // "Show default" returns to the default tour and drops the
                    // beat param instead of pinning beat one in the URL.
                    writeBeatToUrl(null);
                  }
                : undefined
            }
          />
        </div>
      ) : null}

      <div className="scrub-rail mt-6" onKeyDown={onRailKeyDown}>
        <div className="scrub-track" aria-hidden="true">
          <div
            className="scrub-track-fill"
            style={{ width: `${Math.max(4, progress * 100)}%` }}
          />
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
          aria-valuenow={index}
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
          <div key={beat.id} className="cm-demo-panel">
            <BeatCopy beat={beat} />
          </div>
        </div>
        <div
          className="min-w-0"
          onClickCapture={(event) => {
            // Opening the full exhibit must pause playback: advancing the beat
            // remounts this frame, which would close the open viewer.
            if (
              (event.target as HTMLElement).closest(
                '[data-testid="product-screen-trigger"]',
              )
            )
              setPlaying(false);
          }}
        >
          <div key={beat.id} className="cm-demo-panel">
            <ProductScreenFrame
              {...beat.screen}
              priority={index === 0}
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BeatCopy({ beat }: { beat: (typeof DEMO_SCRUB_BEATS)[number] }) {
  return (
    <article className="scrub-copy">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-ocean-deep">
        {beat.index}
      </p>
      <h3 className="mt-3 text-[22px] font-semibold leading-snug text-navy sm:text-[26px]">
        {beat.title}
      </h3>
      <p className="mt-3 cm-copy leading-relaxed text-structural">
        {beat.body}
      </p>
      <dl className="mt-5 grid gap-3 border-t border-navy/10 pt-4 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">
            Owner
          </dt>
          <dd className="mt-1 text-[13.5px] text-navy">{beat.owner}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ocean">
            Decision
          </dt>
          <dd className="mt-1 text-[13.5px] text-navy">{beat.decision}</dd>
        </div>
      </dl>
    </article>
  );
}
