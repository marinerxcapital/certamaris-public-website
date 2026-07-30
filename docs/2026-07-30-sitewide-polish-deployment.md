# CertaMaris sitewide polish deployment log

Date: 2026-07-30
Source path: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
Scope: Sitewide public marketing polish across routed pages and shared components.

## Summary

- Elevated shared page heroes with a restrained assurance-record signal panel.
- Reworked the desktop navigation into direct route links plus a focused Company menu.
- Removed the product screenshot lightbox system from source and converted product screenshots into static inline proof frames.
- Upgraded shared card, article, persona, process, FAQ, boundary, button, and footer treatments.
- Added premium reading panels for legal and resource article pages.
- Preserved the Pixel Grid background, public-safe copy discipline, existing routes, forms, metadata, and Cloudflare Worker deployment model.

## Validation targets

- `npm.cmd run typecheck` - PASS.
- `npm.cmd run build:static` - PASS.
- `git diff --check` - PASS, with expected Windows line-ending warnings only.
- Local Worker browser QA - PASS across all 20 public routes at desktop, tablet, and mobile widths.
- Reduced-motion check - PASS. The Pixel Grid background is hidden when `prefers-reduced-motion: reduce` is active.
- Mobile drawer interaction - PASS. Drawer opens, Pricing appears once, Contact targets `/contact`, and no horizontal overflow was detected.
- Lightbox removal check - PASS. No `ProductScreenGallery`, `product-lightbox`, `product-screen-trigger`, `Expand`, or `createPortal` references remain in `app/` or `components/`.
- Live deployment verification after push and Wrangler deploy.
