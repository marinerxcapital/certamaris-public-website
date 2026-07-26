import type { ReactNode } from "react";
import { Eyebrow } from "@/components/Section";

export function PageHero({
  eyebrow,
  title,
  intro,
  aside,
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
    <section className="bg-paper border-b" style={{ borderColor: "var(--hairline)" }}>
      <div className={`shell ${elevated ? "py-20 sm:py-24" : "py-16 sm:py-20"}`}>
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div className="max-w-2xl">
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
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
