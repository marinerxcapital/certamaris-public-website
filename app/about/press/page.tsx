import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { pressContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Press",
  "Press and media inquiries for CertaMaris. Contact the team with outlet, deadline, and topic.",
  "/about/press"
);

export default function PressPage() {
  return (
    <>
      <PageHero eyebrow={pressContent.eyebrow} title={pressContent.title} intro={pressContent.intro} />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Press" },
          ]}
        />

        <Reveal className="max-w-3xl">
          <Eyebrow>Media contact</Eyebrow>
          <h2 className="text-[24px] leading-[1.16] mb-4">Press inquiries</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-4">{pressContent.body}</p>
          <p className="text-[15px] text-structural leading-relaxed mb-6">{pressContent.brandNote}</p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button href={pressContent.contactHref}>Contact</Button>
            <Button href="/about" variant="secondary">
              Back to About
            </Button>
          </div>
          <p className="text-[14px] text-structural">
            Email{" "}
            <a href={`mailto:${pressContent.salesEmail}`} className="font-medium text-ocean hover:underline">
              {pressContent.salesEmail}
            </a>{" "}
            with subject line indicating a press inquiry.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
