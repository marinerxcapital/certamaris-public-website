# CertaMaris SEO Implementation Report

**Date:** 2026-10-22

**Audit source:** `out/` static export and the production sitemap

**Indexable routes:** 95

**Sitemap URLs:** 95

## Audit outcome

The canonical site already had unique titles, one H1 per page, a crawlable
sitemap, resolving internal links, truthful structured data, and strong route
coverage. The audit found a smaller set of cross-system defects:

- four descriptions over 160 characters;
- legacy legal aliases with self-canonical metadata;
- two redirect fallback pages that remained indexable in the static export;
- an indexable sitemap page missing from sitemap.xml;
- page-specific breadcrumb schema on templates without visible breadcrumbs;
- a generic homepage title;
- an incorrectly declared founder-portrait social image;
- no strict sitemap/indexability/schema regression gate.

## Shared implementation

### Metadata

- `pageMetadata` now supports alias canonical targets, emits correct image MIME
  types, and only declares default 1200x630 dimensions for standard PNG cards.
- `noIndex` now uses `noindex, follow` by default so utility and alias pages do
  not block discovery of their canonical destination.
- The homepage now targets the category “Maritime Cyber Compliance Software”
  instead of relying on the brand-only root title.

### Indexation

- The Worker has one map of permanent redirects for legacy and duplicate-intent
  routes. Redirect tests cover all six sources and final destinations.
- `/industries` and `/sample-platform` static fallbacks are noindex and
  canonicalize to their final destinations.
- `/privacy`, `/terms`, and `/trust/subprocessors` are noindex fallbacks,
  canonicalize to `/legal/*`, and permanently redirect in production.

### Sitemap and robots

- The human `/sitemap` page is included in sitemap.xml.
- The generated sitemap now matches the 95 indexable rendered routes exactly.
- `robots.txt` is checked for the canonical sitemap declaration.

### Structured data and navigation

- Page-specific JSON-LD is parsed and checked against visible page content.
- The affected compliance, glossary, resources, article, topics, topic-detail,
  and about templates now show the same breadcrumb trail they publish.
- Root Organization, WebSite, and SoftwareApplication schema were retained.
- No unsupported ratings, reviews, customer counts, certifications, or
  unverified `sameAs` profiles were added.

### Internal linking

- No orphaned indexable route was found.
- Existing product, solution, compliance, topic, resource, trust, and footer
  paths were retained.
- Redirect consolidation reduces duplicate-intent paths without breaking
  legacy URLs.

## Source changes

- `lib/metadata.ts`
- `app/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/trust/subprocessors/page.tsx`
- `app/industries/page.tsx`
- `app/sample-platform/page.tsx`
- `app/sitemap.ts`
- `app/about/page.tsx`
- `app/about/leadership/page.tsx`
- `app/compliance/*`
- `app/glossary/page.tsx`
- `app/resources/page.tsx`
- `app/resources/[slug]/page.tsx`
- `app/topics/page.tsx`
- `components/PageHero.tsx`
- `components/TopicPageView.tsx`
- `lib/legal-documents.ts`
- `worker/index.ts`
- `worker/index.test.ts`
- `scripts/qa/check-seo.mjs`
- `scripts/qa/seo-audit.mjs`
- `scripts/qa/seo-visual-qa.mjs`
- `scripts/qa/run-all.mjs`
- `package.json`

## Explicit non-changes

- No pricing values changed.
- No compliance wording or legal document body text changed.
- No customer, certification, ratings, traffic, ranking, or keyword-volume
  claims were added.
- Navigation structure, Pixel Grid, homepage hero media, contact routing, and
  public product boundaries were preserved.
