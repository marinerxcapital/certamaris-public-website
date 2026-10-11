"use client";

import { Button } from "@/components/Button";
import { HeroVideo } from "@/components/HeroVideo";
import { personaHomeCopy, usePersonaSelection } from "@/components/PersonaEntry";
import {
  DEMO_TOUR_HREF,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
} from "@/lib/constants";

/**
 * Landing-page first screen.
 *
 * Runs directly on the sitewide Pixel Grid (components/PixelGridBackground.tsx):
 * category label, headline, supporting line, two actions and the sample-record
 * anchor on the left; one restrained panel holding the approved product demo
 * video on the right.
 *
 * The `#sample-record` explorer lives in components/HomeSampleRecord.tsx, one
 * band below.
 */
export function HomeHero() {
  const { persona } = usePersonaSelection();
  const copy = personaHomeCopy(persona);
  const demoHref = persona
    ? `${DEMO_TOUR_HREF}?persona=${persona.id}#scrub-tour`
    : `${DEMO_TOUR_HREF}#scrub-tour`;

  return (
    <section className="hero-section landing-hero relative" aria-labelledby="hero-title">
      <div className="shell relative z-10 py-12 sm:py-14 lg:py-16">
        <div className="hero-product-grid">
          <div className="hero-copy-block min-w-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0e5a8a]">
              {copy.ledger}
            </p>
            <h1 id="hero-title" className="hero-display mt-4 max-w-[22ch]">
              {copy.headline}
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
              Labeled demo data, not a live tenant.
            </p>
          </div>

          <div className="hero-product-plane min-w-0">
            <HeroVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
