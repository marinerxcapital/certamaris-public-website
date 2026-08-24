import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  className?: string;
  external?: boolean;
};

const base =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 py-2.5 text-[14px] font-semibold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 active:translate-y-px";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-navy text-white shadow-[0_8px_18px_rgba(11,42,74,0.14)] hover:bg-[#0e3a68]",
  secondary:
    "border border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-[#f8fbff]",
  ghost: "text-navy underline-offset-4 hover:text-ocean hover:underline",
  inverse: "border border-white/35 bg-white text-navy hover:border-white hover:bg-[#e8f2f8]",
};

export function Button({ href, children, variant = "primary", className = "", external = false }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();
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
