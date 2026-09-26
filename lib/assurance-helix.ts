/**
 * Deterministic geometry for the CertaMaris Assurance Helix — the hero's
 * double-strand trace of one controlled assurance record.
 *
 * The helix is a projection of a five-turn double strand advancing along a
 * gently rising axis. The weave is deliberately shallow against its own
 * wavelength, so the ribbons read as an engineered trace rather than a coiled
 * spring, and every object node lands on a standing wave — which means
 * consecutive objects alternate strands and their labels can never collide.
 * The chain reads REQ → APP → CTL → ASM → EVD → FND → RSK → CAP → QA → PKG
 * front to back across the weave. That order is the product's object order
 * (see lib/sample-record.ts) and must never be reordered.
 *
 * Everything here is pure math: same input, same path data, on the server and
 * in the browser. No randomness, no runtime measurement, no third-party
 * geometry library.
 */

export const HELIX_VIEW = { width: 760, height: 540 } as const;

export type HelixStep = {
  /** Short object code shown on the node tag (product vocabulary). */
  code: string;
  /** Sample-record object id — the same ids the sample-record explorer opens. */
  id: string;
  /** Object name in the product's own words (lib/sample-record.ts `step`). */
  name: string;
};

/** REQ → PKG. Order is fixed; it is the assurance object order. */
export const HELIX_TRACE: HelixStep[] = [
  { code: "REQ", id: "REQ-0104", name: "Requirement" },
  { code: "APP", id: "APP-0231", name: "Applicability" },
  { code: "CTL", id: "CTL-0389", name: "Control" },
  { code: "ASM", id: "ASM-0512", name: "Assessment" },
  { code: "EVD", id: "EVD-0847", name: "Evidence" },
  { code: "FND", id: "FND-0130", name: "Finding" },
  { code: "RSK", id: "RSK-0072", name: "Risk" },
  { code: "CAP", id: "CAP-0455", name: "Corrective action" },
  { code: "QA", id: "QA-0290", name: "QA review" },
  { code: "PKG", id: "PKG-0067", name: "Released package" },
];

type Point = { x: number; y: number };

/* Axis: a shallow rising arc, low-left to high-right. */
const AXIS_START: Point = { x: 92, y: 366 };
const AXIS_END: Point = { x: 672, y: 152 };
const AXIS_BOW = 24;

/* Weave: perpendicular displacement that tapers toward both ends. */
const WEAVE_AMPLITUDE = 48;
const WEAVE_FLOOR = 0.62;
const HALF_TURNS = 5;

const round1 = (value: number) => Math.round(value * 10) / 10;

function axisPoint(t: number): Point {
  return {
    x: AXIS_START.x + (AXIS_END.x - AXIS_START.x) * t,
    y: AXIS_START.y + (AXIS_END.y - AXIS_START.y) * t + AXIS_BOW * Math.sin(Math.PI * t),
  };
}

function axisNormal(t: number): Point {
  const dx = AXIS_END.x - AXIS_START.x;
  const dy = AXIS_END.y - AXIS_START.y + AXIS_BOW * Math.PI * Math.cos(Math.PI * t);
  const length = Math.hypot(dx, dy) || 1;
  return { x: -dy / length, y: dx / length };
}

/** Signed perpendicular offset. Alternates sign every tenth of the run. */
function weave(t: number): number {
  const envelope = WEAVE_FLOOR + (1 - WEAVE_FLOOR) * Math.sin(Math.PI * t);
  return WEAVE_AMPLITUDE * envelope * Math.sin(2 * Math.PI * HALF_TURNS * t);
}

/** side +1 = front strand, -1 = rear strand. */
function strandPoint(t: number, side: 1 | -1): Point {
  const base = axisPoint(t);
  const normal = axisNormal(t);
  const offset = weave(t) * side;
  return { x: base.x + normal.x * offset, y: base.y + normal.y * offset };
}

/** Catmull-Rom → cubic Bézier. Silky curves from few control points. */
function smoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  let d = `M${round1(points[0].x)} ${round1(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C${round1(c1x)} ${round1(c1y)} ${round1(c2x)} ${round1(c2y)} ${round1(p2.x)} ${round1(p2.y)}`;
  }
  return d;
}

const STRAND_SAMPLES = 72;

function strandPath(side: 1 | -1): string {
  const points: Point[] = [];
  for (let i = 0; i <= STRAND_SAMPLES; i += 1) {
    points.push(strandPoint(i / STRAND_SAMPLES, side));
  }
  return smoothPath(points);
}

/** Rear strand first in paint order so the front strand reads as nearer. */
export const HELIX_STRAND_REAR = strandPath(-1);
export const HELIX_STRAND_FRONT = strandPath(1);

const RUNG_COUNT = 34;

/**
 * Base pairs between the strands. Opacity follows the projected depth, so
 * rungs fade where the strands cross — the classic helix read.
 */
export const HELIX_RUNGS = Array.from({ length: RUNG_COUNT }, (_, index) => {
  const t = (index + 0.5) / RUNG_COUNT;
  const front = strandPoint(t, 1);
  const rear = strandPoint(t, -1);
  const depth = Math.abs(Math.sin(2 * Math.PI * HALF_TURNS * t));
  return {
    d:
      `M${round1(rear.x)} ${round1(rear.y)}` +
      `L${round1(front.x)} ${round1(front.y)}`,
    opacity: round1(0.1 + depth * 0.36),
  };
});

export type HelixNode = HelixStep & {
  index: number;
  /** Node centre in viewBox units. */
  x: number;
  y: number;
  /** Fraction of the plane, for the HTML label layer. */
  fx: number;
  fy: number;
  /** Front-strand nodes read nearer: larger, deeper, higher contrast. */
  front: boolean;
};

/**
 * Nodes ride the traced strand (`base + normal·weave`). Because the weaving
 * strand reaches its opposite extremes at consecutive node parameters, the
 * objects alternate front/back and consecutive labels are a full lens apart.
 */
export const HELIX_NODES: HelixNode[] = HELIX_TRACE.map((step, index) => {
  const t = (index + 0.5) / HELIX_TRACE.length;
  const point = strandPoint(t, 1);
  return {
    ...step,
    index,
    x: round1(point.x),
    y: round1(point.y),
    fx: round1((point.x / HELIX_VIEW.width) * 10000) / 10000,
    fy: round1((point.y / HELIX_VIEW.height) * 10000) / 10000,
    front: weave(t) >= 0,
  };
});

/**
 * Light maritime construction drawing: a container-vessel profile in the
 * lower band of the plane. Line art only — it is the subject the record is
 * scoped to, not an illustration.
 */
export const VESSEL_SHAPES: { d: string; opacity?: number; dash?: string }[] = [
  // Hull, raked bow to starboard.
  {
    d:
      "M64 470 C70 456 82 450 100 448 L330 448 L372 456 L392 470 " +
      "C396 480 388 486 372 487 L96 487 C74 487 62 480 64 470 Z",
  },
  // Main deck line.
  { d: "M100 448 L330 448", opacity: 0.8 },
  // Stern superstructure and bridge.
  { d: "M104 448 L104 418 L128 418 L128 448" },
  { d: "M108 425 L124 425", opacity: 0.6 },
  { d: "M108 432 L124 432", opacity: 0.6 },
  // Funnel.
  { d: "M133 448 L133 427 L143 427 L143 448", opacity: 0.8 },
  // Mast.
  { d: "M112 418 L112 398", opacity: 0.7 },
  { d: "M104 402 L120 402", opacity: 0.7 },
  // Deck cargo bays.
  { d: "M152 448 L152 430 L174 430 L174 448", opacity: 0.75 },
  { d: "M178 448 L178 430 L200 430 L200 448", opacity: 0.75 },
  { d: "M204 448 L204 434 L226 434 L226 448", opacity: 0.7 },
  { d: "M230 448 L230 434 L252 434 L252 448", opacity: 0.7 },
  { d: "M256 448 L256 438 L278 438 L278 448", opacity: 0.6 },
  // Bow sheer.
  { d: "M336 448 L362 455 L378 465", opacity: 0.7 },
  // Draft marks below the waterline.
  { d: "M140 487 L140 493", opacity: 0.5 },
  { d: "M180 487 L180 493", opacity: 0.5 },
  { d: "M220 487 L220 493", opacity: 0.5 },
  { d: "M260 487 L260 493", opacity: 0.5 },
  { d: "M300 487 L300 493", opacity: 0.5 },
  // Waterline.
  { d: "M40 492 L416 492", opacity: 0.55, dash: "7 7" },
];

/**
 * Faint construction lines: the drawing frame the record hangs from.
 * Decorative scaffold only — never load-bearing information.
 */
export const HELIX_FRAME = {
  rows: [126, 250, 374],
  columns: [754],
  rowTicks: [8, 196, 384, 572, 752],
} as const;
