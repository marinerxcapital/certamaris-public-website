import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryPanel } from "@/components/BoundaryPanel";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { RoleRecordPath } from "@/components/RoleRecordPath";
import { Eyebrow, Section } from "@/components/Section";
import { audiencePages, getAudiencePage } from "@/lib/solutions-audience";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return audiencePages.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getAudiencePage(slug);
  if (!page) return {};
  return pageMetadata(page.title, page.intro, `/who-we-serve/${page.slug}`);
}

export default async function AudienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getAudiencePage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero emphasis="elevated" eyebrow={page.eyebrow} title={page.headline} intro={page.intro} />

      <Section spacing="compact">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <Eyebrow>Responsibilities</Eyebrow>
            <ul className="mt-3 space-y-2">
              {page.responsibilities.map((item) => (
                <li key={item} className="flex gap-2 text-[14.5px] text-navy/85">
                  <span className="text-ocean" aria-hidden>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Eyebrow>Common problems</Eyebrow>
              <ul className="mt-3 space-y-2">
                {page.problems.map((item) => (
                  <li key={item} className="flex gap-2 text-[14.5px] text-navy/85">
                    <span className="text-ocean" aria-hidden>
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>How CertaMaris supports the role</Eyebrow>
            <ul className="mt-3 space-y-2">
              {page.howSupports.map((item) => (
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
        <Reveal>
          <RoleRecordPath slug={page.slug} />
        </Reveal>
      </Section>

      <Section spacing="compact">
        <Reveal>
          <div className="liquid-glass liquid-glass--strong lg-pad-md grid gap-6 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] md:items-start">
            <div>
              <Eyebrow>{page.roleArtifact.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-[24px] leading-[1.14] text-navy sm:text-[28px]">
                {page.roleArtifact.title}
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-structural">{page.roleArtifact.body}</p>
            </div>
            <ul className="grid gap-3">
              {page.roleArtifact.details.map((item, index) => (
                <li key={item} className="rounded-md border border-navy/10 bg-white/74 p-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ocean">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-[14px] leading-relaxed text-structural">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section surface="paper" spacing="compact">
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <Eyebrow>What this role can see</Eyebrow>
            <ul className="mt-3 space-y-2">
              {page.canSee.map((item) => (
                <li key={item} className="text-[14.5px] text-structural leading-relaxed">
                  — {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>What this role can do</Eyebrow>
            <ul className="mt-3 space-y-2">
              {page.canDo.map((item) => (
                <li key={item} className="text-[14.5px] text-structural leading-relaxed">
                  — {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section spacing="compact">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="liquid-glass liquid-glass--subtle lg-pad-md">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mb-2">
                Does not replace
              </p>
              <p className="text-[14.5px] text-navy/80 leading-relaxed">{page.doesNotReplace}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>Implementation involvement</Eyebrow>
            <p className="text-[15px] text-structural leading-relaxed mb-6">{page.implementationInvolvement}</p>
            <Eyebrow>Outputs</Eyebrow>
            <ul className="mt-3 space-y-2">
              {page.outputs.map((item) => (
                <li key={item} className="text-[14.5px] text-navy/85">
                  — {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {page.faqs.length > 0 && (
        <Section surface="paper" spacing="compact">
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
          <Button href="/who-we-serve" variant="secondary">
            Who we serve
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
