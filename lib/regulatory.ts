/**
 * Regulatory framework metadata for CertaMaris compliance pages.
 * Official source URLs only. Mapping status is honest — no invented native auto-maps.
 * Not legal advice; official texts control.
 */

export type MappingStatus =
  | "workflow-supported"
  | "partial-workflow"
  | "reference-only"
  | "not-natively-mapped";

export type RegulatoryFramework = {
  id: string;
  slug: string;
  shortName: string;
  officialTitle: string;
  issuingAuthority: string;
  version: string;
  publicationDate: string | null;
  effectiveApplicability: string;
  scope: string;
  officialSourceUrl: string;
  summary: string;
  operationalImplications: string[];
  mappingStatus: MappingStatus;
  mappingStatusNote: string;
  relatedProductWorkflows: string[];
  category: "imo" | "iacs" | "industry" | "national" | "standards";
  lastReviewed: string;
  disclaimer: string;
};

export const REGULATORY_LAST_REVIEWED = "2026-07-31";
export const REGULATORY_LAST_REVIEWED_LABEL = "31 July 2026";

export const REGULATORY_DISCLAIMER =
  "This summary is for operational orientation only. It is not legal or regulatory advice, not a determination of applicability for any company or vessel, and not a guarantee of audit, survey, or inspection outcomes. Official IMO, IACS, flag-state, classification-society, and standards texts control. Where this page and the official instrument differ, the official instrument controls. Qualified human review is required.";

export const frameworks: RegulatoryFramework[] = [
  {
    id: "imo-msc-428-98",
    slug: "imo-msc-428-98",
    shortName: "IMO MSC.428(98)",
    officialTitle: "Maritime Cyber Risk Management in Safety Management Systems",
    issuingAuthority: "International Maritime Organization (IMO) — Maritime Safety Committee",
    version: "Resolution MSC.428(98)",
    publicationDate: "2017-06-16",
    effectiveApplicability:
      "Administrations encouraged to ensure cyber risks are appropriately addressed in SMS no later than the first annual verification of the company's Document of Compliance after 1 January 2021.",
    scope:
      "Cyber risk as a category of operational risk managed within the company's Safety Management System under the ISM Code framework — not a standalone cyber certification scheme.",
    officialSourceUrl: "https://www.imo.org/en/OurWork/Security/Pages/Cyber-security.aspx",
    summary:
      "MSC.428(98) encourages administrations to ensure that cyber risks are appropriately addressed in existing safety management systems. It does not create a separate cyber code or certificate. Cyber risk is treated as a risk category the SMS already must manage under the ISM Code, with a DOC-linked verification timeline after 1 January 2021.",
    operationalImplications: [
      "Cyber risk identification, assessment, procedures, training, and internal audit should be visible inside the SMS structure.",
      "Evidence should be attributable to SMS elements and ready for DOC annual verification and internal audit.",
      "Flag-state circulars and administration guidance may add national detail — company procedures should cite controlling sources that apply to the fleet.",
      "A document titled “Cyber Security Plan” is not automatically required by the resolution; managed cyber risk inside the SMS is the operational test.",
    ],
    mappingStatus: "workflow-supported",
    mappingStatusNote:
      "CertaMaris structures SMS-aligned cyber workflows (requirements, evidence, findings, corrective actions, readiness packages). It does not replace the SMS, certify ISM compliance, or determine DOC outcomes.",
    relatedProductWorkflows: [
      "Requirement and control mapping",
      "Evidence sufficiency and review",
      "Findings and corrective-action verification",
      "Audit / survey readiness packages",
      "Risk register decisions",
    ],
    category: "imo",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "ism-code",
    slug: "ism-code",
    shortName: "ISM Code",
    officialTitle: "International Management Code for the Safe Operation of Ships and for Pollution Prevention (ISM Code)",
    issuingAuthority: "International Maritime Organization (IMO)",
    version: "ISM Code (as amended; SOLAS Chapter IX framework)",
    publicationDate: null,
    effectiveApplicability:
      "Mandatory under SOLAS Chapter IX for applicable ships and companies; Document of Compliance (company) and Safety Management Certificate (ship) regimes apply as per flag and SOLAS.",
    scope:
      "Company safety management systems covering safe ship operation and pollution prevention — the structural home for cyber risk management under MSC.428(98).",
    officialSourceUrl: "https://www.imo.org/en/OurWork/HumanElement/Pages/ISMCode.aspx",
    summary:
      "The ISM Code requires a structured Safety Management System. MSC.428(98) does not replace ISM; it positions cyber risk as a category of risk the SMS should address. Operational cyber work should therefore align to SMS elements (policy, risk assessment, procedures, training, emergency preparedness, internal audit, management review) rather than live only as a free-standing IT folder.",
    operationalImplications: [
      "Cyber procedures and assessments should cross-reference SMS structure and be discoverable in internal audit.",
      "Non-conformities and corrective actions for cyber gaps should follow the same discipline as other SMS findings.",
      "DOC/SMC verification remains with flag, RO, and auditors — software does not issue ISM certificates.",
    ],
    mappingStatus: "workflow-supported",
    mappingStatusNote:
      "CertaMaris supports cyber assurance work that can sit alongside an ISM SMS. It is not SMS software and does not issue or maintain DOC/SMC.",
    relatedProductWorkflows: [
      "SMS-aligned evidence trails",
      "Findings and corrective actions",
      "Internal-audit style readiness packages",
    ],
    category: "imo",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "imo-msc-fal-circ-3",
    slug: "imo-msc-fal-circ-3",
    shortName: "IMO MSC-FAL.1/Circ.3",
    officialTitle: "Guidelines on Maritime Cyber Risk Management",
    issuingAuthority: "International Maritime Organization (IMO) — MSC and FAL Committees",
    version: "MSC-FAL.1/Circ.3 (and subsequent revisions as issued by IMO)",
    publicationDate: "2017-07-05",
    effectiveApplicability:
      "Non-mandatory guidelines supporting maritime cyber risk management practice; used alongside MSC.428(98) and national/class expectations. Confirm the revision your administration and class reference.",
    scope:
      "High-level functional elements of maritime cyber risk management (identify, protect, detect, respond, recover) tailored to ships and shipping companies — guidance, not a certification standard.",
    officialSourceUrl: "https://www.imo.org/en/OurWork/Security/Pages/Cyber-security.aspx",
    summary:
      "MSC-FAL.1/Circ.3 provides IMO guidelines on maritime cyber risk management. The circular supports practical implementation of cyber risk management concepts and is commonly read together with MSC.428(98). It is guidance: administrations, companies, and class may reference it, but the controlling applicability path for SMS remains ISM-linked instruments and flag instructions.",
    operationalImplications: [
      "Use the guidelines’ functional elements to structure company procedures and risk assessments where they fit your SMS.",
      "Do not treat the circular alone as a pass/fail certification checklist without flag/class context.",
      "When IMO reissues or revises the circular, re-check citations in company procedures and mapped controls.",
    ],
    mappingStatus: "partial-workflow",
    mappingStatusNote:
      "CertaMaris can hold requirement references and control mappings that teams align to guideline elements. There is no claim of automatic, complete native mapping of every Circ.3 clause out of the box.",
    relatedProductWorkflows: [
      "Requirement version tracking",
      "Control mapping",
      "Evidence linking",
    ],
    category: "imo",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "iacs-ur-e26",
    slug: "iacs-ur-e26",
    shortName: "IACS UR E26",
    officialTitle: "Cyber Resilience of Ships",
    issuingAuthority: "International Association of Classification Societies (IACS)",
    version: "UR E26 (as published by IACS; class society implementations may add detail)",
    publicationDate: null,
    effectiveApplicability:
      "Applies from new construction contracts signed on or after 1 July 2024 (per IACS unified requirement effective application). Confirm class rules and contract basis per hull.",
    scope:
      "Ship-level cyber resilience: computer-based systems identification, network architecture/segmentation, access control, and overall vessel cyber resilience properties at design and construction.",
    officialSourceUrl: "https://iacs.org.uk/resolutions/unified-requirements/ur-e",
    summary:
      "UR E26 addresses cyber resilience of the ship as a whole. It is design- and construction-oriented, not a retrofit checklist for the entire existing world fleet on a single date. Shipyard, owner specification, and class survey scope interact heavily at this level.",
    operationalImplications: [
      "Record contract date and class applicability per vessel — mixed fleets need explicit in-scope vs out-of-scope bases.",
      "Maintain ship-level inventories of computer-based systems, networks, and interfaces.",
      "Separate design/class evidence packages from operational SMS cyber evidence.",
      "Control post-delivery architecture changes that erode design assumptions.",
    ],
    mappingStatus: "workflow-supported",
    mappingStatusNote:
      "CertaMaris helps operators structure inventories, evidence, findings, and readiness work related to cyber resilience. It does not certify UR E26 compliance or replace class survey.",
    relatedProductWorkflows: [
      "Fleet and system inventory",
      "Evidence packages",
      "Findings and exceptions",
      "Survey readiness",
    ],
    category: "iacs",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "iacs-ur-e27",
    slug: "iacs-ur-e27",
    shortName: "IACS UR E27",
    officialTitle: "Cyber Resilience of On-board Systems and Equipment",
    issuingAuthority: "International Association of Classification Societies (IACS)",
    version: "UR E27 (as published by IACS; class society implementations may add detail)",
    publicationDate: null,
    effectiveApplicability:
      "Applies from new construction contracts signed on or after 1 July 2024 (per IACS unified requirement effective application), in conjunction with E26 ship-level requirements. Confirm class and contract basis.",
    scope:
      "Systems and equipment-level cyber resilience properties for on-board computer-based systems integrated into the ship architecture — OEM, integrator, and supplier demonstration often primary.",
    officialSourceUrl: "https://iacs.org.uk/resolutions/unified-requirements/ur-e",
    summary:
      "UR E27 addresses cyber resilience of on-board systems and equipment. It works with E26: E27 defines resilient systems/equipment; E26 addresses how they function together as a resilient ship. Evidence ownership should be explicit across OEM, shipyard, owner, and class.",
    operationalImplications: [
      "Retain OEM/supplier cyber resilience documentation against vessel and system identity with version dates.",
      "Procurement and integration should capture interface and configuration baselines.",
      "Do not assume E27 equipment statements substitute for E26 ship-level architecture evidence, or for SMS operational cyber risk management.",
    ],
    mappingStatus: "workflow-supported",
    mappingStatusNote:
      "CertaMaris can store and link supplier/system evidence and findings. It does not issue E27 equipment certificates or class approvals.",
    relatedProductWorkflows: [
      "System-level evidence",
      "Supplier documentation linkage",
      "Findings on equipment gaps",
    ],
    category: "iacs",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "bimco-cyber",
    slug: "bimco-cyber-guidance",
    shortName: "BIMCO cyber guidance",
    officialTitle: "The Guidelines on Cyber Security Onboard Ships (industry guidance series)",
    issuingAuthority: "BIMCO and co-sponsoring industry associations (joint industry guidelines)",
    version: "Industry guidelines (confirm current edition from BIMCO / co-sponsors)",
    publicationDate: null,
    effectiveApplicability:
      "Non-mandatory industry guidance widely used by operators for practical cyber security on board. Not a substitute for IMO, flag, or class instruments.",
    scope:
      "Practical shipboard and company cyber security practices, roles, and risk-management habits for commercial shipping — high-level industry guidance.",
    officialSourceUrl: "https://www.bimco.org/",
    summary:
      "BIMCO and industry partners publish guidelines on cyber security onboard ships that many operators use as practical reference. They support good practice and training conversations but do not replace MSC.428(98), the ISM Code, IACS URs, flag instructions, or class rules.",
    operationalImplications: [
      "Useful for crew awareness, company procedure design, and gap discussions — cite the edition your company adopts.",
      "Map adopted practices back into SMS and evidence structures if they are intended to support ISM-linked cyber risk management.",
      "Always confirm current edition and co-sponsor list from official industry sources.",
    ],
    mappingStatus: "reference-only",
    mappingStatusNote:
      "CertaMaris does not claim native automatic mapping of BIMCO guideline clauses. Teams may reference guidance when building procedures and evidence structures.",
    relatedProductWorkflows: [
      "Procedure and evidence organization",
      "Training-related records (where used)",
    ],
    category: "industry",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "nist-csf",
    slug: "nist-csf",
    shortName: "NIST CSF",
    officialTitle: "Framework for Improving Critical Infrastructure Cybersecurity (Cybersecurity Framework)",
    issuingAuthority: "U.S. National Institute of Standards and Technology (NIST)",
    version: "CSF 2.0 (and prior 1.1 where still referenced by organizations)",
    publicationDate: "2024-02-26",
    effectiveApplicability:
      "Voluntary framework. Organizations adopt it by choice or contractual/regulatory reference. Not a maritime-specific mandatory instrument.",
    scope:
      "Enterprise cybersecurity risk management outcomes across govern, identify, protect, detect, respond, and recover functions — cross-sector, including organizations that operate maritime assets.",
    officialSourceUrl: "https://www.nist.gov/cyberframework",
    summary:
      "NIST CSF provides a common language for cybersecurity outcomes. Maritime operators sometimes map SMS cyber work or shoreside IT programs to CSF functions for board reporting or customer questionnaires. It is complementary context, not a replacement for IMO/IACS instruments.",
    operationalImplications: [
      "Useful for shoreside IT governance alignment and executive reporting language.",
      "If used, keep maritime regulatory mappings (ISM/IMO/IACS) distinct so survey packages stay instrument-correct.",
      "CSF profiles are organization-specific — no universal “maritime CSF certificate.”",
    ],
    mappingStatus: "partial-workflow",
    mappingStatusNote:
      "CertaMaris can support control and evidence structures that teams align to CSF-style categories. There is no claim of complete native automatic CSF profile generation for every customer.",
    relatedProductWorkflows: [
      "Control mapping",
      "Evidence and findings",
      "Executive reporting",
    ],
    category: "standards",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "nist-sp-800-82",
    slug: "nist-sp-800-82",
    shortName: "NIST SP 800-82",
    officialTitle: "Guide to Operational Technology (OT) Security",
    issuingAuthority: "U.S. National Institute of Standards and Technology (NIST)",
    version: "SP 800-82 (current revision as published by NIST)",
    publicationDate: null,
    effectiveApplicability:
      "Voluntary guidance for OT security. Often used as technical reference for industrial/OT environments; not a maritime class or flag mandate by itself.",
    scope:
      "Security of operational technology systems — relevant by analogy to shipboard OT and industrial control contexts, with careful translation to vessel environments.",
    officialSourceUrl: "https://csrc.nist.gov/pubs/sp/800/82/r3/final",
    summary:
      "NIST SP 800-82 guides OT security practices. Shipboard OT differs from shore industrial plants, but concepts (segmentation, change control, inventory, least privilege) inform vessel OT cyber work. Always adapt with maritime class, OEM, and SMS context.",
    operationalImplications: [
      "Supports OT inventory, zoning, and hardening discussions for technical teams.",
      "Do not paste industrial control baselines onto ships without class/OEM and operational safety review.",
      "Keep OT evidence distinct from pure IT evidence while linking both to requirements.",
    ],
    mappingStatus: "reference-only",
    mappingStatusNote:
      "CertaMaris supports OT/IT-distinct control and evidence structures. It does not natively auto-map every SP 800-82 control to vessels.",
    relatedProductWorkflows: [
      "OT/IT inventory and controls",
      "Evidence linkage",
    ],
    category: "standards",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "iec-62443",
    slug: "iec-62443",
    shortName: "IEC 62443",
    officialTitle: "Industrial communication networks — Security for industrial automation and control systems (IEC 62443 series)",
    issuingAuthority: "International Electrotechnical Commission (IEC)",
    version: "IEC 62443 series (parts as applicable)",
    publicationDate: null,
    effectiveApplicability:
      "Standards series used by industry, integrators, and some class/OEM programs. Applicability is contract- and product-specific — not automatically mandatory for all ships.",
    scope:
      "Security for industrial automation and control systems across policies, system, and component levels — relevant to OT suppliers and integrated ship systems where specified.",
    officialSourceUrl: "https://www.iec.ch/dyn/www/f?p=103:23:0::::FSP_ORG_ID:1250",
    summary:
      "IEC 62443 is a multi-part series for industrial automation and control system security. Maritime OEMs and integrators may reference parts of the series in product security claims. Operators should treat 62443 evidence as supplier/system documentation within broader ship and SMS frameworks.",
    operationalImplications: [
      "Request which 62443 parts and maturity claims suppliers actually assert — and retain test evidence.",
      "Do not equate a supplier 62443 claim with ship-level UR E26 compliance or ISM cyber risk management completeness.",
    ],
    mappingStatus: "reference-only",
    mappingStatusNote:
      "CertaMaris can hold supplier evidence and system findings. It does not certify IEC 62443 conformance.",
    relatedProductWorkflows: [
      "Supplier evidence",
      "System findings",
    ],
    category: "standards",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "iso-27001",
    slug: "iso-27001-27002",
    shortName: "ISO/IEC 27001 / 27002",
    officialTitle: "Information security, cybersecurity and privacy protection — Information security management systems (27001) and controls (27002)",
    issuingAuthority: "International Organization for Standardization (ISO) / IEC",
    version: "ISO/IEC 27001:2022 and ISO/IEC 27002:2022 (confirm edition in use)",
    publicationDate: "2022-10-25",
    effectiveApplicability:
      "Voluntary management system standard (27001) and control guidance (27002). Certification is organization-scope-specific when pursued. Not a ship class notation substitute.",
    scope:
      "Organization-level information security management — typically shoreside corporate ISMS scope; may include systems that support fleet operations depending on certification boundary.",
    officialSourceUrl: "https://www.iso.org/standard/27001",
    summary:
      "ISO/IEC 27001 defines requirements for an ISMS; 27002 provides control guidance. Shipping companies may hold or pursue ISO 27001 for shoreside IT. That is complementary to, not a replacement for, IMO SMS cyber risk management and IACS design-stage cyber resilience requirements.",
    operationalImplications: [
      "Keep ISMS scope boundaries clear versus vessel SMS and class evidence.",
      "Reuse controls where sensible, but survey packages should still speak IMO/IACS language when those instruments apply.",
    ],
    mappingStatus: "partial-workflow",
    mappingStatusNote:
      "CertaMaris can support evidence and control tracking that teams align to ISMS-style controls. It is not an ISO certification body and does not claim automatic 27001 certification mapping for all clauses.",
    relatedProductWorkflows: [
      "Control and evidence management",
      "Findings and corrective actions",
      "Governance reporting",
    ],
    category: "standards",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "uscg-maritime-cyber",
    slug: "uscg-maritime-cyber",
    shortName: "USCG maritime cyber",
    officialTitle: "U.S. Coast Guard maritime cybersecurity requirements and guidance (including NVIC and regulatory actions as applicable)",
    issuingAuthority: "United States Coast Guard (USCG)",
    version: "Confirm current NVIC, rulemaking, and facility/vessel applicability for your operation",
    publicationDate: null,
    effectiveApplicability:
      "U.S.-flag and U.S. port/facility regimes apply based on vessel/facility type and current USCG instruments. Not automatically global for non-U.S. operations. Verify current federal requirements for your assets.",
    scope:
      "Cyber risk management expectations for applicable U.S. maritime transportation system entities — vessels, facilities, and outer continental shelf facilities as defined by controlling USCG instruments.",
    officialSourceUrl: "https://www.dco.uscg.mil/Our-Organization/Assistant-Commandant-for-Prevention-Policy-CG-5P/Inspections-Compliance-CG-5PC-/Office-of-Port-Facility-Compliance/Maritime-Security-MTSA/",
    summary:
      "The U.S. Coast Guard has issued maritime cybersecurity guidance and has advanced regulatory requirements affecting applicable MTSA-regulated entities and related maritime operations. Operators with U.S. nexus must track the current binding instruments (rules, NVICs, policy) for their vessel or facility type rather than relying on marketing summaries.",
    operationalImplications: [
      "Confirm whether your vessels/facilities fall under current USCG cyber requirements and which compliance date applies.",
      "Align evidence and plans to the specific USCG instrument set — do not assume IMO-only packages satisfy USCG where both apply.",
      "Official USCG texts and Federal Register publications control.",
    ],
    mappingStatus: "partial-workflow",
    mappingStatusNote:
      "CertaMaris can structure cyber plans, evidence, and findings for operators who include USCG-oriented work in their program. There is no claim of automatic full native mapping of every current USCG cyber clause for all entity types.",
    relatedProductWorkflows: [
      "Plan and evidence management",
      "Findings and corrective actions",
      "Readiness packages",
    ],
    category: "national",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
  {
    id: "nis2-maritime",
    slug: "nis2-maritime",
    shortName: "NIS2 (maritime implications)",
    officialTitle: "Directive (EU) 2022/2555 on measures for a high common level of cybersecurity across the Union (NIS2 Directive)",
    issuingAuthority: "European Union (transposed by Member States)",
    version: "Directive (EU) 2022/2555; national transposition acts control locally",
    publicationDate: "2022-12-14",
    effectiveApplicability:
      "Applies to essential and important entities as defined by NIS2 and national law. Transport (including water transport) appears among sectors — exact entity scope, thresholds, and duties depend on Member State transposition and entity classification.",
    scope:
      "EU-wide cybersecurity risk-management and reporting duties for in-scope entities. Maritime companies may be in scope via water transport or related digital infrastructure classifications — high-level only; legal determination is entity- and jurisdiction-specific.",
    officialSourceUrl: "https://digital-strategy.ec.europa.eu/en/policies/nis2-directive",
    summary:
      "NIS2 raises cybersecurity risk-management and incident-reporting expectations for in-scope entities in the EU. Some shipping and port-related organizations may fall in scope under national law. NIS2 is not a ship class notation and does not replace IMO SMS cyber risk management, but it can add corporate cybersecurity governance and reporting duties for EU-connected operations.",
    operationalImplications: [
      "Obtain legal determination of entity status under relevant Member State law — do not self-classify from a marketing page.",
      "Where in scope, align governance, supply-chain, and incident processes with national requirements while keeping vessel SMS evidence coherent.",
      "Cross-border fleets need jurisdiction-specific analysis.",
    ],
    mappingStatus: "reference-only",
    mappingStatusNote:
      "CertaMaris does not determine NIS2 entity scope or replace legal counsel. It can support evidence and control workflows that organizations choose to align with their broader cyber program.",
    relatedProductWorkflows: [
      "Control and evidence management",
      "Incident-related findings (where used operationally)",
      "Governance reporting",
    ],
    category: "national",
    lastReviewed: REGULATORY_LAST_REVIEWED,
    disclaimer: REGULATORY_DISCLAIMER,
  },
];

export function getFrameworkById(id: string): RegulatoryFramework | undefined {
  return frameworks.find((f) => f.id === id || f.slug === id);
}

export function getFrameworksByCategory(category: RegulatoryFramework["category"]): RegulatoryFramework[] {
  return frameworks.filter((f) => f.category === category);
}

export function mappingStatusLabel(status: MappingStatus): string {
  switch (status) {
    case "workflow-supported":
      return "Workflow supported";
    case "partial-workflow":
      return "Partial workflow support";
    case "reference-only":
      return "Reference only";
    case "not-natively-mapped":
      return "Not natively mapped";
    default:
      return status;
  }
}

export const complianceNavLinks: { href: string; title: string; description: string }[] = [
  {
    href: "/compliance/imo",
    title: "IMO instruments",
    description: "MSC.428(98), ISM Code context, and MSC-FAL.1/Circ.3 guidelines.",
  },
  {
    href: "/compliance/iacs",
    title: "IACS UR E26 & E27",
    description: "Ship-level and equipment-level cyber resilience at design stage.",
  },
  {
    href: "/compliance/guidelines",
    title: "Standards & guidelines",
    description: "BIMCO, NIST CSF, SP 800-82, IEC 62443, ISO 27001/27002 — high-level.",
  },
  {
    href: "/compliance/official-sources",
    title: "Official sources",
    description: "Authoritative links and how we cite controlling texts.",
  },
  {
    href: "/compliance/mapping-methodology",
    title: "Mapping methodology",
    description: "How CertaMaris structures requirement-to-control work — honestly.",
  },
  {
    href: "/compliance/update-center",
    title: "Update center",
    description: "What changes, what we review, and how operators should respond.",
  },
];
