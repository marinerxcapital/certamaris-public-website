import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { APP_SIGN_IN_URL } from "@/lib/constants";
const groups = [
  {
    title: "Product",
    links: [
      ["Platform overview", "/platform"],
      ["Product demo", "/demo"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About CertaMaris", "/about"],
      ["Contact", "/contact"],
      ["Sign in", APP_SIGN_IN_URL],
    ],
  },
  {
    title: "Trust & legal",
    links: [
      ["Security", "/security"],
      ["Trust Center", "/trust"],
      ["Privacy", "/legal/privacy"],
      ["Terms", "/legal/terms"],
      ["Accessibility", "/accessibility"],
    ],
  },
];
export function Footer() {
  return (
    <footer className="cm-footer">
      <div className="cm-container cm-footer-inner">
        <div className="cm-footer-grid">
          <div className="cm-footer-brand">
            <Link
              className="cm-brand-link"
              href="/"
              aria-label="CertaMaris home"
            >
              <BrandLogo />
            </Link>
            <p>
              Maritime cyber compliance,
              <br />
              assurance and readiness.
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="cm-footer-legal">
          <p>
            CertaMaris supports compliance workflows. It does not certify
            compliance or guarantee audit, survey or inspection outcomes.
          </p>
          <p>
            Official sources control. Qualified human review is required for
            compliance and applicability decisions.
          </p>
          <div className="cm-footer-bottom">
            <p>
              © {new Date().getFullYear()} CertaMaris. All rights reserved.
            </p>
            <Link href="/sitemap">Full sitemap →</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
