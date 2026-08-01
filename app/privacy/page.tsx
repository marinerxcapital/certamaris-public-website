import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { privacyContent } from "@/lib/trust-corporate";

export const metadata = pageMetadata(
  "Privacy Policy",
  "How CertaMaris collects, uses, and protects personal information on this website.",
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow={privacyContent.eyebrow}
        title={privacyContent.title}
        intro={privacyContent.intro}
      />
      <Section>
        <div className="legal-panel max-w-3xl space-y-8 text-[15px] text-navy/85 leading-relaxed">
          <p className="text-[14px] text-structural leading-relaxed border-b border-navy/10 pb-6">
            {privacyContent.scope}
          </p>
          {privacyContent.sections.map((section) => (
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
