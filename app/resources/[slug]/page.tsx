import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { Eyebrow, ReferenceLabel, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import {
  articles,
  getArticleSections,
  getRelatedResourceLinks,
  productLinksForResources,
} from "@/lib/resources";
import { articleSchema, breadcrumbListSchema } from "@/lib/seo-schema";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return pageMetadata("Resource not found", "This resource could not be found.", "/resources");
  return pageMetadata(article.title, article.excerpt, `/resources/${article.slug}`, {
    ogType: "article",
    publishedTime: article.publishedDate,
    modifiedTime: article.updatedDate ?? article.publishedDate,
    keywords: article.tags,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const path = `/resources/${article.slug}`;
  const sections = getArticleSections(article);
  const relatedLinks = getRelatedResourceLinks(article);
  const dateLabel = article.updatedLabel
    ? `Published ${article.publishedLabel} · Updated ${article.updatedLabel}`
    : article.publishedLabel;

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: article.title,
            description: article.excerpt,
            path,
            datePublished: article.publishedDate,
            dateModified: article.updatedDate ?? article.publishedDate,
            keywords: article.tags,
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.title, path },
          ]),
        ]}
      />
      <section
        className="page-hero-section page-hero-polished relative isolate overflow-hidden border-b"
        style={{ borderColor: "var(--hairline)" }}
      >
        <div className="shell relative z-10 py-16 sm:py-20">
          <div className="liquid-glass liquid-glass--strong lg-pad-lg max-w-2xl">
            <Link href="/resources" className="mb-6 inline-block text-[13.5px] font-medium text-ocean hover:underline">
              ← All resources
            </Link>
            <Eyebrow>
              {article.topic} · {article.kind}
            </Eyebrow>
            <h1 className="mb-4 text-[32px] leading-[1.1] sm:text-[42px]">{article.title}</h1>
            <ReferenceLabel className="text-[11.5px] text-structural">
              {dateLabel} · {article.readTime}
            </ReferenceLabel>
            <p className="mt-3 text-[13.5px] text-structural">
              By {article.author}
              {article.reviewer ? ` · Reviewed by ${article.reviewer}` : ""}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-ocean/25 bg-ocean/5 px-2.5 py-0.5 text-[12px] font-medium text-navy"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Section>
        <div className="max-w-2xl space-y-10">
          <article className="article-panel space-y-8">
            {sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="text-[22px] sm:text-[25px] leading-tight">{section.heading}</h2>
                <p className="text-[16px] text-navy/85 leading-relaxed">{section.paragraph}</p>
              </section>
            ))}
          </article>

          <div>
            <ReferenceLabel className="mb-4 text-[11px] tracking-[0.08em]">Related reading</ReferenceLabel>
            <div className="grid gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="premium-card block p-4 text-[14.5px] font-medium text-navy hover:text-ocean"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <ReferenceLabel className="mb-4 text-[11px] tracking-[0.08em]">Product</ReferenceLabel>
            <div className="grid gap-3">
              {productLinksForResources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="premium-card block p-4 text-[14.5px] font-medium text-navy hover:text-ocean"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <BoundaryPanel />
        </div>
      </Section>
    </>
  );
}
