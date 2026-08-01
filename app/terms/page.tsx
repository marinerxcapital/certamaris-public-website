import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { termsContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Terms of Service",
  "Terms for use of the CertaMaris public website and inquiry forms, separate from customer platform and commercial agreements.",
  "/terms"
);

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow={termsContent.eyebrow} title={termsContent.title} intro={termsContent.intro} />
      <Section>
        <div className="legal-panel max-w-3xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <p className="text-[14px] text-structural leading-relaxed border-b border-navy/10 pb-6">
            {termsContent.scope}
          </p>
          {termsContent.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-[19px] font-semibold mb-2">{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
