/**
 * Structured vendor security & trust controls for the public Security and Trust pages.
 * Status values are deliberate: do not claim SOC 2 / ISO / pen-test outcomes here.
 * Do not invent RTO/RTO, insurance, regions, or certifications.
 */

export type TrustControlStatus =
  | "current"
  | "configurable"
  | "planned"
  | "not_claimed"
  | "available_under_nda";

export type TrustControl = {
  id: string;
  category: string;
  title: string;
  summary: string;
  status: TrustControlStatus;
  /** ISO date string — last time this public claim was reviewed. */
  last_verified: string;
};

/** StatusBadge mapping for trust control status. */
export const TRUST_STATUS_BADGE: Record<
  TrustControlStatus,
  { badgeStatus: "ok" | "caution" | "pending"; label: string }
> = {
  current: { badgeStatus: "ok", label: "Current" },
  configurable: { badgeStatus: "caution", label: "Configurable" },
  planned: { badgeStatus: "pending", label: "Planned" },
  not_claimed: { badgeStatus: "pending", label: "Not claimed" },
  available_under_nda: { badgeStatus: "caution", label: "Available under NDA" },
};

export const SECURITY_TRUST_LAST_REVIEWED = "2026-07-31";

export const securityTrustControls: TrustControl[] = [
  {
    id: "tenant-isolation",
    category: "Access",
    title: "Tenant isolation",
    summary:
      "Customer data is logically isolated at the database and access-control layer, scoped by organization and related operational boundaries so one customer’s records are not exposed to another.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "rbac",
    category: "Access",
    title: "Role-based access control and object scope",
    summary:
      "Access is scoped by role and object — for example organization, fleet, or vessel context — so operators work within their authorized scope rather than a shared unrestricted workspace.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "authentication",
    category: "Identity",
    title: "Authenticated access",
    summary:
      "The product application requires authenticated sign-in for customer use. The public marketing website is separate from the authenticated application at app.certamaris.com.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "mfa",
    category: "Identity",
    title: "Multi-factor authentication (MFA)",
    summary:
      "MFA availability and enforcement policy are not published as a blanket production claim on this website. MFA options can be discussed during enterprise onboarding and procurement.",
    status: "planned",
    last_verified: "2026-07-31",
  },
  {
    id: "sso-scim",
    category: "Identity",
    title: "Single sign-on (SSO) and SCIM provisioning",
    summary:
      "Enterprise single sign-on and automated provisioning are treated as planned enterprise capabilities. Availability depends on plan, identity provider, and implementation scope — not claimed as universally current for every customer.",
    status: "planned",
    last_verified: "2026-07-31",
  },
  {
    id: "tls",
    category: "Encryption",
    title: "Encryption in transit",
    summary: "Traffic between clients and the application is encrypted using industry-standard TLS.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "encryption-at-rest",
    category: "Encryption",
    title: "Encryption at rest",
    summary:
      "Stored data is encrypted at rest using the managed encryption capabilities of the production hosting and database providers.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "privileged-access",
    category: "Access",
    title: "Privileged access to production",
    summary:
      "Production access is limited to authorized personnel for operational support. Customer support access, where used, is intended to be controlled and time-bounded rather than standing unrestricted access.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "audit-history",
    category: "Operations",
    title: "Audit history and change trail",
    summary:
      "Evidence, findings, and plan-related changes retain version and reviewer history rather than silently overwriting prior state in the product record.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "audit-logging",
    category: "Operations",
    title: "Operational and access logging",
    summary:
      "Application and infrastructure operations produce logs used for support, security review, and incident investigation. Log retention and export terms are defined by operating practice and customer agreement where applicable.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "secure-development",
    category: "Development",
    title: "Secure development practices",
    summary:
      "Changes move through source control, review, and separated environments before production. Public pages do not invent a specific SDLC certification or maturity model claim.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "vulnerability-management",
    category: "Development",
    title: "Vulnerability and dependency management",
    summary:
      "Dependencies and application components are monitored with private SBOM and vulnerability tooling used for CertaMaris engineering work. Tooling configuration is internal; results are not published as a public attestation.",
    status: "configurable",
    last_verified: "2026-07-31",
  },
  {
    id: "environment-separation",
    category: "Operations",
    title: "Environment separation",
    summary:
      "Development, staging or preview, and production environments are kept separate, with production customer data excluded from lower environments as a design rule.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "backups",
    category: "Continuity",
    title: "Backups and recovery approach",
    summary:
      "Managed database backups are part of the production operating model. Specific RTO, RPO, restore-test cadence, and contractual recovery commitments are not claimed as public guarantees on this website.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "incident-response",
    category: "Operations",
    title: "Incident response process",
    summary:
      "An internal process exists for platform operations and security incidents. Customer notification terms, timelines, and severity definitions are defined per contract, not as a public SLA on this page.",
    status: "current",
    last_verified: "2026-07-31",
  },
  {
    id: "data-retention",
    category: "Data",
    title: "Retention and deletion",
    summary:
      "Retention periods for evidence, logs, and account data are defined by customer agreement, configuration, and legal requirements. Deletion or export handling is addressed during offboarding under the applicable agreement.",
    status: "configurable",
    last_verified: "2026-07-31",
  },
  {
    id: "integrations",
    category: "Data",
    title: "Integrations",
    summary:
      "Integrations (identity, export, or operational connectors) are introduced by plan and implementation scope. No blanket third-party integration catalog is claimed on this public page.",
    status: "configurable",
    last_verified: "2026-07-31",
  },
  {
    id: "subprocessor-transparency",
    category: "Data",
    title: "Subprocessor transparency",
    summary:
      "Product subprocessor details are available on request for active procurement and customer review, typically under NDA. This website does not publish a complete product subprocessor list.",
    status: "available_under_nda",
    last_verified: "2026-07-31",
  },
  {
    id: "security-questionnaire",
    category: "Assurance",
    title: "Security questionnaires and architecture overview",
    summary:
      "Security questionnaires, architecture overviews, and related procurement materials can be provided during active commercial evaluation under appropriate confidentiality terms.",
    status: "available_under_nda",
    last_verified: "2026-07-31",
  },
  {
    id: "pen-test-summary",
    category: "Assurance",
    title: "Penetration-test summary",
    summary:
      "Independent pen-test reports or summaries are not claimed as published public documents. When available, summaries may be shared under NDA during qualified procurement.",
    status: "available_under_nda",
    last_verified: "2026-07-31",
  },
  {
    id: "third-party-certification",
    category: "Assurance",
    title: "Formal third-party certification",
    summary:
      "Formal third-party certification (for example SOC 2 or ISO 27001) is not claimed on this website. If certification is completed, scope and dates will be published with the same specificity as other controls.",
    status: "not_claimed",
    last_verified: "2026-07-31",
  },
];

export const SECURITY_PAGE_SECTIONS = {
  dataProcessing: {
    title: "What we process",
    body: "The platform stores customer-provided compliance and assurance records — for example vessel and fleet scope, control mappings, evidence metadata, findings, corrective-action records, and user account information needed to operate the service. Retention follows the customer agreement and configuration.",
  },
  hosting: {
    title: "Hosting",
    body: "The product application and data are cloud-hosted on commercial infrastructure. The public marketing website is delivered separately from the authenticated application. Specific production regions, residency guarantees, and full provider inventories are not published as open claims on this page; product infrastructure details are available during procurement under appropriate confidentiality terms.",
  },
  sharedResponsibility: {
    title: "Shared responsibility",
    body: "Account-level access management (who on your team holds which role), the accuracy of evidence submitted into the platform, and your organization’s own vessel and shoreside cybersecurity controls remain your responsibility. CertaMaris secures the platform; it does not secure your vessels’ OT environment.",
  },
  productVsVendor: {
    title: "Product workflows are not vendor certifications",
    body: "Product screens that show control mapping, evidence, and findings illustrate application capability for customer workflows. They are not vendor security certifications, audit reports, or third-party attestation.",
  },
} as const;

export const TRUST_CENTER_LINKS: { href: string; title: string; description: string }[] = [
  {
    href: "/security",
    title: "Security controls",
    description: "Current, planned, configurable, and not-claimed platform controls with status labels.",
  },
  {
    href: "/trust/subprocessors",
    title: "Subprocessors",
    description: "How infrastructure categories are described and how to request the product subprocessor list.",
  },
  {
    href: "/trust/responsible-disclosure",
    title: "Responsible disclosure",
    description: "How to report a security issue to security@certamaris.com.",
  },
  {
    href: "/trust/ai-policy",
    title: "AI provider & data classification policy",
    description: "Approved AI providers, data classification ceilings, human review, and inference budgets.",
  },
  {
    href: "/trust/status",
    title: "Service status",
    description: "Current operational status for the website, application, and API, with support escalation paths.",
  },
  {
    href: "/trust/procurement",
    title: "Procurement & security package",
    description: "Request NDA materials, questionnaires, DPA/MSA discussion, and related documents.",
  },
  {
    href: "/trust/assurance-model",
    title: "Assurance model one-pager",
    description: "Printable REQ→PKG operating model plus regulatory boundary for procurement forwarding.",
  },
  {
    href: "/accessibility",
    title: "Accessibility",
    description: "Public-site accessibility approach, limitations, and how to request materials.",
  },
];
