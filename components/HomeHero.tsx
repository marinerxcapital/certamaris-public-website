"use client";

import { Button } from "@/components/Button";
import { PersonaPicker, personaHomeCopy, usePersonaSelection } from "@/components/PersonaEntry";
import { SampleRecordExplorer } from "@/components/SampleRecordExplorer";
import { DEMO_TOUR_HREF, PRIMARY_CTA_HREF } from "@/lib/constants";

/**
 * Compressed homepage hero: brand-first copy, persona gate, and the
 * sample-record explorer as the dominant visual (not a side screenshot).
 */
export function HomeHero() {
  const { persona, ready, select, clear } = usePersonaSelection();
  const copy = personaHomeCopy(persona);
  const demoHref = persona
    ? `${DEMO_TOUR_HREF}?persona=${persona.id}#scrub-tour`
    : `${DEMO_TOUR_HREF}#scrub-tour`;

  return (
    <section className="hero-section landing-hero relative" aria-labelledby="hero-title">
      <div className="shell relative z-10 py-14 sm:py-16 lg:py-20">
        <div className="hero-brand-block mx-auto max-w-3xl text-center">
          <p className="brand-hero-mark">CertaMaris</p>
          <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0e5a8a]">
            {copy.ledger}
          </p>
          <h1 id="hero-title" className="hero-display mx-auto mt-4 max-w-[22ch]">
            {copy.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-[36rem] text-[17px] font-medium leading-[1.55] tracking-[-0.01em] text-navy/82 sm:text-[18px]">
            {copy.support}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href={PRIMARY_CTA_HREF} className="w-full sm:w-auto">
              {copy.ctaHint}
            </Button>
            <Button href={demoHref} variant="secondary" className="w-full sm:w-auto">
              Scrub the product tour
            </Button>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-[13px] leading-relaxed text-navy/70">
            Workflow scope includes work aligned to IMO MSC.428(98) and IACS UR E26/E27. Official texts
            control; CertaMaris does not certify compliance or guarantee survey outcomes.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          {ready ? (
            <PersonaPicker
              selectedId={persona?.id ?? null}
              onSelect={select}
              onClear={persona ? clear : undefined}
            />
          ) : (
            <div className="persona-picker persona-picker--placeholder" aria-hidden="true">
              <div className="persona-picker-head">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
                  Start as
                </p>
              </div>
              <div className="persona-options">
                <span className="persona-option is-ghost">Technical manager / DPA</span>
                <span className="persona-option is-ghost">Ship owner / operator</span>
                <span className="persona-option is-ghost">Maritime IT / OT</span>
                <span className="persona-option is-ghost">Classification / survey</span>
              </div>
            </div>
          )}
        </div>

        <div id="sample-record" className="hero-sample-plane mt-10 scroll-mt-28 lg:mt-12">
          <SampleRecordExplorer
            key={copy.sampleRecordId}
            initialId={copy.sampleRecordId}
            className="hero-sample-record"
          />
        </div>
      </div>
    </section>
  );
}
