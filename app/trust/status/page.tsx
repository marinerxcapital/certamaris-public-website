import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusMonitor } from "@/components/StatusMonitor";
import { pageMetadata } from "@/lib/metadata";
import { serviceStatusContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Service Status",
  "Live component status for the CertaMaris public website, application, and API, based on current endpoint health checks.",
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

        <div className="grid gap-10 max-w-5xl lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Reveal>
            <Eyebrow>Current status</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-4">Monitored service components</h2>
            <StatusMonitor />
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Operational communication</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-4">Incident and maintenance notices</h2>
            <p className="text-[15px] text-structural leading-relaxed">
              Active customer-impacting notices are communicated through established support channels. Request operational notifications through the support path below.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal>
          <div className="premium-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[22px] leading-[1.16] mb-3">Need operational help?</h2>
              <p className="text-[14.5px] text-structural leading-relaxed">
                Contact the team for incident assistance, maintenance coordination, or operational notification requests.
              </p>
            </div>
            <Button href={serviceStatusContent.contactHref}>{serviceStatusContent.contactLabel}</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
