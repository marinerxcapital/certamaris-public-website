/**
 * Expected route inventory for CertaMaris marketing site QA.
 * CURRENT_* must exist after npm run build:static.
 */

export const SITE_ORIGIN_DEFAULT = "https://certamaris.com";
export const PREVIEW_ORIGIN_DEFAULT = "http://127.0.0.1:4173";

export const CURRENT_STATIC_ROUTES = [
  "/",
  "/platform",
  "/platform/corporate-control-plane",
  "/platform/client-company-portal",
  "/platform/fleet-management",
  "/platform/vessel-portal",
  "/platform/assessments",
  "/platform/evidence",
  "/platform/findings-corrective-actions",
  "/platform/cybersecurity-plans",
  "/platform/regulatory-intelligence",
  "/platform/continuous-assurance",
  "/platform/reports-readiness",
  "/platform/integrations",
  "/solutions",
  "/solutions/fleet-cyber-compliance",
  "/solutions/audit-survey-readiness",
  "/solutions/imo-msc-428-98",
  "/solutions/iacs-ur-e26",
  "/solutions/iacs-ur-e27",
  "/solutions/vessel-cyber-risk-management",
  "/solutions/evidence-findings-management",
  "/solutions/corrective-action-verification",
  "/solutions/cybersecurity-plan-management",
  "/solutions/sbom-vulnerability-assurance",
  "/solutions/executive-board-reporting",
  "/solutions/regulatory-change-management",
  "/who-we-serve",
  "/who-we-serve/ship-owners",
  "/who-we-serve/operators",
  "/who-we-serve/technical-managers-dpas",
  "/who-we-serve/maritime-it-ot",
  "/who-we-serve/vessel-masters-officers",
  "/who-we-serve/classification-survey",
  "/who-we-serve/insurers-pi",
  "/who-we-serve/maritime-service-providers",
  "/industries",
  "/compliance",
  "/compliance/imo",
  "/compliance/iacs",
  "/compliance/guidelines",
  "/compliance/update-center",
  "/compliance/official-sources",
  "/compliance/mapping-methodology",
  "/resources",
  "/glossary",
  "/topics",
  "/topics/maritime-cybersecurity-compliance-software",
  "/topics/imo-msc-428-98-compliance",
  "/topics/iacs-ur-e26",
  "/topics/iacs-ur-e27",
  "/topics/maritime-cyber-risk-assessment",
  "/topics/vessel-cybersecurity-plan",
  "/topics/fleet-cyber-risk-management",
  "/topics/ship-cyber-evidence-management",
  "/topics/maritime-corrective-action-software",
  "/topics/maritime-sbom-management",
  "/topics/vessel-ot-cybersecurity",
  "/topics/dpa-cyber-compliance",
  "/topics/vessel-cyber-risk-register",
  "/topics/survey-readiness",
  "/topics/maritime-cyber-regulations",
  "/about",
  "/about/leadership",
  "/about/corporate-information",
  "/about/partners",
  "/about/careers",
  "/about/press",
  "/contact",
  "/security",
  "/trust",
  "/trust/procurement",
  "/trust/subprocessors",
  "/trust/responsible-disclosure",
  "/trust/status",
  "/pricing",
  "/faq",
  "/demo",
  "/sample-platform",
  "/why-certamaris",
  "/implementation",
  "/privacy",
  "/terms",
  "/accessibility",
];

export const CURRENT_RESOURCE_ROUTES = [
  "/resources/imo-msc-428-98-explained",
  "/resources/iacs-ur-e26-e27-overview",
  "/resources/evidence-sufficiency-cyber-compliance",
  "/resources/corrective-action-verification",
  "/resources/fleet-scale-cyber-governance",
  "/resources/reading-a-cyber-risk-register",
  "/resources/maritime-cyber-risk-assessment-checklist",
  "/resources/survey-readiness-package-guide",
];

export const CURRENT_ASSET_ROUTES = [
  "/robots.txt",
  "/sitemap.xml",
  "/og/certamaris-og.jpg",
  "/brand/certamaris-full.png",
];

/** All planned IA is now current after full remediation. */
export const PLANNED_ROUTES = [];

export function getRequiredRoutes() {
  return [...CURRENT_STATIC_ROUTES, ...CURRENT_RESOURCE_ROUTES];
}

export function getFullIaRoutes() {
  return [...getRequiredRoutes(), ...PLANNED_ROUTES];
}

export function pathnameToOutCandidates(pathname) {
  const p = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  if (!p) {
    return ["index.html", "index.txt"];
  }
  if (/\.[a-z0-9]+$/i.test(p)) {
    return [p.replace(/^\//, "")];
  }
  const rel = p.replace(/^\//, "");
  return [`${rel}.html`, `${rel}/index.html`, `${rel}.txt`];
}
