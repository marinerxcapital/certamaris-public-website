/**
 * Maritime cyber compliance glossary — plain-language operator definitions.
 * Not legal definitions; official instruments control.
 */

export type GlossaryTerm = {
  term: string;
  slug: string;
  shortDefinition: string;
  detail: string;
  relatedHrefs?: { title: string; href: string }[];
  tags?: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "SMS (Safety Management System)",
    slug: "sms",
    shortDefinition: "The company’s structured system for safe ship operation and pollution prevention under the ISM Code.",
    detail:
      "Under ISM, the SMS is the living system of policy, procedures, risk assessment, training, emergency preparedness, internal audit, and management review. MSC.428(98) positions cyber risk as a category of risk that should be addressed inside this structure — not only in a free-standing IT folder.",
    relatedHrefs: [
      { title: "IMO MSC.428(98) explained", href: "/resources/imo-msc-428-98-explained" },
      { title: "Compliance — IMO", href: "/compliance/imo" },
    ],
    tags: ["ISM", "IMO"],
  },
  {
    term: "DOC (Document of Compliance)",
    slug: "doc",
    shortDefinition: "Company-level ISM certificate confirming the SMS meets the Code for the ship types covered.",
    detail:
      "MSC.428(98) ties cyber risk management expectations to the first annual verification of the DOC after 1 January 2021. Operators should be able to show how cyber risk is managed in the SMS at DOC verification — not only produce a standalone cyber policy.",
    relatedHrefs: [{ title: "IMO instruments", href: "/compliance/imo" }],
    tags: ["ISM"],
  },
  {
    term: "MSC.428(98)",
    slug: "msc-428-98",
    shortDefinition: "IMO resolution encouraging administrations to ensure cyber risks are addressed in the SMS.",
    detail:
      "Adopted 2017. Does not create a separate cyber certification scheme. Operational timeline references DOC annual verification after 1 January 2021. Always read the official resolution text.",
    relatedHrefs: [
      { title: "Full explainer", href: "/resources/imo-msc-428-98-explained" },
      { title: "Topic landing", href: "/topics/imo-msc-428-98-compliance" },
    ],
    tags: ["IMO"],
  },
  {
    term: "IACS UR E26",
    slug: "ur-e26",
    shortDefinition: "IACS unified requirement for cyber resilience of ships (ship-level, design/construction oriented).",
    detail:
      "Applies from new construction contracts signed on or after 1 July 2024 per IACS effective application. Addresses the vessel as an integrated cyber-resilient system. Confirm class rules per hull.",
    relatedHrefs: [
      { title: "E26/E27 overview", href: "/resources/iacs-ur-e26-e27-overview" },
      { title: "Topic: UR E26", href: "/topics/iacs-ur-e26" },
    ],
    tags: ["IACS"],
  },
  {
    term: "IACS UR E27",
    slug: "ur-e27",
    shortDefinition: "IACS unified requirement for cyber resilience of on-board systems and equipment.",
    detail:
      "Works with E26: equipment/system properties versus ship-level architecture. OEM and integrator evidence often primary. Same general new-construction contract date applicability as E26 — confirm class and contract.",
    relatedHrefs: [
      { title: "E26/E27 overview", href: "/resources/iacs-ur-e26-e27-overview" },
      { title: "Topic: UR E27", href: "/topics/iacs-ur-e27" },
    ],
    tags: ["IACS"],
  },
  {
    term: "Computer-based system (CBS)",
    slug: "computer-based-system",
    shortDefinition: "Shipboard or shoreside system that relies on computing for functions relevant to operation or safety.",
    detail:
      "Inventories used for cyber resilience and SMS cyber risk management should identify computer-based systems, interfaces, and zones — not only office laptops. Scope depends on the instrument (E26-style ship design vs operational SMS).",
    relatedHrefs: [{ title: "IACS overview", href: "/compliance/iacs" }],
    tags: ["inventory", "OT"],
  },
  {
    term: "OT (Operational Technology)",
    slug: "ot",
    shortDefinition: "Hardware and software that monitors or controls physical ship processes and equipment.",
    detail:
      "Shipboard OT includes navigation, propulsion control interfaces, cargo and ballast automation, and similar systems. OT often needs distinct controls and evidence from corporate IT while still linking to the same requirement layer.",
    relatedHrefs: [{ title: "Vessel OT cybersecurity", href: "/topics/vessel-ot-cybersecurity" }],
    tags: ["OT"],
  },
  {
    term: "Evidence sufficiency",
    slug: "evidence-sufficiency",
    shortDefinition: "Whether an artifact actually supports a compliance or control claim under review.",
    detail:
      "Sufficiency typically requires relevance to the requirement, reliability and attribution, completeness of scope (vessel/system/time), and independent review — not merely that a file was uploaded.",
    relatedHrefs: [{ title: "Evidence sufficiency article", href: "/resources/evidence-sufficiency-cyber-compliance" }],
    tags: ["evidence"],
  },
  {
    term: "Corrective action verification",
    slug: "corrective-action-verification",
    shortDefinition: "Independent confirmation that a finding’s remedy was implemented and closes the gap.",
    detail:
      "Owner completion and reviewer verification should be separate steps. Self-attested “closed” without evidence understates residual risk in fleet metrics.",
    relatedHrefs: [{ title: "Verification article", href: "/resources/corrective-action-verification" }],
    tags: ["findings"],
  },
  {
    term: "Control mapping",
    slug: "control-mapping",
    shortDefinition: "Linking a regulatory or policy requirement to the controls, systems, and evidence that address it.",
    detail:
      "Good mapping makes requirement changes show which vessels, controls, and artifacts are affected. It is a workflow discipline — not automatic proof of compliance.",
    relatedHrefs: [{ title: "Mapping methodology", href: "/compliance/mapping-methodology" }],
    tags: ["mapping"],
  },
  {
    term: "Cyber risk register",
    slug: "cyber-risk-register",
    shortDefinition: "A governed list of cyber risks with treatment decisions, owners, and review dates.",
    detail:
      "A register without decisions, owners, and review cadence is only a list. Entries should connect back to assessments/findings and forward to actions or accepted residual risk.",
    relatedHrefs: [
      { title: "Reading a risk register", href: "/resources/reading-a-cyber-risk-register" },
      { title: "Topic: risk register", href: "/topics/vessel-cyber-risk-register" },
    ],
    tags: ["risk"],
  },
  {
    term: "SBOM (Software Bill of Materials)",
    slug: "sbom",
    shortDefinition: "A formal inventory of software components and dependencies in a system or product.",
    detail:
      "SBOMs support vulnerability and supply-chain visibility for shipboard and shoreside systems. They are one evidence type — not a complete cyber compliance program. Handling, freshness, and linkage to assets matter.",
    relatedHrefs: [{ title: "Maritime SBOM management", href: "/topics/maritime-sbom-management" }],
    tags: ["SBOM", "supply chain"],
  },
  {
    term: "DPA (Designated Person Ashore)",
    slug: "dpa",
    shortDefinition: "ISM role providing a shore-based link between company and ships for SMS effectiveness.",
    detail:
      "DPAs often coordinate SMS evidence for verification. Cyber risk work should be visible to the DPA path without forcing the DPA to become the sole IT owner of every technical control.",
    relatedHrefs: [{ title: "DPA cyber compliance", href: "/topics/dpa-cyber-compliance" }],
    tags: ["ISM", "roles"],
  },
  {
    term: "Readiness package",
    slug: "readiness-package",
    shortDefinition: "A pre-assembled set of scope, evidence, findings, and actions for a defined review event.",
    detail:
      "Used for survey, audit, or customer review. Quality depends on instrument-correct scope and fresh, linked evidence — not binder thickness.",
    relatedHrefs: [
      { title: "Survey readiness guide", href: "/resources/survey-readiness-package-guide" },
      { title: "Topic: survey readiness", href: "/topics/survey-readiness" },
    ],
    tags: ["audit"],
  },
  {
    term: "Flag State",
    slug: "flag-state",
    shortDefinition: "The administration under whose laws the ship is registered and which enforces applicable conventions.",
    detail:
      "Flag circulars and instructions can add detail on how IMO cyber instruments are expected to be implemented. Company procedures should cite the flags that actually apply to the fleet.",
    relatedHrefs: [{ title: "Official sources", href: "/compliance/official-sources" }],
    tags: ["regulatory"],
  },
  {
    term: "Classification society / RO",
    slug: "class-ro",
    shortDefinition: "Organization that classes ships and may act as Recognized Organization for statutory surveys.",
    detail:
      "Class implements IACS URs in society rules and surveys design/construction and in-service condition as applicable. Class does not replace the company’s SMS obligations under ISM.",
    relatedHrefs: [{ title: "IACS compliance", href: "/compliance/iacs" }],
    tags: ["class"],
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function glossarySorted(): GlossaryTerm[] {
  return [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
}
