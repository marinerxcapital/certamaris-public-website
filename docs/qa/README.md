# docs/qa

Canonical remediation QA write-up:

- [../2026-07-31-website-remediation-qa.md](../2026-07-31-website-remediation-qa.md) — a11y, performance, visual regression, automation
- [../measurement-spec.md](../measurement-spec.md) — privacy-safe analytics events

Runnable scripts live in `scripts/qa/`.

Empty-state route, responsive, interaction, and axe coverage:

- `npm run qa:empty-states`
- [../empty-state-design-system.md](../empty-state-design-system.md)

SEO integrity and visual coverage:

- `npm run qa:seo`
- `npm run qa:seo-audit`
- `npm run qa:seo-visual`
- [../seo/SEO_QA_EVIDENCE.md](../seo/SEO_QA_EVIDENCE.md)

Full-site vision, responsive, interaction, image-load, and live-polish coverage:

- [../full-site-polish/PAGE_POLISH_MATRIX.json](../full-site-polish/PAGE_POLISH_MATRIX.json)
- [../full-site-polish/QA_EVIDENCE.md](../full-site-polish/QA_EVIDENCE.md)
- [../2026-10-26-full-site-polish-deployment.md](../2026-10-26-full-site-polish-deployment.md)
