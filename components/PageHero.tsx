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
    <section className="page-hero-section page-hero-polished relative isolate overflow-hidden border-b" style={{ borderColor: "var(--hairline)" }}>
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
          {aside ? (
            <div>{aside}</div>
          ) : (
            <div className="page-hero-signal hidden w-[min(360px,32vw)] lg:block" aria-hidden="true">
              <div className="flex items-center justify-between gap-3 border-b border-navy/10 pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-structural">Assurance record</span>
                <span className="h-2 w-2 rounded-full bg-ocean" />
              </div>
              <div className="mt-4 grid gap-2">
                {["Requirement", "Control", "Evidence", "Decision"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-sm border border-navy/10 bg-white/72 px-3 py-2">
                    <span className="text-[13px] font-semibold text-navy">{item}</span>
                    <span className="font-mono text-[11px] text-ocean">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
