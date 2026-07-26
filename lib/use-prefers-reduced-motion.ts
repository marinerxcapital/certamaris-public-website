"use client";

import { useEffect, useState } from "react";

/**
 * A direct, dependency-free replacement for framer-motion's useReducedMotion().
 *
 * framer-motion's own hook proved unreliable in this stack (it returned false
 * even when the browser correctly reported prefers-reduced-motion: reduce via
 * matchMedia directly). This hook reads matchMedia itself and keeps it in
 * sync with the live media query, so reduced-motion detection is never left
 * stuck in the wrong state.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
