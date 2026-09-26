"use client";

import { AssuranceHelix } from "@/components/AssuranceHelix";
import { Button } from "@/components/Button";
import { personaHomeCopy, usePersonaSelection } from "@/components/PersonaEntry";
import { SampleRecordExplorer } from "@/components/SampleRecordExplorer";
import {
  DEMO_TOUR_HREF,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
} from "@/lib/constants";

/**
 * First-viewport hero: one outcome idea, two actions, and the Assurance Helix
 * product-proof exhibit. The sample-record explorer sits just below the fold.
 */
export function HomeHero() {
  const { persona } = usePersonaSelection();
  const copy = personaHomeCopy(persona);
  const demoHref = persona
    ? `${DEMO_TOUR_HREF}?persona=${persona.id}#scrub-tour`
    : `${DEMO_TOUR_HREF}#scrub-tour`;
  const targetHeadline = "Know readiness before survey — across every vessel.";

  return (
    <>
      <section className="hero-section landing-hero relative" aria-labelledby="hero-title">
        <div className="shell relative z-10 py-10 sm:py-12 lg:py-12">
          <div className="hero-product-grid">
            <div className="hero-copy-block min-w-0">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0e5a8a]">
                {copy.ledger}
              </p>
              <h1 id="hero-title" className="hero-display mt-4 max-w-[26ch]">
                {copy.headline === targetHeadline ? (
                  <>
                    Know readiness
                    <br />
                    before survey —
                    <br />
                    across every vessel.
                  </>
                ) : (
                  copy.headline
                )}
              </h1>
              <p className="mt-5 max-w-[34rem] text-[17px] font-medium leading-[1.55] text-navy sm:text-[18px]">
                {copy.support}
              </p>

              <div className="hero-cta-row mt-7">
                <Button href={PRIMARY_CTA_HREF} className="w-full sm:w-auto">
                  {persona ? copy.ctaHint : PRIMARY_CTA_LABEL}
                </Button>
                <Button href={demoHref} variant="secondary" className="w-full sm:w-auto">
                  See the product
                </Button>
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-structural">
                <a href="#sample-record" className="font-semibold text-ocean hover:underline">
                  Inspect a sample record
                </a>
                <span aria-hidden="true"> · </span>
                labeled demo data, not a live tenant
              </p>
            </div>

            <div className="hero-product-plane min-w-0">
              <AssuranceHelix />
            </div>
          </div>
        </div>
      </section>

      <section
        id="sample-record"
        className="hero-sample-plane scroll-mt-28 border-b border-navy/10 bg-paper/80"
        aria-labelledby="sample-record-title"
      >
        <div className="shell py-12 sm:py-14">
          <div className="mb-6 max-w-2xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean">
              Sample record · demo data
            </p>
            <h2 id="sample-record-title" className="mt-2 text-[1.35rem] font-semibold tracking-tight text-navy sm:text-[1.5rem]">
              Inspect one vessel record end to end
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-structural">
              Follow a labeled sample chain from requirement to released package — the same object
              model behind the readiness surface above.
            </p>
          </div>
          <SampleRecordExplorer
            key={copy.sampleRecordId}
            initialId={copy.sampleRecordId}
            className="hero-sample-record"
          />
        </div>
      </section>
    </>
  );
}
