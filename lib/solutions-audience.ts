/**
 * Solutions and Who We Serve content for CertaMaris marketing.
 * No fabricated customers, certifications, or automatic compliance claims.
 */

import { productProofScreens, type ProductProofScreen } from "@/lib/product-screens";

export type SolutionPage = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  buyer: string;
  problem: string;
  currentPain: string;
  futureWorkflow: string[];
  capabilities: string[];
  inputs: string[];
  outputs: string[];
  implementation: string[];
  regulatoryContext: string;
  limitations: string[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
  screenKey?: keyof typeof productProofScreens;
};

export type AudiencePage = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  responsibilities: string[];
  problems: string[];
  howSupports: string[];
  canSee: string[];
  canDo: string[];
  doesNotReplace: string;
  implementationInvolvement: string;
  outputs: string[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
};

export const solutionsPages: SolutionPage[] = [
  {
    slug: "fleet-cyber-compliance",
    title: "Fleet Cyber Compliance",
    eyebrow: "Solutions · 01",
    headline: "One compliance record per fleet — vessel detail preserved underneath.",
    intro:
      "Fleet Cyber Compliance connects applicability, controls, evidence, findings, and readiness across vessels so requirement changes become accountable work.",
    buyer: "Ship owners, operators, fleet managers, technical managers, and DPAs",
    problem:
      "Multi-vessel operators run compliance through disconnected vessel binders, email threads, and personal trackers.",
    currentPain:
      "Nothing is wrong with any single spreadsheet — the failure is that nothing connects, so change impact and readiness cannot be answered at fleet scale.",
    futureWorkflow: [
      "Record fleet and vessel scope with accountable owners",
      "Share applicability for similar operating profiles while preserving vessel detail",
      "Map controls and collect evidence once, reuse with vessel-specific context",
      "Roll findings and actions up without losing ownership",
      "Release fleet-aware readiness packages from live work",
    ],
    capabilities: [
      "Fleet-level scope and applicability records",
      "Vessel-specific evidence and findings roll-up",
      "Technical manager and DPA assignment per vessel",
      "Change propagation visibility when mappings update",
      "Fleet readiness and deadline views",
    ],
    inputs: [
      "Vessel inventory and particulars",
      "Applicability decisions by qualified personnel",
      "Control mappings and evidence sources",
      "Role assignments across shore and vessel teams",
    ],
    outputs: [
      "Fleet compliance posture with drill-down",
      "Open findings and action aging by vessel",
      "Consistent readiness materials for survey preparation",
      "Governance-ready fleet summaries",
    ],
    implementation: [
      "Start with fleet inventory and membership",
      "Import priority vessels and existing evidence",
      "Set role scopes before broad rollout",
      "Align applicability workshops with DPA ownership",
    ],
    regulatoryContext:
      "Supports workflows aligned to IMO MSC.428(98) cyber risk in the SMS and IACS UR E26/E27 design/equipment resilience work where applicable. Official texts control; applicability is human-determined.",
    limitations: [
      "Does not auto-certify the fleet",
      "Does not replace SMS software or DOC processes",
      "Does not invent applicability across mixed fleets",
    ],
    faqs: [
      {
        question: "Can dissimilar vessels share one applicability record?",
        answer:
          "Similar profiles can share fleet-level applicability with vessel-specific exceptions. Mixed fleets still need human scope decisions.",
      },
    ],
    related: [
      { href: "/platform/fleet-management", label: "Fleet Management" },
      { href: "/solutions/vessel-cyber-risk-management", label: "Vessel Cyber-Risk Management" },
      { href: "/who-we-serve/ship-owners", label: "Ship Owners" },
    ],
    screenKey: "clientFleet",
  },
  {
    slug: "audit-survey-readiness",
    title: "Audit & Survey Readiness",
    eyebrow: "Solutions · 02",
    headline: "Build the readiness package continuously — not the week before survey.",
    intro:
      "Audit and survey readiness compiles scope, evidence, findings, actions, exceptions, and plan crosswalks from the live record before review.",
    buyer: "DPAs, technical managers, compliance leads, and owner representatives",
    problem:
      "Survey week becomes a scramble to reconstruct evidence and status from drives and inboxes.",
    currentPain:
      "The package a surveyor sees may not match implemented work; gaps appear too late to remediate calmly.",
    futureWorkflow: [
      "Maintain evidence and findings continuously",
      "Assemble package sections from approved records",
      "Flag completeness and citation gaps early",
      "Complete QA and owner approval",
      "Release a controlled package version for authorized review",
    ],
    capabilities: [
      "Readiness package assembly from live work",
      "Gap flagging before external review",
      "Version-controlled plan and evidence crosswalks",
      "Reviewer notes and exception visibility",
      "Export-ready package views",
    ],
    inputs: [
      "Current scope and assessment basis",
      "Accepted evidence and open findings",
      "Corrective-action status with verification",
      "Plan release state",
    ],
    outputs: [
      "Released readiness package",
      "Gap list for pre-survey remediation",
      "Audit history of package versions",
      "Authorized export artifacts",
    ],
    implementation: [
      "Define package section owners",
      "Align evidence request cadence to survey calendar",
      "Establish QA reviewers before first release",
    ],
    regulatoryContext:
      "Supports preparation for surveys and inspections that may reference ISM-aligned cyber risk management and class cyber resilience requirements. CertaMaris does not perform or replace class or flag verification.",
    limitations: [
      "Does not guarantee pass outcomes",
      "Does not replace surveyor professional judgment",
      "Does not certify compliance",
    ],
    faqs: [
      {
        question: "Will this make us pass survey?",
        answer:
          "No tool can guarantee survey outcomes. CertaMaris structures preparation so the package is complete and traceable before review.",
      },
    ],
    related: [
      { href: "/platform/reports-readiness", label: "Reports & Readiness Packages" },
      { href: "/solutions/evidence-findings-management", label: "Evidence & Findings" },
      { href: "/who-we-serve/classification-survey", label: "Classification & Survey Stakeholders" },
    ],
    screenKey: "controlledRelease",
  },
  {
    slug: "imo-msc-428-98",
    title: "IMO MSC.428(98)",
    eyebrow: "Solutions · 03",
    headline: "Structure cyber risk management work under the SMS — without inventing applicability.",
    intro:
      "MSC.428(98) places cyber risk in the Safety Management System. CertaMaris structures evidence and findings without replacing the SMS or DOC process.",
    buyer: "DPAs, company security and compliance officers, technical managers, and operators",
    problem:
      "Cyber risk work is often detached from SMS procedures, so internal audits and DOC verifications cannot show a continuous trail.",
    currentPain:
      "Teams collect files for cyber, but cannot show how those files support SMS cyber risk management obligations.",
    futureWorkflow: [
      "Map SMS cyber procedures to controls and evidence",
      "Record assessments and findings in the same ledger used for readiness",
      "Track corrective actions with verification",
      "Maintain plan content aligned to approved facts",
      "Present structured materials for internal audit and DOC-related review",
    ],
    capabilities: [
      "Control and procedure mapping for SMS cyber work",
      "Evidence ledger with review decisions",
      "Findings and CAPA linked to the same record",
      "Readiness materials for internal audit preparation",
    ],
    inputs: [
      "SMS cyber procedures and accountable owners",
      "Vessel and company scope",
      "Assessment and evidence programs",
    ],
    outputs: [
      "Mapped SMS cyber work products",
      "Evidence and findings trail for internal review",
      "Corrective-action status for management review",
    ],
    implementation: [
      "Workshop SMS cyber procedure inventory",
      "Connect existing controls and evidence",
      "Align DPA ownership of residual risk decisions",
    ],
    regulatoryContext:
      "MSC.428(98) timeline language commonly referenced: no later than the first annual verification of the company's Document of Compliance after 1 January 2021. It does not create a standalone cyber certification scheme. Official text controls.",
    limitations: [
      "Does not replace SMS software or ISM DOC processes",
      "Does not issue legal conclusions about applicability",
      "Does not guarantee internal audit or DOC outcomes",
    ],
    faqs: [
      {
        question: "Is this an IMO certification platform?",
        answer:
          "No. CertaMaris organizes cyber assurance work that supports SMS-aligned cyber risk management. Authorities and auditors determine outcomes.",
      },
    ],
    related: [
      { href: "/compliance", label: "Compliance overview" },
      { href: "/solutions/fleet-cyber-compliance", label: "Fleet Cyber Compliance" },
      { href: "/who-we-serve/technical-managers-dpas", label: "Technical Managers & DPAs" },
    ],
    screenKey: "requirementMapping",
  },
  {
    slug: "iacs-ur-e26",
    title: "IACS UR E26",
    eyebrow: "Solutions · 04",
    headline: "Ship-level cyber resilience evidence structured for design and survey conversations.",
    intro:
      "IACS UR E26 addresses ship-level resilience, systems identification, segmentation, and access control. CertaMaris structures evidence for review.",
    buyer: "Technical managers, newbuild project teams, cybersecurity leads, and owners with E26-applicable vessels",
    problem:
      "E26-related evidence is scattered across shipyard packages, OEM documentation, and operational records.",
    currentPain:
      "Survey and project teams cannot follow which ship-level controls and evidence answer which clauses without reconstruction.",
    futureWorkflow: [
      "Record applicability decisions for E26-scope vessels and contracts",
      "Map ship-level controls and systems",
      "Collect and review evidence against mapped clauses",
      "Track findings and corrective actions",
      "Assemble readiness materials for class conversations when authorized",
    ],
    capabilities: [
      "Requirement-to-control mapping for ship-level resilience topics",
      "Evidence coverage and freshness",
      "Findings and CAPA trail",
      "Package preparation for authorized review",
    ],
    inputs: [
      "Contract and class applicability determinations",
      "CBS and network architecture documentation",
      "Operational evidence for implemented controls",
    ],
    outputs: [
      "Mapped E26 work record",
      "Evidence and exception register",
      "Readiness materials for survey preparation",
    ],
    implementation: [
      "Confirm which vessels and contracts fall in E26 scope",
      "Import design and operational evidence carefully",
      "Separate newbuild vs in-service evidence paths",
    ],
    regulatoryContext:
      "UR E26 is commonly described as applying from new construction contracts signed on or after 1 July 2024. Confirm with class and contract documents. Official IACS text controls.",
    limitations: [
      "Does not interpret class rules for you",
      "Does not guarantee class approval",
      "Does not imply fleet-wide retrofit on a single date",
    ],
    faqs: [
      {
        question: "Does CertaMaris certify E26 compliance?",
        answer:
          "No. Classification societies interpret and verify class requirements. CertaMaris structures the operator's controlled record.",
      },
    ],
    related: [
      { href: "/solutions/iacs-ur-e27", label: "IACS UR E27" },
      { href: "/compliance", label: "Compliance" },
      { href: "/platform/regulatory-intelligence", label: "Regulatory Intelligence" },
    ],
    screenKey: "requirementMapping",
  },
  {
    slug: "iacs-ur-e27",
    title: "IACS UR E27",
    eyebrow: "Solutions · 05",
    headline: "Equipment- and system-level cyber resilience evidence with clear ownership.",
    intro:
      "IACS UR E27 addresses cyber resilience of onboard systems. CertaMaris keeps supplier evidence distinct from ship-level E26 work.",
    buyer: "IT/OT teams, technical managers, OEM coordinators, and project cyber leads",
    problem:
      "System-level evidence from OEMs and integrators does not stay linked to the controls and findings the operator must defend.",
    currentPain:
      "Equipment documentation arrives as PDFs without a durable map to vessel systems, findings, and residual risk.",
    futureWorkflow: [
      "Inventory systems and equipment in vessel scope",
      "Map E27-relevant controls and supplier evidence",
      "Review sufficiency and exceptions",
      "Link findings to corrective actions and risk decisions",
      "Feed system status into ship-level readiness views",
    ],
    capabilities: [
      "System and equipment inventory linkage",
      "Control mapping distinct from ship-level E26 records",
      "Evidence sufficiency review",
      "SBOM / vulnerability context when configured",
    ],
    inputs: [
      "System inventory and supplier documentation",
      "Applicability decisions for equipment scope",
      "Test and validation evidence",
    ],
    outputs: [
      "System-level mapped evidence set",
      "Exceptions and residual risk notes",
      "Inputs to vessel and fleet readiness packages",
    ],
    implementation: [
      "Prioritize critical systems first",
      "Establish OEM evidence intake standards",
      "Align OT owners with shore cybersecurity reviewers",
    ],
    regulatoryContext:
      "E27 works with E26: equipment resilience supports ship resilience. Contract dates and class interpretations control. Official IACS text controls.",
    limitations: [
      "Does not replace OEM certification processes",
      "Does not auto-accept supplier claims as sufficient",
      "Does not guarantee class equipment approval",
    ],
    faqs: [
      {
        question: "Can we track OEM SBOM data?",
        answer:
          "Where SBOM and Dependency-Track workflows are configured for the engagement, projects can link vulnerability context to systems. Availability is configurable.",
      },
    ],
    related: [
      { href: "/solutions/iacs-ur-e26", label: "IACS UR E26" },
      { href: "/solutions/sbom-vulnerability-assurance", label: "SBOM & Vulnerability Assurance" },
      { href: "/who-we-serve/maritime-it-ot", label: "Maritime IT/OT Teams" },
    ],
    screenKey: "evidenceCoverage",
  },
  {
    slug: "vessel-cyber-risk-management",
    title: "Vessel Cyber-Risk Management",
    eyebrow: "Solutions · 06",
    headline: "Vessel-scoped risk, evidence, and actions with named accountable users.",
    intro:
      "Vessel Cyber-Risk Management brings systems, assessments, evidence, findings, risk, and actions into a vessel portal with individual identities.",
    buyer: "Vessel masters and officers, vessel IT contacts, technical managers, and DPAs",
    problem:
      "Vessel cyber work is local, informal, and hard to defend when shore asks for status.",
    currentPain:
      "Shared logins and folder dumps erase ownership; residual risk decisions lack a durable record.",
    futureWorkflow: [
      "Assign vessel membership to named users",
      "Maintain systems and control mappings",
      "Collect evidence against vessel scope",
      "Record findings, risk treatments, and actions",
      "Roll status to fleet without losing vessel detail",
    ],
    capabilities: [
      "Vessel portal with membership-based access",
      "Systems, evidence, findings, and CAPA in one scope",
      "Risk treatment and acceptance records",
      "Contribution to company readiness packages",
    ],
    inputs: [
      "Vessel particulars and user memberships",
      "System inventory",
      "Assessment and evidence programs",
    ],
    outputs: [
      "Vessel risk and action register",
      "Evidence trail with provenance",
      "Inputs to fleet roll-ups and readiness packages",
    ],
    implementation: [
      "Provision vessel memberships before go-live",
      "Train vessel users on evidence submission",
      "Define shore escalation for overdue actions",
    ],
    regulatoryContext:
      "Supports vessel-level execution of company SMS cyber risk management and class cyber resilience evidence collection where applicable.",
    limitations: [
      "Does not replace operational bridge/engine systems",
      "Does not use shared vessel passwords",
      "Does not accept residual risk for the company",
    ],
    faqs: [
      {
        question: "Is there one password for the whole vessel?",
        answer:
          "No. Human users receive individual auditable identities with vessel membership.",
      },
    ],
    related: [
      { href: "/platform/vessel-portal", label: "Vessel Portal" },
      { href: "/who-we-serve/vessel-masters-officers", label: "Vessel Masters & Officers" },
      { href: "/solutions/fleet-cyber-compliance", label: "Fleet Cyber Compliance" },
    ],
    screenKey: "vesselPortal",
  },
  {
    slug: "evidence-findings-management",
    title: "Evidence & Findings Management",
    eyebrow: "Solutions · 07",
    headline: "Evidence with provenance. Findings with a defensible trail.",
    intro:
      "Evidence stays reviewable with a custodian, version, and decision. Findings separate condition, criterion, evidence, and consequence.",
    buyer: "Evidence custodians, reviewers, DPAs, and technical managers",
    problem:
      "Files age in drives; findings live in email; neither can answer 'what supports this control today?'",
    currentPain:
      "Reviewers reconstruct history under time pressure and lose confidence in sufficiency.",
    futureWorkflow: [
      "Issue evidence requests against mapped controls",
      "Intake and version submissions",
      "Review sufficiency and freshness",
      "Open findings with structured fields",
      "Link corrective actions and verification evidence",
    ],
    capabilities: [
      "Evidence ledger with custodian and review state",
      "Coverage and freshness views",
      "Structured findings register",
      "Full traceability into CAPA",
    ],
    inputs: [
      "Control mappings",
      "Custodians and reviewers",
      "Submitted artifacts",
      "Assessment observations",
    ],
    outputs: [
      "Accepted evidence set",
      "Findings register",
      "Linked CAPA trail",
      "Package-ready support",
    ],
    implementation: [
      "Define sufficiency criteria with reviewers",
      "Set request cadence by vessel criticality",
      "Migrate priority evidence first",
    ],
    regulatoryContext:
      "Supports demonstration of cyber risk management and control implementation evidence under SMS and class-related programs without replacing authorities.",
    limitations: [
      "Sufficiency remains human judgment",
      "Does not guarantee external acceptance of every artifact",
    ],
    faqs: [
      {
        question: "Can we reject weak evidence?",
        answer:
          "Yes. Review decisions include acceptance, rejection, and resubmission with history retained.",
      },
    ],
    related: [
      { href: "/platform/evidence", label: "Evidence Management" },
      { href: "/platform/findings-corrective-actions", label: "Findings & Corrective Actions" },
      { href: "/solutions/corrective-action-verification", label: "Corrective-Action Verification" },
    ],
    screenKey: "findingsRegister",
  },
  {
    slug: "corrective-action-verification",
    title: "Corrective-Action Verification",
    eyebrow: "Solutions · 08",
    headline: "Close actions only when verification evidence can be shown.",
    intro:
      "Corrective-Action Verification keeps remediation owned, time-bound, and linked to verification evidence so closure is more than a status flip.",
    buyer: "Action owners, DPAs, technical managers, and reviewers",
    problem:
      "Actions are marked closed without proof; aging is invisible until external review.",
    currentPain:
      "Leadership cannot see which overdue actions threaten readiness; closed items reappear as findings.",
    futureWorkflow: [
      "Create actions linked to findings",
      "Assign owner, priority, and due date",
      "Track dependencies and status through verification",
      "Attach verification evidence",
      "Close with independent verification criteria met",
    ],
    capabilities: [
      "CAPA register with aging",
      "Verification-before-closure model",
      "Fleet and vessel visibility of overdue work",
      "History retained for readiness packages",
    ],
    inputs: [
      "Findings and owners",
      "Remediation plans",
      "Verification evidence",
    ],
    outputs: [
      "Verified closure trail",
      "Aging views",
      "Inputs to readiness and governance reports",
    ],
    implementation: [
      "Define verification standards per finding type",
      "Align escalation for overdue actions",
      "Train owners on evidence required to close",
    ],
    regulatoryContext:
      "Supports continuous improvement and corrective-action discipline expected in SMS-aligned management systems and survey follow-up work.",
    limitations: [
      "Does not force operational execution outside company process",
      "Does not accept residual risk for accountable officers",
    ],
    faqs: [
      {
        question: "Can executives see overdue CAPA?",
        answer:
          "Yes. Aging and status roll up for fleet and governance views without inventing metrics.",
      },
    ],
    related: [
      { href: "/platform/findings-corrective-actions", label: "Findings & Corrective Actions" },
      { href: "/solutions/executive-board-reporting", label: "Executive & Board Reporting" },
      { href: "/solutions/audit-survey-readiness", label: "Audit & Survey Readiness" },
    ],
    screenKey: "correctiveActions",
  },
  {
    slug: "cybersecurity-plan-management",
    title: "Cybersecurity Plan Management",
    eyebrow: "Solutions · 09",
    headline: "Plan versions that match implemented work.",
    intro:
      "Cybersecurity Plan Management keeps templates, review, versioning, and release control so plans are assembled from approved facts.",
    buyer: "DPAs, cybersecurity leads, technical managers, and company officers",
    problem:
      "Plan documents drift from evidence and findings; multiple versions circulate by email.",
    currentPain:
      "Surveyors and executives may see a plan that no longer matches operational reality.",
    futureWorkflow: [
      "Author plan sections against templates",
      "Crosswalk to controls and evidence",
      "Review and version the controlled record",
      "Release approved plan states",
      "Include plan crosswalks in readiness packages",
    ],
    capabilities: [
      "Version-controlled plan work product",
      "Crosswalk to controls and evidence",
      "Clear draft vs released states",
      "Collaboration with retained history",
    ],
    inputs: [
      "Approved control and evidence facts",
      "SMS cyber procedures",
      "Authors and reviewers",
    ],
    outputs: [
      "Released plan versions",
      "Crosswalk artifacts",
      "Package-ready plan sections",
    ],
    implementation: [
      "Agree plan structure with SMS document control",
      "Assign section owners",
      "Define release authority",
    ],
    regulatoryContext:
      "Supports documentation expected in SMS cyber risk management and class-related cyber resilience programs without claiming automatic approval.",
    limitations: [
      "Does not replace SMS document control wholesale",
      "Does not auto-generate class-approved plans",
    ],
    faqs: [
      {
        question: "Can we show plan history?",
        answer:
          "Yes. Version and release history remain part of the controlled record.",
      },
    ],
    related: [
      { href: "/platform/cybersecurity-plans", label: "Cybersecurity Plans" },
      { href: "/solutions/imo-msc-428-98", label: "IMO MSC.428(98)" },
      { href: "/platform/reports-readiness", label: "Reports & Readiness" },
    ],
    screenKey: "cybersecurityPlans",
  },
  {
    slug: "sbom-vulnerability-assurance",
    title: "SBOM & Vulnerability Assurance",
    eyebrow: "Solutions · 10",
    headline: "SBOM and vulnerability context where private tooling is configured.",
    intro:
      "SBOM and Vulnerability Assurance links software bills of materials and vulnerability review to vessel context when private tooling is configured.",
    buyer: "Maritime IT/OT teams, cybersecurity leads, and technical managers",
    problem:
      "Software composition risk sits outside the compliance evidence trail, so findings never connect.",
    currentPain:
      "Vulnerability lists live in security tools; assurance packages never see them.",
    futureWorkflow: [
      "Enable private Dependency-Track where engagement requires it",
      "Ingest SBOMs for priority systems",
      "Review vulnerability context against vessel/system scope",
      "Open findings and actions when warranted",
      "Reflect status in continuous assurance views",
    ],
    capabilities: [
      "Configurable private Dependency-Track linkage",
      "SBOM project association",
      "Vulnerability context for assurance review",
      "Findings/CAPA handoff when risks require treatment",
    ],
    inputs: [
      "SBOM artifacts for priority systems",
      "Engagement configuration for DT",
      "System inventory and owners",
    ],
    outputs: [
      "SBOM-linked project records",
      "Vulnerability-informed findings where raised",
      "Inputs to continuous assurance",
    ],
    implementation: [
      "Confirm whether DT is in scope for the engagement",
      "Prioritize critical OT/IT systems",
      "Define who reviews vulnerability findings",
    ],
    regulatoryContext:
      "Supports equipment and system resilience evidence programs (including E27-related work) when software composition is relevant. Does not replace security operations tooling.",
    limitations: [
      "Not a public multi-tenant Dependency-Track service",
      "Not a live SIEM claim",
      "Configurable per engagement — not assumed for every tenant",
    ],
    faqs: [
      {
        question: "Is Dependency-Track on a public domain?",
        answer:
          "Production Dependency-Track for CertaMaris is private. It is not marketed as a public customer-facing domain service.",
      },
    ],
    related: [
      { href: "/platform/integrations", label: "Integrations" },
      { href: "/platform/continuous-assurance", label: "Continuous Assurance" },
      { href: "/solutions/iacs-ur-e27", label: "IACS UR E27" },
    ],
    screenKey: "sbomVulnerabilityAssurance",
  },
  {
    slug: "executive-board-reporting",
    title: "Executive & Board Reporting",
    eyebrow: "Solutions · 11",
    headline: "Governance-grade posture from the same record operators use.",
    intro:
      "Executive and board reporting draws on readiness, evidence freshness, open decisions, and action aging without rebuilding inconsistent slide decks.",
    buyer: "Owners, operators, executives, and board-facing compliance sponsors",
    problem:
      "Leadership gets a different number than the fleet team because sources disagree.",
    currentPain:
      "Quarterly decks are rebuilt manually; outstanding risk decisions stay buried.",
    futureWorkflow: [
      "Operate day-to-day on evidence, findings, and actions",
      "Roll fleet posture for governance views",
      "Surface outstanding risk-acceptance and treatment decisions",
      "Export authorized summaries for board packages",
      "Drill into vessel detail when leadership asks",
    ],
    capabilities: [
      "Fleet-wide readiness summary with drill-down",
      "Trend views across assessment cycles using recorded measures",
      "Outstanding decision queues",
      "Export-ready governance views",
    ],
    inputs: [
      "Live fleet, evidence, findings, and CAPA data",
      "Risk-acceptance decisions",
      "Authorized export scope",
    ],
    outputs: [
      "Governance posture views",
      "Decision queues for leadership",
      "Export packages for board or insurer conversations",
    ],
    implementation: [
      "Agree which fields leadership needs",
      "Align risk-acceptance authority",
      "Train executives on drill-down without bypassing process",
    ],
    regulatoryContext:
      "Supports management review and governance conversations around cyber risk under SMS-aligned programs. Not a substitute for formal legal or financial reporting systems.",
    limitations: [
      "Does not invent uptime, savings, or certification metrics",
      "Does not replace board legal counsel",
      "Does not claim regulatory endorsement",
    ],
    faqs: [
      {
        question: "Do you publish sample ROI numbers?",
        answer:
          "Value is described operationally through retrieval, ownership, consistency, and readiness preparation rather than unverified ROI claims.",
      },
    ],
    related: [
      { href: "/platform/reports-readiness", label: "Reports & Readiness" },
      { href: "/who-we-serve/ship-owners", label: "Ship Owners" },
      { href: "/who-we-serve/operators", label: "Operators" },
    ],
    screenKey: "executiveReporting",
  },
  {
    slug: "regulatory-change-management",
    title: "Regulatory Change Management",
    eyebrow: "Solutions · 12",
    headline: "Know what changed and what it touches — then assign human review.",
    intro:
      "Regulatory Change Management connects source versions, mappings, impact views, and follow-up ownership so changes create accountable work.",
    buyer: "Compliance leads, DPAs, technical managers, and cybersecurity leads",
    problem:
      "Circulars and unified requirements change; fleets discover impact during survey.",
    currentPain:
      "No durable link from a clause version to controls, evidence, and plan sections.",
    futureWorkflow: [
      "Keep requirement versions distinct",
      "Maintain mappings to controls and plans",
      "Surface impact when versions change",
      "Assign human applicability and remediation review",
      "Record what the fleet did in response",
    ],
    capabilities: [
      "Versioned requirement records",
      "Impact views across controls, evidence, and plans",
      "Owned follow-up work",
      "Historical response trail",
    ],
    inputs: [
      "Mapped regulatory sources",
      "Control and plan mappings",
      "Accountable reviewers",
    ],
    outputs: [
      "Impact lists",
      "Follow-up task records",
      "Change history for audit",
    ],
    implementation: [
      "Prioritize IMO/IACS sources relevant to the fleet",
      "Assign change owners",
      "Integrate with assessment cadence",
    ],
    regulatoryContext:
      "Supports tracking of instruments such as IMO MSC.428(98) and IACS UR E26/E27 when mapped. Does not claim universal automated monitoring of every flag circular.",
    limitations: [
      "Does not issue applicability rulings",
      "Does not replace official texts",
      "Automated bulletin ingestion beyond mapped sources is not claimed as universal",
    ],
    faqs: [
      {
        question: "Will you tell us every new flag circular automatically?",
        answer:
          "The platform structures mapped requirement change impact. Universal automated monitoring of all flag sources is not claimed.",
      },
    ],
    related: [
      { href: "/platform/regulatory-intelligence", label: "Regulatory Intelligence" },
      { href: "/solutions/imo-msc-428-98", label: "IMO MSC.428(98)" },
      { href: "/compliance", label: "Compliance" },
    ],
    screenKey: "requirementMapping",
  },
];

export const audiencePages: AudiencePage[] = [
  {
    slug: "ship-owners",
    title: "Ship Owners",
    eyebrow: "Who we serve · Owners",
    headline: "Fleet-wide cyber assurance visibility without chasing every vessel.",
    intro:
      "CertaMaris gives ship owners a controlled fleet view of readiness, findings, and decisions needing leadership attention.",
    responsibilities: [
      "Oversight of fleet cyber-risk posture",
      "Support for board, insurer, and charterer conversations",
      "Assignment of technical managers and company officers",
      "Risk-acceptance authority where company policy requires it",
    ],
    problems: [
      "Inconsistent vessel status across managers",
      "Last-minute survey preparation risk",
      "No single readiness record for leadership",
    ],
    howSupports: [
      "Fleet readiness and action aging views",
      "Drill-down into vessel evidence and findings",
      "Governance reporting from the same operational record",
      "Controlled release of readiness materials",
    ],
    canSee: [
      "Fleet inventory and readiness signals",
      "Open findings and outstanding decisions",
      "Governance summaries and package status",
    ],
    canDo: [
      "Review fleet posture and escalate overdue work",
      "Authorize risk-acceptance decisions per company policy",
      "Request readiness conversations and package exports",
    ],
    doesNotReplace:
      "Owner accountability under applicable law and the ISM Code, charterer or insurer judgment, or classification and flag determinations.",
    implementationInvolvement:
      "Owners typically sponsor scope, approve role models, and participate in governance report design during onboarding.",
    outputs: [
      "Fleet readiness summary",
      "Open decision queues",
      "Governance-ready exports when authorized",
    ],
    faqs: [
      {
        question: "Do you publish customer logos?",
        answer:
          "Named customers and logos are published only with authorization. This site does not invent proof.",
      },
    ],
    related: [
      { href: "/who-we-serve/operators", label: "Operators" },
      { href: "/solutions/executive-board-reporting", label: "Executive & Board Reporting" },
      { href: "/solutions/fleet-cyber-compliance", label: "Fleet Cyber Compliance" },
    ],
  },
  {
    slug: "operators",
    title: "Operators",
    eyebrow: "Who we serve · Operators",
    headline: "Operate the company workspace that holds fleet cyber assurance work.",
    intro:
      "Operators run the day-to-day company portal: users, vessels, engagements, evidence programs, and released deliverables — isolated from other tenants.",
    responsibilities: [
      "Company administration and access control",
      "Fleet operations coordination",
      "Engagement and assessment programs",
      "Release of readiness materials",
    ],
    problems: [
      "Fragmented tools across vessels and managers",
      "Unclear ownership of evidence and CAPA",
      "Inconsistent package quality before survey",
    ],
    howSupports: [
      "Tenant-isolated client company portal",
      "Fleet and vessel hierarchy with RBAC",
      "Connected evidence, findings, and packages",
      "Implementation path from discovery to launch",
    ],
    canSee: [
      "Company fleet and engagement state",
      "Evidence, findings, and CAPA status",
      "Released deliverables and package history",
    ],
    canDo: [
      "Administer users and roles",
      "Manage vessel membership",
      "Run assessments and release packages",
    ],
    doesNotReplace:
      "Operator SMS ownership, DOC processes, or professional judgment on applicability and risk acceptance.",
    implementationInvolvement:
      "Operators typically own configuration workshops, user setup, and vessel onboarding sequencing.",
    outputs: [
      "Company-controlled assurance record",
      "Fleet operational views",
      "Released readiness packages",
    ],
    faqs: [
      {
        question: "Can multiple brands or fleets sit in one tenant?",
        answer:
          "Fleet structure is configured per engagement. Discuss multi-fleet models during implementation discovery.",
      },
    ],
    related: [
      { href: "/platform/client-company-portal", label: "Client Company Portal" },
      { href: "/implementation", label: "Implementation" },
      { href: "/who-we-serve/technical-managers-dpas", label: "Technical Managers & DPAs" },
    ],
  },
  {
    slug: "technical-managers-dpas",
    title: "Technical Managers & DPAs",
    eyebrow: "Who we serve · Technical · DPA",
    headline: "One system of record for the SMS cyber work you already own.",
    intro:
      "CertaMaris centralizes evidence, findings, plans, and readiness work for technical managers and DPAs under the SMS.",
    responsibilities: [
      "SMS cyber-risk procedures and oversight",
      "Coordination across vessels, surveyors, and IT/OT",
      "Corrective-action verification",
      "Internal audit and management review inputs",
    ],
    problems: [
      "Tools that do not talk to each other",
      "Pre-audit document scrambles",
      "Weak verification on closed actions",
    ],
    howSupports: [
      "Evidence ledger with custodian and review state",
      "Findings and CAPA with verification",
      "Plan version control",
      "Readiness package assembly from live work",
    ],
    canSee: [
      "Vessel and fleet evidence status",
      "Findings, CAPA aging, and plan release state",
      "Package completeness before survey",
    ],
    canDo: [
      "Request and review evidence",
      "Own findings and verification decisions",
      "Prepare and approve readiness materials",
    ],
    doesNotReplace:
      "DPA or technical-manager accountability, SMS procedure ownership, applicability judgment, or residual risk acceptance.",
    implementationInvolvement:
      "DPAs and technical managers usually lead applicability workshops, evidence standards, and CAPA verification rules.",
    outputs: [
      "Evidence and findings registers",
      "Verified CAPA trail",
      "Readiness packages for review",
    ],
    faqs: [
      {
        question: "Does this replace the DPA?",
        answer:
          "No. Accountable personnel retain regulatory and operational responsibilities.",
      },
    ],
    related: [
      { href: "/solutions/imo-msc-428-98", label: "IMO MSC.428(98)" },
      { href: "/solutions/audit-survey-readiness", label: "Audit & Survey Readiness" },
      { href: "/platform/evidence", label: "Evidence Management" },
    ],
  },
  {
    slug: "maritime-it-ot",
    title: "Maritime IT/OT Teams",
    eyebrow: "Who we serve · IT/OT",
    headline: "Control mapping that respects the IT/OT boundary.",
    intro:
      "CertaMaris keeps shipboard OT and shoreside IT mappings distinct while linking both to shared requirements and evidence.",
    responsibilities: [
      "Technical control implementation",
      "System inventory and change context",
      "Vulnerability and SBOM review where in scope",
      "Evidence for technical safeguards",
    ],
    problems: [
      "OT forced into pure IT frameworks or vice versa",
      "Technical evidence never reaches compliance packages",
      "Vulnerability work disconnected from CAPA",
    ],
    howSupports: [
      "Separate IT/OT control context against shared requirements",
      "Evidence sufficiency by system boundary",
      "Configurable SBOM / Dependency-Track linkage",
      "Findings handoff to operational owners",
    ],
    canSee: [
      "System inventory and control mappings",
      "Evidence coverage for technical controls",
      "Vulnerability context when configured",
    ],
    canDo: [
      "Supply implementation context and technical evidence",
      "Raise technical findings",
      "Support verification of technical CAPA",
    ],
    doesNotReplace:
      "Security engineering design choices, OT operational control, change-management authority, or independent security assessment conclusions.",
    implementationInvolvement:
      "IT/OT leads typically own system inventory standards, identity integration options, and SBOM scope decisions.",
    outputs: [
      "Mapped technical controls",
      "Technical evidence set",
      "Vulnerability-informed findings where raised",
    ],
    faqs: [
      {
        question: "Do you replace our SIEM?",
        answer:
          "No. Live SIEM connectors are not claimed as a standard available feature.",
      },
    ],
    related: [
      { href: "/platform/integrations", label: "Integrations" },
      { href: "/solutions/sbom-vulnerability-assurance", label: "SBOM & Vulnerability Assurance" },
      { href: "/solutions/iacs-ur-e27", label: "IACS UR E27" },
    ],
  },
  {
    slug: "vessel-masters-officers",
    title: "Vessel Masters & Officers",
    eyebrow: "Who we serve · Vessel",
    headline: "Vessel work with named users — not a shared password.",
    intro:
      "Masters and officers get a practical vessel portal for systems context, evidence submission, findings, and action ownership.",
    responsibilities: [
      "Onboard cyber hygiene and procedure execution",
      "Evidence submission for vessel systems",
      "Local ownership of assigned actions",
      "Escalation to shore technical managers and DPAs",
    ],
    problems: [
      "Shared logins erase accountability",
      "Unclear what evidence shore needs",
      "Actions assigned without context or due dates",
    ],
    howSupports: [
      "Individual auditable identities with vessel membership",
      "Vessel-scoped evidence and action lists",
      "Clear ownership and due dates",
      "Shore visibility without email reconstruction",
    ],
    canSee: [
      "Vessel profile and assigned work",
      "Evidence requests for the vessel",
      "Open findings and actions in scope",
    ],
    canDo: [
      "Submit evidence under their identity",
      "Update assigned corrective actions",
      "Review vessel-scoped status relevant to their role",
    ],
    doesNotReplace:
      "Master's command authority, operational safety systems, or shoreside DPA accountability.",
    implementationInvolvement:
      "Vessel users are onboarded with memberships and short training on evidence submission and action updates.",
    outputs: [
      "Vessel evidence submissions with provenance",
      "Action status updates",
      "Inputs to shore readiness packages",
    ],
    faqs: [
      {
        question: "Is there one vessel password?",
        answer:
          "No. CertaMaris does not advertise a shared vessel password model. Users receive individual identities.",
      },
    ],
    related: [
      { href: "/platform/vessel-portal", label: "Vessel Portal" },
      { href: "/solutions/vessel-cyber-risk-management", label: "Vessel Cyber-Risk Management" },
      { href: "/who-we-serve/technical-managers-dpas", label: "Technical Managers & DPAs" },
    ],
  },
  {
    slug: "classification-survey",
    title: "Classification & Survey Stakeholders",
    eyebrow: "Who we serve · Class · Survey",
    headline: "A reviewable trail structured around what a survey verifies.",
    intro:
      "With operator authorization, survey stakeholders can inspect requirement-mapped evidence with provenance rather than a document dump.",
    responsibilities: [
      "Verify requirements under the applicable survey scope",
      "Review evidence sufficiency and currency",
      "Record observations and findings for the operator to address",
    ],
    problems: [
      "Unstructured document dumps",
      "Unclear version and provenance",
      "No link from artifact to requirement",
    ],
    howSupports: [
      "Requirement-structured evidence presentation when authorized",
      "Version and provenance trail",
      "Controlled, expiring access patterns via operator authorization and support policy",
    ],
    canSee: [
      "Operator-authorized readiness materials",
      "Mapped evidence and control context",
      "Plan and exception records included in packages",
    ],
    canDo: [
      "Inspect authorized packages",
      "Return observations into the operator's process (operator remains system of record)",
    ],
    doesNotReplace:
      "Surveyor professional judgment, class rule interpretation, flag-state authority, or any certification or survey outcome.",
    implementationInvolvement:
      "Class and survey stakeholders are not implementation owners; operators decide when and how materials are shared.",
    outputs: [
      "Faster inspection of structured packages",
      "Clearer observation handoff into operator CAPA",
    ],
    faqs: [
      {
        question: "Does CertaMaris endorse class societies?",
        answer:
          "No endorsement by class, flag, government, or insurers is claimed or implied.",
      },
    ],
    related: [
      { href: "/solutions/audit-survey-readiness", label: "Audit & Survey Readiness" },
      { href: "/solutions/iacs-ur-e26", label: "IACS UR E26" },
      { href: "/platform/reports-readiness", label: "Reports & Readiness" },
    ],
  },
  {
    slug: "insurers-pi",
    title: "Insurers & P&I Stakeholders",
    eyebrow: "Who we serve · Insurance · P&I",
    headline: "Structured visibility when a member chooses to share it.",
    intro:
      "When a member operator authorizes sharing, CertaMaris can present structured control coverage and readiness summaries for underwriting conversations.",
    responsibilities: [
      "Inform underwriting and risk conversations",
      "Evaluate member-provided cyber posture information",
      "Maintain insurer processes and policy terms",
    ],
    problems: [
      "Free-text questionnaires without supporting structure",
      "Inconsistent posture reporting across fleets",
    ],
    howSupports: [
      "Member-authorized control-coverage summaries",
      "Consistent readiness-state views across a fleet when shared",
      "Exportable posture views for discussions",
    ],
    canSee: [
      "Only what a member operator authorizes",
      "Structured summaries rather than raw private workspaces by default",
    ],
    canDo: [
      "Review authorized exports and summaries",
      "Use structured data to inform — not replace — underwriting process",
    ],
    doesNotReplace:
      "Underwriting judgment, actuarial assessment, policy terms, claims handling, or the insurer's own risk-evaluation process.",
    implementationInvolvement:
      "Insurers are typically consumers of authorized exports, not platform implementers for the member.",
    outputs: [
      "Authorized posture summaries",
      "Consistent formats for multi-vessel members",
    ],
    faqs: [
      {
        question: "Do you claim P&I endorsement?",
        answer:
          "No. CertaMaris does not claim insurer, P&I, class, or government endorsement.",
      },
    ],
    related: [
      { href: "/solutions/executive-board-reporting", label: "Executive & Board Reporting" },
      { href: "/who-we-serve/ship-owners", label: "Ship Owners" },
      { href: "/security", label: "Security & Trust" },
    ],
  },
  {
    slug: "maritime-service-providers",
    title: "Maritime Service Providers",
    eyebrow: "Who we serve · Service providers",
    headline: "Support delivery without becoming the operator's system of record.",
    intro:
      "CertaMaris lets consultancies and cyber service providers contribute evidence and findings under role scope while the operator keeps the controlled record.",
    responsibilities: [
      "Deliver assessment or remediation services under contract",
      "Submit evidence and technical findings as authorized",
      "Hand work back to operator accountability",
    ],
    problems: [
      "Service work trapped in consultant tools",
      "Operators lose the trail when engagements end",
      "Unclear access boundaries",
    ],
    howSupports: [
      "Role-scoped contribution into the operator tenant",
      "Evidence and findings with provenance",
      "Customer-authorized assistance patterns that are audited and time-bound when CertaMaris helps",
      "Operator remains system of record",
    ],
    canSee: [
      "Scope granted by the operator",
      "Assigned vessels, engagements, and work items",
    ],
    canDo: [
      "Contribute evidence and findings under granted roles",
      "Update assigned actions",
      "Prepare materials for operator release authority",
    ],
    doesNotReplace:
      "The operator's SMS ownership, legal accountability, or the service provider's own professional obligations under contract.",
    implementationInvolvement:
      "Service providers may participate in onboarding workshops when the operator includes them; access is operator-controlled.",
    outputs: [
      "Service deliverables captured in the operator record",
      "Handoff-ready evidence and CAPA",
    ],
    faqs: [
      {
        question: "Can consultants keep a permanent back door?",
        answer:
          "No. Access is role-scoped and operator-controlled. CertaMaris support sessions are time-bound and audited when used.",
      },
    ],
    related: [
      { href: "/implementation", label: "Implementation" },
      { href: "/platform/client-company-portal", label: "Client Company Portal" },
      { href: "/why-certamaris", label: "Why CertaMaris" },
    ],
  },
];

export function getSolutionPage(slug: string): SolutionPage | undefined {
  return solutionsPages.find((s) => s.slug === slug);
}

export function getAudiencePage(slug: string): AudiencePage | undefined {
  return audiencePages.find((a) => a.slug === slug);
}

export function getSolutionScreen(page: SolutionPage): ProductProofScreen | undefined {
  if (!page.screenKey) return undefined;
  return productProofScreens[page.screenKey];
}

/** Differentiation models for Why CertaMaris */
export const differentiationModels: {
  id: string;
  title: string;
  weakness: string;
  certamaris: string;
}[] = [
  {
    id: "spreadsheets",
    title: "Spreadsheets",
    weakness: "No provenance, weak multi-user audit trail, easy version chaos.",
    certamaris: "Controlled evidence, findings, and CAPA objects with history.",
  },
  {
    id: "shared-drives",
    title: "Shared drives",
    weakness: "Files without requirement linkage or sufficiency decisions.",
    certamaris: "Evidence ledger mapped to controls with review decisions.",
  },
  {
    id: "document-management",
    title: "Document management",
    weakness: "Stores documents; does not run maritime assurance workflows.",
    certamaris: "Requirement → evidence → finding → action → package chain.",
  },
  {
    id: "generic-grc",
    title: "Generic GRC",
    weakness: "Often land-centric; weak vessel hierarchy and maritime survey reality.",
    certamaris: "Company / fleet / vessel hierarchy with maritime readiness packages.",
  },
  {
    id: "sms-qhse",
    title: "SMS / QHSE software",
    weakness: "Essential for SMS — not specialized for cyber assurance evidence trails.",
    certamaris: "Structures cyber assurance work; does not replace the SMS.",
  },
  {
    id: "class-portals",
    title: "Class portals",
    weakness: "Serve class processes; not the operator's continuous system of record.",
    certamaris: "Operator-owned record that can feed authorized survey packages.",
  },
  {
    id: "consultancy-only",
    title: "Consultancy-only delivery",
    weakness: "Expertise leaves with the engagement; weak durable operator record.",
    certamaris: "Operator remains system of record; services can contribute under roles.",
  },
  {
    id: "vuln-only",
    title: "Vulnerability-only tools",
    weakness: "Find software issues; do not run survey readiness or CAPA verification.",
    certamaris: "Optional SBOM/vuln context inside broader assurance workflows.",
  },
  {
    id: "custom-internal",
    title: "Custom internal systems",
    weakness: "High build cost; often incomplete audit history and hierarchy.",
    certamaris: "Purpose-built maritime cyber assurance product with portal hierarchy.",
  },
];

export const implementationSteps = [
  {
    number: "01",
    title: "Discovery",
    detail:
      "Fleet scope, evidence condition, accountable roles, applicable instruments, and integration needs.",
  },
  {
    number: "02",
    title: "Configuration",
    detail: "Tenant setup, role model, applicability structures, and package section owners.",
  },
  {
    number: "03",
    title: "Vessel onboarding",
    detail: "Vessel inventory, memberships, system inventory priorities, and pilot vessels.",
  },
  {
    number: "04",
    title: "User setup",
    detail: "Individual identities for shore and vessel users — no shared vessel password model.",
  },
  {
    number: "05",
    title: "Data & evidence migration",
    detail: "Import priority evidence, findings, and plan content; reviewers judge sufficiency.",
  },
  {
    number: "06",
    title: "Launch",
    detail: "Go-live on agreed scope with training for custodians, reviewers, and vessel users.",
  },
  {
    number: "07",
    title: "Continuous assurance",
    detail: "Recurring evidence refresh, CAPA aging, assessments, and readiness package cadence.",
  },
];
