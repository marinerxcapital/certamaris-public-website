# Conversion, Trust, and Visual UX Upgrade - 2026-08-22

## Scope

Improve qualified-buyer conversion clarity, trust packaging, information architecture, responsive polish, and accessibility on the live CertaMaris public website without adding unverified business claims.

## Audit Findings

- Homepage: strong product proof and brand discipline, but the next buyer path was not explicit above the fold.
- Product proof: demo scrub and sample record were strong; they needed clearer routing into pricing and diligence.
- Pricing: published package facts were present, but the first viewport left buyers without an immediate procurement/security path.
- Trust: correct truthful posture, but procurement, AI/data, legal, and assurance links were not packaged as a compact diligence entry point.
- Contact: intent routing was present and truthful; buyer diligence material was easier to reach after the pass.
- Mobile nav: baseline drawer was too translucent over the hero, making background content visible through the sheet.
- Contact delivery: unchanged and truthful; form remains fail-closed if forwarding is not configured, with email fallback copy.
- Metadata: `/og/certamaris-link-preview-2026-08-v2.png` remained correct and was preserved.

## Changes

- Added `components/BuyerDiligencePacket.tsx`.
- Added homepage quick buyer path links above the regulatory boundary note.
- Added unselected persona helper copy.
- Added buyer diligence packet sections to Home, Pricing, Trust, and Contact.
- Added Pricing hero aside for comparison/procurement/contact path.
- Reduced shared page-hero vertical spacing.
- Increased mobile menu opacity and backdrop treatment.
- Added `scripts/qa/check-buyer-paths.mjs` and wired it into `npm run qa`.

## Evidence

Baseline screenshots are in `screenshots/baseline/`.

Post-change local screenshots are in `screenshots/after-local/`.

Production screenshots after PR #12 deployment are in `screenshots/production/`.

## Local Verification

```bash
npm run typecheck
npm run build:static
npm run build
npm run qa
npm run qa:responsive-a11y
npm run qa:link-preview
npm run qa:buyer-paths
```

All commands passed locally on the implementation branch.

## Production Verification

RESOLVED.

- PR #12 merged.
- Implementation commit: `b25a6f8`.
- Merge commit: `4f206e6`.
- Production workflow run: `32549762207`.
- Deploy job: `96974526637`, passed.
- `https://certamaris.com/`: 200 OK with root ETag `"ef210f2eb759010ed7929d13e25285fd"`.
- `https://www.certamaris.com`: 301 to `https://certamaris.com/`.
- Root live HTML contains the buyer-diligence path and no `/og/certamaris-og.jpg`.
- OG/Twitter preview still points to `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`.
- Preview image returns 200 `image/png`, dimensions `1200x630`, payload `121623` bytes.
