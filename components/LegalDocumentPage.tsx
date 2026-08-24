import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { LegalMarkdown, legalTableOfContents } from "@/components/LegalMarkdown";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { legalPackageSource, type LegalPublicDocument } from "@/lib/legal-documents";

export function LegalDocumentPage({ document }: { document: LegalPublicDocument }) {
  const toc = legalTableOfContents(document.markdown);

  return (
    <>
      <PageHero eyebrow="Legal" title={document.title} intro={document.summary} />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Legal Library", href: "/legal/library" },
            { label: document.shortTitle },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="premium-card p-5">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Document</p>
              <dl className="space-y-2 text-[13.5px] leading-relaxed text-structural">
                <div>
                  <dt className="font-semibold text-navy">Document ID</dt>
                  <dd>{document.documentId}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy">Version</dt>
                  <dd>{document.version}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy">Issue date</dt>
                  <dd>{document.issueDate}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy">Effective</dt>
                  <dd>{document.effective}</dd>
                </div>
              </dl>
              <Button href={document.pdfPath} variant="secondary" className="mt-5 w-full px-4" external>
                Download PDF
              </Button>
            </div>

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
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Package source</p>
              <p className="text-[13.5px] leading-relaxed text-structural">
                {legalPackageSource.sourceArchive}; {legalPackageSource.generatedDate}. Public PDF SHA-256:
              </p>
              <p className="mt-2 break-all font-mono text-[11px] leading-5 text-navy/70">{document.sha256}</p>
            </div>
          </aside>

          <LegalMarkdown markdown={document.markdown} />
        </div>
      </Section>
    </>
  );
}
