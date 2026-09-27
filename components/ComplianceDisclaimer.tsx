import { FOOTER_STANDING_LINE } from "@/lib/constants";

export function ComplianceDisclaimer({
  className = "",
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <p
      className={`text-[13px] leading-relaxed ${
        inverse ? "text-white/70" : "text-structural"
      } ${className}`.trim()}
    >
      {FOOTER_STANDING_LINE}
    </p>
  );
}
