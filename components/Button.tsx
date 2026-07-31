import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-semibold shadow-[0_8px_20px_rgba(11,42,74,0.06)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-ocean";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-[#1478B8] text-white hover:bg-[#0f639a]",
  secondary: "border border-navy/25 bg-white text-navy hover:border-navy hover:bg-paper",
  ghost: "text-navy hover:text-ocean",
};

export function Button({ href, children, variant = "primary", className = "", external = false }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
