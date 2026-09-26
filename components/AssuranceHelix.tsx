"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  HELIX_FRAME,
  HELIX_NODES,
  HELIX_RUNGS,
  HELIX_STRAND_FRONT,
  HELIX_STRAND_REAR,
  HELIX_TRACE,
  HELIX_VIEW,
  VESSEL_SHAPES,
} from "@/lib/assurance-helix";
import { productProofScreens } from "@/lib/product-screens";

/**
 * The Assurance Helix — the hero exhibit for certamaris.com.
 *
 * It is drawn directly on the page canvas on the right of the hero: no card,
 * no window, no panel. Only two small information tags (the vessel record and
 * the single-record statement) sit on top of the canvas, matching the target
 * composition.
 *
 * Motion is activation → settle → responsive idle, never an endless spinner:
 *   1. reveal   — ribbon depth and nodes settle in, staggered REQ → PKG
 *   2. ambient  — 48s near-invisible strand drift, paused off-screen
 *   3. progress — a slow travelling emphasis through the object order
 *   4. response — small pointer depth and a bounded scroll parallax
 *
 * Every effect is transform/opacity only, is gated on
 * prefers-reduced-motion, and pauses when the hero leaves the viewport.
 * Rendering falls back to the complete static exhibit for SSR, no-JS, and
 * reduced-motion; the animation only ever starts from a near-visible state,
 * so hydration never flashes.
 */

const EXECUTIVE_READINESS = productProofScreens.executiveReporting;

const HELIX_DESCRIPTION =
  "Assurance helix: one controlled record traced from requirement to released " +
  "package across ten linked objects — requirement, applicability, control, " +
  "assessment, evidence, finding, risk, corrective action, QA review, and " +
  "released package. Sample data for the demo vessel MV Certa Maris.";

type Phase = "static" | "run";

export function AssuranceHelix({ className = "" }: { className?: string }) {
  const figureRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  // Arm motion after mount. `static` is the server/no-JS/reduced-motion state,
  // so the exhibit is always complete and legible without JavaScript.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPhase(media.matches ? "static" : "run");
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // Ambient motion is a waste of battery when the hero is off-screen.
  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.live = entry.isIntersecting ? "true" : "false";
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pointer depth: a small instrument response, one rAF per frame at most.
  useEffect(() => {
    const el = figureRef.current;
    if (!el || phase !== "run") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", nextX.toFixed(3));
      el.style.setProperty("--py", nextY.toFixed(3));
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      nextX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      nextY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onPointerLeave = () => {
      nextX = 0;
      nextY = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [phase]);

  // Scroll response: the record scaffold and vessel drift a few pixels as the
  // hero moves out. Normal scrolling is never intercepted or pinned.
  useEffect(() => {
    const el = figureRef.current;
    if (!el || phase !== "run") return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = Math.max(240, rect.height * 0.85);
      const progress = Math.max(0, Math.min(1, -rect.top / span));
      el.style.setProperty("--sy", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [phase]);

  return (
    <figure
      ref={figureRef}
      className={`hero-helix ${className}`.trim()}
      data-state={phase}
      tabIndex={0}
    >
      <figcaption className="sr-only">{HELIX_DESCRIPTION}</figcaption>

      <div className="hero-helix__head">
        <p className="hero-helix__eyebrow">Live product surface · demo data</p>
        <p className="hero-helix__exhibit">
          <span>Exhibit · Assurance helix · Executive readiness</span>
          <a
            className="hero-helix__resolution"
            href={EXECUTIVE_READINESS.fullSrc}
            target="_blank"
            rel="noopener noreferrer"
          >
            Full resolution
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> — opens the Executive readiness exhibit in a new tab</span>
          </a>
        </p>
      </div>

      <div className="hero-helix__plane">
        <svg
          className="hero-helix__svg"
          viewBox={`0 0 ${HELIX_VIEW.width} ${HELIX_VIEW.height}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id="cmHelixWash" cx="44%" cy="50%" r="62%">
              <stop offset="0%" stopColor="#6cbbeb" stopOpacity="0.16" />
              <stop offset="58%" stopColor="#6cbbeb" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#4fade0" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cmHelixNodeFront" cx="34%" cy="28%" r="74%">
              <stop offset="0%" stopColor="#63b6e8" />
              <stop offset="52%" stopColor="#2180bd" />
              <stop offset="100%" stopColor="#0e5a8a" />
            </radialGradient>
            <radialGradient id="cmHelixNodeBack" cx="34%" cy="28%" r="74%">
              <stop offset="0%" stopColor="#c6e0f3" />
              <stop offset="100%" stopColor="#82b8db" />
            </radialGradient>
          </defs>

          <g className="helix-frame">
            {HELIX_FRAME.rows.map((y) => (
              <g key={y}>
                <path d={`M8 ${y} L752 ${y}`} className="helix-frame__row" />
                {HELIX_FRAME.rowTicks.map((x) => (
                  <path key={x} d={`M${x} ${y - 3} L${x} ${y + 3}`} className="helix-frame__tick" />
                ))}
              </g>
            ))}
            {HELIX_FRAME.columns.map((x) => (
              <path key={x} d={`M${x} 24 L${x} 516`} className="helix-frame__column" />
            ))}
          </g>

          <ellipse
            className="helix-wash"
            cx="392"
            cy="274"
            rx="302"
            ry="178"
            fill="url(#cmHelixWash)"
          />

          <g className="helix-telemetry">
            <text x="236" y="238" transform="rotate(-24 236 238)">
              CONTROLLED RECORD
            </text>
            <text x="470" y="336" transform="rotate(-24 470 336)">
              READINESS
            </text>
          </g>

          <g className="helix-strands">
            <g className="helix-strand">
              <path className="helix-ribbon" d={HELIX_STRAND_REAR} pathLength={1} />
              <path className="helix-core" d={HELIX_STRAND_REAR} pathLength={1} />
            </g>
            <g className="helix-rungs">
              {HELIX_RUNGS.map((rung, index) => (
                <path key={index} d={rung.d} style={{ opacity: rung.opacity }} />
              ))}
            </g>
            <g className="helix-strand helix-strand--front">
              <path className="helix-ribbon" d={HELIX_STRAND_FRONT} pathLength={1} />
              <path className="helix-core" d={HELIX_STRAND_FRONT} pathLength={1} />
            </g>
          </g>

          <g className="helix-vessel">
            <g transform="translate(6 16)">
              {VESSEL_SHAPES.map((shape, index) => (
                <path
                  key={index}
                  d={shape.d}
                  style={{ opacity: shape.opacity }}
                  strokeDasharray={shape.dash}
                />
              ))}
            </g>
          </g>
        </svg>

        <ol className="helix-trace">
          {HELIX_NODES.map((node) => (
            <li
              key={node.id}
              className={`helix-node${node.front ? " helix-node--front" : ""}`}
              style={
                {
                  "--x": node.fx,
                  "--y": node.fy,
                  "--i": node.index,
                } as CSSProperties
              }
            >
              <span className="helix-node__dot" aria-hidden="true" />
              <span className="helix-node__tag" aria-hidden="true">
                <span className="helix-node__index">
                  {String(node.index + 1).padStart(2, "0")}
                </span>
                <span className="helix-node__code">{node.code}</span>
                <span className="helix-node__id">{node.id}</span>
              </span>
              <span className="sr-only">
                {node.name} — {node.id}
              </span>
            </li>
          ))}
        </ol>

        <div className="helix-chip helix-chip--vessel">
          <div className="helix-chip__head">
            <svg
              className="helix-chip__ship"
              viewBox="0 0 28 18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M2 12.5h24l-2.6 3.2a2 2 0 0 1-1.6.8H6.2a2 2 0 0 1-1.6-.8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path d="M6 12.5V6.6h13v5.9" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9 6.6V3.4h7v3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M4.5 15.8h19" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
            </svg>
            <span className="helix-chip__vessel">MV Certa Maris</span>
          </div>
          <p className="helix-chip__demo">
            <span className="helix-chip__status-dot" aria-hidden="true" />
            Demo data
          </p>
          <dl className="helix-chip__fields">
            <div>
              <dt>Fleet</dt>
              <dd>FLEET 01</dd>
            </div>
            <div>
              <dt>Vessel type</dt>
              <dd>Container Vessel</dd>
            </div>
            <div>
              <dt>Assurance scope</dt>
              <dd>Cyber Readiness</dd>
            </div>
            <div>
              <dt>Record state</dt>
              <dd>
                <span className="helix-chip__status-dot" aria-hidden="true" />
                Active
              </dd>
            </div>
          </dl>
        </div>

        <div className="helix-chip helix-chip--record">
          <svg
            className="helix-chip__doc"
            viewBox="0 0 20 22"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M4 1.5h7.5L17 7v13.5H4Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path d="M11.5 1.5V7H17" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M7 11.5h6M7 14.5h6M7 17.5h4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <p>One controlled record from requirement to readiness package.</p>
          <span className="helix-chip__arrow" aria-hidden="true">
            →
          </span>
        </div>
      </div>

      <ol className="hero-helix__legend">
        {[
          "Demo-data boundary visible",
          "Readiness signal with source context",
          "Assurance record trace",
        ].map((item, index) => (
          <li key={item}>
            <span className="hero-helix__legend-num" aria-hidden="true">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>

      <p className="sr-only">
        Trace order: {HELIX_TRACE.map((step) => step.name).join(" → ")}.
      </p>
    </figure>
  );
}
