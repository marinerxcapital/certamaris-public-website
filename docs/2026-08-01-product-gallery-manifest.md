# CertaMaris product gallery asset manifest

Date: 2026-08-01

## Source and review

The replacement visuals come from the user-approved July 24, 2026 dashboard export:

`00_CONTROL/reports/certamaris-ui-screenshots-2026-07-24_23-23-58/screenshots`

Manifest generated: `2026-07-24T23:36:55`  
Source product commit: `558236b3b81e35a6401a8eb365c98be9692478f1`

The selected captures are public-facing product proof screens. Internal authentication, billing, administration, operational, and clearly private-only routes were excluded from the marketing registry. Copy and descriptions are claim-safe and do not assert certification, audit, or customer outcomes.

## Old-to-new mapping

| Product proof slot | Previous marketing asset | Approved export | New asset |
| --- | --- | --- | --- |
| Requirement mapping | `public/product/clean/requirement-control-mapping.png` | `115_app_regulatory_mappings.png` | `public/product/updated/requirement-mapping.png` |
| Evidence coverage | `public/product/clean/evidence-coverage.png` | `023_app_assurance_coverage.png` | `public/product/updated/evidence-coverage.png` |
| Findings register | `public/product/clean/findings-register.png` | `076_app_findings_cm_2026_014.png` | `public/product/updated/findings-register.png` |
| Corrective actions | `public/product/clean/corrective-actions.png` | `051_app_corrective_actions.png` | `public/product/updated/corrective-actions.png` |
| Audit readiness | `public/product/clean/audit-readiness.png` | `121_app_reports_deliverables.png` | `public/product/updated/audit-readiness.png` |
| Executive reporting | `public/product/clean/governance-reporting.png` | `150_client_executive.png` | `public/product/updated/executive-readiness.png` |
| Fleet inventory | `public/product/clean/fleet-inventory.png` | `064_app_engagements_eg_2026_014_inventory_fleet_facilities.png` | `public/product/updated/fleet-inventory.png` |
| Cybersecurity plans | — | `055_app_cybersecurity_plans_csp_2026_014.png` | `public/product/updated/cybersecurity-plans.png` |

Each source is preserved at its original 1440px width. WebP derivatives are generated at 384px, 640px, 960px, and 1440px under `public/product/updated/optimized/`; no source is upscaled.

## Gallery behavior

`components/ProductScreens.tsx` now provides the shared gallery for every `ProductScreenFrame` and `ProductScreenTile` consumer. A frame is a real button with an Expand affordance. The dialog loads the full-resolution source on demand, supports previous/next controls, thumbnails, counters, Escape and arrow-key navigation, backdrop close, focus trapping/restoration, scroll locking without scrollbar layout shift, reduced-motion-safe CSS transitions, and accessible title/description/annotation content.

## Validation

- `npm run typecheck` — pass
- `npm run build:static` — pass (99 generated routes)
- `npm run qa` — pass (0 failed steps)
- Static source scan — no `/product/clean` or legacy `/product/optimized` references outside legacy asset folders
- Browser smoke test at 1280px — updated images render, no horizontal overflow, dialog semantics and full-resolution source verified, next navigation verified, Escape close and trigger focus restoration verified, zero console errors
