import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { partnersContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Partners",
  "Partner and collaboration inquiries for CertaMaris, including technology, advisory, referral, and channel relationships.",
  "/about/partners"
);

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow={partnersContent.eyebrow} title={partnersContent.title} intro={partnersContent.intro} />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Partners" },
          ]}
        />

        <Reveal className="max-w-3xl">
          <Eyebrow>Directory</Eyebrow>
          <h2 className="text-[24px] leading-[1.16] mb-4">No public partner listings</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-6">{partnersContent.body}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button href={partnersContent.contactHref}>Contact about partnerships</Button>
            <Button href="/about" variant="secondary">
              Back to About
            </Button>
          </div>
          <p className="text-[14px] text-structural">
            Or email{" "}
            <a href={`mailto:${partnersContent.salesEmail}`} className="font-medium text-ocean hover:underline">
              {partnersContent.salesEmail}
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
