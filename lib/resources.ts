export type Article = {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  publishedLabel: string;
  updatedDate?: string;
  updatedLabel?: string;
  body: string[];
  tags: string[];
  author: string;
  reviewer?: string;
  kind: "explainer" | "guide" | "checklist";
};

export type ArticleSection = {
  heading: string;
  paragraph: string;
};

export type RelatedResourceLink = {
  title: string;
  href: string;
};

export const RESOURCE_AUTHOR = "CertaMaris Editorial";
export const RESOURCE_PUBLISHED_DATE = "2026-07-25";
export const RESOURCE_PUBLISHED_LABEL = "July 25, 2026";
export const RESOURCE_UPDATED_DATE = "2026-07-31";
export const RESOURCE_UPDATED_LABEL = "July 31, 2026";

const baseArticles: Omit<Article, "publishedDate" | "publishedLabel" | "author">[] = [
  {
    slug: "imo-msc-428-98-explained",
    title: "IMO Resolution MSC.428(98): what it actually requires",
    topic: "Regulatory intelligence",
    readTime: "10 min read",
    kind: "explainer",
    tags: ["IMO", "MSC.428(98)", "ISM", "SMS", "regulatory"],
    excerpt:
      "MSC.428(98) does not create a standalone cyber code. It treats cyber risk as a category of risk the SMS must address under the ISM Code, with a DOC-linked timeline after 1 January 2021.",
    body: [
      "IMO Resolution MSC.428(98), adopted in 2017, encourages administrations to ensure cyber risks are appropriately addressed in existing safety management systems. The resolution sets an operational timeline: no later than the first annual verification of the company's Document of Compliance after 1 January 2021. It does not introduce a separate cyber certification scheme. Cyber risk is treated as a category of operational risk the Safety Management System (SMS) already must manage under the ISM Code.",
      "That framing matters for how operators organize work. The resolution does not replace the ISM Code, flag-state instructions, or class rules. It directs attention to whether cyber risk identification, assessment, procedures, training, and internal audit appear inside the same SMS structure that already governs safety and environmental protection. Administrations remain the primary audience of the encouragement; companies remain accountable for how the SMS actually operates on board and ashore.",
      "In day-to-day terms, cyber risk management should be visible in the same places the SMS already documents risk. Hazard identification and risk assessment need to account for cyber-related scenarios that could affect safe operation of the ship. Documented procedures should cover how the company identifies, assesses, and mitigates those risks. Training and familiarization should reflect the roles that touch connected systems. Internal audits should be able to test whether the written system matches practice.",
      "An operator without a document titled “Cyber Security Plan” is not automatically non-compliant with MSC.428(98). An SMS that never addresses cyber risk in assessment, procedure, training, or audit is hard to defend when an auditor or administration asks how cyber risks are managed. The practical question is not branding of documents — it is whether the SMS record shows cyber risk as a managed category of operational risk, with evidence that can be produced under verification.",
      "The recurring operational gap is less interpretation of the resolution and more consistency of evidence across vessels and audit cycles. Where does cyber risk assessment live in the SMS? Which procedures address it? Which records show that training, drills, or reviews actually occur? What package would you hand an auditor that cyber risk is managed in operation, not only named in a policy paragraph?",
      "Map every cyber-related procedure, assessment, and control back to a specific SMS element — not a free-standing folder. If a risk assessment, permit-to-work interface, or backup procedure is meant to address cyber risk, the SMS index and cross-references should make that link explicit so annual DOC verification and internal audit can find it without reconstructing the story from email.",
      "Keep a current inventory of computer-based systems and network-connected equipment that matters to safe operation, with ownership for who updates it. MSC.428(98) does not prescribe a particular inventory format, but auditors and ISM reviewers routinely ask what systems are in scope. An inventory that is incomplete, ship-specific without fleet roll-up, or last updated after a major retrofit is a common weak point.",
      "Record risk assessments that state scenario, consequence to safety or environment, existing controls, residual risk, and review date. Generic statements such as “cyber risk is considered” without scenarios, owners, or review cadence do not read as managed risk under an ISM-style system. Tie assessments to vessel classes or systems where exposure differs.",
      "Define who may authorize changes to shipboard IT/OT configurations, who may grant remote access, and what records those decisions leave. Access and change control often sit between IT, technical management, and the master; if the SMS is silent on authority and evidence, operational practice fills the gap inconsistently across the fleet.",
      "Include cyber risk in internal audit and management review agendas on a defined schedule. Sampling one vessel’s procedures without checking whether evidence of assessment, training, and corrective follow-up is current will not surface fleet-wide drift. Findings from those reviews should enter the same non-conformity and corrective-action path used for other SMS gaps.",
      "Preserve evidence with custodian, version or date, and a clear link to the requirement or SMS clause it supports. Policies without implementation records, expired training matrices, and screenshots with no system context fail the sufficiency test when verification time arrives. Plan for evidence freshness before the annual DOC verification window, not during it.",
      "Confirm flag-state circulars, administration guidance, and class notation expectations that apply to your fleet. MSC.428(98) is an IMO resolution directed at administrations; national implementation and survey practice can add detail. Company procedures should cite the controlling official sources your operation actually uses, and those citations should be reviewed when guidance is reissued.",
      "This explainer is not legal advice, not a substitute for the official text of MSC.428(98), and not a determination of applicability for any company, vessel, or flag. It does not claim that following these operational habits guarantees a successful audit, DOC verification, or inspection outcome. Classification societies, flag administrations, and appointed auditors decide verification results against the controlling instruments they apply.",
      "Always read the resolution and related IMO instruments (including the Guidelines on maritime cyber risk management as updated and referenced by the Organization), together with flag-state instructions and class rules that apply to your ships. Where this page and the official text differ, the official text controls. CertaMaris structures workflows around these obligations; it does not interpret applicability or certify compliance on your behalf.",
    ],
  },
  {
    slug: "iacs-ur-e26-e27-overview",
    title: "IACS UR E26 and E27: the design-stage cyber resilience requirements",
    topic: "Regulatory intelligence",
    readTime: "10 min read",
    kind: "explainer",
    tags: ["IACS", "UR E26", "UR E27", "class", "newbuild"],
    excerpt:
      "UR E26 addresses cyber resilience of the ship as a whole; UR E27 addresses systems and equipment on board. Both apply from new construction contracts signed on or after 1 July 2024.",
    body: [
      "IACS Unified Requirements E26 (Cyber Resilience of Ships) and E27 (Cyber Resilience of On-board Systems and Equipment) target cyber resilience at design and construction rather than as a retrofit checklist bolted onto an already operating vessel. As stated for the unified requirements’ effective application, they apply from new construction contracts signed on or after 1 July 2024. That contract-date scope is central: E26/E27 are not a blanket mandate for every existing ship in the world fleet on a single calendar day.",
      "UR E26 sets requirements at the ship level. It addresses the vessel as an integrated system: identification of computer-based systems, network architecture and segmentation, access control, and the overall cyber resilience properties expected of the ship. The shipyard, owner specification, and classification society survey scope all interact at this level because E26 is about how the delivered ship is designed and verified as a whole.",
      "UR E27 sets requirements at the systems and equipment level. It addresses the cyber resilience properties individual on-board computer-based systems and equipment need to meet before — and as — they are integrated into the ship-level architecture. OEMs, system integrators, and suppliers typically carry the primary demonstration burden for E27-type properties; the shipbuilder and class process then have to show that those systems fit the ship-level design under E26.",
      "The two requirements work together: E27 defines what resilient equipment and systems look like; E26 defines how those pieces are supposed to function together as a resilient vessel. A gap at equipment level can undermine ship-level claims, and a weak ship-level architecture can leave compliant equipment poorly segmented or poorly controlled. Roles differ across shipyard, OEM, owner, and class — so evidence ownership should be explicit in contracts and document packages, not assumed at delivery.",
      "For operators, the picture depends on fleet composition. New-build tonnage contracted on or after 1 July 2024 may enter service with E26/E27 design evidence already in the class and delivery package. Older vessels, and new builds contracted before the effective date, may never have been designed against these URs. Mixed fleets therefore need a clear mapping of which ships are in design-stage scope, which rely on operational cyber risk management under the SMS and other instruments, and where evidence lives for each case.",
      "Record the contract and class applicability basis for each vessel: contract signature date relative to 1 July 2024, class notation or survey scope, and whether E26/E27 were in the build specification. Without that baseline, fleet dashboards and audit packages mix design-stage evidence with operational SMS evidence and create false comparisons between ships.",
      "Maintain a ship-level inventory of computer-based systems aligned to how E26 thinks about the vessel: systems, networks, interfaces, and zones — not only a list of laptops. When systems are added, replaced, or re-networked after delivery, capture whether the change affects the design assumptions that class or the builder previously accepted.",
      "Retain supplier and OEM cyber resilience documentation for systems covered under E27-type expectations: test evidence, configuration baselines, interface descriptions, and any statements of compliance provided at procurement. Store them against the vessel and the system identity, with version dates, so survey and incident response do not depend on a single email archive.",
      "Define change-control gates for network segmentation, remote access paths, and integration of new OT or IT systems. Design-stage resilience is eroded in service when ad hoc connections appear without the same discipline applied at build. Link change records to the vessel architecture description your technical team treats as current.",
      "Separate design/class evidence from operational SMS evidence in your document structure. Class certificates, builder packages, and OEM test reports answer different questions than SMS procedures, training records, and internal audits. Reviewers should be able to pull the package that matches the question without sorting a single undifferentiated share drive.",
      "Assign accountability for keeping the as-built and as-modified architecture description current after delivery — typically a named technical role, not “the shipyard’s last PDF.” When ownership is unclear, the first casualty is network diagrams and interface lists that no longer match the ship.",
      "Plan survey and inspection readiness with the applicable instrument set for that hull: design URs and class requirements where they apply, plus IMO cyber-risk management via the SMS where that is the operative framework. Do not assume E26/E27 language substitutes for MSC.428(98) SMS work, or the reverse.",
      "This explainer is not class rules, not a full restatement of UR E26 or UR E27, and not a determination that any vessel, contract, or equipment package is in or out of scope. It does not assert that CertaMaris or any software product certifies E26/E27 compliance. Shipyards, OEMs, classification societies, and owners retain their respective design, supply, survey, and operational responsibilities.",
      "Always use the controlling IACS unified requirement texts, the applicable classification society rules that implement them, and the contract and survey documentation for the specific ship. Where this page and those instruments differ, the official instruments control. Effective dates, transitional arrangements, and class-specific interpretations should be confirmed with class and qualified advisors for each project.",
    ],
  },
  {
    slug: "evidence-sufficiency-cyber-compliance",
    title: "What makes cyber-compliance evidence 'sufficient'?",
    topic: "Evidence & findings",
    readTime: "5 min read",
    kind: "explainer",
    tags: ["evidence", "audit", "review", "sufficiency"],
    excerpt:
      "A submitted document is not automatically evidence of compliance. Sufficiency depends on relevance, reliability, completeness, and independent review.",
    body: [
      "Evidence collection fails when a file is treated as proof by arrival alone. A policy that was never implemented, a procedure three revisions out of date, or a screenshot with no system identity is not sufficient evidence of a control — it is an artifact without a decision trail.",
      "Apply a short sufficiency test before accepting an item into the compliance record. Relevance: does the artifact address the specific requirement or control it is linked to? Reliability: is the source credible, attributable, and current for the system state claimed? Completeness: does it cover the full scope of the claim (vessel, system, time window)? Review: has someone with authority confirmed it holds, separate from the person who uploaded it?",
      "Stale evidence is the most common silent failure. An assessment reviewed eighteen months ago against a system that has since been reconfigured is a historical record, not current proof. Build expiration or re-validation windows into the workflow so items age out of “accepted” status when their review date passes.",
      "Operational checklist: (1) Link every artifact to a requirement or control ID. (2) Record custodian, date, and version. (3) State the scope (vessel, system, period). (4) Require a reviewer decision, not only an upload. (5) Set a re-validation or expiry date. (6) Reject placeholders that assert compliance without demonstrating the control in operation. (7) Prefer primary records (configs, logs, signed procedures) over undated summaries when both exist.",
    ],
  },
  {
    slug: "corrective-action-verification",
    title: "Why 'closed' shouldn't mean 'the owner said so'",
    topic: "Evidence & findings",
    readTime: "4 min read",
    kind: "explainer",
    tags: ["corrective action", "verification", "findings", "audit"],
    excerpt:
      "A corrective action closed only by the action owner is not independently verified. Reviewers need a separate verification decision and supporting evidence.",
    body: [
      "Corrective actions often get marked closed when the owner reports the fix is done. Self-attested closure is a frequent weak point in audit and survey because it conflates work completed with risk reduced. Closure should mean a defined reviewer accepted evidence that the specific finding is addressed.",
      "Independent verification means someone other than the action owner reviews evidence that the fix was implemented and that it closes the identified gap — not only that activity occurred. The evidence should match the finding’s criterion: configuration change, procedure revision, training completion, compensating control, or other defined remedy.",
      "Keep two distinct steps in the record: owner completion (what was done, when, by whom) and reviewer verification (accepted, rejected, or returned, with rationale and supporting artifacts). Attach verification evidence to the second step. Without that separation, fleet metrics for “closed findings” overstate readiness.",
      "Verification checklist: (1) Finding states criterion and observed condition. (2) Action has a named owner and due date. (3) Owner submits implementation evidence, not only a status comment. (4) Reviewer is not the action owner. (5) Reviewer records accept/reject with date. (6) Rejected items reopen or spawn a new action with a clear residual gap. (7) Verified closures remain traceable in readiness packages without reconstructing email threads.",
    ],
  },
  {
    slug: "fleet-scale-cyber-governance",
    title: "Cyber governance at fleet scale: what changes past the first few vessels",
    topic: "Fleet operations",
    readTime: "6 min read",
    kind: "explainer",
    tags: ["fleet", "governance", "scale", "ownership"],
    excerpt:
      "Processes that work for three vessels often break between ten and thirty: ownership, evidence freshness, and review packages diverge by vessel and manager.",
    body: [
      "A shared drive and a diligent DPA can support a small fleet. Friction rises as the fleet grows: a requirement change means checking dozens of vessel folders instead of three, and “who holds the current version of this procedure” stops having an obvious answer.",
      "Version control usually breaks first — not from carelessness, but because there is no single system of record once a document has been emailed, downloaded, and edited independently across more than a handful of vessels.",
      "Accountability drift follows. When ownership of a finding or corrective action is not explicitly assigned and tracked, it defaults to whoever last touched it, which is inconsistent and hard to reconstruct after the fact.",
      "The remedy is not process for its own sake. Make the fleet-level structure explicit before growth forces the issue: one system of record, explicit ownership per finding, and a control-mapping layer that scales without a manual re-check every time a requirement changes.",
    ],
  },
  {
    slug: "reading-a-cyber-risk-register",
    title: "How to read a cyber risk register (and what's usually missing from one)",
    topic: "Risk & governance",
    readTime: "5 min read",
    kind: "explainer",
    tags: ["risk register", "governance", "decisions", "residual risk"],
    excerpt:
      "A risk register that lists risks without decisions, owners, and review dates isn't a governance tool — it's a list.",
    body: [
      "A well-formed cyber risk register does more than enumerate risks. For each entry, it should be possible to answer: what treatment was chosen (accept, treat, transfer, or defer), who had the authority to make that decision, what the rationale was, and when it is due for review.",
      "The most common gap is treatment without ownership — a risk marked “accepted” with no record of who accepted it or why. That is not a governance decision; it is a placeholder that is hard to defend if the risk materializes.",
      "The second most common gap is a register that is accurate on the day it was created and never revisited. Residual risk changes as systems, vendors, and threats change; a register without a recurring review cadence goes stale the same way evidence does.",
      "A useful register connects each entry back to the finding or assessment that raised it and forward to the corrective action or compensating control that addresses it — so the register reads as a decision trail, not a static list.",
    ],
  },
  {
    slug: "maritime-cyber-risk-assessment-checklist",
    title: "Maritime cyber risk assessment checklist for SMS-aligned fleets",
    topic: "Risk & governance",
    readTime: "8 min read",
    kind: "checklist",
    tags: ["risk assessment", "SMS", "checklist", "IMO", "operations"],
    updatedDate: RESOURCE_UPDATED_DATE,
    updatedLabel: RESOURCE_UPDATED_LABEL,
    excerpt:
      "A practical checklist for structuring vessel and company cyber risk assessments so they support ISM-style review — not a one-page policy paragraph.",
    body: [
      "A maritime cyber risk assessment is useful when it can be audited as a managed process: defined scope, credible scenarios, residual risk, owners, and a review date. A paragraph that says “cyber risks are assessed” without those fields rarely survives DOC verification or internal audit scrutiny.",
      "Define scope before scoring anything. State company vs vessel, which ship classes or sister groups are covered, which computer-based systems and network zones are in scope, and which interfaces to shoreside or third parties matter for safe operation. Out-of-scope systems should be named when they are deliberately excluded, with a reason.",
      "Build scenarios that connect cyber events to safety, environmental, or operational consequences — not only to IT confidentiality. Examples include loss of navigation or propulsion control interfaces, corrupted cargo or ballast automation, ransomware on planning systems that affects voyage decisions, and unauthorized remote access during maintenance. Tie each scenario to systems in the inventory.",
      "Record existing controls honestly: procedures, technical measures, training, compensating manual operations, and monitoring. Note evidence that each control actually operates (last test, drill, configuration baseline, or review). Controls that exist only on a policy slide should not be scored as fully effective.",
      "Capture residual risk, treatment decision, owner, and next review date for each material entry. Acceptance without an accountable owner is not a governance decision. Treatments should link to findings or corrective actions when work is required.",
      "Checklist — preparation: (1) Current systems inventory with owners. (2) Network/zone diagram current enough for the assessment window. (3) Applicable instrument set named (SMS/IMO, class, flag, customer). (4) Prior incidents, near-misses, and audit findings pulled in. (5) Participants include operations, technical/OT, IT, and DPA or SMS owner as appropriate.",
      "Checklist — assessment quality: (1) Scenario, asset/system, consequence, likelihood basis, existing controls, residual risk. (2) Different exposure called out by vessel class where it differs. (3) Third-party and remote-access paths included. (4) Change and maintenance windows considered. (5) Explicit link from assessment rows to SMS clauses or company procedures.",
      "Checklist — after the workshop: (1) Decisions logged with authority. (2) Actions created with due dates. (3) Assessment version, date, and custodian stored. (4) Management review or SMS cycle includes cyber assessment status. (5) Re-assessment trigger defined (major retrofit, incident, requirement change, time-based).",
      "This checklist is operational guidance, not a mandatory form and not legal advice. Official IMO, flag, and class instruments control. CertaMaris can structure assessments, registers, evidence, and actions; it does not determine residual risk acceptability for your company.",
    ],
  },
  {
    slug: "survey-readiness-package-guide",
    title: "Survey readiness package: what to assemble before cyber questions land",
    topic: "Audit readiness",
    readTime: "7 min read",
    kind: "guide",
    tags: ["survey", "audit readiness", "evidence", "class", "DOC"],
    updatedDate: RESOURCE_UPDATED_DATE,
    updatedLabel: RESOURCE_UPDATED_LABEL,
    excerpt:
      "A structured readiness package beats a last-minute share-drive search — scope, basis, evidence, findings, actions, and exceptions in one reviewable set.",
    body: [
      "Surveyors, auditors, and customers ask different cyber questions, but weak packages fail the same way: incomplete scope, stale evidence, unclear ownership, and no trail from requirement to artifact. A readiness package is the pre-assembled answer set for a defined review event — DOC annual verification, internal audit sample, class discussion, or customer questionnaire — not a marketing binder.",
      "Start with scope and basis. Name the vessels, the review date window, and the controlling instruments for this package (SMS/IMO cyber risk management, class UR applicability for that hull, flag circulars, customer clauses). Mixing E26 design evidence into an SMS-only question — or the reverse — creates false confidence.",
      "Include the current systems inventory and architecture summary your team treats as true. Reviewers often begin with “what is connected?” If the inventory is eighteen months old or missing OT, the rest of the package is discounted before procedures are read.",
      "Attach risk assessment and risk-register extracts with owners and review dates, not only a policy statement. Pair them with procedures that implement access control, change management, backup/restore, incident notification, and remote access — and with evidence those procedures ran in the period under review.",
      "List open and recently verified findings and corrective actions. Self-closed items without independent verification should be flagged honestly. Exceptions and compensating controls need explicit acceptance records.",
      "Package checklist: (1) Scope memo (vessels, period, instruments). (2) Inventory and network/zone summary. (3) Risk assessment / register extract. (4) Mapped procedures index. (5) Sample evidence with custodian, date, requirement link. (6) Findings and CAPA with verification status. (7) Training or familiarization sample if claimed. (8) Known exceptions and residual risks. (9) Contact map for who answers technical vs SMS questions. (10) Change log since last review.",
      "Run a gap pass before the event: missing owners, expired evidence, vessels without assessment coverage, and actions past due. Closing gaps after the auditor names them is more expensive than a structured pre-check.",
      "This guide is not a classification checklist and not legal advice. Official survey instructions, flag, and class requirements control. CertaMaris assembles readiness views from structured work; it does not guarantee survey or audit outcomes.",
    ],
  },
];

const articleHeadings: Record<string, string[]> = {
  "imo-msc-428-98-explained": [
    "Scope, timeline, and ISM framing",
    "What the resolution does — and does not invent",
    "Where cyber risk shows up in the SMS",
    "Document titles versus managed risk",
    "The operational evidence problem",
    "Checklist: link cyber work to SMS structure",
    "Checklist: maintain a systems inventory that supports review",
    "Checklist: record risk assessments with decisions and dates",
    "Checklist: define access and change authority",
    "Checklist: put cyber risk into audit and management review",
    "Checklist: keep evidence attributable and fresh",
    "Checklist: track flag and class expectations that apply to you",
    "What this is not",
    "Official text controls",
  ],
  "iacs-ur-e26-e27-overview": [
    "Design-stage scope and the 1 July 2024 contract date",
    "UR E26: ship-level cyber resilience",
    "UR E27: systems and equipment resilience",
    "How E26 and E27 work together",
    "What operators face in mixed fleets",
    "Checklist: record applicability per hull",
    "Checklist: keep a ship-level system and network inventory",
    "Checklist: retain OEM and supplier resilience evidence",
    "Checklist: control post-delivery architecture change",
    "Checklist: separate design evidence from SMS evidence",
    "Checklist: name who owns the as-modified architecture",
    "Checklist: match survey prep to the instrument set for that ship",
    "What this is not",
    "Official text controls",
  ],
  "evidence-sufficiency-cyber-compliance": [
    "A file is not automatically evidence",
    "The sufficiency test",
    "Where evidence goes stale",
    "Sufficiency checklist",
  ],
  "corrective-action-verification": [
    "Closure needs independence",
    "What verification means",
    "Separate owner action from reviewer judgment",
    "Verification checklist",
  ],
  "fleet-scale-cyber-governance": [
    "Small-fleet habits do not scale",
    "Version control breaks first",
    "Accountability drift follows",
    "Make the fleet structure explicit",
  ],
  "reading-a-cyber-risk-register": [
    "A register should record decisions",
    "Accepted risk needs ownership",
    "Review cadence matters",
    "Connect the decision trail",
  ],
  "maritime-cyber-risk-assessment-checklist": [
    "What a usable assessment looks like",
    "Define scope first",
    "Scenarios that matter operationally",
    "Controls and evidence of operation",
    "Residual risk and decisions",
    "Preparation checklist",
    "Assessment quality checklist",
    "After the workshop",
    "Boundary",
  ],
  "survey-readiness-package-guide": [
    "Why packages fail",
    "Scope and basis",
    "Inventory and architecture",
    "Risk, procedures, and operating evidence",
    "Findings, actions, and exceptions",
    "Package checklist",
    "Pre-event gap pass",
    "Boundary",
  ],
};

const relatedLinks: Record<string, RelatedResourceLink[]> = {
  "imo-msc-428-98-explained": [
    { title: "IACS UR E26 and E27 overview", href: "/resources/iacs-ur-e26-e27-overview" },
    { title: "Maritime cyber risk assessment checklist", href: "/resources/maritime-cyber-risk-assessment-checklist" },
    { title: "Compliance — IMO", href: "/compliance/imo" },
  ],
  "iacs-ur-e26-e27-overview": [
    { title: "IMO MSC.428(98) explained", href: "/resources/imo-msc-428-98-explained" },
    { title: "Survey readiness package guide", href: "/resources/survey-readiness-package-guide" },
    { title: "Compliance — IACS", href: "/compliance/iacs" },
  ],
  "evidence-sufficiency-cyber-compliance": [
    { title: "Corrective action verification", href: "/resources/corrective-action-verification" },
    { title: "Survey readiness package guide", href: "/resources/survey-readiness-package-guide" },
    { title: "Platform overview", href: "/platform" },
  ],
  "corrective-action-verification": [
    { title: "Evidence sufficiency in cyber compliance", href: "/resources/evidence-sufficiency-cyber-compliance" },
    { title: "Reading a cyber risk register", href: "/resources/reading-a-cyber-risk-register" },
    { title: "Compliance overview", href: "/compliance" },
  ],
  "fleet-scale-cyber-governance": [
    { title: "Reading a cyber risk register", href: "/resources/reading-a-cyber-risk-register" },
    { title: "Survey readiness package guide", href: "/resources/survey-readiness-package-guide" },
    { title: "Platform overview", href: "/platform" },
  ],
  "reading-a-cyber-risk-register": [
    { title: "Maritime cyber risk assessment checklist", href: "/resources/maritime-cyber-risk-assessment-checklist" },
    { title: "Corrective action verification", href: "/resources/corrective-action-verification" },
    { title: "Fleet-scale cyber governance", href: "/resources/fleet-scale-cyber-governance" },
  ],
  "maritime-cyber-risk-assessment-checklist": [
    { title: "Reading a cyber risk register", href: "/resources/reading-a-cyber-risk-register" },
    { title: "IMO MSC.428(98) explained", href: "/resources/imo-msc-428-98-explained" },
    { title: "Topic: maritime cyber risk assessment", href: "/topics/maritime-cyber-risk-assessment" },
  ],
  "survey-readiness-package-guide": [
    { title: "Evidence sufficiency in cyber compliance", href: "/resources/evidence-sufficiency-cyber-compliance" },
    { title: "Corrective action verification", href: "/resources/corrective-action-verification" },
    { title: "Topic: survey readiness", href: "/topics/survey-readiness" },
  ],
};

export const articles: Article[] = baseArticles.map((article) => ({
  ...article,
  publishedDate: RESOURCE_PUBLISHED_DATE,
  publishedLabel: RESOURCE_PUBLISHED_LABEL,
  author: RESOURCE_AUTHOR,
  reviewer: RESOURCE_AUTHOR,
}));

export const resourceTopics = Array.from(new Set(articles.map((a) => a.topic))).sort();

export const resourceTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort((a, b) =>
  a.localeCompare(b)
);

export const resourceKinds: Article["kind"][] = ["explainer", "guide", "checklist"];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticleSections(article: Article): ArticleSection[] {
  const headings = articleHeadings[article.slug] ?? [];
  return article.body.map((paragraph, index) => ({
    heading: headings[index] ?? `Section ${index + 1}`,
    paragraph,
  }));
}

export function getRelatedResourceLinks(article: Article): RelatedResourceLink[] {
  return relatedLinks[article.slug] ?? [{ title: "Resources", href: "/resources" }];
}

export function filterArticles(opts: {
  query?: string;
  topic?: string;
  tag?: string;
  kind?: string;
}): Article[] {
  const q = opts.query?.trim().toLowerCase() ?? "";
  return articles.filter((article) => {
    if (opts.topic && opts.topic !== "all" && article.topic !== opts.topic) return false;
    if (opts.tag && opts.tag !== "all" && !article.tags.includes(opts.tag)) return false;
    if (opts.kind && opts.kind !== "all" && article.kind !== opts.kind) return false;
    if (!q) return true;
    const haystack = [
      article.title,
      article.excerpt,
      article.topic,
      article.kind,
      ...article.tags,
      ...article.body,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const productLinksForResources: RelatedResourceLink[] = [
  { title: "Platform — trace chain & evidence", href: "/platform" },
  { title: "Compliance authority nest", href: "/compliance" },
  { title: "Request a readiness call", href: "/contact" },
];
