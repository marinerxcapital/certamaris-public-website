/**
 * Product hierarchy and platform module content for CertaMaris marketing.
 * Status labels are deliberate — only publish verified maturity claims.
 */

import { productProofScreens, type ProductProofScreen } from "@/lib/product-screens";

export type ProductMaturity = "current" | "configurable" | "planned" | "preview";

export type IntegrationAvailability =
  | "available"
  | "configurable"
  | "custom"
  | "planned"
  | "not_supported";

export type ProductModule = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  maturity: ProductMaturity;
  buyer: string;
  problem: string;
  workflow: string[];
  capabilities: { title: string; body: string; maturity?: ProductMaturity }[];
  inputs: string[];
  outputs: string[];
  limitations: string[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
  screenKey?: keyof typeof productProofScreens;
};

export type HierarchyLevel = {
  id: string;
  title: string;
  summary: string;
  href: string;
  bullets: string[];
};

export type TraceStep = {
  id: string;
  title: string;
  detail: string;
};

/** Full assurance traceability chain (marketing-accurate). */
export const TRACEABILITY_CHAIN: TraceStep[] = [
  {
    id: "requirement",
    title: "Requirement",
    detail: "Official or internal obligation text kept versioned and distinct from interpretation.",
  },
  {
    id: "applicability",
    title: "Applicability",
    detail: "Human-set scope: which vessels, systems, and engagements the requirement touches.",
  },
  {
    id: "control",
    title: "Control",
    detail: "Implemented safeguard or procedure mapped to the requirement with ownership context.",
  },
  {
    id: "assessment",
    title: "Assessment",
    detail: "Planned and performed review work against the mapped controls and scope.",
  },
  {
    id: "evidence",
    title: "Evidence",
    detail: "Artifacts with custodian, version, sufficiency review, and freshness state.",
  },
  {
    id: "finding",
    title: "Finding",
    detail: "Observed condition linked to criterion, evidence, and consequence.",
  },
  {
    id: "risk",
    title: "Risk",
    detail: "Treatment or acceptance decision with authority, rationale, and review cadence.",
  },
  {
    id: "corrective-action",
    title: "Corrective action",
    detail: "Owned remediation with due date, dependencies, and verification evidence.",
  },
  {
    id: "qa",
    title: "QA",
    detail: "Independent review of package completeness before controlled release.",
  },
  {
    id: "readiness-package",
    title: "Released readiness package",
    detail: "Scope, evidence, findings, actions, and plan crosswalks compiled for inspection.",
  },
];

export const PLATFORM_HIERARCHY: HierarchyLevel[] = [
  {
    id: "corporate",
    title: "CertaMaris Corporate Administration",
    summary:
      "Internal control plane for client provisioning, portfolio visibility, support access, and platform operations — not a customer-facing workspace.",
    href: "/platform/corporate-control-plane",
    bullets: [
      "Cross-client portfolio and engagement visibility",
      "Client and vessel provisioning workflows",
      "Time-bound, audited support access sessions",
      "Role boundaries between CertaMaris staff and customer tenants",
    ],
  },
  {
    id: "client",
    title: "Client Company / Fleet Portal",
    summary:
      "Tenant-isolated company workspace for fleet posture, users and roles, assessments, evidence, findings, plans, and released deliverables.",
    href: "/platform/client-company-portal",
    bullets: [
      "Company administration and role-based access",
      "Fleet inventory and readiness roll-up",
      "Engagements, assessments, and controlled reports",
      "Logical isolation from other operators' data",
    ],
  },
  {
    id: "vessel",
    title: "Vessel portals",
    summary:
      "Vessel-scoped workspace for systems, controls, evidence, findings, actions, plans, and vessel-level reports — with individual auditable user identities.",
    href: "/platform/vessel-portal",
    bullets: [
      "Vessel identity and particulars",
      "Systems, assets, and control mappings",
      "Evidence, findings, and corrective actions",
      "Individual users — not a shared vessel password",
    ],
  },
  {
    id: "work-objects",
    title: "Systems, controls, evidence, findings, actions, reports",
    summary:
      "The operating objects of the assurance record, linked so reviewers can follow requirement → control → evidence → decision without reconstruction.",
    href: "/platform/assessments",
    bullets: [
      "Control and requirement mappings",
      "Evidence ledger with review decisions",
      "Findings and corrective-action chain",
      "Readiness packages and governance reports",
    ],
  },
];

export const MATURITY_BADGE: Record<
  ProductMaturity,
  { badgeStatus: "ok" | "caution" | "pending"; label: string }
> = {
  current: { badgeStatus: "ok", label: "Current" },
  configurable: { badgeStatus: "caution", label: "Configurable" },
  planned: { badgeStatus: "pending", label: "Planned" },
  preview: { badgeStatus: "caution", label: "Preview" },
};

export const INTEGRATION_AVAILABILITY_BADGE: Record<
  IntegrationAvailability,
  { badgeStatus: "ok" | "caution" | "critical" | "pending"; label: string }
> = {
  available: { badgeStatus: "ok", label: "Available" },
  configurable: { badgeStatus: "caution", label: "Configurable" },
  custom: { badgeStatus: "caution", label: "Custom" },
  planned: { badgeStatus: "pending", label: "Planned" },
  not_supported: { badgeStatus: "critical", label: "Not supported" },
};

export type IntegrationEntry = {
  id: string;
  category: string;
  title: string;
  summary: string;
  availability: IntegrationAvailability;
};

/** Integration catalogue — only verified categories and honest availability. */
export const integrationsCatalogue: IntegrationEntry[] = [
  {
    id: "identity-rbac",
    category: "Identity",
    title: "Application identity and RBAC",
    summary:
      "Authenticated users with role- and object-scoped access (organization, fleet, vessel). Individual identities are required for auditable actions.",
    availability: "available",
  },
  {
    id: "sso",
    category: "Identity",
    title: "Enterprise SSO / SCIM",
    summary:
      "Enterprise single sign-on and directory provisioning are planned. Confirm current identity options and roadmap timing during procurement.",
    availability: "planned",
  },
  {
    id: "email-notifications",
    category: "Email",
    title: "Transactional email",
    summary:
      "Email delivery for invitations, notifications, and operational messages is configured per production environment. Provider selection is environment-specific.",
    availability: "configurable",
  },
  {
    id: "document-storage",
    category: "Document storage",
    title: "Evidence and document storage",
    summary:
      "Evidence artifacts and controlled documents are stored with the production object store configured for the tenant environment.",
    availability: "available",
  },
  {
    id: "apis",
    category: "APIs",
    title: "Platform APIs",
    summary:
      "Authenticated platform APIs support portal hierarchy, fleet, vessel, and assurance workflows used by the application. Public partner API programs are engagement-scoped.",
    availability: "available",
  },
  {
    id: "imports",
    category: "Imports",
    title: "Structured data import",
    summary:
      "Existing evidence, findings, vessel inventories, and plan content can be ingested into the controlled structure during onboarding. Reviewers still judge sufficiency and currency.",
    availability: "configurable",
  },
  {
    id: "dependency-track",
    category: "SBOM / vulnerability",
    title: "Dependency-Track (private)",
    summary:
      "Private Dependency-Track integration supports SBOM and vulnerability assurance workflows where enabled for the engagement. Not a public multi-tenant service.",
    availability: "configurable",
  },
  {
    id: "sbom",
    category: "SBOM / vulnerability",
    title: "SBOM intake and project linkage",
    summary:
      "Software bill of materials can be associated with projects and vessels for vulnerability review when SBOM tooling is configured.",
    availability: "configurable",
  },
  {
    id: "report-export",
    category: "Report export",
    title: "Readiness and governance export",
    summary:
      "Controlled reports and readiness package views can be exported for board, insurer, or survey conversations from approved records.",
    availability: "available",
  },
  {
    id: "siem",
    category: "SIEM",
    title: "SIEM / security operations feeds",
    summary:
      "Live SIEM connectors are not published as a standard product feature. Event and log integration may be discussed as a planned or custom engagement item.",
    availability: "planned",
  },
  {
    id: "maritime-erp",
    category: "Maritime ERP",
    title: "Maritime ERP / fleet management systems",
    summary:
      "Native live connectors to maritime ERP platforms are not claimed. Structured import and custom integration paths may be scoped per engagement.",
    availability: "custom",
  },
  {
    id: "qhse-sms",
    category: "QHSE / SMS",
    title: "SMS / QHSE software",
    summary:
      "CertaMaris does not replace SMS software. Cross-system links or imports may be configured; the SMS remains the operator's controlled management system.",
    availability: "custom",
  },
];

export const productModules: ProductModule[] = [
  {
    slug: "corporate-control-plane",
    title: "Corporate Control Plane",
    eyebrow: "Platform · Corporate",
    headline: "Internal administration across clients, vessels, and support access.",
    intro:
      "The Corporate Control Plane supports portfolio visibility, client and vessel provisioning, assurance delivery, and audited support sessions.",
    maturity: "current",
    buyer: "CertaMaris internal operators, delivery leads, and platform administrators",
    problem:
      "Multi-client maritime assurance programs need controlled provisioning and support access without mixing tenant data or relying on ad-hoc admin shortcuts.",
    workflow: [
      "Review cross-client portfolio and engagement state",
      "Provision client company workspaces and vessel records",
      "Assign internal delivery roles within policy boundaries",
      "Open time-bound, audited support access when a customer authorizes help",
      "Track platform health signals relevant to delivery operations",
    ],
    capabilities: [
      {
        title: "Client portfolio overview",
        body: "Internal view of client companies and high-level engagement state without collapsing tenant isolation.",
        maturity: "current",
      },
      {
        title: "Client and vessel provisioning",
        body: "Create and maintain client organizations and vessel records that feed the customer hierarchy.",
        maturity: "current",
      },
      {
        title: "Support access sessions",
        body: "Time-bound, audited support sessions — no silent impersonation and no permanent shared credentials.",
        maturity: "current",
      },
      {
        title: "Commercial visibility",
        body: "Engagement-oriented commercial fields where configured; not a full ERP or billing system.",
        maturity: "configurable",
      },
      {
        title: "Platform health signals",
        body: "Operational signals useful to delivery teams. Public status pages are separate from this internal plane.",
        maturity: "preview",
      },
    ],
    inputs: [
      "Authorized internal operators",
      "Client company and vessel particulars",
      "Engagement and delivery assignments",
      "Customer authorization for support access",
    ],
    outputs: [
      "Provisioned client workspaces",
      "Vessel records ready for fleet membership",
      "Audited support-session history",
      "Internal portfolio visibility for delivery",
    ],
    limitations: [
      "Does not grant CertaMaris unrestricted access to customer evidence without policy and session controls",
      "Does not replace customer company administration or SMS ownership",
      "Does not publish private multi-tenant internals on the marketing site",
      "Not a substitute for production monitoring status pages",
    ],
    faqs: [
      {
        question: "Can customers log into the Corporate Control Plane?",
        answer:
          "No. The corporate plane is for authorized CertaMaris staff. Customers work in the client company and vessel portals.",
      },
      {
        question: "How does support access work?",
        answer:
          "Support access is session-based, time-bound, and audited. It is not a shared vessel password and is not silent impersonation.",
      },
    ],
    related: [
      { href: "/platform/client-company-portal", label: "Client Company Portal" },
      { href: "/platform/vessel-portal", label: "Vessel Portal" },
      { href: "/security", label: "Security & Trust" },
      { href: "/implementation", label: "Implementation" },
    ],
    screenKey: "corporateControlPlane",
  },
  {
    slug: "client-company-portal",
    title: "Client Company Portal",
    eyebrow: "Platform · Company",
    headline: "A tenant-isolated workspace for the company that owns the fleet.",
    intro:
      "The Client Company Portal is an operator workspace for fleets, users, engagements, assessments, evidence, findings, plans, and deliverables.",
    maturity: "current",
    buyer: "Ship owners, operators, company admins, technical managers, and DPAs",
    problem:
      "Fleet cyber work scatters across drives, email, and vessel-specific binders, so company leadership cannot see a consistent readiness record.",
    workflow: [
      "Administer company users and role scope",
      "Maintain fleet inventory and vessel membership",
      "Run engagements and assessments against applicable scope",
      "Collect evidence and track findings to corrective actions",
      "Release readiness packages and governance reports from approved work",
    ],
    capabilities: [
      {
        title: "Isolated company workspace",
        body: "Tenant isolation so operators work their fleet, not another customer's data.",
        maturity: "current",
      },
      {
        title: "Users and roles",
        body: "Role-based access at organization, fleet, and vessel scope with individual identities.",
        maturity: "current",
      },
      {
        title: "Fleet and engagement view",
        body: "Fleet inventory, readiness signals, and engagement work in one company record.",
        maturity: "current",
      },
      {
        title: "Assurance work products",
        body: "Assessments, evidence, findings, actions, plans, and released deliverables linked to the same hierarchy.",
        maturity: "current",
      },
      {
        title: "Company settings",
        body: "Administrative settings for the tenant environment as configured for the engagement.",
        maturity: "configurable",
      },
    ],
    inputs: [
      "Company structure and accountable roles",
      "Vessel inventory and particulars",
      "Applicable requirements as determined by qualified personnel",
      "Existing evidence and assessment material where migrating",
    ],
    outputs: [
      "Company-scoped fleet readiness view",
      "Controlled evidence and findings ledger",
      "Corrective-action register",
      "Released readiness packages and governance reports",
    ],
    limitations: [
      "Does not replace the Safety Management System or Document of Compliance process",
      "Does not decide regulatory applicability",
      "Does not guarantee survey or inspection outcomes",
      "Does not provide shared vessel credentials",
    ],
    faqs: [
      {
        question: "Is each operator's data isolated?",
        answer:
          "Yes. Customer data is logically isolated with role-based access at organization, fleet, and vessel levels.",
      },
      {
        question: "Can multiple technical managers work in one company?",
        answer:
          "Yes. Role-based access supports company, fleet, and vessel scope so people see the work they are accountable for.",
      },
    ],
    related: [
      { href: "/platform/fleet-management", label: "Fleet Management" },
      { href: "/platform/vessel-portal", label: "Vessel Portal" },
      { href: "/solutions/fleet-cyber-compliance", label: "Fleet Cyber Compliance" },
      { href: "/who-we-serve/operators", label: "Operators" },
    ],
    screenKey: "clientCompanyPortal",
  },
  {
    slug: "fleet-management",
    title: "Fleet Management",
    eyebrow: "Platform · Fleet",
    headline: "Vessel inventory, readiness, risks, and deadlines across the fleet.",
    intro:
      "Fleet Management keeps vessel inventory, readiness signals, risks, actions, regulatory scope, and reporting access in one company-controlled structure.",
    maturity: "current",
    buyer: "Fleet managers, technical managers, DPAs, and owner leadership",
    problem:
      "Multi-vessel operators cannot answer fleet readiness questions without chasing vessel-by-vessel status from different systems.",
    workflow: [
      "Maintain vessel inventory and criticality",
      "Compare readiness and open work across vessels",
      "Track risks, actions, and deadlines at fleet scale",
      "Apply regulatory scope consistently where vessels share profiles",
      "Export fleet posture for governance conversations",
    ],
    capabilities: [
      {
        title: "Vessel inventory",
        body: "Fleet and facilities register with status, location, criticality, and review cadence.",
        maturity: "current",
      },
      {
        title: "Fleet comparison",
        body: "Side-by-side visibility into readiness gaps, findings, and action aging across vessels.",
        maturity: "current",
      },
      {
        title: "Deadline and action roll-up",
        body: "Open corrective actions and review deadlines visible without losing vessel detail.",
        maturity: "current",
      },
      {
        title: "Regulatory scope at fleet level",
        body: "Shared applicability records for similar operating profiles with vessel-specific detail underneath.",
        maturity: "current",
      },
      {
        title: "Access model",
        body: "Fleet and vessel membership control who can see and change which records.",
        maturity: "current",
      },
    ],
    inputs: [
      "Vessel particulars and membership",
      "Assigned technical managers and DPAs",
      "Applicability decisions for the fleet profile",
      "Live findings, evidence, and action status",
    ],
    outputs: [
      "Fleet inventory with review cadence",
      "Readiness and gap comparison views",
      "Open risk and action roll-ups",
      "Governance-ready fleet summaries",
    ],
    limitations: [
      "Does not invent vessel compliance scores without underlying records",
      "Does not replace class or flag fleet systems",
      "Does not auto-apply requirements to every vessel without human applicability judgment",
    ],
    faqs: [
      {
        question: "Can we filter by technical manager or region?",
        answer:
          "Fleet views support operational filtering by the attributes maintained on vessel and organization records for the engagement.",
      },
      {
        question: "Does fleet status replace vessel detail?",
        answer:
          "No. Fleet roll-ups preserve drill-down into vessel-level evidence, findings, and actions.",
      },
    ],
    related: [
      { href: "/platform/client-company-portal", label: "Client Company Portal" },
      { href: "/platform/vessel-portal", label: "Vessel Portal" },
      { href: "/solutions/fleet-cyber-compliance", label: "Fleet Cyber Compliance" },
      { href: "/solutions/executive-board-reporting", label: "Executive & Board Reporting" },
    ],
    screenKey: "clientFleet",
  },
  {
    slug: "vessel-portal",
    title: "Vessel Portal",
    eyebrow: "Platform · Vessel",
    headline: "Vessel-scoped assurance work with individual auditable identities.",
    intro:
      "Each vessel portal holds systems, assessments, evidence, findings, risks, actions, plans, and reports with individual user accounts.",
    maturity: "current",
    buyer: "Vessel masters and officers, vessel IT/OT contacts, technical managers, and DPAs",
    problem:
      "Vessel cyber work is often trapped in local folders or a single shared login, so ownership and audit history cannot be defended.",
    workflow: [
      "Confirm vessel identity and particulars",
      "Maintain systems, assets, and control mappings",
      "Execute assessments and evidence requests",
      "Record findings, risks, and corrective actions",
      "Maintain plans and vessel-scoped reports under role permissions",
    ],
    capabilities: [
      {
        title: "Vessel identity",
        body: "Particulars and profile fields that anchor the vessel in the company fleet.",
        maturity: "current",
      },
      {
        title: "Individual vessel users",
        body: "Vessel membership for named users with auditable actions — not a shared password model.",
        maturity: "current",
      },
      {
        title: "Systems and assets",
        body: "OT/IT systems linked to controls, evidence, and findings.",
        maturity: "current",
      },
      {
        title: "Assurance objects",
        body: "Assessments, evidence, findings, risks, actions, and plans in vessel scope.",
        maturity: "current",
      },
      {
        title: "SBOM / vulnerability linkage",
        body: "Where Dependency-Track or SBOM workflows are configured, projects can link to vessel context.",
        maturity: "configurable",
      },
      {
        title: "Incidents and training records",
        body: "Incident and training linkage for continuous assurance where configured for the engagement.",
        maturity: "preview",
      },
    ],
    inputs: [
      "Vessel particulars and membership assignments",
      "System inventory and control owners",
      "Evidence submissions from vessel and shore teams",
      "Assessment scope set by accountable personnel",
    ],
    outputs: [
      "Vessel-scoped evidence and findings ledger",
      "Corrective actions with verification trail",
      "Cybersecurity plan work product for the vessel",
      "Vessel readiness materials for company release",
    ],
    limitations: [
      "Does not replace bridge or engine-room operational systems",
      "Does not use a shared vessel password as the access model",
      "Does not guarantee class survey outcomes",
      "Vessel dashboard aggregates may show honest unavailable states until engagement filters are fully wired",
    ],
    faqs: [
      {
        question: "Do vessel crews share one login?",
        answer:
          "No. Human users receive individual auditable identities with vessel membership. Shared vessel passwords are not the product model.",
      },
      {
        question: "Can shore staff access a vessel portal?",
        answer:
          "Yes, when granted vessel or company scope. Access is role-based and auditable.",
      },
    ],
    related: [
      { href: "/platform/fleet-management", label: "Fleet Management" },
      { href: "/platform/evidence", label: "Evidence Management" },
      { href: "/who-we-serve/vessel-masters-officers", label: "Vessel Masters & Officers" },
      { href: "/solutions/vessel-cyber-risk-management", label: "Vessel Cyber-Risk Management" },
    ],
    screenKey: "vesselPortal",
  },
  {
    slug: "assessments",
    title: "Assessments",
    eyebrow: "Platform · Assessments",
    headline: "Plan, perform, and review assessment work against controlled scope.",
    intro:
      "Assessments cover planning, questionnaires, control testing, evidence mapping, review, assignments, and outputs, with conclusions left to reviewers.",
    maturity: "current",
    buyer: "Compliance leads, DPAs, technical managers, and assurance reviewers",
    problem:
      "Assessment workpapers often live apart from evidence and findings, so the next review restarts from scratch.",
    workflow: [
      "Define scope, basis, and assignments",
      "Run questionnaire and control-testing procedures",
      "Map evidence to controls under review",
      "Record observations and provisional results",
      "Complete independent review before package use",
    ],
    capabilities: [
      {
        title: "Assessment planning",
        body: "Scope, procedures, owners, and schedule recorded as controlled work.",
        maturity: "current",
      },
      {
        title: "Control testing and questionnaires",
        body: "Structured procedures linked to mapped requirements and controls.",
        maturity: "current",
      },
      {
        title: "Evidence mapping during assessment",
        body: "Evidence attached to the controls and criteria under test.",
        maturity: "current",
      },
      {
        title: "Review and results",
        body: "Observations and results separated from release decisions.",
        maturity: "current",
      },
    ],
    inputs: [
      "Applicability and scope decisions",
      "Control mappings and system inventory",
      "Assigned assessors and reviewers",
      "Available evidence and prior findings",
    ],
    outputs: [
      "Assessment workpapers",
      "Mapped evidence set",
      "Findings candidates and confirmed findings",
      "Inputs to readiness packages",
    ],
    limitations: [
      "Does not replace independent auditor or class surveyor judgment",
      "Does not auto-conclude compliance",
      "Does not invent applicability",
    ],
    faqs: [
      {
        question: "Can prior assessments be imported?",
        answer:
          "Yes. Prior work can be ingested; reviewers still determine whether it is current and sufficient.",
      },
    ],
    related: [
      { href: "/platform/evidence", label: "Evidence Management" },
      { href: "/platform/findings-corrective-actions", label: "Findings & Corrective Actions" },
      { href: "/solutions/audit-survey-readiness", label: "Audit & Survey Readiness" },
    ],
    screenKey: "assessments",
  },
  {
    slug: "evidence",
    title: "Evidence Management",
    eyebrow: "Platform · Evidence",
    headline: "Requests, submissions, sufficiency, freshness, and audit history in one ledger.",
    intro:
      "Evidence Management covers requests, intake, mapping, sufficiency, freshness, rejection, resubmission, and audit history, so artifacts stay reviewable.",
    maturity: "current",
    buyer: "Evidence custodians, DPAs, technical managers, and reviewers",
    problem:
      "Without provenance and review decisions, evidence ages into unusable files and survey week becomes reconstruction.",
    workflow: [
      "Issue evidence requests against mapped controls",
      "Intake submissions with custodian and version",
      "Map artifacts to requirements and controls",
      "Review sufficiency and freshness",
      "Reject or accept with resubmission when needed",
    ],
    capabilities: [
      {
        title: "Evidence requests",
        body: "Targeted requests tied to controls and owners rather than generic document dumps.",
        maturity: "current",
      },
      {
        title: "Coverage and freshness",
        body: "Visibility into missing support and aging before review cycles.",
        maturity: "current",
      },
      {
        title: "Review decisions",
        body: "Accept, reject, or request resubmission with retained history.",
        maturity: "current",
      },
      {
        title: "Provenance ledger",
        body: "Custodian, version, submission date, and related requirement on the record.",
        maturity: "current",
      },
    ],
    inputs: [
      "Control mappings and request templates",
      "Custodian assignments",
      "Submitted artifacts from vessel and shore teams",
      "Reviewer sufficiency criteria",
    ],
    outputs: [
      "Versioned evidence ledger",
      "Coverage and freshness views",
      "Accepted support for readiness packages",
      "Audit history of decisions",
    ],
    limitations: [
      "Sufficiency remains a human judgment",
      "Does not replace document-management systems wholesale",
      "Does not guarantee that accepted evidence will satisfy every surveyor",
    ],
    faqs: [
      {
        question: "What makes evidence 'sufficient'?",
        answer:
          "Relevance, reliability, completeness, and reviewer judgment against the controlling criterion — not mere file arrival.",
      },
    ],
    related: [
      { href: "/platform/assessments", label: "Assessments" },
      { href: "/platform/findings-corrective-actions", label: "Findings & Corrective Actions" },
      { href: "/solutions/evidence-findings-management", label: "Evidence & Findings Management" },
    ],
    screenKey: "evidenceCoverage",
  },
  {
    slug: "findings-corrective-actions",
    title: "Findings & Corrective Actions",
    eyebrow: "Platform · Findings · CAPA",
    headline: "Findings with ownership. Actions with verification before closure.",
    intro:
      "Findings capture condition, criterion, evidence, and consequence. Corrective actions stay owned, time-bound, and linked to verification evidence.",
    maturity: "current",
    buyer: "Reviewers, action owners, DPAs, and technical managers",
    problem:
      "Findings disappear into email; closures happen without verification evidence; aging is invisible until survey.",
    workflow: [
      "Create findings from assessment or operational observation",
      "Assign severity, owner, and risk links",
      "Plan remediation with due dates and dependencies",
      "Attach verification evidence",
      "Close only after independent verification criteria are met",
    ],
    capabilities: [
      {
        title: "Structured findings",
        body: "Condition, criterion, evidence, and consequence kept distinct.",
        maturity: "current",
      },
      {
        title: "Corrective-action register",
        body: "Owners, priorities, due dates, and status through verification.",
        maturity: "current",
      },
      {
        title: "Aging and escalation",
        body: "Overdue work remains visible at vessel and fleet level.",
        maturity: "current",
      },
      {
        title: "Risk linkage",
        body: "Findings can connect to residual risk treatment decisions.",
        maturity: "current",
      },
    ],
    inputs: [
      "Assessment results and observations",
      "Evidence supporting the condition",
      "Action owners and due dates",
      "Verification evidence for closure",
    ],
    outputs: [
      "Findings register",
      "Corrective-action plan with verification trail",
      "Aging views for fleet leadership",
      "Closed-action history for readiness packages",
    ],
    limitations: [
      "Does not force operational change outside the company process",
      "Does not accept residual risk on behalf of accountable officers",
      "Does not guarantee closure will satisfy external authorities",
    ],
    faqs: [
      {
        question: "Can a finding close without verification evidence?",
        answer:
          "The product model keeps verification evidence as part of responsible closure. Accountable reviewers still own the final decision.",
      },
    ],
    related: [
      { href: "/platform/evidence", label: "Evidence Management" },
      { href: "/solutions/corrective-action-verification", label: "Corrective-Action Verification" },
      { href: "/platform/reports-readiness", label: "Reports & Readiness" },
    ],
    screenKey: "correctiveActions",
  },
  {
    slug: "cybersecurity-plans",
    title: "Cybersecurity Plans",
    eyebrow: "Platform · Plans",
    headline: "Version-controlled plan content assembled from approved facts.",
    intro:
      "Cybersecurity Plan work products support templates, applicability, collaboration, review, versioning, and controlled release from approved facts.",
    maturity: "current",
    buyer: "DPAs, technical managers, cybersecurity leads, and company officers",
    problem:
      "Plan documents drift from evidence and findings; version confusion appears during survey week.",
    workflow: [
      "Start from templates and applicability context",
      "Collaborate on plan sections with accountable owners",
      "Crosswalk plan content to controls and evidence",
      "Review and version the controlled record",
      "Release only approved plan states",
    ],
    capabilities: [
      {
        title: "Templates and structure",
        body: "Plan structure that can be adapted to company SMS and engagement needs.",
        maturity: "current",
      },
      {
        title: "Versioning and release state",
        body: "Clear distinction between draft, review, and released plan content.",
        maturity: "current",
      },
      {
        title: "Crosswalk to controls",
        body: "Plan sections linked to the same requirement and control record used operationally.",
        maturity: "current",
      },
      {
        title: "Collaboration and review",
        body: "Owner and reviewer participation without overwriting history.",
        maturity: "current",
      },
    ],
    inputs: [
      "Company and vessel scope",
      "Approved control and evidence facts",
      "Accountable plan authors and reviewers",
      "SMS cyber procedures where applicable",
    ],
    outputs: [
      "Version-controlled cybersecurity plan work product",
      "Release history",
      "Crosswalk to controls and evidence",
      "Inputs to readiness packages",
    ],
    limitations: [
      "Does not replace the company's SMS document control process by itself",
      "Does not auto-generate a class-approved plan",
      "Does not constitute legal or regulatory advice",
    ],
    faqs: [
      {
        question: "Is the plan automatically class-approved?",
        answer:
          "No. Classification societies and flag administrations retain authority. The platform structures plan work and version control.",
      },
    ],
    related: [
      { href: "/solutions/cybersecurity-plan-management", label: "Cybersecurity Plan Management" },
      { href: "/platform/reports-readiness", label: "Reports & Readiness" },
      { href: "/compliance", label: "Compliance" },
    ],
    screenKey: "cybersecurityPlans",
  },
  {
    slug: "regulatory-intelligence",
    title: "Regulatory Intelligence",
    eyebrow: "Platform · Regulatory",
    headline: "Source text, versions, and impact — without replacing human applicability judgment.",
    intro:
      "Regulatory Intelligence keeps official sources, versions, mappings, and follow-up work distinct; humans decide applicability and the platform shows impact.",
    maturity: "current",
    buyer: "Compliance leads, DPAs, technical managers, and cybersecurity leads",
    problem:
      "IMO, IACS, and flag circulars change on their own schedules; impact is discovered too late.",
    workflow: [
      "Record source text and clause versions distinctly",
      "Map requirements to controls and plan sections",
      "Surface impact when a mapped version changes",
      "Assign human review of applicability and follow-up",
      "Retain historical response records",
    ],
    capabilities: [
      {
        title: "Versioned requirement records",
        body: "Source, clause, and version kept separate from interpretation.",
        maturity: "current",
      },
      {
        title: "Impact views",
        body: "Controls, evidence, and plan sections linked to a changed requirement.",
        maturity: "current",
      },
      {
        title: "Follow-up work",
        body: "Owned review tasks when a change may affect fleet scope.",
        maturity: "current",
      },
      {
        title: "Automated regulatory monitoring",
        body: "Broader automated bulletin ingestion beyond mapped sources is not claimed as universal.",
        maturity: "planned",
      },
    ],
    inputs: [
      "Mapped requirement sources (e.g. IMO MSC.428(98), IACS UR E26/E27)",
      "Control and plan mappings",
      "Accountable reviewers for applicability",
    ],
    outputs: [
      "Version history of mapped requirements",
      "Impact lists for affected vessels and controls",
      "Follow-up task records",
      "Historical change response trail",
    ],
    limitations: [
      "Does not issue applicability rulings",
      "Does not replace official texts",
      "Does not claim complete coverage of every flag circular worldwide",
      "Official IMO, IACS, flag, and class texts control",
    ],
    faqs: [
      {
        question: "Does CertaMaris decide what applies to our vessels?",
        answer:
          "No. Applicability is a human determination. The platform structures mapped work and impact review once scope is set.",
      },
    ],
    related: [
      { href: "/solutions/regulatory-change-management", label: "Regulatory Change Management" },
      { href: "/solutions/imo-msc-428-98", label: "IMO MSC.428(98)" },
      { href: "/compliance", label: "Compliance overview" },
    ],
    screenKey: "requirementMapping",
  },
  {
    slug: "continuous-assurance",
    title: "Continuous Assurance",
    eyebrow: "Platform · Assurance",
    headline: "Freshness, aging, exceptions, and drift between assessment cycles.",
    intro:
      "Continuous Assurance focuses on evidence freshness, action aging, control drift, exceptions, and readiness signals between reviews.",
    maturity: "current",
    buyer: "DPAs, technical managers, cybersecurity leads, and fleet leadership",
    problem:
      "Point-in-time assessments go stale; open actions age; exceptions lose owners between cycles.",
    workflow: [
      "Monitor evidence freshness and coverage gaps",
      "Track corrective-action aging",
      "Record exceptions with review cadence",
      "Surface control drift signals where configured",
      "Feed continuous signals into the next assessment cycle",
    ],
    capabilities: [
      {
        title: "Evidence freshness",
        body: "Visibility into aging support before the next review.",
        maturity: "current",
      },
      {
        title: "Action aging",
        body: "Overdue and approaching-due corrective actions at vessel and fleet level.",
        maturity: "current",
      },
      {
        title: "Exceptions register",
        body: "Known exceptions retained on the control record with review context.",
        maturity: "current",
      },
      {
        title: "Control drift signals",
        body: "Signals that mapped implementation context may no longer match operational reality.",
        maturity: "preview",
      },
      {
        title: "Threat / vulnerability linkage",
        body: "Where SBOM and Dependency-Track are configured, vulnerability context can inform assurance work.",
        maturity: "configurable",
      },
    ],
    inputs: [
      "Live evidence and action records",
      "Exception and risk-acceptance decisions",
      "Optional SBOM / vulnerability data when configured",
    ],
    outputs: [
      "Freshness and aging views",
      "Exception and drift signals for review",
      "Inputs to recurring assessment schedules",
      "Governance-facing posture trends from traceable records",
    ],
    limitations: [
      "Does not claim 24/7 autonomous compliance",
      "Preview drift analytics are not universal production guarantees",
      "Does not replace operational security monitoring (SIEM) unless separately integrated",
    ],
    faqs: [
      {
        question: "Is continuous assurance automatic certification?",
        answer:
          "No. It keeps the controlled record current enough for human review and readiness preparation.",
      },
    ],
    related: [
      { href: "/platform/evidence", label: "Evidence Management" },
      { href: "/platform/findings-corrective-actions", label: "Findings & Corrective Actions" },
      { href: "/solutions/sbom-vulnerability-assurance", label: "SBOM & Vulnerability Assurance" },
    ],
    screenKey: "continuousAssurance",
  },
  {
    slug: "reports-readiness",
    title: "Reports & Readiness Packages",
    eyebrow: "Platform · Reports",
    headline: "QA, approval, controlled release, and export from approved work.",
    intro:
      "Readiness packages and governance reports compile scope, evidence, findings, actions, exceptions, and reviewer notes with QA and controlled release.",
    maturity: "current",
    buyer: "DPAs, technical managers, executives, and authorized external reviewers",
    problem:
      "Survey and board packages are rebuilt from scratch under time pressure, often from inconsistent sources.",
    workflow: [
      "Assemble package sections from live controlled records",
      "Flag completeness gaps before release",
      "Complete QA and owner approval",
      "Release a controlled package version",
      "Export for survey, board, or insurer conversations when authorized",
    ],
    capabilities: [
      {
        title: "Package assembly",
        body: "Sections with owners, progress, and supporting records.",
        maturity: "current",
      },
      {
        title: "QA and approval",
        body: "Independent review before controlled release.",
        maturity: "current",
      },
      {
        title: "Governance reporting",
        body: "Fleet posture, freshness, and decision queues without unsupported financial claims.",
        maturity: "current",
      },
      {
        title: "Export",
        body: "Export-ready views for authorized external conversations.",
        maturity: "current",
      },
    ],
    inputs: [
      "Approved evidence, findings, and actions",
      "Plan crosswalks and exceptions",
      "QA reviewers and release authority",
    ],
    outputs: [
      "Released readiness packages",
      "Governance reports",
      "Export artifacts for authorized sharing",
      "Release history for audit",
    ],
    limitations: [
      "Does not determine pass/fail of surveys or inspections",
      "Does not replace class or flag verification",
      "Does not invent metrics or certifications",
    ],
    faqs: [
      {
        question: "Does a released package mean we passed survey?",
        answer:
          "No. A released package is a controlled preparation artifact. Classification societies, flag administrations, and auditors determine outcomes.",
      },
    ],
    related: [
      { href: "/solutions/audit-survey-readiness", label: "Audit & Survey Readiness" },
      { href: "/solutions/executive-board-reporting", label: "Executive & Board Reporting" },
      { href: "/platform/cybersecurity-plans", label: "Cybersecurity Plans" },
    ],
    screenKey: "controlledRelease",
  },
  {
    slug: "integrations",
    title: "Integrations",
    eyebrow: "Platform · Integrations",
    headline: "Identity, storage, APIs, imports, SBOM, and export — labeled honestly.",
    intro:
      "The integrations catalogue labels Available, Configurable, Custom, Planned, and Not Supported categories; unverified connectors are not claimed.",
    maturity: "current",
    buyer: "IT/OT leads, procurement, security, and implementation sponsors",
    problem:
      "Buyers need a truthful integration picture without marketing fiction about connectors that are not live.",
    workflow: [
      "Identify identity, storage, and import needs during discovery",
      "Configure available platform APIs and storage",
      "Enable Dependency-Track / SBOM where the engagement requires it",
      "Scope custom ERP or QHSE links only when justified",
      "Export reports from controlled records",
    ],
    capabilities: integrationsCatalogue.map((item) => ({
      title: item.title,
      body: item.summary,
      maturity:
        item.availability === "available"
          ? ("current" as ProductMaturity)
          : item.availability === "configurable"
            ? ("configurable" as ProductMaturity)
            : item.availability === "planned"
              ? ("planned" as ProductMaturity)
              : item.availability === "custom"
                ? ("configurable" as ProductMaturity)
                : ("planned" as ProductMaturity),
    })),
    inputs: [
      "Identity and access requirements",
      "Existing document and evidence sources",
      "SBOM / vulnerability tooling needs",
      "Export and reporting destinations",
    ],
    outputs: [
      "Configured identity and storage paths",
      "Import plans for migration",
      "Optional private Dependency-Track linkage",
      "Report export channels",
    ],
    limitations: [
      "Live SIEM connector not currently claimed",
      "Live maritime ERP connector not currently claimed",
      "Custom work is engagement-scoped, not a free universal adapter",
      "CertaMaris does not replace SMS/QHSE systems",
    ],
    faqs: [
      {
        question: "Do you integrate with our SIEM today?",
        answer:
          "Live SIEM connectors are Planned, not published as a standard available feature. Discuss requirements during procurement.",
      },
      {
        question: "Is Dependency-Track included?",
        answer:
          "Private Dependency-Track support is Configurable where enabled for the engagement. It is not a public multi-tenant service on a customer domain.",
      },
    ],
    related: [
      { href: "/platform", label: "Platform overview" },
      { href: "/security", label: "Security & Trust" },
      { href: "/implementation", label: "Implementation" },
      { href: "/solutions/sbom-vulnerability-assurance", label: "SBOM & Vulnerability Assurance" },
    ],
    screenKey: "integrations",
  },
];

export function getProductModule(slug: string): ProductModule | undefined {
  return productModules.find((m) => m.slug === slug);
}

export function getProductScreen(module: ProductModule): ProductProofScreen | undefined {
  if (!module.screenKey) return undefined;
  return productProofScreens[module.screenKey];
}

export const platformOverview = {
  title: "Platform",
  headline: "Maritime cyber compliance across company, fleet, vessel, and controlled work products.",
  intro:
    "CertaMaris is evidence-first maritime assurance software: corporate administration, client company and fleet portals, vessel portals, and the traceability chain from requirement to released readiness package — with individual auditable identities and honest product maturity labels.",
  workProducts: [
    {
      title: "Applicability & scope record",
      body: "Regulated entities, applicable requirements, and open scope questions set by qualified personnel.",
    },
    {
      title: "Controlled asset register",
      body: "Vessels, facilities, and OT/IT systems with owners and criticality.",
    },
    {
      title: "Assessment workpapers",
      body: "Scope, procedures, interviews, and observations kept distinct from conclusions.",
    },
    {
      title: "Evidence ledger",
      body: "Requests and submissions with custodian, version, review state, and related requirement.",
    },
    {
      title: "Cyber risk register",
      body: "Treatment decisions, acceptance authority, rationale, and review cadence.",
    },
    {
      title: "Corrective action plan",
      body: "Owned actions with target dates, dependencies, and verification before closure.",
    },
    {
      title: "Cybersecurity Plan work product",
      body: "Version-controlled plan content assembled from approved facts.",
    },
    {
      title: "Readiness package",
      body: "Scope, assessment basis, findings, actions, and plan crosswalks compiled for review.",
    },
  ],
};
