# CertaMaris Public Site — Route Inventory

Updated 2026-10-22 from the static export (`out/`). 105 rendered HTML pages:
95 indexable routes and 10 noindex utility, redirect-fallback, or error pages.
`sitemap.xml` contains the same 95 indexable routes.

## Route families

### Home & conversion

- `/`
- `/contact` (also `/contact/delivery-failed`, `/contact/submitted`)
- `/pricing`
- `/faq`
- `/demo`

### Product

- `/platform`
- `/platform/assessments`
- `/platform/client-company-portal`
- `/platform/continuous-assurance`
- `/platform/cybersecurity-plans`
- `/platform/evidence`
- `/platform/findings-corrective-actions`
- `/platform/fleet-management`
- `/platform/integrations`
- `/platform/regulatory-intelligence`
- `/platform/reports-readiness`
- `/platform/vessel-portal`

### Solutions

- `/solutions`
- `/solutions/audit-survey-readiness`
- `/solutions/corrective-action-verification`
- `/solutions/cybersecurity-plan-management`
- `/solutions/evidence-findings-management`
- `/solutions/executive-board-reporting`
- `/solutions/fleet-cyber-compliance`
- `/solutions/iacs-ur-e26`
- `/solutions/iacs-ur-e27`
- `/solutions/imo-msc-428-98`
- `/solutions/regulatory-change-management`
- `/solutions/sbom-vulnerability-assurance`
- `/solutions/vessel-cyber-risk-management`

### Audiences

- `/who-we-serve`
- `/who-we-serve/classification-survey`
- `/who-we-serve/insurers-pi`
- `/who-we-serve/maritime-it-ot`
- `/who-we-serve/maritime-service-providers`
- `/who-we-serve/operators`
- `/who-we-serve/ship-owners`
- `/who-we-serve/technical-managers-dpas`
- `/who-we-serve/vessel-masters-officers`

### Compliance

- `/compliance`
- `/compliance/guidelines`
- `/compliance/iacs`
- `/compliance/imo`
- `/compliance/mapping-methodology`
- `/compliance/official-sources`
- `/compliance/update-center`

### Resources & topics

- `/resources` (8 `[slug]` articles)
- `/glossary`
- `/topics` (15 `[slug]` landing pages)
- `/implementation`
- `/why-certamaris`
- `/industries`

### Company

- `/about`
- `/about/careers`
- `/about/corporate-information`
- `/about/leadership`
- `/about/partners`
- `/about/press`

### Trust & legal

- `/security`
- `/trust`
- `/trust/ai-policy`
- `/trust/assurance-model`
- `/trust/procurement`
- `/trust/responsible-disclosure`
- `/trust/status`
- `/trust/subprocessors`
- `/privacy`
- `/terms`
- `/accessibility`
- `/legal/acceptable-use`
- `/legal/cookies`
- `/legal/dpa`
- `/legal/library`
- `/legal/privacy`
- `/legal/subprocessors`
- `/legal/terms`

### Utility

- `/sample-platform`
- `/sitemap`
- `/sitemap.xml`
- `/robots.txt`
- `/404`

### Redirect aliases

The Worker keeps these legacy URLs available with permanent 301 redirects:

- `/industries` → `/who-we-serve`
- `/sample-platform` → `/demo`
- `/platform/corporate-control-plane` → `/platform/client-company-portal`
- `/privacy` → `/legal/privacy`
- `/terms` → `/legal/terms`
- `/trust/subprocessors` → `/legal/subprocessors`

The static fallback pages remain in the export, but are `noindex, follow`,
canonicalize to the final destination, and are excluded from `sitemap.xml`.

Noindex utility pages include `/contact/submitted`,
`/contact/delivery-failed`, `/legal/library`, the redirect fallbacks, and the
404 documents.

Note: this branch carries more routes than the directive's ~50-route list (notably
`/legal/*`, `/topics/*`, `/trust/ai-policy`, `/trust/assurance-model`,
`/about/corporate-information`, `/industries`), reflecting committed work added
after the original live audit.


## 2026-11-18 - Bold editorial public-site release

Current public-site release: see docs/2026-11-18-bold-editorial-redesign.md. Public site deployed and live-verified at https://certamaris.com, Worker `a8a3251f-4cb3-4cd9-94c8-6cc9833b228a` at 100%, source `684f038c2cddfaa3ac168ca32890052f1f5bd8f5` on `codex/public-redesign-bold-20261118`. Four-section editorial homepage and shared system cover 105 HTML entries; pricing/legal/contact/demo/app handoff preserved. Build, full QA, lightbox, responsive/a11y and local/live browser gates passed. Evidence and honest limits: `C:\certamaris-startup-site-pnpm\certamaris-startup-site\docs\2026-11-18-bold-editorial-redesign.md`. No API/platform/E2EE/Stripe/Railway deployment is implied.
