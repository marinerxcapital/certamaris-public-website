import Link from "next/link";
import { ReferenceLabel } from "@/components/Section";
import type { Article } from "@/lib/resources";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/resources/${article.slug}`}
      className="block border border-hairline rounded-sm p-6 bg-white hover:border-ocean/50 hover:shadow-card transition-all duration-200 h-full"
      style={{ borderColor: "var(--hairline)" }}
    >
      <ReferenceLabel className="mb-3 text-[11px] tracking-[0.08em]">{article.topic}</ReferenceLabel>
      <h3 className="text-[17px] font-semibold leading-snug mb-2">{article.title}</h3>
      <p className="text-[14px] text-structural leading-relaxed mb-4">{article.excerpt}</p>
      <p className="text-[12.5px] text-structural/80">{article.publishedLabel} · {article.readTime}</p>
    </Link>
  );
}
