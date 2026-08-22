# 2026-08-22 Conversion, Trust, and Visual UX Upgrade

## Status

Implementation branch: `codex/conversion-trust-ux-20260822`

Final production status will be updated after the PR is merged, GitHub Actions deploys `main`, and live production verification is complete.

## Problem

Qualified maritime buyers had the truthful product proof, pricing, trust, legal, AI/data, and procurement material on the site, but the paths were fragmented. The homepage made the demo clear, yet did not expose a compact buyer path above the fold. Pricing and Trust had the right facts but required more scanning before a procurement/security reviewer could collect diligence material. The mobile menu screenshot also showed the page background bleeding through the drawer enough to reduce readability.

## Root Cause

The site had strong individual pages, but no reusable buyer-diligence entry point tying together product proof, pricing, procurement, assurance model, Trust Center, AI/data policy, legal status, and contact. The mobile drawer intentionally used a highly translucent Liquid Glass surface; on the Pixel Grid hero this allowed background text to show through the sheet.

## Implementation

Files changed:

- `components/BuyerDiligencePacket.tsx`
- `components/HomeHero.tsx`
- `components/PersonaEntry.tsx`
- `components/PageHero.tsx`
- `app/page.tsx`
- `app/pricing/page.tsx`
- `app/trust/page.tsx`
- `app/contact/page.tsx`
- `app/globals.css`
- `scripts/qa/check-buyer-paths.mjs`
- `scripts/qa/run-all.mjs`
- `package.json`

Buyer journey changes:

- Added a reusable Buyer Diligence packet linking `/pricing`, `/trust`, `/trust/assurance-model`, `/trust/procurement`, `/trust/ai-policy`, `/legal/privacy`, and the procurement/demo contact intents.
- Added above-fold homepage buyer path links for proof inspection, package comparison, and diligence.
- Added the diligence packet to Home, Pricing, Trust, and Contact.
- Added a compact Pricing hero aside for package comparison, procurement packet review, and procurement request start.
- Shortened shared page-hero vertical spacing so page-specific content reaches the first viewport sooner.
- Added persona-picker helper copy for unselected visitors.
- Increased mobile navigation drawer opacity, backdrop blur, and shadow so the mobile menu is readable over the Pixel Grid hero.

Preserved:

- Existing Open Graph/Twitter metadata and `/og/certamaris-link-preview-2026-08-v2.png`.
- Regulatory boundary/no-certification language.
- Contact fallback behavior and no-delivery-guarantee posture.
- Existing CertaMaris brand system, Pixel Grid, Liquid Glass materials, and product proof assets.

## Screenshot Evidence

Baseline production screenshots:

- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/01-home-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/02-mega-nav-product-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/03-platform-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/04-demo-scrub-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/05-pricing-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/06-trust-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/07-legal-privacy-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/08-404-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/09-contact-idle-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/10-contact-validation-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/11-contact-delivery-failure-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/12-home-mobile.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/13-mobile-menu.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/baseline/14-contact-mobile.png`

Post-change local screenshots:

- `docs/implementation/conversion-trust-ux-20260822/screenshots/after-local/01-home-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/after-local/02-pricing-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/after-local/03-trust-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/after-local/04-contact-desktop.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/after-local/05-home-mobile.png`
- `docs/implementation/conversion-trust-ux-20260822/screenshots/after-local/06-mobile-menu.png`

## Local Validation

Commands run:

```bash
npm run typecheck
npm run build:static
npm run build
npm run qa
npm run qa:responsive-a11y
npm run qa:link-preview
npm run qa:buyer-paths
```

Results:

- `npm run typecheck`: pass.
- `npm run build:static`: pass, 107 generated pages; existing Next static-export header warning only.
- `npm run build`: pass, 107 generated pages; existing custom Cache-Control warning only.
- `npm run qa`: pass, 0 failed steps. Existing SEO warnings only for expected duplicate status pages.
- `npm run qa:responsive-a11y`: pass, 12 routes x 4 viewports, `issues=0`, `brokenImages=0`.
- `npm run qa:link-preview`: pass, one `og:image`, one `twitter:image`, versioned preview path preserved.
- `npm run qa:buyer-paths`: pass, 26 assertions.

## Deployment

Pending until PR merge to `main`.

## Production Verification

Pending until production deployment completes.

## Residual Risks

- Contact delivery remains intentionally fail-closed until Worker forwarding secrets are configured by the owner.
- Third-party preview/cache services can retain their own cached cards independently, but this pass did not change the already-correct production social-preview metadata.
