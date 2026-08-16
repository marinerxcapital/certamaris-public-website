# Live QA Checklist — 2026-08-16

**Signed:** Cursor Cloud Agent · **Date:** 2026-08-16  
**Production:** https://certamaris.com

## Pre-merge live spot-check (PR #5 already on production Worker tip)

Checked 2026-08-16 from agent environment (HTTP):

| URL | HTTP | Notes |
|---|---|---|
| `/` | 200 | Brand + sample-record + persona markers present in HTML |
| `/demo` | 200 | Scrub markers present |
| `/platform` | 200 | Pre-authored version still live until this pass deploys |
| `/solutions` | 200 | |
| `/trust/assurance-model` | **404** | Expected until this pass merges + Worker deploy |
| `/trust/procurement` | 200 | |
| `/contact` | 200 | Delivery still secret-dependent |

Complete remaining boxes after `main` deploy (CI Worker deploy on push to main).

## Functional

| Check | Expected | Result |
|---|---|---|
| `/` hero brand | `CertaMaris` brand-hero-mark visible | PASS (live HTML) |
| `/` sample record | `#sample-record` explorer; default REQ-0104 without persona | PASS (live + local Playwright) |
| `/` persona DPA | Opens EVD-0847; copy changes | pending post-deploy manual |
| `/` persona owner | Opens PKG-0067 | pending |
| `/` persona IT/OT | Opens CTL-0389 | pending |
| `/` persona class | Opens PKG-0067 | pending |
| `/demo#scrub-tour` | Scrub rail + Play; 8 beats | PASS (live HTML markers) |
| `/demo` persona | Jump to matching beat | pending |
| `/platform` | Custody strip + hierarchy spine + 4 beats | pending (404 not applicable; page 200 old) |
| `/solutions` | Custody strip under hero | pending |
| `/why-certamaris` | Custody strip under hero | pending |
| `/trust/assurance-model` | Leave-behind + Print button | pending (404 pre-merge) |
| `/trust/procurement` | Links to leave-behind; Current badge on one-pager | pending |
| `/contact` | Honest failure or success depending on secrets | 200; secrets owner-blocked |

## Regression

| Check | Expected | Result |
|---|---|---|
| Pixel Grid visible sitewide | Not covered by opaque hero band | assumed preserved |
| `?srqa=1` sample QA | Starts at REQ-0104 | PASS (local Playwright) |
| Reduced motion | No autoplay scrub; near-opaque transitions | code-reviewed |
| Mobile 375px | No horizontal overflow; CTAs tappable | pending manual |

## Sign-off

- Validator: Cursor Cloud Agent (automated portion) / Skyler Brown (manual remainder)
- Date: 2026-08-16
- Notes: Contact E2E blocked on Worker secrets.

**Signed (author of checklist):** Cursor Cloud Agent · 2026-08-16
