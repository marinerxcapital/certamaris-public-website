import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  const brandedTitle = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: "/og/certamaris-og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: ["/og/certamaris-og.jpg"],
    },
  };
}
