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
      "CertaMaris compiles a readiness package from the live record — assessment basis, findings, corrective actions, and plan crosswalks — so the package a reviewer inspects is assembled from work already in the system, not from a last-minute document scramble.",
    ],
    capabilities: [
      "Readiness package compiled from current evidence, findings, and plan status",
      "Gap flagging against completeness, citation, and evidence-sufficiency checks before review",
      "Version-controlled Cybersecurity Plan content with clear release state",
      "A record of what was reviewed, by whom, and when",
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
      "When a mapped requirement version changes, CertaMaris can show which control mappings, evidence, and plan sections are linked to that requirement so owners can review impact and assign follow-up work — without replacing human applicability judgment.",
    ],
    capabilities: [
      "Source text, clause versions, and mappings kept distinct and versioned",
      "Impact view of controls, evidence, and plan sections linked to a changed requirement",
      "Follow-up work recorded against accountable owners for review and approval",
      "A historical record of what changed, when, and what the fleet recorded in response",
    ],
  },
  {
    id: "executive-reporting",
    title: "Executive & Board Reporting",
    eyebrow: "Solutions · 05",
    headline: "Governance-grade reporting without a slide deck rebuilt from scratch.",
    body: [
      "Boards and executive teams need fleet-wide cyber-compliance status in a format built for a governance conversation — trend over time, outstanding decisions, and where operational risk needs review — not a raw export of every open finding.",
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
  /** Job-to-be-done for this seat in the compliance chain. */
  jtbd: string;
  /** Three concrete artifacts this role typically needs from the controlled record. */
  artifacts: [string, string, string];
  /** How work moves to or from adjacent roles. */
  handoff: string;
  /** Explicit boundary: what CertaMaris does not replace for this role. */
  doesNotReplace: string;
};

export const industries: IndustryEntry[] = [
  {
    id: "owners-operators",
    title: "Ship Owners & Operators",
    eyebrow: "Industries · 01",
    headline: "Fleet-wide readiness without chasing individual vessels for status.",
    body: [
      "Owners and operators carry the operational consequence of a cyber-compliance gap — survey preparation, insurer conversations, and charterer scrutiny — without always having direct visibility into vessel-level detail.",
      "CertaMaris gives owners and operators a fleet-wide view of readiness, open findings, and review decisions, with the ability to drill into any vessel's underlying detail when it matters.",
    ],
    jtbd: "See fleet cyber-compliance readiness, open risk decisions, and review status in one place — without reconstructing it from vessel-by-vessel updates.",
    artifacts: [
      "Fleet readiness summary with vessel drill-down",
      "Open findings and outstanding treatment decisions",
      "Governance-ready posture roll-up for board or insurer conversations",
    ],
    handoff:
      "Assigns vessel-level work to technical managers and DPAs; receives rolled-up status, open findings, and decision queues without replacing those owners' operational authority.",
    doesNotReplace:
      "Owner and operator accountability under the ISM Code, charterer or insurer underwriting judgment, or classification and flag determinations.",
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
    jtbd: "Keep SMS cyber-risk evidence, findings, and corrective actions continuous so survey readiness is built from live work, not a pre-audit scramble.",
    artifacts: [
      "Evidence ledger with custodian, version, and review state",
      "Findings and corrective-action register with owners and due dates",
      "Readiness package compiled from current scope, evidence, and plan status",
    ],
    handoff:
      "Pulls technical evidence and control notes from IT/OT teams; packages readiness materials for surveyors and class when access is granted; reports fleet status upward to owners and operators.",
    doesNotReplace:
      "DPA or technical-manager accountability, SMS procedure ownership, applicability judgment, or the decision to accept residual risk.",
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
    jtbd: "Map IT and OT controls to shared requirements while keeping system boundaries, evidence, and ownership distinct.",
    artifacts: [
      "Separate IT and OT control mappings against the same requirement layer",
      "Evidence sufficiency and freshness by system boundary",
      "Known exceptions and validation history attached to the control record",
    ],
    handoff:
      "Supplies implementation context and technical evidence to compliance reviewers and DPAs; receives clarified requirement scope and review decisions without absorbing SMS ownership.",
    doesNotReplace:
      "Security engineering design choices, OT operational control, change-management authority, or independent security assessment conclusions.",
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
    jtbd: "Inspect operator evidence and control mappings structured around the requirements under verification — with provenance, not a loose document dump.",
    artifacts: [
      "Requirement-structured evidence presentation",
      "Version and provenance trail for submitted artifacts",
      "Controlled, expiring access to readiness materials granted by the operator",
    ],
    handoff:
      "Receives operator-authorized readiness packages and requirement-mapped evidence; returns observations and findings into the operator's corrective-action workflow rather than becoming the system of record.",
    doesNotReplace:
      "Surveyor professional judgment, class rule interpretation, flag-state authority, or any certification or survey outcome.",
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
    jtbd: "Inform underwriting and risk conversations with a member-authorized, structured view of control coverage and readiness — not another free-text questionnaire alone.",
    artifacts: [
      "Member-authorized control-coverage summary",
      "Consistent readiness-state reporting across a fleet or portfolio",
      "Exportable posture views for underwriting discussions",
    ],
    handoff:
      "Receives only what a member operator authorizes for sharing; does not write back into the operator's controlled record or become a substitute claims or underwriting system.",
    doesNotReplace:
      "Underwriting judgment, actuarial assessment, policy terms, or the insurer's own risk-evaluation process.",
  },
];
