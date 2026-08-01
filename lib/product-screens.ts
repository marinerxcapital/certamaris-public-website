export type ProductScreenAnnotation = {
  id: string;
  /** Short claim-safe callout label */
  label: string;
  /** Horizontal pin position as 0–100% of the screenshot image area */
  x: number;
  /** Vertical pin position as 0–100% of the screenshot image area */
  y: number;
};

export type ProductProofScreen = {
  src: string;
  /** Original-resolution source requested only after opening the gallery. */
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

export const productProofScreens = {
  requirementMapping: {
    src: "/product/updated/requirement-mapping.png",
    fullSrc: "/product/updated/requirement-mapping.png",
    width: 1440,
    height: 2194,
    alt: "CertaMaris requirement mapping workspace showing source requirements, target controls, and current mapping status.",
    label: "Requirement mapping",
    title: "Requirement mapping with control context",
    body: "Map maritime requirements to controls in a reviewable matrix while keeping source clauses and mapping status visible together.",
    galleryOrder: 1,
  },
  evidenceCoverage: {
    src: "/product/updated/evidence-coverage.png",
    fullSrc: "/product/updated/evidence-coverage.png",
    width: 1440,
    height: 2194,
    alt: "CertaMaris evidence coverage workspace showing control coverage, freshness, expiring evidence, and evidence requests.",
    label: "Evidence coverage",
    title: "Evidence coverage and freshness",
    body: "See coverage gaps, freshness, and missing support at control level before a review becomes a document chase.",
    galleryOrder: 2,
  },
  findingsRegister: {
    src: "/product/updated/findings-register.png",
    fullSrc: "/product/updated/findings-register.png",
    width: 1440,
    height: 2194,
    alt: "CertaMaris finding detail workspace showing narrative, impact assessment, affected controls, and linked actions.",
    label: "Findings register",
    title: "Findings with control context",
    body: "Connect finding narrative, impact, affected controls, evidence, and follow-up actions in one reviewable record.",
    galleryOrder: 3,
  },
  correctiveActions: {
    src: "/product/updated/corrective-actions.png",
    fullSrc: "/product/updated/corrective-actions.png",
    width: 1440,
    height: 2194,
    alt: "CertaMaris corrective actions workspace showing owned remediation work, status, priority, and due dates.",
    label: "Corrective actions",
    title: "Remediation that can be verified",
    body: "Keep remediation owned, time-bound, and connected to verification instead of ending as an untracked finding.",
    galleryOrder: 4,
  },
  auditReadiness: {
    src: "/product/updated/audit-readiness.png",
    fullSrc: "/product/updated/audit-readiness.png",
    width: 1440,
    height: 2194,
    alt: "CertaMaris deliverables workspace showing readiness outputs, approval state, retention, and controlled release records.",
    label: "Audit readiness",
    title: "Readiness package preparation",
    body: "Prepare controlled deliverables with approval state, release history, retention, and review visibility in one place.",
    galleryOrder: 5,
  },
  executiveReporting: {
    src: "/product/updated/executive-readiness.png",
    fullSrc: "/product/updated/executive-readiness.png",
    width: 1440,
    height: 1100,
    alt: "CertaMaris executive readiness dashboard showing composite readiness, incident trend, regulator readiness, and governance milestones.",
    label: "Executive readiness",
    title: "Executive readiness at a glance",
    body: "Give leadership a concise view of readiness, evidence freshness, incidents, regulator posture, and upcoming governance milestones.",
    galleryOrder: 6,
  },
  fleetInventory: {
    src: "/product/updated/fleet-inventory.png",
    fullSrc: "/product/updated/fleet-inventory.png",
    width: 1440,
    height: 2194,
    alt: "CertaMaris fleet and facilities workspace showing vessels, facilities, scope, regions, status, criticality, and review cadence.",
    label: "Fleet and facilities",
    title: "Fleet scope and review cadence",
    body: "Keep vessels, facilities, regions, criticality, status, and review cadence visible before assembling a readiness package.",
    galleryOrder: 7,
  },
  cybersecurityPlans: {
    src: "/product/updated/cybersecurity-plans.png",
    fullSrc: "/product/updated/cybersecurity-plans.png",
    width: 1440,
    height: 2194,
    alt: "CertaMaris cybersecurity plan workspace showing plan sections, owners, coverage, approval workflow, and linked authorities.",
    label: "Cybersecurity plans",
    title: "Cybersecurity plans with review state",
    body: "Keep plan sections, owners, coverage, approval workflow, and linked authorities visible through controlled review.",
    galleryOrder: 8,
  },
} satisfies Record<string, ProductProofScreen>;

export const productProofSequence: ProductProofScreen[] = [
  productProofScreens.requirementMapping,
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.correctiveActions,
  productProofScreens.auditReadiness,
  productProofScreens.executiveReporting,
  productProofScreens.fleetInventory,
  productProofScreens.cybersecurityPlans,
];
