export type SolutionEntry = {
  id: string;
  title: string;
  eyebrow: string;
  headline: string;
  body: string[];
  capabilities: string[];
};

export const solutions: SolutionEntry[] = [
  {
    id: "fleet-compliance",
    title: "Fleet Compliance Management",
    eyebrow: "Solutions · 01",
    headline: "One compliance record per fleet, not one spreadsheet per vessel.",
    body: [
      "Multi-vessel operators typically run compliance through a mix of shared drives, vessel-specific binders, and email threads with technical managers. Nothing wrong with any single piece of that — the problem is that none of it connects, so a requirement change means manually checking every vessel again.",
      "Fleet Compliance Management keeps applicability, scope, and control mappings at the fleet level while preserving vessel-specific detail underneath. A change to an IACS UR E26 clause shows every affected vessel in one view, not a search-and-hope across a shared drive.",
    ],
    capabilities: [
      "Fleet-level scope and applicability record shared across vessels with similar operating profiles",
      "Vessel-specific evidence and findings roll up into fleet-wide status without losing detail",
      "Technical manager and DPA assignment tracked per vessel with clear accountability",
      "Change propagation when a requirement or control mapping updates",
    ],
  },
  {
    id: "audit-readiness",
    title: "Audit & Survey Readiness",
    eyebrow: "Solutions · 02",
    headline: "Build the readiness package continuously, not the week before survey.",
    body: [
      "Audit readiness usually becomes a scramble: pulling evidence from wherever it was last saved, reconstructing what a finding's status actually is, and hoping the plan version a surveyor sees matches the one that was actually implemented.",
      "CertaMaris keeps a continuously current readiness package — assessment basis, findings, corrective actions, and plan crosswalks — so the state a surveyor reviews is the same state your team has been working from all along.",
    ],
    capabilities: [
      "Readiness package compiled from live evidence, findings, and plan status, not a manual reassembly",
      "Gap flagging against completeness, citation, and evidence-sufficiency checks before survey",
      "Version-controlled Cybersecurity Plan content with clear release state",
      "A record of exactly what was reviewed, by whom, and when",
    ],
  },
  {
    id: "evidence-findings",
    title: "Evidence & Findings Management",
    eyebrow: "Solutions · 03",
    headline: "Evidence with provenance. Findings with a defensible trail.",
    body: [
      "An evidence artifact without its custodian, version, and review decision is just a file. CertaMaris preserves the full chain: what was requested, what was submitted, who reviewed it, and what portion of the requirement it actually supports.",
      "Findings separate the observed condition, the controlling criterion, the supporting evidence, and the owner's response — so a finding can be defended on its own terms rather than reconstructed from memory during a follow-up review.",
    ],
    capabilities: [
      "Evidence ledger with custodian, version, submission date, and reviewer decision",
      "Findings structured around condition, criterion, evidence, and consequence",
      "Corrective actions linked back to the finding that created them, with verification evidence required to close",
      "Full traceability from regulatory requirement to closed corrective action",
    ],
  },
  {
    id: "regulatory-intelligence",
    title: "Regulatory Intelligence",
    eyebrow: "Solutions · 04",
    headline: "Know what changed, and what it touches, before it becomes a finding.",
    body: [
      "IMO guidance, IACS unified requirements, and flag-state circulars change on their own schedules. Most operators find out about a change when a surveyor mentions it, or when someone happens to read the right bulletin.",
      "CertaMaris tracks the requirements your fleet is mapped against and surfaces which control mappings, evidence, and plan sections are affected when the underlying text changes — turning a regulatory update into a scoped task list instead of an open-ended review.",
    ],
    capabilities: [
      "Source text, clause versions, and mappings kept distinct and versioned",
      "Impact view showing which controls, evidence, and plan sections a requirement change touches",
      "Generated implementation tasks routed to accountable owners for approval",
      "A historical record of what changed, when, and what your fleet did about it",
    ],
  },
  {
    id: "executive-reporting",
    title: "Executive & Board Reporting",
    eyebrow: "Solutions · 05",
    headline: "Governance-grade reporting without a slide deck rebuilt from scratch.",
    body: [
      "Boards and executive teams need fleet-wide cyber-compliance status in a format built for a governance conversation — trend over time, outstanding decisions, and where exposure concentrates — not a raw export of every open finding.",
      "Executive & Board Reporting draws directly from the same live data operators and technical managers use day to day, so the number in the boardroom matches the number on the vessel.",
    ],
    capabilities: [
      "Fleet-wide readiness summary with drill-down to vessel or requirement level",
      "Trend reporting across assessment cycles and corrective-action closure",
      "Outstanding risk-acceptance and treatment decisions surfaced for executive sign-off",
      "Export-ready views for board packages and insurer or class conversations",
    ],
  },
];

export type IndustryEntry = {
  id: string;
  title: string;
  eyebrow: string;
  headline: string;
  body: string[];
  priorities: string[];
};

export const industries: IndustryEntry[] = [
  {
    id: "owners-operators",
    title: "Ship Owners & Operators",
    eyebrow: "Industries · 01",
    headline: "Fleet-wide readiness without chasing individual vessels for status.",
    body: [
      "Owners and operators carry the commercial consequence of a cyber-compliance gap — off-hire risk, insurer conversations, and charterer scrutiny — without always having direct visibility into vessel-level detail.",
      "CertaMaris gives owners and operators a fleet-wide view of readiness, open findings, and exposure, with the ability to drill into any vessel's underlying detail when it matters.",
    ],
    priorities: ["Fleet-wide readiness visibility", "Financial and operational exposure by vessel", "Insurer and charterer-ready reporting"],
  },
  {
    id: "technical-managers",
    title: "Technical Managers & DPAs",
    eyebrow: "Industries · 02",
    headline: "One system of record for the SMS cyber work you already own.",
    body: [
      "Technical managers and Designated Persons Ashore carry the operational weight of cyber-risk management under the ISM Code — coordinating across vessels, surveyors, and IT/OT teams, usually through a patchwork of tools that don't talk to each other.",
      "CertaMaris centralizes the evidence, findings, and plan work DPAs are accountable for, structured around the workflows they already run rather than a new process layered on top.",
    ],
    priorities: ["Centralized evidence and finding management", "Clear accountability across vessels and technical staff", "Continuous readiness instead of pre-audit scrambles"],
  },
  {
    id: "cyber-it-ot",
    title: "Cybersecurity & IT/OT Teams",
    eyebrow: "Industries · 03",
    headline: "Control mapping that respects the IT/OT boundary.",
    body: [
      "Shipboard OT and shoreside IT security teams are usually measured against different standards, tools, and change-management practices, but both feed the same compliance obligation.",
      "CertaMaris keeps IT and OT control mappings distinct while linking both to the same requirement and evidence structure, so a cybersecurity team can demonstrate coverage without forcing OT into an IT framework or vice versa.",
    ],
    priorities: ["Separate IT and OT control mapping with a shared requirement layer", "Evidence sufficiency tracked per system boundary", "Clear handoff between security teams and compliance reviewers"],
  },
  {
    id: "class-surveyors",
    title: "Classification Societies & Surveyors",
    eyebrow: "Industries · 04",
    headline: "A reviewable trail structured around what a survey verifies.",
    body: [
      "Surveyors work against a defined set of requirements and need evidence that is sufficient, current, and traceable — not a folder of documents in no particular order.",
      "Where an operator grants access, CertaMaris presents evidence and control mappings structured around the requirements a survey is verifying, reducing the reconstruction work on both sides.",
    ],
    priorities: ["Requirement-structured evidence presentation", "Clear provenance and version history", "Controlled, expiring access grants rather than open file shares"],
  },
  {
    id: "pi-insurers",
    title: "P&I Clubs & Insurers",
    eyebrow: "Industries · 05",
    headline: "Structured visibility to inform underwriting conversations.",
    body: [
      "Cyber-risk posture is increasingly part of the underwriting conversation, but most insurers currently rely on self-reported questionnaires with little supporting structure.",
      "Where a member operator chooses to share it, CertaMaris can present a structured summary of control coverage and readiness state to inform — not replace — an insurer's own underwriting judgment.",
    ],
    priorities: ["Structured, member-authorized visibility into control coverage", "Consistent reporting format across a fleet or portfolio", "No substitute for the insurer's own risk assessment process"],
  },
];
