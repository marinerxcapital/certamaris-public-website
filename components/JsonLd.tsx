import type { JsonLd as JsonLdData } from "@/lib/seo-schema";

/**
 * Renders one or more JSON-LD script tags for structured data.
 * Safe for server components; serializes with JSON.stringify only.
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          // Stable order-based key is fine for static schema blocks
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
