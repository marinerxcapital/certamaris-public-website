export type LegalDocumentStatus = {
  slug: "privacy" | "terms" | "dpa";
  title: string;
  description: string;
  path: string;
  intro: string;
  effectiveDateState: string;
  sourceFilename: string;
  documentClassification: string;
  statusSummary: string;
  downloadStatus: string;
  blockerHighlights: string[];
  packageFacts: string[];
  nextSteps: string[];
  actionLinks: { label: string; href: string }[];
};

export const legalPackageSource = {
  packageName: "CertaMaris Final Legal Document Package",
  packageVersion: "v1.0",
  sourceArchive: "CertaMaris_Final_Legal_Document_Package_v1.0.zip",
  generatedDate: "2026-08-04",
  documentDateLabel: "August 4, 2026",
  status: "Final legal text; configuration incomplete",
  remainingBracketedFields: 95,
  publicationOrRelianceBlockers: 81,
  executionBlockers: 4,
  manifestVerification: "13 of 13 files matched the manifest SHA-256 digest and byte size on August 4, 2026.",
  internalFilesNotice:
    "DOCX sources, the publication checklist, the finalization report, and the package manifest remain internal and are not exposed as public website assets.",
} as const;

export const legalDocuments: Record<LegalDocumentStatus["slug"], LegalDocumentStatus> = {
  privacy: {
    slug: "privacy",
    title: "CertaMaris Privacy Policy",
    description:
      "Status of the CertaMaris Privacy Policy source package and the remaining publication blockers that prevent the final v1.0 text from being published as an operative public policy.",
    path: "/legal/privacy",
    intro:
      "The August 4, 2026 source package contains a final v1.0 Privacy Policy text, but the controlling checklist still marks the document configuration incomplete and blocks public publication until the remaining legal and operational fields are supplied.",
    effectiveDateState: "[PRIVACY POLICY EFFECTIVE DATE]",
    sourceFilename: "CertaMaris_Privacy_Policy_FINAL_v1.0.pdf",
    documentClassification: "Public-target legal text in the package, but not publication-ready.",
    statusSummary:
      "As of Tuesday, August 4, 2026, the controlling package does not allow this policy to be represented as operative. The route is live so CertaMaris can point to current publication status without publishing incomplete legal language.",
    downloadStatus:
      "Public PDF download is intentionally withheld because the package checklist says publication must wait until the blocker fields are completed.",
    blockerHighlights: [
      "The policy still carries an unresolved effective-date field: [PRIVACY POLICY EFFECTIVE DATE].",
      "Core identity and notice details remain blank, including [CERTAMARIS LEGAL ENTITY NAME], [CERTAMARIS BUSINESS ADDRESS], and [PRIVACY CONTACT NAME OR TITLE].",
      "Privacy and security contact channels are still unresolved in the document package, including [PRIVACY CONTACT EMAIL], [SECURITY CONTACT EMAIL], and [DPO CONTACT].",
      "Retention and deletion disclosures remain incomplete, including marketing, support, financial, production, backup, and security-log retention periods.",
      "Provider, transfer-mechanism, and analytics disclosures remain incomplete for Cloudflare, Railway, Neon, Resend, Stripe, and any optional analytics tooling.",
      "The package still requires implementation confirmation for consent, Global Privacy Control, and any non-essential analytics or cookie handling.",
    ],
    packageFacts: [
      "Source file: CertaMaris_Privacy_Policy_FINAL_v1.0.pdf and matching DOCX.",
      "Package version: v1.0. Package status: Final legal text; configuration incomplete.",
      "The finalization report says the Privacy Policy was moved to a Public classification, but publication is still blocked until the unresolved fields are completed.",
      legalPackageSource.manifestVerification,
      legalPackageSource.internalFilesNotice,
    ],
    nextSteps: [
      "Finalize the legal entity, address, effective date, and privacy-contact fields with approved owner or counsel values.",
      "Confirm the actual retention, deletion, logging, analytics, and provider-processing facts before publishing the operative policy text.",
      "After those facts are approved, publish the final PDF and the full native HTML policy at this same route.",
    ],
    actionLinks: [
      { label: "Contact about privacy", href: "/contact?intent=privacy" },
      { label: "Review Trust Center", href: "/trust" },
    ],
  },
  terms: {
    slug: "terms",
    title: "CertaMaris Business Terms of Service",
    description:
      "Status of the CertaMaris Business Terms of Service source package and the unresolved commercial and legal fields that still block public publication of the final v1.0 text.",
    path: "/legal/terms",
    intro:
      "The August 4, 2026 source package contains a final v1.0 Business Terms text, but the publication checklist says CertaMaris must not publish or rely on it as a completed public agreement until the remaining commercial, liability, and governing-law fields are supplied.",
    effectiveDateState: "[TERMS EFFECTIVE DATE]",
    sourceFilename: "CertaMaris_Business_Terms_of_Service_FINAL_v1.0.pdf",
    documentClassification: "Confidential in the package finalization report.",
    statusSummary:
      "As of Tuesday, August 4, 2026, CertaMaris does not have a publication-ready public terms document in the controlling package. This route reflects the live status instead of exposing incomplete contract text.",
    downloadStatus:
      "Public PDF download is intentionally withheld because the package checklist marks the Business Terms as blocked for publication and customer reliance.",
    blockerHighlights: [
      "The terms still carry an unresolved effective-date field: [TERMS EFFECTIVE DATE].",
      "The package still lacks the contracting-party identity: [CERTAMARIS LEGAL ENTITY NAME].",
      "Commercial timelines and payment terms remain blank, including renewal, non-renewal, payment term, payment cure period, and late-fee fields.",
      "Risk allocation remains incomplete, including general liability cap, super-cap fields, excluded claims, confidentiality term, and cure periods.",
      "Dispute-resolution language remains incomplete, including [GOVERNING LAW JURISDICTION], [EXCLUSIVE VENUE], and the optional arbitration or jury-waiver field.",
      "Operational commitments remain unresolved, including uptime, response targets, notice mechanics, export and deletion behavior, and customer-logo rights.",
    ],
    packageFacts: [
      "Source file: CertaMaris_Business_Terms_of_Service_FINAL_v1.0.pdf and matching DOCX.",
      "Package version: v1.0. Package status: Final legal text; configuration incomplete.",
      "The finalization report retained a Confidential classification for the Business Terms and states that unresolved commercial and legal fields still block publication.",
      legalPackageSource.manifestVerification,
      legalPackageSource.internalFilesNotice,
    ],
    nextSteps: [
      "Finalize the legal entity, effective date, governing law, venue, liability caps, notice mechanics, and payment fields with approved counsel values.",
      "Confirm the actual service, export, deletion, and support commitments before publishing an operative public terms document.",
      "After those fields are complete, publish the final PDF and the full native HTML terms at this route and preserve an archive of the superseded release.",
    ],
    actionLinks: [
      { label: "Start a procurement request", href: "/contact?intent=procurement" },
      { label: "Procurement materials", href: "/trust/procurement" },
    ],
  },
  dpa: {
    slug: "dpa",
    title: "CertaMaris Data Processing Agreement",
    description:
      "Status of the CertaMaris Data Processing Agreement source package and the unresolved standing DPA, subprocessor, transfer, and security-schedule fields that still block public publication of the final v1.0 text.",
    path: "/legal/dpa",
    intro:
      "The August 4, 2026 source package contains a final v1.0 Data Processing Agreement text, but the controlling checklist says the standing DPA fields and schedules remain incomplete. The reusable template cannot be published here as an operative public DPA until those fields are completed.",
    effectiveDateState: "[DPA EFFECTIVE DATE]",
    sourceFilename: "CertaMaris_Data_Processing_Agreement_FINAL_v1.0.pdf",
    documentClassification: "Confidential in the package finalization report.",
    statusSummary:
      "As of Tuesday, August 4, 2026, CertaMaris does not have a publication-ready public DPA in the controlling package. This route explains the document status and the current request path for enterprise review.",
    downloadStatus:
      "Public PDF download is intentionally withheld because the package checklist blocks DPA publication and execution until the standing fields and schedules are completed.",
    blockerHighlights: [
      "The DPA still carries an unresolved effective-date field: [DPA EFFECTIVE DATE].",
      "Standing party and notice fields remain incomplete, including [CERTAMARIS LEGAL ENTITY NAME], subprocessor notice periods, and related commercial notice mechanics.",
      "Schedule 3 provider and transfer fields remain unresolved for Cloudflare, Railway, Neon, Resend, Stripe, and any optional AI provider.",
      "Schedule 4 transfer-mechanism details remain unresolved, including SCC module selection, supervisory authority, courts, governing member state, UK mechanism, Swiss addendum, and supplementary measures.",
      "Security and operational schedules still require exact engineering and operations confirmations for encryption, MFA, backups, deletion, logs, incident response, continuity, staffing practices, and evidence availability.",
      "Customer-specific countersignature fields remain blank in the reusable template, including customer legal name and exporter or importer schedule details.",
    ],
    packageFacts: [
      "Source file: CertaMaris_Data_Processing_Agreement_FINAL_v1.0.pdf and matching DOCX.",
      "Package version: v1.0. Package status: Final legal text; configuration incomplete.",
      "The finalization report retained a Confidential classification for the DPA and recorded 4 execution or countersignature blockers in addition to the publication blockers.",
      legalPackageSource.manifestVerification,
      legalPackageSource.internalFilesNotice,
    ],
    nextSteps: [
      "Complete the standing DPA fields, provider schedules, transfer annex details, and technical and organizational measures with approved legal, privacy, security, and operations facts.",
      "Keep customer-specific countersignature fields blank in the reusable template until the enterprise counterparty is known, but do not publish the standing template until the base schedule data is complete.",
      "Enterprise customers can request DPA review through the procurement path while the public route remains a status page.",
    ],
    actionLinks: [
      { label: "Start a procurement request", href: "/contact?intent=procurement" },
      { label: "Trust Center procurement", href: "/trust/procurement" },
    ],
  },
};
