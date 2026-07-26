import Link from "next/link";
import type { Persona } from "@/lib/content";

export function PersonaCard({ item }: { item: Persona }) {
  return (
    <Link
      href={`/industries#${item.id}`}
      className="block border border-hairline rounded-sm p-6 bg-white hover:border-ocean/50 hover:shadow-card transition-all duration-200"
      style={{ borderColor: "var(--hairline)" }}
    >
      <h3 className="text-[16.5px] font-semibold mb-2">{item.title}</h3>
      <p className="text-[14px] text-structural leading-relaxed">{item.detail}</p>
      <span className="inline-block mt-3 text-[13.5px] text-ocean font-medium">Learn more →</span>
    </Link>
  );
}
