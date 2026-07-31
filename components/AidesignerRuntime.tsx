"use client";

import Script from "next/script";

const AIDESIGNER_SRC = "https://cdn.aidesigner.ai/effects/runtime/v1.js";

/**
 * AI Designer effects runtime script only.
 *
 * Callers must gate mounting on !prefers-reduced-motion (see PixelGridBackground).
 * This component does not read the media query itself so the parent can share one
 * decision for both the host DOM and the network request.
 */
export function AidesignerRuntime() {
  return <Script src={AIDESIGNER_SRC} strategy="afterInteractive" />;
}
