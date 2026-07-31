import { BoundaryPanel } from "@/components/BoundaryPanel";
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
        title="Different roles, one controlled record."
        intro="Owners, DPAs, IT/OT teams, surveyors, and insurers each need a different cut of the same underlying work. Here is what each seat uses the record for — and what it deliberately does not replace."
      />

      <nav aria-label="Jump to industry" className="jump-nav border-b" style={{ borderColor: "var(--hairline)" }}>
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
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14">
            <Reveal>
              <Eyebrow>{item.eyebrow}</Eyebrow>
              <h2 className="text-[27px] sm:text-[32px] leading-[1.15] mb-4">{item.headline}</h2>
              {item.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[15.5px] text-structural leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.06} className="space-y-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mb-2">Job to be done</p>
                <p className="text-[15px] text-navy/90 leading-relaxed">{item.jtbd}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mb-2">Artifacts</p>
                <ul className="space-y-2.5">
                  {item.artifacts.map((artifact) => (
                    <li key={artifact} className="flex gap-2.5 text-[14.5px] text-navy/85">
                      <span aria-hidden="true" className="text-ocean">
                        —
                      </span>
                      {artifact}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mb-2">Handoff</p>
                <p className="text-[14.5px] text-structural leading-relaxed">{item.handoff}</p>
              </div>
              <div className="liquid-glass liquid-glass--subtle lg-pad-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mb-1.5">Does not replace</p>
                <p className="text-[14px] text-navy/80 leading-relaxed">{item.doesNotReplace}</p>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.06}>
          <Button href="/contact">{PRIMARY_CTA_LABEL}</Button>
        </Reveal>
      </Section>
    </>
  );
}
