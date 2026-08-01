/**
 * JSON-LD structured data helpers for CertaMaris marketing site.
 * Keep claims honest — no invented certifications, ratings, or review counts.
 */

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

export type JsonLd = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqSchemaItem = {
  question: string;
  answer: string;
};

export type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  articleType?: "Article" | "TechArticle";
  keywords?: string[];
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/certamaris-full.png"),
    },
    sameAs: [] as string[],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "sales@certamaris.com",
        contactType: "sales",
        url: absoluteUrl("/contact"),
      },
    ],
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "en",
  };
}

/**
 * Honest SoftwareApplication node — no fake aggregate ratings, download counts,
 * or unsupported operating-system claims.
 */
export function softwareApplicationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Maritime cyber compliance and assurance",
    operatingSystem: "Web",
    url: absoluteUrl("/platform"),
    description: SITE_DESCRIPTION,
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/pricing"),
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
      description: "Enterprise sales-assisted licensing. Request a readiness call for pricing context.",
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbListSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(items: FaqSchemaItem[], pagePath = "/faq"): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    mainEntityOfPage: absoluteUrl(pagePath),
  };
}

export function articleSchema(input: ArticleSchemaInput): JsonLd {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": input.articleType ?? "TechArticle",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Organization",
      name: "CertaMaris Editorial",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/certamaris-full.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
  };
}

export function webPageSchema(opts: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

/** Combine multiple independent JSON-LD graphs for a single page. */
export function graphSchema(...nodes: JsonLd[]): JsonLd {
  const cleaned = nodes.map((node) => {
    const { "@context": _ctx, ...rest } = node;
    return rest;
  });
  return {
    "@context": "https://schema.org",
    "@graph": cleaned,
  };
}
