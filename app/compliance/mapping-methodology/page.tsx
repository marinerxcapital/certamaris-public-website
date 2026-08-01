import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { mappingStatusLabel, type MappingStatus } from "@/lib/regulatory";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "Control Mapping Methodology",
  "How CertaMaris structures requirement-to-control mapping for maritime cyber work with explicit status, review, and source authority.",
  "/compliance/mapping-methodology"
);

const statuses: { status: MappingStatus; meaning: string }[] = [
  {
    status: "workflow-supported",
    meaning:
      "Product workflows (requirements, controls, evidence, findings, readiness) are designed to support work teams do under this instrument family. Not automatic certification.",
  },
  {
    status: "partial-workflow",
    meaning:
      "Some structures help (references, evidence, controls) but there is no claim of complete native clause-by-clause automatic mapping for every customer.",
  },
  {
    status: "reference-only",
    meaning:
      "Cited for orientation. Teams may store related procedures or evidence; the product does not claim built-in full mapping.",
  },
  {
    status: "not-natively-mapped",
    meaning: "No native product mapping claimed. Do not infer coverage from marketing adjacency.",
  },
];

export default function MappingMethodologyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Control Mapping Methodology",
            description: "Honest methodology for requirement-to-control mapping in CertaMaris.",
            path: "/compliance/mapping-methodology",
            dateModified: "2026-07-31",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Compliance", path: "/compliance" },
            { name: "Mapping methodology", path: "/compliance/mapping-methodology" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Compliance · Methodology"
        title="Mapping methodology"
        intro="Control mapping connects a requirement to systems, procedures, and evidence. Done well, a requirement change shows what it touches. Mapping is a workflow discipline — not a certificate."
      />
      <Section>
        <div className="max-w-2xl space-y-8">
          <Reveal>
            <Eyebrow>Principles</Eyebrow>
            <ul className="mt-4 space-y-3 text-[15.5px] text-structural leading-relaxed list-disc pl-5">
              <li>Official instrument text and qualified human review control applicability.</li>
              <li>IT and OT controls may stay distinct while linking to the same requirement layer.</li>
              <li>Evidence must pass sufficiency (relevance, reliability, completeness, review) — upload is not acceptance.</li>
              <li>Design/class evidence (e.g. E26/E27) is stored and labeled separately from SMS operational evidence.</li>
              <li>We do not claim native automatic mappings that do not exist in the product.</li>
            </ul>
          </Reveal>
          <Reveal>
            <Eyebrow>Status labels on this site</Eyebrow>
            <div className="mt-4 space-y-4">
              {statuses.map((row) => (
                <div key={row.status} className="premium-card p-5">
                  <h2 className="text-[15px] font-semibold text-navy mb-2">{mappingStatusLabel(row.status)}</h2>
                  <p className="text-[14.5px] text-structural leading-relaxed">{row.meaning}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <Eyebrow>Product trail</Eyebrow>
            <p className="mt-3 text-[15.5px] text-structural leading-relaxed">
              In CertaMaris, mapped work typically flows requirement → control objective / implementation context →
              evidence and exceptions → findings and corrective actions → readiness package. See the{" "}
              <Link href="/platform" className="font-medium text-ocean hover:underline">
                platform
              </Link>{" "}
              for the operational UI.
            </p>
          </Reveal>
        </div>
      </Section>
      <Section spacing="tight">
        <BoundaryPanel className="max-w-3xl" />
      </Section>
    </>
  );
}
