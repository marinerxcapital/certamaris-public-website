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
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-navy text-white hover:bg-[#0e3a68]",
  secondary:
    "border border-navy/20 bg-white/80 text-navy backdrop-blur-sm hover:border-navy/40 hover:bg-white/90",
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
