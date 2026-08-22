import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { BuyerDiligencePacket } from "@/components/BuyerDiligencePacket";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { TRUST_CENTER_LINKS } from "@/lib/security-trust";
import { CORPORATE_LAST_REVIEWED, trustCenterOverview } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Trust Center",
  "CertaMaris Trust Center — security controls, architecture, access, incident response, continuity, and procurement documentation paths.",
  "/trust"
);

function formatReviewDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function TrustCenterPage() {
  const reviewedLabel = formatReviewDate(CORPORATE_LAST_REVIEWED);

  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow={trustCenterOverview.eyebrow}
        title={trustCenterOverview.title}
        intro={trustCenterOverview.intro}
      />

      <Section spacing="compact">
        <Reveal>
          <BuyerDiligencePacket compact />
        </Reveal>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-3xl">
          <p className="text-[13px] font-mono text-structural mb-6">Last reviewed: {reviewedLabel}</p>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-3 gap-5" stagger={0.05}>
          {trustCenterOverview.principles.map((item) => (
            <div key={item.title} className="premium-card p-6">
              <h2 className="text-[16.5px] font-semibold mb-2">{item.title}</h2>
              <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <Eyebrow>Architecture</Eyebrow>
            <h2 className="text-[26px] leading-[1.16] mb-4">High-level product architecture</h2>
            <p className="text-[15px] text-structural leading-relaxed">
              {trustCenterOverview.architectureSummary}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Data flow</Eyebrow>
            <h2 className="text-[26px] leading-[1.16] mb-4">How customer content moves</h2>
            <p className="text-[15px] text-structural leading-relaxed">{trustCenterOverview.dataFlowSummary}</p>
          </Reveal>
        </div>
      </Section>

      <Section spacing="compact">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <Eyebrow>Hosting</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-3">Cloud-hosted, details under procurement</h2>
            <p className="text-[15px] text-structural leading-relaxed">{trustCenterOverview.hostingSummary}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Access control</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-3">Authentication, RBAC, and tenancy</h2>
            <p className="text-[15px] text-structural leading-relaxed">
              {trustCenterOverview.accessControlSummary}
            </p>
          </Reveal>
          <Reveal>
            <Eyebrow>Incident response</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-3">Internal process; contract defines notice</h2>
            <p className="text-[15px] text-structural leading-relaxed">
              {trustCenterOverview.incidentResponseSummary}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Business continuity</Eyebrow>
            <h2 className="text-[24px] leading-[1.16] mb-3">Backup and recovery boundaries</h2>
            <p className="text-[15px] text-structural leading-relaxed">{trustCenterOverview.continuitySummary}</p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Trust resources</Eyebrow>
          <h2 className="section-h2 section-h2--lg">Browse the Trust Center pages.</h2>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.04}>
          {TRUST_CENTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="premium-card p-6 block transition-colors hover:border-ocean/30"
            >
              <h3 className="text-[16px] font-semibold mb-2 text-navy">{link.title}</h3>
              <p className="text-[14px] text-structural leading-relaxed">{link.description}</p>
            </Link>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand
        surface="paper"
        eyebrow="Document request"
        title="Request security and procurement materials"
        description={`NDA packages, questionnaires, subprocessors, and architecture overviews are handled through the procurement path. Security reports: ${trustCenterOverview.securityContact}.`}
        primary={{
          label: "Procurement package",
          href: trustCenterOverview.procurementPage,
          variant: "primary",
        }}
        secondary={{
          label: "Contact form",
          href: trustCenterOverview.procurementPath,
          variant: "secondary",
        }}
        tertiary={false}
      />

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
