export const SITE_NAME = "CertaMaris";
export const SITE_TAGLINE = "Maritime Cyber Compliance & Assurance";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://certamaris.com";
export const SITE_DESCRIPTION =
  "Maritime cyber compliance and assurance software for fleet-scale operators. Fleet visibility, control mapping, evidence and findings, audit readiness, and regulatory intelligence for IMO cyber-risk management and IACS UR E26/E27.";

/**
 * INTEGRATION POINTS — CertaMaris application (Lovable-built, TanStack Start)
 * -------------------------------------------------
 * These four URLs are the seams between this marketing site and the
 * authenticated product application. Set the corresponding environment
 * variables to override per-deploy; the fallbacks below point at the
 * application's real routes as of 2026-07-26.
 *
 *   NEXT_PUBLIC_APP_SIGN_IN_URL       -> real route: /auth/login
 *   NEXT_PUBLIC_APP_GET_STARTED_URL   -> primary readiness-call CTA. No
 *                                        self-serve signup route exists in
 *                                        the app (enterprise/sales-assisted
 *                                        product), so this now defaults to
 *                                        this site's own /contact page
 *                                        instead of a dead app.certamaris.com
 *                                        path. Point it at a real self-serve
 *                                        signup route if that ever ships.
 *   NEXT_PUBLIC_APP_SCHEDULING_URL     (optional booking/calendar embed)
 *   NEXT_PUBLIC_APP_SALES_EMAIL        (mailto fallback for Contact Sales)
 */
export const APP_SIGN_IN_URL = process.env.NEXT_PUBLIC_APP_SIGN_IN_URL ?? "https://app.certamaris.com/auth/login";
export const APP_GET_STARTED_URL = process.env.NEXT_PUBLIC_APP_GET_STARTED_URL ?? "/contact";
export const APP_SCHEDULING_URL = process.env.NEXT_PUBLIC_APP_SCHEDULING_URL ?? "";
export const APP_SALES_EMAIL = process.env.NEXT_PUBLIC_APP_SALES_EMAIL ?? "sales@certamaris.com";
export const CONTACT_FORWARD_ENDPOINT = process.env.CONTACT_FORWARD_ENDPOINT ?? "";

/**
 * For static-export deployments (e.g. Netlify without a Node runtime), the
 * built-in /api/contact route isn't available. Set this to a publicly
 * callable endpoint (a hosted function, form backend, or webhook that
 * accepts the same { name, email, company, fleetSize, message } JSON body)
 * and the contact form will POST to it directly from the browser instead
 * of the local API route.
 */
export const NEXT_PUBLIC_CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";
/** Contact is a request form, not a calendar booking, unless APP_SCHEDULING_URL is set. */
export const PRIMARY_CTA_LABEL = "Request a readiness call";
export const SECONDARY_CTA_LABEL = "Explore the platform";

export const REGULATORY_BOUNDARY =
  "CertaMaris supports compliance workflows. It is not legal or regulatory advice, does not replace qualified reviewers, classification societies, flag states, or legal counsel, and does not guarantee audit, survey, or inspection outcomes. Official IMO, IACS, flag-state, and classification-society texts control.";

export const FOOTER_STANDING_LINE =
  "Not legal or regulatory advice. Official sources control. Qualified human review is required for compliance and applicability determinations.";

export const NAV_GROUPS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["Platform", "/platform"],
      ["Solutions", "/solutions"],
      ["Industries", "/industries"],
      ["Compliance", "/compliance"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Resources", "/resources"],
      ["About", "/about"],
      ["Security & Trust", "/security"],
      ["Pricing", "/pricing"],
    ],
  },
];

export const FOOTER_GROUPS: { title: string; links: [string, string][] }[] = [
  {
    title: "Platform",
    links: [
      ["Overview", "/platform"],
      ["Solutions", "/solutions"],
      ["Industries", "/industries"],
      ["Compliance", "/compliance"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Resources", "/resources"],
      ["Security & Trust", "/security"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Contact", "/contact"],
      ["FAQ", "/faq"],
      [PRIMARY_CTA_LABEL, "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Accessibility", "/accessibility"],
    ],
  },
];
