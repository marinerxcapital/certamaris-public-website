import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { FrameworkDetail } from "@/components/FrameworkDetail";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PageOutline } from "@/components/PageOutline";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { frameworks, REGULATORY_LAST_REVIEWED_LABEL } from "@/lib/regulatory";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "Standards & Guidelines",
  "BIMCO guidance, NIST CSF, SP 800-82, IEC 62443, ISO 27001/27002, USCG maritime cyber, and NIS2 — high-level relevance to maritime cyber programs.",
  "/compliance/guidelines"
);

export default function ComplianceGuidelinesPage() {
  const items = frameworks.filter((f) => f.category === "industry" || f.category === "standards" || f.category === "national");
  const groups = [
    { id: "industry-guidance", label: "Industry guidance", category: "industry" },
    { id: "standards", label: "Standards", category: "standards" },
    { id: "national-frameworks", label: "National frameworks", category: "national" },
  ] as const;
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Standards & Guidelines",
            description: "Complementary cyber standards and national frameworks for maritime operators.",
            path: "/compliance/guidelines",
            dateModified: "2026-07-31",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Compliance", path: "/compliance" },
            { name: "Guidelines", path: "/compliance/guidelines" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Compliance · Guidelines"
        title="Standards, industry guidance, and national frameworks"
        intro="High-level orientation only. These instruments may complement IMO and IACS work — they do not automatically replace SMS cyber risk management or class requirements. Legal and entity-scope determinations require qualified advisors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Compliance", href: "/compliance" },
          { label: "Guidelines" },
        ]}
      />
      <PageOutline
        items={[
          { id: "guidelines-overview", label: "Overview" },
          ...groups.map((group) => ({ id: group.id, label: group.label })),
          { id: "guidelines-boundary", label: "Boundary" },
        ]}
      />
      <Section id="guidelines-overview">
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Last reviewed {REGULATORY_LAST_REVIEWED_LABEL}</Eyebrow>
          <p className="text-[15.5px] text-structural leading-relaxed">
            Mapping status is honest: many of these are reference-only or partial workflow support. CertaMaris does
            not claim native automatic full mapping of every clause.
          </p>
          <Link href="/compliance/official-sources" className="inline-block mt-4 text-[14.5px] font-medium text-ocean hover:underline">
            Official sources →
          </Link>
        </Reveal>
        <div className="space-y-12">
          {groups.map((group) => {
            const groupItems = items.filter((framework) => framework.category === group.category);
            if (!groupItems.length) return null;
            return (
              <div key={group.id} id={group.id} className="scroll-mt-28">
                <h2 className="section-h2 mb-5">{group.label}</h2>
                <div className="space-y-8">
                  {groupItems.map((framework) => (
                    <Reveal key={framework.id}>
                      <FrameworkDetail framework={framework} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
      <Section id="guidelines-boundary" spacing="tight">
        <BoundaryPanel className="max-w-3xl" />
      </Section>
    </>
  );
}
