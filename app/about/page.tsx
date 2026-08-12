import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FounderJsonLd } from "@/components/FounderJsonLd";
import { LeadershipGrid } from "@/components/LeadershipGrid";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import {
  APP_SIGN_IN_URL,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
  SIGN_IN_LABEL,
} from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { aboutContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "About CertaMaris",
  "CertaMaris is maritime cyber compliance software connecting company, fleet, and vessel requirements, evidence, findings, and readiness reporting.",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <FounderJsonLd variant="about" />

      <PageHero eyebrow={aboutContent.eyebrow} title={aboutContent.title} intro={aboutContent.intro} />

      {/* 1–2. Why CertaMaris exists */}
      <Section spacing="compact">
        <Reveal className="max-w-3xl">
          <Eyebrow>{aboutContent.whyExists.eyebrow}</Eyebrow>
          <h2 className="section-h2 section-h2--lg mb-5">{aboutContent.whyExists.title}</h2>
          <p className="text-[15.5px] text-structural leading-relaxed mb-4">{aboutContent.whyExists.body}</p>
          <p className="text-[15.5px] text-structural leading-relaxed">{aboutContent.mission}</p>
        </Reveal>
      </Section>

      {/* 3. Company / fleet / vessel model */}
      <Section surface="paper">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>{aboutContent.operatingModel.eyebrow}</Eyebrow>
          <h2 className="section-h2 section-h2--lg mb-4">
            {aboutContent.operatingModel.title}
          </h2>
          <p className="text-[15.5px] text-structural leading-relaxed">{aboutContent.operatingModel.intro}</p>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-3 gap-5" stagger={0.05}>
          {aboutContent.operatingModel.levels.map((level) => (
            <div key={level.title} className="premium-card p-6">
              <h3 className="text-[16.5px] font-semibold mb-2">{level.title}</h3>
              <p className="text-[14.5px] text-structural leading-relaxed">{level.body}</p>
            </div>
          ))}
        </RevealGroup>
        <Reveal className="mt-8">
          <Link href="/platform" className="text-[14px] font-semibold text-ocean hover:underline">
            View platform hierarchy
          </Link>
        </Reveal>
      </Section>

      {/* 4. Leadership */}
      <Section id="founder">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Leadership</Eyebrow>
          <h2 className="section-h2 section-h2--lg mb-4">Leadership</h2>
          <p className="text-[15.5px] text-structural leading-relaxed">
            CertaMaris is founder-led. Additional executive profiles will be published as roles and individuals are confirmed.
          </p>
        </Reveal>
        <LeadershipGrid />
      </Section>

      {/* 5. Product philosophy */}
      <Section surface="paper">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Product philosophy</Eyebrow>
          <h2 className="section-h2 section-h2--lg">How CertaMaris is built to behave.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-5" stagger={0.06}>
          {aboutContent.philosophy.map((item) => (
            <div key={item.title} className="premium-card p-6">
              <h3 className="text-[16.5px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      {/* 6. What CertaMaris does not replace */}
      <Section spacing="compact">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
          <Reveal>
            <Eyebrow>{aboutContent.doesNotReplace.eyebrow}</Eyebrow>
            <h2 className="section-h2 section-h2--lg mb-4">
              {aboutContent.doesNotReplace.title}
            </h2>
            <p className="text-[15px] text-structural leading-relaxed">{aboutContent.doesNotReplace.intro}</p>
          </Reveal>
          <RevealGroup className="grid gap-4" stagger={0.05}>
            {aboutContent.doesNotReplace.items.map((item) => (
              <div key={item.title} className="premium-card p-5">
                <h3 className="mb-1.5 text-[16px] font-semibold">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-structural">{item.body}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Related company pages */}
      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Company pages</Eyebrow>
          <h2 className="text-[26px] leading-[1.14]">Corporate, leadership, partners, careers, and press.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.04}>
          {aboutContent.relatedLinks.map((link) => (
            <Link key={link.href} href={link.href} className="premium-card p-5 block hover:border-ocean/30">
              <h3 className="text-[15.5px] font-semibold mb-1.5">{link.title}</h3>
              <p className="text-[13.5px] text-structural leading-relaxed">{link.description}</p>
            </Link>
          ))}
        </RevealGroup>
      </Section>

      {/* 7. CTAs */}
      <Section spacing="tight">
        <Reveal className="flex flex-wrap gap-3 mb-2">
          <Button href={PRIMARY_CTA_HREF}>{PRIMARY_CTA_LABEL}</Button>
          <Button href={SECONDARY_CTA_HREF} variant="secondary">
            {SECONDARY_CTA_LABEL}
          </Button>
          <Button href={APP_SIGN_IN_URL} variant="ghost" external>
            {SIGN_IN_LABEL}
          </Button>
        </Reveal>
      </Section>

      <CtaBand
        title="See how CertaMaris maps to your fleet."
        description="Request a demo for a readiness walkthrough, explore the platform hierarchy, or sign in if you already have access."
        primary={{ label: "Request a demo", href: "/contact?intent=demo", variant: "primary" }}
        secondary={{ label: "View platform", href: "/platform", variant: "secondary" }}
        tertiary={{ label: SIGN_IN_LABEL, href: APP_SIGN_IN_URL, external: true, variant: "ghost" }}
      />
    </>
  );
}
