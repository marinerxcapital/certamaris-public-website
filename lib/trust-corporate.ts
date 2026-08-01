/**
 * Structured content for Trust Center, About/corporate, procurement, and legal UX pages.
 * Public pages import renderable fields only. Owner verification notes live here as comments.
 *
 * // OWNER_VERIFY: Legal entity legal name (exact registered name)
 * // OWNER_VERIFY: Jurisdiction of formation / registration
 * // OWNER_VERIFY: Company registration / EIN / company number
 * // OWNER_VERIFY: Registered office / principal business address
 * // OWNER_VERIFY: Governing law and venue for public website terms (counsel)
 * // APPROVED (2026-07-31 directive): Skyler Brown, Founder — public biography + credentials published on /about/leadership and /about
 * // OWNER_VERIFY: Additional leadership names/titles beyond founder (none published; single-founder layout)
 * // OWNER_VERIFY: Customer names, logos, case studies, and references for public use
 * // OWNER_VERIFY: Partner / channel / alliance list for public publication
 * // OWNER_VERIFY: Open roles, locations, and hiring process details
 * // OWNER_VERIFY: Press kit assets, media contact SLA, and embargo process
 * // OWNER_VERIFY: SOC 2 / ISO 27001 (or other) certification status, scope, and dates
 * // OWNER_VERIFY: Independent pen-test date, firm, and shareable summary under NDA
 * // OWNER_VERIFY: Cyber / E&O insurance certificates for procurement packages
 * // OWNER_VERIFY: Contractual SLA, RTO, RPO, and uptime commitments
 * // OWNER_VERIFY: Production hosting region(s) and any data-residency guarantees to publish
 * // OWNER_VERIFY: Full product subprocessor list approved for customer/NDA distribution
 * // OWNER_VERIFY: MFA enforcement defaults and enterprise SSO/SCIM GA status
 * // OWNER_VERIFY: Public status-page provider (if/when launched)
 * // OWNER_VERIFY: Analytics / marketing cookies providers if any are enabled on the public site
 * // OWNER_VERIFY: Privacy contact mailbox ownership (privacy@) and response process
 * // OWNER_VERIFY: Legal contact mailbox ownership (legal@)
 * // OWNER_VERIFY: Accessibility contact ownership and VPAT / ACR availability
 * // OWNER_VERIFY: Safe-harbor wording for responsible disclosure reviewed by counsel
 * // OWNER_VERIFY: Plimsoll Compliance historical naming / corporate relationship language if any public mention is required
 */

import { APP_SALES_EMAIL, SECURITY_EMAIL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const CORPORATE_LAST_REVIEWED = "2026-07-31";

export const brandIdentity = {
  productName: SITE_NAME,
  tagline: SITE_TAGLINE,
  productSummary:
    "Maritime cyber compliance and continuous assurance software for fleet-scale operators — requirements, evidence, findings, corrective actions, and readiness packages in one controlled record.",
  appUrlLabel: "app.certamaris.com",
  marketingUrlLabel: "certamaris.com",
} as const;

export const trustCenterOverview = {
  eyebrow: "Trust Center",
  title: "Security, procurement, and operating transparency in one place.",
  intro:
    "This Trust Center explains how CertaMaris approaches platform security, access control, incident handling, continuity, and procurement documentation — without inventing certifications, uptime history, or unpublished corporate details.",
  principles: [
    {
      title: "Status over slogans",
      body: "Controls are labeled Current, Configurable, Planned, Not claimed, or Available under NDA so buyers can inspect the claim, not only the headline.",
    },
    {
      title: "Product and marketing are separate",
      body: "The authenticated application runs at app.certamaris.com. This public website is for education, trust information, and commercial intake.",
    },
    {
      title: "Procurement is a workflow",
      body: "NDA materials, questionnaires, DPA/MSA discussion, and architecture overviews are handled through a procurement request — not as anonymous public downloads of sensitive documents.",
    },
  ],
  architectureSummary:
    "CertaMaris is a multi-tenant SaaS application for maritime cyber compliance and assurance workflows. Customers authenticate into a tenant-scoped product environment. Logical isolation and role-based access control constrain what each user can see and change. The public marketing site does not host customer compliance records.",
  dataFlowSummary:
    "Authorized users submit and maintain operational compliance content (scope, mappings, evidence metadata, findings, and related workflow state). The application stores that content in a managed cloud database, serves it over TLS to authenticated clients, and retains version/review history for controlled records. Support access, where used, is intended to be controlled rather than unrestricted standing access.",
  hostingSummary:
    "The product is cloud-hosted. The public website is delivered on separate edge infrastructure from the authenticated application. This page does not publish a guaranteed production region, residency commitment, or complete provider inventory as an open claim.",
  accessControlSummary:
    "Access to the product requires authentication. Authorization is role- and object-scoped (for example organization, fleet, or vessel context). Tenant isolation is a core design rule. Enterprise identity options such as SSO and SCIM are discussed as planned/enterprise capabilities rather than universal current claims.",
  incidentResponseSummary:
    "CertaMaris maintains an internal process for platform operations and security incidents. Customer notification terms and timelines are defined in the applicable customer agreement, not as a public SLA on this website.",
  continuitySummary:
    "Managed database backups form part of the production operating model. Specific RTO, RPO, restore-test schedules, and contractual continuity commitments are not claimed as public guarantees here; continuity materials can be discussed during procurement under appropriate confidentiality terms.",
  securityContact: SECURITY_EMAIL,
  procurementPath: "/contact?intent=procurement",
  procurementPage: "/trust/procurement",
} as const;

export const subprocessorsContent = {
  eyebrow: "Trust",
  title: "Subprocessors and infrastructure categories",
  intro:
    "CertaMaris uses commercial cloud infrastructure to operate the product and deliver the public website. A complete product subprocessor list is provided on request for active customers and qualified procurement, typically under NDA.",
  publicCategories: [
    {
      title: "Public website edge delivery",
      body: "The marketing website at certamaris.com is delivered via Cloudflare edge infrastructure.",
    },
    {
      title: "Application and API hosting",
      body: "The authenticated product application and API run on commercial cloud application hosting. Specific product provider details for customer contracts are shared during procurement rather than as an open public inventory.",
    },
    {
      title: "Managed database",
      body: "Customer product data is stored in managed cloud PostgreSQL infrastructure with encryption at rest provided by the managed service.",
    },
    {
      title: "Operational tooling",
      body: "Engineering and operations may use private vulnerability/SBOM tooling and standard development services. Those systems are not customer-facing product features and are not presented as a public Dependency-Track or similar service for customers.",
    },
  ],
  requestBody:
    "To request the current product subprocessor list, architecture overview, or related procurement documents, start a procurement request and note that you need subprocessor materials.",
  requestHref: "/contact?intent=procurement",
  securityMailto: SECURITY_EMAIL,
} as const;

export const responsibleDisclosureContent = {
  eyebrow: "Trust",
  title: "Responsible disclosure",
  intro:
    "We welcome good-faith reports of security issues that affect CertaMaris products or this website. Please report findings privately so they can be assessed and addressed.",
  contactEmail: SECURITY_EMAIL,
  expectations: [
    "Email security@certamaris.com with a clear description of the issue, affected URL or product surface, steps to reproduce, and potential impact.",
    "Allow a reasonable time for assessment and remediation before any public disclosure.",
    "Do not access, modify, or delete data that is not yours.",
    "Do not disrupt service availability for other users.",
  ],
  prohibited: [
    "Denial-of-service, volumetric, or resource-exhaustion testing against production systems",
    "Social engineering, phishing, or physical intrusion",
    "Privacy violations, spam, or malware distribution",
    "Attacks against third-party services, customers, or infrastructure not owned by CertaMaris",
    "Exfiltration of customer or personal data",
  ],
  process: [
    "We acknowledge valid reports when practical and investigate scope and severity.",
    "We work to remediate confirmed issues according to risk and operational constraints.",
    "We may ask for clarifying details to reproduce the finding.",
    "We do not operate a public bug-bounty program on this page, and no payment terms are promised here.",
  ],
  legalIntent:
    "CertaMaris intends not to pursue legal action against researchers who make a good-faith effort to follow this policy, avoid privacy harm, and avoid service disruption. This statement describes policy intent for coordinated disclosure; it is not a comprehensive safe-harbor agreement and may be refined with counsel for formal publication.",
  noPgpNote:
    "This page does not publish a PGP key. Use the security mailbox above for private reports.",
} as const;

export const serviceStatusContent = {
  eyebrow: "Trust",
  title: "Service status",
  intro: "Current component health for the CertaMaris website, application, and API, supported by live endpoint probes.",
  currentPractice:
    "Operational status for customers is communicated through support and account channels when incidents or maintenance affect service. Contractual notification terms, where they exist, are defined in the customer agreement.",
  planned: "Current service checks appear above. Contractual notification terms, where applicable, remain defined in the customer agreement.",
  contactHref: "/contact",
  contactLabel: "Contact support / account team",
} as const;

export const procurementContent = {
  eyebrow: "Trust",
  title: "Procurement and security package",
  intro:
    "Enterprise and multi-organization buyers can request the materials needed for security review, legal review, and commercial evaluation. Sensitive documents are shared under appropriate confidentiality terms rather than as anonymous public downloads.",
  requestHref: "/contact?intent=procurement",
  requestLabel: "Start a procurement request",
  securityEmail: SECURITY_EMAIL,
  salesEmail: APP_SALES_EMAIL,
  materials: [
    {
      title: "NDA",
      body: "Mutual or inbound NDA discussion for procurement document exchange.",
      status: "available_under_nda" as const,
    },
    {
      title: "Data processing agreement (DPA)",
      body: "DPA discussion and draft exchange during active commercial evaluation.",
      status: "available_under_nda" as const,
    },
    {
      title: "Master service agreement (MSA) / order terms",
      body: "Commercial terms are sales-assisted and scoped to the engagement; public pages do not publish a universal price list or form contract.",
      status: "available_under_nda" as const,
    },
    {
      title: "Security questionnaire",
      body: "Standard vendor security questionnaires answered during qualified procurement.",
      status: "available_under_nda" as const,
    },
    {
      title: "Subprocessor list",
      body: "Current product subprocessor list for customer and procurement review.",
      status: "available_under_nda" as const,
    },
    {
      title: "Architecture overview",
      body: "High-level architecture and tenancy explanation suitable for security review.",
      status: "available_under_nda" as const,
    },
    {
      title: "Penetration-test summary",
      body: "When an independent assessment summary is available, it may be shared under NDA. No public pen-test claim is made here.",
      status: "available_under_nda" as const,
    },
    {
      title: "Continuity documentation",
      body: "Backup and continuity approach materials for procurement review. Specific RTO/RPO guarantees are not published as open website claims.",
      status: "available_under_nda" as const,
    },
    {
      title: "Insurance certificates",
      body: "Insurance evidence is shared when available for qualified procurement. This page does not state a public coverage guarantee.",
      status: "available_under_nda" as const,
    },
    {
      title: "Accessibility documentation",
      body: "Accessibility approach for the public site is described on the accessibility page. Product VPAT/ACR materials, when available, can be requested through procurement.",
      status: "available_under_nda" as const,
    },
    {
      title: "Customer references",
      body: "References are provided only when authorized and available. This website does not invent customer names or logos.",
      status: "available_under_nda" as const,
    },
  ],
  howItWorks: [
    "Submit a procurement request with your organization, role, and the documents you need.",
    "CertaMaris routes the request to the appropriate commercial and security contacts.",
    "Confidential materials are exchanged under NDA or equivalent terms where required.",
    "Product access remains sales-assisted; there is no self-serve perpetual public trial claimed on this site.",
  ],
} as const;

/**
 * About page narrative content. Founder biography SoT is `lib/founder.ts`.
 * Short company description aligns with brandIdentity.productSummary — no fake customers/certs.
 */
export const aboutContent = {
  eyebrow: "About",
  title: "Maritime cyber compliance and continuous assurance for companies, fleets, and vessels.",
  /** SHORT company description for hero intro. */
  intro:
    "CertaMaris is maritime cyber compliance and continuous-assurance software for fleet-scale operators — connecting requirements, vessel systems, assessments, evidence, findings, corrective actions, plans, quality review, and readiness reporting in one controlled record.",
  /** STANDARD company description (mission framing). */
  mission:
    "Help maritime companies maintain a controlled, inspectable record of cyber compliance and assurance work across company, fleet, and vessel levels — without replacing human judgment or official regulatory sources.",
  whyExists: {
    eyebrow: "Why CertaMaris exists",
    title: "Compliance work was scattered. The record was not.",
    body: "Cybersecurity and compliance information in maritime operations is often distributed across spreadsheets, shared drives, email, consulting reports, vessel records, and disconnected technical systems. At fleet scale, ownership blurs, evidence ages out, and readiness packages become a last-minute scramble. CertaMaris was founded to put that work into one traceable operating environment.",
  },
  operatingModel: {
    eyebrow: "Operating model",
    title: "Company, fleet, and vessel — one assurance hierarchy.",
    intro:
      "CertaMaris is structured the way maritime operators already work: corporate and company administration, fleet posture, vessel-scoped work, and the controlled objects that make a review inspectable.",
    levels: [
      {
        title: "Company",
        body: "Tenant-isolated company workspace for users and roles, fleets, engagements, assessments, and released deliverables.",
      },
      {
        title: "Fleet",
        body: "Fleet inventory and readiness roll-up so posture, findings, and deadlines can be reviewed without rebuilding a deck from inboxes.",
      },
      {
        title: "Vessel",
        body: "Vessel-scoped systems, controls, evidence, findings, actions, and plans — with individual auditable user identities, not a shared vessel password.",
      },
    ],
  },
  philosophy: [
    {
      title: "Official sources control",
      body: "Regulatory content links back to IMO, IACS, and flag-state text. Plain-language explanations support understanding — they never replace it.",
    },
    {
      title: "Human review stays human",
      body: "Applicability, evidence sufficiency, risk acceptance, and release decisions remain with qualified, accountable people. The platform organizes their work; it does not replace their judgment.",
    },
    {
      title: "Evidence over assertion",
      body: "A finding is only as strong as the evidence trail behind it. The platform is built to preserve that trail by default, not as an afterthought.",
    },
    {
      title: "Built for fleets, not files",
      body: "Design decisions are tested against what changes when a fleet is many vessels rather than one — because that is where informal processes usually break first.",
    },
  ],
  doesNotReplace: {
    eyebrow: "Boundaries",
    title: "What CertaMaris does not replace.",
    intro:
      "CertaMaris structures maritime cyber-compliance work so it is easier to inspect and maintain. It is not designed to blur who makes the regulated decision or who controls the official requirement.",
    items: [
      {
        title: "Not legal or regulatory advice",
        body: "Official IMO, IACS, flag-state, and classification-society texts control. Public explanations stay subordinate to those sources.",
      },
      {
        title: "Not a substitute for human judgment",
        body: "Applicability, evidence sufficiency, risk acceptance, and release decisions remain with qualified, accountable people.",
      },
      {
        title: "Not class, flag, or counsel",
        body: "CertaMaris does not replace classification societies, flag states, auditors, legal counsel, or accountable maritime personnel.",
      },
      {
        title: "Not an SMS or DOC system",
        body: "The platform structures cyber assurance work that supports SMS-aligned practice; it does not replace the SMS, SMS software, or Document of Compliance process.",
      },
    ],
  },
  /** Retained for residual consumers; prefer doesNotReplace on the About page. */
  boundaries: [
    {
      title: "What CertaMaris does",
      body: "Structures requirements, scope, evidence, findings, corrective actions, readiness packages, and governance reporting into one controlled product record.",
    },
    {
      title: "What CertaMaris does not do",
      body: "It does not replace qualified reviewers, classification societies, flag states, auditors, legal counsel, or accountable maritime personnel.",
    },
    {
      title: "How claims are handled",
      body: "The public website avoids unsupported customer, certification, pricing, audit-pass, or regulator-approval claims. Product proof is tied to inspectable workflow screens.",
    },
  ],
  relatedLinks: [
    {
      href: "/about/leadership",
      title: "Leadership",
      description: "Skyler Brown, Founder — maritime and product background.",
    },
    {
      href: "/about/corporate-information",
      title: "Corporate information",
      description: "Verified contact channels and published corporate facts only.",
    },
    { href: "/about/partners", title: "Partners", description: "Partner and collaboration inquiries." },
    { href: "/about/careers", title: "Careers", description: "Hiring status and how to inquire." },
    { href: "/about/press", title: "Press", description: "Media and press contact path." },
    { href: "/trust", title: "Trust Center", description: "Security, procurement, and disclosure." },
  ],
} as const;

/**
 * Public leadership page content — single-founder editorial profile.
 * Founder biography, credentials, and portrait import from @/lib/founder (approved directive).
 * No fake team, silhouettes, advisory board, or placeholder team cards.
 */
export const leadershipContent = {
  eyebrow: "About",
  title: "Skyler Brown, Founder",
  intro:
    "CertaMaris is founder-led. This page presents the verified public profile of founder Skyler Brown.",
  /** Why CertaMaris exists — from approved full biography (fragmented compliance records). */
  whyFounded:
    "Skyler founded CertaMaris to address a recurring operational problem: cybersecurity and compliance information is often distributed across spreadsheets, shared drives, email, consulting reports, vessel records, and disconnected technical systems. The work focuses on connecting company, fleet, and vessel-level requirements, systems, controls, assessments, evidence, findings, risks, corrective actions, plans, quality review, and controlled reporting in one traceable operating environment.",
  aboutHref: "/about",
  demoHref: "/contact?intent=demo",
  demoLabel: "Request a demo",
  contactEmail: "skyler@certamaris.com",
} as const;

export const corporateInformationContent = {
  eyebrow: "About",
  title: "Corporate information",
  intro:
    "This page lists only corporate facts verified for public publication. Unpublished registration and address fields are omitted rather than replaced with placeholders.",
  published: [
    { label: "Brand / product", value: "CertaMaris — maritime cyber compliance and assurance software" },
    { label: "Public website", value: "https://certamaris.com" },
    { label: "Application", value: "https://app.certamaris.com" },
    { label: "Sales", value: APP_SALES_EMAIL },
    { label: "Security", value: SECURITY_EMAIL },
  ],
  omittedNote:
    "Registered legal entity, registration, office, and jurisdiction details are not approved for publication on this page. Qualified procurement teams may request the applicable corporate record.",
  related: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/trust/procurement", label: "Procurement" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const partnersContent = {
  eyebrow: "About",
  title: "Partners",
  intro:
    "CertaMaris works with operators, advisors, and technology collaborators through sales-assisted engagements. Public partner listings are published only with authorization.",
  body: "No public partner listings are published at this time. For a referral, technology, advisory, or channel relationship, contact the team with your organization, proposed model, and geography.",
  contactHref: "/contact",
  salesEmail: APP_SALES_EMAIL,
} as const;

export const careersContent = {
  eyebrow: "About",
  title: "Careers",
  intro: "CertaMaris hires carefully and publishes roles only when they are open for applications.",
  status: "No open roles are published on this website at this time.",
  body: "If you believe your background in maritime operations, compliance, security, or product engineering is a strong fit, you may send a brief introduction and résumé overview to the sales contact channel for routing. Unsolicited applications are not a guarantee of review, and this page does not invent headcount plans or office locations.",
  salesEmail: APP_SALES_EMAIL,
  contactHref: "/contact",
} as const;

export const pressContent = {
  eyebrow: "About",
  title: "Press",
  intro: "Media inquiries about CertaMaris, the product, or public materials can be routed through the contact channels below.",
  body: "No press release archive or media kit is published on this page at this time. For interview requests, fact checks, or brand-asset questions, contact the team with your outlet, deadline, and topic.",
  salesEmail: APP_SALES_EMAIL,
  contactHref: "/contact",
  brandNote:
    "Use of the CertaMaris name and marks requires permission except for ordinary news reporting and fair use of publicly posted pages.",
} as const;

export const privacyContent = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro:
    "This page describes how the public CertaMaris website handles information. It is not a product data-processing agreement.",
  scope:
    "Scope: the public marketing website at certamaris.com and related public pages. Authenticated product processing is governed by a separate customer agreement and data-processing terms when those are in place. Registered legal entity, address, and jurisdiction details appear in signed commercial documents where applicable.",
  sections: [
    {
      title: "1. Information we collect",
      body: "When you submit a form on this website (for example, requesting a readiness call, procurement materials, or contacting sales), we collect the information you provide directly: your name, work email address, company name, fleet size, conversation focus, planning horizon, role if provided, and any message you include. We may also collect standard technical information automatically, such as IP address, browser type, and pages visited, through server logs.",
    },
    {
      title: "2. How we use information",
      body: "We use the information you submit to respond to your inquiry, route and prepare for readiness or procurement conversations, and communicate with you about CertaMaris. We do not sell personal information collected through this website to third parties.",
    },
    {
      title: "3. Data retention",
      body: "Inquiry and contact-form data is retained for as long as reasonably necessary to respond to your inquiry and maintain a business record of the interaction. Retention can vary by inquiry type, applicable agreement, and legal requirement.",
    },
    {
      title: "4. Cookies and analytics",
      body: "This website may use cookies or similar technologies required for basic functionality and security. Aggregate usage may be observed through server logs and infrastructure provided by the website delivery environment. No separate third-party marketing analytics provider is identified on this page.",
    },
    {
      title: "5. Your rights",
      body: "Depending on your jurisdiction, you may have rights to access, correct, or request deletion of your personal information. To exercise these rights, contact us using the details below. We will respond as promptly as practical; this page does not state a formal SLA.",
    },
    {
      title: "6. Contact",
      body: "Questions about this policy can be directed to privacy@certamaris.com. Do not include passwords, credentials, vessel-security details, or other sensitive operational information in a website contact request.",
    },
  ],
} as const;

export const termsContent = {
  eyebrow: "Legal",
  title: "Terms of Service",
  intro:
    "These terms govern use of the public CertaMaris website. Platform access is covered by a separate customer agreement when one exists.",
  scope:
    "Scope: informational website use and inquiry forms only. Customer platform use is governed by the applicable signed customer or commercial agreement.",
  sections: [
    {
      title: "1. Scope of this website",
      body: "This website provides information about the CertaMaris platform and enables prospective customers to request a readiness call, procurement materials, or contact our team. It does not itself provide compliance workflows. Those are delivered through the authenticated CertaMaris application under a separate customer agreement.",
    },
    {
      title: "2. No legal or regulatory advice",
      body: "Content on this website, including pages describing IMO cyber-risk management and IACS UR E26/E27, is provided for general informational purposes only. It is not legal or regulatory advice and should not be relied upon as a substitute for qualified counsel or the controlling official source text.",
    },
    {
      title: "3. No guaranteed outcomes",
      body: "CertaMaris does not guarantee any audit, survey, inspection, or certification outcome. Compliance determinations remain the responsibility of the customer’s accountable personnel, classification societies, flag states, and regulators.",
    },
    {
      title: "4. Acceptable use",
      body: "You agree not to use this website to submit false or misleading information, attempt unauthorized access to any system, or interfere with the website’s normal operation.",
    },
    {
      title: "5. Intellectual property",
      body: "The CertaMaris name, logo, and website content are protected as CertaMaris brand and site materials and may not be reproduced without permission, except for ordinary viewing and fair use of publicly posted pages.",
    },
    {
      title: "6. Customer agreements",
      body: "If CertaMaris enters a customer agreement with you, that agreement controls the ordered services, governing law, venue, data-processing terms, and order-specific obligations. This public website page does not alter any signed agreement.",
    },
    {
      title: "7. Contact",
      body: "Questions about these terms can be directed to legal@certamaris.com.",
    },
  ],
} as const;

export const accessibilityContent = {
  eyebrow: "Legal",
  title: "Accessibility Statement",
  intro:
    "What this public site does today to support access, and how to report a barrier. This is not a formal conformance certification.",
  target:
    "CertaMaris targets WCAG 2.2 Level AA for the public marketing website as a design and engineering goal. We have not published a third-party accessibility audit on this page, so we do not claim formal WCAG conformance.",
  methods: [
    "A skip link to main content for keyboard users.",
    "Semantic page structure with headings, landmarks, and an identified main content region.",
    "Visible focus styles on interactive controls (links, buttons, form fields).",
    "Contact and inquiry forms with labeled fields, validation messages, and honest delivery status.",
    "Respect for prefers-reduced-motion: decorative motion is reduced or disabled so content remains legible.",
    "Contrast-minded brand colors and status cues that are not color-only where product UI is shown.",
  ],
  limitations:
    "Automated and manual testing cannot cover every assistive-technology and browser combination. Reported barriers are tracked and prioritized; no formal WCAG conformance claim is made on this page.",
  lastReviewed: "2026-08-01",
  auditScope:
    "The latest review covered all canonical public routes at desktop and mobile sizes using automated accessibility checks, keyboard navigation, zoom, reduced-motion, and interactive-state testing.",
  remediation:
    "When an accessibility barrier is reported, we assess severity, reproduce where possible, and prioritize a fix. Response timing is as soon as practical and is not stated as a formal SLA on this page.",
  contact:
    "Report barriers to accessibility@certamaris.com with a description of the issue, the page URL, and your browser or assistive technology if known.",
  vpat:
    "VPAT / ACR or product accessibility documentation, when available, can be requested through the procurement path for qualified evaluations.",
  procurementHref: "/trust/procurement",
  contactHref: "/contact?intent=procurement",
} as const;
