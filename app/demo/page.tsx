import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { ChainOfCustodyInspector } from "@/components/ChainOfCustodyInspector";
import { CustodyStripBand } from "@/components/CustodyStripBand";
import { DemoScrubTour } from "@/components/DemoScrubTour";
import { DemoTourGallery } from "@/components/DemoTourGallery";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Product Demo",
  "Cinematic scrub tour of CertaMaris — requirement to readiness package with sanitized product screens.",
  "/demo",
  { image: "/og/certamaris-demo-2026-08-product-experience.png" }
);

export default function DemoPage() {
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
            Play through the tour or drag the rail. Persona selection jumps to the beat that matches
            how you carry the review record.
          </p>
        </Reveal>
        <DemoScrubTour />
      </Section>

      <Section spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="section-h2">Jump to a specific product view.</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-structural">
            Prefer a catalog? Open owner/corporate, fleet, vessel, findings, or readiness packages
            directly. Status labels describe workflow stage — not compliance outcomes for a real fleet.
          </p>
        </Reveal>
        <DemoTourGallery />
      </Section>

      <Section spacing="compact">
        <Reveal>
          <div className="premium-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Next step</Eyebrow>
              <h2 className="mb-3 section-h2">Request a live demonstration.</h2>
              <p className="text-[14.5px] leading-relaxed text-structural">
                Submit your details and we will contact you to arrange a suitable time. Access is
                sales-assisted — this page is not a self-serve trial.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href="/contact?intent=demo">{PRIMARY_CTA_LABEL}</Button>
              <Button href="/pricing" variant="secondary">
                View packages
              </Button>
              <Button href="/platform" variant="ghost">
                Platform overview
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
