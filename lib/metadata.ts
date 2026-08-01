import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export type PageMetadataOptions = {
  /** Override Open Graph type (default website; use article for resources). */
  ogType?: "website" | "article";
  /** Optional robots override. */
  robots?: Metadata["robots"];
  /** Optional absolute or site-relative OG image path. */
  image?: string;
  /** ISO date for article OG tags. */
  publishedTime?: string;
  /** ISO date for article modified time. */
  modifiedTime?: string;
  /** Keywords — use sparingly; avoid stuffing. */
  keywords?: string[];
  /** Noindex helper for draft/utility pages if ever needed. */
  noIndex?: boolean;
};

/**
 * Unique title + description + canonical for a marketing page.
 * Title template in root layout appends " — CertaMaris" via Next metadata template
 * when `title` is a bare string; we pass a bare title so the template applies once.
 */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  options: PageMetadataOptions = {}
): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
  const brandedTitle = `${title} — ${SITE_NAME}`;
  const image = options.image ?? "/og/certamaris-og.jpg";
  const ogType = options.ogType ?? "website";

  const openGraph =
    ogType === "article"
      ? {
          title: brandedTitle,
          description,
          url,
          siteName: SITE_NAME,
          type: "article" as const,
          images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
          ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
          ...(options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
        }
      : {
          title: brandedTitle,
          description,
          url,
          siteName: SITE_NAME,
          type: "website" as const,
          images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
        };

  return {
    title,
    description,
    keywords: options.keywords,
    alternates: { canonical: url },
    robots: options.noIndex
      ? { index: false, follow: false }
      : options.robots ?? { index: true, follow: true },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [image],
    },
  };
}
