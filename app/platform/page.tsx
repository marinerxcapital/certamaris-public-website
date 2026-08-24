import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { CustodyStripBand } from "@/components/CustodyStripBand";
import { EvidenceChain } from "@/components/EvidenceChain";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import {
  MATURITY_BADGE,
  PLATFORM_HIERARCHY,
  platformOverview,
  productModules,
} from "@/lib/product-hierarchy";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";

export const metadata = pageMetadata(
  "Platform",
  "CertaMaris platform hierarchy: company, fleet, and vessel portals with assessments, evidence, findings, plans, intelligence, reports, and integrations.",
  "/platform"
);

const showcaseBeats = [
  {
    id: "map",
    title: "Map the requirement",
    body: "Versioned instruments stay distinct from human applicability decisions.",
    screen: productProofScreens.requirementMapping,
  },
  {
    id: "evidence",
    title: "Judge the evidence",
    body: "Custodian, sufficiency, and freshness travel with the artifact.",
    screen: productProofScreens.evidenceCoverage,
  },
  {
    id: "action",
    title: "Close with verification",
    body: "Findings stay tied to CAPA owners, due dates, and proof of closure.",
    screen: productProofScreens.correctiveActions,
  },
  {
    id: "package",
    title: "Release the package",
    body: "Assemble readiness from approved live work — without claiming the survey outcome.",
    screen: productProofScreens.auditReadiness,
  },
] as const;

const moduleNav = productModules.map((m) => ({
  href: `/platform/${m.slug}`,
  title: m.title,
  maturity: m.maturity,
  summary: m.headline,
}));

/**
 * Authored platform landing — homepage-quality composition:
 * brand signal, custody strip, hierarchy spine, four product beats, quiet module index.
 */
export default function PlatformPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Platform"
        title="The controlled record behind maritime cyber readiness."
        intro="Company, fleet, and vessel work share one assurance chain — requirements, controls, evidence, findings, actions, and released packages — with individual auditable identities at every level."
        aside={
          <div className="w-full max-w-[min(420px,100%)] space-y-3 lg:w-[420px]">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
              CertaMaris · Platform
            </p>
            <ProductScreenFrame
              {...productProofScreens.executiveReporting}
              priority
              sizes="(min-width: 1024px) 420px, 80vw"
            />
          </div>
        }
      />

      <CustodyStripBand href="/demo#scrub-tour" label="Scrub the product tour" />

      <Section id="hierarchy" spacing="compact">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>Platform hierarchy</Eyebrow>
          <h2 className="section-h2 section-h2--lg">
            Company & fleet → vessel → controlled work objects.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-structural">
            Human users receive individual auditable identities. CertaMaris does not advertise a shared
            vessel password model.
          </p>
        </Reveal>
        <ol className="platform-hierarchy-spine">
          {PLATFORM_HIERARCHY.map((level, index) => (
            <li key={level.id} className="platform-hierarchy-step">
              <span className="platform-hierarchy-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[17px] font-semibold">
                  <Link href={level.href} className="hover:text-ocean">
                    {level.title}
                  </Link>
                </h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-structural">{level.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {level.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="text-[13px] text-navy/75">
                      <span className="text-ocean" aria-hidden="true">
                        —{" "}
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  prefetch={false}
                  href={level.href}
                  className="mt-3 inline-block text-[13.5px] font-semibold text-ocean hover:underline"
                >
                  Open module
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="operating-beats" surface="paper">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>Operating beats</Eyebrow>
          <h2 className="section-h2 section-h2--lg">
            Four moments that prove the chain is real.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-structural">
            Sanitized product captures — illustrative, not customer data or outcome guarantees.
          </p>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-2">
          {showcaseBeats.map((beat, index) => (
            <Reveal key={beat.id} delay={index * 0.04} className="platform-beat">
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
                Beat {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-[18px] font-semibold text-navy">{beat.title}</h3>
              <p className="mb-4 text-[14.5px] leading-relaxed text-structural">{beat.body}</p>
              <ProductScreenFrame {...beat.screen} sizes="(min-width: 1024px) 42vw, 100vw" />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/demo#scrub-tour">Scrub the full tour</Button>
          <Button href="/#sample-record" variant="secondary">
            Inspect the sample record
          </Button>
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Traceability</Eyebrow>
          <h2 className="section-h2">The operating unit is the connected chain.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-structural">
            Not a separate dashboard for each step — one inspectable custody thread.
          </p>
        </Reveal>
        <EvidenceChain />
      </Section>

      <Section surface="paper" spacing="compact" id="modules">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Modules</Eyebrow>
          <h2 className="section-h2 section-h2--lg">Explore every platform surface.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-structural">
            Maturity labels are honest: Current, Configurable, Planned, or Preview.
          </p>
        </Reveal>
        <ul className="platform-module-index">
          {moduleNav.map((item) => {
            const badge = MATURITY_BADGE[item.maturity];
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="platform-module-row group"
                >
                  <span className="min-w-0">
                    <span className="block text-[15.5px] font-semibold text-navy group-hover:text-ocean">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed text-structural">
                      {item.summary}
                    </span>
                  </span>
                  <StatusBadge status={badge.badgeStatus} label={badge.label} />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section spacing="compact">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>Work products</Eyebrow>
          <h2 className="section-h2">Artifacts the program produces.</h2>
        </Reveal>
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {platformOverview.workProducts.map((item) => (
            <li
              key={item.title}
              className="border-b border-navy/10 py-4 first:pt-0 sm:[&:nth-child(-n+2)]:pt-0"
            >
              <h3 className="mb-1 text-[15px] font-semibold">{item.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-structural">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="mb-8 max-w-3xl" />
        </Reveal>
        <Reveal delay={0.06} className="flex flex-wrap gap-3">
          <Button href="/contact?intent=demo">Request a demo</Button>
          <Button href="/trust/assurance-model" variant="secondary">
            Assurance model one-pager
          </Button>
          <Button href="/solutions" variant="ghost">
            Solutions
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
