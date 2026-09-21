import { Suspense } from "react";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { ChainOfCustodyInspector } from "@/components/ChainOfCustodyInspector";
import { ContactForm } from "@/components/ContactForm";
import { CustodyStripBand } from "@/components/CustodyStripBand";
import { DemoScrubTour } from "@/components/DemoScrubTour";
import { DemoTourGallery } from "@/components/DemoTourGallery";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { APP_SALES_EMAIL, APP_SCHEDULING_URL, PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Product Demo",
  "Cinematic scrub tour of CertaMaris — requirement to readiness package with sanitized product screens.",
  "/demo",
  { image: "/og/certamaris-demo-2026-08-product-experience.png" }
);

export default function DemoPage() {
  const hasScheduling = Boolean(APP_SCHEDULING_URL.trim());

  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Product demo"
        title="Scrub the assurance workflow from requirement to readiness package."
        intro="A cinematic tour of sanitized product captures along the real chain of custody. Not live customer data, certifications, or outcome guarantees — sales-assisted access for a live demonstration."
      />

      <CustodyStripBand href="/#evidence-chain" label="Homepage chain of custody" />

      <Section id="chain-inspector" spacing="compact">
        <Reveal>
          <ChainOfCustodyInspector />
        </Reveal>
      </Section>

      <Section id="scrub-tour" spacing="compact" surface="paper">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Cinematic tour</Eyebrow>
          <h2 className="section-h2 section-h2--lg">Eight beats. One custody thread.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-structural">
            Play through the tour or drag the rail. Persona selection jumps to the beat that matches how you carry the
            review record.
          </p>
        </Reveal>
        <DemoScrubTour />
      </Section>

      <Section spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="section-h2">Jump to a specific product view.</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-structural">
            Prefer a catalog? Open owner/corporate, fleet, vessel, findings, or readiness packages directly. Status
            labels describe workflow stage — not compliance outcomes for a real fleet.
          </p>
        </Reveal>
        <DemoTourGallery />
      </Section>

      <Section id="request-demo" spacing="compact" surface="paper">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <Eyebrow>Next step</Eyebrow>
            <h2 className="mb-3 section-h2">Request a live demonstration.</h2>
            <p className="mb-4 text-[14.5px] leading-relaxed text-structural">
              Low-friction intake: name, work email, company, fleet size, and primary objective. Access is
              sales-assisted — this page is not a self-serve trial.
            </p>
            <ul className="mb-6 space-y-2 text-[13.5px] leading-relaxed text-structural">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                Same routed <span className="font-mono text-[12.5px]">[demo]</span> path as{" "}
                <a href="/contact?intent=demo" className="font-medium text-ocean hover:underline">
                  /contact?intent=demo
                </a>
                .
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                {hasScheduling
                  ? "After you submit, a scheduling link is offered so you can pick a time."
                  : "We follow up by email to arrange a suitable time. A booking link can be enabled later via configuration."}
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                Procurement, privacy, security, press, careers, partners, and disclosure stay on separate contact
                intents.
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact?intent=demo" variant="secondary">
                Open full contact page
              </Button>
              <Button href="/pricing" variant="ghost">
                View packages
              </Button>
              <Button href="/platform" variant="ghost">
                Platform overview
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="premium-card p-6 sm:p-8">
              <Suspense
                fallback={
                  <div className="space-y-3" role="status">
                    <p className="text-[14px] text-structural">Loading demo request form…</p>
                    <p className="text-[14px] text-structural">
                      If the form does not load, email{" "}
                      <a href={`mailto:${APP_SALES_EMAIL}`} className="font-medium text-ocean hover:underline">
                        {APP_SALES_EMAIL}
                      </a>{" "}
                      or use{" "}
                      <a href="/contact?intent=demo" className="font-medium text-ocean hover:underline">
                        {PRIMARY_CTA_LABEL}
                      </a>
                      .
                    </p>
                  </div>
                }
              >
                <ContactForm defaultIntent="demo" lockIntent />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
