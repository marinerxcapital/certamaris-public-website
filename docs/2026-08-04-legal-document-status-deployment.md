# 2026-08-04 legal document status routes deployment

## Summary

The CertaMaris marketing site now publishes source-controlled legal-status
pages at:

- `https://certamaris.com/legal/privacy`
- `https://certamaris.com/legal/terms`
- `https://certamaris.com/legal/dpa`

These pages do **not** publish the underlying final legal PDFs or full
operative contract text. The controlling source package dated Tuesday,
August 4, 2026 marks all three legal documents as **Final legal text;
configuration incomplete** and blocks public publication or customer
reliance until the remaining fields are completed.

## Source package used

- Archive: `CertaMaris_Final_Legal_Document_Package_v1.0.zip`
- Package version: `v1.0`
- Package generated date: `2026-08-04`
- Manifest verification: `13/13` packaged files matched the recorded
  SHA-256 digest and byte size during implementation review.
- Remaining bracketed fields: `95`
- Publication or customer-reliance blockers: `81`
- Execution or countersignature blockers: `4`

## Implementation shipped

- Added canonical routes:
  - `/legal/privacy`
  - `/legal/terms`
  - `/legal/dpa`
- Replaced the older `/privacy` and `/terms` route bodies with compatibility
  exports that point to the same canonical legal-status content.
- Updated marketing-site link surfaces to the canonical legal routes:
  - global footer
  - homepage trust links
  - contact-form privacy notice
  - procurement page CTAs
  - corporate-information related links
  - command-palette trust links
- Added sitemap entries for the canonical legal routes.
- Kept internal package materials private:
  - no PDF assets published under `/legal/documents/*`
  - no DOCX files published
  - no checklist, finalization report, manifest, or README published as
    website assets

## Validation

### Local package validation

- README review: package explicitly states `Final legal text; configuration incomplete`.
- Checklist review: package explicitly blocks publication until the listed
  fields are completed.
- Finalization report review: privacy, terms, and DPA remain non-operative
  pending configuration; Business Terms and DPA retain Confidential
  classification in the source package.
- Placeholder extraction from DOCX sources confirmed unresolved legal,
  commercial, privacy, security, and transfer placeholders.

### Repository checks

- `npm run typecheck` — PASS
- `npx next build` — PASS
- `npm run build:static` — PASS
- `npm run qa` — PASS
  - 12 contact and Worker tests passed
  - 112 content files passed content QA
  - 96 required routes passed exported route checks
  - 96 pages passed SEO checks
  - 7,228 internal hrefs resolved
  - founder QA remained green

### Placeholder and draft-marker scan

- `DRAFT`, `PENDING ATTORNEY REVIEW`, and `DO NOT PUBLISH` were not found in
  the shipped app, public assets, or generated export.
- Remaining bracketed placeholders visible on the live `/legal/*` pages are
  intentional blocker references taken from the controlling source package.
  They are presented as status evidence, not as operative legal language.

## Git

- Repository: `marinerxcapital/certamaris-public-website`
- Branch: `main`
- Implementation commit: `6eeb4cd70184963bdc4f84594ad3496e7cc98d1d`
- Commit message: `feat(marketing): add legal document status routes`
- Push result: `origin/main` updated successfully

## Production deployment

- Provider: Cloudflare Workers (`wrangler.jsonc`, Worker `certamaris-site`)
- Deploy command: `npx wrangler deploy --config wrangler.jsonc --keep-vars`
- Deploy result: PASS
- Worker version: `9afaec8d-a5b7-4c2d-a781-11c736af66a7`
- Deployment date: Tuesday, August 4, 2026

### Live verification

- `https://certamaris.com/legal/privacy` — `200`
- `https://certamaris.com/legal/terms` — `200`
- `https://certamaris.com/legal/dpa` — `200`
- `https://certamaris.com/privacy` — `200`
- `https://certamaris.com/terms` — `200`
- `https://www.certamaris.com/legal/privacy` — `301` to
  `https://certamaris.com/legal/privacy`
- `https://certamaris.com/legal/documents/CertaMaris_Privacy_Policy_FINAL_v1.0.pdf` — `404`
- `https://certamaris.com/legal/documents/CertaMaris_Business_Terms_of_Service_FINAL_v1.0.pdf` — `404`
- `https://certamaris.com/legal/documents/CertaMaris_Data_Processing_Agreement_FINAL_v1.0.pdf` — `404`

### Live content checks

- Each canonical `/legal/*` page renders the expected August 4, 2026 source
  package status, blocker counts, and next-step guidance.
- Each canonical `/legal/*` page publishes a canonical URL under
  `https://certamaris.com/legal/...`.
- Footer links on the live pages include:
  - Privacy Policy
  - Business Terms
  - Data Processing Agreement
- Public PDF downloads remain intentionally unavailable on the live site,
  matching the package blockers and the no-public-asset decision.

## Known residuals

- The underlying legal documents remain **not publication-ready** because the
  source package still contains publication-blocking placeholders and
  unresolved implementation confirmations.
- Browser-session console verification could not be completed in the Codex
  in-app browser because the live page webview failed to attach twice during
  post-deploy checks. HTTP responses, rendered HTML, metadata, footer links,
  sitemap entries, and the deployed Worker version were verified directly.
- No public PDF URLs were shipped because doing so would have contradicted the
  package checklist.

## Re-review triggers before publishing operative legal text

- Legal entity, address, or governing-law changes
- Analytics or cookie-provider activation
- AI-provider activation or replacement
- Stripe or billing-flow activation
- Subprocessor or transfer-mechanism changes
- Retention, deletion, logging, or backup-behavior changes
- Security-control or incident-response commitment changes
- New mobile apps or self-service signup
- Material service-model or commercial-term changes
