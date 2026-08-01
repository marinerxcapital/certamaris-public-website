import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { ProcessStepList } from "@/components/ProcessStepList";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import {
  MATURITY_BADGE,
  PLATFORM_HIERARCHY,
  TRACEABILITY_CHAIN,
  platformOverview,
  productModules,
} from "@/lib/product-hierarchy";
import { processSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";

export const metadata = pageMetadata(
  "Platform",
  "CertaMaris platform hierarchy: corporate administration, client company and fleet portals, vessel portals, assessments, evidence, findings, plans, regulatory intelligence, continuous assurance, reports, and integrations.",
  "/platform"
);

const operationalScreens = [
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.correctiveActions,
  productProofScreens.auditReadiness,
] as const;

const moduleNav = productModules.map((m) => ({
  href: `/platform/${m.slug}`,
  title: m.title,
  maturity: m.maturity,
  summary: m.headline,
}));

export default function PlatformPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Platform"
        title={platformOverview.headline}
        intro={platformOverview.intro}
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

      <nav aria-label="Platform modules" className="jump-nav border-b" style={{ borderColor: "var(--hairline)" }}>
        <div className="shell py-4 flex flex-wrap gap-x-5 gap-y-2">
          {moduleNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] font-medium text-navy hover:text-ocean transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      <Section id="hierarchy">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>Platform hierarchy</Eyebrow>
          <h2 className="text-[28px] sm:text-[36px] leading-[1.12]">
            Corporate administration → company & fleet → vessel → controlled work objects.
          </h2>
          <p className="mt-4 text-[15px] text-structural leading-relaxed">
            Human users receive individual auditable identities. CertaMaris does not advertise a shared vessel
            password model.
          </p>
        </Reveal>
        <div className="grid gap-4">
          {PLATFORM_HIERARCHY.map((level, index) => (
            <Reveal key={level.id} delay={index * 0.04}>
              <article className="liquid-glass liquid-glass--default lg-pad-md">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean mb-1">
                      Level {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[18px] font-semibold">
                      <Link href={level.href} className="hover:text-ocean">
                        {level.title}
                      </Link>
                    </h3>
                  </div>
                  <Link href={level.href} className="text-[13.5px] font-semibold text-ocean hover:underline">
                    Open module
                  </Link>
                </div>
                <p className="text-[14.5px] text-structural leading-relaxed mb-4">{level.summary}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {level.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[13.5px] text-navy/85">
                      <span className="text-ocean" aria-hidden>
                        —
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="trace-chain" surface="paper">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>Traceability</Eyebrow>
            <h2 className="text-[28px] sm:text-[36px] leading-[1.12] mb-5">
              Requirement through released readiness package.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-6">
              The operating unit of the platform is the connected chain — not a separate dashboard for each step.
            </p>
            <p className="hero-trace-line mb-4">
              {TRACEABILITY_CHAIN.map((s) => s.title).join(" → ")}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <ol className="space-y-3">
              {TRACEABILITY_CHAIN.map((step, i) => (
                <li key={step.id} className="flex gap-3 border-b border-navy/10 pb-3">
                  <span className="font-mono text-ocean text-[12px] shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold">{step.title}</p>
                    <p className="text-[13.5px] text-structural leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section id="operational-screens" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Operating sequence</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            From coverage gaps to a reviewable readiness package.
          </h2>
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
        </Reveal>
        <Reveal>
          <ul className="grid sm:grid-cols-2 gap-x-12">
            {platformOverview.workProducts.map((item) => (
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

      <Section spacing="compact" id="modules">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Product modules</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Explore every platform surface.</h2>
          <p className="mt-4 text-[15px] text-structural leading-relaxed">
            Maturity labels are honest: Current, Configurable, Planned, or Preview.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduleNav.map((item) => {
            const badge = MATURITY_BADGE[item.maturity];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="liquid-glass liquid-glass--subtle lg-pad-md block group h-full"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="text-[15.5px] font-semibold group-hover:text-ocean">{item.title}</h3>
                  <StatusBadge status={badge.badgeStatus} label={badge.label} />
                </div>
                <p className="text-[13.5px] text-structural leading-relaxed">{item.summary}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Process</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">From scope to continuous readiness.</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <ProcessStepList steps={processSteps} />
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.06} className="flex flex-wrap gap-3">
          <Button href="/contact?intent=demo">Request a demo</Button>
          <Button href="/implementation" variant="secondary">
            Implementation
          </Button>
          <Button href="/solutions" variant="ghost">
            Solutions
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
