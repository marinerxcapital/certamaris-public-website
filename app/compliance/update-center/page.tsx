import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { frameworks, REGULATORY_LAST_REVIEWED, REGULATORY_LAST_REVIEWED_LABEL } from "@/lib/regulatory";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "Regulatory Update Center",
  "How CertaMaris tracks regulatory change on the marketing site: last-reviewed dates, what operators should do when instruments change, and honest limits.",
  "/compliance/update-center"
);

export default function UpdateCenterPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Regulatory Update Center",
            description: "Editorial review cadence and operator response habits for maritime cyber instruments.",
            path: "/compliance/update-center",
            dateModified: REGULATORY_LAST_REVIEWED,
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Compliance", path: "/compliance" },
            { name: "Update center", path: "/compliance/update-center" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Compliance · Updates"
        title="Regulatory update center"
        intro="IMO, IACS, flag, class, and national instruments change on independent schedules. This page documents our editorial review stamp and recommended operator habits — not a real-time legal feed."
      />
      <Section>
        <div className="max-w-2xl space-y-10">
          <Reveal>
            <Eyebrow>Current editorial stamp</Eyebrow>
            <p className="mt-3 text-[15.5px] text-structural leading-relaxed">
              Framework entries on this site were last reviewed{" "}
              <strong className="text-navy font-semibold">{REGULATORY_LAST_REVIEWED_LABEL}</strong> (
              {REGULATORY_LAST_REVIEWED}). That date means a human editorial pass of summaries and links — not that
              every authority froze publication that day.
            </p>
          </Reveal>
          <Reveal>
            <Eyebrow>When an instrument changes</Eyebrow>
            <ol className="mt-3 list-decimal pl-5 space-y-3 text-[15.5px] text-structural leading-relaxed">
              <li>Read the official text and any class/flag implementation notes that apply to you.</li>
              <li>Identify which vessels, procedures, controls, and evidence cite the prior version.</li>
              <li>Open review tasks with owners and due dates; do not only rewrite a policy paragraph.</li>
              <li>Update readiness packages before the next verification or survey window.</li>
              <li>Record the new citation and review date in your system of record.</li>
            </ol>
          </Reveal>
          <Reveal>
            <Eyebrow>What CertaMaris product work aims to do</Eyebrow>
            <p className="mt-3 text-[15.5px] text-structural leading-relaxed">
              In the product, requirement version changes should surface linked controls, evidence, and open work so
              impact is scoped. Marketing update-center pages are not a substitute for in-app regulatory intelligence
              configuration for your tenant.
            </p>
            <Link href="/platform" className="inline-block mt-4 text-[14.5px] font-medium text-ocean hover:underline">
              Platform overview →
            </Link>
          </Reveal>
          <Reveal>
            <Eyebrow>Framework review index</Eyebrow>
            <ul className="mt-4 space-y-2">
              {frameworks.map((f) => (
                <li key={f.id} className="flex flex-wrap justify-between gap-2 border-b border-navy/10 py-2 text-[14px]">
                  <span className="font-medium text-navy">{f.shortName}</span>
                  <span className="text-structural">Reviewed {f.lastReviewed}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
      <Section spacing="tight">
        <BoundaryPanel className="max-w-3xl" />
      </Section>
    </>
  );
}
