import { ReferenceLabel } from "@/components/Section";
import type { CapabilityPillar } from "@/lib/content";

export function CapabilityCard({ item, index }: { item: CapabilityPillar; index: number }) {
  return (
    <article className="group border border-hairline rounded-sm p-6 bg-white hover:border-ocean/50 hover:shadow-card transition-all duration-200" style={{ borderColor: "var(--hairline)" }}>
      <ReferenceLabel className="mb-3">{String(index + 1).padStart(2, "0")}</ReferenceLabel>
      <h3 className="text-[19px] font-semibold mt-3 mb-2">{item.title}</h3>
      <p className="text-[14.5px] text-ink-secondary text-structural mb-3">{item.summary}</p>
      <p className="text-[14px] text-structural leading-relaxed">{item.detail}</p>
    </article>
  );
}
