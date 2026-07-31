import { REGULATORY_BOUNDARY } from "@/lib/constants";

export function BoundaryPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex gap-4 rounded-md border border-navy/15 bg-paper p-5 sm:px-6 sm:py-5 shadow-[0_1px_0_rgba(11,42,74,0.04)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ocean/30 font-mono text-[12px] leading-none text-ocean"
      >
        i
      </span>
      <p className="text-[14px] text-navy/80 leading-relaxed">{REGULATORY_BOUNDARY}</p>
    </div>
  );
}
