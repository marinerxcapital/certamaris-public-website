import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
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
  {
    title: "Applicability & scope record",
    body: "The regulated entities, applicable requirements, and open scope questions governing the rest of the program.",
  },
  {
    title: "Controlled asset register",
    body: "Vessels, facilities, and OT/IT systems connected to accountable owners and their criticality designation.",
  },
  {
    title: "Assessment workpapers",
    body: "Scope, procedures performed, interviews, and observations kept distinct from conclusions.",
  },
  {
    title: "Evidence ledger",
    body: "Every request and submission with custodian, version, review state, and related requirement.",
  },
  {
    title: "Cyber risk register",
    body: "Treatment decisions, acceptance authority, rationale, and review cadence for residual risk.",
  },
  {
    title: "Corrective action plan",
    body: "Owned actions with target dates, dependencies, and independent verification before closure.",
  },
  {
    title: "Cybersecurity Plan work product",
    body: "Version-controlled plan content assembled from approved facts and decisions.",
  },
  {
    title: "Readiness package",
    body: "Scope, assessment basis, findings, actions, and plan crosswalks compiled for review.",
  },
];

const operationalScreens = [
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.correctiveActions,
  productProofScreens.auditReadiness,
] as const;

const traceChain = [
  "Requirement",
  "Control",
  "Evidence",
  "Finding",
  "Action",
  "Readiness package",
] as const;

export default function PlatformPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Platform"
        title="The cyber assurance record operators run day to day."
        intro="CertaMaris keeps requirements, fleet assets, controls, evidence, findings, corrective actions, and reviewer decisions in one connected record — without removing the human judgment those decisions require."
        aside={
          <div className="w-full max-w-[min(380px,100%)] lg:w-[380px]">
            <ProductScreenFrame
              {...productProofScreens.requirementMapping}
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
            />
          </div>
        }
      />

      <Section id="trace-chain" surface="paper">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <Eyebrow>Product proof</Eyebrow>
            <h2 className="text-[28px] sm:text-[36px] leading-[1.12] mb-5">
              A requirement traces to a control, evidence, and a decision.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-6">
              In the product, the trace chain sits on the control record: requirement mappings, implementation
              context, evidence tabs, exceptions, and validation history stay attached to the same object reviewers
              open.
            </p>
            <p className="hero-trace-line mb-2">
              {traceChain.join(" → ")}
            </p>
            <p className="text-[13.5px] text-structural leading-relaxed">
              That is the operating unit of the platform — not a separate dashboard for each step.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              {...productProofScreens.requirementMapping}
              label="Control detail and evidence mapping"
              priority
              sizes="(min-width: 1024px) 48vw, (min-width: 640px) 80vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      <Section id="operational-screens" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Operating sequence</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            From coverage gaps to a reviewable readiness package.
          </h2>
          <p className="mt-4 text-[15px] text-structural leading-relaxed">
            Evidence sufficiency, findings ownership, corrective actions, and package preparation stay linked to the
            same underlying record.
          </p>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-8 lg:gap-10" stagger={0.05}>
          {operationalScreens.map((screen) => (
            <ProductScreenTile key={screen.src} {...screen} />
          ))}
        </RevealGroup>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Work products</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            Concrete artifacts the program produces.
          </h2>
          <p className="mt-4 text-[15px] text-structural leading-relaxed">
            These are controlled work products — not generic dashboard widgets — that teams assemble and maintain
            over the assessment cycle.
          </p>
        </Reveal>
        <Reveal>
          <ul className="grid sm:grid-cols-2 gap-x-12">
            {workProducts.map((item) => (
              <li
                key={item.title}
                className="border-b border-navy/10 py-4 first:pt-0 sm:[&:nth-child(-n+2)]:pt-0"
              >
                <h3 className="text-[15px] font-semibold mb-1">{item.title}</h3>
                <p className="text-[13.5px] text-structural leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Capability pillars</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            What the platform covers.
          </h2>
        </Reveal>
        <Reveal>
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-7">
            {capabilityPillars.map((item) => (
              <li key={item.id} className="border-l-2 border-ocean/35 pl-4">
                <h3 className="text-[16px] font-semibold mb-1.5">{item.title}</h3>
                <p className="text-[14px] text-structural leading-relaxed">{item.summary}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Process</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            From scope to continuous readiness.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
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
