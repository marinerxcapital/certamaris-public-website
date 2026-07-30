import { REGULATORY_BOUNDARY } from "@/lib/constants";

export function BoundaryPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`boundary-panel ${className}`}>
      <span aria-hidden="true" className="boundary-panel-mark">
        i
      </span>
      <p className="text-[14px] text-navy/75 leading-relaxed">{REGULATORY_BOUNDARY}</p>
    </div>
  );
}
