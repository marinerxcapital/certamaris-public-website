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
