"use client";

import dynamic from "next/dynamic";

const ProductGalleryHost = dynamic(
  () =>
    import("@/components/ProductGalleryHost").then(
      (module) => module.ProductGalleryHost,
    ),
  { ssr: false },
);

/**
 * Keep the full-resolution exhibit host out of the initial sitewide bundle.
 * ProductExhibit registration remains synchronous in the shared store, so a
 * trigger clicked before this async boundary resolves is still rendered when
 * the host mounts.
 */
export function ProductGalleryLoader() {
  return <ProductGalleryHost />;
}
