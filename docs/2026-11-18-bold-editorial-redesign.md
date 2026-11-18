# CertaMaris bold editorial redesign - verified production release

Completed: 2026-11-18 19:10 UTC; 2026-11-18 11:10 PST (America/Los_Angeles). Agent: Codex. Model: GPT-6 (system identity; no more specific model identifier exposed).

Status: DEPLOYED AND LIVE-VERIFIED at https://certamaris.com.
Worker certamaris-site: `a8a3251f-4cb3-4cd9-94c8-6cc9833b228a` at 100%, freshly read from Cloudflare deployments.
Implementation commit: `684f038c2cddfaa3ac168ca32890052f1f5bd8f5`; branch `codex/public-redesign-bold-20261118`.
Previous production / rollback version: `3a821759-89d5-4936-8fd4-ad6a1f50281a`.

## Implementation and scope

- Live public-site source: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`. Product monorepo apps/marketing remains the development destination; this release performs no source consolidation or hosting cutover.
- Package extracted at `C:\Users\Skyler B. Brown\Desktop\CertaMaris\redesign-package-20261118`. START_HERE and MASTER_DIRECTIVE read completely; supplied verifier passed all 53 inventory entries. All four PNGs inspected individually.
- Homepage reconstructed as native semantic HTML/CSS in components/EditorialHome.tsx, with the four consecutive compositions. app/editorial.css extends shared typography, containers, navigation, footer, figures and interior hero/document treatment across every public template. Existing page-specific layouts and typed content remain.
- Exact supplied Space Grotesk and Inter WOFF2 bytes loaded with next/font/local. Major headings 700, editorial subheads 600, uppercase Inter labels 700; font-synthesis none. Original branding retained. Supplied vessel artwork has a derived WebP; corrective-action screenshot pixels remain unchanged and locally labeled as demo data.
- Palette: navy #10263B, secondary #526477, accent #1B54DB, lavender #F5F1FC / #F7F4FC, borders #DCE3ED. EditorialMotion supplies two peripheral 20-second opacity animations, pause/resume persistence, and static reduced motion. Product content and photographs remain stationary.
- Pricing math/data, legal text, app sign-in URL and contracts, contact endpoint/anti-abuse controls, demo tools, download paths, metadata/canonicals/structured data, sitemap and redirects preserved. No live contact submission was sent; contact delivery was tested with the existing mocks. No authenticated app, API, database, billing, DNS or secret changes.

## Validation and coverage

- Source inventory: 54 page templates; static build: 111 generated pages; export matrix: 105 HTML entries, including 95 indexable and 10 noindex/utility/redirect/error entries. 95 sitemap entries match indexable routes. Existing route checker passed 103 required routes/assets. Full matrix: `C:\certamaris-startup-site-pnpm\certamaris-startup-site\artifacts\redesign-bold-20261118\route-matrix.csv`.
- `npm run typecheck`: PASS. Final `npm run build:static`: PASS. Existing warnings explain that static export does not apply Next headers/redirects; the existing Worker remains responsible for those.
- `npm run test:pricing`: 12/12. `npm run test:contact`: 9/9. `npm run test:worker`: 6/6. `npm run qa`: 0 failed steps (includes contact/Worker/pricing, product journeys, buyer paths, content, links, SEO and empty-state browser checks). 3,889 internal links resolved in the recorded full QA run.
- `npm run qa:lightbox`: PASS. `npm run qa:responsive-a11y`: 19 routes x 9 viewports, zero reported issues or broken images after fixing compliance-page contrast. Simple static-preview console 404s remain a harness limitation; separately verified through the actual Worker: zero console/page errors and zero failed resource responses on eight routes.
- Browser matrix: 243 observations over all 105 export entries at 1440/390 and representative families at 1920/1024/768; no overflow, broken loaded images or H1-count failures, no page errors. Full-page captures scroll first to load lazy imagery.
- Motion pause/resume, preference persistence, reduced motion, keyboard search, mobile-menu Escape/focus restoration, 200-percent zoom and homepage WCAG AA axe scan: PASS.
- Four 1920x1080 section captures compared individually with the supplied references. Main geometry, ship crop, authentic three-row product crop, genuine heading weights, captions and copy reviewed. Footer uses taller 44px link targets and may extend beyond the reference export height; responsive layouts flow naturally.
- `git diff --check`: PASS. Wrangler dry run: PASS. Deployment: existing `npx wrangler deploy --config wrangler.jsonc --keep-vars`; readback confirms the version at 100%.
- Production: 105 HTML URL checks passed, sitemap/robots 200, www 301 to apex, unknown URL 404; CSP/HSTS present on all 105 checked HTML responses. 32 production browser observations across eight representative destinations and four widths: zero overflow, console or page errors. Four live section screenshots and full homepage saved.

## Evidence and residuals

All logs, baseline screenshots, font proof, local/live browser JSON, source inventory, matrix, deployment readbacks and screenshots: `C:\certamaris-startup-site-pnpm\certamaris-startup-site\artifacts\redesign-bold-20261118`.
No known release-blocking defect remains in the executed checks. No Lighthouse score, authenticated login success, real-email delivery or independent exhaustive human review of every page is claimed.

Preservation incident: the existing `npm run qa` SEO audit regenerated two already-modified files, docs/seo/INTERNAL_LINK_MAP.md and docs/seo/SEO_TECHNICAL_AUDIT.json. Their original hashes were captured in preserved-files.json, but their original uncommitted contents were not backed up and cannot be reconstructed from those hashes. They remain unstaged, along with the regenerated ROUTE_SEO_INVENTORY.json. Do not discard them. Subsequent SEO audits were isolated using SEO_AUDIT_OUTPUT_DIR; no unrelated source changes were staged.

Memory review: 116 discovered text records were read and classified in memory-review.json; the additional docs/project-memory.md was reviewed separately. Historical release evidence remains historical; current records receive dated status reconciliation. Raw runtime logs and unrelated programs require no rewrite. memory-updates.json records exact updated paths. Canonical dirty product implementation and concurrent programs remain intact.

## Rollback

From the public-site source, only when rollback is authorized:
`npx wrangler versions deploy 3a821759-89d5-4936-8fd4-ad6a1f50281a@100% --config wrangler.jsonc -y`
