"use client";

import { SampleRecordExplorer } from "@/components/SampleRecordExplorer";
import { personaHomeCopy, usePersonaSelection } from "@/components/PersonaEntry";
import { AssuranceStepper } from "@/components/AssuranceStepper";

/**
 * Homepage sample-record plane. Kept as its own client island so the persona
 * selection hook stays out of the server-rendered page shell.
 */
export function HomeSampleRecord() {
  const { persona } = usePersonaSelection();
  const copy = personaHomeCopy(persona);

  return (
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
          <h2
            id="sample-record-title"
            className="mt-2 text-[1.35rem] font-semibold tracking-tight text-navy sm:text-[1.5rem]"
          >
            Inspect one vessel record end to end
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-structural">
            Follow a labeled sample chain from requirement to released package — the same object
            model behind the readiness surface above.
          </p>
          <a
            href="#sample-record"
            className="mt-3 inline-block text-[14px] font-semibold text-ocean hover:underline"
          >
            Inspect a sample record
          </a>
        </div>
        <AssuranceStepper variant="abbreviated" linkHref="/platform" className="mb-5" />
        <SampleRecordExplorer
          key={copy.sampleRecordId}
          initialId={copy.sampleRecordId}
          className="hero-sample-record"
          showObjectTabs={false}
        />
      </div>
    </section>
  );
}
