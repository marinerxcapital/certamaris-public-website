export const SITE_NAME = "CertaMaris";
export const SITE_TAGLINE = "Maritime Cyber Compliance & Assurance";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://certamaris.com").replace(/\/$/, "");
export const SITE_CANONICAL_URL = `${SITE_URL}/`;
export const SITE_DESCRIPTION =
  "Maritime cyber compliance software for fleet operators — requirements, evidence, findings, and readiness packages in one controlled record.";
export const SOCIAL_PREVIEW_IMAGE_PATH = "/og/certamaris-link-preview-2026-08-v2.png";
export const SOCIAL_PREVIEW_IMAGE_URL = `${SITE_URL}${SOCIAL_PREVIEW_IMAGE_PATH}`;

/**
 * INTEGRATION POINTS — CertaMaris application (Lovable-built, TanStack Start)
 * -------------------------------------------------
 * These four URLs are the seams between this marketing site and the
 * authenticated product application. Set the corresponding environment
 * variables to override per-deploy; the fallbacks below point at the
 * application's real routes as of 2026-07-26.
 *
 *   NEXT_PUBLIC_APP_SIGN_IN_URL       -> real route: /auth/login
 *   NEXT_PUBLIC_APP_GET_STARTED_URL   -> primary demo CTA. No self-serve
 *                                        signup route exists in the app
 *                                        (enterprise/sales-assisted product),
 *                                        so this defaults to /contact?intent=demo
 *                                        on this marketing site. Point it at a
 *                                        real self-serve signup route if that
 *                                        ever ships.
 *   NEXT_PUBLIC_APP_SCHEDULING_URL     (optional booking/calendar embed)
 *   NEXT_PUBLIC_APP_SALES_EMAIL        (mailto fallback for Contact Sales)
 */
export const APP_SIGN_IN_URL = process.env.NEXT_PUBLIC_APP_SIGN_IN_URL ?? "https://app.certamaris.com/auth/login";
/** Primary marketing CTA destination (demo request). Env override preserved. */
export const APP_GET_STARTED_URL =
  process.env.NEXT_PUBLIC_APP_GET_STARTED_URL ?? "/contact?intent=demo";
export const APP_SCHEDULING_URL = process.env.NEXT_PUBLIC_APP_SCHEDULING_URL ?? "";
export const APP_SALES_EMAIL = process.env.NEXT_PUBLIC_APP_SALES_EMAIL ?? "sales@certamaris.com";
export const SECURITY_EMAIL = process.env.NEXT_PUBLIC_SECURITY_EMAIL ?? "security@certamaris.com";
export const CONTACT_FORWARD_ENDPOINT = process.env.CONTACT_FORWARD_ENDPOINT ?? "";

/**
 * For static-export deployments where the Cloudflare Worker /api/contact
 * route is not running, the built-in /api/contact route isn't available. Set
 * this to a publicly callable endpoint (a hosted function, form backend, or
 * webhook that accepts the same JSON body) and the contact form will POST to
 * it directly from the browser instead of the local API route.
 */
export const NEXT_PUBLIC_CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

/** Contact is a request form, not a calendar booking, unless APP_SCHEDULING_URL is set. */
export const PRIMARY_CTA_LABEL = "Request a demo";
export const PRIMARY_CTA_HREF = "/contact?intent=demo";
export const SECONDARY_CTA_LABEL = "Explore the platform";
export const SECONDARY_CTA_HREF = "/platform";
export const SIGN_IN_LABEL = "Sign in";
export const DEMO_TOUR_LABEL = "Product tour";
export const DEMO_TOUR_HREF = "/demo";

export const REGULATORY_BOUNDARY =
  "CertaMaris supports compliance workflows. It is not legal or regulatory advice, does not replace qualified reviewers, classification societies, flag states, or legal counsel, and does not guarantee audit, survey, or inspection outcomes. Official IMO, IACS, flag-state, and classification-society texts control.";

export const FOOTER_STANDING_LINE =
  "Not legal or regulatory advice. Official sources control. Qualified human review is required for compliance and applicability determinations.";

/** Shared link shape for nav, footer, and mega menus. */
export type SiteLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavMenuSection = {
  title: string;
  links: SiteLink[];
};

export type NavMenuGroup = {
  id: string;
  label: string;
  /** Overview / parent route when the group itself is a section hub. */
  href?: string;
  /**
   * When true, render as a top-level link (no mega dropdown).
   * Also auto-detected when children are empty or hub-only — see isDirectNavGroup.
   */
  direct?: boolean;
  /** Flat link list for command palette, mobile, and mega fallback. */
  children: SiteLink[];
  /** Optional mega-menu column grouping. When set, MegaPanel prefers sections over a flat grid. */
  sections?: NavMenuSection[];
};

/* -------------------------------------------------------------------------- */
/* Product                                                                    */
/* -------------------------------------------------------------------------- */

export const PRODUCT_LINKS: SiteLink[] = [
  { label: "Platform Overview", href: "/platform" },
  { label: "Client Company Portal", href: "/platform/client-company-portal" },
  { label: "Fleet Management", href: "/platform/fleet-management" },
  { label: "Vessel Portal", href: "/platform/vessel-portal" },
  { label: "Assessments", href: "/platform/assessments" },
  { label: "Evidence Management", href: "/platform/evidence" },
  { label: "Findings and Corrective Actions", href: "/platform/findings-corrective-actions" },
  { label: "Cybersecurity Plans", href: "/platform/cybersecurity-plans" },
  { label: "Regulatory Intelligence", href: "/platform/regulatory-intelligence" },
  { label: "Continuous Assurance", href: "/platform/continuous-assurance" },
  { label: "Reports and Readiness", href: "/platform/reports-readiness" },
  { label: "Integrations", href: "/platform/integrations" },
];

/* -------------------------------------------------------------------------- */
/* Solutions                                                                  */
/* -------------------------------------------------------------------------- */

export const SOLUTIONS_LINKS: SiteLink[] = [
  { label: "Solutions Overview", href: "/solutions" },
  { label: "Fleet Cyber Compliance", href: "/solutions/fleet-cyber-compliance" },
  { label: "Audit & Survey Readiness", href: "/solutions/audit-survey-readiness" },
  { label: "IMO MSC.428(98)", href: "/solutions/imo-msc-428-98" },
  { label: "IACS UR E26", href: "/solutions/iacs-ur-e26" },
  { label: "IACS UR E27", href: "/solutions/iacs-ur-e27" },
  { label: "Vessel Cyber Risk", href: "/solutions/vessel-cyber-risk-management" },
  { label: "Evidence & Findings", href: "/solutions/evidence-findings-management" },
  { label: "Corrective Action Verification", href: "/solutions/corrective-action-verification" },
  { label: "Cybersecurity Plan Management", href: "/solutions/cybersecurity-plan-management" },
  { label: "SBOM & Vulnerability", href: "/solutions/sbom-vulnerability-assurance" },
  { label: "Executive & Board Reporting", href: "/solutions/executive-board-reporting" },
  { label: "Regulatory Change Management", href: "/solutions/regulatory-change-management" },
];

/* -------------------------------------------------------------------------- */
/* Who We Serve                                                               */
/* -------------------------------------------------------------------------- */

export const WHO_WE_SERVE_LINKS: SiteLink[] = [
  { label: "Who We Serve Overview", href: "/who-we-serve" },
  { label: "Ship Owners", href: "/who-we-serve/ship-owners" },
  { label: "Operators", href: "/who-we-serve/operators" },
  { label: "Technical Managers & DPAs", href: "/who-we-serve/technical-managers-dpas" },
  { label: "Maritime IT/OT", href: "/who-we-serve/maritime-it-ot" },
  { label: "Vessel Masters & Officers", href: "/who-we-serve/vessel-masters-officers" },
  { label: "Classification & Survey", href: "/who-we-serve/classification-survey" },
  { label: "Insurers & P&I", href: "/who-we-serve/insurers-pi" },
  { label: "Maritime Service Providers", href: "/who-we-serve/maritime-service-providers" },
];

/* -------------------------------------------------------------------------- */
/* Compliance                                                                 */
/* -------------------------------------------------------------------------- */

export const COMPLIANCE_LINKS: SiteLink[] = [
  { label: "Compliance Overview", href: "/compliance" },
  { label: "IMO", href: "/compliance/imo" },
  { label: "IACS", href: "/compliance/iacs" },
  { label: "Guidelines", href: "/compliance/guidelines" },
  { label: "Update Center", href: "/compliance/update-center" },
  { label: "Official Sources", href: "/compliance/official-sources" },
  { label: "Mapping Methodology", href: "/compliance/mapping-methodology" },
];

/* -------------------------------------------------------------------------- */
/* Resources                                                                  */
/* -------------------------------------------------------------------------- */

export const RESOURCES_LINKS: SiteLink[] = [
  { label: "All Resources", href: "/resources" },
  { label: "Guides", href: "/resources?tag=guides" },
  { label: "Checklists", href: "/resources?tag=checklists" },
  { label: "Templates", href: "/resources?tag=templates" },
  { label: "Glossary", href: "/glossary" },
];

/* -------------------------------------------------------------------------- */
/* Trust                                                                      */
/* -------------------------------------------------------------------------- */

export const TRUST_LINKS: SiteLink[] = [
  { label: "Security", href: "/security" },
  { label: "Trust Center", href: "/trust" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Business Terms", href: "/legal/terms" },
  { label: "Cookie Notice", href: "/legal/cookies" },
  { label: "Acceptable Use Policy", href: "/legal/acceptable-use" },
  { label: "Data Processing Agreement", href: "/legal/dpa" },
  { label: "Subprocessors", href: "/legal/subprocessors" },
  { label: "Legal Library", href: "/legal/library" },
  { label: "Responsible Disclosure", href: "/trust/responsible-disclosure" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "System Status", href: "/trust/status" },
  { label: "Procurement", href: "/trust/procurement" },
  { label: "Assurance Model", href: "/trust/assurance-model" },
  { label: "AI Policy", href: "/trust/ai-policy" },
];

/** Curated Trust mega — diligence destinations without full legal-library bloat. */
export const TRUST_NAV_LINKS: SiteLink[] = [
  { label: "Security", href: "/security" },
  { label: "Trust Center", href: "/trust" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Procurement", href: "/trust/procurement" },
  { label: "Status", href: "/trust/status" },
  { label: "Responsible Disclosure", href: "/trust/responsible-disclosure" },
  { label: "Assurance Model", href: "/trust/assurance-model" },
  { label: "AI Policy", href: "/trust/ai-policy" },
  { label: "Accessibility", href: "/accessibility" },
];

/* -------------------------------------------------------------------------- */
/* Company                                                                    */
/* -------------------------------------------------------------------------- */

export const COMPANY_LINKS: SiteLink[] = [
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Corporate Information", href: "/about/corporate-information" },
  { label: "Partners", href: "/about/partners" },
  { label: "Careers", href: "/about/careers" },
  { label: "Press", href: "/about/press" },
];

/** Utility / decision pages linked from nav company menu and footer. */
export const UTILITY_LINKS: SiteLink[] = [
  { label: "Why CertaMaris", href: "/why-certamaris" },
  { label: "Implementation", href: "/implementation" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: DEMO_TOUR_LABEL, href: DEMO_TOUR_HREF },
  { label: "Contact", href: "/contact" },
];

/** Product mega — platform capabilities vs operational workflows. */
export const PRODUCT_NAV_SECTIONS: NavMenuSection[] = [
  {
    title: "Platform",
    links: [
      { label: "Platform Overview", href: "/platform" },
      { label: "Client Company Portal", href: "/platform/client-company-portal" },
      { label: "Regulatory Intelligence", href: "/platform/regulatory-intelligence" },
      { label: "Continuous Assurance", href: "/platform/continuous-assurance" },
      { label: "Integrations", href: "/platform/integrations" },
    ],
  },
  {
    title: "Workflows",
    links: [
      { label: "Assessments", href: "/platform/assessments" },
      { label: "Evidence Management", href: "/platform/evidence" },
      { label: "Findings and Corrective Actions", href: "/platform/findings-corrective-actions" },
      { label: "Cybersecurity Plans", href: "/platform/cybersecurity-plans" },
      { label: "Fleet Management", href: "/platform/fleet-management" },
      { label: "Vessel Portal", href: "/platform/vessel-portal" },
      { label: "Reports and Readiness", href: "/platform/reports-readiness" },
    ],
  },
];

/** Solutions mega — audiences, solution plays, and compliance hubs (curated). */
export const SOLUTIONS_NAV_SECTIONS: NavMenuSection[] = [
  {
    title: "Who We Serve",
    links: [
      { label: "Who We Serve Overview", href: "/who-we-serve" },
      { label: "Ship Owners", href: "/who-we-serve/ship-owners" },
      { label: "Operators", href: "/who-we-serve/operators" },
      { label: "Technical Managers & DPAs", href: "/who-we-serve/technical-managers-dpas" },
      { label: "Maritime IT/OT", href: "/who-we-serve/maritime-it-ot" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Solutions Overview", href: "/solutions" },
      { label: "Fleet Cyber Compliance", href: "/solutions/fleet-cyber-compliance" },
      { label: "Audit & Survey Readiness", href: "/solutions/audit-survey-readiness" },
      { label: "IMO MSC.428(98)", href: "/solutions/imo-msc-428-98" },
      { label: "IACS UR E26", href: "/solutions/iacs-ur-e26" },
      { label: "IACS UR E27", href: "/solutions/iacs-ur-e27" },
      { label: "Executive & Board Reporting", href: "/solutions/executive-board-reporting" },
    ],
  },
  {
    title: "Compliance",
    links: [
      { label: "Compliance Overview", href: "/compliance" },
      { label: "IMO", href: "/compliance/imo" },
      { label: "IACS", href: "/compliance/iacs" },
      { label: "Update Center", href: "/compliance/update-center" },
      { label: "Official Sources", href: "/compliance/official-sources" },
    ],
  },
];

/** Resources mega — content library plus company/decision discoverability. */
export const RESOURCES_NAV_SECTIONS: NavMenuSection[] = [
  {
    title: "Library",
    links: [
      { label: "All Resources", href: "/resources" },
      { label: "Guides", href: "/resources?tag=guides" },
      { label: "Checklists", href: "/resources?tag=checklists" },
      { label: "Templates", href: "/resources?tag=templates" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why CertaMaris", href: "/why-certamaris" },
      { label: "Implementation", href: "/implementation" },
      { label: "FAQ", href: "/faq" },
      { label: DEMO_TOUR_LABEL, href: DEMO_TOUR_HREF },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function flattenNavSections(sections: NavMenuSection[]): SiteLink[] {
  const seen = new Set<string>();
  const links: SiteLink[] = [];
  for (const section of sections) {
    for (const link of section.links) {
      if (seen.has(link.href)) continue;
      seen.add(link.href);
      links.push(link);
    }
  }
  return links;
}

/**
 * Desktop primary navigation — premium enterprise IA.
 * Top-level: Product, Solutions, Resources, Pricing, Trust.
 * Who We Serve + Compliance live under Solutions; Company under Resources + Footer.
 */
export const NAV_PRIMARY: NavMenuGroup[] = [
  {
    id: "product",
    label: "Product",
    href: "/platform",
    sections: PRODUCT_NAV_SECTIONS,
    children: flattenNavSections(PRODUCT_NAV_SECTIONS),
  },
  {
    id: "solutions",
    label: "Solutions",
    href: "/solutions",
    sections: SOLUTIONS_NAV_SECTIONS,
    children: flattenNavSections(SOLUTIONS_NAV_SECTIONS),
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    sections: RESOURCES_NAV_SECTIONS,
    children: flattenNavSections(RESOURCES_NAV_SECTIONS),
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
    direct: true,
    children: [{ label: "Pricing", href: "/pricing" }],
  },
  {
    id: "trust",
    label: "Trust",
    href: "/trust",
    children: TRUST_NAV_LINKS,
  },
];

/**
 * Compact group list used by legacy consumers and simple footers.
 * Prefer NAV_PRIMARY / FOOTER_GROUPS for full IA.
 */
export const NAV_GROUPS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: PRODUCT_LINKS.map((l) => [l.label, l.href] as [string, string]),
  },
  {
    title: "Solutions",
    links: [
      ...SOLUTIONS_LINKS.slice(0, 6).map((l) => [l.label, l.href] as [string, string]),
      ["Who We Serve", "/who-we-serve"],
      ["Compliance", "/compliance"],
    ],
  },
  {
    title: "Resources",
    links: [
      ...RESOURCES_LINKS.map((l) => [l.label, l.href] as [string, string]),
      ["Pricing", "/pricing"],
      ["About", "/about"],
    ],
  },
  {
    title: "Trust",
    links: TRUST_NAV_LINKS.map((l) => [l.label, l.href] as [string, string]),
  },
];

/**
 * Footer column groups — premium enterprise footer.
 * Product · Solutions · Resources · Company · Trust/Legal
 *
 * NOTE: this array is hand-maintained separately from NAV_PRIMARY and the
 * individual *_LINKS sources above. When a new page is added, its footer
 * exposure must be added here by hand or it silently becomes crawl-orphaned.
 */
export const FOOTER_GROUPS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["Platform Overview", "/platform"],
      ["Assessments", "/platform/assessments"],
      ["Evidence Management", "/platform/evidence"],
      ["Findings & Actions", "/platform/findings-corrective-actions"],
      ["Cybersecurity Plans", "/platform/cybersecurity-plans"],
      ["Fleet Management", "/platform/fleet-management"],
      ["Vessel Portal", "/platform/vessel-portal"],
      ["Reports and Readiness", "/platform/reports-readiness"],
      ["Integrations", "/platform/integrations"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["All Solutions", "/solutions"],
      ["Fleet Cyber Compliance", "/solutions/fleet-cyber-compliance"],
      ["Audit & Survey Readiness", "/solutions/audit-survey-readiness"],
      ["IMO MSC.428(98)", "/solutions/imo-msc-428-98"],
      ["IACS UR E26 / E27", "/solutions/iacs-ur-e26"],
      ["Who We Serve", "/who-we-serve"],
      ["Compliance Hub", "/compliance"],
      ["Official Sources", "/compliance/official-sources"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Resources", "/resources"],
      ["Glossary", "/glossary"],
      ["Why CertaMaris", "/why-certamaris"],
      ["Implementation", "/implementation"],
      ["Pricing", "/pricing"],
      ["FAQ", "/faq"],
      ["Product tour", "/demo"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Leadership", "/about/leadership"],
      ["Corporate Information", "/about/corporate-information"],
      ["Partners", "/about/partners"],
      ["Careers", "/about/careers"],
      ["Press", "/about/press"],
      ["Contact", "/contact"],
      [PRIMARY_CTA_LABEL, PRIMARY_CTA_HREF],
    ],
  },
  {
    title: "Trust & Legal",
    links: [
      ["Security", "/security"],
      ["Trust Center", "/trust"],
      ["Privacy Policy", "/legal/privacy"],
      ["Business Terms", "/legal/terms"],
      ["Accessibility", "/accessibility"],
      ["AI Policy", "/trust/ai-policy"],
      ["Responsible Disclosure", "/trust/responsible-disclosure"],
      ["Status", "/trust/status"],
      ["Procurement", "/trust/procurement"],
      ["Assurance Model", "/trust/assurance-model"],
      ["Legal Library", "/legal/library"],
      ["Data Processing Agreement", "/legal/dpa"],
      ["Subprocessors", "/legal/subprocessors"],
    ],
  },
];

/** Pathname of a href (strips query/hash). */
export function hrefPathname(href: string): string {
  return href.split("#")[0]?.split("?")[0] || href;
}

/** Exact path match for a single nav link (query ignored). */
export function isNavLinkActive(pathname: string, href: string): boolean {
  const base = hrefPathname(href);
  if (base === "/") return pathname === "/";
  return pathname === base;
}

/**
 * Section-aware active check for hub routes (e.g. /platform active under /platform/*).
 * Prefer isNavLinkActive for individual mega-menu items.
 */
export function isNavPathActive(pathname: string, href: string): boolean {
  const base = hrefPathname(href);
  if (base === "/") return pathname === "/";
  if (pathname === base) return true;
  if (
    base === "/platform" ||
    base === "/solutions" ||
    base === "/who-we-serve" ||
    base === "/compliance" ||
    base === "/resources" ||
    base === "/about" ||
    base === "/trust"
  ) {
    return pathname.startsWith(`${base}/`);
  }
  return false;
}

/**
 * True when a primary nav item should render as a direct link (no mega / chevron).
 * Honors explicit `direct`, empty children, or a single hub-only child matching href.
 */
export function isDirectNavGroup(group: NavMenuGroup): boolean {
  if (group.direct) return true;
  if (!group.href) return false;
  if (group.children.length === 0) return true;
  if (
    group.children.length === 1 &&
    hrefPathname(group.children[0].href) === hrefPathname(group.href)
  ) {
    return true;
  }
  return false;
}

/** True when any child (or group href) is active — for top-level menu buttons. */
export function isNavGroupActive(pathname: string, group: NavMenuGroup): boolean {
  if (group.href && isNavPathActive(pathname, group.href)) return true;
  if (isDirectNavGroup(group) && group.href) {
    return isNavLinkActive(pathname, group.href);
  }
  return group.children.some((child) => {
    const base = hrefPathname(child.href);
    return pathname === base || pathname.startsWith(`${base}/`);
  });
}
