import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { SECURITY_EMAIL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";
import {
  SECURITY_TRUST_LAST_REVIEWED,
  TRUST_STATUS_BADGE,
  securityTrustControls,
  type TrustControlStatus,
} from "@/lib/security-trust";

export const metadata = pageMetadata(
  "Security & Trust",
  "How CertaMaris handles data, access control, and tenant isolation, with current and configurable controls stated plainly.",
  "/security"
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

const LEGEND: { status: TrustControlStatus; description: string }[] = [
  { status: "current", description: "Implemented for the production platform as described." },
  { status: "configurable", description: "Available by plan, contract, or customer configuration." },
  { status: "not_claimed", description: "Not asserted on this website." },
];

export default function SecurityPage() {
  const reviewedLabel = formatReviewDate(SECURITY_TRUST_LAST_REVIEWED);

  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Security & Trust"
        title="What's implemented, what's configurable, and what's not claimed."
        intro="Security pages lose credibility when they round up. This page separates implemented platform controls from configurable customer terms and controls not claimed on this website."
      />

      {/* Last reviewed + legend */}
      <Section spacing="compact">
        <Reveal className="max-w-3xl">
          <p className="text-[13px] font-mono text-structural mb-6">
            Last reviewed: {reviewedLabel}
          </p>
          <Eyebrow>Status legend</Eyebrow>
          <div className="flex flex-wrap gap-3 mt-3">
            {LEGEND.map((item) => {
              const badge = TRUST_STATUS_BADGE[item.status];
              return (
                <div
                  key={item.status}
                  className="liquid-glass liquid-glass--subtle lg-pad-sm flex max-w-xs items-start gap-2.5"
                >
                  <StatusBadge status={badge.badgeStatus} label={badge.label} />
                  <p className="text-[13px] text-structural leading-snug pt-0.5">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Section>

      {/* 1. Vendor security commitments */}
      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Vendor security commitments</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-4">
            Platform controls stated with status, not marketing filler.
          </h2>
          <p className="text-[15px] text-structural leading-relaxed">
            The list below describes how CertaMaris operates the multi-tenant application. It is not a
            certification package, pen-test report, or substitute for contractual security exhibits.
          </p>
        </Reveal>
        <div className="space-y-4 max-w-3xl">
          {securityTrustControls.map((item) => {
            const badge = TRUST_STATUS_BADGE[item.status];
            return (
              <Reveal key={item.id}>
                <div className="premium-card flex items-start justify-between gap-6 p-5">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-ocean mb-1.5">
                      {item.category}
                    </p>
                    <h3 className="text-[15.5px] font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-[14px] text-structural leading-relaxed">{item.summary}</p>
                  </div>
                  <StatusBadge status={badge.badgeStatus} label={badge.label} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 2. Data & subprocessors */}
      <Section spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Data &amp; subprocessors</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">What we process, and who else is involved.</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-3">
            The platform stores customer-provided compliance and assurance records (for example vessel and
            fleet scope, control mappings, evidence metadata, findings, and user account information needed
            to operate the service). Data is retained according to the customer agreement and configuration.
          </p>
          <p className="text-[15px] text-structural leading-relaxed">
            Subprocessor details are available on request for active procurement. This page does not publish
            a public list of vendors.
          </p>
        </Reveal>
      </Section>

      {/* 3. Hosting */}
      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Hosting</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">Where the service runs.</h2>
          <p className="text-[15px] text-structural leading-relaxed">
            Application and data are hosted on commercial cloud infrastructure (Cloudflare edge delivery;
            application/API hosting and managed PostgreSQL as configured for production).
          </p>
        </Reveal>
      </Section>

      {/* 4. Enterprise identity */}
      <Section spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Enterprise identity</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">SSO and SCIM where your IdP requires them.</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-3">
            Single sign-on (SSO) and SCIM provisioning are configurable for enterprise customers as part of
            onboarding. Availability depends on plan and identity provider.
          </p>
          <StatusBadge status="caution" label="Configurable" />
        </Reveal>
      </Section>

      {/* 5. Shared responsibility */}
      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Shared responsibility</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">Security is shared, not outsourced.</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-3">
            Account-level access management (who on your team holds which role), the accuracy of evidence
            submitted into the platform, and your organization&apos;s own vessel and shoreside cybersecurity
            controls remain your responsibility. CertaMaris secures the platform; it does not secure your
            vessels&apos; OT environment.
          </p>
          <p className="text-[15px] text-structural leading-relaxed">
            Specific contractual security commitments, data processing terms, and incident notification
            timelines are defined in your customer agreement, not on this page.
          </p>
        </Reveal>
      </Section>

      {/* 6. How to request security package */}
      <Section spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Security package</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">How to request materials for procurement.</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-4">
            For questionnaires, subprocessor details, or other security documentation needed during active
            procurement, contact the security team or use the contact form and note that the request is for
            procurement review.
          </p>
          <ul className="space-y-2 text-[15px]">
            <li>
              <a
                href={`mailto:${SECURITY_EMAIL}?subject=Security%20package%20request`}
                className="font-medium text-ocean hover:underline"
              >
                {SECURITY_EMAIL}
              </a>
              <span className="text-structural"> — security package and questionnaire requests</span>
            </li>
            <li>
              <Link href="/contact" className="font-medium text-ocean hover:underline">
                Contact form
              </Link>
              <span className="text-structural">
                {" "}
                — note procurement or security review in your message
              </span>
            </li>
          </ul>
        </Reveal>
      </Section>

      {/* 7. Product assurance workflows (secondary — product UI, not vendor certs) */}
      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Product UI (not a certification)</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-4">
            Product assurance workflows (not a certification)
          </h2>
          <p className="text-[15px] text-structural leading-relaxed">
            The screens below show how control mapping, evidence, and findings appear in the product for
            customer workflows. They illustrate application capability. They are not vendor security
            certifications, audit reports, or proof of third-party attestation.
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center mb-12">
          <Reveal>
            <h3 className="text-[20px] leading-[1.2] mb-4">
              Controls and requirements stay linked for review.
            </h3>
            <p className="text-[15px] text-structural leading-relaxed mb-4">
              The product shows control ownership, criticality, status, implementation context, known
              exceptions, mapped requirements, and validation dates so access and evidence decisions can be
              reviewed in one place.
            </p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="ok" label="Mapped control" />
              <StatusBadge status="caution" label="Exception tracked" />
              <StatusBadge status="pending" label="Needs evidence" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              src={productProofScreens.requirementMapping.src}
              alt={productProofScreens.requirementMapping.alt}
              label={productProofScreens.requirementMapping.label}
              lightboxTitle={productProofScreens.requirementMapping.title}
              lightboxBody={productProofScreens.requirementMapping.body}
              priority
              galleryOrder={productProofScreens.requirementMapping.galleryOrder}
            />
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <ProductScreenTile
            {...productProofScreens.evidenceCoverage}
            title={productProofScreens.evidenceCoverage.title}
          />
          <ProductScreenTile
            {...productProofScreens.findingsRegister}
            title={productProofScreens.findingsRegister.title}
          />
        </div>
      </Section>

      {/* 8. Regulatory boundary */}
      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
