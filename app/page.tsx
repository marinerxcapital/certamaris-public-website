import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { CapabilityCard } from "@/components/CapabilityCard";
import { PersonaCard } from "@/components/PersonaCard";
import { ProcessStepList } from "@/components/ProcessStepList";
import { ProductScreenFrame, ProductScreenGallery, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL, SECONDARY_CTA_LABEL } from "@/lib/constants";
import { capabilityPillars, personas, processSteps } from "@/lib/content";
import { productProofScreens } from "@/lib/product-screens";

const productScreens = [
  productProofScreens.requirementMapping,
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.correctiveActions,
  productProofScreens.auditReadiness,
  productProofScreens.executiveReporting,
];

const proofSteps = [
  "Requirement mapping",
  "Evidence sufficiency",
  "Findings ownership",
  "Action verification",
  "Audit readiness",
  "Governance reporting",
];

const whyNow = [
  {
    title: "Evidence drift compounds",
    body: "Procedures, assessments, and screenshots age at different speeds. Without freshness rules, a file can look complete while no longer supporting the requirement it was collected for.",
  },
  {
    title: "Requirement changes create hidden work",
    body: "IMO, IACS, flag-state, and internal policy updates do not affect every vessel equally. The hard part is knowing which controls, systems, and evidence records need attention.",
  },
  {
    title: "Ownership fades between reviews",
    body: "Findings and corrective actions lose credibility when owner updates, reviewer decisions, and verification evidence live in separate threads.",
  },
  {
    title: "Survey readiness is cumulative",
    body: "A review package is only persuasive when scope, evidence, findings, corrective actions, exceptions, and reviewer notes already share the same record.",
  },
];

export default function HomePage() {
  return (
    <>
      <ProductScreenGallery />
      {/* HERO */}
      <section className="hero-section relative isolate" aria-labelledby="hero-title">
        <div className="shell relative z-10 py-20 sm:py-28 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-12">
            <div className="hero-copy-block max-w-2xl">
              <Eyebrow>Maritime cyber compliance &amp; assurance</Eyebrow>
              <h1
                id="hero-title"
                className="text-[42px] sm:text-[68px] lg:text-[78px] leading-[0.98] tracking-[-0.02em] mb-6 sm:mb-8"
              >
                Cyber compliance your fleet can prove.
              </h1>
              <p className="font-display text-[17px] sm:text-[20px] font-medium tracking-[-0.015em] text-navy/76 max-w-[34rem] mb-7 leading-[1.52] sm:mb-9 sm:leading-[1.58]">
                CertaMaris turns IMO cyber-risk management and IACS UR E26/E27 readiness into a controlled product
                record: mapped requirements, current evidence, owned findings, verified actions, and review packages.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
                <Button href="/platform" variant="secondary">
                  {SECONDARY_CTA_LABEL}
                </Button>
              </div>
            </div>

            <div className="hero-product-proof">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-structural">Live proof path</p>
                  <p className="mt-1 text-[14px] font-medium text-navy">
                    Requirement to readiness package, shown inside the product.
                  </p>
                </div>
                <Link href="/platform#trace-chain" className="hidden text-[13.5px] font-semibold text-ocean hover:underline sm:inline">
                  Inspect platform →
                </Link>
              </div>
              <ProductScreenFrame
                src={productProofScreens.requirementMapping.src}
                alt={productProofScreens.requirementMapping.alt}
                label={productProofScreens.requirementMapping.label}
                lightboxTitle={productProofScreens.requirementMapping.title}
                lightboxBody={productProofScreens.requirementMapping.body}
                galleryOrder={productProofScreens.requirementMapping.galleryOrder}
                priority
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 78vw, 100vw"
              />
              <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                {proofSteps.map((step, index) => (
                  <li key={step} className="flex items-center gap-2 text-[12.5px] font-medium text-navy/75">
                    <span className="font-mono text-[11px] text-ocean">{String(index + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / CONTEXT RAIL */}
      <div className="bg-paper hairline-b hairline-top">
        <div className="shell py-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-structural mr-2">
            <span aria-hidden="true" className="h-px w-3 shrink-0 bg-current opacity-60" />
            Regulatory context
          </span>
          <span className="inline-flex items-center rounded-full border border-ocean/25 bg-white px-3.5 py-1.5 text-[13px] font-mono text-navy">
            IMO Res. MSC.428(98) → ISM Code integration
          </span>
          <span className="inline-flex items-center rounded-full border border-ocean/25 bg-white px-3.5 py-1.5 text-[13px] font-mono text-navy">
            IACS UR E26 — Cyber Resilience of Ships
          </span>
          <span className="inline-flex items-center rounded-full border border-ocean/25 bg-white px-3.5 py-1.5 text-[13px] font-mono text-navy">
            IACS UR E27 — On-board Systems &amp; Equipment
          </span>
        </div>
      </div>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Why now</Eyebrow>
          <h2 className="text-[30px] sm:text-[36px] leading-[1.12]">
            The work gets harder when the record is assembled only before review.
          </h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.05}>
          {whyNow.map((item) => (
            <div key={item.title} className="h-full rounded-sm border bg-white p-5" style={{ borderColor: "var(--hairline)" }}>
              <h3 className="mb-2 text-[16px] font-semibold">{item.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-structural">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      {/* PROBLEM FRAMING */}
      <Section id="product-dashboard">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-[30px] sm:text-[36px] leading-[1.12] mb-5">
              Spreadsheets don&apos;t survive a fleet-wide requirement change.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-[16px] text-structural leading-relaxed mb-4">
              Most operators manage cyber compliance through a mix of shared drives, vessel-specific binders, and
              email threads with technical managers. Each piece works on its own. None of it connects.
            </p>
            <p className="text-[16px] text-structural leading-relaxed">
              When a requirement changes, or a surveyor asks who reviewed a piece of evidence and when, the honest
              answer often takes days to reconstruct. CertaMaris keeps that answer current at all times — evidence,
              control mappings, findings, and decisions linked from the moment they&apos;re created.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="product-screens" surface="paper">
        <Reveal className="max-w-3xl mb-12">
          <Eyebrow>Inside the product</Eyebrow>
          <h2 className="text-[30px] sm:text-[36px] leading-[1.12]">
            A clear path from requirement to governance review.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            These views are sequenced the way the work happens. Operational proof comes first; governance reporting
            stays connected to the underlying record.
          </p>
        </Reveal>
        <RevealGroup className="grid gap-7 md:grid-cols-2 lg:grid-cols-6" stagger={0.05}>
          {productScreens.map((screen, index) => (
            <ProductScreenTile
              key={screen.src}
              {...screen}
              tileClassName={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
              sizes={
                index < 2
                  ? "(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
                  : "(min-width: 1280px) 28vw, (min-width: 768px) 50vw, 100vw"
              }
            />
          ))}
        </RevealGroup>
      </Section>

      {/* CAPABILITY PILLARS */}
      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Platform</Eyebrow>
          <h2 className="text-[30px] sm:text-[36px] leading-[1.12]">Six capabilities, one assurance record.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.06}>
          {capabilityPillars.map((item, index) => (
            <CapabilityCard key={item.id} item={item} index={index} />
          ))}
        </RevealGroup>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-[30px] sm:text-[36px] leading-[1.12]">From scope to continuous readiness.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ProcessStepList steps={processSteps} />
        </Reveal>
      </Section>

      {/* WHO IT'S FOR */}
      <Section surface="paper">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <Reveal className="max-w-xl">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="text-[30px] sm:text-[36px] leading-[1.12]">Built for every seat in the compliance chain.</h2>
          </Reveal>
          <Link href="/industries" className="text-[14.5px] font-medium text-ocean hover:underline">
            See all industries →
          </Link>
        </div>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.06}>
          {personas.map((item) => (
            <PersonaCard key={item.id} item={item} />
          ))}
        </RevealGroup>
      </Section>

      {/* REGULATORY BOUNDARY */}
      <Section>
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>

      {/* FINAL CTA */}
      <Section surface="navy">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <Reveal className="max-w-xl">
            <h2 className="text-[30px] sm:text-[38px] leading-[1.1] text-white mb-3">
              See CertaMaris against your fleet.
            </h2>
            <p className="text-[15.5px] text-white/70 leading-relaxed">
              A focused session on your current compliance state, evidence condition, and the IACS UR E26/E27 or IMO
              cyber-risk workflows most relevant to your operation.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
