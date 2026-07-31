import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Eyebrow, ReferenceLabel, Section } from "@/components/Section";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { articles, getArticleSections, getRelatedResourceLinks } from "@/lib/resources";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return pageMetadata("Resource not found", "This resource could not be found.", "/resources");
  return pageMetadata(article.title, article.excerpt, `/resources/${article.slug}`);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const articleUrl = `${SITE_URL}/resources/${article.slug}`;
  const sections = getArticleSections(article);
  const relatedLinks = getRelatedResourceLinks(article);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/certamaris-full.png` },
    },
    mainEntityOfPage: articleUrl,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_URL}/resources` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section
        className="page-hero-section page-hero-polished relative isolate overflow-hidden border-b"
        style={{ borderColor: "var(--hairline)" }}
      >
        <div className="shell relative z-10 py-16 sm:py-20">
          <div className="liquid-glass liquid-glass--strong lg-pad-lg max-w-2xl">
            <Link href="/resources" className="mb-6 inline-block text-[13.5px] font-medium text-ocean hover:underline">
              ← All resources
            </Link>
            <Eyebrow>{article.topic}</Eyebrow>
            <h1 className="mb-4 text-[32px] leading-[1.1] sm:text-[42px]">{article.title}</h1>
            <ReferenceLabel className="text-[11.5px] text-structural">
              {article.publishedLabel} · {article.readTime}
            </ReferenceLabel>
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

          <BoundaryPanel />
        </div>
      </Section>
    </>
  );
}
