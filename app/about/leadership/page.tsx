import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { leadershipContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Leadership",
  "CertaMaris publishes leadership biographies only when verified for public release. Details are available during qualified procurement.",
  "/about/leadership"
);

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow={leadershipContent.eyebrow}
        title={leadershipContent.title}
        intro={leadershipContent.intro}
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Leadership" },
          ]}
        />

        <Reveal className="max-w-3xl">
          <Eyebrow>Public listing</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">No unverified biographies</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-4">{leadershipContent.body}</p>
          <p className="text-[15px] text-structural leading-relaxed mb-8">{leadershipContent.procurementNote}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={leadershipContent.contactHref}>Request during procurement</Button>
            <Button href="/about" variant="secondary">
              Back to About
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
