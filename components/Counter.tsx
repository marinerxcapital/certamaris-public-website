"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function Counter({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = usePrefersReducedMotion();
  // Initial value is the real target, not 0: this is statically exported, so
  // whatever renders here is what crawlers, no-JS clients, and the first paint show.
  const count = useMotionValue(to);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView && !reduced) {
      count.set(0);
      const controls = animate(count, to, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
      return () => controls.stop();
    }
  }, [inView, to, reduced, count]);

  return (
    <div ref={ref}>
      <p className="font-display font-bold text-[40px] md:text-[48px] text-navy leading-none">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </p>
      <p className="text-[14px] text-structural mt-2">{label}</p>
    </div>
  );
}
