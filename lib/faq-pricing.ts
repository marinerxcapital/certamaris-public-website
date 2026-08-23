/**
 * FAQ categories + pricing comparison data for the marketing site.
 * Pricing is the finalized hybrid annual model: platform fee + contracted-vessel
 * licensing + separately priced assurance engagements.
 */

export { pricingCalculatorTiers, type PricingCalculatorTier } from "@/lib/pricing-calculator";

export type PricingTier = {
  id: "core" | "assurance" | "enterprise";
  name: string;
  audience: string;
  fleetGate: string;
  platformFee: string;
  vesselPrice: string;
  minimumNote: string;
  included: string[];
  excluded: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    id: "core",
    name: "Core",
    audience: "Small fleets",
    fleetGate: "1–9 vessels · 5-vessel billing minimum",
    platformFee: "$15,000 / year",
    vesselPrice: "$3,000 / vessel / year",
    minimumNote: "Minimum $30,000 ARR at five vessels.",
    included: [
      "Engagements and evidence collection",
      "Gap / risk register and corrective actions",
      "Standard report generation",
      "Standard IMO / IACS mappings",
      "Cyber Resilience Twin",
      "Unlimited customer users",
    ],
    excluded: [
      "CertaMaris QA sign-off",
      "SSO / SCIM",
      "API access",
      "Custom frameworks",
      "On-site work",
    ],
  },
  {
    id: "assurance",
    name: "Assurance",
    audience: "Growing fleets",
    fleetGate: "10–24 vessels · 10-vessel minimum",
    platformFee: "$24,000 / year",
    vesselPrice: "$3,000 / vessel / year",
    minimumNote: "Minimum $54,000 ARR at ten vessels.",
    included: [
      "Everything in Core",
      "One remotely QA-reviewed assessment report per contracted vessel annually",
      "Auditor / reviewer workspace",
      "Fleet-level dashboards",
      "Approval workflows",
      "Priority support",
    ],
    excluded: [
      "On-site assessments",
      "Custom SLA",
      "SSO / SCIM",
      "Bespoke integrations",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Large, multi-entity fleets",
    fleetGate: "25+ vessels · 25-vessel minimum",
    platformFee: "$48,000 / year",
    vesselPrice: "$2,400 / vessel / year",
    minimumNote: "Minimum $108,000 ARR at twenty-five vessels.",
    included: [
      "Everything in Assurance",
      "API access",
      "Multi-entity administration",
      "Custom framework mappings",
      "Configurable retention and enterprise security review",
      "Quarterly governance review",
      "Annual fleet executive report",
    ],
    excluded: [
      "On-site assessments",
      "Travel",
      "SSO / SCIM (planned)",
      "Formal certification or classification-society approval",
    ],
  },
];

export const PRICE_ANCHORS: { label: string; value: string }[] = [
  { label: "Core minimum", value: "$30,000 ARR for five vessels" },
  { label: "Assurance minimum", value: "$54,000 ARR for ten vessels" },
  { label: "Enterprise minimum", value: "$108,000 ARR for twenty-five vessels" },
  { label: "Additional remote assessment / QA-reviewed report", value: "$6,000 per vessel" },
  { label: "On-board assessment", value: "$15,000 per vessel plus travel and expenses" },
];

export type FaqCategoryId =
  | "product"
  | "implementation"
  | "security"
  | "regulatory"
  | "commercial"
  | "procurement";

export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategoryId;
};

export const FAQ_CATEGORIES: { id: FaqCategoryId; label: string; summary: string }[] = [
  {
    id: "product",
    label: "Product",
    summary: "What the platform does and does not do.",
  },
  {
    id: "implementation",
    label: "Implementation",
    summary: "Onboarding, data intake, and day-to-day use.",
  },
  {
    id: "security",
    label: "Security",
    summary: "Isolation, access control, and diligence materials.",
  },
  {
    id: "regulatory",
    label: "Regulatory",
    summary: "How CertaMaris relates to IMO, IACS, class, and flag.",
  },
  {
    id: "commercial",
    label: "Commercial",
    summary: "Packages, pricing basis, and engagement path.",
  },
  {
    id: "procurement",
    label: "Procurement",
    summary: "Security review, documents, and buying process.",
  },
];

export const categorizedFaqItems: FaqItem[] = [
  {
    category: "product",
    question: "Does CertaMaris guarantee a vessel will pass its cyber compliance audit?",
    answer:
      "No. CertaMaris organizes evidence, control mappings, findings, and corrective actions so a readiness package is complete and traceable before survey. Classification societies, flag states, and auditors determine actual audit, survey, and inspection outcomes.",
  },
  {
    category: "product",
    question: "Does the platform replace our Designated Person Ashore or Company Security Officer?",
    answer:
      "No. It organizes controlled work, evidence, and recurring obligations. Accountable personnel retain their regulatory and operational responsibilities and remain the decision-makers on applicability, sufficiency, and risk acceptance.",
  },
  {
    category: "product",
    question: "Does CertaMaris replace our Safety Management System (SMS) software?",
    answer:
      "No. CertaMaris organizes cyber-related control mappings, evidence, findings, and corrective actions so they can be demonstrated in an ISM-aligned way. It does not replace the company’s SMS, SMS software, or the Document of Compliance process. Cyber risk remains a category of risk managed under the SMS; CertaMaris structures the cyber assurance work that supports that system.",
  },
  {
    category: "product",
    question: "Can one account cover multiple vessels and multiple technical managers?",
    answer:
      "Yes. Tenant-isolated workspaces support fleet-level structures with role-based access so technical managers, DPAs, and executives see the scope relevant to their responsibility.",
  },
  {
    category: "product",
    question: "Can existing assessment or audit work be brought into CertaMaris?",
    answer:
      "Yes. Existing evidence, findings, and plan content can be ingested into the controlled structure. Reviewers still determine whether prior work is current, reliable, and sufficient for ongoing use.",
  },
  {
    category: "implementation",
    question: "What happens in a readiness conversation?",
    answer:
      "A working conversation around your fleet's current compliance state, existing evidence and assessment condition, accountable roles, and the specific IACS UR E26/E27 or IMO cyber-risk workflows most relevant to your operation.",
  },
  {
    category: "implementation",
    question: "How long does onboarding take?",
    answer:
      "Onboarding length depends on vessel count, evidence condition, number of managers, and whether optional services are included. CertaMaris scopes a practical first cycle after the readiness conversation — there is no fixed public timeline that fits every fleet.",
  },
  {
    category: "implementation",
    question: "Who operates the platform day to day?",
    answer:
      "Roles typically include fleet or cyber program owners shoreside, technical managers or DPAs, vessel-level contributors for evidence submission, and leadership reviewers for governance. Exact role mapping is configured per tenant.",
  },
  {
    category: "security",
    question: "How is data isolated between different operators?",
    answer:
      "Each tenant's data is logically isolated with role-based access control at the vessel, fleet, and organization level. See the Security & Trust page for the current and planned controls in detail.",
  },
  {
    category: "security",
    question: "Where is customer data hosted?",
    answer:
      "CertaMaris is delivered as cloud-hosted software. Hosting and related infrastructure are configured per the production environment for each engagement. Confirm current residency, subprocessors, and isolation details with CertaMaris for your tenant; do not rely on this FAQ as a regional hosting commitment.",
  },
  {
    category: "security",
    question: "Can we request a security package for procurement review?",
    answer:
      "Yes. Use the contact form with intent set to security or procurement, or check the document-interest option on a sales request. Materials are provided under the diligence process appropriate to your engagement — not as self-serve public downloads of full control matrices.",
  },
  {
    category: "regulatory",
    question: "How does CertaMaris relate to IMO Resolution MSC.428(98) and IACS UR E26/E27?",
    answer:
      "The platform structures the workflows those requirements imply — cyber risk management integrated into the ISM Code Safety Management System, and the design, construction, and equipment resilience requirements in IACS UR E26 and E27. It does not interpret applicability on your behalf; qualified review against the controlling official text is required.",
  },
  {
    category: "regulatory",
    question: "Does the platform decide which requirements apply to our vessels?",
    answer:
      "No. Applicability of IMO instruments, IACS unified requirements, flag-state rules, and class requirements is a human determination for your company, fleet, and contracts. CertaMaris helps structure mapped work and evidence once scope is set by qualified personnel; it does not issue applicability rulings.",
  },
  {
    category: "regulatory",
    question: "Is CertaMaris a substitute for class survey or flag inspection?",
    answer:
      "No. Classification societies, flag administrations, and appointed auditors retain survey and inspection authority. The platform supports preparation of structured evidence and readiness packages; it does not perform or replace class or flag verification.",
  },
  {
    category: "commercial",
    question: "Is there a free trial?",
    answer:
      "There is no self-serve free trial. Access is arranged per engagement based on fleet size, workflow scope, evidence condition, and onboarding requirements. Send a readiness request and CertaMaris will scope the appropriate next step against the published pricing model.",
  },
  {
    category: "commercial",
    question: "How does pricing work?",
    answer:
      "CertaMaris uses an annual platform-plus-contracted-vessel model. Core starts at a $15,000 platform fee plus $3,000 per vessel per year (minimum $30,000 ARR at five vessels); Assurance is $24,000 plus $3,000 per vessel (minimum $54,000 ARR at ten vessels); Enterprise is $48,000 plus $2,400 per vessel (minimum $108,000 ARR at twenty-five vessels). Remote assurance and QA-reviewed reports are $6,000 per vessel; on-board assessments are $15,000 per vessel plus travel and expenses. There is no per-seat charge. See the Pricing page for the full published model.",
  },
  {
    category: "commercial",
    question: "What is the difference between platform subscription and services?",
    answer:
      "Platform subscription covers software access to the assurance record and scoped workflows. Optional professional services (onboarding, assessment support, fieldwork) are quoted separately against the work required and are not mixed into a single opaque product price.",
  },
  {
    category: "procurement",
    question: "How do we start a procurement or security review?",
    answer:
      "Use the contact form with intent=procurement or intent=security, or select document interest on a sales request. Include company, role, and the materials you need (security overview, questionnaire support, NDA path). CertaMaris routes the request internally — there is no self-serve CRM portal on this site.",
  },
  {
    category: "procurement",
    question: "Do you support SSO and SCIM?",
    answer:
      "Enterprise single sign-on (SSO) and SCIM provisioning are planned enterprise identity capabilities, not a current standard feature on any package. Confirm current identity options and roadmap timing during security and commercial scoping rather than treating marketing copy as a binding configuration commitment.",
  },
  {
    category: "procurement",
    question: "Who should we contact for press, partnership, or careers?",
    answer:
      "Use the contact form with the matching intent (press, partnership, or careers). Those paths route separately from sales demos so the right internal owner can respond.",
  },
];

/** Flat list for schema.org FAQPage and legacy consumers. */
export const faqItems: { question: string; answer: string }[] = categorizedFaqItems.map(
  ({ question, answer }) => ({ question, answer })
);

export function faqItemsByCategory(category: FaqCategoryId): FaqItem[] {
  return categorizedFaqItems.filter((item) => item.category === category);
}

/* ─── Pricing packages & comparison ─── */

export type PackageTierId = "fleet-core" | "fleet-assurance" | "enterprise";

export type PackageTier = {
  id: PackageTierId;
  name: string;
  audience: string;
  summary: string;
  features: string[];
};

export const packageTiers: PackageTier[] = [
  {
    id: "fleet-core",
    name: "Fleet Core",
    audience: "Software-led for smaller fleets",
    summary: "Core assurance workflows for a focused vessel scope.",
    features: [
      "Platform access for the in-scope fleet",
      "Core workflows: requirements, controls, evidence, findings, and readiness",
      "Standard role-based access control",
    ],
  },
  {
    id: "fleet-assurance",
    name: "Fleet Assurance",
    audience: "Multi-manager fleets",
    summary: "Deeper mapping, onboarding support, and governance reporting.",
    features: [
      "Everything in Fleet Core",
      "Deeper onboarding support during setup",
      "Greater mapping depth across vessels and managers",
      "Governance reporting for operational leadership",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Multi-org and procurement-led buyers",
    summary: "Identity integrations, diligence support, and custom terms.",
    features: [
      "Everything in Fleet Assurance",
      "SSO / SCIM (planned enterprise identity)",
      "Security review support for buyer diligence",
      "Custom contractual terms as agreed",
    ],
  },
];

export type ComparisonValue = "included" | "limited" | "add-on" | "scoped" | "not-included" | string;

export type ComparisonRow = {
  feature: string;
  /** Short label for the comparison dimension */
  key: string;
  fleetCore: ComparisonValue;
  fleetAssurance: ComparisonValue;
  enterprise: ComparisonValue;
};

/**
 * Feature comparison matrix — capability depth only, no prices.
 * Values are descriptive; "scoped" means engagement-dependent.
 */
export const pricingComparisonRows: ComparisonRow[] = [
  {
    key: "vessel-scope",
    feature: "Vessel scope",
    fleetCore: "Focused fleet",
    fleetAssurance: "Multi-manager fleet",
    enterprise: "Multi-org / large fleet",
  },
  {
    key: "users",
    feature: "Users",
    fleetCore: "Standard seats (scoped)",
    fleetAssurance: "Expanded seats (scoped)",
    enterprise: "Enterprise seats (scoped)",
  },
  {
    key: "entities",
    feature: "Entities / organizations",
    fleetCore: "Single operating entity",
    fleetAssurance: "Multi-manager structures",
    enterprise: "Multi-org hierarchy",
  },
  {
    key: "portals",
    feature: "Portals (corporate / fleet / vessel)",
    fleetCore: "Core portal access",
    fleetAssurance: "Full operational portals",
    enterprise: "Full + multi-org portals",
  },
  {
    key: "assessments",
    feature: "Assessments",
    fleetCore: "included",
    fleetAssurance: "included",
    enterprise: "included",
  },
  {
    key: "evidence",
    feature: "Evidence ledger",
    fleetCore: "included",
    fleetAssurance: "included",
    enterprise: "included",
  },
  {
    key: "plans",
    feature: "Cybersecurity plan work products",
    fleetCore: "included",
    fleetAssurance: "included",
    enterprise: "included",
  },
  {
    key: "reports",
    feature: "Reports & readiness packages",
    fleetCore: "Standard",
    fleetAssurance: "Governance depth",
    enterprise: "Governance + diligence",
  },
  {
    key: "continuous-assurance",
    feature: "Continuous assurance cadence",
    fleetCore: "limited",
    fleetAssurance: "included",
    enterprise: "included",
  },
  {
    key: "integrations",
    feature: "Integrations",
    fleetCore: "limited",
    fleetAssurance: "scoped",
    enterprise: "scoped",
  },
  {
    key: "api",
    feature: "API access",
    fleetCore: "not-included",
    fleetAssurance: "scoped",
    enterprise: "scoped",
  },
  {
    key: "sso",
    feature: "SSO",
    fleetCore: "not-included",
    fleetAssurance: "planned",
    enterprise: "planned",
  },
  {
    key: "scim",
    feature: "SCIM",
    fleetCore: "not-included",
    fleetAssurance: "not-included",
    enterprise: "planned",
  },
  {
    key: "support",
    feature: "Support",
    fleetCore: "Standard",
    fleetAssurance: "Priority",
    enterprise: "Named / enterprise",
  },
  {
    key: "onboarding",
    feature: "Onboarding",
    fleetCore: "Guided self-serve + light assist",
    fleetAssurance: "Deeper onboarding support",
    enterprise: "Program-level onboarding",
  },
  {
    key: "retention",
    feature: "Data retention",
    fleetCore: "Standard policy (scoped)",
    fleetAssurance: "Standard policy (scoped)",
    enterprise: "Contractual retention options",
  },
  {
    key: "audit-history",
    feature: "Audit history depth",
    fleetCore: "Standard",
    fleetAssurance: "Extended operational history",
    enterprise: "Extended + diligence exports",
  },
  {
    key: "professional-services",
    feature: "Professional services",
    fleetCore: "Optional / quoted",
    fleetAssurance: "Optional / quoted",
    enterprise: "Optional / quoted",
  },
];

export const PRICING_BASIS_NOTE =
  "Annual hybrid model: a platform fee plus contracted-vessel licensing, with separately priced assurance engagements. Vessel count is the recurring value metric because each vessel adds compliance scope, evidence, risks, corrective actions, reporting obligations, and Cyber Resilience Twin coverage. There is no per-seat pricing.";

export type RecommenderInput = {
  vesselCount: "1-5" | "6-20" | "21-50" | "50+";
  companyCount: "1" | "2-5" | "6+";
  needsSso: boolean;
  needsIntegrations: boolean;
  surveyTimeline: "urgent" | "90-days" | "this-year" | "exploratory";
};

/**
 * Recommend a package tier by name only — never invents prices.
 * Heuristic guidance for buyers; final package is confirmed commercially.
 */
export function recommendPackage(input: RecommenderInput): {
  tier: PackageTier;
  rationale: string[];
} {
  const reasons: string[] = [];
  let score: PackageTierId = "fleet-core";

  if (input.vesselCount === "6-20" || input.vesselCount === "21-50") {
    score = "fleet-assurance";
    reasons.push("Vessel count suggests multi-vessel operational depth beyond a minimal core scope.");
  }
  if (input.vesselCount === "50+") {
    score = "enterprise";
    reasons.push("Large vessel count typically needs multi-org structure and enterprise support depth.");
  }
  if (input.companyCount === "2-5") {
    if (score === "fleet-core") score = "fleet-assurance";
    reasons.push("Multiple companies or managers benefit from Fleet Assurance mapping depth.");
  }
  if (input.companyCount === "6+") {
    score = "enterprise";
    reasons.push("Multi-organization structures align with Enterprise portal and governance options.");
  }
  if (input.needsSso) {
    score = "enterprise";
    reasons.push("SSO and SCIM are planned enterprise identity capabilities; Enterprise is the path where those requirements are scoped.");
  }
  if (input.needsIntegrations && score === "fleet-core") {
    score = "fleet-assurance";
    reasons.push("Integration needs usually exceed Fleet Core defaults and should be scoped.");
  }
  if (input.surveyTimeline === "urgent" && score === "fleet-core") {
    score = "fleet-assurance";
    reasons.push("Near-term survey pressure often needs deeper onboarding and readiness support.");
  }

  if (reasons.length === 0) {
    reasons.push("A focused fleet with standard workflows is a natural fit for Fleet Core as a starting conversation.");
  }

  const tier = packageTiers.find((p) => p.id === score) ?? packageTiers[0];
  if (!tier) {
    throw new Error("packageTiers is empty — cannot recommend a package.");
  }
  return { tier, rationale: reasons };
}

/* ─── Contact intents ─── */

export type ContactIntentId =
  | "demo"
  | "sales"
  | "readiness"
  | "procurement"
  | "security"
  | "privacy"
  | "support"
  | "partnership"
  | "press"
  | "careers"
  | "disclosure";

export type ContactIntentConfig = {
  id: ContactIntentId;
  label: string;
  subjectTag: string;
  eyebrow: string;
  title: string;
  intro: string;
  submitLabel: string;
  /** Sales-shaped forms collect fleet/objective fields. */
  salesFields: boolean;
};

export const CONTACT_INTENTS: ContactIntentConfig[] = [
  {
    id: "demo",
    label: "Product demo",
    subjectTag: "[demo]",
    eyebrow: "Request a demo",
    title: "Request a product demonstration.",
    intro:
      "Share your fleet context and what you want to see. Submit your details and we will contact you to arrange a suitable time.",
    submitLabel: "Request demo",
    salesFields: true,
  },
  {
    id: "sales",
    label: "Sales",
    subjectTag: "[sales]",
    eyebrow: "Sales inquiry",
    title: "Talk with CertaMaris about scope and fit.",
    intro:
      "Tell us about vessel scope, readiness pressure, and commercial timing. Submit your details and we will contact you to arrange a suitable time.",
    submitLabel: "Send sales request",
    salesFields: true,
  },
  {
    id: "readiness",
    label: "Readiness call",
    subjectTag: "[readiness]",
    eyebrow: "Readiness intake",
    title: "Request a readiness conversation.",
    intro:
      "Describe fleet scope, evidence condition, and upcoming review pressure. Submit your details and we will contact you to arrange a suitable time.",
    submitLabel: "Send readiness request",
    salesFields: true,
  },
  {
    id: "procurement",
    label: "Procurement",
    subjectTag: "[procurement]",
    eyebrow: "Procurement",
    title: "Start a procurement conversation.",
    intro: "Share buyer context, document needs, and timeline. We route procurement requests to the commercial team.",
    submitLabel: "Send procurement request",
    salesFields: true,
  },
  {
    id: "security",
    label: "Security diligence",
    subjectTag: "[security]",
    eyebrow: "Security",
    title: "Request security diligence materials.",
    intro:
      "Tell us what your security review requires. We route diligence requests separately from product demos.",
    submitLabel: "Request security materials",
    salesFields: false,
  },
  {
    id: "privacy",
    label: "Privacy",
    subjectTag: "[privacy]",
    eyebrow: "Privacy",
    title: "Contact us about privacy.",
    intro: "Use this path for privacy questions, data-subject topics, or policy clarifications.",
    submitLabel: "Send privacy request",
    salesFields: false,
  },
  {
    id: "support",
    label: "Support",
    subjectTag: "[support]",
    eyebrow: "Support",
    title: "Contact support.",
    intro:
      "For existing customers and active engagements. Include tenant or organization context when possible.",
    submitLabel: "Send support request",
    salesFields: false,
  },
  {
    id: "partnership",
    label: "Partnership",
    subjectTag: "[partnership]",
    eyebrow: "Partnership",
    title: "Explore a partnership.",
    intro: "Describe the partnership idea, your organization, and the outcome you have in mind.",
    submitLabel: "Send partnership request",
    salesFields: false,
  },
  {
    id: "press",
    label: "Press",
    subjectTag: "[press]",
    eyebrow: "Press",
    title: "Press and media inquiries.",
    intro: "Share your outlet, deadline, and the story angle. We route press requests to the communications owner.",
    submitLabel: "Send press request",
    salesFields: false,
  },
  {
    id: "careers",
    label: "Careers",
    subjectTag: "[careers]",
    eyebrow: "Careers",
    title: "Careers interest.",
    intro: "Tell us about the role interest and how to reach you. This is not a job application portal.",
    submitLabel: "Send careers note",
    salesFields: false,
  },
  {
    id: "disclosure",
    label: "Vulnerability disclosure",
    subjectTag: "[disclosure]",
    eyebrow: "Disclosure",
    title: "Responsible vulnerability disclosure.",
    intro:
      "Report a potential security issue. Do not include exploit code in this form if avoidable — we will follow up securely.",
    submitLabel: "Submit disclosure",
    salesFields: false,
  },
];

const INTENT_ALIASES: Record<string, ContactIntentId> = {
  demo: "demo",
  sales: "sales",
  readiness: "readiness",
  procurement: "procurement",
  security: "security",
  privacy: "privacy",
  support: "support",
  partnership: "partnership",
  press: "press",
  careers: "careers",
  disclosure: "disclosure",
  // Friendly aliases
  "request-demo": "demo",
  "product-demo": "demo",
  quote: "sales",
  pricing: "sales",
  nda: "security",
  "security-package": "security",
  vuln: "disclosure",
  vulnerability: "disclosure",
};

export function normalizeContactIntent(raw: string | null | undefined): ContactIntentId {
  if (!raw) return "demo";
  const key = raw.trim().toLowerCase();
  return INTENT_ALIASES[key] ?? "demo";
}

export function getContactIntent(raw: string | null | undefined): ContactIntentConfig {
  const id = normalizeContactIntent(raw);
  const found = CONTACT_INTENTS.find((i) => i.id === id) ?? CONTACT_INTENTS[0];
  if (!found) {
    throw new Error("CONTACT_INTENTS is empty — cannot resolve contact intent.");
  }
  return found;
}

export const FLEET_SIZE_OPTIONS = ["1-5 vessels", "6-20 vessels", "21-50 vessels", "50+ vessels"] as const;
export const VESSEL_COUNT_OPTIONS = ["1-5", "6-20", "21-50", "50+"] as const;
export const ROLE_OPTIONS = [
  "DPA",
  "Technical manager",
  "CISO / cyber lead",
  "IT/OT",
  "Procurement",
  "Executive / owner",
  "Other",
] as const;
export const OBJECTIVE_OPTIONS = [
  "Product demonstration",
  "Readiness workflow",
  "Evidence and findings",
  "IACS UR E26/E27 mapping",
  "Governance reporting",
  "Pricing and scope",
  "Security package / procurement",
] as const;
export const TIMELINE_OPTIONS = [
  "Now / active review",
  "Next 90 days",
  "This year",
  "Exploratory",
] as const;
export const DOCUMENT_REQUEST_OPTIONS = [
  "None",
  "Security overview",
  "Questionnaire support",
  "NDA path",
  "Full diligence package",
] as const;
