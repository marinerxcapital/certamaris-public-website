import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbListSchema,
  founderPersonSchema,
  type JsonLd as JsonLdData,
} from "@/lib/seo-schema";

export type FounderJsonLdProps = {
  /**
   * - `leadership` (default): Person + About › Leadership breadcrumb
   * - `about`: Person + Home › About breadcrumb (founder linked from company hub)
   * - `person`: Person node only
   */
  variant?: "leadership" | "about" | "person";
};

/**
 * JSON-LD for Skyler Brown, Founder — verified fields only.
 * Wire on /about and /about/leadership so Person schema matches public founder content.
 * sameAs is empty until verified profile URLs exist.
 */
export function FounderJsonLd({ variant = "leadership" }: FounderJsonLdProps) {
  const person = founderPersonSchema();
  const data: JsonLdData[] = [person];

  if (variant === "leadership") {
    data.push(
      breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Leadership", path: "/about/leadership" },
      ])
    );
  } else if (variant === "about") {
    data.push(
      breadcrumbListSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ])
    );
  }

  return <JsonLd data={data} />;
}
