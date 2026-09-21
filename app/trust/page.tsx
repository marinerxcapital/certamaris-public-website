import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { BuyerDiligencePacket } from "@/components/BuyerDiligencePacket";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { pageMetadata } from "@/lib/metadata";
import {
  TRUST_CENTER_CATEGORIES,
  TRUST_STATUS_LEGEND,
} from "@/lib/security-trust";
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

const operatingTopics = [
  {
    id: "infrastructure",
    eyebrow: "Infrastructure",
    title: "Hosting, architecture, and access",
    body: `${trustCenterOverview.architectureSummary} ${trustCenterOverview.hostingSummary} ${trustCenterOverview.accessControlSummary}`,
  },
  {
    id: "continuity",
    eyebrow: "Business continuity",
    title: "Incident response and recovery boundaries",
    body: `${trustCenterOverview.incidentResponseSummary} ${trustCenterOverview.continuitySummary}`,
  },
  {
    id: "data-flow",
    eyebrow: "Data flow",
    title: "How customer content moves",
    body: trustCenterOverview.dataFlowSummary,
  },
] as const;

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
          <p className="mb-6 font-mono text-[13px] text-structural">Last reviewed: {reviewedLabel}</p>
          <Eyebrow>Status vocabulary</Eyebrow>
          <h2 className="mb-3 text-[24px] leading-[1.16] sm:text-[28px]">
            Claims stay labeled — never upgraded for marketing.
          </h2>
          <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-structural">
            Trust and security pages use one StatusBadge system. Planned stays Planned. Not claimed stays not claimed.
            Formal certifications are not invented here.
          </p>
          <ul className="flex flex-wrap gap-3" aria-label="Trust maturity status legend">
            {TRUST_STATUS_LEGEND.map((item) => (
              <li
                key={item.status}
                className="flex max-w-xs items-start gap-2.5 rounded-md border border-navy/10 bg-white/80 p-3"
              >
                <StatusBadge trustStatus={item.status} />
                <p className="pt-0.5 text-[13px] leading-snug text-structural">{item.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow>Operating principles</Eyebrow>
          <h2 className="section-h2 section-h2--lg">How this Trust Center is written.</h2>
        </Reveal>
        <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.04}>
          {trustCenterOverview.principles.map((item) => (
            <div key={item.title} className="rounded-md border border-navy/10 bg-white/85 p-5">
              <h3 className="mb-2 text-[15.5px] font-semibold text-navy">{item.title}</h3>
              <p className="text-[14px] leading-relaxed text-structural">{item.body}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section id="trust-directory" spacing="compact">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>Directory</Eyebrow>
          <h2 className="section-h2 section-h2--lg">Security through status — organized for procurement.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-structural">
            Browse by diligence topic. Each destination is an existing public route or an in-page operating summary.
          </p>
        </Reveal>
        <nav aria-label="Trust Center categories" className="space-y-8">
          {TRUST_CENTER_CATEGORIES.map((category) => (
            <Reveal key={category.id}>
              <section
                aria-labelledby={`trust-cat-${category.id}`}
                className="rounded-md border border-navy/10 bg-white/70 p-5 sm:p-6"
              >
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-navy/8 pb-4">
                  <div>
                    <h3 id={`trust-cat-${category.id}`} className="text-[18px] font-semibold text-navy">
                      {category.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-[13.5px] leading-relaxed text-structural">
                      {category.summary}
                    </p>
                  </div>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {category.links.map((link) => (
                    <li key={`${category.id}-${link.href}-${link.title}`}>
                      <Link
                        href={link.href}
                        className="group flex h-full flex-col rounded-md border border-transparent px-3 py-2.5 transition hover:border-ocean/25 hover:bg-ocean/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
                      >
                        <span className="text-[15px] font-semibold text-navy group-hover:text-ocean">
                          {link.title}
                        </span>
                        <span className="mt-1 text-[13px] leading-relaxed text-structural">
                          {link.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </nav>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-10 max-w-2xl">
          <Eyebrow>Operating posture</Eyebrow>
          <h2 className="section-h2 section-h2--lg">Infrastructure, continuity, and data movement.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-structural">
            High-level posture for security and procurement reviewers. Detailed control status lives on the security
            page; contractual recovery and residency terms are handled in procurement.
          </p>
        </Reveal>
        <div className="space-y-6">
          {operatingTopics.map((topic) => (
            <Reveal key={topic.id}>
              <article
                id={topic.id}
                className="scroll-mt-[calc(var(--header-offset,4.5rem)+1rem)] rounded-md border border-navy/10 bg-white/85 p-6"
              >
                <Eyebrow>{topic.eyebrow}</Eyebrow>
                <h3 className="mb-3 mt-2 text-[20px] leading-[1.2] text-navy">{topic.title}</h3>
                <p className="max-w-3xl text-[15px] leading-relaxed text-structural">{topic.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
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
