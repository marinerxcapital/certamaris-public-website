import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { careersContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Careers",
  "CertaMaris careers — open roles are published only when available. No open roles are listed at this time.",
  "/about/careers"
);

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow={careersContent.eyebrow} title={careersContent.title} intro={careersContent.intro} />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Careers" },
          ]}
        />

        <Reveal className="max-w-3xl">
          <Eyebrow>Open roles</Eyebrow>
          <h2 className="text-[24px] leading-[1.16] mb-4">{careersContent.status}</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-6">{careersContent.body}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button href={careersContent.contactHref}>Contact</Button>
            <Button href="/about" variant="secondary">
              Back to About
            </Button>
          </div>
          <p className="text-[14px] text-structural">
            Routing channel:{" "}
            <a href={`mailto:${careersContent.salesEmail}`} className="font-medium text-ocean hover:underline">
              {careersContent.salesEmail}
            </a>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
