"use client";

import { Button } from "@/components/Button";
import { LiquidGlass } from "@/components/LiquidGlass";
import { PersonaPicker, personaHomeCopy, usePersonaSelection } from "@/components/PersonaEntry";
import { ProductScreenFrame } from "@/components/ProductScreens";
import { SampleRecordExplorer } from "@/components/SampleRecordExplorer";
import {
  DEMO_TOUR_HREF,
  DEMO_TOUR_LABEL,
  PRIMARY_CTA_HREF,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
} from "@/lib/constants";
import { productProofScreens } from "@/lib/product-screens";

const heroScreen = productProofScreens.executiveReporting;

/**
 * Product-led homepage hero: Executive Readiness as the dominant proof window,
 * persona gate kept accessible but quieter, sample-record explorer secondary.
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
        <div className="hero-product-grid">
          <div className="hero-copy-block min-w-0">
            <p className="brand-hero-mark">CertaMaris</p>
            <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0e5a8a]">
              {copy.ledger}
            </p>
            <h1 id="hero-title" className="hero-display mt-4 max-w-[18ch]">
              {copy.headline}
            </h1>
            <p className="mt-5 max-w-[34rem] text-[17px] font-medium leading-[1.55] text-navy/82 sm:text-[18px]">
              {copy.support}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button href={PRIMARY_CTA_HREF} className="w-full sm:w-auto">
                {copy.ctaHint}
              </Button>
              <Button href={SECONDARY_CTA_HREF} variant="secondary" className="w-full sm:w-auto">
                {SECONDARY_CTA_LABEL}
              </Button>
              <Button href={demoHref} variant="ghost" className="w-full sm:w-auto">
                {DEMO_TOUR_LABEL}
              </Button>
            </div>

            <div className="mt-5 grid max-w-xl gap-2 text-left sm:grid-cols-3">
              <a
                href="#sample-record"
                className="rounded-md border border-navy/10 bg-white/70 px-3 py-2.5 transition hover:border-ocean/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              >
                <span className="block text-[13px] font-semibold text-navy">Inspect proof</span>
                <span className="mt-1 block text-[12px] leading-5 text-structural">See one vessel record</span>
              </a>
              <a
                href="/pricing"
                className="rounded-md border border-navy/10 bg-white/70 px-3 py-2.5 transition hover:border-ocean/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              >
                <span className="block text-[13px] font-semibold text-navy">Compare packages</span>
                <span className="mt-1 block text-[12px] leading-5 text-structural">Map trial to fleet rollout</span>
              </a>
              <a
                href="#buyer-diligence"
                className="rounded-md border border-navy/10 bg-white/70 px-3 py-2.5 transition hover:border-ocean/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              >
                <span className="block text-[13px] font-semibold text-navy">Diligence faster</span>
                <span className="mt-1 block text-[12px] leading-5 text-structural">Open trust and procurement</span>
              </a>
            </div>

            <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-navy/70">
              Workflow scope includes work aligned to IMO MSC.428(98) and IACS UR E26/E27. Official texts
              control; CertaMaris does not certify compliance or guarantee survey outcomes.
            </p>

            <div className="mt-7 max-w-xl">
              {ready ? (
                <PersonaPicker
                  variant="compact"
                  selectedId={persona?.id ?? null}
                  onSelect={select}
                  onClear={persona ? clear : undefined}
                />
              ) : (
                <div
                  className="persona-picker persona-picker--compact persona-picker--placeholder"
                  aria-hidden="true"
                >
                  <div className="persona-picker-head">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
                      Start as
                    </p>
                  </div>
                  <div className="persona-options persona-options--compact">
                    <span className="persona-option is-ghost">Technical manager / DPA</span>
                    <span className="persona-option is-ghost">Ship owner / operator</span>
                    <span className="persona-option is-ghost">Maritime IT / OT</span>
                    <span className="persona-option is-ghost">Classification / survey</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hero-product-plane min-w-0">
            <LiquidGlass variant="subtle" padding="sm" className="hero-product-glass">
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean">
                Live product surface · demo data
              </p>
              <ProductScreenFrame
                {...heroScreen}
                crop="top"
                priority
                className="hero-executive-frame"
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 48vw, 100vw"
                annotations={[
                  { id: "er-demo", label: "Demo-data boundary visible", x: 48, y: 6 },
                  { id: "er-signal", label: "Readiness signal with source context", x: 28, y: 28 },
                  { id: "er-trace", label: "Assurance record trace", x: 78, y: 42 },
                ]}
              />
            </LiquidGlass>
          </div>
        </div>

        <div id="sample-record" className="hero-sample-plane mt-12 scroll-mt-28 lg:mt-14">
          <div className="mb-4 max-w-2xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean">
              Inspect one record
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-structural">
              Follow a labeled sample chain from requirement to released package — the same object model
              behind the readiness surface above.
            </p>
          </div>
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
