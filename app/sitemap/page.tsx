import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { FULL_SITEMAP_GROUPS } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Sitemap",
  "Grouped sitemap for CertaMaris product, solutions, compliance, resources, company, trust, and legal pages.",
  "/sitemap"
);

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Every public CertaMaris destination."
        intro="Browse product, solution, compliance, resource, company, trust, and legal pages from one grouped index."
      />

      <Section spacing="compact">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FULL_SITEMAP_GROUPS.map((group) => (
            <Reveal key={group.title}>
              <section aria-labelledby={`sitemap-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <Eyebrow>{group.title}</Eyebrow>
                <h2
                  id={`sitemap-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="mt-2 text-[20px] font-semibold"
                >
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2">
                  {group.links.map(([label, href]) => (
                    <li key={`${group.title}-${href}-${label}`}>
                      <Link href={href} className="cm-action-link text-[14.5px] font-semibold text-ocean hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
