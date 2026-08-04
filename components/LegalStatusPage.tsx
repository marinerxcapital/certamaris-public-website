import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { legalPackageSource, type LegalDocumentStatus } from "@/lib/legal-documents";

type LegalStatusPageProps = {
  document: LegalDocumentStatus;
};

const toc = [
  { id: "status", label: "Current status" },
  { id: "blockers", label: "Publication blockers" },
  { id: "source-package", label: "Source package facts" },
  { id: "next-steps", label: "Next steps" },
];

export function LegalStatusPage({ document }: LegalStatusPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={document.title} intro={document.intro} />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Trust Center", href: "/trust" },
            { label: document.title },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="premium-card p-5">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">On this page</p>
              <ul className="space-y-2.5 text-[14px]">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-navy/80 transition-colors hover:text-ocean hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="premium-card p-5">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Package facts</p>
              <ul className="space-y-2 text-[13.5px] leading-relaxed text-structural">
                <li>Version: {legalPackageSource.packageVersion}</li>
                <li>Document date: {legalPackageSource.documentDateLabel}</li>
                <li>Status: {legalPackageSource.status}</li>
                <li>Remaining bracketed fields: {legalPackageSource.remainingBracketedFields}</li>
                <li>Publication or reliance blockers: {legalPackageSource.publicationOrRelianceBlockers}</li>
                <li>Execution blockers: {legalPackageSource.executionBlockers}</li>
              </ul>
            </div>
          </aside>

          <div className="space-y-8">
            <section id="status" className="legal-panel space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-amber-900">
                  Configuration incomplete
                </span>
                <span className="rounded-full border border-navy/10 bg-white/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-structural">
                  Effective date field: {document.effectiveDateState}
                </span>
              </div>
              <h2 className="text-[26px] leading-[1.16]">Current status</h2>
              <p>{document.statusSummary}</p>
              <p>{document.downloadStatus}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="premium-card p-4">
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Source file</p>
                  <p className="text-[14px] leading-relaxed text-structural">{document.sourceFilename}</p>
                </div>
                <div className="premium-card p-4">
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Document classification</p>
                  <p className="text-[14px] leading-relaxed text-structural">{document.documentClassification}</p>
                </div>
              </div>
            </section>

            <section id="blockers" className="legal-panel space-y-5">
              <h2 className="text-[26px] leading-[1.16]">Publication blockers</h2>
              <p>
                The controlling checklist says this document must not be published, executed, or relied upon as a
                completed production legal document until the remaining blocker fields are approved and supplied.
              </p>
              <ul className="space-y-3 text-[15px] leading-relaxed text-navy/85">
                {document.blockerHighlights.map((item) => (
                  <li key={item} className="border-l-2 border-ocean/35 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="source-package" className="legal-panel space-y-5">
              <h2 className="text-[26px] leading-[1.16]">Source package facts</h2>
              <p>
                This route is controlled by the packaged legal source archive{" "}
                <span className="font-mono text-[14px]">{legalPackageSource.sourceArchive}</span>, generated on{" "}
                {legalPackageSource.documentDateLabel}.
              </p>
              <ul className="space-y-3 text-[15px] leading-relaxed text-navy/85">
                {document.packageFacts.map((item) => (
                  <li key={item} className="border-l-2 border-navy/12 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="next-steps" className="legal-panel space-y-5">
              <h2 className="text-[26px] leading-[1.16]">Next steps</h2>
              <ul className="space-y-3 text-[15px] leading-relaxed text-navy/85">
                {document.nextSteps.map((item) => (
                  <li key={item} className="border-l-2 border-ocean/35 pl-4">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                {document.actionLinks.map((link) => (
                  <Button key={link.href} href={link.href} variant={link.href.includes("/trust") ? "secondary" : "primary"}>
                    {link.label}
                  </Button>
                ))}
              </div>

              <p className="text-[13.5px] leading-relaxed text-structural">
                Legacy helper routes <Link href="/privacy" className="text-ocean hover:underline">/privacy</Link> and{" "}
                <Link href="/terms" className="text-ocean hover:underline">/terms</Link> remain available for link
                compatibility and point at the same current-status content as the canonical /legal routes.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
