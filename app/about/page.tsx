import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "CertaMaris builds maritime cyber compliance and assurance software grounded in operational maritime experience.",
  "/about"
);

const principles = [
  { title: "Official sources control", body: "Regulatory content links back to IMO, IACS, and flag-state text. Plain-language explanations support understanding — they never replace it." },
  { title: "Human review stays human", body: "Applicability, evidence sufficiency, risk acceptance, and release decisions remain with qualified, accountable people. The platform organizes their work; it does not replace their judgment." },
  { title: "Evidence over assertion", body: "A finding is only as strong as the evidence trail behind it. The platform is built to preserve that trail by default, not as an afterthought." },
  { title: "Built for fleets, not files", body: "Every design decision is tested against what changes when a fleet is ten vessels rather than one — because that's where informal processes usually break first." },
];

const boundaries = [
  { title: "What CertaMaris does", body: "Structures requirements, scope, evidence, findings, corrective actions, readiness packages, and governance reporting into one controlled product record." },
  { title: "What CertaMaris does not do", body: "It does not replace qualified reviewers, classification societies, flag states, auditors, legal counsel, or accountable maritime personnel." },
  { title: "How claims are handled", body: "The public website avoids unsupported customer, certification, pricing, audit-pass, or regulator-approval claims. Product proof is tied to inspectable workflow screens." },
];

const proofStandards = [
  "Sanitized product screenshots must support a specific workflow claim.",
  "Operational labels are preferred over fake names, fake customers, or fake metrics.",
  "Evidence, findings, corrective actions, and governance views remain connected to regulatory boundaries.",
  "Public explanations stay subordinate to official IMO, IACS, flag-state, and classification-society text.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Maritime compliance software built by people who understand vessels, not just software."
        intro="CertaMaris exists because cyber-risk compliance in the maritime sector was being managed with tools built for neither ships nor software — general-purpose document storage stretched past its limits."
      />

      <Section>
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
              CertaMaris's product direction is informed by hands-on U.S. merchant-marine deck operations and formal
              marine transportation training, not a purely software-first read of maritime regulation. The public
              site keeps personal biographies and corporate particulars limited until they can be stated with the
              same precision as the platform's regulatory boundaries.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>How we build</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Four principles that don&apos;t change.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-5" stagger={0.06}>
          {principles.map((item) => (
            <div key={item.title} className="border rounded-sm p-6 bg-white" style={{ borderColor: "var(--hairline)" }}>
              <h3 className="text-[16.5px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section spacing="compact">
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
              <div key={item.title} className="rounded-sm border bg-paper p-5" style={{ borderColor: "var(--hairline)" }}>
                <h3 className="mb-1.5 text-[16px] font-semibold">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-structural">{item.body}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Proof discipline</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            The marketing proof follows the same standard as the product.
          </h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-4" stagger={0.05}>
          {proofStandards.map((standard) => (
            <div key={standard} className="flex gap-3 rounded-sm border bg-white p-4" style={{ borderColor: "var(--hairline)" }}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ocean" />
              <p className="text-[14px] leading-relaxed text-navy/85">{standard}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section surface="navy">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <Reveal className="max-w-xl">
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] text-white mb-3">Let&apos;s talk about your fleet.</h2>
            <p className="text-[15px] text-white/70 leading-relaxed">
              We're happy to walk through how CertaMaris would map onto your current compliance state.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
