import Link from "next/link";
import { ReferenceLabel } from "@/components/Section";
import type { Article } from "@/lib/resources";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/resources/${article.slug}`} className="premium-card group block h-full p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ReferenceLabel className="text-[11px] tracking-[0.08em]">{article.topic}</ReferenceLabel>
        <span className="rounded-full border border-navy/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-structural">
          {article.kind}
        </span>
      </div>
      <h3 className="text-[17px] font-semibold leading-snug mb-2">{article.title}</h3>
      <p className="text-[14px] text-structural leading-relaxed mb-4">{article.excerpt}</p>
      <p className="text-[12.5px] text-structural/80">
        {article.author} · {article.publishedLabel} · {article.readTime}
      </p>
      {article.tags.length > 0 && (
        <p className="mt-2 text-[11.5px] text-structural/70 line-clamp-1">{article.tags.slice(0, 4).join(" · ")}</p>
      )}
      <span className="mt-4 inline-block text-[13.5px] font-semibold text-ocean group-hover:underline">Read resource</span>
    </Link>
  );
}
