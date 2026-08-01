import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { FrameworkDetail } from "@/components/FrameworkDetail";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { getFrameworksByCategory, REGULATORY_LAST_REVIEWED_LABEL } from "@/lib/regulatory";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "IACS UR E26 & E27",
  "IACS Unified Requirements E26 (ships) and E27 (systems and equipment): design-stage cyber resilience, contract-date applicability, and honest mapping status.",
  "/compliance/iacs"
);

export default function ComplianceIacsPage() {
  const items = getFrameworksByCategory("iacs");
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "IACS UR E26 & E27",
            description: "Ship-level and equipment-level cyber resilience unified requirements.",
            path: "/compliance/iacs",
            dateModified: "2026-07-31",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Compliance", path: "/compliance" },
            { name: "IACS", path: "/compliance/iacs" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Compliance · IACS"
        title="IACS UR E26 & E27"
        intro="Design-stage cyber resilience of ships and on-board systems. Not a single-day retrofit mandate for the entire world fleet — confirm class and contract basis per hull."
      />
      <Section>
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Last reviewed {REGULATORY_LAST_REVIEWED_LABEL}</Eyebrow>
          <p className="text-[15.5px] text-structural leading-relaxed">
            E26 (ship) and E27 (systems/equipment) work together. Keep design/class evidence separate from operational
            SMS cyber risk management under IMO instruments.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-[14px]">
            <Link href="/resources/iacs-ur-e26-e27-overview" className="font-medium text-ocean hover:underline">
              Full explainer →
            </Link>
            <Link href="/topics/iacs-ur-e26" className="font-medium text-ocean hover:underline">
              Topic: E26 →
            </Link>
            <Link href="/topics/iacs-ur-e27" className="font-medium text-ocean hover:underline">
              Topic: E27 →
            </Link>
          </div>
        </Reveal>
        <div className="space-y-8">
          {items.map((framework) => (
            <Reveal key={framework.id}>
              <FrameworkDetail framework={framework} />
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
