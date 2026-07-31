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

const packages = [
  {
    name: "Fleet Core",
    audience: "Software-led for smaller fleets",
    features: [
      "Platform access for the in-scope fleet",
      "Core workflows: requirements, controls, evidence, findings, and readiness",
      "Standard role-based access control",
    ],
  },
  {
    name: "Fleet Assurance",
    audience: "Multi-manager fleets",
    features: [
      "Everything in Fleet Core",
      "Deeper onboarding support during setup",
      "Greater mapping depth across vessels and managers",
      "Governance reporting for operational leadership",
    ],
  },
  {
    name: "Enterprise",
    audience: "Multi-org and procurement-led buyers",
    features: [
      "Everything in Fleet Assurance",
      "SSO and SCIM when configured for your environment",
      "Security review support for buyer diligence",
      "Custom contractual terms as agreed",
    ],
  },
];

const commercialModel = [
  {
    title: "Platform subscription",
    body: "Annual software access to the CertaMaris assurance record and the workflows scoped for your fleet. Subscription covers the product, not professional services hours.",
  },
  {
    title: "Optional services",
    body: "Onboarding, assessment support, and related fieldwork can be scoped separately when the fleet needs help standing up evidence, mappings, or first-cycle readiness. Services are optional and quoted against the work required.",
  },
];

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
  {
    title: "1. Readiness request",
    body: "Send fleet scope, primary need, and planning horizon through the contact flow or direct email. Access is sales-assisted — not a self-serve free trial.",
  },
  {
    title: "2. Focused conversation",
    body: "The discussion stays on current state, evidence condition, review pressure, and the workflows that need structure.",
  },
  {
    title: "3. Scoped proposal",
    body: "If there is a fit, pricing is scoped around vessels, onboarding work, review depth, package shape, and customer-specific terms.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Pricing"
        title="Priced to fleet size and scope — not a one-size list price."
        intro="Maritime fleets vary too much in size, vessel type, and existing compliance maturity for a fixed public price list to be meaningful. We scope every engagement individually and do not publish dollar list prices."
      />

      <Section>
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Package shapes</Eyebrow>
          <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-4">
            Three ways to structure the commercial engagement.
          </h2>
          <p className="text-[15px] text-structural leading-relaxed">
            Packages describe capability and support depth — not public list prices. Final scope still follows vessel
            count, evidence condition, and services depth.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 0.05}>
              <article className="premium-card flex h-full flex-col p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ocean mb-2">{pkg.audience}</p>
                <h3 className="text-[19px] font-semibold mb-4">{pkg.name}</h3>
                <ul className="space-y-2.5 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[14px] leading-relaxed text-structural">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <p className="text-[13.5px] text-structural leading-relaxed max-w-3xl">
            Pricing is scoped to vessel count, evidence condition, and services depth. Request a proposal.
          </p>
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <Eyebrow>Software vs services</Eyebrow>
            <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-5">
              Platform subscription and optional services are quoted separately.
            </h2>
            <p className="text-[15px] text-structural leading-relaxed">
              The commercial model keeps product access distinct from professional work. That avoids mixing annual
              software scope with one-time onboarding or assessment effort.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="space-y-4">
              {commercialModel.map((item) => (
                <div key={item.title} className="premium-card p-6">
                  <h3 className="text-[16px] font-semibold mb-2">{item.title}</h3>
                  <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

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
                your fleet and what scope would need to be priced. There is no free perpetual trial; access is arranged
                through a sales-assisted conversation.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
                <Button href="/security" variant="secondary">
                  Security &amp; trust
                </Button>
              </div>
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

      <Section surface="paper" spacing="compact">
        <Reveal>
          <div className="premium-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Next step</Eyebrow>
              <h2 className="text-[24px] sm:text-[28px] leading-[1.16] mb-3">Request a scoped proposal.</h2>
              <p className="text-[14.5px] text-structural leading-relaxed">
                Enterprise and multi-org buyers can review current security posture on the security page before
                engaging. All access is sales-assisted.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
              <Button href="/security" variant="secondary">
                Security &amp; trust
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
