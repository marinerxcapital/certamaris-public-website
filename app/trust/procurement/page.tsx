import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { pageMetadata } from "@/lib/metadata";
import { TRUST_STATUS_BADGE } from "@/lib/security-trust";
import { procurementContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Procurement",
  "Request NDA, DPA, MSA, security questionnaire, subprocessor list, architecture overview, and related CertaMaris procurement materials.",
  "/trust/procurement"
);

export default function ProcurementPage() {
  const ndaBadge = TRUST_STATUS_BADGE.available_under_nda;

  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow={procurementContent.eyebrow}
        title={procurementContent.title}
        intro={procurementContent.intro}
      />

      <Section spacing="compact">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Trust Center", href: "/trust" },
            { label: "Procurement" },
          ]}
        />

        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Start here</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">Request the package you need</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-6">
            Use the contact form with procurement intent, or email sales / security with your organization and document
            list.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button href={procurementContent.requestHref}>{procurementContent.requestLabel}</Button>
            <Button href="/security" variant="secondary">
              Review public security controls
            </Button>
          </div>
          <ul className="space-y-2 text-[14.5px] text-structural">
            <li>
              Sales:{" "}
              <a
                href={`mailto:${procurementContent.salesEmail}`}
                className="font-medium text-ocean hover:underline"
              >
                {procurementContent.salesEmail}
              </a>
            </li>
            <li>
              Security:{" "}
              <a
                href={`mailto:${procurementContent.securityEmail}?subject=Procurement%20security%20package`}
                className="font-medium text-ocean hover:underline"
              >
                {procurementContent.securityEmail}
              </a>
            </li>
          </ul>
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Materials</Eyebrow>
          <h2 className="text-[28px] sm:text-[32px] leading-[1.14] mb-3">What you can request</h2>
          <p className="text-[15px] text-structural leading-relaxed">
            Items below are requestable during qualified evaluation. Status reflects public website claims, not a
            promise that every document is ready for immediate download.
          </p>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-4" stagger={0.04}>
          {procurementContent.materials.map((item) => (
            <div key={item.title} className="premium-card p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[15.5px] font-semibold">{item.title}</h3>
                <StatusBadge status={ndaBadge.badgeStatus} label={ndaBadge.label} />
              </div>
              <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-8">
          <Eyebrow>Process</Eyebrow>
          <h2 className="text-[26px] leading-[1.16]">How procurement requests are handled</h2>
        </Reveal>
        <ol className="max-w-3xl space-y-4">
          {procurementContent.howItWorks.map((step, index) => (
            <Reveal as="li" key={step} className="premium-card flex gap-4 p-5">
              <span className="font-mono text-[13px] text-ocean shrink-0 pt-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[14.5px] text-structural leading-relaxed">{step}</p>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
