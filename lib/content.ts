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

/** @deprecated Prefer `@/lib/faq-pricing` — re-exported for legacy imports. */
export { faqItems } from "@/lib/faq-pricing";
