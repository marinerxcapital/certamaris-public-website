import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { PRIMARY_CTA_LABEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { industries } from "@/lib/solutions-industries";

export const metadata = pageMetadata(
  "Industries",
  "How ship owners, technical managers, cybersecurity teams, classification societies, and P&I clubs each use CertaMaris.",
  "/industries"
);

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow="Industries"
        title="Built for every seat in the maritime compliance chain."
        intro="Different roles need different views of the same underlying record. Here is how each stakeholder actually uses CertaMaris."
      />

      <nav aria-label="Jump to industry" className="bg-white border-b" style={{ borderColor: "var(--hairline)" }}>
        <div className="shell py-4 flex flex-wrap gap-x-6 gap-y-2">
          {industries.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-[14px] font-medium text-navy hover:text-ocean transition-colors">
              {item.title}
            </a>
          ))}
        </div>
      </nav>

      {industries.map((item, index) => (
        <Section key={item.id} id={item.id} surface={index % 2 ? "paper" : "page"} spacing="compact">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14">
            <Reveal>
              <Eyebrow>{item.eyebrow}</Eyebrow>
              <h2 className="text-[27px] sm:text-[32px] leading-[1.15] mb-4">{item.headline}</h2>
              <Button href="/contact" variant="secondary" className="mt-2">
                {PRIMARY_CTA_LABEL}
              </Button>
            </Reveal>
            <Reveal delay={0.06}>
              {item.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[15.5px] text-structural leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mt-6 mb-2">Priorities</p>
              <ul className="space-y-2.5">
                {item.priorities.map((priority) => (
                  <li key={priority} className="flex gap-2.5 text-[14.5px] text-navy/85">
                    <span aria-hidden="true" className="text-ocean">
                      —
                    </span>
                    {priority}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      ))}
    </>
  );
}
