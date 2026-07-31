"use client";

import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = usePrefersReducedMotion();

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="premium-card px-5 py-4">
            <h3>
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 text-left rounded-sm"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="text-[16px] font-medium text-navy">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-ocean ${reduced ? "" : "transition-transform duration-150"} ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-trigger-${index}`}
                className="mt-3 text-[14.5px] text-structural leading-relaxed max-w-2xl"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
