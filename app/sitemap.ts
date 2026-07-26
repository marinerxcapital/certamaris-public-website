import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { articles } from "@/lib/resources";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/platform",
  "/solutions",
  "/industries",
  "/compliance",
  "/resources",
  "/about",
  "/contact",
  "/security",
  "/pricing",
  "/faq",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));
  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/resources/${article.slug}`,
    lastModified: now,
  }));
  return [...routes, ...articleRoutes];
}
