import Link from "next/link";
import { Button } from "@/components/Button";
import { DepthContours } from "@/components/DepthContours";
import { EvidenceChain } from "@/components/EvidenceChain";
import { FounderPortrait } from "@/components/FounderPortrait";
import { HeroPixelGrid } from "@/components/HeroPixelGrid";
import { HomepageProductShowcase } from "@/components/HomepageProductShowcase";
import { LiquidGlass } from "@/components/LiquidGlass";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { SampleRecordExplorer } from "@/components/SampleRecordExplorer";
import { Eyebrow, Section } from "@/components/Section";
import { APP_SIGN_IN_URL, REGULATORY_BOUNDARY } from "@/lib/constants";
import { PLATFORM_HIERARCHY } from "@/lib/product-hierarchy";
import { productProofScreens } from "@/lib/product-screens";
import { differentiationModels, implementationSteps } from "@/lib/solutions-audience";

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

const outcomes = [
  {
    title: "Faster evidence retrieval",
    body: "Find what supports a control without reconstructing folders and inboxes under survey pressure.",
    href: "/platform/evidence",
    linkLabel: "Evidence management",
  },
  {
    title: "Fewer overdue actions lost in email",
    body: "Corrective actions stay owned, aged, and tied to verification evidence before closure.",
    href: "/platform/findings-corrective-actions",
    linkLabel: "Findings and CAPA",
  },
  {
    title: "Consistent vessel records",
    body: "Company, fleet, and vessel portals keep hierarchy intact with individual auditable identities.",
    href: "/platform/vessel-portal",
    linkLabel: "Vessel portal",
  },
  {
    title: "Clearer fleet posture",
    body: "Review readiness, findings, and deadlines using traceable operational records.",
    href: "/platform/fleet-management",
    linkLabel: "Fleet management",
  },
  {
    title: "Easier survey preparation",
    body: "Assemble readiness packages from approved live work — not a last-week document scramble.",
    href: "/solutions/audit-survey-readiness",
    linkLabel: "Audit & survey readiness",
  },
  {
    title: "Controlled change history",
    body: "Requirement versions, evidence decisions, and package releases retain audit history.",
    href: "/platform/regulatory-intelligence",
    linkLabel: "Regulatory intelligence",
  },
];

const audiences = [
  {
    title: "Ship owners",
    body: "Fleet-wide readiness and open leadership decisions without chasing every vessel.",
    href: "/who-we-serve/ship-owners",
  },
  {
    title: "Operators",
    body: "Tenant-isolated company workspace for users, fleets, engagements, and released deliverables.",
    href: "/who-we-serve/operators",
  },
  {
    title: "Technical managers & DPAs",
    body: "SMS cyber evidence, findings, CAPA verification, and readiness packages in one record.",
    href: "/who-we-serve/technical-managers-dpas",
  },
  {
    title: "Maritime IT/OT teams",
    body: "Control mapping that respects IT/OT boundaries, with optional SBOM context.",
    href: "/who-we-serve/maritime-it-ot",
  },
  {
    title: "Vessel masters & officers",
    body: "Vessel-scoped work with named users — not a shared vessel password.",
    href: "/who-we-serve/vessel-masters-officers",
  },
];

const trustLinks: [string, string][] = [
  ["/security", "Security"],
  ["/privacy", "Privacy"],
  ["/accessibility", "Accessibility"],
  ["/compliance", "Compliance"],
];

const homepageDifferentiation = differentiationModels.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <section className="hero-chart relative" aria-labelledby="hero-title">
        <HeroPixelGrid className="hero-chart-pixels" />
        <DepthContours className="hero-chart-contours" />
        <div className="shell relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
            <Reveal className="hero-copy-block max-w-2xl">
              <p className="hero-chart-eyebrow mb-5">Maritime cyber compliance · Continuous assurance</p>
              <h1
                id="hero-title"
                className="mb-6 text-[40px] leading-[1.02] tracking-[-0.02em] sm:text-[56px] lg:text-[64px]"
              >
                Continuous assurance across every company, fleet, vessel, control, evidence record, finding, and
                released report.
              </h1>
              <p className="hero-chart-lede mb-7 max-w-[39rem] text-[17px] font-medium leading-[1.55] tracking-[-0.01em] sm:text-[19px]">
                CertaMaris is evidence-first maritime cyber compliance software for ship owners, operators, DPAs,
                technical managers, IT/OT teams, and vessel users — so readiness work is inspectable before survey
                week.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?intent=demo"
                  className="btn-chart-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fb4d6]"
                >
                  Request a demo
                </Link>
                <Link
                  href="/platform"
                  className="btn-chart-secondary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fb4d6]"
                >
                  View platform
                </Link>
                <a
                  href={APP_SIGN_IN_URL}
                  className="inline-flex items-center px-2 py-3 text-[15px] font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fb4d6]"
                  data-integration-point="sign-in"
                >
                  Sign in
                </a>
              </div>
              <a href="#evidence-chain" className="hero-chain-pointer mt-8 inline-block">
                01 REQ → 10 PKG · follow the chain of custody ↓
              </a>
              <p className="hero-chart-boundary mt-6 max-w-xl text-[13.5px] leading-relaxed">
                Workflow scope includes work aligned to IMO MSC.428(98) and IACS UR E26/E27. Official texts control;
                CertaMaris does not certify compliance or guarantee survey outcomes.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <LiquidGlass variant="dark" padding="lg" className="hero-signal-panel">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7fb4d6]">Product proof</p>
                    <p className="mt-1 text-[15px] font-semibold text-white">Requirement and control mapping</p>
                  </div>
                  <Link
                    href="/platform"
                    className="text-[13.5px] font-semibold text-ocean-light underline-offset-4 hover:underline"
                  >
                    Inspect the platform
                  </Link>
                </div>
                <ProductScreenFrame
                  {...productProofScreens.requirementMapping}
                  interactive={false}
                  priority
                  sizes="(min-width: 1280px) 48vw, (min-width: 768px) 82vw, 100vw"
                />
              </LiquidGlass>
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
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-structural">
            Before the survey is a scramble, the record is often already broken: missing owners, stale files, and
            requirement changes that never reached every vessel.
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {problemItems.map((item) => (
            <LiquidGlass key={item.title} as="article" variant="subtle" padding="md">
              <h3 className="mb-2 border-l-2 border-ocean/45 pl-3 text-[18px] font-semibold leading-snug">{item.title}</h3>
              <p className="pl-3 text-[14.5px] leading-relaxed text-structural">{item.body}</p>
            </LiquidGlass>
          ))}
        </div>
      </Section>

      <Section id="evidence-chain">
        <Reveal className="mb-12 max-w-3xl">
          <Eyebrow>Chain of custody</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            One unbroken record from requirement to released readiness package.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            Every step below is a controlled object in the platform — owned, versioned, and inspectable. This chain is
            the product&apos;s operating unit, not a marketing diagram.
          </p>
        </Reveal>
        <EvidenceChain />
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/demo">See the workflow in action</Button>
          <Link href="/platform" className="text-[14px] font-semibold text-ocean hover:underline">
            Platform capabilities
          </Link>
        </div>
      </Section>

      <Section id="sample-record" surface="paper" spacing="compact">
        <Reveal className="mb-8 max-w-3xl">
          <Eyebrow>Inspect it yourself</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            Walk one sample record end to end.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            An illustrative instance of the chain above for the sample vessel MV Certa Maris — the same object model
            the product keeps for real fleets. Click any object, follow its linked records. No signup, and no invented
            numbers: sample data is labeled as sample data.
          </p>
        </Reveal>
        <SampleRecordExplorer />
      </Section>

      <Section id="hierarchy">
        <Reveal className="mb-10 max-w-3xl">
          <Eyebrow>Platform hierarchy</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            Corporate administration → client company & fleet → vessel portals → controlled work objects.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-structural">
            Individual auditable identities at every level. Not a shared vessel password model.
          </p>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-2">
          {PLATFORM_HIERARCHY.map((level, index) => (
            <LiquidGlass key={level.id} as="article" variant="default" padding="md">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ocean mb-1">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[17px] font-semibold mb-2">
                <Link href={level.href} className="hover:text-ocean">
                  {level.title}
                </Link>
              </h3>
              <p className="text-[14px] leading-relaxed text-structural">{level.summary}</p>
            </LiquidGlass>
          ))}
        </div>
      </Section>

      <Section id="product-dashboard">
        <Reveal className="mb-12 max-w-3xl">
          <Eyebrow>Product in action</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            One connected workflow from requirement to readiness package.
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-structural">
            Select a stage to keep the product view and the operating explanation together. The same record carries
            owner, decision, and supporting evidence — without a modal theater.
          </p>
        </Reveal>
        <HomepageProductShowcase steps={showcaseSteps} />
      </Section>

      <Section spacing="compact">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>Business value</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            Operational outcomes grounded in traceable records.
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item) => (
            <LiquidGlass key={item.title} as="article" variant="default" padding="md" className="outcome-row">
              <h3 className="text-[18px] font-semibold">{item.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-structural">{item.body}</p>
              <Link href={item.href} className="mt-1 text-[14px] font-semibold text-ocean hover:underline">
                {item.linkLabel}
              </Link>
            </LiquidGlass>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal>
            <Eyebrow>Who we serve</Eyebrow>
            <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
              Built for the roles that carry the review record.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-structural">
              Classification, assurance, and review stakeholders can work from a structured evidence trail when the
              operator grants access — without CertaMaris replacing class, flag, or counsel.
            </p>
            <Link href="/who-we-serve" className="mt-5 inline-block text-[14px] font-semibold text-ocean hover:underline">
              All roles
            </Link>
          </Reveal>
          <div className="grid gap-4">
            {audiences.map((item) => (
              <LiquidGlass key={item.title} as="article" variant="subtle" padding="md" className="audience-note">
                <h3 className="mb-2 text-[17px] font-semibold">
                  <Link href={item.href} className="hover:text-ocean">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-[14.5px] leading-relaxed text-structural">{item.body}</p>
              </LiquidGlass>
            ))}
          </div>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Differentiation</Eyebrow>
          <h2 className="text-[30px] leading-[1.12] sm:text-[38px]">
            Maritime-native — not another spreadsheet or generic GRC shell.
          </h2>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {homepageDifferentiation.map((model) => (
            <LiquidGlass key={model.id} as="article" variant="subtle" padding="md">
              <h3 className="text-[15.5px] font-semibold mb-2">{model.title}</h3>
              <p className="text-[13.5px] text-structural leading-relaxed mb-2">{model.weakness}</p>
              <p className="text-[13.5px] text-navy/85 leading-relaxed">
                <span className="font-semibold text-ocean">CertaMaris: </span>
                {model.certamaris}
              </p>
            </LiquidGlass>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/why-certamaris" className="text-[14px] font-semibold text-ocean hover:underline">
            Why CertaMaris — full comparison
          </Link>
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Compliance</Eyebrow>
          <h2 className="text-[28px] leading-[1.12] sm:text-[34px]">
            Framework-aligned workflows. Official texts control.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-structural">
            Explore IMO MSC.428(98), IACS UR E26/E27, and related compliance context — without automatic compliance
            claims.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link href="/compliance" className="text-[14px] font-semibold text-ocean hover:underline">
              Compliance overview
            </Link>
            <Link href="/solutions/imo-msc-428-98" className="text-[14px] font-semibold text-ocean hover:underline">
              IMO MSC.428(98)
            </Link>
            <Link href="/solutions/iacs-ur-e26" className="text-[14px] font-semibold text-ocean hover:underline">
              IACS UR E26
            </Link>
            <Link href="/solutions/iacs-ur-e27" className="text-[14px] font-semibold text-ocean hover:underline">
              IACS UR E27
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Implementation</Eyebrow>
          <h2 className="text-[28px] leading-[1.12] sm:text-[34px]">
            Discovery through continuous assurance.
          </h2>
        </Reveal>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {implementationSteps.slice(0, 4).map((step) => (
            <li key={step.number}>
              <LiquidGlass variant="subtle" padding="md">
                <span className="font-mono text-ocean text-[12px]">{step.number}</span>
                <h3 className="text-[15px] font-semibold mt-2 mb-1">{step.title}</h3>
                <p className="text-[13px] text-structural leading-relaxed">{step.detail}</p>
              </LiquidGlass>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link href="/implementation" className="text-[14px] font-semibold text-ocean hover:underline">
            Full implementation path
          </Link>
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
            <FounderPortrait size="sm" className="mx-auto sm:mx-0" />
            <div className="max-w-2xl">
              <Eyebrow>From the founder</Eyebrow>
              <h2 className="text-[26px] leading-[1.14] sm:text-[30px]">Why I built this.</h2>
              <div className="mt-4 grid gap-4 text-[15px] leading-relaxed text-structural">
                <p>
                  I came to this problem from the deck side. I hold a U.S. Merchant Mariner credential — Third Mate,
                  Unlimited Tonnage, Oceans — and I know how shipboard work actually gets documented: safety-management
                  systems, inspections, records that have to hold up when someone official asks for them.
                </p>
                <p>
                  Cyber compliance kept breaking the same way. The requirement lived in one place and the proof in
                  another — spreadsheets, shared drives, inboxes, consultant reports — and by survey week nobody could
                  show how any of it connected. CertaMaris exists to keep that chain connected: requirement to control
                  to evidence to finding to corrective action to a package you can hand over.
                </p>
                <p>
                  You won&apos;t find invented metrics or compliance guarantees on this site. Official texts control,
                  and humans make the calls. That&apos;s the standard the product is built to — and the standard this
                  website is held to.
                </p>
              </div>
              <div className="mt-6 border-t border-navy/10 pt-4">
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
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ocean">Trust & regulatory boundary</p>
            <p className="text-[15px] leading-relaxed text-navy/78 mb-4">{REGULATORY_BOUNDARY}</p>
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

      <Section surface="navy">
        <div className="final-cta-grid">
          <Reveal className="max-w-2xl">
            <LiquidGlass variant="dark" padding="lg">
              <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ocean-light">Request a demo</p>
              <h2 className="mb-4 text-[30px] leading-[1.08] text-white sm:text-[40px]">
                Request a focused conversation on readiness across your fleet.
              </h2>
              <p className="max-w-xl text-[15.5px] leading-relaxed text-white/72">
                Tell us about fleet scope, evidence condition, and open findings. This is a request form — not a
                calendar booking — so we can prepare a useful demo and readiness discussion.
              </p>
            </LiquidGlass>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col gap-3 sm:flex-row lg:justify-end lg:self-center">
            <Button href="/contact?intent=demo">Request a demo</Button>
            <Button
              href="/platform"
              variant="inverse"
            >
              View platform
            </Button>
            <Button
              href={APP_SIGN_IN_URL}
              variant="ghost"
              external
              className="border border-navy/80 bg-navy/90 text-white hover:bg-navy"
            >
              Sign in
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
