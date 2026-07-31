import type { ReactNode } from "react";

export type LiquidGlassVariant = "subtle" | "default" | "strong" | "interactive" | "accent" | "dark";

/** Intrinsic tags only — avoids unsafe ElementType without polymorphic prop typing. */
export type LiquidGlassTag = "div" | "article" | "section" | "aside" | "li" | "button";

type LiquidGlassProps = {
  children: ReactNode;
  variant?: LiquidGlassVariant;
  className?: string;
  as?: LiquidGlassTag;
  padding?: "none" | "sm" | "md" | "lg";
  /** When true and variant is default-like, adds interactive surface styles via CSS. */
  interactive?: boolean;
};

const paddingClass: Record<NonNullable<LiquidGlassProps["padding"]>, string> = {
  none: "lg-pad-none",
  sm: "lg-pad-sm",
  md: "lg-pad-md",
  lg: "lg-pad-lg",
};

function resolveVariantClass(variant: LiquidGlassVariant, interactive: boolean): string {
  // Explicit material variants win over the interactive flag (flag only augments default).
  if (variant === "subtle") return "liquid-glass--subtle";
  if (variant === "strong") return "liquid-glass--strong";
  if (variant === "accent") return "liquid-glass--accent";
  if (variant === "dark") return "liquid-glass--dark";
  if (variant === "interactive" || interactive) return "liquid-glass--interactive";
  return "liquid-glass--default";
}

/**
 * Reusable Liquid Glass material — translucent frosted surface over the Pixel Grid.
 * Visual language only; no third-party Liquid Glass runtime.
 */
export function LiquidGlass({
  children,
  variant = "default",
  className = "",
  as: Tag = "div",
  padding = "md",
  interactive = false,
}: LiquidGlassProps) {
  const variantClass = resolveVariantClass(variant, interactive);

  return (
    <Tag className={`liquid-glass ${variantClass} ${paddingClass[padding]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
