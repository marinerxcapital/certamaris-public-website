"use client";

import { useEffect } from "react";

/** Soft client redirect for browsers; page content remains as fallback. */
export function IndustriesClientRedirect() {
  useEffect(() => {
    const t = window.setTimeout(() => {
      window.location.replace("/who-we-serve");
    }, 400);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
