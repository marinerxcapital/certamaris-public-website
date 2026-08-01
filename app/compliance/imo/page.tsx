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
  "IMO Cyber Risk Instruments",
  "IMO MSC.428(98), ISM Code context, and MSC-FAL.1/Circ.3 guidelines — official metadata, operational implications, and honest CertaMaris mapping status.",
  "/compliance/imo"
);

export default function ComplianceImoPage() {
  const items = getFrameworksByCategory("imo");
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "IMO Cyber Risk Instruments",
            description: "MSC.428(98), ISM context, and MSC-FAL guidelines for maritime cyber risk management.",
            path: "/compliance/imo",
            dateModified: "2026-07-31",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Compliance", path: "/compliance" },
            { name: "IMO", path: "/compliance/imo" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Compliance · IMO"
        title="IMO cyber risk instruments"
        intro="MSC.428(98), the ISM Code as structural context, and MSC-FAL.1/Circ.3 guidelines. Operational orientation only — official texts control."
      />
      <Section>
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Last reviewed {REGULATORY_LAST_REVIEWED_LABEL}</Eyebrow>
          <p className="text-[15.5px] text-structural leading-relaxed">
            Cyber risk under IMO is SMS-shaped. These entries summarize instrument purpose, applicability notes, and
            how CertaMaris supports related workflows without claiming certification or legal interpretation.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-[14px]">
            <Link href="/compliance/iacs" className="font-medium text-ocean hover:underline">
              IACS UR E26/E27 →
            </Link>
            <Link href="/resources/imo-msc-428-98-explained" className="font-medium text-ocean hover:underline">
              Full MSC.428(98) explainer →
            </Link>
            <Link href="/topics/imo-msc-428-98-compliance" className="font-medium text-ocean hover:underline">
              Topic landing →
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
