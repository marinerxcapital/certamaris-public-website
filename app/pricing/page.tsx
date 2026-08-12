import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { PackageRecommender } from "@/components/PackageRecommender";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import {
  packageTiers,
  pricingComparisonRows,
  pricingTiers,
  PRICE_ANCHORS,
  PRICING_BASIS_NOTE,
  type ComparisonValue,
} from "@/lib/faq-pricing";
import { pageMetadata } from "@/lib/metadata";
import { REGULATORY_LAST_REVIEWED } from "@/lib/regulatory";

export const metadata = pageMetadata(
  "Pricing",
  "Annual platform-plus-contracted-vessel pricing for Core, Assurance, and Enterprise, plus separately priced remote and on-board assurance engagements.",
  "/pricing"
);

function formatReviewDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

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
  {
    title: "Operational complexity",
    body: "Vessel types, flag states, and the number of technical managers or DPAs involved.",
  },
  {
    title: "Evidence condition",
    body: "Whether existing assessment and plan work can be ingested, or needs to be built from scratch.",
  },
  {
    title: "Required fieldwork",
    body: "Whether onboarding includes on-site or remote assessment support.",
  },
  {
    title: "Review depth",
    body: "The level of ongoing regulatory intelligence and audit-readiness support required.",
  },
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

function formatComparisonValue(value: ComparisonValue): string {
  switch (value) {
    case "included":
      return "Included";
    case "limited":
      return "Limited";
    case "add-on":
      return "Add-on / scoped";
    case "scoped":
      return "Scoped";
    case "planned":
      return "Planned";
    case "not-included":
      return "—";
    default:
      return value;
  }
}

export default function PricingPage() {
  const priceFor = (name: string) =>
    pricingTiers.find((tier) => name.toLowerCase().includes(tier.name.toLowerCase()));
  const reviewedLabel = formatReviewDate(REGULATORY_LAST_REVIEWED);

  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Pricing"
        title="Annual platform pricing, published."
        intro="CertaMaris pricing is a hybrid annual model: a platform fee plus contracted-vessel licensing, with separately priced assurance engagements. Vessel count is the recurring value metric — there is no per-seat charge."
      />

      <Section>
        <Reveal className="max-w-2xl mb-10">
          <p className="text-[13px] font-mono text-structural mb-6">Last reviewed: {reviewedLabel}</p>
          <Eyebrow>Package shapes</Eyebrow>
          <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-4">
            Three ways to structure the commercial engagement.
          </h2>
          <p className="text-[15px] text-structural leading-relaxed">{PRICING_BASIS_NOTE}</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {packageTiers.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 0.05}>
              <article className="premium-card flex h-full flex-col p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ocean mb-2">{pkg.audience}</p>
                <h3 className="text-[19px] font-semibold mb-2">{pkg.name}</h3>
                <p className="text-[13.5px] text-structural leading-relaxed mb-4">{pkg.summary}</p>
                {priceFor(pkg.name) ? (
                  <div className="mb-4 border-t border-navy/8 pt-3">
                    <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean">
                      {priceFor(pkg.name)!.platformFee} + {priceFor(pkg.name)!.vesselPrice}
                    </p>
                    <p className="mt-1 text-[12.5px] text-structural">{priceFor(pkg.name)!.minimumNote}</p>
                  </div>
                ) : null}
                <ul className="space-y-2.5 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[14px] leading-relaxed text-structural">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Button href={`/contact?intent=sales`} variant="secondary" className="w-full">
                    Request quote
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <p className="text-[13.5px] text-structural leading-relaxed max-w-3xl">
            The tier above sets the annual platform fee and per-vessel license. Assurance engagements are priced
            separately — see the published anchors below.
          </p>
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Published annual pricing</Eyebrow>
          <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-4">
            Platform fee plus contracted-vessel licensing.
          </h2>
          <p className="text-[15px] text-structural leading-relaxed">
            Every subscription is an annual platform fee with a per-vessel license for the billable fleet count.
            There is no per-seat pricing, and assurance engagements are priced separately.
          </p>
        </Reveal>
        <Reveal>
          <div className="overflow-x-auto rounded-md border border-navy/10 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean">
            <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px]">
              <caption className="sr-only">CertaMaris annual pricing tiers</caption>
              <thead>
                <tr className="border-b border-navy/10 bg-paper">
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Tier
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Fleet gate
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Platform fee
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Per vessel
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Minimum
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers.map((tier) => (
                  <tr key={tier.id} className="border-b border-navy/8 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-navy align-top">
                      {tier.name}
                    </th>
                    <td className="px-4 py-3 text-structural align-top">{tier.fleetGate}</td>
                    <td className="px-4 py-3 text-structural align-top">{tier.platformFee}</td>
                    <td className="px-4 py-3 text-structural align-top">{tier.vesselPrice}</td>
                    <td className="px-4 py-3 text-structural align-top">{tier.minimumNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal className="mt-8">
          <div className="premium-card p-6">
            <h3 className="text-[16px] font-semibold mb-3">Price anchors</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {PRICE_ANCHORS.map((anchor) => (
                <li key={anchor.label} className="flex gap-2.5 text-[14px] leading-relaxed text-structural">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                  <span>
                    <strong className="font-medium text-navy">{anchor.label}:</strong> {anchor.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] text-structural leading-relaxed">
              A QA-reviewed report is a CertaMaris quality and assurance review — not certification, class approval,
              legal advice, or a guarantee of regulatory compliance. Prices are USD and exclude taxes, travel, and
              expenses. Contract terms are 12-month, non-cancelable commitments billed annually in advance. Review
              how CertaMaris handles AI providers and data classification in the{" "}
              <a href="/trust/ai-policy" className="font-medium text-ocean hover:underline">
                AI Provider &amp; Data Classification Policy
              </a>
              .
            </p>
          </div>
        </Reveal>
      </Section>

      <Section id="package-comparison" surface="paper">
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Comparison</Eyebrow>
          <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-4">Capability matrix by package.</h2>
          <p className="text-[15px] text-structural leading-relaxed">
            Compare vessel scope, users, entities, portals, assessments, evidence, plans, reports, continuous
            assurance, integrations, API, SSO, SCIM, support, onboarding, retention, audit history, and professional
            services. Values describe depth — not list prices.
          </p>
        </Reveal>
        <Reveal>
          <p id="package-comparison-instructions" className="sr-only">
            This comparison scrolls horizontally on smaller screens. Focus the table region and use the arrow keys to
            review every package column.
          </p>
          <div
            className="overflow-x-auto rounded-md border border-navy/10 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            tabIndex={0}
            role="region"
            aria-label="Package capability comparison"
            aria-describedby="package-comparison-instructions"
          >
            <table className="w-full min-w-[720px] border-collapse text-left text-[13.5px]">
              <caption className="sr-only">
                Feature comparison across Fleet Core, Fleet Assurance, and Enterprise packages
              </caption>
              <thead>
                <tr className="border-b border-navy/10 bg-paper">
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Fleet Core
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Fleet Assurance
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-navy">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingComparisonRows.map((row) => (
                  <tr key={row.key} className="border-b border-navy/8 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-navy align-top">
                      {row.feature}
                    </th>
                    <td className="px-4 py-3 text-structural align-top">
                      {formatComparisonValue(row.fleetCore)}
                    </td>
                    <td className="px-4 py-3 text-structural align-top">
                      {formatComparisonValue(row.fleetAssurance)}
                    </td>
                    <td className="px-4 py-3 text-structural align-top">
                      {formatComparisonValue(row.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12.5px] text-structural leading-relaxed max-w-3xl">{PRICING_BASIS_NOTE}</p>
        </Reveal>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
          <Reveal>
            <PackageRecommender />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="premium-card p-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean mb-3">Scope a proposal</p>
              <h3 className="text-[22px] font-semibold mb-3">Tell us about your fleet.</h3>
              <p className="text-[14.5px] text-structural leading-relaxed mb-6">
                A readiness request gives CertaMaris the minimum context needed to discuss whether the platform fits
                your fleet and what scope would need to be priced. There is no free perpetual trial; access is arranged
                through a sales-assisted conversation.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact?intent=demo">{PRIMARY_CTA_LABEL}</Button>
                <Button href="/demo" variant="secondary">
                  Product demo tour
                </Button>
                <Button href="/security" variant="ghost">
                  Security &amp; trust
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
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

      <Section surface="paper" spacing="compact">
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

      <Section spacing="compact">
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
              <Button href="/contact?intent=demo">{PRIMARY_CTA_LABEL}</Button>
              <Button href="/contact?intent=procurement" variant="secondary">
                Procurement path
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
