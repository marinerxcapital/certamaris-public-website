import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { faqItems } from "@/lib/content";

export const metadata = pageMetadata(
  "FAQ",
  "Answers to common questions about CertaMaris, IMO cyber-risk management, IACS UR E26/E27, pricing, and data isolation.",
  "/faq"
);

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    mainEntityOfPage: `${SITE_URL}/faq`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero eyebrow="FAQ" title="Common questions, answered directly." />
      <Section>
        <div className="max-w-2xl">
          <FaqAccordion items={faqItems} />
        </div>
      </Section>
    </>
  );
}
