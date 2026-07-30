import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Pricing",
  "CertaMaris pricing depends on fleet size, vessel count, evidence condition, and workflow scope.",
  "/pricing"
);

const factors = [
  { title: "Fleet size", body: "The number of vessels and facilities brought into scope." },
  { title: "Operational complexity", body: "Vessel types, flag states, and the number of technical managers or DPAs involved." },
  { title: "Evidence condition", body: "Whether existing assessment and plan work can be ingested, or needs to be built from scratch." },
  { title: "Required fieldwork", body: "Whether onboarding includes on-site or remote assessment support." },
  { title: "Review depth", body: "The level of ongoing regulatory intelligence and audit-readiness support required." },
];

const engagementSignals = [
  "You need one controlled record across more than a few vessels.",
  "A requirement change creates manual file review across vessel folders.",
  "Evidence exists, but freshness, ownership, and reviewer decisions are hard to prove.",
  "Findings and corrective actions need independent verification before closure.",
  "Leadership needs a governance view tied back to the operational record.",
];

const engagementPath = [
  { title: "1. Readiness request", body: "You send fleet scope, primary need, and planning horizon through the contact flow or direct email." },
  { title: "2. Focused conversation", body: "The discussion stays on current state, evidence condition, review pressure, and the workflows that need structure." },
  { title: "3. Scoped proposal", body: "If there is a fit, pricing is scoped around vessels, onboarding work, review depth, and customer-specific terms." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Pricing"
        title="Priced to fleet size and scope — not a one-size list price."
        intro="Maritime fleets vary too much in size, vessel type, and existing compliance maturity for a fixed public price list to be meaningful. We scope every engagement individually."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <Eyebrow>How pricing works</Eyebrow>
            <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-5">Five factors shape every quote.</h2>
            <div className="space-y-5">
              {factors.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[15.5px] font-semibold mb-1">{item.title}</h3>
                  <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="premium-card p-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean mb-3">Scope a proposal</p>
              <h3 className="text-[22px] font-semibold mb-3">Tell us about your fleet.</h3>
              <p className="text-[14.5px] text-structural leading-relaxed mb-6">
                A readiness request gives CertaMaris the minimum context needed to discuss whether the platform fits
                your fleet and what scope would need to be priced.
              </p>
              <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr] gap-14 items-start">
          <Reveal>
            <Eyebrow>When to engage</Eyebrow>
            <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-5">
              Pricing makes sense once the operating problem is specific.
            </h2>
            <p className="text-[15px] text-structural leading-relaxed">
              CertaMaris is not priced like a self-serve document tool. The commercial model depends on the controlled
              workflows, evidence condition, and fleet scope that need to become part of the assurance record.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="space-y-3">
              {engagementSignals.map((signal) => (
                <li key={signal} className="premium-card flex gap-3 p-4 text-[14.5px] leading-relaxed text-navy/85">
                  <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ocean" />
                  {signal}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Engagement path</Eyebrow>
          <h2 className="text-[27px] sm:text-[32px] leading-[1.16]">From inquiry to priced scope.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {engagementPath.map((step) => (
            <Reveal key={step.title}>
              <div className="premium-card h-full p-6">
                <h3 className="mb-2 text-[16px] font-semibold">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-structural">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
