import { BoundaryPanel } from "@/components/BoundaryPanel";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame, ProductScreenGallery, ProductScreenTile } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Security & Trust",
  "How CertaMaris handles data, access control, and tenant isolation, with current and configurable controls stated plainly.",
  "/security"
);

type ControlItem = { title: string; body: string; status: "ok" | "caution" | "pending" };

const controls: ControlItem[] = [
  { title: "Tenant isolation", body: "Each customer's data is logically isolated at the database and access-control layer, scoped by organization and fleet.", status: "ok" },
  { title: "Role-based access control", body: "Access is scoped by role and object — vessel, fleet, or organization — so a technical manager sees their fleet, not another operator's.", status: "ok" },
  { title: "Encryption in transit", body: "All traffic between clients and the application is encrypted using industry-standard TLS.", status: "ok" },
  { title: "Encryption at rest", body: "Stored data is encrypted at rest using the hosting provider's managed encryption capabilities.", status: "ok" },
  { title: "Audit history", body: "Evidence, findings, and plan changes retain a version and reviewer history rather than overwriting prior state.", status: "ok" },
  { title: "Environment separation", body: "Development, staging, and production environments are kept separate, with production data excluded from lower environments.", status: "ok" },
  { title: "Formal third-party certification (e.g., SOC 2, ISO 27001)", body: "Formal third-party certification is not claimed on this website. If certification is completed, the certificate scope and dates will be published with the same specificity as other controls.", status: "pending" },
  { title: "Single sign-on (SSO) and SCIM provisioning", body: "Configurable for enterprise customers as part of onboarding; availability depends on plan and identity provider.", status: "caution" },
  { title: "Incident response process", body: "A documented internal incident response process exists for the application; customer-facing incident notification terms are defined per contract.", status: "ok" },
  { title: "Subprocessor transparency", body: "A current subprocessor list is maintained and available on request for active procurement and customer review.", status: "caution" },
  { title: "Data retention configuration", body: "Retention periods for evidence, logs, and account data are defined by customer agreement and implementation scope.", status: "caution" },
];

export default function SecurityPage() {
  return (
    <>
      <ProductScreenGallery />
      <PageHero
        emphasis="elevated"
        eyebrow="Security & Trust"
        title="What's implemented, what's configurable, and what's not claimed."
        intro="Security pages lose credibility when they round up. This page separates implemented platform controls from configurable customer terms and controls not claimed on this website."
      />

      <Section>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>Security in the workflow</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14] mb-5">
              Security controls are reviewable records, not just policy statements.
            </h2>
            <p className="text-[15.5px] text-structural leading-relaxed mb-4">
              The product shows control ownership, criticality, status, implementation context, known exceptions,
              mapped requirements, and validation dates so access control and evidence decisions can be reviewed.
            </p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="ok" label="Implemented control" />
              <StatusBadge status="caution" label="Known exception tracked" />
              <StatusBadge status="pending" label="Not claimed" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductScreenFrame
              src="/product/clean/requirement-control-mapping.png"
              alt="CertaMaris access-control detail screen showing control owner, status, last tested date, implementation description, known exception, and requirement mappings."
              label="Access control record"
              priority
            />
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Trust evidence</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
            Security posture is only useful when evidence stays current.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <ProductScreenTile
            src="/product/clean/evidence-coverage.png"
            alt="CertaMaris evidence sufficiency and coverage matrix showing freshness status, coverage gaps, and request-evidence actions."
            label="Evidence coverage"
            title="Freshness and sufficiency"
            body="Security evidence is tracked for coverage and freshness, with gaps and expiring support surfaced before review."
          />
          <ProductScreenTile
            src="/product/clean/findings-register.png"
            alt="CertaMaris findings and risks register showing risk ratings, owners, due dates, and action status."
            label="Findings and risks"
            title="Accountable remediation"
            body="Security gaps move into an owned register with severity, status, engagement context, due dates, and aging."
          />
        </div>
      </Section>

      <Section spacing="compact">
        <Reveal className="max-w-2xl mb-10">
          <Eyebrow>Control status</Eyebrow>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">Platform security commitments.</h2>
        </Reveal>
        <div className="space-y-4 max-w-3xl">
          {controls.map((item) => (
            <Reveal key={item.title}>
              <div className="flex items-start justify-between gap-6 border rounded-sm p-5" style={{ borderColor: "var(--hairline)" }}>
                <div>
                  <h3 className="text-[15.5px] font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-[14px] text-structural leading-relaxed">{item.body}</p>
                </div>
                <StatusBadge
                  status={item.status}
                  label={item.status === "ok" ? "Current" : item.status === "caution" ? "Configurable" : "Not claimed"}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-2xl">
          <Eyebrow>Customer responsibilities</Eyebrow>
          <h2 className="text-[26px] leading-[1.16] mb-4">Security is shared, not outsourced.</h2>
          <p className="text-[15px] text-structural leading-relaxed mb-3">
            Account-level access management (who on your team holds which role), the accuracy of evidence submitted
            into the platform, and your organization's own vessel and shoreside cybersecurity controls remain your
            responsibility. CertaMaris secures the platform; it does not secure your vessels' OT environment.
          </p>
          <p className="text-[15px] text-structural leading-relaxed">
            Specific contractual security commitments, data processing terms, and incident notification timelines
            are defined in your customer agreement, not on this page.
          </p>
        </Reveal>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl" />
        </Reveal>
      </Section>
    </>
  );
}
