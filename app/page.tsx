import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { CapabilityCard } from "@/components/CapabilityCard";
import { HeroVideo } from "@/components/HeroVideo";
import { PersonaCard } from "@/components/PersonaCard";
import { ProcessStepList } from "@/components/ProcessStepList";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { PRIMARY_CTA_LABEL, SECONDARY_CTA_LABEL } from "@/lib/constants";
import { capabilityPillars, personas, processSteps } from "@/lib/content";

const productScreens = [
  {
    src: "/product/clean/requirement-control-mapping.png",
    alt: "CertaMaris control detail screen showing requirement mappings, implementation context, coverage status, and validation dates.",
    label: "Requirement mapping",
    title: "Requirement-to-control mapping",
    body: "Controls show their mapped requirements, coverage state, validation owner, and review date in the same workspace.",
  },
  {
    src: "/product/clean/evidence-coverage.png",
    alt: "CertaMaris evidence coverage matrix showing control coverage, freshness, and request-evidence actions.",
    label: "Evidence workflow",
    title: "Evidence coverage and freshness",
    body: "The evidence view makes stale, expiring, and missing support visible before a reviewer or surveyor asks for it.",
  },
  {
    src: "/product/clean/findings-register.png",
    alt: "CertaMaris findings and risks register showing open findings, risk ratings, owners, due dates, and action status.",
    label: "Findings and actions",
    title: "Findings with action ownership",
    body: "Findings, risks, overdue actions, owners, and due dates stay connected instead of disappearing into email threads.",
  },
  {
    src: "/product/clean/executive-reporting.png",
    alt: "CertaMaris board pack screen showing portfolio health, strategic risk exposure, regulator standing, attestation status, and KPI trends.",
    label: "Executive reporting",
    title: "Executive reporting",
    body: "Board-facing views summarize assurance posture, strategic risk, attestations, and operating KPIs from the same record.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-section" aria-labelledby="hero-title">
        <HeroVideo />
        <div className="shell relative z-10 py-28 sm:py-32">
          <div className="hero-copy-block max-w-2xl">
            <Eyebrow>Maritime cyber compliance &amp; assurance</Eyebrow>
            <h1
              id="hero-title"
              className="text-[46px] sm:text-[68px] lg:text-[84px] leading-[0.98] tracking-[-0.02em] mb-8"
            >
              Cyber compliance your fleet can prove.
            </h1>
            <p className="text-[17px] sm:text-[18px] text-navy/80 max-w-xl mb-9 leading-relaxed">
              CertaMaris structures the evidence, control mapping, and findings behind IMO cyber-risk management and
              IACS UR E26/E27 — so readiness is a standing state, not a scramble before survey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
              <Button href="/platform" variant="secondary">
                {SECONDARY_CTA_LABEL}
              </Button>
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

      {/* CAPABILITY PILLARS */}
      <Section id="product-screens" surface="paper">
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

      {/* PRODUCT DEMONSTRATION */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <Eyebrow>Product view</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-5">
              Readiness, risk, evidence, and board status in one working product.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-6">
              CertaMaris shows the current assurance state directly: program health, aggregate risk exposure,
              regulator standing, open findings, and attention items tied back to the work behind them.
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              <StatusBadge status="ok" label="Program health visible" />
              <StatusBadge status="caution" label="Attention items tracked" />
              <StatusBadge status="critical" label="Critical findings surfaced" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              src="/product/clean/executive-dashboard.png"
              alt="CertaMaris executive assurance dashboard showing program health, aggregate risk exposure, regulator ratings, critical findings, board attestation, risk exposure trend, and attention items."
              label="Executive assurance dashboard"
              priority
            />
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Inside the product</Eyebrow>
          <h2 className="text-[30px] sm:text-[36px] leading-[1.12]">
            The site should show the system operators actually use.
          </h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-6" stagger={0.05}>
          {productScreens.map((screen) => (
            <ProductScreenTile key={screen.src} {...screen} />
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

      {/* PROOF POINTS (structurally honest, no fabricated stats) */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter to={10} label="Compliance domains covered" />
          <Counter to={5} label="Platform capability pillars" />
          <Counter to={13} label="Trace-chain stages from requirement to review" />
          <Counter to={2} label="Design-stage IACS URs supported (E26 / E27)" />
        </div>
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
