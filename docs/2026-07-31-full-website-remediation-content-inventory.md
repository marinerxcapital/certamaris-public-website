# CertaMaris.com — Full Website Remediation Content Inventory

**Date:** 2026-07-31  
**SoT:** `C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
**Branch (work):** `supergrok/website-full-remediation`  
**Pre-work tip:** `636dbf7` on `main`  
**Status:** BASELINE inventory from pre-integration tree — **orchestrator / content agents finalize** after page CRUD lands  
**Signed:** SuperGrok SUBAGENT 8 (Docs)

> Use this as the living route + content map. Mark each row **KEEP / UPDATE / ADD / REDIRECT / REMOVE** during integration. Do not invent legal claims, certifications, customers, or prices when filling status.

---

## 1. Navigation (baseline)

### Primary nav (`components/Nav.tsx`)

| Label | Path | Baseline status | Post-remediation status |
|---|---|---|---|
| Platform | `/platform` | KEEP | `TBD` |
| Solutions | `/solutions` | KEEP | `TBD` |
| Industries | `/industries` | KEEP (may become redirect → who-we-serve) | `TBD` |
| Compliance | `/compliance` | KEEP | `TBD` |
| Resources | `/resources` | KEEP | `TBD` |

### Company menu

| Label | Path | Baseline status | Post-remediation status |
|---|---|---|---|
| About | `/about` | KEEP | `TBD` |
| Security & Trust | `/security` | KEEP | `TBD` |
| Pricing | `/pricing` | KEEP | `TBD` |
| FAQ | `/faq` | KEEP | `TBD` |

### CTAs

| Control | Target | Notes |
|---|---|---|
| Sign in | `https://app.certamaris.com/auth/login` | Override: `NEXT_PUBLIC_APP_SIGN_IN_URL` |
| Get started / primary CTA | `/contact` (default) | Label: “Request a readiness call” |
| Secondary | Explore platform → `/platform` | Via copy/CTA patterns |

### Footer groups (`lib/constants.ts` `FOOTER_GROUPS`)

Platform · Company · Support · Legal — see constants for full link set.

**Post-remediation nav notes (Agent 2 fills):**

- Breadcrumbs: `TBD`
- CTA band: `TBD`
- Mobile sheet parity: `TBD`

---

## 2. Redirects (Worker + planned)

| From | To | Type | Owner | Status |
|---|---|---|---|---|
| `www.certamaris.com/*` | `certamaris.com/*` | 301 | `worker/index.ts` | **LIVE** |
| `/industries` (if retired) | `TBD` e.g. `/who-we-serve` | 301 planned | Agent 3 + Worker | `TBD` |
| `/sample-platform` | `TBD` | redirect or page | Agent 6 | `TBD` |
| Future `/login` `/signup` `/app` `/dashboard` on marketing host | App host | Do **not** implement without owner GO | — | **OUT OF SCOPE** unless directed |

---

## 3. Static public routes (baseline sitemap)

Source: `app/sitemap.ts` + `app/**/page.tsx`.

| Path | Page file | Primary content SoT | Purpose | Remediation action | Owner agent | Done |
|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | homepage components + `lib/content.ts` | Home / product showcase | UPDATE | 2 / 3 | `TBD` |
| `/platform` | `app/platform/page.tsx` | platform + product screens | Product overview | UPDATE | 3 | `TBD` |
| `/solutions` | `app/solutions/page.tsx` | `lib/solutions-industries.ts` | Solution deep anchors | UPDATE | 3 | `TBD` |
| `/industries` | `app/industries/page.tsx` | `lib/solutions-industries.ts` | Audience industries | UPDATE or REDIRECT | 3 | `TBD` |
| `/compliance` | `app/compliance/page.tsx` | compliance copy + BoundaryPanel | Regulatory overview | UPDATE | 5 | `TBD` |
| `/resources` | `app/resources/page.tsx` | `lib/resources.ts` | Article index | UPDATE | 5 | `TBD` |
| `/about` | `app/about/page.tsx` | about copy | Company | UPDATE | 4 | `TBD` |
| `/contact` | `app/contact/page.tsx` | `ContactForm` | Conversion | UPDATE | 6 | `TBD` |
| `/security` | `app/security/page.tsx` | `lib/security-trust.ts` | Trust controls | UPDATE | 4 | `TBD` |
| `/pricing` | `app/pricing/page.tsx` | pricing qualification | Commercial path | UPDATE | 6 | `TBD` |
| `/faq` | `app/faq/page.tsx` | FAQ content | Support | UPDATE | 6 | `TBD` |
| `/privacy` | `app/privacy/page.tsx` | legal panel | Privacy | UPDATE + OWNER_VERIFY | 4 | `TBD` |
| `/terms` | `app/terms/page.tsx` | legal panel | Terms | UPDATE + OWNER_VERIFY | 4 | `TBD` |
| `/accessibility` | `app/accessibility/page.tsx` | a11y statement | Accessibility | UPDATE | 4 / 7 | `TBD` |

### Resource articles (dynamic)

| Path | Slug | Topic (baseline) | Action | Done |
|---|---|---|---|---|
| `/resources/imo-msc-428-98-explained` | `imo-msc-428-98-explained` | Regulatory intelligence | KEEP/UPDATE | `TBD` |
| `/resources/iacs-ur-e26-e27-overview` | `iacs-ur-e26-e27-overview` | Regulatory intelligence | KEEP/UPDATE | `TBD` |
| `/resources/evidence-sufficiency-cyber-compliance` | `evidence-sufficiency-cyber-compliance` | Evidence & findings | KEEP/UPDATE | `TBD` |
| `/resources/corrective-action-verification` | `corrective-action-verification` | Evidence & findings | KEEP/UPDATE | `TBD` |
| `/resources/fleet-scale-cyber-governance` | `fleet-scale-cyber-governance` | Governance | KEEP/UPDATE | `TBD` |
| `/resources/reading-a-cyber-risk-register` | `reading-a-cyber-risk-register` | Risk | KEEP/UPDATE | `TBD` |

### System routes

| Path | Notes |
|---|---|
| `/robots.txt` | `app/robots.ts` |
| `/sitemap.xml` | `app/sitemap.ts` — must list all public routes post-CRUD |
| Custom 404 | `app/not-found.tsx` → static 404 page |

---

## 4. Planned / remediation-target routes (from execution ledger)

Mark **ADD** only when page actually ships. Do not claim live until deploy smoke.

| Path | Intent | Agent | Status |
|---|---|---|---|
| `/who-we-serve` | Audience hierarchy (may replace industries) | 3 | `TBD` |
| `/why-certamaris` | Differentiation | 3 | `TBD` |
| `/implementation` | Delivery / onboarding story | 3 | `TBD` |
| `/trust` | Trust center hub | 4 | `TBD` |
| `/demo` | Demo request path | 6 | `TBD` |
| `/sample-platform` | Sample / preview CTA | 6 | `TBD` |
| `/glossary` | Regulatory glossary | 5 | `TBD` |
| High-intent landings | SEO landings | 5 | `TBD` |
| Procurement / subprocessors / disclosure / status | Trust pack | 4 | `TBD` |

---

## 5. Product hierarchy (baseline content modules)

### Solutions (`lib/solutions-industries.ts` → `solutions`)

| ID | Title | Action |
|---|---|---|
| `fleet-compliance` | Fleet Compliance Management | `TBD` |
| `audit-readiness` | Audit & Survey Readiness | `TBD` |
| `evidence-findings` | Evidence & Findings Management | `TBD` |
| `regulatory-intelligence` | Regulatory Intelligence | `TBD` |
| `executive-reporting` | Executive & Board Reporting | `TBD` |

### Industries / audiences (`industries`)

| ID | Title | Action |
|---|---|---|
| `owners-operators` | Ship Owners & Operators | `TBD` |
| `technical-managers` | Technical Managers & DPAs | `TBD` |
| `cyber-it-ot` | Cybersecurity & IT/OT Teams | `TBD` |
| `class-surveyors` | Classification Societies & Surveyors | `TBD` |
| `pi-insurers` | P&I Clubs & Insurers | `TBD` |

### Product screens / proof assets

| Area | Path | Governance |
|---|---|---|
| Product PNGs/WebPs | `public/product/**` | `docs/product-screenshot-governance.md` |
| Brand | `public/brand/**` | Preserve lockups |
| OG | `public/og/certamaris-og.jpg` | Keep dimensions 1200×630 |

**Post-remediation product hierarchy file(s):** `lib/product-hierarchy.ts` (Agent 3) — fill when created.

---

## 6. Claims discipline

| Claim type | Rule | Baseline location |
|---|---|---|
| Customers / logos | **Do not invent** | — |
| Pricing figures | Qualification path only; no fake list | `/pricing` |
| SOC 2 / ISO 27001 | **not_claimed** | `lib/security-trust.ts` |
| Uptime / SLAs | Not claimed on marketing site | — |
| Regulatory advice | Boundary language required | `REGULATORY_BOUNDARY`, `BoundaryPanel` |
| Outcomes | No guaranteed audit/survey/cert outcomes | Terms §3, compliance pages |
| Leadership names | Owner-supplied only | `/about` |
| Legal entity / address / law / venue | Commercial docs or owner text — not invented | `/privacy`, `/terms` |

Voice guide: `docs/content-voice-guide.md`.

---

## 7. OWNER_VERIFY legal items

Owner must supply or explicitly waive before treating legal pages as “complete commercial legal.”

| Item | Pages | Baseline handling | Owner status |
|---|---|---|---|
| Registered legal entity name | privacy, terms, about | Deferred to signed commercial docs | `OWNER_VERIFY` |
| Registered address | privacy, terms | Not published as placeholder | `OWNER_VERIFY` |
| Governing law / venue | terms | Deferred to customer agreement | `OWNER_VERIFY` |
| Privacy contact | privacy | `privacy@certamaris.com` | Confirm |
| Legal contact | terms | `legal@certamaris.com` | Confirm |
| Security contact | security | `security@certamaris.com` (constants) | Confirm |
| Sales contact | contact | `sales@certamaris.com` | Confirm |
| Analytics provider name | privacy §4 | Named only if enabled | `OWNER_VERIFY` when wiring |
| Subprocessor public list | security / trust | On request; not public list | `OWNER_VERIFY` if publishing |
| Formal certifications | security | **not_claimed** until real | `OWNER_VERIFY` |

---

## 8. Security claims inventory (`lib/security-trust.ts`)

| ID | Title | Status | Last verified |
|---|---|---|---|
| `tenant-isolation` | Tenant isolation | current | 2026-07-30 |
| `rbac` | Role-based access control | current | 2026-07-30 |
| `tls` | Encryption in transit | current | 2026-07-30 |
| `encryption-at-rest` | Encryption at rest | current | 2026-07-30 |
| `audit-history` | Audit history | current | 2026-07-30 |
| `environment-separation` | Environment separation | current | 2026-07-30 |
| `incident-response` | Incident response process | current | 2026-07-30 |
| `sso-scim` | SSO and SCIM | configurable | 2026-07-30 |
| `data-retention` | Data retention configuration | configurable | 2026-07-30 |
| `subprocessor-transparency` | Subprocessor transparency | configurable | 2026-07-30 |
| `third-party-certification` | Formal third-party certification | **not_claimed** | 2026-07-30 |

Review date constant: `SECURITY_TRUST_LAST_REVIEWED = 2026-07-30` — update when claims re-verified.

---

## 9. SEO map

| Asset | Path / behavior | Post-remediation |
|---|---|---|
| Canonical base | `SITE_URL` → `https://certamaris.com` | Keep |
| Per-page metadata | `lib/metadata.ts` `pageMetadata()` | Extend for new routes |
| Sitemap | `app/sitemap.ts` | Add new routes + articles |
| Robots | `app/robots.ts` | Confirm allow/disallow |
| OG image | `/og/certamaris-og.jpg` | Keep or refresh |
| Title template | `%s — CertaMaris` | Keep |

### Target keyword themes (Agent 5 finalizes)

| Theme | Example landing | Status |
|---|---|---|
| Maritime cyber compliance | `/`, `/platform`, `/compliance` | baseline |
| IMO MSC.428(98) | resource article | baseline |
| IACS UR E26 / E27 | resource article | baseline |
| Fleet evidence / findings | solutions + resources | baseline |
| High-intent landings | `TBD` | planned |

---

## 10. Schema / structured data

| Schema | Location | Notes |
|---|---|---|
| Organization JSON-LD | `app/layout.tsx` | name, url, description, logo |
| FAQ schema | FAQ page (if present post-remediation) | Agent 5/6 |
| Article schema | resource articles | Agent 5 |
| BreadcrumbList | planned via breadcrumbs component | Agent 2/5 |
| New `lib/seo-schema.ts` | planned | Agent 5 |

---

## 11. Analytics

| Item | Baseline | Post-remediation |
|---|---|---|
| Analytics SDK | **None** pre-installed | Add only deliberately |
| Privacy disclosure | Generic until provider named | Update `/privacy` when wiring |
| Cloudflare insights | Allowed in CSP report-only | Confirm if enabled at edge |

---

## 12. Forms

| Form | Component / handler | Fields (baseline) | Delivery |
|---|---|---|---|
| Contact / readiness | `components/ContactForm.tsx` | name, email, company, fleetSize, primaryNeed, timing, message; optional role, securityPackageIntent | Worker `POST /api/contact` → optional `CONTACT_FORWARD_ENDPOINT` |
| Node path (non-static) | `app/api/contact/route.ts` | Same family | Only when not static-export |
| Static browser fallback | `NEXT_PUBLIC_CONTACT_ENDPOINT` | Same JSON body | Client POST |

**Never document secret endpoint URLs.**

---

## 13. Accessibility

| Item | Baseline | Owner |
|---|---|---|
| Skip / main landmark | `main#main-content` | layout |
| Mobile sheet focus trap + Escape | `Nav.tsx` | Agent 2/7 |
| `prefers-reduced-motion` | `lib/use-prefers-reduced-motion.ts`; Pixel Grid hidden | Agent 7 |
| Contrast / legal panels | professional panels | Agent 7 |
| Accessibility page | `/accessibility` | Agent 4/7 |
| Automated a11y scripts | `scripts/qa/**` (Agent 7) | `TBD` |

---

## 14. Performance

| Item | Notes |
|---|---|
| Static export | `npm run build:static` → `./out` |
| Cache | Worker: HTML revalidate; `/_next/static` immutable; brand/product/og 1 week |
| Background | Single Pixel Grid runtime (aidesigner CDN) |
| Lighthouse artifacts | `artifacts/lighthouse/**` (historical) |
| Perf budgets / new reports | Agent 7 fills |

---

## 15. Tests & QA

| Layer | Command / asset | Status |
|---|---|---|
| Typecheck | `npm run typecheck` | required pre-deploy |
| Static build | `npm run build:static` | required |
| CI validate | `npm run ci:validate` / GHA validate job | required |
| Visual crawl screenshots | `qa-screenshots/**` | historical baseline |
| New QA scripts | Agent 7 | `TBD` |
| Live route crawl | orchestrator post-deploy | `TBD` |

---

## 16. Deployment IDs

| Field | Value |
|---|---|
| Pre-work git tip | `636dbf7` |
| Post-remediation git tip | `TBD` |
| Worker name | `certamaris-site` |
| Pre-deploy Worker version | `TBD` |
| Post-deploy Worker version | `TBD` |
| CI run URL | `TBD` |
| Deploy path | `TBD` |

---

## 17. Limitations (honest)

- Marketing site is **public information + lead capture**, not the product runtime.
- Contact delivery depends on Worker secret configuration; unconfigured → honest 503 / email fallback.
- Legal entity / jurisdiction details intentionally deferred to commercial agreements unless owner publishes them.
- Formal third-party certifications are **not claimed**.
- Monorepo `apps/marketing` is **not** production SoT for this remediation.
- Static export means API routes live only on the Worker (or external contact endpoint).

---

## 18. Maintenance

| Cadence | Action |
|---|---|
| After every content PR | Update this inventory + sitemap |
| After claim changes | Bump `last_verified` on security controls |
| After legal owner input | Replace OWNER_VERIFY rows; never invent |
| After deploy | Fill deployment IDs; re-smoke routes |
| Quarterly | Re-read voice guide + regulatory boundary language |

---

**Finalize checklist (orchestrator):**

- [ ] All ADD routes exist in `app/` and sitemap  
- [ ] Redirects implemented in Worker if paths retired  
- [ ] Claims re-reviewed  
- [ ] OWNER_VERIFY rows updated with owner answers or explicit defer  
- [ ] Deploy IDs filled  
- [ ] Hub handoff linked and MEMORY updated to COMPLETE when live  

**Signed:** SuperGrok SUBAGENT 8 (Docs) · baseline inventory · 2026-07-31
