import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { responsibleDisclosureContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Responsible Disclosure",
  "Report security issues affecting CertaMaris products or websites to security@certamaris.com.",
  "/trust/responsible-disclosure"
);

export default function ResponsibleDisclosurePage() {
  return (
    <>
      <PageHero
        eyebrow={responsibleDisclosureContent.eyebrow}
        title={responsibleDisclosureContent.title}
        intro={responsibleDisclosureContent.intro}
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Trust Center", href: "/trust" },
            { label: "Responsible disclosure" },
          ]}
        />

        <Reveal className="max-w-3xl mb-10">
          <Eyebrow>Report</Eyebrow>
          <h2 className="text-[24px] leading-[1.16] mb-3">Security contact</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-3">
            Email{" "}
            <a
              href={`mailto:${responsibleDisclosureContent.contactEmail}?subject=Security%20vulnerability%20report`}
              className="font-medium text-ocean hover:underline"
            >
              {responsibleDisclosureContent.contactEmail}
            </a>
            .
          </p>
          <p className="text-[14px] text-structural leading-relaxed">{responsibleDisclosureContent.noPgpNote}</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl">
          <Reveal>
            <Eyebrow>Expectations</Eyebrow>
            <h2 className="text-[22px] leading-[1.16] mb-4">What we ask of researchers</h2>
            <ul className="space-y-3">
              {responsibleDisclosureContent.expectations.map((item) => (
                <li key={item} className="premium-card flex gap-3 p-4 text-[14px] leading-relaxed text-navy/85">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ocean" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Out of scope testing</Eyebrow>
            <h2 className="text-[22px] leading-[1.16] mb-4">Prohibited activities</h2>
            <ul className="space-y-3">
              {responsibleDisclosureContent.prohibited.map((item) => (
                <li key={item} className="premium-card flex gap-3 p-4 text-[14px] leading-relaxed text-navy/85">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy/30" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-3xl">
          <Eyebrow>Process</Eyebrow>
          <h2 className="text-[24px] leading-[1.16] mb-4">How reports are handled</h2>
          <ol className="space-y-3 list-decimal pl-5 text-[15px] text-structural leading-relaxed">
            {responsibleDisclosureContent.process.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-3xl">
          <Eyebrow>Policy intent</Eyebrow>
          <h2 className="text-[24px] leading-[1.16] mb-4">Good-faith research</h2>
          <p className="text-[15px] text-structural leading-relaxed">
            {responsibleDisclosureContent.legalIntent}
          </p>
        </Reveal>
      </Section>
    </>
  );
}
