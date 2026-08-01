import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { glossarySorted } from "@/lib/glossary";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "Glossary",
  "Plain-language glossary of maritime cyber compliance terms: SMS, MSC.428(98), IACS UR E26/E27, evidence sufficiency, SBOM, DPA, and more.",
  "/glossary"
);

export default function GlossaryPage() {
  const terms = glossarySorted();
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Glossary",
            description: "Maritime cyber compliance glossary for operators.",
            path: "/glossary",
            dateModified: "2026-07-31",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Glossary", path: "/glossary" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "CertaMaris maritime cyber compliance glossary",
            url: "https://certamaris.com/glossary",
            hasDefinedTerm: terms.map((t) => ({
              "@type": "DefinedTerm",
              name: t.term,
              description: t.shortDefinition,
              url: `https://certamaris.com/glossary#${t.slug}`,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Glossary"
        title="Maritime cyber compliance terms"
        intro="Plain-language operator definitions. Not legal definitions — official instruments and qualified advisors control."
      />
      <Section>
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>{terms.length} terms</Eyebrow>
          <p className="text-[15px] text-structural leading-relaxed">
            Jump to related{" "}
            <Link href="/compliance" className="font-medium text-ocean hover:underline">
              compliance
            </Link>
            ,{" "}
            <Link href="/resources" className="font-medium text-ocean hover:underline">
              resources
            </Link>
            , or{" "}
            <Link href="/topics" className="font-medium text-ocean hover:underline">
              topics
            </Link>
            .
          </p>
        </Reveal>
        <div className="max-w-3xl space-y-6">
          {terms.map((term) => (
            <Reveal key={term.slug}>
              <article id={term.slug} className="premium-card p-6 scroll-mt-28">
                <h2 className="text-[18px] font-semibold text-navy mb-2">{term.term}</h2>
                <p className="text-[15px] font-medium text-navy/90 mb-3">{term.shortDefinition}</p>
                <p className="text-[14.5px] text-structural leading-relaxed">{term.detail}</p>
                {term.relatedHrefs && term.relatedHrefs.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {term.relatedHrefs.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-[13.5px] font-medium text-ocean hover:underline">
                          {link.title} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section spacing="tight">
        <BoundaryPanel className="max-w-3xl" />
      </Section>
    </>
  );
}
