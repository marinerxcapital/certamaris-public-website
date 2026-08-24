import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import {
  executionTemplateDocuments,
  legalPackageSource,
  masterLegalBinder,
  publicLegalDocuments,
  type LegalTemplateDocument,
} from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Legal Library",
  "Complete CertaMaris legal PDF library, including public policies and unsigned enterprise execution templates.",
  "/legal/library",
  { noIndex: true }
);

export default function LegalLibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal library"
        title="CertaMaris legal document library"
        intro="Public legal notices, agreements, downloadable PDFs, and unsigned enterprise execution templates from the CertaMaris All Legal Web Deployment Package v1.0."
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Legal Library" },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <aside className="premium-card p-6 lg:sticky lg:top-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Publication boundary</p>
            <p className="mt-3 text-[14.5px] leading-7 text-structural">{legalPackageSource.sourceBoundary}</p>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-navy/10 pt-5 text-[13.5px]">
              <div>
                <dt className="font-semibold text-navy">Unique PDFs</dt>
                <dd className="text-structural">{legalPackageSource.deployedPdfCount}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Public docs</dt>
                <dd className="text-structural">{legalPackageSource.publicDocumentCount}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Templates</dt>
                <dd className="text-structural">{legalPackageSource.executionTemplateCount}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Source</dt>
                <dd className="text-structural">{legalPackageSource.packageVersion}</dd>
              </div>
            </dl>
            <Button href={masterLegalBinder.pdfPath} variant="secondary" className="mt-6 w-full px-4" external>
              Download master binder
            </Button>
          </aside>

          <div className="space-y-10">
            <section className="legal-panel space-y-5" aria-labelledby="public-policies">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">
                  Public policies & agreements
                </p>
                <h2 id="public-policies" className="mt-3 text-[26px] leading-[1.16]">
                  Public legal pages and PDFs
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {publicLegalDocuments.map((document) => (
                  <article key={document.slug} className="premium-card flex h-full flex-col p-5">
                    <div className="flex-1">
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">
                        {document.documentId}
                      </p>
                      <h3 className="mt-2 text-[17px] font-semibold leading-snug">{document.title}</h3>
                      <p className="mt-3 text-[13.5px] leading-6 text-structural">{document.summary}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button href={document.route} variant="ghost" className="px-0 py-0">
                        Read HTML
                      </Button>
                      <Button href={document.pdfPath} variant="ghost" className="px-0 py-0" external>
                        Download PDF
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="legal-panel space-y-5" aria-labelledby="enterprise-templates">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">
                  Enterprise / execution templates
                </p>
                <h2 id="enterprise-templates" className="mt-3 text-[26px] leading-[1.16]">
                  Unsigned templates for qualified review
                </h2>
                <p className="mt-3 text-[14.5px] leading-7 text-structural">
                  These files are templates. They are not signed customer agreements, executed NDAs, issued legal holds,
                  completed corporate resolutions, board actions, individualized customer contracts, or completed vendor
                  instruments.
                </p>
              </div>
              <div className="grid gap-3">
                {executionTemplateDocuments.map((document) => (
                  <TemplateRow key={document.pdfFilename} document={document} />
                ))}
              </div>
            </section>

            <section className="legal-panel space-y-4" aria-labelledby="master-binder">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Complete binder</p>
                  <h2 id="master-binder" className="mt-3 text-[24px] leading-[1.18]">
                    {masterLegalBinder.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-7 text-structural">
                    Convenience PDF containing the populated CertaMaris legal library. It is hosted for direct access and
                    marked noindex at the Worker/header layer.
                  </p>
                </div>
                <Button href={masterLegalBinder.pdfPath} variant="secondary" external>
                  Download binder
                </Button>
              </div>
              <p className="break-all font-mono text-[11px] leading-5 text-navy/65">SHA-256: {masterLegalBinder.sha256}</p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}

function TemplateRow({ document }: { document: LegalTemplateDocument }) {
  return (
    <article className="rounded-md border border-navy/10 bg-white/78 p-4 transition hover:border-ocean/30">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">Execution Template</p>
          <h3 className="mt-1 text-[15.5px] font-semibold leading-snug text-navy">{document.title}</h3>
          <p className="mt-2 break-all font-mono text-[11px] leading-5 text-navy/60">SHA-256: {document.sha256}</p>
        </div>
        <Button href={document.pdfPath} variant="ghost" className="px-0 py-0" external>
          Download template
        </Button>
      </div>
    </article>
  );
}
