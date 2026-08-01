import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { frameworks, REGULATORY_LAST_REVIEWED_LABEL } from "@/lib/regulatory";
import { breadcrumbListSchema, webPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "Official Regulatory Sources",
  "Authoritative links for IMO, IACS, NIST, ISO, USCG, and related maritime cyber instruments cited on CertaMaris.com.",
  "/compliance/official-sources"
);

export default function OfficialSourcesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Official Regulatory Sources",
            description: "Directory of official source URLs for maritime cyber instruments.",
            path: "/compliance/official-sources",
            dateModified: "2026-07-31",
          }),
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Compliance", path: "/compliance" },
            { name: "Official sources", path: "/compliance/official-sources" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Compliance · Sources"
        title="Official sources"
        intro="Prefer primary authority sites over secondary summaries. URLs below point at official or standards-body landing pages. Edition, PDF, and paywalled texts may require account access on the authority site."
      />
      <Section>
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Citation practice · reviewed {REGULATORY_LAST_REVIEWED_LABEL}</Eyebrow>
          <ul className="space-y-3 text-[15px] text-structural leading-relaxed list-disc pl-5">
            <li>Marketing pages never override the controlling instrument text.</li>
            <li>Flag circulars and class rules may add requirements not listed here.</li>
            <li>When an authority reissues a circular or UR, re-check company citations.</li>
            <li>CertaMaris last-reviewed dates document our editorial pass — not legal currency guarantees.</li>
          </ul>
        </Reveal>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-navy/15 text-[12px] font-mono uppercase tracking-[0.08em] text-ocean">
                <th className="py-3 pr-4 font-medium">Instrument</th>
                <th className="py-3 pr-4 font-medium">Authority</th>
                <th className="py-3 pr-4 font-medium">Reviewed</th>
                <th className="py-3 font-medium">Official link</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.map((f) => (
                <tr key={f.id} className="border-b border-navy/10 align-top">
                  <td className="py-4 pr-4 font-medium text-navy">{f.shortName}</td>
                  <td className="py-4 pr-4 text-structural max-w-xs">{f.issuingAuthority}</td>
                  <td className="py-4 pr-4 text-structural whitespace-nowrap">{f.lastReviewed}</td>
                  <td className="py-4">
                    <a
                      href={f.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ocean hover:underline break-all"
                    >
                      Open source
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section spacing="tight">
        <BoundaryPanel className="max-w-3xl" />
      </Section>
    </>
  );
}
