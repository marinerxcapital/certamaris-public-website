import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { PageHeroSignal } from "@/components/PageHeroSignal";
import { PageOutline } from "@/components/PageOutline";
import {
  ProductScreenFrame,
  ProductScreenTile,
} from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { SECURITY_EMAIL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { productProofScreens } from "@/lib/product-screens";
import {
  SECURITY_PAGE_SECTIONS,
  SECURITY_TRUST_LAST_REVIEWED,
  TRUST_STATUS_LEGEND,
  securityTrustControls,
} from "@/lib/security-trust";

export const metadata = pageMetadata(
  "Security",
  "How CertaMaris handles tenancy, access control, encryption, logging, and related platform controls with honest maturity labels.",
  "/security",
  { image: "/og/certamaris-security-2026-08-product-experience.png" },
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

export default function SecurityPage() {
  const reviewedLabel = formatReviewDate(SECURITY_TRUST_LAST_REVIEWED);

  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Security"
        title="What's implemented, what's planned, and what's not claimed."
        intro="This page separates implemented platform controls from configurable terms, planned capabilities, NDA materials, and controls not currently claimed on this website."
        aside={
          <PageHeroSignal
            eyebrow="Control vocabulary"
            items={[
              {
                label: "Status model",
                value: "Current · Configurable · Planned",
              },
              {
                label: "Control scope",
                value: "Access · encryption · operations",
              },
              { label: "Boundary", value: "No certification claim" },
            ]}
            href="/trust/procurement"
            linkLabel="Open procurement context"
          />
        }
      />

      <PageOutline
        items={[
          { id: "security-status", label: "Status legend" },
          { id: "platform-controls", label: "Platform controls" },
          { id: "data-processing", label: "Data processing" },
          { id: "hosting", label: "Hosting" },
          { id: "shared-responsibility", label: "Shared responsibility" },
          { id: "security-package", label: "Security package" },
          { id: "product-boundary", label: "Product boundary" },
        ]}
      />

      <Section id="security-status" spacing="compact">
        <Reveal className="max-w-3xl">
          <p className="text-[13px] font-mono text-structural mb-6">
            Last reviewed: {reviewedLabel}
          </p>
          <Eyebrow>Status legend</Eyebrow>
          <ul
            className="mt-3 flex flex-wrap gap-3"
            aria-label="Security control status legend"
          >
            {TRUST_STATUS_LEGEND.map((item) => (
              <li
                key={item.status}
                className="liquid-glass liquid-glass--subtle lg-pad-sm flex max-w-xs items-start gap-2.5"
              >
                <StatusBadge trustStatus={item.status} />
                <p className="pt-0.5 text-[13px] leading-snug text-structural">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-structural leading-relaxed">
            Related:{" "}
            <Link
              href="/trust"
              className="font-medium text-ocean hover:underline"
            >
              Trust Center
            </Link>
            {" · "}
            <Link
              href="/trust/procurement"
              className="font-medium text-ocean hover:underline"
            >
              Procurement package
            </Link>
            {" · "}
            <Link
              href="/trust/responsible-disclosure"
              className="font-medium text-ocean hover:underline"
            >
              Responsible disclosure
            </Link>
          </p>
        </Reveal>
      </Section>

      <Section id="platform-controls" surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Platform controls</Eyebrow>
          <h2 className="section-h2 section-h2--lg mb-4">
            Tenancy, identity, encryption, operations, and assurance — with
            status labels.
          </h2>
          <p className="cm-copy text-structural leading-relaxed">
            The list below describes how CertaMaris operates the multi-tenant
            application. It is not a certification package, pen-test report, or
            substitute for contractual security exhibits.
          </p>
        </Reveal>
        <div className="max-w-3xl space-y-4">
          {securityTrustControls.map((item) => (
            <Reveal key={item.id}>
              <div className="premium-card flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:gap-6">
                <div className="min-w-0 flex-1">
                  <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ocean">
                    {item.category}
                  </p>
                  <h3 className="mb-1.5 cm-subheading font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-structural">
                    {item.summary}
                  </p>
                </div>
                <StatusBadge trustStatus={item.status} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="data-processing" spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Data processing</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">
            {SECURITY_PAGE_SECTIONS.dataProcessing.title}
          </h2>
          <p className="cm-copy text-structural leading-relaxed mb-4">
            {SECURITY_PAGE_SECTIONS.dataProcessing.body}
          </p>
          <p className="cm-copy text-structural leading-relaxed">
            Product subprocessors are available on request. See{" "}
            <Link
              href="/legal/subprocessors"
              className="font-medium text-ocean hover:underline"
            >
              Subprocessors
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      <Section id="hosting" surface="paper" spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Hosting</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">
            {SECURITY_PAGE_SECTIONS.hosting.title}
          </h2>
          <p className="cm-copy text-structural leading-relaxed">
            {SECURITY_PAGE_SECTIONS.hosting.body}
          </p>
        </Reveal>
      </Section>

      <Section id="shared-responsibility" spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Shared responsibility</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">
            {SECURITY_PAGE_SECTIONS.sharedResponsibility.title}
          </h2>
          <p className="cm-copy text-structural leading-relaxed mb-3">
            {SECURITY_PAGE_SECTIONS.sharedResponsibility.body}
          </p>
          <p className="cm-copy text-structural leading-relaxed">
            Specific contractual security commitments, data-processing terms,
            and incident notification timelines are defined in your customer
            agreement, not on this page.
          </p>
        </Reveal>
      </Section>

      <Section id="security-package" surface="paper" spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Security package</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">
            How to request materials for procurement.
          </h2>
          <p className="cm-copy text-structural leading-relaxed mb-6">
            For questionnaires, subprocessors, architecture overviews, or other
            security documentation needed during active procurement, use the
            procurement path or contact the security mailbox.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button href="/trust/procurement">Procurement package</Button>
            <Button href="/contact?intent=procurement" variant="secondary">
              Contact with procurement intent
            </Button>
          </div>
          <ul className="space-y-2 text-[15px]">
            <li>
              <a
                href={`mailto:${SECURITY_EMAIL}?subject=Security%20package%20request`}
                className="font-medium text-ocean hover:underline"
              >
                {SECURITY_EMAIL}
              </a>
              <span className="text-structural">
                {" "}
                — security package and questionnaire requests
              </span>
            </li>
            <li>
              <Link
                href="/trust"
                className="font-medium text-ocean hover:underline"
              >
                Trust Center
              </Link>
              <span className="text-structural">
                {" "}
                — disclosure, status, and procurement overview
              </span>
            </li>
          </ul>
        </Reveal>
      </Section>

      <Section id="product-boundary" spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Product UI (not a certification)</Eyebrow>
          <h2 className="section-h2 section-h2--lg mb-4">
            {SECURITY_PAGE_SECTIONS.productVsVendor.title}
          </h2>
          <p className="cm-copy text-structural leading-relaxed">
            {SECURITY_PAGE_SECTIONS.productVsVendor.body}
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center mb-12">
          <Reveal>
            <h3 className="text-[20px] leading-[1.2] mb-4">
              Controls and requirements stay linked for review.
            </h3>
            <p className="cm-copy text-structural leading-relaxed mb-4">
              The product shows control ownership, criticality, status,
              implementation context, known exceptions, mapped requirements, and
              validation dates so access and evidence decisions can be reviewed
              in one place.
            </p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="ok" label="Mapped control" />
              <StatusBadge status="caution" label="Exception tracked" />
              <StatusBadge status="pending" label="Needs evidence" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              {...productProofScreens.requirementMapping}
              priority
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

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
