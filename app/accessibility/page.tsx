import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { accessibilityContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Accessibility",
  "How the CertaMaris public website approaches accessibility, known limitations, and how to report an issue or request documentation.",
  "/accessibility"
);

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow={accessibilityContent.eyebrow}
        title={accessibilityContent.title}
        intro={accessibilityContent.intro}
      />
      <Section>
        <div className="legal-panel max-w-3xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <p className="text-[14px] text-structural leading-relaxed border-b border-navy/10 pb-6">
            {accessibilityContent.target}
          </p>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Review scope</h2>
            <p>{accessibilityContent.auditScope}</p>
            <p className="mt-2 text-[13px] text-structural">
              Last reviewed: <time dateTime={accessibilityContent.lastReviewed}>August 1, 2026</time>
            </p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Methods on this public site</h2>
            <ul className="list-disc pl-5 space-y-2">
              {accessibilityContent.methods.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Known limitations</h2>
            <p>{accessibilityContent.limitations}</p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Remediation process</h2>
            <p>{accessibilityContent.remediation}</p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">Reporting an issue</h2>
            <p>{accessibilityContent.contact}</p>
          </div>
          <div>
            <h2 className="text-[19px] font-semibold mb-2">VPAT / accessibility documentation</h2>
            <p className="mb-3">{accessibilityContent.vpat}</p>
            <p>
              <Link href={accessibilityContent.procurementHref} className="font-medium text-ocean underline underline-offset-2">
                Procurement package
              </Link>
              {" · "}
              <Link href={accessibilityContent.contactHref} className="font-medium text-ocean underline underline-offset-2">
                Contact with procurement intent
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
