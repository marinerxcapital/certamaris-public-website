"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Dependency-free prefers-reduced-motion hook.
 *
 * Defaults to `true` (prefer reduced) until the client media query is read.
 * That keeps first paint and CDN/effect gates safe for a11y users and avoids
 * a flash of motion before matchMedia is known.
 *
 * framer-motion's useReducedMotion() proved unreliable in this stack (it could
 * return false even when matchMedia correctly reported reduce). This hook
 * reads matchMedia directly and stays in sync with live changes.
 *
 * Callers that diverge SSR vs client markup should still gate on a mounted
 * flag (see Reveal) to avoid hydration mismatches.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    setReduced(media.matches);
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
