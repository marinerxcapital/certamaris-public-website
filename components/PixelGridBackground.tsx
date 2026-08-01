"use client";

import { useEffect, useState } from "react";
import { AidesignerRuntime } from "@/components/AidesignerRuntime";

type PixelGridBackgroundProps = {
  className?: string;
};

/**
 * Single fixed Pixel Grid host + aidesigner runtime.
 * Skips both the effect host and the CDN script when the user prefers reduced motion.
 */
export function PixelGridBackground({
  className = "fixed inset-0 z-0 pointer-events-none",
}: PixelGridBackgroundProps) {
  // Start false so we never inject the runtime until the client confirms motion is OK.
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAllowMotion(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (!allowMotion) return null;

  return (
    <>
      <AidesignerRuntime />
      <div
        data-aifx="blocky"
        data-aifx-colors="#F4F8FF,#DCEAFF,#A9C9FF,#4F91FF,#006CFE,#012B6D"
        data-aifx-bg="#FBFDFF"
        data-aifx-bg-alpha="1"
        data-aifx-speed="0.16"
        data-aifx-block-size="72"
        data-aifx-levels="8"
        data-aifx-scale="1.15"
        data-aifx-drift-angle="24"
        data-aifx-glint="0.08"
        data-aifx-contrast="1.15"
        className={`pixel-grid-background ${className}`}
        aria-hidden="true"
      />
    </>
  );
}
