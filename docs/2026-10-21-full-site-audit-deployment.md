# Full-site audit, target-size remediation, and OG branding deploy — 2026-10-21

## Source

- Repository: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
- Remote: `marinerxcapital/certamaris-public-website`
- Branch: `codex/assurance-helix-hero-20260926`
- HEAD at start: `c028095` (2 commits ahead of live `27fe0ca`)
- HEAD at end: `99fd3a7`

## Audit outcome

The supplied directive described a broad responsive rebuild. The live site and
this branch already carried 22 committed remediation commits (IA remediation
2026-09-27, pixel-grid restore 2026-09-26, hero video 2026-10-10). Running the
repository's own gates confirmed the site is already heavily remediated:

| Gate | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run build:static` | PASS (111 routes) |
| `npm run qa` (core suite) | PASS, 0 failed steps (105 pages; 4487 internal links resolved) |
| `npm run qa:responsive-a11y` | PASS (16 routes x 9 viewports; 0 axe, 0 overflow, 0 broken images) |
| `npm run qa:ux-audit` | PASS (21 routes, 5 feature captures, 0 failures) |

Two genuine defects were identified and fixed.

## Change 1 — Open Graph social-preview branding

Live still served `og:image = /og/certamaris-og.jpg`; the branch already had
commit `c028095` updating it to the versioned 1200x630
`/og/certamaris-link-preview-2026-10-v1.png`.

Deployed HEAD. New version `6646297d-3d53-4b79-befd-e2e754703365`.
Live readback: `og:image` and `twitter:image` now the versioned PNG;
`twitter:card=summary_large_image`; canonical apex preserved.

## Change 2 — WCAG 2.5.8 target size on nav and footer

The existing axe gates do not enable the target-size rule, so the directive's
sub-44px finding was not caught by them. Direct browser measurement reproduced
it: the desktop header rendered logo at 23px and nav/search/sign-in at 36-37px.

Root-cause fix in shared components (commit `99fd3a7`):

- `components/Nav.tsx` — `min-h-11` on top-level nav links/buttons, mega
  dropdown links, mobile sub-links, the logo link, Sign in, and the primary CTA.
- `components/Footer.tsx` — `min-h-11` on footer group links and the sitemap link.
- `app/globals.css` — `min-height: 44px` on `.palette-trigger`.

Result (live readback): header controls `0/9` under 44px at 1440x900 and `0/2`
at 390x844 (was 8/9). Deployed version `645e711a-a23a-4423-8c20-d6e8c093a509`.

## Residuals

- 5 expected SEO duplicate-H1/title warnings on legacy alias routes
  (`/privacy`, `/terms`, `/trust/subprocessors`) and the not-found pages.
- `npm audit --omit=dev --audit-level=high` red on 4 pre-existing advisories in
  pinned Next/sharp/toolchain versions; no dependencies changed.
- Static-harness console entries (335) are the documented Next static-export
  RSC-prefetch 404 artifact; production Chrome reports zero console errors.
- Remaining <44px body-content items are inline text links (WCAG 2.5.8 inline
  exemption) and small 32-39px widgets above the AA 24px floor; full 44px
  body-wide remediation is a larger cross-component follow-up.

## Rollback

- To `7a735921-c1e0-4245-8ad4-217c34704933` (IA remediation baseline, pre hero
  video): `npx wrangler versions deploy 7a735921-c1e0-4245-8ad4-217c34704933@100% --config wrangler.jsonc -y`
- To `6646297d-3d53-4b79-befd-e2e754703365` (OG branding, pre target-size):
  `npx wrangler versions deploy 6646297d-3d53-4b79-befd-e2e754703365@100% --config wrangler.jsonc -y`

See `docs/DEFECT_REGISTER.json` (machine-readable) and `docs/ROUTE_INVENTORY.md`.
