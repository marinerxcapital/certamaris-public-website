# SEO QA

Command:

```powershell
npm run qa:seo
```

Result: PASS

Evidence:

- Pages scanned: `100`.
- Homepage title/H1 after polish:
  - Title: `CertaMaris — Maritime Cyber Compliance & Assurance`
  - H1: `Maritime cyber assurance from requirement to readiness package.`

Expected warnings:

- `404.html` and `_not-found.html` share expected not-found metadata.
- `/privacy` and `/terms` status aliases duplicate canonical legal H1s by design.

No new SEO route failures were introduced.

