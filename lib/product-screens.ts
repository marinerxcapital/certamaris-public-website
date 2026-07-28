export type ProductProofScreen = {
  src: string;
  alt: string;
  label: string;
  title: string;
  body: string;
  galleryOrder: number;
};

export const productProofScreens = {
  requirementMapping: {
    src: "/product/clean/requirement-control-mapping.png",
    alt: "CertaMaris control detail screen showing requirement mappings, implementation context, evidence tabs, known exceptions, and validation history.",
    label: "Requirement mapping",
    title: "Requirement mapping with evidence context",
    body: "A control record keeps regulatory mappings, implementation context, evidence, exceptions, and validation history together for review.",
    galleryOrder: 1,
  },
  evidenceCoverage: {
    src: "/product/clean/evidence-coverage.png",
    alt: "CertaMaris evidence sufficiency and coverage matrix showing coverage gaps, missing evidence, freshness status, and request-evidence actions.",
    label: "Evidence coverage",
    title: "Evidence coverage and freshness",
    body: "Coverage, freshness, and missing support are visible at the control level before a review turns into a document chase.",
    galleryOrder: 2,
  },
  findingsRegister: {
    src: "/product/clean/findings-register.png",
    alt: "CertaMaris findings and risks register showing open findings, risk ratings, owners, due dates, aging, and action context.",
    label: "Findings register",
    title: "Findings with action ownership",
    body: "Findings, risks, overdue actions, owners, due dates, and aging stay connected instead of disappearing into email threads.",
    galleryOrder: 3,
  },
  correctiveActions: {
    src: "/product/clean/corrective-actions.png",
    alt: "CertaMaris corrective actions register showing remediation work, related findings, owners, status, priority, and due dates.",
    label: "Corrective actions",
    title: "Remediation that can be verified",
    body: "Corrective actions stay owned, time-bound, and visible through verification instead of ending as an untracked finding.",
    galleryOrder: 4,
  },
  executiveReporting: {
    src: "/product/clean/executive-reporting.png",
    alt: "CertaMaris board pack screen showing a sanitized governance roll-up of portfolio health, risk exposure, attestation status, KPIs, and risk heatmap.",
    label: "Board pack",
    title: "Governance reporting",
    body: "A board-facing roll-up summarizes assurance posture, strategic risk, attestations, and operating indicators from the same underlying record.",
    galleryOrder: 5,
  },
  fleetInventory: {
    src: "/product/clean/fleet-inventory.png",
    alt: "CertaMaris fleet and facilities screen showing vessel counts, regions, in-scope assets, criticality, status, and last review dates.",
    label: "Fleet and facilities",
    title: "Fleet scope and review cadence",
    body: "Fleet scope, vessel status, locations, criticality, and review cadence stay visible before any audit package is assembled.",
    galleryOrder: 6,
  },
} satisfies Record<string, ProductProofScreen>;

export const productProofSequence = [
  productProofScreens.requirementMapping,
  productProofScreens.evidenceCoverage,
  productProofScreens.findingsRegister,
  productProofScreens.correctiveActions,
  productProofScreens.executiveReporting,
];
