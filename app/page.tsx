import Link from "next/link";
import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";
import { Button } from "@/components/Button";
import { FounderPortrait } from "@/components/FounderPortrait";
import { HomeCapabilityBand } from "@/components/HomeCapabilityBand";
import { HomeHero } from "@/components/HomeHero";
import { HomeSampleRecord } from "@/components/HomeSampleRecord";
import { PricingPackageCard } from "@/components/PricingPackageCard";
import { ProductCinematicMoment } from "@/components/ProductCinematicMoment";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { APP_SIGN_IN_URL } from "@/lib/constants";
import { packageTiers, pricingTiers } from "@/lib/faq-pricing";

const trustDiligenceLinks: [string, string][] = [
  ["/security", "Security"],
  ["/trust", "Trust Center"],
  ["/trust/procurement", "Procurement"],
  ["#buyer-diligence", "Buyer diligence"],
  ["/pricing", "Pricing"],
  ["/trust/assurance-model", "Assurance model"],
  ["/trust/ai-policy", "AI policy"],
  ["/legal/privacy", "Privacy"],
];

export default function HomePage() {
  const priceFor = (name: string) =>
    pricingTiers.find((tier) => name.toLowerCase().includes(tier.name.toLowerCase()));

  return (
    <>
      <HomeHero />

      <Section id="capabilities" surface="paper" spacing="major">
        <Reveal>
          <HomeCapabilityBand />
        </Reveal>
      </Section>

      <HomeSampleRecord />

      <Section id="product-moment" spacing="major">
        <Reveal>
          <ProductCinematicMoment />
        </Reveal>
      </Section>

      <Section id="before-after" surface="paper" spacing="major">
        <Reveal className="mb-10 max-w-3xl">
          <Eyebrow>Before / with</Eyebrow>
          <h2 className="section-h2 section-h2--lg">
            Keep the work you already do — connect the record so it survives review.
          </h2>
        </Reveal>
        <Reveal>
          <BeforeAfterComparison />
        </Reveal>
        <p className="mt-8 text-[14px] text-structural">
          See the full comparison on{" "}
          <Link href="/why-certamaris" className="font-semibold text-ocean hover:underline">
            Why CertaMaris
          </Link>
          , or browse roles on{" "}
          <Link href="/who-we-serve" className="font-semibold text-ocean hover:underline">
            Who we serve
          </Link>
          .
        </p>
      </Section>

      <Section id="buyer-diligence" spacing="major">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <Eyebrow>Trust &amp; security</Eyebrow>
            <h2 className="section-h2">Security, diligence, and procurement — one packet.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-structural">
              Review public controls, pricing context, assurance boundaries, AI policy, and legal routes before
              the demo. No invented certifications.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {trustDiligenceLinks.map(([href, label]) => (
                <Link key={href} href={href} className="text-[14px] font-semibold text-ocean hover:underline">
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact?intent=procurement">Request procurement materials</Button>
              <Button href="/contact?intent=demo" variant="secondary">
                Request a demo
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="section-h2">Core, Assurance, and Enterprise — honest packages.</h2>
            <div className="mt-5 grid gap-4">
              {packageTiers.map((pkg) => (
                <PricingPackageCard
                  key={pkg.id}
                  pkg={pkg}
                  pricing={priceFor(pkg.name)}
                  ctaLabel="Request quote"
                  ctaHref="/contact?intent=sales"
                />
              ))}
            </div>
            <Link href="/pricing" className="mt-5 inline-block text-[14px] font-semibold text-ocean hover:underline">
              Full pricing and package comparison
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section spacing="major">
        <Reveal className="mx-auto max-w-3xl">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
            <FounderPortrait size="sm" className="mx-auto sm:mx-0" />
            <div>
              <Eyebrow>From the founder</Eyebrow>
              <h2 className="section-h2">Why I built this.</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-structural">
                From the deck side — Third Mate, Unlimited Tonnage, Oceans — I watched cyber compliance break when
                requirements, proof, and ownership lived in different places. CertaMaris keeps that chain connected
                through to a package you can hand over.
              </p>
              <p className="mt-4 text-[15px] font-semibold text-navy">Skyler Brown</p>
              <Link
                href="/about/leadership"
                className="mt-2 inline-block text-[14px] font-semibold text-ocean hover:underline"
              >
                Full profile
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section spacing="major" surface="paper">
        <div className="final-cta-grid">
          <Reveal className="max-w-2xl">
            <div className="rounded-lg border border-navy/12 bg-white p-6 shadow-card sm:p-8">
              <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ocean">Request a demo</p>
              <h2 className="section-h2 section-h2--lg mb-4">
                Request a focused conversation on readiness across your fleet.
              </h2>
              <p className="max-w-xl text-[15.5px] leading-relaxed text-structural">
                Tell us about fleet scope, evidence condition, and open findings. This is a request form — not a
                calendar booking — so we can prepare a useful demo.
              </p>
            </div>
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
