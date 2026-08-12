export type ProductScreenAnnotation = {
  id: string;
  /** Short claim-safe callout label */
  label: string;
  /** Horizontal pin position as 0-100% of the screenshot image area */
  x: number;
  /** Vertical pin position as 0-100% of the screenshot image area */
  y: number;
};

export type ProductProofScreen = {
  src: string;
  /** Original-resolution source requested only from the exhibit link. */
  fullSrc: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  title: string;
  body: string;
  galleryOrder: number;
  /** Optional desktop callouts (max 3 rendered). x/y are % of the image area. */
  annotations?: ProductScreenAnnotation[];
};

const DASHBOARD_V2_BASE = "/product/dashboard-v2";

function dashboardV2Screen(
  file: string,
  details: Omit<ProductProofScreen, "src" | "fullSrc">
): ProductProofScreen {
  const src = `${DASHBOARD_V2_BASE}/${file}`;
  return {
    src,
    fullSrc: src,
    ...details,
  };
}

export const productProofScreens = {
  executiveReporting: dashboardV2Screen("executive-readiness.png", {
    width: 1440,
    height: 2048,
    alt:
      "CertaMaris Dashboard V2 executive readiness dashboard showing demo-data readiness signal, open findings, evidence requests, corrective actions, and assurance record traceability.",
    label: "Dashboard V2 · Executive readiness",
    title: "Executive readiness from the controlled record",
    body:
      "Give leadership a qualified demo-data view of readiness, evidence freshness, findings, risks, actions, and report-package state from Dashboard V2.",
    galleryOrder: 1,
    annotations: [
      { id: "er-demo", label: "Demo-data boundary visible", x: 48, y: 4 },
      { id: "er-signal", label: "Readiness signal with source context", x: 24, y: 23 },
      { id: "er-trace", label: "Assurance record trace", x: 82, y: 51 },
    ],
  }),
  requirementMapping: dashboardV2Screen("requirement-mapping.png", {
    width: 1440,
    height: 900,
    alt:
      "CertaMaris Dashboard V2 requirement mapping workspace showing demo findings, evidence, engagements, and program targets available for mapping.",
    label: "Dashboard V2 · Requirement mapping",
    title: "Requirement mapping with product context",
    body:
      "Map findings and evidence to program targets while keeping the demo-data boundary and mapping service status visible.",
    galleryOrder: 2,
    annotations: [
      { id: "rm-boundary", label: "Demo-data boundary visible", x: 42, y: 11 },
      { id: "rm-findings", label: "Findings available for mapping", x: 25, y: 47 },
      { id: "rm-targets", label: "Program targets and status", x: 75, y: 55 },
    ],
  }),
  evidenceCoverage: dashboardV2Screen("evidence-coverage.png", {
    width: 1440,
    height: 958,
    alt:
      "CertaMaris Dashboard V2 evidence coverage workspace showing sufficiency, freshness, evidence requests, and control coverage in demo data.",
    label: "Dashboard V2 · Evidence coverage",
    title: "Evidence coverage and freshness",
    body:
      "See sufficiency, freshness, gaps, and evidence requests at control level before review work becomes a document chase.",
    galleryOrder: 3,
    annotations: [
      { id: "ec-boundary", label: "Demo-data boundary visible", x: 42, y: 10 },
      { id: "ec-coverage", label: "Coverage and sufficiency", x: 27, y: 37 },
      { id: "ec-requests", label: "Open evidence requests", x: 76, y: 44 },
    ],
  }),
  findingsRegister: dashboardV2Screen("findings-register.png", {
    width: 1440,
    height: 1141,
    alt:
      "CertaMaris Dashboard V2 findings and risks register showing owned findings, severity, aging, risk context, and linked corrective-action workflow.",
    label: "Dashboard V2 · Findings register",
    title: "Findings with risk and control context",
    body:
      "Connect condition, severity, ownership, risk context, and follow-up workflow in one reviewable Dashboard V2 register.",
    galleryOrder: 4,
    annotations: [
      { id: "fr-register", label: "Findings retained as records", x: 32, y: 38 },
      { id: "fr-risk", label: "Risk context remains visible", x: 75, y: 42 },
      { id: "fr-actions", label: "Action path stays linked", x: 76, y: 70 },
    ],
  }),
  correctiveActions: dashboardV2Screen("corrective-actions.png", {
    width: 1440,
    height: 960,
    alt:
      "CertaMaris Dashboard V2 corrective actions register showing owners, priorities, due dates, status, and verification-oriented action records.",
    label: "Dashboard V2 · Corrective actions",
    title: "Remediation that can be verified",
    body:
      "Keep remediation owned, prioritized, dated, and connected to verification before closure is treated as complete.",
    galleryOrder: 5,
    annotations: [
      { id: "ca-open", label: "Open action queue", x: 24, y: 34 },
      { id: "ca-owner", label: "Owner and due date visible", x: 52, y: 55 },
      { id: "ca-verify", label: "Verification state retained", x: 80, y: 55 },
    ],
  }),
  auditReadiness: dashboardV2Screen("audit-readiness.png", {
    width: 1440,
    height: 900,
    alt:
      "CertaMaris Dashboard V2 reports and deliverables library showing controlled readiness packages, package status, release context, and export-oriented deliverables.",
    label: "Dashboard V2 · Readiness packages",
    title: "Readiness package preparation",
    body:
      "Prepare controlled deliverables with package status, source context, and review visibility without claiming audit outcomes.",
    galleryOrder: 6,
    annotations: [
      { id: "ar-package", label: "Package library", x: 28, y: 41 },
      { id: "ar-status", label: "Release and review status", x: 72, y: 33 },
      { id: "ar-boundary", label: "Demo-data boundary visible", x: 43, y: 11 },
    ],
  }),
  controlledRelease: dashboardV2Screen("controlled-release.png", {
    width: 1440,
    height: 900,
    alt:
      "CertaMaris Dashboard V2 controlled release center showing package release state, approval queues, exceptions, and controlled export workflow.",
    label: "Dashboard V2 · Controlled release",
    title: "Controlled release workflow",
    body:
      "Track release state, approvals, exceptions, and package controls before readiness material is shared.",
    galleryOrder: 7,
  }),
  fleetInventory: dashboardV2Screen("fleet-inventory.png", {
    width: 1440,
    height: 900,
    alt:
      "CertaMaris Dashboard V2 fleet and facilities inventory showing vessels, facilities, operating regions, status, criticality, and review cadence.",
    label: "Dashboard V2 · Fleet and facilities",
    title: "Fleet scope and review cadence",
    body:
      "Keep vessels, facilities, operating regions, status, criticality, and review cadence visible before readiness work is assembled.",
    galleryOrder: 8,
    annotations: [
      { id: "fi-vessels", label: "Vessels and facilities in scope", x: 32, y: 45 },
      { id: "fi-status", label: "Status and criticality visible", x: 68, y: 43 },
      { id: "fi-cadence", label: "Review cadence retained", x: 80, y: 63 },
    ],
  }),
  cybersecurityPlans: dashboardV2Screen("cybersecurity-plans.png", {
    width: 1440,
    height: 900,
    alt:
      "CertaMaris Dashboard V2 cybersecurity plan builder showing plan sections, review state, linked authorities, and controlled plan workflow.",
    label: "Dashboard V2 · Cybersecurity plans",
    title: "Cybersecurity plans with review state",
    body:
      "Keep plan sections, review state, linked authorities, and controlled workflow visible through preparation and release.",
    galleryOrder: 9,
    annotations: [
      { id: "cp-sections", label: "Plan sections in scope", x: 29, y: 45 },
      { id: "cp-review", label: "Review state visible", x: 73, y: 36 },
      { id: "cp-authority", label: "Authority links retained", x: 72, y: 66 },
    ],
  }),
  corporateControlPlane: dashboardV2Screen("corporate-control-plane.png", {
    width: 1440,
    height: 1291,
    alt:
      "CertaMaris Dashboard V2 internal corporate control plane showing portfolio oversight, client workspace context, support queues, and operational administration.",
    label: "Dashboard V2 · Corporate control plane",
    title: "Corporate control plane",
    body:
      "Show the internal portfolio and support workspace without exposing customer data or implying unrestricted tenant access.",
    galleryOrder: 10,
  }),
  clientCompanyPortal: dashboardV2Screen("client-company-portal.png", {
    width: 1440,
    height: 1010,
    alt:
      "CertaMaris Dashboard V2 organization workspace showing tenant organization context, engagement state, and company administration in demo data.",
    label: "Dashboard V2 · Client company portal",
    title: "Client company portal",
    body:
      "Represent the company-level tenant workspace for organization context, role-scoped administration, and engagement state.",
    galleryOrder: 11,
  }),
  clientFleet: dashboardV2Screen("client-fleet.png", {
    width: 1440,
    height: 1123,
    alt:
      "CertaMaris Dashboard V2 client fleet dashboard showing fleet readiness, vessel roll-up, open work, and evidence posture in demo data.",
    label: "Dashboard V2 · Client fleet",
    title: "Client fleet roll-up",
    body:
      "Summarize fleet readiness, vessel roll-up, evidence state, findings, and actions for company users.",
    galleryOrder: 12,
  }),
  vesselPortal: dashboardV2Screen("vessel-portal.png", {
    width: 1440,
    height: 1377,
    alt:
      "CertaMaris Dashboard V2 vessel portal showing vessel-scoped evidence, findings, systems, plans, and action context for a demo vessel.",
    label: "Dashboard V2 · Vessel portal",
    title: "Vessel-scoped assurance work",
    body:
      "Show how vessel context, systems, evidence, findings, and actions remain scoped to named users and vessel membership.",
    galleryOrder: 13,
  }),
  assessments: dashboardV2Screen("assessments.png", {
    width: 1440,
    height: 1613,
    alt:
      "CertaMaris Dashboard V2 assessments workspace showing assessments, controls, questionnaire work, and review status in demo data.",
    label: "Dashboard V2 · Assessments",
    title: "Assessment workspace",
    body:
      "Plan and review assessment work while keeping controls, questionnaires, evidence, and results connected.",
    galleryOrder: 14,
  }),
  integrations: dashboardV2Screen("integrations.png", {
    width: 1440,
    height: 900,
    alt:
      "CertaMaris Dashboard V2 integrations workspace showing configured integration categories, availability status, and implementation boundaries.",
    label: "Dashboard V2 · Integrations",
    title: "Integrations with availability boundaries",
    body:
      "Show identity, storage, API, import, SBOM, and export integration categories with availability labeled honestly.",
    galleryOrder: 15,
  }),
  continuousAssurance: dashboardV2Screen("continuous-assurance.png", {
    width: 1440,
    height: 2324,
    alt:
      "CertaMaris Dashboard V2 continuous assurance dashboard showing evidence freshness, control drift, assurance posture, and review queues.",
    label: "Dashboard V2 · Continuous assurance",
    title: "Continuous assurance signals",
    body:
      "Track evidence freshness, control drift, exceptions, and review queues between assessment cycles.",
    galleryOrder: 16,
  }),
  sbomVulnerabilityAssurance: dashboardV2Screen("sbom-vulnerability-assurance.png", {
    width: 1440,
    height: 2679,
    alt:
      "CertaMaris Dashboard V2 SBOM and supplier assurance dashboard showing supplier context, software bill of materials, and vulnerability review workflow.",
    label: "Dashboard V2 · SBOM assurance",
    title: "SBOM and vulnerability assurance",
    body:
      "Represent configurable supplier, SBOM, and vulnerability assurance workflows without claiming universal live telemetry.",
    galleryOrder: 17,
  }),
} satisfies Record<string, ProductProofScreen>;

export const productProofSequence: ProductProofScreen[] = [
  productProofScreens.executiveReporting,
  productProofScreens.requirementMapping,
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.correctiveActions,
  productProofScreens.auditReadiness,
  productProofScreens.controlledRelease,
  productProofScreens.fleetInventory,
  productProofScreens.cybersecurityPlans,
];
