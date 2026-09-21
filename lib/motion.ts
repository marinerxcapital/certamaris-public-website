/**
 * JS motion tokens mirrored by CSS custom properties in app/globals.css.
 * Prefer CSS vars for class-driven motion; use these for Framer / JS timers.
 * All values honor prefers-reduced-motion at call sites via usePrefersReducedMotion.
 */
export const motion = {
  durationMs: {
    /** Micro-interactions: hover, border, focus chrome (120–160ms) */
    fast: 140,
    /** Panel/tab/control state changes (180–240ms) */
    standard: 200,
    /** Section enter / reveal (350–500ms) */
    reveal: 420,
  },
  ease: {
    /** Decelerating craft ease used by reveals and progress fills */
    standard: [0.16, 1, 0.3, 1] as const,
    out: "ease" as const,
  },
  staggerMs: 50,
} as const;

export type MotionDurationKey = keyof typeof motion.durationMs;

/** CSS custom-property names for the same tokens. */
export const motionCssVars = {
  fast: "var(--duration-fast)",
  standard: "var(--duration-standard)",
  reveal: "var(--duration-reveal)",
  easeStandard: "var(--ease-standard)",
  easeOut: "var(--ease-out)",
  stagger: "var(--stagger-step)",
} as const;
