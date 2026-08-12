import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import {
  FAQ_CATEGORIES,
  faqItems,
  faqItemsByCategory,
} from "@/lib/faq-pricing";
import { pageMetadata } from "@/lib/metadata";
import { REGULATORY_LAST_REVIEWED } from "@/lib/regulatory";
import { faqPageSchema } from "@/lib/seo-schema";

export const metadata = pageMetadata(
  "FAQ",
  "Answers about CertaMaris product, implementation, security, regulatory scope, commercial packages, and procurement — organized by category.",
  "/faq"
);

function formatReviewDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function FaqPage() {
  const faqJsonLd = faqPageSchema(faqItems, "/faq");
  const reviewedLabel = formatReviewDate(REGULATORY_LAST_REVIEWED);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title="Common questions, answered directly."
        intro="Practical answers about the product, implementation, security, regulatory boundary, commercial path, and procurement — not legal or regulatory advice."
      />

      <Section spacing="compact" surface="paper">
        <Reveal className="max-w-2xl mb-6">
          <p className="text-[13px] font-mono text-structural mb-6">Last reviewed: {reviewedLabel}</p>
          <Eyebrow>Categories</Eyebrow>
          <p className="text-[14.5px] text-structural leading-relaxed">
            Jump to a topic. Every answer below is also included in the page FAQ schema for discoverability.
          </p>
        </Reveal>
        <nav aria-label="FAQ categories" className="flex flex-wrap gap-2">
          {FAQ_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#faq-${cat.id}`}
              className="rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-[13px] font-medium text-navy hover:border-ocean/40 hover:text-ocean"
            >
              {cat.label}
            </a>
          ))}
        </nav>
      </Section>

      <Section>
        <BoundaryPanel className="max-w-2xl mb-10" />
        <div className="space-y-14">
          {FAQ_CATEGORIES.map((cat) => {
            const items = faqItemsByCategory(cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id} id={`faq-${cat.id}`}>
                <Reveal className="mb-5 max-w-2xl">
                  <Eyebrow>{cat.label}</Eyebrow>
                  <h2 className="text-[22px] sm:text-[26px] leading-[1.16] mb-2">{cat.label}</h2>
                  <p className="text-[14px] text-structural leading-relaxed">{cat.summary}</p>
                </Reveal>
                <div className="max-w-2xl">
                  <FaqAccordion
                    idPrefix={`faq-${cat.id}`}
                    defaultOpen={0}
                    items={items.map(({ question, answer }) => ({ question, answer }))}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal>
          <div className="premium-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Still have questions?</Eyebrow>
              <h2 className="text-[22px] sm:text-[26px] leading-[1.16] mb-2">Talk with CertaMaris.</h2>
              <p className="text-[14.5px] text-structural leading-relaxed">
                Request a demo or readiness conversation. Submit your details and we will contact you to arrange a
                suitable time.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button href="/contact?intent=demo">{PRIMARY_CTA_LABEL}</Button>
              <Button href="/pricing" variant="secondary">
                View packages
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
