/**
 * High-intent SEO topic landings — honest product framing, no keyword stuffing.
 */

export type TopicPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string }[];
  relatedResources: { title: string; href: string }[];
  relatedCompliance?: { title: string; href: string }[];
  productLinks: { title: string; href: string }[];
  faqs?: { question: string; answer: string }[];
};

export const topics: TopicPage[] = [
  {
    slug: "maritime-cybersecurity-compliance-software",
    title: "Maritime cybersecurity compliance software",
    metaTitle: "Maritime Cybersecurity Compliance Software",
    metaDescription:
      "How maritime cybersecurity compliance software structures requirements, evidence, findings, and readiness — without claiming to certify compliance.",
    eyebrow: "Topic",
    intro:
      "Operators need more than a document library. Maritime cybersecurity compliance software should connect requirements to controls, evidence, findings, and readiness packages across the fleet — while leaving applicability and outcomes to qualified humans.",
    sections: [
      {
        heading: "What “compliance software” should and should not mean",
        body: "Useful platforms organize work: inventories, mappings, evidence review, corrective actions, and packages for audit or survey. They should not claim to replace flag, class, legal counsel, or to guarantee DOC, survey, or inspection results. CertaMaris is built for structured cyber assurance workflows inside that honest boundary.",
      },
      {
        heading: "Fleet-scale problems software can actually help with",
        body: "Version drift across vessels, unclear ownership of findings, stale evidence, and last-minute package assembly are operational failures. A system of record with review decisions and requirement links reduces reconstruction from email — it does not invent compliance.",
      },
      {
        heading: "How CertaMaris approaches the category",
        body: "Requirement and control mapping, evidence sufficiency with review, findings with independent verification of actions, risk-register decisions, and readiness packages. IT and OT mappings can stay distinct while linking to the same requirement layer.",
      },
    ],
    relatedResources: [
      { title: "Fleet-scale cyber governance", href: "/resources/fleet-scale-cyber-governance" },
      { title: "Evidence sufficiency", href: "/resources/evidence-sufficiency-cyber-compliance" },
    ],
    relatedCompliance: [{ title: "Compliance overview", href: "/compliance" }],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Pricing context", href: "/pricing" },
      { title: "Request a readiness call", href: "/contact" },
    ],
    faqs: [
      {
        question: "Does CertaMaris certify maritime cyber compliance?",
        answer:
          "No. CertaMaris structures workflows and records. Certification, survey, and legal determinations remain with competent authorities, class, auditors, and qualified advisors.",
      },
      {
        question: "Is this only for new builds under IACS UR E26/E27?",
        answer:
          "No. Design-stage URs matter for in-scope new construction, but operating fleets also need SMS-aligned cyber risk management under IMO instruments. Mixed fleets need both evidence types kept distinct.",
      },
    ],
  },
  {
    slug: "imo-msc-428-98-compliance",
    title: "IMO MSC.428(98) compliance — operational view",
    metaTitle: "IMO MSC.428(98) Compliance",
    metaDescription:
      "Operational overview of IMO MSC.428(98): cyber risk in the SMS, DOC-linked timeline, and how software supports evidence — not certification.",
    eyebrow: "IMO",
    intro:
      "MSC.428(98) encourages administrations to ensure cyber risks are appropriately addressed in safety management systems. Compliance work is SMS-shaped: assessment, procedures, training, audit evidence — not a separate cyber plaque.",
    sections: [
      {
        heading: "What the resolution emphasizes",
        body: "Cyber risk as a managed category under the ISM SMS, with an operational timeline tied to DOC annual verification after 1 January 2021. It does not create a standalone cyber code.",
      },
      {
        heading: "What operators typically need to show",
        body: "Where cyber risk lives in the SMS, current assessments, procedures and training that match practice, internal audit coverage, and evidence that is attributable and fresh enough for verification.",
      },
      {
        heading: "Software support without overclaim",
        body: "CertaMaris helps structure mappings, evidence, findings, and readiness packages aligned to SMS-style cyber work. Official text and flag instructions control; the platform does not determine DOC outcomes.",
      },
    ],
    relatedResources: [
      { title: "MSC.428(98) explained", href: "/resources/imo-msc-428-98-explained" },
      { title: "Risk assessment checklist", href: "/resources/maritime-cyber-risk-assessment-checklist" },
    ],
    relatedCompliance: [{ title: "IMO instruments", href: "/compliance/imo" }],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "iacs-ur-e26",
    title: "IACS UR E26 — cyber resilience of ships",
    metaTitle: "IACS UR E26 Cyber Resilience of Ships",
    metaDescription:
      "Ship-level cyber resilience under IACS UR E26: design-stage scope, contract date applicability, and operator evidence habits for mixed fleets.",
    eyebrow: "IACS",
    intro:
      "UR E26 addresses cyber resilience of the ship as a whole — systems identification, networks, access control, and ship-level properties — primarily at design and construction for contracts from 1 July 2024.",
    sections: [
      {
        heading: "Ship-level, not a global retrofit day",
        body: "Applicability is contract- and class-based. Existing fleets and pre-date contracts may never have been designed to E26. Operators should record the basis per hull.",
      },
      {
        heading: "Evidence operators still care about",
        body: "Architecture and inventory currency after delivery, change control for networks and remote access, and clear separation of class/design packages from SMS operational evidence.",
      },
      {
        heading: "A practical E26 evidence trail",
        body: "Record the vessel, class basis, shipbuilding contract date, applicable revision, approved design references, network and system boundaries, test or review artifacts, responsible parties, and later changes. Keep class acceptance records distinct from operator-created assurance notes so a reviewer can see the source and authority of each claim.",
      },
    ],
    relatedResources: [{ title: "E26 and E27 overview", href: "/resources/iacs-ur-e26-e27-overview" }],
    relatedCompliance: [{ title: "IACS pages", href: "/compliance/iacs" }],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "iacs-ur-e27",
    title: "IACS UR E27 — systems and equipment cyber resilience",
    metaTitle: "IACS UR E27 On-board Systems Cyber Resilience",
    metaDescription:
      "Equipment- and system-level cyber resilience under IACS UR E27, supplier evidence, and how it pairs with ship-level UR E26.",
    eyebrow: "IACS",
    intro:
      "UR E27 focuses on cyber resilience of on-board systems and equipment. OEMs and integrators often carry primary demonstration burden; owners need retained, versioned evidence linked to the vessel.",
    sections: [
      {
        heading: "E27 with E26",
        body: "Resilient equipment poorly integrated into a weak ship architecture still fails the ship-level story. Contracts should make evidence ownership explicit across OEM, yard, owner, and class.",
      },
      {
        heading: "Operator habits",
        body: "Store supplier test evidence, baselines, and interface descriptions against system identity. Track post-delivery substitutions that invalidate prior claims.",
      },
      {
        heading: "Supplier evidence and change control",
        body: "For each in-scope system, preserve the OEM and model identity, software or firmware baseline, declared interfaces, security functions, test evidence, limitations, and the class or yard review context. A replacement component, version change, or new remote path should trigger reassessment rather than inheriting an earlier acceptance automatically.",
      },
    ],
    relatedResources: [{ title: "E26 and E27 overview", href: "/resources/iacs-ur-e26-e27-overview" }],
    relatedCompliance: [{ title: "IACS pages", href: "/compliance/iacs" }],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "maritime-cyber-risk-assessment",
    title: "Maritime cyber risk assessment",
    metaTitle: "Maritime Cyber Risk Assessment",
    metaDescription:
      "How to structure maritime cyber risk assessments for SMS review: scope, scenarios, residual risk, owners, and review cadence.",
    eyebrow: "Risk",
    intro:
      "A maritime cyber risk assessment supports governance when it records scope, scenarios tied to safe operation, residual risk, treatment decisions, and owners — not only a qualitative label.",
    sections: [
      {
        heading: "SMS-aligned assessment",
        body: "Assessments should be discoverable in the SMS, linked to procedures, and refreshed on a defined cadence or after major change. Generic “cyber is considered” statements are weak under audit.",
      },
      {
        heading: "From assessment to register and actions",
        body: "Material risks should appear in a register with decisions and flow into corrective work with verification. CertaMaris structures that trail; risk acceptance remains a human authority decision.",
      },
      {
        heading: "Assessment evidence a reviewer can follow",
        body: "Define the vessel and system boundary, credible operational scenarios, existing safeguards, consequence and likelihood rationale, treatment decisions, residual risk authority, and review triggers. Link each treatment to an owner and evidence of completion so the assessment remains connected to current operations instead of becoming a dated standalone report.",
      },
    ],
    relatedResources: [
      { title: "Risk assessment checklist", href: "/resources/maritime-cyber-risk-assessment-checklist" },
      { title: "Reading a risk register", href: "/resources/reading-a-cyber-risk-register" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "vessel-cybersecurity-plan",
    title: "Vessel cybersecurity plan",
    metaTitle: "Vessel Cybersecurity Plan",
    metaDescription:
      "What a vessel cybersecurity plan is for, how it relates to the SMS under MSC.428(98), and how to keep it evidence-backed.",
    eyebrow: "Plans",
    intro:
      "Many companies maintain a cyber security plan or procedures set for vessels. Under MSC.428(98), the operational test is whether cyber risk is managed in the SMS — plan titles alone do not equal compliance.",
    sections: [
      {
        heading: "Plan as operating system, not cover sheet",
        body: "A useful plan defines roles, inventories, access and change rules, incident paths, training expectations, and how evidence is kept. It should match practice on board and ashore.",
      },
      {
        heading: "Version control at fleet scale",
        body: "Sister vessels and managers diverge quickly if plans live only in email. A controlled record with ownership and review dates is the practical requirement for multi-vessel operators.",
      },
      {
        heading: "What to review after operational change",
        body: "Revisit the plan after system replacement, network redesign, remote-access changes, a cyber event, audit findings, or a material regulatory update. Record who approved the revision, which vessels received it, what training or acknowledgement followed, and which evidence demonstrates that the written procedure still matches onboard and shoreside practice.",
      },
    ],
    relatedResources: [
      { title: "MSC.428(98) explained", href: "/resources/imo-msc-428-98-explained" },
      { title: "Fleet-scale governance", href: "/resources/fleet-scale-cyber-governance" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "fleet-cyber-risk-management",
    title: "Fleet cyber risk management",
    metaTitle: "Fleet Cyber Risk Management",
    metaDescription:
      "Fleet cyber risk management: roll-up visibility, ownership, evidence freshness, and distinct design vs SMS evidence across hulls.",
    eyebrow: "Fleet",
    intro:
      "Fleet cyber risk management fails when each vessel is a private folder. Operators need roll-up of open risks, findings, evidence age, and instrument applicability without false sameness across hulls.",
    sections: [
      {
        heading: "Compare like with like",
        body: "New-build E26/E27 evidence and operational SMS cyber evidence answer different questions. Dashboards should not imply every vessel is measured on the same basis unless that is true.",
      },
      {
        heading: "Ownership and review cadence",
        body: "Findings and register entries need named owners and due dates. Fleet governance is the habit of closing loops with verification, not only collecting PDFs.",
      },
      {
        heading: "Fleet roll-up without hiding vessel context",
        body: "A useful roll-up distinguishes overdue actions, stale evidence, open high-consequence risks, upcoming reviews, and applicability gaps while retaining a route back to the vessel record. Managers should be able to explain why two vessels differ instead of forcing every hull into one composite score or masking missing data as satisfactory status.",
      },
    ],
    relatedResources: [
      { title: "Fleet-scale cyber governance", href: "/resources/fleet-scale-cyber-governance" },
      { title: "Risk register article", href: "/resources/reading-a-cyber-risk-register" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Solutions", href: "/solutions" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "ship-cyber-evidence-management",
    title: "Ship cyber evidence management",
    metaTitle: "Ship Cyber Evidence Management",
    metaDescription:
      "Managing ship cyber evidence: sufficiency, custodians, version dates, requirement links, and review decisions.",
    eyebrow: "Evidence",
    intro:
      "Ship cyber evidence management is the discipline of keeping artifacts attributable, current, scoped, and linked to requirements — with a reviewer decision, not only an upload.",
    sections: [
      {
        heading: "Sufficiency over volume",
        body: "More files do not mean more compliance. Relevance, reliability, completeness, and independent review determine whether an artifact supports a claim.",
      },
      {
        heading: "Freshness and re-validation",
        body: "Assessments and configs go stale. Build expiry or re-validation into the record so accepted evidence ages out when the system state changes.",
      },
      {
        heading: "A defensible evidence record",
        body: "Capture the artifact type, vessel or system scope, source, custodian, collection date, version, linked requirement or control, reviewer, decision, rationale, and next review. Superseded artifacts should remain traceable without appearing current, and rejected evidence should retain the reason so the correction path is clear.",
      },
    ],
    relatedResources: [
      { title: "Evidence sufficiency", href: "/resources/evidence-sufficiency-cyber-compliance" },
      { title: "Survey readiness guide", href: "/resources/survey-readiness-package-guide" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "maritime-corrective-action-software",
    title: "Maritime corrective action software",
    metaTitle: "Maritime Corrective Action Software",
    metaDescription:
      "Corrective action software for maritime cyber findings: owner completion vs independent verification, evidence, and readiness metrics that do not lie.",
    eyebrow: "Findings",
    intro:
      "Corrective action software for maritime cyber work should separate owner completion from independent verification and keep evidence attached to both steps.",
    sections: [
      {
        heading: "Why self-closed CAPA fails review",
        body: "When “closed” means only the owner said so, fleet metrics overstate readiness. Reviewers need accept/reject decisions and artifacts that match the finding criterion.",
      },
      {
        heading: "What CertaMaris structures",
        body: "Findings with criterion and condition, actions with owners and due dates, verification separate from the owner, and package inclusion without email archaeology.",
      },
      {
        heading: "Closure requires more than completion",
        body: "The action owner should record what changed and attach supporting evidence. A separate reviewer then evaluates whether the evidence addresses the original criterion and whether residual work remains. Rejection should reopen the action with a reason; acceptance should preserve the reviewer, date, evidence, and decision for later audit or survey sampling.",
      },
    ],
    relatedResources: [
      { title: "Corrective action verification", href: "/resources/corrective-action-verification" },
      { title: "Evidence sufficiency", href: "/resources/evidence-sufficiency-cyber-compliance" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "maritime-sbom-management",
    title: "Maritime SBOM management",
    metaTitle: "Maritime SBOM Management",
    metaDescription:
      "Software bill of materials in maritime contexts: asset linkage, freshness, vulnerability follow-up — not a complete compliance program by itself.",
    eyebrow: "SBOM",
    intro:
      "SBOMs improve visibility into software components on shipboard and shoreside systems. They support vulnerability and supply-chain work but do not replace SMS cyber risk management or class design evidence.",
    sections: [
      {
        heading: "SBOM as evidence type",
        body: "Treat SBOMs like other evidence: linked to a system identity, dated, owned, and reviewed when components change. An orphan SBOM file in a share drive ages out silently.",
      },
      {
        heading: "Honest product boundary",
        body: "CertaMaris supports structured assurance workflows including inventory and evidence linkage. SBOM ingestion and vulnerability programs depend on your implementation scope — do not assume universal automatic mapping of every SBOM to every regulation.",
      },
      {
        heading: "From component list to managed decision",
        body: "Identify the product and version an SBOM describes, link it to the deployed vessel or shoreside system, record its supplier and generation date, and track whether later releases supersede it. Vulnerability findings still require applicability analysis, operational risk review, treatment ownership, compensating controls where needed, and evidence that the chosen response was completed.",
      },
    ],
    relatedResources: [
      { title: "Evidence sufficiency", href: "/resources/evidence-sufficiency-cyber-compliance" },
      { title: "IACS E26/E27 overview", href: "/resources/iacs-ur-e26-e27-overview" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Security & trust", href: "/security" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "vessel-ot-cybersecurity",
    title: "Vessel OT cybersecurity",
    metaTitle: "Vessel OT Cybersecurity",
    metaDescription:
      "Vessel operational technology cybersecurity: inventory, segmentation, change control, and distinct OT evidence linked to maritime requirements.",
    eyebrow: "OT",
    intro:
      "Vessel OT cybersecurity protects systems that monitor or control physical ship processes. Controls and evidence often differ from corporate IT while still needing a path into SMS and class-related packages.",
    sections: [
      {
        heading: "OT-specific habits",
        body: "Accurate CBS inventory, zone and interface awareness, controlled remote access and vendor maintenance, change records, and backup/restore that respects operational safety constraints.",
      },
      {
        heading: "Do not collapse IT and OT frameworks",
        body: "Mapping both to the same requirement layer is useful; forcing OT into pure IT control language without operational context is not. Keep boundaries visible in the record.",
      },
      {
        heading: "Operational evidence to keep current",
        body: "Maintain system and interface inventories, zone or segmentation records, authorized remote-access paths, vendor maintenance procedures, backup and restoration evidence, change approvals, removable-media controls, incident contacts, and drill or training records. Review these against vessel operating constraints and safe-state requirements rather than treating them as ordinary office IT controls.",
      },
    ],
    relatedResources: [
      { title: "Risk assessment checklist", href: "/resources/maritime-cyber-risk-assessment-checklist" },
      { title: "IACS overview article", href: "/resources/iacs-ur-e26-e27-overview" },
    ],
    relatedCompliance: [{ title: "Standards & guidelines", href: "/compliance/guidelines" }],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "dpa-cyber-compliance",
    title: "DPA cyber compliance",
    metaTitle: "DPA Cyber Compliance",
    metaDescription:
      "How Designated Persons Ashore engage cyber risk in the SMS: evidence paths, internal audit, and collaboration with technical owners.",
    eyebrow: "Roles",
    intro:
      "The DPA links company and ships for SMS effectiveness. Cyber risk under MSC.428(98) should be visible on that path without making the DPA the sole owner of every technical control.",
    sections: [
      {
        heading: "What DPAs need from the cyber program",
        body: "Clear SMS cross-references, current assessments, sampleable evidence, findings that enter the non-conformity path, and packages ready for DOC-related verification questions.",
      },
      {
        heading: "Division of labor",
        body: "Technical managers and IT/OT owners hold system evidence; the DPA needs discoverability and integrity of the SMS story. Software should make that collaboration explicit.",
      },
      {
        heading: "Questions a DPA should be able to answer",
        body: "The DPA should be able to locate the current cyber-risk procedure, identify accountable technical owners, trace material findings into corrective action, see whether evidence and reviews are current, and explain how cyber events enter company reporting and learning processes. Technical conclusions remain with qualified owners, but the management-system trail must be coherent.",
      },
    ],
    relatedResources: [
      { title: "MSC.428(98) explained", href: "/resources/imo-msc-428-98-explained" },
      { title: "Survey readiness guide", href: "/resources/survey-readiness-package-guide" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "vessel-cyber-risk-register",
    title: "Vessel cyber risk register",
    metaTitle: "Vessel Cyber Risk Register",
    metaDescription:
      "Building a vessel cyber risk register that records decisions, owners, residual risk, and review dates — not just a list of threats.",
    eyebrow: "Risk",
    intro:
      "A vessel cyber risk register is a governance tool when each entry has treatment, authority, rationale, and review date — connected to assessments and actions.",
    sections: [
      {
        heading: "Minimum fields that matter",
        body: "Risk statement, system/vessel scope, inherent and residual view, treatment, owner, review date, and links to findings or compensating controls.",
      },
      {
        heading: "Avoid the static list",
        body: "Registers go stale when never revisited. Cadence and change triggers (retrofit, incident, requirement update) keep residual risk honest.",
      },
      {
        heading: "Decision records make the register useful",
        body: "Each treatment should state whether the risk is reduced, avoided, transferred, or accepted, who holds the authority, and what evidence supports the decision. Link controls and corrective actions to the entry, retain the rationale for residual risk, and set a review date or event trigger so a changed vessel state does not silently preserve an obsolete rating.",
      },
    ],
    relatedResources: [
      { title: "Reading a cyber risk register", href: "/resources/reading-a-cyber-risk-register" },
      { title: "Risk assessment checklist", href: "/resources/maritime-cyber-risk-assessment-checklist" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "survey-readiness",
    title: "Survey readiness for maritime cyber",
    metaTitle: "Maritime Cyber Survey Readiness",
    metaDescription:
      "Prepare for cyber-related survey and audit questions with scope, inventory, evidence, findings, and instrument-correct packages.",
    eyebrow: "Readiness",
    intro:
      "Survey readiness for cyber topics is pre-assembled, instrument-correct evidence — not a scramble through shared drives the week before.",
    sections: [
      {
        heading: "Match the package to the question",
        body: "SMS/DOC questions, class design UR questions, and customer questionnaires need different bases. Label scope and instruments on the package cover.",
      },
      {
        heading: "Gap pass before the event",
        body: "Expired evidence, missing owners, unverified closures, and inventory drift are fixable before the reviewer names them. CertaMaris structures readiness views from the live record.",
      },
      {
        heading: "Assemble a reviewable package",
        body: "Start with a cover record that states the vessel or company scope, review purpose, controlling instrument, period, and accountable owner. Include a clear index, current evidence, open exceptions, approved risk decisions, and corrective-action status. Run an independent sufficiency check and record release approval before sharing the package externally.",
      },
    ],
    relatedResources: [
      { title: "Survey readiness package guide", href: "/resources/survey-readiness-package-guide" },
      { title: "Evidence sufficiency", href: "/resources/evidence-sufficiency-cyber-compliance" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "maritime-cyber-regulations",
    title: "Maritime cyber regulations — map of the landscape",
    metaTitle: "Maritime Cyber Regulations Overview",
    metaDescription:
      "Plain map of maritime cyber regulations and standards: IMO SMS cyber risk, IACS UR E26/E27, and complementary national and industry frameworks.",
    eyebrow: "Regulatory map",
    intro:
      "Maritime cyber regulations and related standards span IMO SMS instruments, IACS design-stage unified requirements, flag and class detail, and complementary national or industry frameworks. Official texts control.",
    sections: [
      {
        heading: "Core maritime instruments",
        body: "MSC.428(98) and ISM context for operational cyber risk in the SMS; MSC-FAL guidelines as non-mandatory support; IACS UR E26/E27 for in-scope new construction cyber resilience.",
      },
      {
        heading: "Complementary frameworks",
        body: "NIST CSF, OT guidance, IEC 62443, ISO 27001, USCG maritime cyber instruments where applicable, and NIS2 entity duties in the EU are high-level complements — verify applicability legally.",
      },
      {
        heading: "How to use this site",
        body: "Start at Compliance for authority pages, Resources for operational explainers, Glossary for terms, and Topics for task-oriented guidance. CertaMaris uses explicit mapping and review states rather than implying automatic full coverage.",
      },
    ],
    relatedResources: [
      { title: "MSC.428(98) explained", href: "/resources/imo-msc-428-98-explained" },
      { title: "E26/E27 overview", href: "/resources/iacs-ur-e26-e27-overview" },
    ],
    relatedCompliance: [
      { title: "Compliance home", href: "/compliance" },
      { title: "Official sources", href: "/compliance/official-sources" },
    ],
    productLinks: [
      { title: "Platform", href: "/platform" },
      { title: "Contact", href: "/contact" },
    ],
  },
];

export function getTopic(slug: string): TopicPage | undefined {
  return topics.find((t) => t.slug === slug);
}

export const topicSlugs = topics.map((t) => t.slug);
