import Link from "next/link";
import type { Persona } from "@/lib/content";

export function PersonaCard({ item }: { item: Persona }) {
  return (
    <Link
      href={`/industries#${item.id}`}
      className="premium-card group block p-6 transition-all duration-200 hover:border-ocean/45 hover:shadow-card"
    >
      <h3 className="text-[16.5px] font-semibold mb-2">{item.title}</h3>
      <p className="text-[14px] text-structural leading-relaxed">{item.detail}</p>
      <span className="inline-block mt-3 text-[13.5px] text-ocean font-semibold group-hover:underline">View role fit</span>
    </Link>
  );
}
