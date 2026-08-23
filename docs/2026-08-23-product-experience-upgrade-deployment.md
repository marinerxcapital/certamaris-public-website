# 2026-08-23 Product Experience Upgrade Deployment

Status: **production verified** on `https://certamaris.com`.

## Source and deployment

| Item | Value |
|---|---|
| Repository | `marinerxcapital/certamaris-public-website` |
| Branch | `main` |
| Product commit | `dfb009f526eb1a3d7e42be050a796230603bb5d1` |
| Pricing keyboard-access closeout | `0084f5135328645b50cb0d911dca877358c83a94` |
| CI validation commit | `da501d5d92142d0a28ae49d849756cc7f9697f1b` |
| Documentation sync commit | `ed632bbe112b3ba4f2efc4044806d9f0f5275a92` |
| Product GitHub Actions run | `32627169675` |
| Documentation sync GitHub Actions run | `32627693133` |
| Documentation sync validate job | `97165485674` |
| Documentation sync deploy job | `97165581354` |
| Accessibility closeout GitHub Actions run | `32628481367` |
| Accessibility closeout validate job | `97167459683` |
| Accessibility closeout deploy job | `97167550885` |
| Cloudflare Worker | `certamaris-site` |
| Cloudflare deployment readback | Verified by `wrangler deployments list`; exact Worker version changes with documentation-only deploys |
| Production domain | `https://certamaris.com` |

## Product experience shipped

- Homepage interactive `REQ -> APP -> CTL -> ASM -> EVD -> FND -> RSK -> CAP -> QA -> PKG` lifecycle teaser with hover, focus, click, touch, and `/demo#chain-inspector` CTA.
- `/demo` chain-of-custody inspector using the approved `lib/sample-record.ts` fixture, with sample-data labeling and selectable requirement-to-package lineage.
- `/pricing` calculator v2 using canonical `lib/pricing-calculator.ts` logic for total fleet, contracted vessels, optional remote QA-reviewed reports at `$6,000 / contracted vessel`, optional on-board assessments at `$15,000 / contracted vessel`, travel exclusion, non-binding estimate language, and shareable query state.
- Role-specific "Your path through the record" modules across `/who-we-serve/*`, with tailored DPA, owner/fleet leadership, IT/OT, vessel, reviewer, insurer, and service-provider paths into relevant demo state.
- `/platform/evidence` simulator v2 with selectable evidence rows, freshness state, reviewer disposition, finding creation, corrective action linkage, resolved/reset state, and explicit sample/demo boundaries.
- Route-specific Open Graph/Twitter preview PNGs for `/pricing`, `/security`, `/demo`, `/platform/evidence`, and `/resources`.
- `/pricing` package-comparison table is keyboard reachable as a named focusable region for horizontal table navigation.
- Trust-labeling and claims cleanup preserved the site's implemented/planned/not-claimed discipline and avoided invented customer, certification, regulatory, integration, AI, telemetry, or guarantee claims.
- QA expanded to include pricing unit tests, product-experience browser journeys, and responsive/axe coverage at `320`, `360`, `375`, `390`, `430`, `768`, `1024`, `1280`, and `1440` widths.

## Validation

| Gate | Result |
|---|---|
| `npm run ci:validate` | Pass: audit `0 vulnerabilities`, typecheck pass, 12 pricing tests pass, static export build pass |
| `npm run qa` | Pass: pricing, contact/Worker, content, product-proof, product-experience, buyer/excellence, routes, SEO, link preview, links, founder |
| `npm run qa:responsive-a11y` | Pass: 16 routes x 9 viewports, `issues=0`, `brokenImages=0` |
| OG assets | Pass: five route-specific PNGs verified at `1200x630` |
| Claims sweep | Pass: no generic hype phrases found; trust/future claims remained bounded |
| Secrets sweep | Pass: no secret values found in changed source |

Notes:

- The legacy `node scripts/qa/audit-crawl.mjs after-product-experience --no-shots` did not complete under the local terminal runtime and timed out after ten minutes. The release was covered by the green static route/SEO/link checks, expanded responsive/axe sweep, focused browser journeys, live sitemap crawl, live image checks, and live serious/critical axe sweep.
- Existing static-export warnings about Next.js custom headers/rewrites remain unchanged.
- Node's direct TypeScript test runner emits `MODULE_TYPELESS_PACKAGE_JSON` warnings; tests pass and no package-type migration was made.

## Live verification

Production checks on `https://certamaris.com` after deployment:

| Check | Result |
|---|---|
| Apex and changed routes | 200 for `/`, `/pricing`, `/demo`, `/platform/evidence`, `/resources`, `/security`, `/who-we-serve/maritime-it-ot`, `/sitemap.xml`, `/robots.txt` |
| Live sitemap crawl | Pass: 93 sitemap URLs returned non-error HTTP responses |
| Live product journeys | Pass: homepage lifecycle to demo, chain inspector query state, pricing shared estimate, persona CTA, evidence simulator lifecycle |
| Live OG metadata | Pass: route-specific `og:image` and `twitter:image` for required routes; image URLs returned PNG |
| Live screenshots | Captured under ignored `audit/live-product-experience-20260823/` for desktop and mobile changed routes |
| Live image checks | Pass: changed routes had no broken `<img>` assets |
| Live overflow | Pass: changed desktop/mobile routes had no horizontal overflow |
| Live Axe | Pass: no serious/critical Axe violations on changed production routes |

## Known limitations

- Contact delivery remains fail-closed until the owner configures Worker forwarding secrets; this release did not change contact delivery.
- Route-specific OG coverage was added for the required product routes; the default root preview remains `/og/certamaris-link-preview-2026-08-v2.png`.
- Evidence freshness thresholds are intentionally simple sample states (`Current`, `Review due`, `Stale`) and do not claim regulatory freshness windows.
