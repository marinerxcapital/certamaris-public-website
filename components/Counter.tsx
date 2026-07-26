"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function Counter({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = usePrefersReducedMotion();
  const count = useMotionValue(reduced ? to : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      if (reduced) {
        count.set(to);
      } else {
        const controls = animate(count, to, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
        return () => controls.stop();
      }
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
