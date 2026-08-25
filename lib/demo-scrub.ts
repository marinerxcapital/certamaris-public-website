/**
 * Cinematic /demo scrub-tour beats.
 * Each beat pairs a real chain code with a sanitized client-facing product screen.
 * No invented metrics or compliance outcomes.
 */

import { productProofScreens, type ProductProofScreen } from "@/lib/product-screens";

export type DemoScrubBeat = {
  id: string;
  /** Mono index shown on the scrub rail, e.g. "01 REQ" */
  index: string;
  code: string;
  title: string;
  body: string;
  owner: string;
  decision: string;
  screen: ProductProofScreen;
};

export const DEMO_SCRUB_BEATS: DemoScrubBeat[] = [
  {
    id: "requirement",
    index: "01 REQ",
    code: "REQ",
    title: "Capture the requirement as a versioned object.",
    body: "Official instrument text stays distinct from interpretation. Mapping work starts from a controlled requirement record — not a spreadsheet cell.",
    owner: "Compliance lead",
    decision: "Which instrument version applies, and what must stay linked.",
    screen: productProofScreens.requirementMapping,
  },
  {
    id: "control",
    index: "03 CTL",
    code: "CTL",
    title: "Map the control that answers it — IT and OT kept distinct.",
    body: "Implementation context, ownership, and review cadence sit on the control object so technical proof can reach the package later.",
    owner: "Fleet IT/OT",
    decision: "Control design, system boundary, and review cadence.",
    screen: productProofScreens.assessments,
  },
  {
    id: "evidence",
    index: "05 EVD",
    code: "EVD",
    title: "Judge evidence sufficiency and freshness before review week.",
    body: "Custodian, version, sufficiency decision, and freshness state travel with the artifact — files aging in a shared drive do not.",
    owner: "Evidence custodian",
    decision: "Accepted support, missing evidence, or freshness exception.",
    screen: productProofScreens.evidenceCoverage,
  },
  {
    id: "finding",
    index: "06 FND",
    code: "FND",
    title: "Keep the finding tied to criterion, evidence, and consequence.",
    body: "Observed condition stays explainable at survey time because ownership and risk context never leave the record.",
    owner: "Reviewer",
    decision: "Severity, ownership, and whether treatment is required.",
    screen: productProofScreens.findingsRegister,
  },
  {
    id: "risk",
    index: "07 RSK",
    code: "RSK",
    title: "Decide treatment before unresolved exposure reaches the package.",
    body: "Fleet views can surface open exposure, but the record still preserves the vessel, finding, owner, and treatment decision behind the roll-up.",
    owner: "DPA + technical manager",
    decision: "Treat, accept, transfer, or escalate with accountable rationale.",
    screen: productProofScreens.clientFleet,
  },
  {
    id: "action",
    index: "08 CAP",
    code: "CAP",
    title: "Close corrective actions with verification — not an unchecked flip.",
    body: "Due date, action owner, and verification evidence stay linked. Closure expects proof, not an email saying it is done.",
    owner: "Action owner",
    decision: "Plan, priority, due date, and verification requirement.",
    screen: productProofScreens.correctiveActions,
  },
  {
    id: "qa",
    index: "09 QA",
    code: "QA",
    title: "Check completeness before a package is released.",
    body: "Independent review confirms the thread is complete enough to share, and any open item remains disclosed rather than hidden.",
    owner: "Independent reviewer",
    decision: "Package completeness, disclosed exceptions, and release readiness.",
    screen: productProofScreens.controlledRelease,
  },
  {
    id: "package",
    index: "10 PKG",
    code: "PKG",
    title: "Release a readiness package from approved live work.",
    body: "Scope, evidence, findings, actions, and exceptions assemble from the controlled chain — without claiming the survey outcome.",
    owner: "Accountable reviewer",
    decision: "Package readiness, disclosed exceptions, and release authorization.",
    screen: productProofScreens.auditReadiness,
  },
];

export function getDemoScrubBeatIndex(id: string | null | undefined): number {
  if (!id) return 0;
  const index = DEMO_SCRUB_BEATS.findIndex((beat) => beat.id === id);
  return index >= 0 ? index : 0;
}
