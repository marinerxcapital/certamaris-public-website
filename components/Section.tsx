import { createElement, type ElementType, type ReactNode } from "react";

export function Section({
  children,
  id,
  surface = "page",
  spacing = "standard",
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  id?: string;
  surface?: "page" | "paper" | "navy";
  spacing?: "standard" | "compact" | "tight";
  className?: string;
  as?: ElementType;
}) {
  const surfaceClass =
    surface === "paper"
      ? "section-surface section-surface--paper"
      : surface === "navy"
        ? "section-surface section-surface--navy text-white"
        : "section-surface section-surface--page";
  const spacingClass =
    spacing === "compact" ? "section-y-compact" : spacing === "tight" ? "section-y-tight" : "section-y";
  return createElement(
    Tag,
    { id, className: `${spacingClass} ${surfaceClass} ${className}` },
    <div className="shell relative z-10">{children}</div>
  );
}

export function ReferenceLabel({
  children,
  inverse = false,
  className = "",
}: {
  children: ReactNode;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] ${
        inverse ? "text-ocean-light" : "text-ocean"
      } ${className}`}
    >
      <span aria-hidden="true" className="h-px w-3 shrink-0 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <ReferenceLabel inverse={inverse} className="mb-3">
      {children}
    </ReferenceLabel>
  );
}
