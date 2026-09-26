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

export const HELIX_VIEW = { width: 760, height: 455 } as const;

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
  { code: "REQ", id: "REQ-026", name: "Requirement" },
  { code: "APP", id: "APP-014", name: "Applicability" },
  { code: "CTL", id: "CTL-041", name: "Control" },
  { code: "ASM", id: "ASM-023", name: "Assessment" },
  { code: "EVD", id: "EVD-238", name: "Evidence" },
  { code: "FND", id: "FND-031", name: "Finding" },
  { code: "RSK", id: "RSK-009", name: "Risk" },
  { code: "CAP", id: "CAP-017", name: "Corrective action" },
  { code: "QA", id: "QA-066", name: "QA review" },
  { code: "PKG", id: "PKG-004", name: "Released package" },
];

type Point = { x: number; y: number };

/* Axis: a shallow rising arc, low-left to high-right. */
const AXIS_START: Point = { x: 78, y: 326 };
const AXIS_END: Point = { x: 704, y: 106 };
const AXIS_BOW = 28;

/* Weave: perpendicular displacement that tapers toward both ends. */
const WEAVE_AMPLITUDE = 58;
const WEAVE_FLOOR = 0.66;
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

const RUNG_COUNT = 42;

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
  /** Label offset in CSS pixels from the node centre. */
  labelDx: number;
  labelDy: number;
};

/**
 * Nodes ride the traced strand (`base + normal·weave`). Because the weaving
 * strand reaches its opposite extremes at consecutive node parameters, the
 * objects alternate front/back and consecutive labels are a full lens apart.
 */
export const HELIX_NODES: HelixNode[] = HELIX_TRACE.map((step, index) => {
  const t = (index + 0.5) / HELIX_TRACE.length;
  const point = strandPoint(t, 1);
  const labelOffsets = [
    [-18, -62],
    [12, 24],
    [0, 25],
    [-6, 24],
    [-20, -67],
    [22, 22],
    [-4, 24],
    [-17, -65],
    [14, -66],
    [12, -73],
  ] as const;
  const [labelDx, labelDy] = labelOffsets[index];
  return {
    ...step,
    index,
    x: round1(point.x),
    y: round1(point.y),
    fx: round1((point.x / HELIX_VIEW.width) * 10000) / 10000,
    fy: round1((point.y / HELIX_VIEW.height) * 10000) / 10000,
    front: weave(t) >= 0,
    labelDx,
    labelDy,
  };
});

export const HELIX_AURA_PATHS = [
  "M30 332 C150 166 292 136 414 196 C526 253 612 228 738 88",
  "M38 366 C164 234 292 214 404 270 C526 332 622 290 722 146",
  "M96 274 C202 146 322 118 430 166 C548 222 628 188 726 72",
  "M70 388 C188 284 310 274 424 316 C548 364 626 320 706 202",
  "M54 308 C184 190 292 194 396 246 C506 302 636 272 728 124",
  "M120 350 C240 240 344 228 452 278 C564 330 646 284 712 178",
] as const;

export const HELIX_SIGNAL_POINTS: { x: number; y: number; r: number; opacity: number }[] = [
  { x: 60, y: 288, r: 2.3, opacity: 0.42 },
  { x: 88, y: 376, r: 2.1, opacity: 0.36 },
  { x: 132, y: 250, r: 2.4, opacity: 0.44 },
  { x: 174, y: 346, r: 2.2, opacity: 0.4 },
  { x: 220, y: 220, r: 2.5, opacity: 0.45 },
  { x: 274, y: 306, r: 2.1, opacity: 0.38 },
  { x: 332, y: 194, r: 2.6, opacity: 0.5 },
  { x: 390, y: 288, r: 2.2, opacity: 0.42 },
  { x: 452, y: 174, r: 2.7, opacity: 0.52 },
  { x: 512, y: 256, r: 2.2, opacity: 0.42 },
  { x: 570, y: 146, r: 2.5, opacity: 0.48 },
  { x: 624, y: 228, r: 2.1, opacity: 0.38 },
  { x: 670, y: 120, r: 2.5, opacity: 0.48 },
  { x: 718, y: 188, r: 2.1, opacity: 0.36 },
] as const;

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
  rows: [110, 218, 326],
  columns: [754],
  rowTicks: [8, 196, 384, 572, 752],
} as const;
