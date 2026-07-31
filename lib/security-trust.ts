/**
 * Structured vendor security & trust controls for the public Security page.
 * Status values are deliberate: do not claim SOC 2 / ISO / pen-test outcomes here.
 */

export type TrustControlStatus = "current" | "configurable" | "not_claimed";

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
  not_claimed: { badgeStatus: "pending", label: "Not claimed" },
};

export const SECURITY_TRUST_LAST_REVIEWED = "2026-07-30";

export const securityTrustControls: TrustControl[] = [
  {
    id: "tenant-isolation",
    category: "Access",
    title: "Tenant isolation",
    summary:
      "Customer data is logically isolated at the database and access-control layer, scoped by organization and fleet.",
    status: "current",
    last_verified: "2026-07-30",
  },
  {
    id: "rbac",
    category: "Access",
    title: "Role-based access control",
    summary:
      "Access is scoped by role and object — vessel, fleet, or organization — so operators see their fleet, not another customer's data.",
    status: "current",
    last_verified: "2026-07-30",
  },
  {
    id: "tls",
    category: "Encryption",
    title: "Encryption in transit",
    summary: "Traffic between clients and the application is encrypted using industry-standard TLS.",
    status: "current",
    last_verified: "2026-07-30",
  },
  {
    id: "encryption-at-rest",
    category: "Encryption",
    title: "Encryption at rest",
    summary:
      "Stored data is encrypted at rest using the hosting provider's managed encryption capabilities.",
    status: "current",
    last_verified: "2026-07-30",
  },
  {
    id: "audit-history",
    category: "Operations",
    title: "Audit history",
    summary:
      "Evidence, findings, and plan changes retain version and reviewer history rather than overwriting prior state.",
    status: "current",
    last_verified: "2026-07-30",
  },
  {
    id: "environment-separation",
    category: "Operations",
    title: "Environment separation",
    summary:
      "Development, staging, and production environments are kept separate, with production data excluded from lower environments.",
    status: "current",
    last_verified: "2026-07-30",
  },
  {
    id: "incident-response",
    category: "Operations",
    title: "Incident response process",
    summary:
      "An internal process exists for platform operations incidents. Customer notification terms are defined per contract.",
    status: "current",
    last_verified: "2026-07-30",
  },
  {
    id: "sso-scim",
    category: "Identity",
    title: "Single sign-on (SSO) and SCIM provisioning",
    summary:
      "Available as a configurable enterprise option during onboarding; depends on plan and identity provider.",
    status: "configurable",
    last_verified: "2026-07-30",
  },
  {
    id: "data-retention",
    category: "Data",
    title: "Data retention configuration",
    summary:
      "Retention periods for evidence, logs, and account data are defined by customer agreement and implementation scope.",
    status: "configurable",
    last_verified: "2026-07-30",
  },
  {
    id: "subprocessor-transparency",
    category: "Data",
    title: "Subprocessor transparency",
    summary:
      "Subprocessor details are available on request for active procurement and customer review. This page does not publish a public vendor list.",
    status: "configurable",
    last_verified: "2026-07-30",
  },
  {
    id: "third-party-certification",
    category: "Assurance",
    title: "Formal third-party certification",
    summary:
      "Formal third-party certification (for example SOC 2 or ISO 27001) is not claimed on this website. If certification is completed, scope and dates will be published with the same specificity as other controls.",
    status: "not_claimed",
    last_verified: "2026-07-30",
  },
];
