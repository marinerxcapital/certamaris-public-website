"use client";

import { AssuranceHelix } from "@/components/AssuranceHelix";
import { Button } from "@/components/Button";
import { HeroVesselFilm } from "@/components/HeroVesselFilm";
import { personaHomeCopy, usePersonaSelection } from "@/components/PersonaEntry";
import {
  DEMO_TOUR_HREF,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
} from "@/lib/constants";

/**
 * Landing-page first screen.
 *
 * Band 1 — cinematic vessel footage with the category statement, two actions,
 * and a factual coverage strip. The footage is the signature visual; the copy
 * column stays inside a corrected navy scrim so contrast never depends on which
 * frame happens to be showing.
 *
 * Band 2 — the Assurance Helix live product surface, so the product proof is
 * still the first thing below the fold on every viewport.
 */

const HERO_COVERAGE = [
  "IMO MSC.428(98) and IACS UR E26/E27 workflows",
  "Evidence-to-package assurance record",
  "Fleet, vessel, and shoreside operations",
];

export function HomeHero() {
  const { persona } = usePersonaSelection();
  const copy = personaHomeCopy(persona);
  const demoHref = persona
    ? `${DEMO_TOUR_HREF}?persona=${persona.id}#scrub-tour`
    : `${DEMO_TOUR_HREF}#scrub-tour`;

  return (
    <>
      <section className="hero-cinematic" aria-labelledby="hero-title">
        <div className="hero-cinematic__media">
          <HeroVesselFilm />
        </div>
        <p className="sr-only">
          Background footage: an aerial view of a laden tanker under way in open water.
        </p>

        <div className="hero-cinematic__band">
          <div className="shell hero-cinematic__inner">
            <div className="hero-cinematic__copy">
              <p className="hero-cinematic__kicker">{copy.ledger}</p>
              <h1 id="hero-title" className="hero-cinematic__display">
                {copy.headline}
              </h1>
              <p className="hero-cinematic__support">{copy.support}</p>

              <div className="hero-cta-row">
                <Button href={PRIMARY_CTA_HREF} variant="inverse" className="w-full sm:w-auto">
                  {persona ? copy.ctaHint : PRIMARY_CTA_LABEL}
                </Button>
                <Button
                  href={demoHref}
                  variant="outline-inverse"
                  className="w-full sm:w-auto"
                >
                  See the product
                </Button>
              </div>

              <p className="hero-cinematic__note">
                <a href="#sample-record" className="hero-cinematic__link">
                  Inspect a sample record
                </a>
                <span aria-hidden="true"> · </span>
                labeled demo data, not a live tenant
              </p>
            </div>
          </div>

          <div className="hero-cinematic__coverage">
            <div className="shell">
              <ul className="hero-cinematic__coverage-list">
                {HERO_COVERAGE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-assurance" aria-labelledby="hero-assurance-title">
        <div className="shell py-12 sm:py-14">
          <div className="hero-assurance__grid">
            <div className="hero-assurance__copy">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0e5a8a]">
                The assurance record
              </p>
              <h2
                id="hero-assurance-title"
                className="mt-2 text-[1.4rem] font-semibold tracking-tight text-navy sm:text-[1.6rem]"
              >
                Requirement to released package, on one controlled chain.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-structural">
                Each stage keeps its owner, custodian, evidence, and reviewer decision, so fleet
                readiness is traceable instead of reconstructed.
              </p>
              <p className="mt-5 text-[13px] leading-relaxed text-structural">
                Illustrative demo identifiers shown — not live tenant data.
              </p>
              <a
                href="/platform"
                className="mt-4 inline-block text-[14px] font-semibold text-ocean hover:underline"
              >
                How the platform works
              </a>
            </div>
            <div className="hero-assurance__plane">
              <AssuranceHelix />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
