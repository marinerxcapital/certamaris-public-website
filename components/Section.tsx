import type { ElementType, ReactNode } from "react";

export function Section({
  children,
  id,
  surface = "page",
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  id?: string;
  surface?: "page" | "paper" | "navy";
  className?: string;
  as?: ElementType;
}) {
  const surfaceClass =
    surface === "paper" ? "bg-paper" : surface === "navy" ? "bg-navy text-white" : "bg-white";
  return (
    <Tag id={id} className={`section-y ${surfaceClass} ${className}`}>
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
      className={`font-mono text-[12px] uppercase tracking-[0.12em] ${
        inverse ? "text-ocean-light" : "text-ocean"
      } ${className}`}
    >
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
