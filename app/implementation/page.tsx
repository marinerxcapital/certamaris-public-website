import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { implementationSteps } from "@/lib/solutions-audience";

export const metadata = pageMetadata(
  "Implementation",
  "CertaMaris onboarding: discovery, configuration, vessel and user setup, evidence migration, launch, and continuous assurance.",
  "/implementation"
);

const principles = [
  {
    title: "Individual identities",
    body: "Shore and vessel users receive individual auditable accounts. Shared vessel passwords are not the product model.",
  },
  {
    title: "Operator remains system of record",
    body: "Service providers may contribute under role scope. The company tenant owns the controlled assurance record.",
  },
  {
    title: "Human applicability",
    body: "Qualified personnel set scope and applicability. The platform maps and records work once decisions are made.",
  },
  {
    title: "Honest maturity",
    body: "Configurable integrations (SSO, email, SBOM/Dependency-Track) are scoped per engagement — not assumed universal.",
  },
];

export default function ImplementationPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Implementation"
        title="From discovery to continuous assurance — without a shared vessel password."
        intro="Implementation is sales-assisted and engagement-scoped: fleet size, evidence condition, role model, and integration needs determine the path. There is no self-serve instant certification."
      />

      <Section>
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>Onboarding path</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Seven practical steps.</h2>
        </Reveal>
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {implementationSteps.map((step) => (
            <li key={step.number} className="liquid-glass liquid-glass--subtle lg-pad-md">
              <span className="font-mono text-ocean text-[13px]">{step.number}</span>
              <h3 className="text-[16px] font-semibold mt-2 mb-1.5">{step.title}</h3>
              <p className="text-[13.5px] text-structural leading-relaxed">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Principles</Eyebrow>
          <h2 className="text-[26px] sm:text-[32px] leading-[1.14]">What we will not skip.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {principles.map((item) => (
            <article key={item.title} className="liquid-glass liquid-glass--default lg-pad-md">
              <h3 className="text-[16px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-3xl">
          <Eyebrow>What you bring</Eyebrow>
          <ul className="mt-4 space-y-2 text-[15px] text-structural leading-relaxed">
            <li>— Vessel inventory and accountable shore roles</li>
            <li>— Priority systems and existing evidence (even if imperfect)</li>
            <li>— Applicability decisions from qualified personnel</li>
            <li>— Identity and integration requirements for IT/OT</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/platform" className="text-[14px] font-semibold text-ocean hover:underline">
              Platform modules
            </Link>
            <Link href="/platform/integrations" className="text-[14px] font-semibold text-ocean hover:underline">
              Integrations catalogue
            </Link>
            <Link href="/who-we-serve" className="text-[14px] font-semibold text-ocean hover:underline">
              Who we serve
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.05} className="flex flex-wrap gap-3">
          <Button href="/contact?intent=demo">Request a demo</Button>
          <Button href="/contact?intent=sales" variant="secondary">
            Discuss implementation
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
