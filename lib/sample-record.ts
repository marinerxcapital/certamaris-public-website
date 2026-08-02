/**
 * One illustrative, end-to-end instance of the assurance chain for the
 * sample vessel "MV Certa Maris" — the data behind the landing page's
 * inspectable record explorer.
 *
 * Every value here is sample/illustrative and labeled as such in the UI.
 * No customer data, no invented real-world metrics, no fabricated clause
 * numbers: regulatory references name the instrument (IACS UR E26), never
 * an invented section. Statuses use the product's real status vocabulary.
 */

export type SampleRecordStatus = "ok" | "caution" | "pending";

export type SampleRecordObject = {
  /** Ledger-style object id, e.g. "REQ-0104" (sample numbering). */
  id: string;
  /** Chain step code, matches the evidence-chain visualizer. */
  code: string;
  step: string;
  title: string;
  status: SampleRecordStatus;
  statusLabel: string;
  owner: string;
  updated: string;
  summary: string;
  fields: [string, string][];
  /** Ids of directly linked records in this sample chain. */
  links: string[];
};

export const SAMPLE_RECORD_VESSEL = "MV Certa Maris";

export const SAMPLE_RECORD: SampleRecordObject[] = [
  {
    id: "REQ-0104",
    code: "REQ",
    step: "Requirement",
    title: "IACS UR E26 Rev.1 — onboard network segmentation",
    status: "ok",
    statusLabel: "Versioned",
    owner: "Compliance lead",
    updated: "2026-04-02",
    summary:
      "The obligation text is captured as a versioned record, kept distinct from interpretation. Official texts control — this record points at them, it does not restate them.",
    fields: [
      ["Source instrument", "IACS UR E26 Rev.1 (official text controls)"],
      ["Captured version", "Rev.1, as applicable to the sample newbuild series"],
      ["Interpretation", "Held separately; requirement text is never edited"],
      ["Change watch", "Revision monitoring on — see Regulatory intelligence"],
    ],
    links: ["APP-0231"],
  },
  {
    id: "APP-0231",
    code: "APP",
    step: "Applicability",
    title: `${SAMPLE_RECORD_VESSEL} — bridge and engine-monitoring networks in scope`,
    status: "ok",
    statusLabel: "Decided",
    owner: "Technical manager",
    updated: "2026-04-18",
    summary:
      "A human decided which systems on this vessel the requirement touches, and recorded the basis for that decision. Applicability is never auto-assigned.",
    fields: [
      ["Vessel", `${SAMPLE_RECORD_VESSEL} (sample vessel)`],
      ["Systems in scope", "Bridge network, engine-monitoring VLAN"],
      ["Out of scope", "Crew LAN — segregated, no OT crossover"],
      ["Decision basis", "System inventory v7, yard network drawings"],
    ],
    links: ["REQ-0104", "CTL-0389"],
  },
  {
    id: "CTL-0389",
    code: "CTL",
    step: "Control",
    title: "Segregated OT network with controlled crossover",
    status: "ok",
    statusLabel: "Implemented",
    owner: "Fleet IT/OT",
    updated: "2026-05-06",
    summary:
      "The implemented safeguard that answers the requirement on this vessel, with ownership and review cadence on the record.",
    fields: [
      ["Type", "Technical safeguard"],
      ["Implementation", "Managed switch configuration + crossover firewall rule set"],
      ["Review cadence", "Quarterly rule review"],
      ["Ownership", "Fleet IT/OT, named individual on the real record"],
    ],
    links: ["APP-0231", "ASM-0512", "EVD-0847"],
  },
  {
    id: "ASM-0512",
    code: "ASM",
    step: "Assessment",
    title: "Q2 onboard review — segmentation controls",
    status: "ok",
    statusLabel: "Performed",
    owner: "Reviewer",
    updated: "2026-06-11",
    summary:
      "Planned and performed review work against the mapped control. The result feeds findings directly — nothing is re-typed into a spreadsheet.",
    fields: [
      ["Scope", `CTL-0389 on ${SAMPLE_RECORD_VESSEL}`],
      ["Method", "Configuration inspection + crew walkthrough"],
      ["Performed", "2026-06-11"],
      ["Result", "One finding raised (FND-0130)"],
    ],
    links: ["CTL-0389", "EVD-0847", "FND-0130"],
  },
  {
    id: "EVD-0847",
    code: "EVD",
    step: "Evidence",
    title: "Switch configuration export + network diagram v7",
    status: "caution",
    statusLabel: "Freshness watch",
    owner: "Vessel custodian",
    updated: "2026-06-11",
    summary:
      "Artifacts with a named custodian, version history, a sufficiency decision, and a freshness state — not files aging quietly in a shared drive.",
    fields: [
      ["Artifacts", "2 files, versioned"],
      ["Custodian", "Named vessel user — not a shared login"],
      ["Sufficiency", "Accepted for the Q2 review"],
      ["Freshness", "Refresh due 2026-09-01"],
    ],
    links: ["CTL-0389", "ASM-0512", "FND-0130"],
  },
  {
    id: "FND-0130",
    code: "FND",
    step: "Finding",
    title: "Crossover firewall rule review overdue",
    status: "caution",
    statusLabel: "Open",
    owner: "Reviewer → action owner",
    updated: "2026-06-12",
    summary:
      "The observed condition stays tied to its criterion, its evidence, and its consequence — so it is still explainable at survey time.",
    fields: [
      ["Condition", "Rule set last reviewed two quarters ago"],
      ["Criterion", "Quarterly review cadence set in CTL-0389"],
      ["Linked evidence", "EVD-0847"],
      ["Consequence", "Unreviewed crossover rules weaken the segregation intent"],
    ],
    links: ["EVD-0847", "RSK-0072", "CAP-0455"],
  },
  {
    id: "RSK-0072",
    code: "RSK",
    step: "Risk",
    title: "Treatment decided — remediate within 30 days",
    status: "ok",
    statusLabel: "Decided",
    owner: "DPA + technical manager",
    updated: "2026-06-16",
    summary:
      "A treatment-or-acceptance decision with authority, rationale, and a review point. Acceptance without a name and a date does not exist in this model.",
    fields: [
      ["Decision", "Treat — not accepted as-is"],
      ["Rationale", "Low current exposure; cadence breach must not persist"],
      ["Authority", "Recorded decision-makers and date"],
      ["Review point", "At corrective-action verification"],
    ],
    links: ["FND-0130", "CAP-0455"],
  },
  {
    id: "CAP-0455",
    code: "CAP",
    step: "Corrective action",
    title: "Re-review crossover rules; update procedure owner",
    status: "caution",
    statusLabel: "In progress",
    owner: "Fleet IT/OT",
    updated: "2026-07-20",
    summary:
      "Owned remediation with a due date and a verification requirement — closure needs evidence, not an email saying it is done.",
    fields: [
      ["Due", "2026-08-15"],
      ["Verification required", "Updated rule-review log attached as evidence"],
      ["Dependencies", "None"],
      ["Progress", "Work started 2026-07-20"],
    ],
    links: ["RSK-0072", "QA-0290"],
  },
  {
    id: "QA-0290",
    code: "QA",
    step: "QA review",
    title: "Package completeness check — independent reviewer",
    status: "ok",
    statusLabel: "Passed",
    owner: "Independent reviewer",
    updated: "2026-07-28",
    summary:
      "Independent review of the whole thread before controlled release. Open items are disclosed, not hidden.",
    fields: [
      ["Reviewer", "Independent of the action owner"],
      ["Checked", "Chain complete REQ → CAP; evidence current or excepted"],
      ["Exceptions", "CAP-0455 open — disclosed in the package"],
      ["Date", "2026-07-28"],
    ],
    links: ["CAP-0455", "PKG-0067"],
  },
  {
    id: "PKG-0067",
    code: "PKG",
    step: "Released package",
    title: `Q2 readiness package — ${SAMPLE_RECORD_VESSEL}`,
    status: "ok",
    statusLabel: "Released",
    owner: "Accountable reviewer",
    updated: "2026-07-30",
    summary:
      "The released, versioned deliverable assembled from the controlled records you just clicked through — not from a document scramble the week before survey.",
    fields: [
      ["Scope", "UR E26 segmentation thread (this sample record)"],
      ["Contents", "Requirement refs, applicability, control, evidence, finding, action plan"],
      ["Release", "Controlled and versioned; audit history retained"],
      ["Open items", "CAP-0455 disclosed with due date"],
    ],
    links: ["QA-0290"],
  },
];
