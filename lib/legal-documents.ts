export type LegalPublicSlug = "privacy" | "terms" | "cookies" | "acceptable-use" | "accessibility" | "subprocessors" | "dpa";

export type LegalPublicDocument = {
  slug: LegalPublicSlug;
  route: string;
  shortTitle: string;
  pdfCategory: "public";
  title: string;
  documentId: string;
  version: string;
  issueDate: string;
  status: string;
  effective: string;
  summary: string;
  description: string;
  pdfFilename: string;
  pdfPath: string;
  sha256: string;
  bytes: number;
  markdown: string;
};

export type LegalTemplateDocument = {
  title: string;
  label: "Execution Template";
  pdfFilename: string;
  pdfPath: string;
  sha256: string;
  bytes: number;
};

export type LegalBinderDocument = {
  title: string;
  label: "Master Binder";
  pdfFilename: string;
  pdfPath: string;
  sha256: string;
  bytes: number;
};

export const legalPackageSource = {
  packageName: "CertaMaris All Legal Web Deployment Package",
  packageVersion: "v1.0",
  sourceArchive: "CertaMaris_All_Legal_Web_Deployment_Package_v1.0.zip",
  generatedDate: "23 August 2026",
  deployedPdfCount: 39,
  publicDocumentCount: 7,
  executionTemplateCount: 31,
  duplicatePhysicalPublicPdfCopies: 7,
  assetBasePath: "/legal/documents",
  sourceBoundary: "The seven public legal documents are ordinary public legal notices or agreements. Enterprise documents are hosted as unsigned execution templates and must not be represented as executed customer, vendor, board, employment, partner, or legal-hold instruments.",
  privateSourceFiles: ["Markdown sources", "package manifests", "README/source notes", "QA artifacts"],
} as const;

export const publicLegalDocuments = [
  {
    "slug": "privacy",
    "route": "/legal/privacy",
    "shortTitle": "Privacy Policy",
    "pdfCategory": "public",
    "title": "Privacy Policy",
    "documentId": "CM-LEGAL-01",
    "version": "1.0",
    "issueDate": "23 August 2026",
    "status": "PUBLIC LEGAL NOTICE - FINAL v1.0",
    "effective": "23 August 2026",
    "summary": "Public privacy notice for CertaMaris websites, platform users and business contacts.",
    "description": "Public privacy notice for CertaMaris websites, platform users, business contacts, customer content, subprocessors, retention, security, rights, cookies, and AI-assisted features.",
    "pdfFilename": "01_Privacy_Policy_FINAL_v1.0.pdf",
    "pdfPath": "/legal/documents/public/01_Privacy_Policy_FINAL_v1.0.pdf",
    "sha256": "769e1c32f1f05656fbf16f90261035b1eb17456270b2741632e1a9da902c98b3",
    "bytes": 1162128,
    "markdown": "# Privacy Policy\n\n**Document ID:** CM-LEGAL-01\n**Version:** 1.0\n**Issue Date:** 23 August 2026\n**Status:** PUBLIC LEGAL NOTICE - FINAL v1.0\n**Effective:** 23 August 2026\n\nPublic privacy notice for CertaMaris websites, platform users and business contacts.\n\n## 1. Overview and Scope\n\nCertaMaris is a business-to-business maritime cybersecurity, compliance, assurance, risk-intelligence and operational-resilience platform. This Privacy Policy describes CertaMaris's handling of personal data on certamaris.com, www.certamaris.com, app.certamaris.com and related business interactions. Customer-controlled content is also governed by the applicable agreement and Data Processing Agreement.\n\n## 2. Personal Data We Collect\n\nWe collect account and identity information (name, business email, hashed password/authentication information, organization membership, role and access scope); business-contact and procurement information; device, network, session, security and audit metadata; support communications; and personal data contained in Customer Content. Personnel data can include names, roles and contact details for CSO, VSO, FSO and other customer-side personnel.\n\n## 3. Customer Security and Compliance Content\n\nCustomer Content can include cyber plans, compliance evidence, risk and gap assessments, corrective actions, vulnerability/SBOM findings, asset inventories, network-zone maps and remote-access pathways. Because this material can reveal a customer's actual security posture, CertaMaris treats it as high-sensitivity Customer Confidential Information and limits its processing to contracted purposes, security, support and lawful obligations.\n\n## 4. How We Use Personal Data\n\nWe use personal data to provide and secure the Services; authenticate and authorize users; administer accounts, contracts and support; maintain auditability; respond to incidents; communicate about procurement and service operations; prevent abuse; comply with law; and improve reliability. We do not sell Customer Personal Data or use Customer Content for targeted advertising.\n\n## 5. Controller and Processor Roles\n\nFor Customer Personal Data processed solely on a customer's behalf, Customer is generally controller and CertaMaris is processor (or subprocessor if Customer is itself a processor). CertaMaris acts as an independent controller for limited account, security, billing/business-contact and relationship-management data needed to run its B2B service.\n\n## 6. Service Providers and Subprocessors\n\nThe current controlled provider list includes Neon, Railway, Cloudflare and Resend. Approved AI routes may use AWS Bedrock and Azure OpenAI only for enabled workflows that satisfy CertaMaris data-classification controls. Direct OpenAI, direct Anthropic, DeepSeek and xAI are not approved for production customer data under the current AI policy. Stripe is not represented as active in this release and must be added to the notice before payment processing is activated.\n\n## 7. International Transfers\n\nCertaMaris is U.S.-operated and may use providers that process data in the United States and other locations. Where applicable law requires safeguards, CertaMaris uses a lawful mechanism such as adequacy, the EU Standard Contractual Clauses, the UK Addendum or another valid UK mechanism, and Swiss adaptations where required. Transfer details depend on the customer's role and actual data flow.\n\n## 8. Retention\n\nAccount data: Life of active account plus 30 days, unless a longer period is required by law, legal hold, dispute preservation, or contract. Audit events: 24 months, subject to longer preservation for an active investigation, legal hold, or customer commitment. Evidence: For the engagement or agreement term plus the configured or contractually agreed retention period. Support/business communications: Ordinarily up to 24 months after closure or last substantive activity, unless a longer period is required for contract administration, dispute preservation, security, or law. Marketing prospects: Ordinarily up to 24 months after the last meaningful business interaction, unless the individual opts out sooner or a lawful reason requires shorter or longer retention. Financial/tax records: For the period required by applicable tax and accounting law; CertaMaris policy targets seven years where no shorter mandatory period controls. Ephemeral security/rate-limit keys: Sliding security/rate-limit window measured in minutes. Legal holds, investigations, disputes and mandatory law can extend retention.\n\n## 9. Security\n\nCertaMaris applies safeguards appropriate to the sensitivity of the service, including logical tenant isolation, role/object-scoped access, authenticated access, TLS, managed encryption at rest, controlled privileged access, audit/change history, operational logging, separated environments, secure development, vulnerability/dependency tooling, backups, incident response and controlled providers. CertaMaris does not promise absolute security and does not claim SOC 2 or ISO 27001 certification in this policy.\n\n## 10. Privacy Rights\n\nRights depend on applicable law and can include access, correction, deletion, restriction, objection, portability, consent withdrawal and appeal. Requests concerning Customer Personal Data are generally handled through the customer-controller. Requests to CertaMaris may be made at https://certamaris.com/contact?intent=privacy. CertaMaris responds within the period required by applicable law; where GDPR applies, ordinarily within one month, subject to legally permitted extensions.\n\n## 11. Cookies and Browser Technologies\n\nCertaMaris uses necessary technologies for secure browser operation and service delivery. The current source reviewed for this release does not establish Google Analytics as active. Cloudflare processes network/security metadata as part of delivery and protection. If non-essential analytics or tracking requiring consent is introduced, CertaMaris will update its Cookie and Tracking Notice and implement required preference controls before activation.\n\n## 12. AI-Assisted Features\n\nWhen enabled, AI-assisted workflows follow classification ceilings. AWS Bedrock is the primary approved enterprise route and Azure OpenAI is the approved fallback subject to safeguards. RESTRICTED data must not leave CertaMaris-controlled processing. CONFIDENTIAL data may use only approved enterprise routes with required safeguards and human review. Client-facing or compliance-influencing AI outputs require human review. Customer Content is not intentionally made available for generalized third-party model training without express written customer agreement.\n\n## 13. Children\n\nThe Services are business-to-business and are not directed to children. Authorized Users must be at least 18 years old.\n\n## 14. Changes and Contact\n\nEffective 23 August 2026. Privacy requests: https://certamaris.com/contact?intent=privacy. Security matters: security@certamaris.com. Procurement: https://certamaris.com/contact?intent=procurement. CertaMaris will version and date material policy changes.\n\n---\n\n**CertaMaris contact routes:** Privacy: https://certamaris.com/contact?intent=privacy | Security: security@certamaris.com | Procurement: https://certamaris.com/contact?intent=procurement"
  },
  {
    "slug": "terms",
    "route": "/legal/terms",
    "shortTitle": "Business Terms",
    "pdfCategory": "public",
    "title": "Business Terms of Service",
    "documentId": "CM-LEGAL-02",
    "version": "1.0",
    "issueDate": "23 August 2026",
    "status": "PUBLIC LEGAL NOTICE - FINAL v1.0",
    "effective": "23 August 2026",
    "summary": "B2B terms governing access to and use of the CertaMaris platform and services.",
    "description": "Business-to-business terms governing negotiated access to and use of the CertaMaris platform and services when incorporated into an Order Form.",
    "pdfFilename": "02_Business_Terms_of_Service_FINAL_v1.0.pdf",
    "pdfPath": "/legal/documents/public/02_Business_Terms_of_Service_FINAL_v1.0.pdf",
    "sha256": "05fef624c939680f5ee63126687f3660a641fdc75afa20d7abbfa5657d1e2407",
    "bytes": 1162953,
    "markdown": "# Business Terms of Service\n\n**Document ID:** CM-LEGAL-02\n**Version:** 1.0\n**Issue Date:** 23 August 2026\n**Status:** PUBLIC LEGAL NOTICE - FINAL v1.0\n**Effective:** 23 August 2026\n\nB2B terms governing access to and use of the CertaMaris platform and services.\n\n## 1. Contract Structure\n\nThese Business Terms govern negotiated B2B access when incorporated into an Order Form. The Order Form identifies the customer, CertaMaris contracting entity, subscription scope, fees, term and negotiated deviations. Order Form terms control for transaction-specific matters; the DPA controls personal-data processing; a signed SLA controls service-level matters.\n\n## 2. Authorized Users and License\n\nCertaMaris grants a limited, non-exclusive, non-transferable, non-sublicensable right during the subscription term for authorized business users to access and use the Services within purchased organization, fleet, vessel, facility, module and user scope. No consumer license, source-code license or ownership right is granted.\n\n## 3. Customer Responsibilities\n\nCustomer is responsible for lawful Customer Content, accurate scope/evidence, user authorization, credentials/endpoints, customer-controlled integrations, implementation of corrective actions and operational decisions. CertaMaris does not replace class, flag, port-state, legal, engineering, vessel navigation, emergency-response or other competent authority.\n\n## 4. Acceptable Use\n\nCustomer must follow the Acceptable Use Policy and must not facilitate unauthorized access, malware, unlawful intrusion, abusive scanning, credential sharing, bypass of tenant isolation or security controls, unsafe automation, infringing use, or use as the sole basis for life-safety/navigation/machinery-control decisions.\n\n## 5. Customer Data Ownership\n\nCustomer owns Customer Content. CertaMaris receives only the processing rights reasonably necessary to provide, secure and support the Services, comply with documented instructions and law, and create non-identifying operational improvements that do not disclose Customer Confidential Information.\n\n## 6. CertaMaris IP\n\nCertaMaris retains its platform, source code, APIs, documentation, control mappings, methodology, templates, Cyber Resilience Twin framework, generalized know-how and improvements. Feedback may be used without identifying the customer or disclosing Customer Confidential Information.\n\n## 7. Confidentiality\n\nConfidentiality duties continue for five years after disclosure or termination; trade secrets remain protected for so long as they qualify as trade secrets under applicable law. Customer cyber plans, vulnerability findings, inventories, network-zone maps, remote-access pathways and security posture are expressly treated as Customer Confidential Information. CertaMaris non-public architecture, security materials, methodology and commercial terms are CertaMaris Confidential Information.\n\n## 8. Security and DPA\n\nCertaMaris maintains reasonable safeguards as described in the Security Addendum/Trust materials and processes Customer Personal Data under the DPA. No SOC 2/ISO certification, universal MFA/SSO, or public RTO/RPO guarantee is incorporated unless separately stated in a signed document.\n\n## 9. AI and Third-Party Services\n\nAI functionality, when enabled, follows CertaMaris's classification policy using AWS Bedrock as primary and Azure OpenAI as fallback. RESTRICTED data is not sent to external AI. Customer remains responsible for reviewing AI-assisted outputs. Third-party integrations are enabled only within contracted implementation scope.\n\n## 10. Fees, Taxes and Payment\n\nInvoices are due Net 30 unless the applicable Order Form states otherwise. Overdue undisputed amounts may accrue a late charge at the lesser of 1.5% per month or the maximum rate permitted by law. Billing frequency and fees are in the Order Form. Customer pays applicable transaction taxes except taxes on CertaMaris net income, subject to valid exemption documentation.\n\n## 11. Support and Availability\n\nNo public uptime or service-credit guarantee applies unless a signed Order Form or SLA expressly provides one. CertaMaris will use commercially reasonable efforts to operate the Services reliably.\n\n## 12. Warranties and Disclaimers\n\nCertaMaris will perform paid Services professionally and substantially in accordance with Documentation. Otherwise, to the maximum extent permitted by law, Services are provided as available without implied warranties. CertaMaris does not guarantee every cyber issue will be found, every recommendation will be correct for the customer's operational environment, or that use will result in an audit, inspection, class or regulatory pass.\n\n## 13. Indemnification\n\nCertaMaris provides a standard U.S. IP infringement defense for authorized paid use, subject to control-of-defense and customary exclusions. Customer provides a defense for third-party claims arising from Customer Content, unlawful/unauthorized use, or lack of required rights. The Order Form may modify indemnities.\n\n## 14. Limitation of Liability\n\nExcept for Excluded Claims, each party's aggregate liability is capped at the fees paid or payable under the affected Order Form during the 12 months preceding the event giving rise to the claim. Liability for breach of confidentiality, data-protection/security obligations, and CertaMaris IP indemnification is capped at two times the general liability cap. Payment obligations, fraud, willful misconduct, and liability that cannot lawfully be limited are not subject to the contractual caps to the extent stated in the Agreement. Neither party is liable for indirect, special, incidental, consequential, exemplary or punitive damages or lost profits/revenue/goodwill, except third-party amounts payable under an express indemnity where applicable.\n\n## 15. Term, Renewal and Termination\n\nUnless an Order Form states otherwise, a subscription renews for successive 12-month periods unless either party gives at least 30 days written notice before the then-current term ends. Material breach cure: 30 days after written notice for a material breach capable of cure. Payment cure: 10 days after written notice for nonpayment of undisputed amounts. Suspension is permitted for material security threats, unlawful use, Acceptable Use violations or qualifying nonpayment, using reasonable efforts to limit impact.\n\n## 16. Export and Deletion\n\nCustomer may export during the term. Standard post-termination export-request window: 30 days after termination or expiration, unless the Order Form states otherwise. unless the Order Form says otherwise. Production data is then removed or rendered inaccessible through the offboarding process, subject to legal holds and required records; backup copies age out through managed rotation.\n\n## 17. Compliance\n\nEach party complies with laws applicable to its performance, including relevant export controls, sanctions and anti-corruption obligations. CertaMaris does not provide legal advice or issue regulatory/class approval.\n\n## 18. Governing Law, Venue and Notices\n\nThe applicable Order Form controls governing law and venue. If it is silent, the Agreement is governed by the law of the U.S. state in which the CertaMaris contracting entity identified in that Order Form is organized, without regard to conflicts rules, and exclusive venue lies in the state and federal courts located in that jurisdiction. Formal customer-specific notice details are stated in the Order Form. Procurement/legal-document requests can be routed through https://certamaris.com/contact?intent=procurement for triage.\n\n## 19. General\n\nAssignment, force majeure, waiver, severability, entire agreement, survival, electronic signatures and order of precedence operate as stated in the Agreement. Customer publicity is opt-in only unless affirmatively authorized in writing.\n\n---\n\n**CertaMaris contact routes:** Privacy: https://certamaris.com/contact?intent=privacy | Security: security@certamaris.com | Procurement: https://certamaris.com/contact?intent=procurement"
  },
  {
    "slug": "cookies",
    "route": "/legal/cookies",
    "shortTitle": "Cookie Notice",
    "pdfCategory": "public",
    "title": "Cookie and Tracking Notice",
    "documentId": "CM-LEGAL-03",
    "version": "1.0",
    "issueDate": "23 August 2026",
    "status": "PUBLIC LEGAL NOTICE - FINAL v1.0",
    "effective": "23 August 2026",
    "summary": "Public notice for cookies, analytics, local storage and similar technologies.",
    "description": "Public notice for cookies, analytics, local storage, Cloudflare delivery/security processing, browser technologies, and future preference requirements.",
    "pdfFilename": "03_Cookie_and_Tracking_Notice_FINAL_v1.0.pdf",
    "pdfPath": "/legal/documents/public/03_Cookie_and_Tracking_Notice_FINAL_v1.0.pdf",
    "sha256": "5a236454cc65f0bdf5b340734f45f96d50a6e63769cf151dc358453fcdbd0595",
    "bytes": 1156451,
    "markdown": "# Cookie and Tracking Notice\n\n**Document ID:** CM-LEGAL-03\n**Version:** 1.0\n**Issue Date:** 23 August 2026\n**Status:** PUBLIC LEGAL NOTICE - FINAL v1.0\n**Effective:** 23 August 2026\n\nPublic notice for cookies, analytics, local storage and similar technologies.\n\n## 1. Scope\n\nThis notice applies to CertaMaris browser-based websites and applications. It should be read with the Privacy Policy.\n\n## 2. Necessary Technologies\n\nCertaMaris uses browser technologies necessary for secure sessions, authentication, service continuity, fraud/abuse prevention, rate limiting and user-requested functionality. Blocking them can prevent sign-in or core service behavior.\n\n## 3. Cloudflare Delivery and Security\n\nCloudflare supports DNS, edge delivery, traffic protection and related security functions. In performing those functions it can process IP addresses, request metadata and security telemetry. Cloudflare is not used here as a basis to claim advertising tracking.\n\n## 4. Analytics\n\nNo Google Analytics dependency was verified in the current public-site source used for this release. If CertaMaris enables Cloudflare Web Analytics or another non-essential analytics product, the site and this notice must be updated together, and any required consent/preference mechanism must be enabled before collection begins.\n\n## 5. Advertising and Cross-Context Tracking\n\nCertaMaris does not use Customer Content for advertising and this baseline does not authorize advertising cookies, sale of personal data or cross-context behavioral advertising.\n\n## 6. Preferences and GPC\n\nNecessary technologies operate without an optional preference. If future processing creates a legal obligation for consent, opt-out or Global Privacy Control recognition, CertaMaris will implement the required technical behavior before that processing is activated.\n\n## 7. Contact and Changes\n\nEffective 23 August 2026. Questions: https://certamaris.com/contact?intent=privacy. Material technology changes will be versioned in this notice.\n\n---\n\n**CertaMaris contact routes:** Privacy: https://certamaris.com/contact?intent=privacy | Security: security@certamaris.com | Procurement: https://certamaris.com/contact?intent=procurement"
  },
  {
    "slug": "acceptable-use",
    "route": "/legal/acceptable-use",
    "shortTitle": "Acceptable Use Policy",
    "pdfCategory": "public",
    "title": "Acceptable Use Policy",
    "documentId": "CM-LEGAL-04",
    "version": "1.0",
    "issueDate": "23 August 2026",
    "status": "PUBLIC LEGAL NOTICE - FINAL v1.0",
    "effective": "23 August 2026",
    "summary": "Use restrictions and security obligations for the CertaMaris platform and services.",
    "description": "Use restrictions and security obligations for the CertaMaris platform and services, including credentials, prohibited conduct, AI, automation, and safety-critical boundaries.",
    "pdfFilename": "04_Acceptable_Use_Policy_FINAL_v1.0.pdf",
    "pdfPath": "/legal/documents/public/04_Acceptable_Use_Policy_FINAL_v1.0.pdf",
    "sha256": "97d909fcb46054df74238a3c02e787fa50ebe65e385ef5465356ceecfc8f91de",
    "bytes": 1156684,
    "markdown": "# Acceptable Use Policy\n\n**Document ID:** CM-LEGAL-04\n**Version:** 1.0\n**Issue Date:** 23 August 2026\n**Status:** PUBLIC LEGAL NOTICE - FINAL v1.0\n**Effective:** 23 August 2026\n\nUse restrictions and security obligations for the CertaMaris platform and services.\n\n## 1. Authorized Use\n\nUse CertaMaris only for legitimate contracted business purposes related to maritime cybersecurity, compliance, assurance, risk intelligence and operational resilience.\n\n## 2. Credentials and Access\n\nUse individual authorized identities; protect credentials; respect organization/fleet/vessel scope; promptly report suspected compromise; do not bypass tenant isolation, rate limits, authentication or security controls.\n\n## 3. Prohibited Technical Conduct\n\nDo not introduce malware, exploit or scan CertaMaris/another customer without written authorization, disrupt service, abuse automation, scrape at harmful rates, reverse engineer beyond non-waivable legal rights, or facilitate unauthorized access to vessels, facilities, systems or networks.\n\n## 4. Prohibited Data and Content\n\nDo not submit unlawfully obtained, infringing or malicious content; credentials/private keys unless specifically required and approved; or data for which the customer lacks rights/lawful basis. RESTRICTED data must follow CertaMaris classification rules and cannot be sent to external AI.\n\n## 5. Safety-Critical Boundary\n\nCertaMaris is not a navigation, machinery-control, emergency-communications or other safety-critical control system. Do not use outputs as the sole basis for life-safety, navigation, machinery-control, emergency-response or active incident-containment decisions.\n\n## 6. AI and Automation\n\nAI-assisted outputs require appropriate human review. Do not attempt to override classification ceilings, enable external web tools for confidential workflows, or submit RESTRICTED data to external AI.\n\n## 7. Enforcement\n\nCertaMaris may investigate suspected violations, preserve relevant evidence and suspend affected users/integrations/functions when reasonably necessary to protect the Services, customers or third parties, using reasonable efforts to limit scope and provide notice when practicable.\n\n## 8. Report a Concern\n\nSecurity and abuse reports: security@certamaris.com or https://certamaris.com/contact?intent=security. Effective 23 August 2026.\n\n---\n\n**CertaMaris contact routes:** Privacy: https://certamaris.com/contact?intent=privacy | Security: security@certamaris.com | Procurement: https://certamaris.com/contact?intent=procurement"
  },
  {
    "slug": "accessibility",
    "route": "/accessibility",
    "shortTitle": "Accessibility Statement",
    "pdfCategory": "public",
    "title": "Accessibility Statement",
    "documentId": "CM-LEGAL-05",
    "version": "1.0",
    "issueDate": "23 August 2026",
    "status": "PUBLIC LEGAL NOTICE - FINAL v1.0",
    "effective": "23 August 2026",
    "summary": "Public accessibility commitment and accommodation contact template.",
    "description": "Public accessibility commitment, target standard, current practices, known limitations, feedback path, and alternative-format assistance for CertaMaris.",
    "pdfFilename": "05_Accessibility_Statement_FINAL_v1.0.pdf",
    "pdfPath": "/legal/documents/public/05_Accessibility_Statement_FINAL_v1.0.pdf",
    "sha256": "e7a28e597a9b32386286f4d4cbd44480de9f850e59a9958b3fe95490980ea65f",
    "bytes": 1156056,
    "markdown": "# Accessibility Statement\n\n**Document ID:** CM-LEGAL-05\n**Version:** 1.0\n**Issue Date:** 23 August 2026\n**Status:** PUBLIC LEGAL NOTICE - FINAL v1.0\n**Effective:** 23 August 2026\n\nPublic accessibility commitment and accommodation contact template.\n\n## 1. Commitment\n\nCertaMaris aims to make its public website and customer-facing experiences usable by people with disabilities and treats accessibility as part of product quality.\n\n## 2. Target Standard\n\nCertaMaris targets WCAG 2.2 Level AA as a design goal. This statement does not claim formal third-party conformance certification or that every page is free of accessibility barriers.\n\n## 3. Current Practices\n\nThe public website uses semantic structure, keyboard-oriented navigation patterns, visible focus treatment, labeled forms, reduced-motion considerations and contrast-minded status presentation. Accessibility remains subject to ongoing QA as content and components change.\n\n## 4. Known Limitations and Third Parties\n\nSome PDFs, third-party services, complex data visualizations or legacy content can present limitations. Where practicable, CertaMaris will provide an alternative format or accessible route upon request.\n\n## 5. Feedback and Assistance\n\nReport an accessibility barrier or request an alternative format at accessibility@certamaris.com. Include the page or document, the problem encountered and any preferred format. Effective 23 August 2026.\n\n---\n\n**CertaMaris contact routes:** Privacy: https://certamaris.com/contact?intent=privacy | Security: security@certamaris.com | Procurement: https://certamaris.com/contact?intent=procurement"
  },
  {
    "slug": "subprocessors",
    "route": "/legal/subprocessors",
    "shortTitle": "Subprocessors",
    "pdfCategory": "public",
    "title": "Subprocessor List and Change Notice",
    "documentId": "CM-LEGAL-06",
    "version": "1.0",
    "issueDate": "23 August 2026",
    "status": "PUBLIC LEGAL NOTICE - FINAL v1.0",
    "effective": "23 August 2026",
    "summary": "Public or customer-facing list of subprocessors and change-notification controls.",
    "description": "Public and customer-facing subprocessor list and change-notification controls for CertaMaris providers, safeguards, and transfer details.",
    "pdfFilename": "06_Subprocessor_List_and_Change_Notice_FINAL_v1.0.pdf",
    "pdfPath": "/legal/documents/public/06_Subprocessor_List_and_Change_Notice_FINAL_v1.0.pdf",
    "sha256": "8d22188864fe40238a1ee8ec75cb581ecf124eed7824a4810072e0d561e3302c",
    "bytes": 1160426,
    "markdown": "# Subprocessor List and Change Notice\n\n**Document ID:** CM-LEGAL-06\n**Version:** 1.0\n**Issue Date:** 23 August 2026\n**Status:** PUBLIC LEGAL NOTICE - FINAL v1.0\n**Effective:** 23 August 2026\n\nPublic or customer-facing list of subprocessors and change-notification controls.\n\n## 1. Purpose\n\nThis list identifies external providers that may process Customer Personal Data for the CertaMaris service and distinguishes internal/self-hosted components. It should be read with the DPA and Privacy Policy.\n\n## 2. Current Subprocessors\n\nThe current controlled list includes Neon, Railway, Cloudflare and Resend. AWS Bedrock and Azure OpenAI are conditional approved enterprise AI routes and process data only when an enabled workflow permits external AI. Stripe is not listed as active because payment processing is not represented as integrated in this release.\n\n## 3. Internal Hosted Components\n\nDependency-Track, ClamAV and Redis-on-Railway are described as CertaMaris-operated or Railway-hosted components in the current deployment inventory; they are not separately treated as external legal subprocessors unless the procurement model changes.\n\n## 4. Change Notice\n\nCertaMaris will provide 30 days advance notice when reasonably practicable before a new or replacement subprocessor materially begins processing Customer Personal Data when reasonably practicable. Customer may object within 15 days after notice, based on reasonable data-protection grounds on reasonable data-protection grounds.\n\n## 5. Transfer Safeguards\n\nEach provider relationship is subject to appropriate contractual and transfer safeguards based on the data flow and applicable law. CertaMaris may use SCCs, the UK Addendum/other UK mechanism, Swiss adaptations, adequacy or other lawful safeguards as applicable.\n\n## 6. Contact\n\nEnterprise procurement questions: https://certamaris.com/contact?intent=procurement. Privacy questions: https://certamaris.com/contact?intent=privacy. Effective 23 August 2026.\n\n## Current Controlled Subprocessor Table\n\n| Provider | Purpose | Processing configuration | Data categories | Safeguard basis |\n|---|---|---|---|---|\n| Neon, LLC (Neon PostgreSQL) | Primary managed PostgreSQL database | US East production configuration | Customer data and account/organization records | Provider DPA and applicable transfer safeguards |\n| Railway Corporation | Application hosting, deployment, runtime networking and managed Redis used for rate limiting | US West production configuration | Customer data, application traffic, operational logs, ephemeral rate-limit keys | Provider DPA and applicable transfer safeguards |\n| Cloudflare, Inc. | DNS, edge delivery, CDN/security, Workers/R2 where configured, and traffic protection | Global edge; configured storage/processing locations depend on service | Traffic metadata, security telemetry, and objects/files when stored in Cloudflare services | Cloudflare DPA and applicable transfer safeguards |\n| Plus Five Five, Inc. d/b/a Resend | Transactional email delivery | United States account/service processing with provider-managed delivery infrastructure | Recipient name/email, message content, delivery status and technical metadata | Resend DPA and applicable transfer safeguards |\n| Amazon Web Services, Inc. - conditional AI route | AWS Bedrock enterprise AI processing when an enabled workflow permits external AI | Approved enterprise region selected for the workload | Only minimized data permitted by the workflow classification; RESTRICTED data excluded | AWS contractual data-protection terms and applicable transfer safeguards |\n| Microsoft Corporation - conditional AI fallback | Azure OpenAI fallback when approved and enabled | Approved Azure region selected for the workload | Only minimized data permitted by the workflow classification; RESTRICTED data excluded | Microsoft DPA/product terms and applicable transfer safeguards |\n\n---\n\n**CertaMaris contact routes:** Privacy: https://certamaris.com/contact?intent=privacy | Security: security@certamaris.com | Procurement: https://certamaris.com/contact?intent=procurement"
  },
  {
    "slug": "dpa",
    "route": "/legal/dpa",
    "shortTitle": "Data Processing Agreement",
    "pdfCategory": "public",
    "title": "Data Processing Agreement",
    "documentId": "CM-LEGAL-10",
    "version": "1.0",
    "issueDate": "23 August 2026",
    "status": "PUBLIC REUSABLE DPA - v1.0",
    "effective": "Upon execution / incorporation into the applicable Agreement",
    "summary": "Enterprise DPA for customer personal data processed by CertaMaris.",
    "description": "Reusable enterprise Data Processing Agreement for Customer Personal Data processed by CertaMaris, including schedules, subprocessors, transfer mechanisms, and technical measures.",
    "pdfFilename": "10_Data_Processing_Agreement_FINAL_v1.0.pdf",
    "pdfPath": "/legal/documents/public/10_Data_Processing_Agreement_FINAL_v1.0.pdf",
    "sha256": "c45b6b502b289814e52685a81d5ed77fef8589fc1d4be54ec5ea67fece78add9",
    "bytes": 1165964,
    "markdown": "# Data Processing Agreement\n\n**Document ID:** CM-LEGAL-10\n**Version:** 1.0\n**Issue Date:** 23 August 2026\n**Status:** PUBLIC REUSABLE DPA - v1.0\n**Effective:** Upon execution / incorporation into the applicable Agreement\n\nEnterprise DPA for customer personal data processed by CertaMaris.\n\n## 1. Parties, Scope and Roles\n\nThis reusable DPA forms part of the Agreement between the Customer identified in the applicable Order Form and the CertaMaris contracting entity identified there. For Customer Personal Data, Customer is controller and CertaMaris is processor, unless Customer is itself a processor, in which case CertaMaris acts as subprocessor. Customer-specific exporter/importer and signature particulars are completed at execution; they are not standing publication fields.\n\n## 2. Documented Instructions\n\nCertaMaris processes Customer Personal Data only on documented instructions in the Agreement, DPA, Order Form, lawful use of the Services, or additional written instructions accepted by CertaMaris, unless law requires otherwise. CertaMaris will inform Customer of a conflicting instruction when legally permitted.\n\n## 3. Confidentiality and Personnel\n\nPersons authorized to process Customer Personal Data are subject to confidentiality obligations and access restrictions appropriate to their role. CertaMaris limits access based on need and treats customer cyber posture and technical architecture as high-sensitivity confidential information.\n\n## 4. Security Measures\n\nCertaMaris maintains safeguards described in Schedule 2, including tenant isolation, role/object-scoped access, authenticated access, TLS, managed encryption at rest, controlled privileged access, audit/change history, logging, separated environments, secure development, vulnerability/dependency management, backups, incident response and controlled subprocessors. Universal MFA/SSO and formal SOC 2/ISO certification are not represented as current.\n\n## 5. Security Incidents\n\nCertaMaris will notify Customer without undue delay and, for a confirmed Security Incident affecting Customer Personal Data, no later than 48 hours after awareness. Notice may be phased and will include known incident nature, affected systems/data, likely consequences, containment/remediation and a coordination contact. CertaMaris will take reasonable containment, investigation and remediation steps and cooperate with legally required customer notifications.\n\n## 6. Data Subject and Regulatory Assistance\n\nCertaMaris will provide reasonable assistance with data-subject requests, DPIAs, prior consultation and regulatory inquiries relating to Customer Personal Data, taking into account the nature of processing. Customer remains responsible for determining its legal bases, notices and whether regulator/data-subject notifications are required.\n\n## 7. Subprocessors\n\nCustomer generally authorizes the subprocessors in Schedule 3. CertaMaris imposes written data-protection obligations appropriate to their processing and provides 30 days advance notice when reasonably practicable. Customer has 15 days after notice, based on reasonable data-protection grounds to object on reasonable data-protection grounds. The parties will attempt reasonable resolution before terminating the affected processing or feature.\n\n## 8. International Transfers\n\nWhere required, the 2021 EU SCCs are incorporated for the applicable transfer: Module 2 when Customer is controller and CertaMaris processor; Module 3 when Customer is processor and CertaMaris subprocessor. UK transfers use the UK Addendum or another valid mechanism, and Swiss transfers use required adaptations. Transaction-specific annex particulars are completed for the actual customer/transfer.\n\n## 9. Audits\n\nCertaMaris provides standard security/privacy materials, questionnaires and available evidence under appropriate confidentiality terms. Where law requires and standard materials are insufficient, Customer may request a reasonable audit coordinated to minimize disruption and protect other customers and security-sensitive information.\n\n## 10. Return and Deletion\n\nCustomer may export during the term and ordinarily has 30 days after termination or expiration, unless the Order Form states otherwise. after termination to request a standard export. CertaMaris then removes or renders inaccessible Customer Personal Data from active production systems subject to law, legal hold and dispute preservation. Backup copies age out through managed rotation.\n\n## 11. Government Requests\n\nUnless prohibited by law, CertaMaris will notify Customer before disclosing Customer Personal Data in response to a binding government request, disclose only data legally required, and challenge overbroad or unlawful demands where reasonably appropriate.\n\n## 12. Liability and Precedence\n\nLiability under this DPA follows the liability framework in the Agreement unless law requires otherwise. If the DPA conflicts with the Agreement on processing of Customer Personal Data, the DPA controls; an applicable transfer mechanism controls to the extent legally required.\n\n## Schedule 1 - Processing Details\n\nSubject matter: provision, security, support and administration of the CertaMaris platform and contracted professional/assurance workflows. Duration: the Agreement term plus lawful retention and offboarding periods. Data subjects can include customer employees, contractors, CSOs, VSOs, FSOs, vessel/facility personnel, business contacts and other persons whose data appears in Customer Content. Personal data can include identifiers, business contact data, account/role data, security/audit data and personal data embedded in compliance evidence.\n\n## Schedule 2 - Technical and Organizational Measures\n\n| Control | Status | Current statement |\n|---|---|---|\n| Tenant isolation | Current | Customer data is logically isolated at database and access-control layers by organization and related operational scope. |\n| Role-based and object-scoped access | Current | Access is scoped by role and object such as organization, fleet or vessel. |\n| Authenticated customer access | Current | The product application requires authenticated sign-in; the marketing website is separate from the authenticated app. |\n| MFA | Planned / enterprise onboarding item | CertaMaris does not make a blanket public production-MFA claim. Options may be implemented by plan and onboarding scope. |\n| SSO / SCIM | Planned enterprise capability | Not represented as universally current. |\n| Encryption in transit | Current | Industry-standard TLS protects traffic in transit. |\n| Encryption at rest | Current | Stored data uses managed encryption-at-rest capabilities of production hosting and database providers. |\n| Privileged production access | Current | Limited to authorized operational personnel; privileged assistance is intended to be controlled and time-bounded. |\n| Audit history and change trail | Current | Evidence, findings, plans and reviewer actions preserve version and review history rather than silently overwriting prior state. |\n| Operational and access logging | Current | Application and infrastructure logs support operations, security review and incident investigation. |\n| Secure development | Current | Changes use source control, review and separated environments before production. |\n| Vulnerability/dependency management | Configurable/current engineering tooling | Private SBOM and vulnerability tooling is used; no public certification or vulnerability-free guarantee is made. |\n| Environment separation | Current | Development, preview/staging and production are separated; production customer data is excluded from lower environments as a design rule. |\n| Backups | Current | Managed database backups are part of the production model; no public RTO/RPO guarantee is made unless stated in a signed SLA. |\n| Incident response | Current | An internal response process exists; customer notification follows contract/DPA terms. |\n| Formal third-party certification | Not claimed | CertaMaris does not claim SOC 2 or ISO 27001 certification unless and until separately completed and specifically published. |\n\n## Schedule 3 - Approved Subprocessors\n\n| Provider | Purpose | Configuration | Data | Safeguards |\n|---|---|---|---|---|\n| Neon, LLC (Neon PostgreSQL) | Primary managed PostgreSQL database | US East production configuration | Customer data and account/organization records | Provider DPA and applicable transfer safeguards |\n| Railway Corporation | Application hosting, deployment, runtime networking and managed Redis used for rate limiting | US West production configuration | Customer data, application traffic, operational logs, ephemeral rate-limit keys | Provider DPA and applicable transfer safeguards |\n| Cloudflare, Inc. | DNS, edge delivery, CDN/security, Workers/R2 where configured, and traffic protection | Global edge; configured storage/processing locations depend on service | Traffic metadata, security telemetry, and objects/files when stored in Cloudflare services | Cloudflare DPA and applicable transfer safeguards |\n| Plus Five Five, Inc. d/b/a Resend | Transactional email delivery | United States account/service processing with provider-managed delivery infrastructure | Recipient name/email, message content, delivery status and technical metadata | Resend DPA and applicable transfer safeguards |\n| Amazon Web Services, Inc. - conditional AI route | AWS Bedrock enterprise AI processing when an enabled workflow permits external AI | Approved enterprise region selected for the workload | Only minimized data permitted by the workflow classification; RESTRICTED data excluded | AWS contractual data-protection terms and applicable transfer safeguards |\n| Microsoft Corporation - conditional AI fallback | Azure OpenAI fallback when approved and enabled | Approved Azure region selected for the workload | Only minimized data permitted by the workflow classification; RESTRICTED data excluded | Microsoft DPA/product terms and applicable transfer safeguards |\n\n## Schedule 4 - International Transfer Mechanisms\n\nEU SCC Module 2 or Module 3 applies as described above depending on Customer's role. The UK Addendum or another then-valid UK mechanism applies to UK restricted transfers; Swiss adaptations apply where required. Customer/exporter/importer particulars and competent authority/court selections are completed for the actual transfer when necessary.\n\n---\n\n**CertaMaris contact routes:** Privacy: https://certamaris.com/contact?intent=privacy | Security: security@certamaris.com | Procurement: https://certamaris.com/contact?intent=procurement"
  }
] as const satisfies readonly LegalPublicDocument[];

export const publicLegalDocumentsBySlug = Object.fromEntries(
  publicLegalDocuments.map((document) => [document.slug, document])
) as unknown as Record<LegalPublicSlug, LegalPublicDocument>;

export const executionTemplateDocuments = [
  {
    "title": "Master Subscription Agreement",
    "label": "Execution Template",
    "pdfFilename": "07_Master_Subscription_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/07_Master_Subscription_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "70b98b7e08c7c5bcac152256d570d7d99c0ca80fef7e0b1c9c3d314d48e0e935",
    "bytes": 1166627
  },
  {
    "title": "Order Form",
    "label": "Execution Template",
    "pdfFilename": "08_Order_Form_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/08_Order_Form_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "f55d64b5778f0208f31dbb78da83dc4e947351dea6ee28193b5822594dfbe7cb",
    "bytes": 1160001
  },
  {
    "title": "Statement of Work",
    "label": "Execution Template",
    "pdfFilename": "09_Statement_of_Work_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/09_Statement_of_Work_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "4d732730f542e886bb50849eacaf5442715c852a31d87958b2c4adc715fdf61b",
    "bytes": 1160883
  },
  {
    "title": "Security Addendum",
    "label": "Execution Template",
    "pdfFilename": "11_Security_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/11_Security_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "6e2da036f8e4ea021f1577de60ec308b972fce789b516540e728951409009eb1",
    "bytes": 1164670
  },
  {
    "title": "Service Level Agreement",
    "label": "Execution Template",
    "pdfFilename": "12_Service_Level_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/12_Service_Level_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "cbc03cb8db985668980000ed9586d19029f5315519cf6539947ed9567fa403f5",
    "bytes": 1159014
  },
  {
    "title": "Mutual Non Disclosure Agreement",
    "label": "Execution Template",
    "pdfFilename": "13_Mutual_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/13_Mutual_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "4d4759a6f802d522487be7388c7d9b9eef822d680494dee5a422aa653c46f9fb",
    "bytes": 1159793
  },
  {
    "title": "Unilateral Non Disclosure Agreement",
    "label": "Execution Template",
    "pdfFilename": "14_Unilateral_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/14_Unilateral_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "b155f35009007240beee69d289e401aa82cf656bed7cf0ef3f778d897c205c3c",
    "bytes": 1159342
  },
  {
    "title": "Evaluation and Pilot Agreement",
    "label": "Execution Template",
    "pdfFilename": "15_Evaluation_and_Pilot_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/15_Evaluation_and_Pilot_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "be911084f1962b9a2742b2c3aed9184f4f93ba28c1c64b66ec7671f861688dd2",
    "bytes": 1161794
  },
  {
    "title": "Beta and Preview Features Addendum",
    "label": "Execution Template",
    "pdfFilename": "16_Beta_and_Preview_Features_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/16_Beta_and_Preview_Features_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "fb98285369f9d6f5b9a8686a99c4434111388aca28a4302b61c9d2fd45c7c40a",
    "bytes": 1159807
  },
  {
    "title": "Professional Services Terms",
    "label": "Execution Template",
    "pdfFilename": "17_Professional_Services_Terms_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/17_Professional_Services_Terms_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "b5a2b490bd5a498a17fd42ea1498a074083a7fc63f964e36cf84609456d648e1",
    "bytes": 1161263
  },
  {
    "title": "Contract Amendment and Change Order",
    "label": "Execution Template",
    "pdfFilename": "18_Contract_Amendment_and_Change_Order_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/18_Contract_Amendment_and_Change_Order_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "b331fcb669b572d3868536e8c4bc6ce19d9c2d8f1b88a5686f9a5a65770fc3c2",
    "bytes": 1158127
  },
  {
    "title": "Renewal and Expansion Order",
    "label": "Execution Template",
    "pdfFilename": "19_Renewal_and_Expansion_Order_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/19_Renewal_and_Expansion_Order_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "d5813ee667a978fca7bce5bdd9d8e9a6326ca6e1792215bcb014169cd548c942",
    "bytes": 1158684
  },
  {
    "title": "Termination Data Export and Deletion Certificate",
    "label": "Execution Template",
    "pdfFilename": "20_Termination_Data_Export_and_Deletion_Certificate_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/20_Termination_Data_Export_and_Deletion_Certificate_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "6745125d8e434aeaf55b940615bb598bddbf645c644d7a4fa07ab3c6fad0a463",
    "bytes": 1159539
  },
  {
    "title": "Customer Security Incident Notification",
    "label": "Execution Template",
    "pdfFilename": "21_Customer_Security_Incident_Notification_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/21_Customer_Security_Incident_Notification_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "9bab2d684efdb498ff494aa3212f8b35bf4ce5a0766ece88851db9ab62d394c6",
    "bytes": 1158491
  },
  {
    "title": "Data Subject Rights Response and Verification Notice",
    "label": "Execution Template",
    "pdfFilename": "22_Data_Subject_Rights_Response_and_Verification_Notice_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/22_Data_Subject_Rights_Response_and_Verification_Notice_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "b83309ea34a3bcfeeba796527c39f405288430e51e8636d901841ed0c9a2c197",
    "bytes": 1158812
  },
  {
    "title": "Vendor Services Agreement",
    "label": "Execution Template",
    "pdfFilename": "23_Vendor_Services_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/23_Vendor_Services_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "bd039d8cc6b41e43bbaa3f3e56a106f87552957a38dbabac9b41381780218020",
    "bytes": 1164706
  },
  {
    "title": "Vendor Data Processing Addendum",
    "label": "Execution Template",
    "pdfFilename": "24_Vendor_Data_Processing_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/24_Vendor_Data_Processing_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "592eb11d25b0fece5568dc6ae1ca2a293eb6aac2baaa623138bcf98c3696230a",
    "bytes": 1163856
  },
  {
    "title": "Vendor Security Addendum",
    "label": "Execution Template",
    "pdfFilename": "25_Vendor_Security_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/25_Vendor_Security_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "da6c1cbc63e5d9849cb9a7e30264fd6e57e65c781fc04874bc940a4131b2dc4d",
    "bytes": 1163232
  },
  {
    "title": "Vendor Non Disclosure Agreement",
    "label": "Execution Template",
    "pdfFilename": "26_Vendor_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/26_Vendor_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "d8f34820eebdbd104b88fbca340145c11169b13b7c1cb216cf303624576a36b0",
    "bytes": 1158705
  },
  {
    "title": "Independent Contractor Services and IP Assignment Agreement",
    "label": "Execution Template",
    "pdfFilename": "27_Independent_Contractor_Services_and_IP_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/27_Independent_Contractor_Services_and_IP_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "729f95f27083a8d67e8366a454a6c8acc4d7adf1813cb8fc004fda4d9299f1b5",
    "bytes": 1162954
  },
  {
    "title": "Employee Confidentiality and Inventions Assignment Agreement",
    "label": "Execution Template",
    "pdfFilename": "28_Employee_Confidentiality_and_Inventions_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/28_Employee_Confidentiality_and_Inventions_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "4e3f2d3a018401e1d62a01f7848c647bafc4b95ef2bb2b23079e098ec3f95f84",
    "bytes": 1161544
  },
  {
    "title": "Advisor Agreement",
    "label": "Execution Template",
    "pdfFilename": "29_Advisor_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/29_Advisor_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "5146f0ca6b7d536b167b41690bb5aeca545714df619ab9b5f2b40cefe323560f",
    "bytes": 1159752
  },
  {
    "title": "Intellectual Property Assignment Agreement",
    "label": "Execution Template",
    "pdfFilename": "30_Intellectual_Property_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/30_Intellectual_Property_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "a1b1ca1b8645fb637eae64c814ae6c050eb65bbebc8c538bbc278872d9e690fd",
    "bytes": 1159128
  },
  {
    "title": "Referral Partner Agreement",
    "label": "Execution Template",
    "pdfFilename": "31_Referral_Partner_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/31_Referral_Partner_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "1ebe6b2cf092d5a90f4dab53a619c311127260d4d064fe150cae458f0b01ff1e",
    "bytes": 1161775
  },
  {
    "title": "Reseller and Channel Agreement",
    "label": "Execution Template",
    "pdfFilename": "32_Reseller_and_Channel_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/32_Reseller_and_Channel_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "2228ef7ae799891db1f6cc87f368e887d4bad5bab986336a6d7582074d5752e4",
    "bytes": 1161421
  },
  {
    "title": "Technology and Integration Partner Agreement",
    "label": "Execution Template",
    "pdfFilename": "33_Technology_and_Integration_Partner_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/33_Technology_and_Integration_Partner_Agreement_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "893d12f3e37cbc745c9cbd8641e5f451f27fe62b02830de4925d47719df62e7e",
    "bytes": 1162155
  },
  {
    "title": "International Data Transfer Addendum",
    "label": "Execution Template",
    "pdfFilename": "34_International_Data_Transfer_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/34_International_Data_Transfer_Addendum_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "a1f889c346a945f5c575a3f1cae4daaf618abdd113de01576bc7b949079bd4be",
    "bytes": 1161604
  },
  {
    "title": "Legal Hold Notice and Preservation Acknowledgment",
    "label": "Execution Template",
    "pdfFilename": "35_Legal_Hold_Notice_and_Preservation_Acknowledgment_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/35_Legal_Hold_Notice_and_Preservation_Acknowledgment_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "2684c33b18446af21937377f99f25669f35fc5576b1ceda333bb6e710b6c666d",
    "bytes": 1158803
  },
  {
    "title": "Board or Member Written Consent",
    "label": "Execution Template",
    "pdfFilename": "36_Board_or_Member_Written_Consent_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/36_Board_or_Member_Written_Consent_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "64bb9209ac7d72ab47b98464d61c83fe05360e6553eeb83409985781562b7598",
    "bytes": 1158924
  },
  {
    "title": "Corporate Authority and Signatory Resolution",
    "label": "Execution Template",
    "pdfFilename": "37_Corporate_Authority_and_Signatory_Resolution_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/37_Corporate_Authority_and_Signatory_Resolution_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "0418c31c552ea63556115d17048af7dc0869ec35c35a4a16cdf545ab467f9ad6",
    "bytes": 1158783
  },
  {
    "title": "Trademark and Customer Logo Permission",
    "label": "Execution Template",
    "pdfFilename": "38_Trademark_and_Customer_Logo_Permission_EXECUTION_TEMPLATE_v1.0.pdf",
    "pdfPath": "/legal/documents/enterprise-templates/38_Trademark_and_Customer_Logo_Permission_EXECUTION_TEMPLATE_v1.0.pdf",
    "sha256": "1707326af15dab2029970dbfa740e5963758dbf764e1391b2c4c5d0c1b638d2e",
    "bytes": 1158899
  }
] as const satisfies readonly LegalTemplateDocument[];

export const masterLegalBinder = {
  "title": "CertaMaris Complete Populated Legal Library",
  "label": "Master Binder",
  "pdfFilename": "00_CertaMaris_COMPLETE_POPULATED_LEGAL_LIBRARY_MASTER_v1.0.pdf",
  "pdfPath": "/legal/documents/master/00_CertaMaris_COMPLETE_POPULATED_LEGAL_LIBRARY_MASTER_v1.0.pdf",
  "sha256": "d865fd7d0b5c2d578e74785ee5f5e3445175fd68af9c41f4aa1996827c120207",
  "bytes": 1645575
} as const satisfies LegalBinderDocument;
