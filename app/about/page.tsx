import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { APP_SALES_EMAIL, APP_SIGN_IN_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { aboutContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "About",
  "CertaMaris builds maritime cyber compliance and continuous assurance software for fleet-scale operators.",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutContent.eyebrow} title={aboutContent.title} intro={aboutContent.intro} />

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Company</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Who we are, stated carefully.</h2>
          <p className="mt-4 text-[15.5px] text-structural leading-relaxed">
            Public company detail stays limited to what we can stand behind with the same precision as the
            platform&apos;s regulatory boundaries.
          </p>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-5" stagger={0.05}>
          {aboutContent.companyFacts.map((item) => (
            <div key={item.title} className="premium-card p-6">
              <h3 className="text-[16.5px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[14.5px] text-structural leading-relaxed">
                {item.title === "Who we serve" ? (
                  <>
                    {item.body} See{" "}
                    <Link href="/industries" className="font-medium text-ocean hover:underline">
                      Industries
                    </Link>{" "}
                    for how each seat uses the same underlying record.
                  </>
                ) : item.title === "Product status" ? (
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
                    (sign-in for customers). This public site is for education, trust information, and readiness intake
                    via{" "}
                    <Link href="/contact" className="font-medium text-ocean hover:underline">
                      Contact
                    </Link>
                    .
                  </>
                ) : (
                  item.body
                )}
              </p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section surface="paper">
        <div className="grid lg:grid-cols-2 gap-14">
          <Reveal>
            <Eyebrow>Mission</Eyebrow>
            <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-5">
              A controlled record for maritime cyber compliance work.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-4">{aboutContent.mission}</p>
            <p className="text-[15.5px] text-structural leading-relaxed">{aboutContent.problem}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <Eyebrow>Maturity</Eyebrow>
            <h2 className="text-[27px] sm:text-[32px] leading-[1.16] mb-5">Production platform, careful public claims.</h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-4">{aboutContent.maturity}</p>
            <p className="text-[15.5px] text-structural leading-relaxed">{aboutContent.operatingCredibility}</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>How we build</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Product philosophy that does not change.</h2>
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
            {aboutContent.boundaries.map((item) => (
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
            {aboutContent.proofStandards.map((standard) => (
              <div key={standard} className="premium-card flex gap-3 p-4">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ocean" />
                <p className="text-[14px] leading-relaxed text-navy/85">{standard}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>

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

      <CtaBand
        title="Let's talk about your fleet."
        description={`We're happy to walk through how CertaMaris would map onto your current compliance state. Or email ${APP_SALES_EMAIL}.`}
      />
    </>
  );
}
