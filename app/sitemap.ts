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
  { path: "/industries", priority: 0.75, changeFrequency: "monthly" },
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
  { path: "/about/leadership", priority: 0.55, changeFrequency: "monthly" },
  { path: "/about/corporate-information", priority: 0.55, changeFrequency: "monthly" },
  { path: "/about/partners", priority: 0.55, changeFrequency: "monthly" },
  { path: "/about/careers", priority: 0.55, changeFrequency: "monthly" },
  { path: "/about/press", priority: 0.55, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/security", priority: 0.8, changeFrequency: "monthly" },
  { path: "/trust", priority: 0.8, changeFrequency: "monthly" },
  { path: "/trust/procurement", priority: 0.7, changeFrequency: "monthly" },
  { path: "/trust/subprocessors", priority: 0.65, changeFrequency: "monthly" },
  { path: "/trust/responsible-disclosure", priority: 0.65, changeFrequency: "monthly" },
  { path: "/trust/status", priority: 0.6, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.85, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.4, changeFrequency: "yearly" },
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
  const now = new Date("2026-07-31T00:00:00.000Z");

  const platformRoutes = productModules.map((mod) =>
    toSitemapEntry({ path: `/platform/${mod.slug}`, priority: 0.8, changeFrequency: "monthly" }, now)
  );

  const solutionRoutes = solutionsPages.map((page) =>
    toSitemapEntry({ path: `/solutions/${page.slug}`, priority: 0.8, changeFrequency: "monthly" }, now)
  );

  const audienceRoutes = audiencePages.map((page) =>
    toSitemapEntry({ path: `/who-we-serve/${page.slug}`, priority: 0.75, changeFrequency: "monthly" }, now)
  );

  const topicRoutes = topicSlugs.map((slug) =>
    toSitemapEntry({ path: `/topics/${slug}`, priority: 0.75, changeFrequency: "monthly" }, now)
  );

  const articleRoutes = articles.map((article) =>
    toSitemapEntry(
      { path: `/resources/${article.slug}`, priority: 0.7, changeFrequency: "monthly" },
      new Date(article.updatedDate ?? article.publishedDate)
    )
  );

  return [
    ...coreRoutes.map((r) => toSitemapEntry(r, now)),
    ...platformRoutes,
    ...solutionRoutes,
    ...audienceRoutes,
    ...topicRoutes,
    ...articleRoutes,
  ];
}
