import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { DemoTourGallery } from "@/components/DemoTourGallery";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";

export const metadata = pageMetadata(
  "Product Demo",
  "Guided product tour of CertaMaris — corporate control plane, client admin, fleet, and vessel workflows with sanitized product screens.",
  "/demo"
);

const workflowSteps = [
  {
    step: "01",
    title: "Corporate sets scope",
    body: "Entities, vessels, and applicable requirement programs are recorded as controlled scope — not an ad-hoc folder per ship.",
  },
  {
    step: "02",
    title: "Fleet maps controls and evidence",
    body: "Requirements connect to controls; evidence requests go out with custodians, versions, and review state.",
  },
  {
    step: "03",
    title: "Vessel contributes artifacts",
    body: "Shipboard and shoreside contributors submit evidence and action updates into the same ledger.",
  },
  {
    step: "04",
    title: "Findings close with verification",
    body: "Gaps become owned corrective actions; closure expects independent verification, not an unchecked status flip.",
  },
  {
    step: "05",
    title: "Readiness package for review",
    body: "Scope, evidence, findings, and actions compile into a package for survey or internal review — without claiming the audit outcome.",
  },
];

export default function DemoPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Product demo"
        title="A guided tour of the CertaMaris assurance workflow."
        intro="Walk the product from corporate control plane through fleet operations to vessel contribution. Screens are sanitized product captures for orientation — not live customer data, certifications, or outcome guarantees."
        aside={
          <div className="w-full max-w-[min(380px,100%)] space-y-3 lg:w-[380px]">
            <ProductScreenFrame
              {...productProofScreens.requirementMapping}
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
            />
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="ok" label="Sanitized demo screens" />
              <StatusBadge status="pending" label="Sales-assisted access" />
            </div>
          </div>
        }
      />

      <Section spacing="compact" surface="paper">
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Tour map</Eyebrow>
          <h2 className="text-[24px] sm:text-[28px] leading-[1.16] mb-3">Seven product views.</h2>
          <p className="text-[14.5px] text-structural leading-relaxed">
            Jump to owner/corporate, client admin, fleet, vessel, requirement mapping, findings, or readiness packages.
            Status labels describe workflow stage — not compliance outcomes for a real fleet.
          </p>
          <p className="mt-3">
            <a href="#workflow" className="text-[13px] font-medium text-ocean underline-offset-4 hover:underline">
              Corporate → vessel workflow
            </a>
          </p>
        </Reveal>
        <DemoTourGallery />
      </Section>

      <Section id="workflow">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Workflow</Eyebrow>
          <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-4">
            Corporate → fleet → vessel — one controlled record.
          </h2>
          <p className="text-[15px] text-structural leading-relaxed">
            The product connects hierarchy levels so evidence and decisions do not fragment into per-vessel inboxes.
            Humans still determine applicability, sufficiency, and risk acceptance.
          </p>
        </Reveal>
        <ol className="grid md:grid-cols-5 gap-4">
          {workflowSteps.map((step) => (
            <Reveal as="li" key={step.step} className="premium-card h-full p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ocean mb-2">{step.step}</p>
              <h3 className="text-[15px] font-semibold mb-2">{step.title}</h3>
              <p className="text-[13.5px] text-structural leading-relaxed">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section spacing="compact">
        <Reveal>
          <div className="premium-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Next step</Eyebrow>
              <h2 className="text-[24px] sm:text-[28px] leading-[1.16] mb-3">Request a live demonstration.</h2>
              <p className="text-[14.5px] text-structural leading-relaxed">
                Submit your details and we will contact you to arrange a suitable time. Access is sales-assisted —
                this page is not a self-serve trial.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
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
