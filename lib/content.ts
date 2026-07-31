export type CapabilityPillar = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};

export const capabilityPillars: CapabilityPillar[] = [
  {
    id: "fleet-visibility",
    title: "Fleet visibility",
    summary: "Every vessel's cyber posture in one place, not one inbox per vessel.",
    detail:
      "Roll up asset inventories, control status, open findings, and plan versions across the fleet, filtered by vessel class, flag, technical manager, or operating region.",
  },
  {
    id: "control-mapping",
    title: "Control mapping",
    summary: "Requirements linked to the controls and systems that satisfy them.",
    detail:
      "Map IACS UR E26 and E27 requirements and your own SMS cyber procedures directly to shipboard and shoreside systems, so a requirement change shows exactly what it touches.",
  },
  {
    id: "evidence-findings",
    title: "Evidence & findings",
    summary: "A single ledger for what was requested, submitted, and decided.",
    detail:
      "Every artifact keeps its custodian, version, and reviewer decision. Findings separate the observed condition from the criterion, the evidence, and the owner's response.",
  },
  {
    id: "audit-readiness",
    title: "Audit readiness",
    summary: "A package assembled from approved work, not a scramble before survey.",
    detail:
      "Readiness packages compile scope, assessment basis, findings, corrective actions, and plan crosswalks into one reviewable set, with gaps flagged before a surveyor finds them.",
  },
  {
    id: "regulatory-intelligence",
    title: "Regulatory intelligence",
    summary: "Requirement changes tracked to the implementation work they create.",
    detail:
      "When IMO, IACS, or flag-state guidance changes, the affected clauses, mappings, and open tasks are identified so nothing is missed between publication and implementation.",
  },
  {
    id: "executive-reporting",
    title: "Executive reporting",
    summary: "Board-ready status without rebuilding a deck every quarter.",
    detail:
      "Executives and technical managers see fleet-wide readiness, trend lines, and outstanding decisions in a format built for governance conversations, not raw data exports.",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Scope the fleet",
    detail: "Vessels, facilities, technical managers, and applicable requirements are recorded as one controlled scope record.",
  },
  {
    number: "02",
    title: "Map controls to requirements",
    detail: "Existing SMS procedures and shipboard systems are connected to IACS UR E26/E27 clauses and internal policy.",
  },
  {
    number: "03",
    title: "Collect and review evidence",
    detail: "Evidence requests go out against the mapping; submissions are versioned and reviewed against sufficiency criteria.",
  },
  {
    number: "04",
    title: "Track findings to closure",
    detail: "Gaps become owned corrective actions with target dates, dependencies, and independent verification before closure.",
  },
  {
    number: "05",
    title: "Maintain continuous readiness",
    detail: "Recurring assessments, plan reviews, and evidence refreshes are scheduled so readiness doesn't lapse between audits.",
  },
];

export type Persona = {
  id: string;
  title: string;
  detail: string;
};

export const personas: Persona[] = [
  {
    id: "owners-operators",
    title: "Ship owners & operators",
    detail: "Fleet-wide readiness status, open findings, and owner decisions without chasing individual vessels for updates.",
  },
  {
    id: "technical-managers",
    title: "Technical managers & DPAs",
    detail: "One system of record for SMS cyber procedures, evidence, and the audits that reference them.",
  },
  {
    id: "cyber-it-ot",
    title: "Cybersecurity & IT/OT teams",
    detail: "Control mapping and evidence sufficiency across shipboard OT and shoreside IT without duplicate tracking.",
  },
  {
    id: "class-surveyors",
    title: "Classification societies & surveyors",
    detail: "A reviewable evidence trail structured around the requirements a survey actually verifies.",
  },
  {
    id: "pi-insurers",
    title: "P&I clubs & insurers",
    detail: "Structured visibility into a member's cyber-risk posture to inform underwriting conversations.",
  },
];

export const faqItems: { question: string; answer: string }[] = [
  {
    question: "Does CertaMaris guarantee a vessel will pass its cyber compliance audit?",
    answer:
      "No. CertaMaris organizes evidence, control mappings, findings, and corrective actions so a readiness package is complete and traceable before survey. Classification societies, flag states, and auditors determine actual audit, survey, and inspection outcomes.",
  },
  {
    question: "Does the platform replace our Designated Person Ashore or Company Security Officer?",
    answer:
      "No. It organizes controlled work, evidence, and recurring obligations. Accountable personnel retain their regulatory and operational responsibilities and remain the decision-makers on applicability, sufficiency, and risk acceptance.",
  },
  {
    question: "How does CertaMaris relate to IMO Resolution MSC.428(98) and IACS UR E26/E27?",
    answer:
      "The platform structures the workflows those requirements imply — cyber risk management integrated into the ISM Code Safety Management System, and the design, construction, and equipment resilience requirements in IACS UR E26 and E27. It does not interpret applicability on your behalf; qualified review against the controlling official text is required.",
  },
  {
    question: "Can one account cover multiple vessels and multiple technical managers?",
    answer:
      "Yes. Tenant-isolated workspaces support fleet-level structures with role-based access so technical managers, DPAs, and executives see the scope relevant to their responsibility.",
  },
  {
    question: "What happens in a readiness conversation?",
    answer:
      "A working conversation around your fleet's current compliance state, existing evidence and assessment condition, accountable roles, and the specific IACS UR E26/E27 or IMO cyber-risk workflows most relevant to your operation.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Access is arranged per engagement based on fleet size, workflow scope, evidence condition, and onboarding requirements. Send a readiness request and CertaMaris will scope the appropriate next step without publishing unsupported price points on the website.",
  },
  {
    question: "How is data isolated between different operators?",
    answer:
      "Each tenant's data is logically isolated with role-based access control at the vessel, fleet, and organization level. See the Security & Trust page for the current and planned controls in detail.",
  },
  {
    question: "Can existing assessment or audit work be brought into CertaMaris?",
    answer:
      "Yes. Existing evidence, findings, and plan content can be ingested into the controlled structure. Reviewers still determine whether prior work is current, reliable, and sufficient for ongoing use.",
  },
  {
    question: "Does CertaMaris replace our Safety Management System (SMS) software?",
    answer:
      "No. CertaMaris organizes cyber-related control mappings, evidence, findings, and corrective actions so they can be demonstrated in an ISM-aligned way. It does not replace the company’s SMS, SMS software, or the Document of Compliance process. Cyber risk remains a category of risk managed under the SMS; CertaMaris structures the cyber assurance work that supports that system.",
  },
  {
    question: "Does the platform decide which requirements apply to our vessels?",
    answer:
      "No. Applicability of IMO instruments, IACS unified requirements, flag-state rules, and class requirements is a human determination for your company, fleet, and contracts. CertaMaris helps structure mapped work and evidence once scope is set by qualified personnel; it does not issue applicability rulings.",
  },
  {
    question: "Where is customer data hosted?",
    answer:
      "CertaMaris is delivered as cloud-hosted software. Hosting and related infrastructure are configured per the production environment for each engagement. Confirm current residency, subprocessors, and isolation details with CertaMaris for your tenant; do not rely on this FAQ as a regional hosting commitment.",
  },
  {
    question: "Is CertaMaris a substitute for class survey or flag inspection?",
    answer:
      "No. Classification societies, flag administrations, and appointed auditors retain survey and inspection authority. The platform supports preparation of structured evidence and readiness packages; it does not perform or replace class or flag verification.",
  },
];
