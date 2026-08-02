/**
 * First-party animated pixel-grid layer for the chart-navy hero band —
 * self-hosted successor to the removed third-party "blocky" effect.
 *
 * A deterministic scatter of grid-aligned cells in the depth-sounding blue,
 * each pulsing opacity on its own long period (6–16s, desynced via negative
 * delays). Server-rendered SVG + CSS keyframes only: no script, no external
 * dependency, GPU-composited opacity. Cell density is reduced over the
 * headline zone so the copy area stays quiet.
 *
 * Reduced motion: `pxl-cell` animation is disabled in globals.css and every
 * cell freezes at its base opacity (a static frame, not a slowed loop).
 *
 * Contrast (light band): brightest possible cell frame is 1.9 × 0.13 ≈ 0.25
 * opacity of ocean #126FAA over paper — navy hero text on that blend stays
 * ≥10:1. Fill comes from --hero-grid-ink so the band owns the theme.
 */
const SEED = 20260801;
const CELL = 36;
const COLS = 40;
const ROWS = 21;

type Cell = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  dur: number;
  delay: number;
};

function lcg(seed: number) {
  let state = seed;
  return () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
}

const CELLS: Cell[] = (() => {
  const rand = lcg(SEED);
  const cells: Cell[] = [];
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      // Keep the zone behind the headline/copy sparse; the grid is the
      // hero's emphasized signature texture everywhere else (owner
      // direction 2026-08-01: light band, grid pushed forward).
      const inCopyZone = col / COLS < 0.55 && row / ROWS > 0.12 && row / ROWS < 0.8;
      const density = inCopyZone ? 0.06 : 0.24;
      if (rand() > density) continue;
      const big = rand() < 0.22;
      cells.push({
        x: col * CELL,
        y: row * CELL,
        size: big ? CELL * 2 : CELL,
        opacity: Number((0.04 + rand() * 0.09).toFixed(3)),
        dur: Number((6 + rand() * 10).toFixed(1)),
        delay: Number((-16 * rand()).toFixed(1)),
      });
    }
  }
  return cells;
})();

export function HeroPixelGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {CELLS.map((cell, index) => (
        <rect
          key={index}
          className="pxl-cell"
          x={cell.x}
          y={cell.y}
          width={cell.size}
          height={cell.size}
          style={{
            ["--pxl-o" as never]: cell.opacity,
            animationDuration: `${cell.dur}s`,
            animationDelay: `${cell.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}
