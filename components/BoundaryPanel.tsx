import { REGULATORY_BOUNDARY } from "@/lib/constants";

export function BoundaryPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`liquid-glass liquid-glass--strong lg-pad-md flex gap-4 ${className}`}>
      <span
        aria-hidden="true"
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ocean/30 font-mono text-[12px] leading-none text-ocean"
      >
        i
      </span>
      <p className="text-[14px] leading-relaxed text-navy/80">{REGULATORY_BOUNDARY}</p>
    </div>
  );
}
