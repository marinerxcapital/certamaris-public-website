# CertaMaris Public Website Sitewide Professionalism Upgrade

Date started: 2026-08-23 21:39 America/Los_Angeles  
Deployment date: 2026-08-24 05:43 UTC  
Branch: `codex/sitewide-professionalism-upgrade-20260824`  
Production repo: `marinerxcapital/certamaris-public-website`  
Production Worker: `certamaris-site`  
Live domain: `https://certamaris.com`

## Problem Statement

The owner assessed the full public site as not professional enough. The issue was sitewide rather than isolated to one page: the content, proof assets, pricing, legal pages, and buyer paths were present, but the shared visual system made too many routes feel decorative, dense, or prototype-like.

## Audit Findings

- Homepage, platform, demo, pricing, trust, procurement, contact, solutions, who-we-serve, resources, legal, and 404 screenshots were captured before edits.
- The most repeated issue was not missing content; it was the shared chrome: high-opacity Pixel Grid, carded page-hero copy, rounded Liquid Glass panels, oversized headings/buttons, and repeated pale-card density.
- Product proof assets remained valid and client-facing after the prior internal-admin cleanup, so the pass focused on improving framing rather than replacing proof.
- Open Graph metadata remained correct before editing and was preserved.
- Contact fallback behavior remained truthful and was preserved.

## Implementation

- Calmed global page and section surfaces.
- Reduced Pixel Grid opacity from the prior high-visibility treatment to a lower-noise sitewide background.
- Tightened Liquid Glass into an 8px-radius professional material with flatter backgrounds and subtler shadows.
- Changed `PageHero` from card-contained hero copy to unframed primary copy with a restrained vertical accent.
- Reduced page-hero height and homepage hero height.
- Tightened button sizing and removed excessive button shadow.
- Removed negative letter spacing from global and hard-coded route headings.
- Preserved all buyer/product/legal truth boundaries, including the current OG image path and internal-admin exclusion.

## Screenshot Evidence

Baseline screenshots are in `screenshots/baseline/`.

After screenshots are in `screenshots/after/`.

Production screenshots are in `screenshots/production/`.

## Local Validation

Passed:

- `npm run typecheck`
- `npm run build:static`
- `npm run build`
- `npm run qa`
- `npm run qa:responsive-a11y`
- `npm run qa:link-preview`
- `npm run qa:buyer-paths`
- `npm run qa:excellence`
- `npm run qa:public-product-boundary`
- `npm run qa:product-experience`

## Deployment

- Feature commit: `cfadbd2`
- PR: #18
- Merge commit: `04de3aad669575963f1474fbf671d3f5c5bddf0f`
- PR validation run: `32694382473`, job `97333673180`, passed
- Production deployment run: `32694451757`, validate job `97333862097`, deploy job `97333987041`, passed
- Cloudflare Worker version: `7afb48f1-6659-43e4-ad1a-4807bc009b32`

## Production Verification

- Apex returned `200 OK` with root ETag `"0ecb575e694d6d307e58c79fec97e5e9"`.
- `www` redirected `301` to the apex root.
- Live CSS contains `--radius-glass:8px`, `opacity:.28`, `letter-spacing:0`, and `page-hero-copy`.
- Live root metadata preserved `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`.
- Live route scan found zero `Corporate Control Plane`, `Internal Admin`, `Admin Dashboard`, or `certamaris-og.jpg` references on key production routes.
- Live OG image returned `200 image/png`, `121623` bytes, `1200x630`.

## Status

RESOLVED.
