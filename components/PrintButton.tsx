"use client";

import type { ReactNode } from "react";

const base =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 py-3 text-[15px] font-semibold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 active:translate-y-px";

const variants = {
  primary: "bg-navy text-white shadow-[0_10px_24px_rgba(11,42,74,0.16)] hover:bg-[#0e3a68]",
  secondary:
    "border border-navy/20 bg-white/80 text-navy backdrop-blur-sm hover:border-navy/40 hover:bg-white/90",
} as const;

/** Opens the browser print dialog (Save as PDF). Client-only to avoid CSP inline scripts. */
export function PrintButton({
  children = "Print / Save as PDF",
  variant = "secondary",
  className = "",
}: {
  children?: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`.trim()}
      onClick={() => window.print()}
    >
      {children}
    </button>
  );
}
