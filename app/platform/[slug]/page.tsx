import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import {
  getProductModule,
  getProductScreen,
  INTEGRATION_AVAILABILITY_BADGE,
  integrationsCatalogue,
  MATURITY_BADGE,
  productModules,
} from "@/lib/product-hierarchy";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return productModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getProductModule(slug);
  if (!mod) return {};
  return pageMetadata(mod.title, mod.intro, `/platform/${mod.slug}`);
}

export default async function PlatformModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = getProductModule(slug);
  if (!mod) notFound();

  const maturity = MATURITY_BADGE[mod.maturity];
  const screen = getProductScreen(mod);

  return (
    <>
      <PageHero
        emphasis="elevated"
        eyebrow={mod.eyebrow}
        title={mod.headline}
        intro={mod.intro}
        aside={
          screen ? (
            <div className="w-full max-w-[min(380px,100%)] lg:w-[380px]">
              <ProductScreenFrame {...screen} priority sizes="(min-width: 1024px) 380px, 80vw" />
            </div>
          ) : null
        }
      />

      <Section spacing="compact">
        <Reveal className="flex flex-wrap items-center gap-3 mb-8">
          <StatusBadge status={maturity.badgeStatus} label={maturity.label} />
          <p className="text-[14px] text-structural">
            <span className="font-semibold text-navy">Primary buyers:</span> {mod.buyer}
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <Eyebrow>Operational problem</Eyebrow>
            <p className="text-[15.5px] text-structural leading-relaxed">{mod.problem}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Workflow</Eyebrow>
            <ol className="space-y-2.5">
              {mod.workflow.map((step, i) => (
                <li key={step} className="flex gap-2.5 text-[14.5px] text-navy/85">
                  <span className="font-mono text-ocean text-[12px] shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {mod.slug === "integrations" ? (
        <Section surface="paper" spacing="compact">
          <Reveal className="mb-8 max-w-2xl">
            <Eyebrow>Integration catalogue</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">
              Availability labels — Available, Configurable, Custom, Planned, Not supported
            </h2>
            <p className="mt-4 text-[15px] text-structural leading-relaxed">
              Only verified categories are listed. Live SIEM and maritime ERP connectors are not claimed as standard
              available features.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {integrationsCatalogue.map((item) => {
              const badge = INTEGRATION_AVAILABILITY_BADGE[item.availability];
              return (
                <Reveal key={item.id}>
                  <article className="liquid-glass liquid-glass--subtle lg-pad-md h-full">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-structural mb-2">
                      {item.category}
                    </p>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-[16px] font-semibold">{item.title}</h3>
                      <StatusBadge status={badge.badgeStatus} label={badge.label} />
                    </div>
                    <p className="text-[14px] text-structural leading-relaxed">{item.summary}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Section>
      ) : (
        <Section surface="paper" spacing="compact">
          <Reveal className="mb-8 max-w-2xl">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.14]">What this module covers</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {mod.capabilities.map((cap) => {
              const badge = MATURITY_BADGE[cap.maturity ?? mod.maturity];
              return (
                <Reveal key={cap.title}>
                  <article className="liquid-glass liquid-glass--subtle lg-pad-md h-full">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-[16px] font-semibold">{cap.title}</h3>
                      <StatusBadge status={badge.badgeStatus} label={badge.label} />
                    </div>
                    <p className="text-[14px] text-structural leading-relaxed">{cap.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      <Section spacing="compact">
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <Eyebrow>Inputs</Eyebrow>
            <ul className="mt-3 space-y-2">
              {mod.inputs.map((item) => (
                <li key={item} className="flex gap-2 text-[14.5px] text-navy/85">
                  <span className="text-ocean" aria-hidden>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Outputs</Eyebrow>
            <ul className="mt-3 space-y-2">
              {mod.outputs.map((item) => (
                <li key={item} className="flex gap-2 text-[14.5px] text-navy/85">
                  <span className="text-ocean" aria-hidden>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper" spacing="compact">
        <Reveal className="mb-6 max-w-2xl">
          <Eyebrow>Limitations</Eyebrow>
          <h2 className="text-[24px] sm:text-[30px] leading-[1.14]">Honest boundaries</h2>
        </Reveal>
        <ul className="grid sm:grid-cols-2 gap-3">
          {mod.limitations.map((item) => (
            <li key={item} className="liquid-glass liquid-glass--subtle lg-pad-sm text-[14px] text-navy/80 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {mod.faqs.length > 0 && (
        <Section spacing="compact">
          <Reveal className="mb-6 max-w-2xl">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="text-[24px] sm:text-[30px] leading-[1.14]">Common questions</h2>
          </Reveal>
          <FaqAccordion items={mod.faqs} />
        </Section>
      )}

      <Section spacing="compact">
        <Reveal className="mb-4">
          <Eyebrow>Related</Eyebrow>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {mod.related.map((link) => (
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
          <Button href="/platform" variant="secondary">
            Platform overview
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
