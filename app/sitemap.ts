import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { productModules } from "@/lib/product-hierarchy";
import { articles } from "@/lib/resources";
import { audiencePages, solutionsPages } from "@/lib/solutions-audience";
import { topicSlugs } from "@/lib/topics";

export const dynamic = "force-static";

type Entry = {
  path: string;
  changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority?: number;
};

/**
 * Full marketing sitemap — all known public HTML routes.
 * Omits /sample-platform (redirects to /demo; list final URL only).
 * Omits /api/* (non-HTML).
 */
const coreRoutes: Entry[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/platform", priority: 0.95, changeFrequency: "weekly" },
  { path: "/solutions", priority: 0.9, changeFrequency: "weekly" },
  { path: "/who-we-serve", priority: 0.85, changeFrequency: "monthly" },
  { path: "/compliance", priority: 0.9, changeFrequency: "weekly" },
  { path: "/compliance/imo", priority: 0.85, changeFrequency: "monthly" },
  { path: "/compliance/iacs", priority: 0.85, changeFrequency: "monthly" },
  { path: "/compliance/guidelines", priority: 0.8, changeFrequency: "monthly" },
  { path: "/compliance/official-sources", priority: 0.75, changeFrequency: "monthly" },
  { path: "/compliance/mapping-methodology", priority: 0.75, changeFrequency: "monthly" },
  { path: "/compliance/update-center", priority: 0.75, changeFrequency: "weekly" },
  { path: "/resources", priority: 0.85, changeFrequency: "weekly" },
  { path: "/glossary", priority: 0.8, changeFrequency: "monthly" },
  { path: "/topics", priority: 0.85, changeFrequency: "weekly" },
  { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/why-certamaris", priority: 0.8, changeFrequency: "monthly" },
  { path: "/implementation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  /** Founder Person page (Skyler Brown) — keep discoverable for leadership SEO. */
  { path: "/about/leadership", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/corporate-information", priority: 0.55, changeFrequency: "monthly" },
  { path: "/about/partners", priority: 0.55, changeFrequency: "monthly" },
  { path: "/about/careers", priority: 0.55, changeFrequency: "monthly" },
  { path: "/about/press", priority: 0.55, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/security", priority: 0.8, changeFrequency: "monthly" },
  { path: "/trust", priority: 0.8, changeFrequency: "monthly" },
  { path: "/trust/procurement", priority: 0.7, changeFrequency: "monthly" },
  { path: "/trust/assurance-model", priority: 0.75, changeFrequency: "monthly" },
  { path: "/trust/responsible-disclosure", priority: 0.65, changeFrequency: "monthly" },
  { path: "/trust/status", priority: 0.6, changeFrequency: "weekly" },
  { path: "/trust/ai-policy", priority: 0.65, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.85, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/accessibility", priority: 0.4, changeFrequency: "yearly" },
];

const legalRoutes: Entry[] = [
  { path: "/legal/privacy", priority: 0.55, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.55, changeFrequency: "yearly" },
  { path: "/legal/cookies", priority: 0.45, changeFrequency: "yearly" },
  { path: "/legal/acceptable-use", priority: 0.45, changeFrequency: "yearly" },
  { path: "/legal/subprocessors", priority: 0.45, changeFrequency: "yearly" },
  { path: "/legal/dpa", priority: 0.55, changeFrequency: "yearly" },
];

function toSitemapEntry(
  entry: Entry,
  lastModified: Date
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Deterministic: the global accessibility, security, navigation, and brand-asset
  // remediation materially changed every generated marketing page on this date.
  const remediationDate = new Date("2026-08-01T00:00:00.000Z");
  const legalPublicationDate = new Date("2026-08-23T00:00:00.000Z");

  const platformRoutes = productModules.map((mod) =>
    toSitemapEntry({ path: `/platform/${mod.slug}`, priority: 0.8, changeFrequency: "monthly" }, remediationDate)
  );

  const solutionRoutes = solutionsPages.map((page) =>
    toSitemapEntry({ path: `/solutions/${page.slug}`, priority: 0.8, changeFrequency: "monthly" }, remediationDate)
  );

  const audienceRoutes = audiencePages.map((page) =>
    toSitemapEntry({ path: `/who-we-serve/${page.slug}`, priority: 0.75, changeFrequency: "monthly" }, remediationDate)
  );

  const topicRoutes = topicSlugs.map((slug) =>
    toSitemapEntry({ path: `/topics/${slug}`, priority: 0.75, changeFrequency: "monthly" }, remediationDate)
  );

  const articleRoutes = articles.map((article) =>
    toSitemapEntry(
      { path: `/resources/${article.slug}`, priority: 0.7, changeFrequency: "monthly" },
      new Date(article.updatedDate ?? article.publishedDate)
    )
  );

  return [
    ...coreRoutes.map((r) => toSitemapEntry(r, remediationDate)),
    ...legalRoutes.map((r) => toSitemapEntry(r, legalPublicationDate)),
    ...platformRoutes,
    ...solutionRoutes,
    ...audienceRoutes,
    ...topicRoutes,
    ...articleRoutes,
  ];
}
