"use client";

import { useEffect, useRef } from "react";

/**
 * The site's original full-page Pixel Grid — one fixed, sitewide instance
 * mounted once in app/layout.tsx, behind the relative z-10 content shell.
 *
 * Originally rendered by the third-party "blocky" runtime
 * (cdn.aidesigner.ai), removed as an unreviewed dependency and rebuilt
 * first-party here: a lattice of blocks whose color is driven by a smooth
 * drifting noise field, quantized across the palette below, with sparse
 * glint highlights. No external script, no WebGL — plain 2D canvas so it
 * degrades gracefully everywhere.
 *
 * Params below are the canonical owner-approved configuration. Two values
 * are reinterpreted rather than taken literally, per the brief's "adjust
 * only when required after live visual testing" allowance:
 *  - `speed` (relative units) resolves internally to px/sec via
 *    SPEED_PX_PER_UNIT, tuned so speed=2 reads as a slow ambient crawl.
 *  - `background alpha` is applied as the sitewide layer opacity in
 *    globals.css (`.pixel-grid-background { opacity: 0.92 }`), not inside
 *    this canvas — see that rule for the single source of truth.
 */
const COLORS = ["#F4F8FF", "#DCEAFF", "#A9C9FF", "#6FA9FF", "#2F83FF", "#006CFE", "#012B6D"];
const BG = "#F8FBFF";
const SPEED = 2;
const BLOCK_SIZE = 72;
const LEVELS = 8;
const SCALE = 1.15;
const DRIFT_ANGLE_DEG = 24;
const GLINT = 0.14;
const CONTRAST = 1.45;

const SPEED_PX_PER_UNIT = 4; // relative-speed -> px/sec resolution (see note above)
const FRAME_MS = 50; // ~20fps — the drift is slow; more buys nothing
const MAX_DPR = 1.5;

function hash2(i: number, j: number): number {
  let h = (i * 374761393 + j * 668265263) | 0;
  h = (h ^ (h >> 13)) | 0;
  h = Math.imul(h, 1274126177);
  h = (h ^ (h >> 16)) >>> 0;
  return h / 4294967295;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/** Lattice value noise, bilinear with smoothstep. */
function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const tx = smoothstep(x - xi);
  const ty = smoothstep(y - yi);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
}

function field(x: number, y: number): number {
  return 0.65 * valueNoise(x, y) + 0.35 * valueNoise(x * 2 + 17.3, y * 2 + 9.7);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Discrete LEVELS-step ramp interpolated across the owner palette. */
const RAMP: string[] = (() => {
  const rgb = COLORS.map(hexToRgb);
  const ramp: string[] = [];
  for (let k = 0; k < LEVELS; k++) {
    const pos = (k / (LEVELS - 1)) * (rgb.length - 1);
    const i = Math.min(rgb.length - 2, Math.floor(pos));
    const t = pos - i;
    const mix = rgb[i].map((c, ch) => Math.round(c + (rgb[i + 1][ch] - c) * t));
    ramp.push(`rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`);
  }
  return ramp;
})();

export function PixelGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // graceful no-op — html/body fallback color still shows

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const cell = BLOCK_SIZE * SCALE;
    const angle = (DRIFT_ANGLE_DEG * Math.PI) / 180;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const pxPerSec = SPEED * SPEED_PX_PER_UNIT;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = (timeMs: number) => {
      const t = timeMs / 1000;
      const driftX = dirX * t * pxPerSec;
      const driftY = dirY * t * pxPerSec;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / cell) + 1;
      const rows = Math.ceil(height / cell) + 1;
      const glintSlot = Math.floor(t * 0.5);

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const nx = (i * cell - driftX) / (cell * 2.4);
          const ny = (j * cell - driftY) / (cell * 2.4);
          let v = field(nx, ny);
          v = Math.min(1, Math.max(0, (v - 0.5) * CONTRAST + 0.5));
          const level = Math.min(LEVELS - 1, Math.floor(v * LEVELS));
          ctx.fillStyle = RAMP[level];
          ctx.fillRect(i * cell, j * cell, cell + 0.5, cell + 0.5);

          const g = hash2(i * 7 + 101, j * 13 + glintSlot * 31);
          if (g < GLINT * 0.12) {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + 0.1 * Math.abs(Math.sin(t * 1.7 + g * 60))})`;
            ctx.fillRect(i * cell, j * cell, cell + 0.5, cell + 0.5);
          }
        }
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < FRAME_MS) return;
      last = now;
      paint(now);
    };

    const start = () => {
      if (raf || reducedQuery.matches || document.hidden) return;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onReducedChange = () => (reducedQuery.matches ? stop() : start());

    // Always paint one static frame first — this is what reduced-motion
    // users see permanently (the grid stays, only the drift is removed).
    resize();
    paint(0);
    start();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    reducedQuery.addEventListener("change", onReducedChange);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedQuery.removeEventListener("change", onReducedChange);
    };
  }, []);

  return (
    <div className="pixel-grid-background fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
