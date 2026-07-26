import { REGULATORY_BOUNDARY } from "@/lib/constants";

export function BoundaryPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`border border-hairline-strong bg-paper rounded-sm px-6 py-5 flex gap-4 ${className}`} style={{ borderColor: "var(--hairline-strong)" }}>
      <span aria-hidden="true" className="font-mono text-ocean text-[15px] leading-none pt-0.5">
        !
      </span>
      <p className="text-[14px] text-navy/75 leading-relaxed">{REGULATORY_BOUNDARY}</p>
    </div>
  );
}
