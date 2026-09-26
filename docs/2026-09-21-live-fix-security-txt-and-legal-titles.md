# 2026-09-21 - Live fix: security.txt and legacy legal-route titles

Author: Codex (CertaMaris real-product sellability closeout program)
Status: **APPLIED and DEPLOYED to production. Not yet committed to git in this checkout.**

## Why this note exists

Another agent was actively editing and deploying this checkout while this change was made
(`docs/AGENT_MEMORY.md` was dirty and a new deployment doc appeared during the session; the
Worker was deployed at 05:25:24Z). These four source changes were added to the tree so that any
future `build:static` + `wrangler deploy` continues to carry them. They are additive and touch
files that were outside the checkout's existing uncommitted change set.

## What changed

| File | Change |
|---|---|
| `app/privacy/page.tsx` | Title `"Privacy Policy - legacy route"` -> `"Privacy Policy"` |
| `app/terms/page.tsx` | Title `"Business Terms - legacy route"` -> `"Business Terms"` |
| `public/.well-known/security.txt` | **New.** RFC 9116 contact file (Contact / Expires / Preferred-Languages / Canonical / Policy). |
| `public/_redirects` | **New.** `301` from `/security.txt` to `/.well-known/security.txt`. |

## Root cause worth knowing

Next.js static export emits an RSC payload beside every page: `security.html` **and**
`security.txt`. Because the site has a `/security` page, `/security.txt` was being served that
RSC payload with a 200 status and `text/plain`, so the path looked like a security.txt but was
not one. Adding `public/security.txt` does **not** fix it - the route output wins. The
`_redirects` rule does.

Do not "fix" this by adding `public/security.txt`; it will be silently overwritten at build time.

## Validation performed

`npm run typecheck`, `npm run test:pricing` (12/12), `npm run test:contact` (9/9),
`npm run test:worker` (5/5), `npm run build:static` - all passed before deploy.

Deployed with `wrangler deploy --config wrangler.jsonc --keep-vars`.
Pre-deploy version `df146fd0-2488-4666-a21a-bef801fadce3`,
post-deploy version `74abcc41-d0fa-48c1-b5d4-31110129b7d1`.

Live verification: `/privacy` and `/terms` titles clean; `/.well-known/security.txt` 200
`text/plain`; `/security.txt` 301 to it; 24-route public sweep all 200.

Rollback if ever needed:

```powershell
wrangler versions deploy df146fd0-2488-4666-a21a-bef801fadce3@100% --config wrangler.jsonc -y
```

## Requested follow-up

1. Commit these four paths (`git add` them explicitly; do not blanket-stage the working tree).
2. Consider setting production `preview_urls: false` and keeping `preview_urls: true` only in the
   `staging` environment block.
