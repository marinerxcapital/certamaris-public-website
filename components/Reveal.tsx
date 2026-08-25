"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Progressive-enhancement reveal.
 *
 * Hard guarantees:
 * - First paint / SSR / no-JS: plain element, full opacity, no transform.
 * - prefers-reduced-motion: same static path.
 * - Hydrated motion path toggles classes only; it does not depend on inline styles.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("js");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-60px 0px" }
    );
    io.observe(el);
    const fallback = window.setTimeout(() => setVisible(true), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [mounted, reduced]);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`${className} reveal${visible ? " reveal--shown" : ""}`.trim()}
      data-reveal-delay={delay > 0 ? "delayed" : undefined}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 0.05,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("js");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-60px 0px" }
    );
    io.observe(el);
    const fallback = window.setTimeout(() => setVisible(true), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [mounted, reduced]);

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div
      ref={ref}
      className={`${className} reveal-group${visible ? " reveal-group--shown" : ""}`.trim()}
    >
      {childArray.map((child, index) => (
        <div key={index} className="reveal-group-item" data-reveal-stagger={stagger > 0 ? "true" : undefined}>
          {child}
        </div>
      ))}
    </div>
  );
}
