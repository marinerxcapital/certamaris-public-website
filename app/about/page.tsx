import Link from "next/link";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { APP_SALES_EMAIL, APP_SIGN_IN_URL, PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "CertaMaris builds maritime cyber compliance and assurance software for fleet-scale operators.",
  "/about"
);

const principles = [
  {
    title: "Official sources control",
    body: "Regulatory content links back to IMO, IACS, and flag-state text. Plain-language explanations support understanding — they never replace it.",
  },
  {
    title: "Human review stays human",
    body: "Applicability, evidence sufficiency, risk acceptance, and release decisions remain with qualified, accountable people. The platform organizes their work; it does not replace their judgment.",
  },
  {
    title: "Evidence over assertion",
    body: "A finding is only as strong as the evidence trail behind it. The platform is built to preserve that trail by default, not as an afterthought.",
  },
  {
    title: "Built for fleets, not files",
    body: "Every design decision is tested against what changes when a fleet is ten vessels rather than one — because that's where informal processes usually break first.",
  },
];

const boundaries = [
  {
    title: "What CertaMaris does",
    body: "Structures requirements, scope, evidence, findings, corrective actions, readiness packages, and governance reporting into one controlled product record.",
  },
  {
    title: "What CertaMaris does not do",
    body: "It does not replace qualified reviewers, classification societies, flag states, auditors, legal counsel, or accountable maritime personnel.",
  },
  {
    title: "How claims are handled",
    body: "The public website avoids unsupported customer, certification, pricing, audit-pass, or regulator-approval claims. Product proof is tied to inspectable workflow screens.",
  },
];

const proofStandards = [
  "Sanitized product screenshots must support a specific workflow claim.",
  "Operational labels are preferred over fake names, fake customers, or fake metrics.",
  "Evidence, findings, corrective actions, and governance views remain connected to regulatory boundaries.",
  "Public explanations stay subordinate to official IMO, IACS, flag-state, and classification-society text.",
];

const companyFacts = [
  {
    title: "What we are",
    body: "Maritime cyber compliance and assurance software for fleet-scale operators.",
  },
  {
    title: "How we operate",
    body: "A product company with sales-assisted onboarding. Not a classification society. Not legal counsel.",
  },
  {
    title: "Who we serve",
    body: (
      <>
        Ship owners, DPAs and technical managers, and maritime cyber IT/OT teams. See{" "}
        <Link href="/industries" className="font-medium text-ocean hover:underline">
          Industries
        </Link>{" "}
        for how each seat uses the same underlying record.
      </>
    ),
  },
  {
    title: "Product status",
    body: (
      <>
        The live application is at{" "}
        <a
          href={APP_SIGN_IN_URL}
          className="font-medium text-ocean hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          app.certamaris.com
        </a>{" "}
        (sign-in for customers). This public site is for education and readiness intake via{" "}
        <Link href="/contact" className="font-medium text-ocean hover:underline">
          Contact
        </Link>
        .
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Maritime cyber compliance and assurance software for fleet-scale operators."
        intro="CertaMaris exists because cyber-risk compliance in the maritime sector was being managed with tools built for neither ships nor software — general-purpose document storage stretched past its limits."
      />

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Company</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            Who we are, stated carefully.
          </h2>
          <p className="mt-4 text-[15.5px] text-structural leading-relaxed">
            Public company detail stays limited to what we can stand behind with the same precision as the
            platform&apos;s regulatory boundaries.
          </p>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-5" stagger={0.05}>
          {companyFacts.map((item) => (
            <div key={item.title} className="premium-card p-6">
              <h3 className="text-[16.5px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[14.5px] text-structural leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section surface="paper">
        <div className="grid lg:grid-cols-2 gap-14">
          <Reveal>
            <Eyebrow>Why CertaMaris</Eyebrow>
            <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-5">
              Maritime operations and regulatory technology, combined deliberately.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-4">
              CertaMaris was built around a specific gap: IMO cyber-risk management and IACS UR E26/E27 introduced
              real operational requirements, but the tools available to demonstrate compliance with them were
              general-purpose file storage and spreadsheets — adequate for a handful of vessels, unworkable at
              fleet scale.
            </p>
            <p className="text-[15.5px] text-structural leading-relaxed">
              The platform is built around maritime operating reality first: how technical managers, DPAs, and
              vessel crews actually work, and what a surveyor actually needs to see — not a generic compliance
              framework retrofitted with maritime terminology.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Eyebrow>Operating credibility</Eyebrow>
            <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-5">Grounded in maritime operations.</h2>
            <p className="text-[15.5px] text-structural leading-relaxed">
              CertaMaris&apos;s product direction is informed by hands-on U.S. merchant-marine deck operations and formal
              marine transportation training, not a purely software-first read of maritime regulation. The public
              site keeps personal biographies and corporate particulars limited until they can be stated with the
              same precision as the platform&apos;s regulatory boundaries.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>How we build</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Four principles that don&apos;t change.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-5" stagger={0.06}>
          {principles.map((item) => (
            <div key={item.title} className="premium-card p-6">
              <h3 className="text-[16.5px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 items-start">
          <Reveal>
            <Eyebrow>Trust boundaries</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-4">
              Credibility comes from saying the boundary clearly.
            </h2>
            <p className="text-[15px] text-structural leading-relaxed">
              CertaMaris is designed to make maritime cyber-compliance work easier to inspect and maintain. It is not
              designed to blur who makes the regulated decision or who controls the official requirement.
            </p>
          </Reveal>
          <RevealGroup className="grid gap-5" stagger={0.05}>
            {boundaries.map((item) => (
              <div key={item.title} className="premium-card p-5">
                <h3 className="mb-1.5 text-[16px] font-semibold">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-structural">{item.body}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section spacing="compact">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
          <Reveal>
            <Eyebrow>How we communicate</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-4">
              The marketing proof follows the same standard as the product.
            </h2>
            <p className="text-[15px] text-structural leading-relaxed">
              Public claims are constrained on purpose. We would rather under-state than invent customers, headcount,
              certifications, or outcomes we cannot inspect.
            </p>
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-1 gap-4" stagger={0.05}>
            {proofStandards.map((standard) => (
              <div key={standard} className="premium-card flex gap-3 p-4">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ocean" />
                <p className="text-[14px] leading-relaxed text-navy/85">{standard}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section surface="navy">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-xl">
            <div className="liquid-glass liquid-glass--dark lg-pad-lg">
              <h2 className="mb-3 text-[28px] leading-[1.14] text-white sm:text-[34px]">
                Let&apos;s talk about your fleet.
              </h2>
              <p className="mb-3 text-[15px] leading-relaxed text-white/78">
                We&apos;re happy to walk through how CertaMaris would map onto your current compliance state.
              </p>
              <p className="text-[14px] leading-relaxed text-white/72">
                Or email{" "}
                <a
                  href={`mailto:${APP_SALES_EMAIL}`}
                  className="text-white underline underline-offset-2 hover:text-white"
                >
                  {APP_SALES_EMAIL}
                </a>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="lg:self-center">
            <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
