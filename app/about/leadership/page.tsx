import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FounderJsonLd } from "@/components/FounderJsonLd";
import { FounderPortrait } from "@/components/FounderPortrait";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import {
  FOUNDER_CREDENTIALS,
  FOUNDER_EMAIL,
  FOUNDER_FULL_BIO,
  FOUNDER_IMAGE,
  FOUNDER_NAME,
  FOUNDER_SHORT_BIO,
  FOUNDER_TITLE,
  FOUNDER_TITLE_LONG,
} from "@/lib/founder";
import { pageMetadata } from "@/lib/metadata";
import { leadershipContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Skyler Brown, Founder",
  FOUNDER_SHORT_BIO,
  "/about/leadership",
  {
    image: FOUNDER_IMAGE.src,
    keywords: ["Skyler Brown", "CertaMaris founder", "maritime cyber compliance leadership"],
  }
);

export default function LeadershipPage() {
  const bioParagraphs = FOUNDER_FULL_BIO.split("\n\n").filter(Boolean);

  return (
    <>
      <FounderJsonLd variant="leadership" />
      <PageHero
        eyebrow={leadershipContent.eyebrow}
        title={leadershipContent.title}
        intro={leadershipContent.intro}
        emphasis="elevated"
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-10"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Leadership" },
          ]}
        />

        {/* Single-founder editorial: portrait ~40% / biography ~60% on desktop */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14">
          <Reveal>
            <div className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none">
              <FounderPortrait
                size="lg"
                priority
                className="!w-full max-w-[22rem] shadow-[0_12px_40px_-20px_rgba(10,37,64,0.45)]"
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 85vw"
              />
              <div className="mt-3 text-center lg:text-left">
                <p className="text-[15px] font-semibold text-navy">{FOUNDER_NAME}</p>
                <p className="text-[13.5px] text-structural">{FOUNDER_TITLE_LONG}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="min-w-0">
            <Eyebrow>Founder</Eyebrow>
            <h2 className="mb-2 text-[28px] leading-[1.12] sm:text-[34px]">
              {FOUNDER_NAME}
            </h2>
            <p className="mb-6 text-[15px] font-medium text-ocean">
              {FOUNDER_TITLE}, CertaMaris
            </p>

            <div className="mb-8 space-y-4">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-[15.5px] leading-relaxed text-structural">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mb-8">
              <Eyebrow>Credentials</Eyebrow>
              <ul className="mt-1 flex flex-wrap gap-2" aria-label="Verified credentials">
                {FOUNDER_CREDENTIALS.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-navy/12 bg-white/80 px-3 py-2 text-[13px] font-medium text-navy/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              <Button href={leadershipContent.demoHref}>{leadershipContent.demoLabel}</Button>
              <Button href={leadershipContent.aboutHref} variant="secondary">
                About CertaMaris
              </Button>
            </div>

            <p className="text-[14px] text-structural">
              Professional contact:{" "}
              <a
                href={`mailto:${FOUNDER_EMAIL}`}
                className="font-medium text-ocean hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
              >
                {FOUNDER_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mx-auto max-w-3xl">
          <Eyebrow>Why CertaMaris</Eyebrow>
          <h2 className="mb-4 text-[26px] leading-[1.16] sm:text-[30px]">
            Built for fragmented compliance records.
          </h2>
          <p className="text-[15.5px] leading-relaxed text-structural">{leadershipContent.whyFounded}</p>
        </Reveal>
      </Section>

      <CtaBand
        eyebrow="Next step"
        title="See how CertaMaris structures maritime cyber compliance work."
        description="Request a readiness conversation, or read more about the company mission and product philosophy."
        primary={{ label: leadershipContent.demoLabel, href: leadershipContent.demoHref, variant: "primary" }}
        secondary={{ label: "About CertaMaris", href: leadershipContent.aboutHref, variant: "secondary" }}
        tertiary={false}
      />
    </>
  );
}
