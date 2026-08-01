import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { serviceStatusContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Service Status",
  "How CertaMaris communicates operational status today. A public status page is planned; no fabricated uptime history is published here.",
  "/trust/status"
);

export default function ServiceStatusPage() {
  return (
    <>
      <PageHero
        eyebrow={serviceStatusContent.eyebrow}
        title={serviceStatusContent.title}
        intro={serviceStatusContent.intro}
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Trust Center", href: "/trust" },
            { label: "Service status" },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl">
          <Reveal>
            <Eyebrow>Current practice</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-4">Customer and support channels</h2>
            <p className="text-[15px] text-structural leading-relaxed">{serviceStatusContent.currentPractice}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Planned</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-4">Public status page</h2>
            <p className="text-[15px] text-structural leading-relaxed">{serviceStatusContent.planned}</p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal>
          <div className="premium-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[22px] leading-[1.16] mb-3">Need operational help?</h2>
              <p className="text-[14.5px] text-structural leading-relaxed">
                Contact the team through the support path. This page does not display fake uptime percentages or
                historical incident charts.
              </p>
            </div>
            <Button href={serviceStatusContent.contactHref}>{serviceStatusContent.contactLabel}</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
