# 2026-08-24 Complete Legal Library Production Deployment

Status: **production verified** on `https://certamaris.com`.

## Source and deployment

| Item | Value |
|---|---|
| Repository | `marinerxcapital/certamaris-public-website` |
| Branch | `main` |
| Pre-change main SHA | `9b2c4022643da10fabc038f745aca9f01e8444d8` |
| Implementation commit | `e62e01023e4f62f580f582a919277d566e52323f` |
| Legal package | `CertaMaris_All_Legal_Web_Deployment_Package_v1.0.zip` |
| Package source date | 23 August 2026 |
| GitHub Actions run | `32681492599` |
| Validate job | `97298846724` |
| Deploy job | `97298956661` |
| Cloudflare Worker | `certamaris-site` |
| Cloudflare Worker version | `3ae144d2-8bdc-4018-b93e-c4b297b1195c` |
| Deploy completion | `2026-08-24T02:00:12Z` |
| Production domain | `https://certamaris.com` |

## Legal deployment shipped

- Deployed 39 unique legal PDF deliverables from the supplied package: 38 standalone documents plus the complete populated master legal-library binder.
- Deduplicated the seven public PDFs that were physically present in both `Complete_Legal_Production_Library/` and `Web_Legal_Launch_Package/`.
- Added complete native HTML legal pages from the supplied Markdown source:
  - `https://certamaris.com/legal/privacy`
  - `https://certamaris.com/legal/terms`
  - `https://certamaris.com/legal/cookies`
  - `https://certamaris.com/legal/acceptable-use`
  - `https://certamaris.com/accessibility`
  - `https://certamaris.com/legal/subprocessors`
  - `https://certamaris.com/legal/dpa`
- Added `https://certamaris.com/legal/library` for the complete hosted PDF library.
- Replaced the old interim legal route pages with full legal text, PDF download links, and final package metadata.
- Updated footer/legal navigation, homepage buyer diligence links, procurement references, trust/security subprocessor references, sitemap, route inventory, metadata, and Worker PDF handling.
- Kept Markdown sources, package manifests, QA notes, and source-package internals out of public downloads.

## PDF asset paths

Public policies and agreements:

- `/legal/documents/public/01_Privacy_Policy_FINAL_v1.0.pdf`
- `/legal/documents/public/02_Business_Terms_of_Service_FINAL_v1.0.pdf`
- `/legal/documents/public/03_Cookie_and_Tracking_Notice_FINAL_v1.0.pdf`
- `/legal/documents/public/04_Acceptable_Use_Policy_FINAL_v1.0.pdf`
- `/legal/documents/public/05_Accessibility_Statement_FINAL_v1.0.pdf`
- `/legal/documents/public/06_Subprocessor_List_and_Change_Notice_FINAL_v1.0.pdf`
- `/legal/documents/public/10_Data_Processing_Agreement_FINAL_v1.0.pdf`

Enterprise / execution templates:

- `/legal/documents/enterprise-templates/07_Master_Subscription_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/08_Order_Form_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/09_Statement_of_Work_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/11_Security_Addendum_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/12_Service_Level_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/13_Mutual_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/14_Unilateral_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/15_Evaluation_and_Pilot_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/16_Beta_and_Preview_Features_Addendum_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/17_Professional_Services_Terms_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/18_Contract_Amendment_and_Change_Order_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/19_Renewal_and_Expansion_Order_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/20_Termination_Data_Export_and_Deletion_Certificate_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/21_Customer_Security_Incident_Notification_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/22_Data_Subject_Rights_Response_and_Verification_Notice_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/23_Vendor_Services_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/24_Vendor_Data_Processing_Addendum_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/25_Vendor_Security_Addendum_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/26_Vendor_Non_Disclosure_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/27_Independent_Contractor_Services_and_IP_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/28_Employee_Confidentiality_and_Inventions_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/29_Advisor_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/30_Intellectual_Property_Assignment_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/31_Referral_Partner_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/32_Reseller_and_Channel_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/33_Technology_and_Integration_Partner_Agreement_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/34_International_Data_Transfer_Addendum_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/35_Legal_Hold_Notice_and_Preservation_Acknowledgment_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/36_Board_or_Member_Written_Consent_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/37_Corporate_Authority_and_Signatory_Resolution_EXECUTION_TEMPLATE_v1.0.pdf`
- `/legal/documents/enterprise-templates/38_Trademark_and_Customer_Logo_Permission_EXECUTION_TEMPLATE_v1.0.pdf`

Master binder:

- `/legal/documents/master/00_CertaMaris_COMPLETE_POPULATED_LEGAL_LIBRARY_MASTER_v1.0.pdf`

## SEO and indexing

- The seven primary public legal pages are indexable and included in `sitemap.xml`.
- `/legal/library` is accessible but marked `noindex, nofollow`.
- Enterprise template PDFs and the master binder are directly accessible and served by the Worker with `X-Robots-Tag: noindex`.
- Public policy PDFs are directly accessible without template noindex treatment.

## Validation

| Gate | Result |
|---|---|
| Package manifest SHA-256 | Pass: every manifest entry matched after extraction outside `public/` |
| PDF inventory | Pass: 46 physical PDFs collapsed to 39 unique PDF hashes |
| PDF integrity | Pass: all PDFs parse, are unencrypted, have positive page counts, and have EOF markers |
| Logo rendering | Pass: representative rendered first-page contact sheet showed canonical CertaMaris mark on normal background, no black-logo defect |
| Primary public document marker scan | Pass: no draft, attorney-review, do-not-publish, or bracket publication blockers in primary public Markdown/PDFs |
| `npm run typecheck` | Pass |
| `npm run build:static` | Pass: 111 static pages |
| `npm run build` | Pass |
| Unit / integration tests | Pass: pricing 12/12; contact 7/7; Worker 5/5 |
| `npm audit --omit=dev --audit-level=high` | Pass: 0 production vulnerabilities |
| `npm run qa` | Pass: route, SEO, link, content, buyer, excellence, product, founder, pricing, contact, and Worker checks |
| `npm run qa:responsive-a11y` | Pass: 16 routes x 9 viewports, `issues=0`, `brokenImages=0` |
| Legal static verifier | Pass: 39 PDF assets, 7 primary HTML routes, library noindex, footer links, sitemap, and no exposed source Markdown/manifests |
| Local legal browser verifier | Pass: 8 legal routes x 3 viewports, no overflow, logo dimensions valid, library 39 unique PDF links |
| `git diff --check` | Pass |

Notes:

- `npm ci` reports 3 dev-dependency audit findings in the full dev tree; production audit with `--omit=dev --audit-level=high` is clean.
- Next static export still warns that `headers()` do not apply to export output; production noindex PDF headers are implemented in `worker/index.ts`.

## Live verification

Production checks were run directly against `https://certamaris.com`, not localhost, preview, staging, or a Cloudflare preview URL.

| Check | Result |
|---|---|
| Apex | `https://certamaris.com` returned `200` |
| `www` redirect | `https://www.certamaris.com/legal/privacy` returned `301` to `https://certamaris.com/legal/privacy` |
| Seven public HTML routes | Pass: each returned `200`, contained the expected document title, canonical URL, index/follow robots, one PDF link, and no stale blocker text |
| Legal library route | Pass: `/legal/library` returned `200`, contained 39 unique PDF links, and had `noindex, nofollow` |
| Sitemap | Pass: includes the seven primary public legal routes and excludes `/legal/library` |
| PDF download verification | Pass: all 39 live PDF downloads returned `200`, `application/pdf`, and SHA-256 matched the committed PDF |
| Template noindex headers | Pass: enterprise template PDFs and master binder returned `X-Robots-Tag: noindex` |
| Live responsive/browser check | Pass: 8 legal routes x mobile/tablet/desktop, `24` checks, no overflow, logo dimensions valid, library PDF count valid |

Verification timestamps:

- PDF/hash verification: `2026-08-24T02:01:34.959Z`
- HTML/sitemap verification: `2026-08-24T02:02:03.806Z`
- Responsive/browser verification: `2026-08-24T02:06:52.716Z`

## Maintenance rule

Future legal-document maintenance must update both surfaces in the same change:

- the native HTML legal text rendered from website source; and
- the corresponding downloadable PDF under `public/legal/documents/`.

Do not update one surface without updating the other, and do not publish enterprise execution templates as if they are signed customer agreements, executed NDAs, completed board/member consents, issued legal holds, completed corporate resolutions, individualized customer contracts, or other already-executed instruments.

## Known limitations

- Contact delivery remains fail-closed until the owner configures Worker forwarding secrets; this deployment did not change contact delivery.
- Execution templates intentionally retain execution-time fields for parties, signatures, order details, customer-specific transfer particulars, or similar transaction-specific data. The site labels them as templates and does not represent them as executed instruments.
