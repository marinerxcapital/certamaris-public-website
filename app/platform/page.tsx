import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { CapabilityCard } from "@/components/CapabilityCard";
import { PageHero } from "@/components/PageHero";
import { ProcessStepList } from "@/components/ProcessStepList";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import { capabilityPillars, processSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";

export const metadata = pageMetadata(
  "Platform",
  "The CertaMaris platform structures fleet visibility, control mapping, evidence and findings, audit readiness, regulatory intelligence, and executive reporting into one assurance record.",
  "/platform"
);

const workProducts: { title: string; body: string }[] = [
  { title: "Applicability & scope record", body: "The regulated entities, applicable requirements, and open scope questions governing the rest of the program." },
  { title: "Controlled asset register", body: "Vessels, facilities, and OT/IT systems connected to accountable owners and their criticality designation." },
  { title: "Assessment workpapers", body: "Scope, procedures performed, interviews, and observations kept distinct from conclusions." },
  { title: "Evidence ledger", body: "Every request and submission with custodian, version, review state, and related requirement." },
  { title: "Cyber risk register", body: "Treatment decisions, acceptance authority, rationale, and review cadence for residual risk." },
  { title: "Corrective action plan", body: "Owned actions with target dates, dependencies, and independent verification before closure." },
  { title: "Cybersecurity Plan work product", body: "Version-controlled plan content assembled from approved facts and decisions." },
  { title: "Readiness package", body: "Scope, assessment basis, findings, actions, and plan crosswalks compiled for review." },
];

const platformScreens = [
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.correctiveActions,
  productProofScreens.auditReadiness,
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Platform"
        title="One controlled record from applicability to recurring operations."
        intro="CertaMaris keeps regulatory requirements, fleet assets, evidence, decisions, plan content, and quality review connected — without removing the human judgment those decisions require."
        aside={
          <div className="premium-card px-5 py-4">
            <p className="font-display font-bold text-[32px] leading-none text-navy">6</p>
            <p className="text-[13px] text-structural mt-1">capability pillars, one assurance record</p>
          </div>
        }
      />

      <Section>
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Capability pillars</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">What the platform does, concretely.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.06}>
          {capabilityPillars.map((item, index) => (
            <CapabilityCard key={item.id} item={item} index={index} />
          ))}
        </RevealGroup>
      </Section>

      <Section id="trace-chain" surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <Eyebrow>How the pieces connect</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-5">
              A requirement traces to a control, an evidence request, and a decision.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed">
              In the product, the trace chain is visible inside the control record itself: requirement mappings,
              implementation context, evidence tabs, exceptions, and validation history stay attached to the same
              control.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              src={productProofScreens.requirementMapping.src}
              alt={productProofScreens.requirementMapping.alt}
              label="Control detail and evidence mapping"
              lightboxTitle={productProofScreens.requirementMapping.title}
              lightboxBody={productProofScreens.requirementMapping.body}
              priority
              galleryOrder={productProofScreens.requirementMapping.galleryOrder}
            />
          </Reveal>
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Work products</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Concrete artifacts, not vague dashboards.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.05}>
          {workProducts.map((item) => (
            <div key={item.title} className="premium-card p-5">
              <h3 className="text-[15px] font-semibold mb-1.5">{item.title}</h3>
              <p className="text-[13.5px] text-structural leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section id="operational-screens" surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Operational screens</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">The record becomes usable operating rhythm.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.05}>
          {platformScreens.map((screen) => (
            <ProductScreenTile key={screen.src} {...screen} />
          ))}
        </RevealGroup>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Process</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">From scope to continuous readiness.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ProcessStepList steps={processSteps} />
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.06}>
          <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
        </Reveal>
      </Section>
    </>
  );
}
