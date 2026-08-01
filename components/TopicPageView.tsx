import Link from "next/link";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import type { TopicPage } from "@/lib/topics";
import { breadcrumbListSchema, faqPageSchema, webPageSchema } from "@/lib/seo-schema";

export function TopicPageView({ topic }: { topic: TopicPage }) {
  const path = `/topics/${topic.slug}`;
  const schemas = [
    webPageSchema({ title: topic.title, description: topic.metaDescription, path }),
    breadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Topics", path: "/topics" },
      { name: topic.title, path },
    ]),
  ];
  if (topic.faqs?.length) {
    schemas.push(faqPageSchema(topic.faqs, path));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <PageHero eyebrow={topic.eyebrow} title={topic.title} intro={topic.intro} />

      <Section>
        <div className="max-w-2xl space-y-10">
          {topic.sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="text-[22px] sm:text-[25px] leading-tight mb-3">{section.heading}</h2>
              <p className="text-[15.5px] text-structural leading-relaxed">{section.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {topic.faqs && topic.faqs.length > 0 && (
        <Section surface="paper" spacing="compact">
          <Reveal className="max-w-2xl mb-8">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-[28px] leading-[1.14]">Common questions</h2>
          </Reveal>
          <div className="max-w-2xl space-y-5">
            {topic.faqs.map((faq) => (
              <Reveal key={faq.question}>
                <div className="premium-card p-5">
                  <h3 className="text-[15.5px] font-semibold text-navy mb-2">{faq.question}</h3>
                  <p className="text-[14.5px] text-structural leading-relaxed">{faq.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section spacing="compact">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Eyebrow>Resources</Eyebrow>
            <ul className="mt-3 space-y-2">
              {topic.relatedResources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14.5px] font-medium text-ocean hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {topic.relatedCompliance && topic.relatedCompliance.length > 0 && (
            <div>
              <Eyebrow>Compliance</Eyebrow>
              <ul className="mt-3 space-y-2">
                {topic.relatedCompliance.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[14.5px] font-medium text-ocean hover:underline">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <Eyebrow>Product</Eyebrow>
            <ul className="mt-3 space-y-2">
              {topic.productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14.5px] font-medium text-ocean hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section spacing="tight">
        <BoundaryPanel className="max-w-3xl" />
      </Section>
    </>
  );
}
