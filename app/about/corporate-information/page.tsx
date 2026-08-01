import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { corporateInformationContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Corporate Information",
  "Verified public corporate information and official contact channels for CertaMaris, with procurement access to additional records.",
  "/about/corporate-information"
);

export default function CorporateInformationPage() {
  return (
    <>
      <PageHero
        eyebrow={corporateInformationContent.eyebrow}
        title={corporateInformationContent.title}
        intro={corporateInformationContent.intro}
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Corporate information" },
          ]}
        />

        <Reveal className="max-w-3xl mb-10">
          <Eyebrow>Published facts</Eyebrow>
          <h2 className="text-[24px] leading-[1.16] mb-6">What we can state publicly</h2>
          <dl className="space-y-4">
            {corporateInformationContent.published.map((row) => (
              <div
                key={row.label}
                className="premium-card grid sm:grid-cols-[12rem_1fr] gap-2 sm:gap-6 p-5"
              >
                <dt className="text-[13px] font-mono uppercase tracking-[0.08em] text-ocean">{row.label}</dt>
                <dd className="text-[15px] text-navy/90 break-all">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="max-w-3xl">
          <Eyebrow>Not published here</Eyebrow>
          <p className="text-[15px] text-structural leading-relaxed mb-6">
            {corporateInformationContent.omittedNote}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[14.5px]">
            {corporateInformationContent.related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-medium text-ocean hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
