import Link from "next/link";
import { AssuranceLifecycleTeaser } from "@/components/AssuranceLifecycleTeaser";
import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";
import { Button } from "@/components/Button";
import { BuyerDiligencePacket } from "@/components/BuyerDiligencePacket";
import { EvidenceChain } from "@/components/EvidenceChain";
import { FleetAssuranceWorkbench } from "@/components/FleetAssuranceWorkbench";
import { FleetHierarchy } from "@/components/FleetHierarchy";
import { FounderPortrait } from "@/components/FounderPortrait";
import { HomeHero } from "@/components/HomeHero";
import { HomepageProductShowcase } from "@/components/HomepageProductShowcase";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { APP_SIGN_IN_URL, REGULATORY_BOUNDARY } from "@/lib/constants";
import { pricingTiers } from "@/lib/faq-pricing";
import { productProofScreens } from "@/lib/product-screens";
import { differentiationModels } from "@/lib/solutions-audience";

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

const audienceLinks = [
  { title: "Ship owners", href: "/who-we-serve/ship-owners" },
  { title: "Operators", href: "/who-we-serve/operators" },
  { title: "Technical managers & DPAs", href: "/who-we-serve/technical-managers-dpas" },
  { title: "Maritime IT/OT", href: "/who-we-serve/maritime-it-ot" },
  { title: "Vessel masters & officers", href: "/who-we-serve/vessel-masters-officers" },
  { title: "Classification & survey", href: "/who-we-serve/classification-survey" },
];

const trustLinks: [string, string][] = [
  ["/security", "Security"],
  ["/trust", "Trust Center"],
  ["/legal/privacy", "Privacy Policy"],
  ["/legal/terms", "Business Terms"],
  ["/legal/library", "Legal Library"],
];

const homepageDifferentiation = differentiationModels.slice(0, 3);
const pricingTeaserTiers = pricingTiers.map((tier) => ({
  name: tier.name,
  audience: tier.audience,
  platformFee: tier.platformFee,
  vesselPrice: tier.vesselPrice,
  minimumNote: tier.minimumNote,
}));

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section id="regulatory-strip" spacing="tight" surface="paper">
        <Reveal>
          <div className="regulatory-credibility-strip">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean">
              Regulatory orientation
            </p>
            <p className="mt-2 max-w-4xl text-[15px] leading-relaxed text-navy/85">
              Supports workflows aligned to{" "}
              <Link href="/compliance/imo" className="font-semibold text-ocean hover:underline">
                IMO MSC.428(98)
              </Link>{" "}
              and{" "}
              <Link href="/compliance/iacs" className="font-semibold text-ocean hover:underline">
                IACS UR E26/E27
              </Link>
              . Official texts control. CertaMaris does not certify compliance or replace qualified reviewers,
              class, or flag.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section id="fleet-workbench" spacing="compact">
        <Reveal className="mb-10 max-w-3xl">
          <Eyebrow>Fleet hierarchy &amp; workbench</Eyebrow>
          <h2 className="section-h2 section-h2--lg">
            See how company, fleet, and vessel work stay connected.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            Start with the operating hierarchy, then open the sample workbench — vessel scope, evidence,
            findings, actions, and package state in one inspectable surface.
          </p>
        </Reveal>
        <Reveal className="mb-8">
          <FleetHierarchy />
        </Reveal>
        <Reveal>
          <FleetAssuranceWorkbench />
        </Reveal>
      </Section>

      <Section id="evidence-chain" surface="paper" spacing="compact">
        <Reveal className="mb-12 max-w-3xl">
          <Eyebrow>Signature assurance chain</Eyebrow>
          <h2 className="section-h2 section-h2--lg">
            One unbroken record from requirement to released readiness package.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            Every step below is a controlled object in the platform — owned, versioned, and inspectable.
          </p>
        </Reveal>
        <Reveal className="mb-8">
          <AssuranceLifecycleTeaser />
        </Reveal>
        <EvidenceChain />
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/demo#scrub-tour">Scrub the product tour</Button>
          <Link href="/platform" className="text-[14px] font-semibold text-ocean hover:underline">
            Platform capabilities
          </Link>
        </div>
      </Section>

      <Section id="product-dashboard" spacing="compact">
        <Reveal className="mb-12 max-w-3xl">
          <Eyebrow>Product storytelling</Eyebrow>
          <h2 className="section-h2 section-h2--lg">
            One connected workflow from requirement to readiness package.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            Select a stage to keep the product view and the operating explanation together.
          </p>
        </Reveal>
        <HomepageProductShowcase steps={showcaseSteps} />
      </Section>

      <Section id="before-after" surface="paper" spacing="compact">
        <Reveal className="mb-10 max-w-3xl">
          <Eyebrow>Before / with</Eyebrow>
          <h2 className="section-h2 section-h2--lg">
            Keep the work you already do — connect the record so it survives review.
          </h2>
        </Reveal>
        <Reveal>
          <BeforeAfterComparison />
        </Reveal>
      </Section>

      <Section spacing="compact">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <Eyebrow>Who we serve</Eyebrow>
            <h2 className="section-h2">Built for the roles that carry the review record.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-structural">
              Choose a role in the hero to tailor the sample record, or browse every audience path.
            </p>
            <Link
              href="/who-we-serve"
              className="mt-5 inline-block text-[14px] font-semibold text-ocean hover:underline"
            >
              All roles
            </Link>
          </Reveal>
          <ul className="grid gap-2 sm:grid-cols-2">
            {audienceLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-l-2 border-ocean/35 py-2 pl-3 text-[15px] font-semibold text-navy transition-colors hover:border-ocean hover:text-ocean"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Differentiation</Eyebrow>
          <h2 className="section-h2">
            Maritime-native — not another spreadsheet or generic GRC shell.
          </h2>
        </Reveal>
        <div className="grid gap-6">
          {homepageDifferentiation.map((model) => (
            <Reveal key={model.id}>
              <article className="grid gap-2 border-l-2 border-ocean/30 pl-4 md:grid-cols-[0.85fr_1.15fr] md:gap-8">
                <div>
                  <h3 className="text-[16px] font-semibold text-navy">{model.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-structural">{model.weakness}</p>
                </div>
                <p className="text-[14.5px] leading-relaxed text-navy/85">
                  <span className="font-semibold text-ocean">CertaMaris: </span>
                  {model.certamaris}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/why-certamaris" className="text-[14px] font-semibold text-ocean hover:underline">
            Why CertaMaris — full comparison
          </Link>
        </div>
      </Section>

      <Section id="trust-pricing" spacing="compact">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <Eyebrow>Trust &amp; security</Eyebrow>
            <h2 className="section-h2">Security posture and diligence paths, without invented claims.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-structural">
              Review public security controls, procurement paths, and legal documents before the demo.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              {trustLinks.map(([href, label]) => (
                <Link key={href} href={href} className="text-[14px] font-semibold text-ocean hover:underline">
                  {label}
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="section-h2">Honest packages — Core, Assurance, Enterprise.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-structural">
              Annual platform fee plus contracted vessels. No fake &quot;Most Popular&quot; badge — fit depends on
              fleet scope and review depth.
            </p>
            <ul className="mt-5 grid gap-3">
              {pricingTeaserTiers.map((tier) => (
                <li key={tier.name} className="border-b border-navy/10 pb-3">
                  <p className="text-[15px] font-semibold text-navy">{tier.name}</p>
                  <p className="mt-1 text-[13px] text-structural">
                    {tier.audience} · {tier.platformFee} · {tier.vesselPrice}
                  </p>
                  <p className="mt-1 text-[12.5px] text-navy/65">{tier.minimumNote}</p>
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="mt-5 inline-block text-[14px] font-semibold text-ocean hover:underline">
              Full pricing and package comparison
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section id="buyer-diligence" spacing="compact" surface="paper">
        <Reveal>
          <BuyerDiligencePacket />
        </Reveal>
      </Section>

      <Section spacing="compact">
        <Reveal className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
            <FounderPortrait size="sm" className="mx-auto sm:mx-0" />
            <div className="max-w-2xl">
              <Eyebrow>From the founder</Eyebrow>
              <h2 className="section-h2">Why I built this.</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-structural">
                I came to this from the deck side — Third Mate, Unlimited Tonnage, Oceans — watching cyber
                compliance break when requirements, proof, and ownership lived in different places.
                CertaMaris keeps that chain connected through to a package you can hand over.
              </p>
              <div className="mt-5 border-t border-navy/10 pt-4">
                <p className="text-[16px] font-semibold text-navy">Skyler Brown</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-structural">
                  Founder, CertaMaris · Third Mate, Unlimited Tonnage, Oceans
                </p>
                <Link
                  href="/about/leadership"
                  className="mt-3 inline-block text-[14px] font-semibold text-ocean hover:underline"
                >
                  Full profile and credentials
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section spacing="compact">
        <Reveal className="mx-auto max-w-4xl">
          <LiquidGlass variant="strong" padding="lg" className="trust-note">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ocean">
              Trust &amp; regulatory boundary
            </p>
            <p className="mb-4 text-[15px] leading-relaxed text-navy/78">{REGULATORY_BOUNDARY}</p>
            <div className="flex flex-wrap gap-4">
              {trustLinks.map(([href, label]) => (
                <Link key={href} href={href} className="text-[14px] font-semibold text-ocean hover:underline">
                  {label}
                </Link>
              ))}
            </div>
          </LiquidGlass>
        </Reveal>
      </Section>

      <Section surface="paper">
        <div className="final-cta-grid">
          <Reveal className="max-w-2xl">
            <LiquidGlass variant="strong" padding="lg">
              <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ocean">
                Request a demo
              </p>
              <h2 className="section-h2 section-h2--lg mb-4">
                Request a focused conversation on readiness across your fleet.
              </h2>
              <p className="max-w-xl text-[15.5px] leading-relaxed text-structural">
                Tell us about fleet scope, evidence condition, and open findings. This is a request form —
                not a calendar booking — so we can prepare a useful demo and readiness discussion.
              </p>
            </LiquidGlass>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col gap-3 sm:flex-row lg:justify-end lg:self-center">
            <Button href="/contact?intent=demo">Request a demo</Button>
            <Button href="/demo#scrub-tour" variant="secondary">
              Product tour
            </Button>
            <Button href={APP_SIGN_IN_URL} variant="ghost" external>
              Sign in
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
