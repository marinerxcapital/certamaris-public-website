import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import {
  getSolutionPage,
  getSolutionScreen,
  solutionsPages,
} from "@/lib/solutions-audience";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return solutionsPages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) return {};
  return pageMetadata(page.title, page.intro, `/solutions/${page.slug}`);
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) notFound();
  const screen = getSolutionScreen(page);

  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow={page.eyebrow}
        title={page.headline}
        intro={page.intro}
        aside={
          screen ? (
            <div className="w-full max-w-[min(380px,100%)] lg:w-[380px]">
              <ProductScreenFrame {...screen} priority sizes="(min-width: 1024px) 380px, 80vw" />
            </div>
          ) : null
        }
      />

      <Section spacing="compact">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <Eyebrow>Target buyer</Eyebrow>
            <p className="text-[15.5px] text-navy/90 leading-relaxed mb-6">{page.buyer}</p>
            <Eyebrow>Operational problem</Eyebrow>
            <p className="text-[15.5px] text-structural leading-relaxed mb-4">{page.problem}</p>
            <p className="text-[14.5px] text-structural leading-relaxed">{page.currentPain}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Future-state workflow</Eyebrow>
            <ol className="space-y-2.5">
              {page.futureWorkflow.map((step, i) => (
                <li key={step} className="flex gap-2.5 text-[14.5px] text-navy/85">
                  <span className="font-mono text-ocean text-[12px] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 className="text-[26px] sm:text-[32px] leading-[1.14]">Product capabilities for this solution</h2>
        </Reveal>
        <ul className="grid sm:grid-cols-2 gap-3">
          {page.capabilities.map((cap) => (
            <li key={cap} className="liquid-glass liquid-glass--subtle lg-pad-sm text-[14.5px] text-navy/85">
              {cap}
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="compact">
        <div className="grid md:grid-cols-3 gap-8">
          <Reveal>
            <Eyebrow>Inputs</Eyebrow>
            <ul className="mt-3 space-y-2">
              {page.inputs.map((item) => (
                <li key={item} className="text-[14px] text-structural leading-relaxed">
                  — {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.04}>
            <Eyebrow>Outputs</Eyebrow>
            <ul className="mt-3 space-y-2">
              {page.outputs.map((item) => (
                <li key={item} className="text-[14px] text-structural leading-relaxed">
                  — {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow>Implementation</Eyebrow>
            <ul className="mt-3 space-y-2">
              {page.implementation.map((item) => (
                <li key={item} className="text-[14px] text-structural leading-relaxed">
                  — {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="max-w-3xl">
          <Eyebrow>Regulatory context</Eyebrow>
          <p className="text-[15px] text-structural leading-relaxed mb-6">{page.regulatoryContext}</p>
          <Eyebrow>Limitations</Eyebrow>
          <ul className="mt-3 space-y-2">
            {page.limitations.map((item) => (
              <li key={item} className="text-[14.5px] text-navy/80 leading-relaxed">
                — {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {page.faqs.length > 0 && (
        <Section spacing="compact">
          <Reveal className="mb-6">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="text-[24px] sm:text-[30px] leading-[1.14]">Common questions</h2>
          </Reveal>
          <FaqAccordion items={page.faqs} />
        </Section>
      )}

      <Section spacing="compact">
        <div className="flex flex-wrap gap-3">
          {page.related.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border border-navy/15 bg-white/70 px-4 py-2 text-[14px] font-semibold text-navy hover:border-ocean/40 hover:text-ocean"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Section>

      <Section spacing="tight">
        <Reveal>
          <BoundaryPanel className="max-w-3xl mb-8" />
        </Reveal>
        <Reveal delay={0.05} className="flex flex-wrap gap-3">
          <Button href="/contact?intent=demo">Request a demo</Button>
          <Button href="/solutions" variant="secondary">
            All solutions
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
