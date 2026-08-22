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
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow={procurementContent.eyebrow}
        title={procurementContent.title}
        intro={procurementContent.intro}
        aside={
          <div className="liquid-glass liquid-glass--subtle lg-pad-md w-full max-w-[25rem]">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
              Procurement review path
            </p>
            <div className="mt-4 grid gap-3">
              <a
                href="/security"
                className="rounded-md border border-navy/10 bg-white/70 p-3 transition hover:border-ocean/35 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              >
                <span className="block text-[14px] font-semibold text-navy">Public security controls</span>
                <span className="mt-1 block text-[12.5px] leading-5 text-structural">
                  Review implemented, planned, and unclaimed security posture.
                </span>
              </a>
              <a
                href="/trust/assurance-model"
                className="rounded-md border border-navy/10 bg-white/70 p-3 transition hover:border-ocean/35 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              >
                <span className="block text-[14px] font-semibold text-navy">Assurance model one-pager</span>
                <span className="mt-1 block text-[12.5px] leading-5 text-structural">
                  Trace requirement, evidence, finding, action, and release boundaries.
                </span>
              </a>
              <a
                href={procurementContent.requestHref}
                className="rounded-md border border-ocean/20 bg-ocean/5 p-3 transition hover:border-ocean/45 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              >
                <span className="block text-[14px] font-semibold text-navy">{procurementContent.requestLabel}</span>
                <span className="mt-1 block text-[12.5px] leading-5 text-structural">
                  Send organization context and the document list through the routed request.
                </span>
              </a>
            </div>
          </div>
        }
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
            <Button href="/trust/assurance-model" variant="secondary">
              Assurance model one-pager
            </Button>
            <Button href="/security" variant="ghost">
              Review public security controls
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button href="/legal/privacy" variant="ghost">
              Privacy Policy status
            </Button>
            <Button href="/legal/terms" variant="ghost">
              Business Terms status
            </Button>
            <Button href="/legal/dpa" variant="ghost">
              DPA status
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
          <p className="mt-4 text-[14px] text-structural leading-relaxed">
            The August 4, 2026 legal source package remains configuration incomplete. The public legal routes describe
            current status without exposing blocked PDFs or customer-reliance language before the remaining fields are
            approved.
          </p>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 gap-4" stagger={0.04}>
          {procurementContent.materials.map((item) => {
            const badge = TRUST_STATUS_BADGE[item.status];
            return (
              <div key={item.title} className="premium-card flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15.5px] font-semibold">
                    {"href" in item && item.href ? (
                      <a href={item.href} className="hover:text-ocean">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <StatusBadge status={badge.badgeStatus} label={badge.label} />
                </div>
                <p className="text-[14px] leading-relaxed text-structural">{item.body}</p>
                {"href" in item && item.href ? (
                  <a href={item.href} className="text-[13.5px] font-semibold text-ocean hover:underline">
                    Open leave-behind
                  </a>
                ) : null}
              </div>
            );
          })}
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
