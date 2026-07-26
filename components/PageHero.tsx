import type { ReactNode } from "react";
import { Eyebrow } from "@/components/Section";

export function PageHero({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="bg-paper border-b" style={{ borderColor: "var(--hairline)" }}>
      <div className="shell py-16 sm:py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-[34px] sm:text-[44px] leading-[1.08] mb-4">{title}</h1>
            {intro && <p className="text-[16px] text-structural leading-relaxed max-w-xl">{intro}</p>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
