import type { ReactNode } from "react";
import { LedgerRoute } from "@/components/LedgerRoute";
import { Eyebrow } from "@/components/Section";

export function PageHero({
  eyebrow,
  title,
  intro,
  aside = null,
  emphasis = "standard",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
  /**
   * "elevated" pushes the H1 scale/spacing toward the homepage hero's
   * redesigned typographic language (bigger, tighter, more breathing
   * room) for section-landing pages called out in the redesign brief.
   * Default "standard" preserves the original scale for pages outside
   * that scope (legal, FAQ, resources, contact, about).
   */
  emphasis?: "standard" | "elevated";
}) {
  const elevated = emphasis === "elevated";
  return (
    <section
      className="page-hero-section page-hero-polished relative overflow-visible border-b"
      style={{ borderColor: "var(--hairline)" }}
    >
      <div className={`shell relative z-10 ${elevated ? "py-20 sm:py-24" : "py-16 sm:py-20"}`}>
        <div className={aside ? "grid lg:grid-cols-[1fr_auto] gap-10 items-end" : undefined}>
          <div className="liquid-glass liquid-glass--strong lg-pad-lg max-w-2xl">
            <LedgerRoute />
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1
              className={
                elevated
                  ? "text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.0] tracking-[-0.015em] mb-5"
                  : "text-[34px] sm:text-[44px] leading-[1.08] mb-4"
              }
            >
              {title}
            </h1>
            {intro && <p className="text-[16px] text-structural leading-relaxed max-w-xl">{intro}</p>}
          </div>
          {aside ? <div className="mt-6 max-w-full lg:mt-0">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
