# Production Verification

Production verification completed after merge to `main`.

Canonical deployment workflow:

- `.github/workflows/ci-deploy.yml`
- `push` to `main` validates, builds static export, then runs `npx wrangler deploy --config wrangler.jsonc --keep-vars`.

## Deployment

- PR: `#2`
- Merged commit: `86218909772578ca6026629c04f706342dc6c025`
- GitHub Actions run: `31577979769`
- Validate marketing site: PASS
- Deploy production Worker: PASS
- Workflow URL: `https://github.com/marinerxcapital/certamaris-public-website/actions/runs/31577979769`

## Live Checks

Command summary:

```powershell
Invoke-WebRequest https://certamaris.com/?v=8621890
```

HTML checks:

- `containsNewH1=True`
- `containsOldH1=False`
- `containsDashboardV2=True`
- `containsUpdated=False`
- `containsClean=False`
- `containsOptimizedLegacy=False`

Browser checks:

| Route | Viewport | H1 | Overflow | Dashboard V2 proof | Old paths | Console errors |
|---|---:|---|---:|---:|---:|---:|
| `/` | `390x844` | `Maritime cyber assurance from requirement to readiness package.` | `0` | `3` | `false` | `0` |
| `/platform` | `1440x900` | `Maritime cyber compliance across company, fleet, vessel, and controlled work products.` | `0` | `5` | `false` | `0` |
| `/demo` | `390x844` | `A guided tour of the CertaMaris assurance workflow.` | `0` | `9` | `false` | `0` |
| `/solutions/audit-survey-readiness` | `1440x900` | `Build the readiness package continuously — not the week before survey.` | `0` | `1` | `false` | `0` |

Status: `PRODUCTION VERIFIED`.

