import Link from "next/link";
import { Button } from "@/components/Button";
import { HomepageProductShowcase } from "@/components/HomepageProductShowcase";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL, REGULATORY_BOUNDARY, SECONDARY_CTA_LABEL } from "@/lib/constants";
import { productProofScreens } from "@/lib/product-screens";

const problemItems = [
  {
    title: "Evidence separates from the requirement.",
    body: "Files age in drives and inboxes until reviewers have to reconstruct why a document was collected, which control it supports, and whether it is still current.",
  },
  {
    title: "Findings lose operational ownership.",
    body: "A finding is only useful when the owner, corrective action, due date, verification evidence, and reviewer decision stay connected between reviews.",
  },
  {
    title: "Requirement changes create hidden fleet work.",
    body: "IMO, IACS, flag-state, and internal policy changes rarely touch every vessel in the same way. The risk is not seeing which systems and records must move.",
  },
];

const traceStages = [
  {
    title: "Requirement",
    record: "Applicable clause, policy, vessel scope, and review basis.",
    owner: "Compliance lead",
    decision: "Applicability and scope are recorded.",
  },
  {
    title: "Control",
    record: "Mapped procedure, system, safeguard, or responsible function.",
    owner: "Technical manager",
    decision: "Control ownership and implementation context are linked.",
  },
  {
    title: "Evidence",
    record: "Versioned artifact, freshness state, custodian, and sufficiency review.",
    owner: "Evidence custodian",
    decision: "Support is accepted, rejected, or requested.",
  },
  {
    title: "Finding",
    record: "Observed gap, criterion, severity, affected asset, and rationale.",
    owner: "Reviewer",
    decision: "Finding is assigned with the supporting record intact.",
  },
  {
    title: "Corrective Action",
    record: "Remediation owner, target date, dependency, and verification artifact.",
    owner: "Action owner",
    decision: "Closure requires evidence, not status language.",
  },
  {
    title: "Readiness Package",
    record: "Controlled scope, evidence set, exceptions, findings, actions, and notes.",
    owner: "Accountable reviewer",
    decision: "The review package is inspectable without promising an outcome.",
  },
];

const showcaseSteps = [
  {
    id: "requirements",
    kicker: "Requirement to control",
    title: "Map requirements to the controls and systems that answer them.",
    body: "Keep IMO cyber-risk management, IACS UR E26/E27, SMS procedures, and internal controls in one traceable record.",
    owner: "Compliance lead and technical manager",
    decision: "Applicability, control ownership, and implementation context.",
    screen: productProofScreens.requirementMapping,
  },
  {
    id: "evidence",
    kicker: "Evidence sufficiency",
    title: "Review coverage, freshness, and missing support before the review cycle.",
    body: "Evidence is useful only when the system shows what it supports, who owns it, and whether it is still current enough for inspection.",
    owner: "Evidence custodian and reviewer",
    decision: "Accepted support, missing evidence, freshness exception, or request.",
    screen: productProofScreens.evidenceCoverage,
  },
  {
    id: "findings",
    kicker: "Finding to action",
    title: "Assign findings and corrective actions without losing the underlying proof.",
    body: "The observed condition, criterion, action owner, due date, and verification evidence remain tied to the same assurance record.",
    owner: "Reviewer and action owner",
    decision: "Action plan, priority, due date, and verification requirement.",
    screen: productProofScreens.correctiveActions,
  },
  {
    id: "readiness",
    kicker: "Controlled package",
    title: "Prepare a readiness package from approved records, not a document scramble.",
    body: "Scope, evidence, findings, corrective actions, exceptions, and reviewer notes are assembled from controlled work already in the product.",
    owner: "Accountable reviewer",
    decision: "Package readiness, exceptions requiring review, and owner sign-off.",
    screen: productProofScreens.auditReadiness,
  },
];

const capabilities = [
  {
    title: "Fleet assurance visibility",
    body: "See vessels, facilities, open findings, evidence freshness, and readiness gaps without asking each operating unit for a separate status view.",
    href: "/industries",
  },
  {
    title: "Requirement and control mapping",
    body: "Tie IMO, IACS, SMS, and internal policy obligations to controls, systems, owners, and implementation context.",
    href: "/platform",
  },
  {
    title: "Evidence, findings, and corrective actions",
    body: "Maintain one record from evidence request through reviewer decision, finding ownership, remediation, and verification.",
    href: "/solutions",
  },
  {
    title: "Readiness packages and governance reporting",
    body: "Create inspection-ready packages and governance roll-ups from the operational record without inventing outcomes or unsupported claims.",
    href: "/compliance",
  },
];

const audiences = [
  {
    title: "Ship owners and operators",
    body: "A controlled view of readiness across the fleet, including open decisions that need leadership attention.",
  },
  {
    title: "Technical managers and DPAs",
    body: "A practical system for mapping SMS cyber procedures, vessel scope, evidence, and findings to the review record.",
  },
  {
    title: "Maritime cybersecurity and IT/OT teams",
    body: "A way to connect shipboard systems, technical safeguards, and remediation work to the compliance questions they support.",
  },
  {
    title: "Classification, assurance, and review stakeholders",
    body: "A structured evidence trail that separates applicability, sufficiency, exceptions, and reviewer decisions.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section landing-hero relative" aria-labelledby="hero-title">
        <div className="shell relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
            <Reveal className="hero-copy-block max-w-2xl">
              <Eyebrow>Maritime cyber compliance and assurance</Eyebrow>
              <h1
                id="hero-title"
                className="mb-6 text-[42px] leading-[0.98] tracking-[-0.02em] sm:text-[64px] lg:text-[76px]"
              >
                Turn maritime cyber requirements into provable readiness.
              </h1>
              <p className="mb-8 max-w-[39rem] font-display text-[17px] font-medium leading-[1.55] tracking-[-0.01em] text-navy/76 sm:text-[20px]">
                CertaMaris connects requirements, controls, evidence, findings, corrective actions, and reviewer
                decisions in one controlled assurance record across your fleet.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
                <Button href="/platform" variant="secondary">
                  {SECONDARY_CTA_LABEL}
                </Button>
              </div>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-structural">
                IMO MSC.428(98) <span aria-hidden="true">•</span> IACS UR E26 <span aria-hidden="true">•</span> IACS UR E27
              </p>
            </Reveal>

            <Reveal delay={0.08} className="hero-signal-panel">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-structural">Assurance trace</p>
                  <p className="mt-1 text-[15px] font-semibold text-navy">Requirement → readiness package</p>
                </div>
                <Link href="/platform#trace-chain" className="text-[13.5px] font-semibold text-ocean hover:underline">
                  Inspect platform
                </Link>
              </div>

              <div className="hero-chain" aria-label="Requirement to readiness proof chain">
                {["Requirement", "Control", "Evidence", "Finding", "Action", "Readiness"].map((item, index) => (
                  <div key={item} className="hero-chain-node">
                    <span className="font-mono text-[10px] text-ocean">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <ProductScreenFrame
                  {...productProofScreens.requirementMapping}
                  interactive={false}
                  priority
                  sizes="(min-width: 1280px) 48vw, (min-width: 768px) 82vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section spacing="compact">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>The operational problem</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            Compliance breaks when the evidence trail is fragmented.
          </h2>
        </Reveal>
        <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.05}>
          {problemItems.map((item) => (
            <article key={item.title} className="border-l border-ocean/35 bg-white/70 py-1 pl-5">
              <h3 className="mb-2 text-[18px] font-semibold leading-snug">{item.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-structural">{item.body}</p>
            </article>
          ))}
        </RevealGroup>
      </Section>

      <Section id="trace-chain" surface="paper">
        <Reveal className="mb-12 max-w-3xl">
          <Eyebrow>Assurance trace</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            One connected chain from requirement to verified readiness.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            CertaMaris is built around the record that reviewers actually need: what was required, what control answered
            it, what evidence supported it, what finding emerged, what action closed it, and what package contains it.
          </p>
        </Reveal>
        <RevealGroup className="assurance-trace" stagger={0.04}>
          {traceStages.map((stage, index) => (
            <article key={stage.title} className="assurance-trace-card">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-[12px] text-ocean">{String(index + 1).padStart(2, "0")}</span>
                {index < traceStages.length - 1 ? <span className="hidden text-ocean/65 lg:block" aria-hidden="true">→</span> : null}
              </div>
              <h3 className="mb-3 text-[18px] font-semibold">{stage.title}</h3>
              <dl className="grid gap-3 text-[13.5px] leading-relaxed">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-structural">Record</dt>
                  <dd className="mt-1 text-navy/82">{stage.record}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-structural">Owner</dt>
                  <dd className="mt-1 text-navy/82">{stage.owner}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-structural">Decision</dt>
                  <dd className="mt-1 text-navy/82">{stage.decision}</dd>
                </div>
              </dl>
            </article>
          ))}
        </RevealGroup>
      </Section>

      <Section id="product-dashboard">
        <Reveal className="mb-12 max-w-3xl">
          <Eyebrow>Product in action</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            Inspect the workflow inline, without leaving the page.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            Select a workflow stage to keep the product view and the explanation together. No modal, no fullscreen
            overlay, and no hidden hover-only interaction.
          </p>
        </Reveal>
        <Reveal>
          <HomepageProductShowcase steps={showcaseSteps} />
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>Platform capabilities</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">A tighter operating model for maritime cyber assurance.</h2>
        </Reveal>
        <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={0.05}>
          {capabilities.map((item, index) => (
            <article key={item.title} className="capability-strip">
              <span className="font-mono text-[12px] text-ocean">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="mb-2 text-[18px] font-semibold">{item.title}</h3>
                <p className="mb-3 text-[14.5px] leading-relaxed text-structural">{item.body}</p>
                <Link href={item.href} className="text-[14px] font-semibold text-ocean hover:underline">
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal>
            <Eyebrow>Who it serves</Eyebrow>
            <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">Built for the roles that carry the review record.</h2>
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.05}>
            {audiences.map((item) => (
              <article key={item.title} className="audience-note">
                <h3 className="mb-2 text-[17px] font-semibold">{item.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-structural">{item.body}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="trust-note mx-auto max-w-4xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ocean">Regulatory boundary</p>
          <p className="text-[15px] leading-relaxed text-navy/78">{REGULATORY_BOUNDARY}</p>
        </Reveal>
      </Section>

      <Section surface="navy">
        <div className="final-cta-grid">
          <Reveal className="max-w-2xl">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ocean-light">Readiness discussion</p>
            <h2 className="mb-4 text-[30px] leading-[1.08] text-white sm:text-[42px]">
              See how CertaMaris would structure readiness across your fleet.
            </h2>
            <p className="max-w-xl text-[15.5px] leading-relaxed text-white/72">
              A focused conversation around your fleet scope, evidence condition, open findings, and the readiness
              workflows that need a controlled system of record.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
            <Button href="/platform" variant="secondary" className="border-white/35 text-white hover:bg-white/10">
              {SECONDARY_CTA_LABEL}
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
