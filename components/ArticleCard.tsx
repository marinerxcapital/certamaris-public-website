import Link from "next/link";
import { ReferenceLabel } from "@/components/Section";
import type { Article } from "@/lib/resources";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/resources/${article.slug}`}
      className="premium-card group block h-full p-6"
    >
      <ReferenceLabel className="mb-3 text-[11px] tracking-[0.08em]">{article.topic}</ReferenceLabel>
      <h3 className="text-[17px] font-semibold leading-snug mb-2">{article.title}</h3>
      <p className="text-[14px] text-structural leading-relaxed mb-4">{article.excerpt}</p>
      <p className="text-[12.5px] text-structural/80">{article.publishedLabel} · {article.readTime}</p>
      <span className="mt-4 inline-block text-[13.5px] font-semibold text-ocean group-hover:underline">Read resource</span>
    </Link>
  );
}
