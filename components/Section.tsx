import type { ElementType, ReactNode } from "react";

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
    surface === "paper" ? "bg-paper" : surface === "navy" ? "bg-navy text-white" : "bg-white";
  const spacingClass =
    spacing === "compact" ? "section-y-compact" : spacing === "tight" ? "section-y-tight" : "section-y";
  return (
    <Tag id={id} className={`${spacingClass} ${surfaceClass} ${className}`}>
      <div className="shell">{children}</div>
    </Tag>
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
