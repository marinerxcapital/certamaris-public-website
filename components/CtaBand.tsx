import Link from "next/link";
import type { ReactNode } from "react";
import {
  APP_SIGN_IN_URL,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
  SIGN_IN_LABEL,
} from "@/lib/constants";
import { Section } from "@/components/Section";
import { LiquidGlass } from "@/components/LiquidGlass";

export type CtaBandAction = {
  label: string;
  href: string;
  /** Use external for app.certamaris.com and other absolute URLs. */
  external?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

type CtaBandProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  /** Defaults to Request a demo → /contact?intent=demo */
  primary?: CtaBandAction | false;
  /** Defaults to Sign in → APP_SIGN_IN_URL */
  secondary?: CtaBandAction | false;
  /** Optional third action (e.g. Explore platform). Pass false to hide. */
  tertiary?: CtaBandAction | false;
  surface?: "navy" | "page" | "paper";
  className?: string;
  children?: ReactNode;
};

const baseBtn =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean";

function actionClasses(variant: NonNullable<CtaBandAction["variant"]>, inverse: boolean): string {
  if (variant === "primary") {
    return inverse
      ? `${baseBtn} bg-white text-navy hover:bg-white/92`
      : `${baseBtn} bg-navy text-white hover:bg-[#0e3a68]`;
  }
  if (variant === "secondary") {
    return inverse
      ? `${baseBtn} border border-navy/80 bg-navy text-white hover:bg-[#0e3a68]`
      : `${baseBtn} border border-navy/20 bg-white/80 text-navy backdrop-blur-sm hover:border-navy/40 hover:bg-white/90`;
  }
  return inverse
    ? `${baseBtn} border border-navy/80 bg-navy/90 text-white hover:bg-navy`
    : `${baseBtn} text-navy hover:text-ocean`;
}

function CtaLink({ action, inverse }: { action: CtaBandAction; inverse: boolean }) {
  const variant = action.variant ?? "primary";
  const classes = actionClasses(variant, inverse);
  if (action.external || action.href.startsWith("http")) {
    return (
      <a href={action.href} className={classes} data-integration-point={action.href.includes("login") ? "sign-in" : "get-started"}>
        {action.label}
      </a>
    );
  }
  return (
    <Link href={action.href} className={classes} data-integration-point={action.href.includes("intent=demo") ? "get-started" : undefined}>
      {action.label}
    </Link>
  );
}

/**
 * Reusable final CTA band for deep pages.
 * Default actions: Request a demo + Sign in (+ optional Explore platform via tertiary).
 */
export function CtaBand({
  title,
  description,
  eyebrow = "Next step",
  primary,
  secondary,
  tertiary = false,
  surface = "navy",
  className = "",
  children,
}: CtaBandProps) {
  const inverse = surface === "navy";

  const primaryAction: CtaBandAction | null =
    primary === false
      ? null
      : (primary ?? {
          label: PRIMARY_CTA_LABEL,
          href: PRIMARY_CTA_HREF,
          variant: "primary",
        });

  const secondaryAction: CtaBandAction | null =
    secondary === false
      ? null
      : (secondary ?? {
          label: SIGN_IN_LABEL,
          href: APP_SIGN_IN_URL,
          external: true,
          variant: "secondary",
        });

  const tertiaryAction: CtaBandAction | null =
    tertiary === false
      ? null
      : (tertiary ?? {
          label: SECONDARY_CTA_LABEL,
          href: SECONDARY_CTA_HREF,
          variant: "ghost",
        });

  return (
    <Section surface={surface} className={className}>
      <div className="final-cta-grid">
        <div className="max-w-2xl">
          {inverse ? (
            <LiquidGlass variant="dark" padding="lg">
              {eyebrow ? (
                <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ocean-light">{eyebrow}</p>
              ) : null}
              <h2 className="mb-4 text-[30px] leading-[1.08] text-white sm:text-[40px]">{title}</h2>
              {description ? (
                <p className="max-w-xl text-[15.5px] leading-relaxed text-white/72">{description}</p>
              ) : null}
              {children}
            </LiquidGlass>
          ) : (
            <div>
              {eyebrow ? (
                <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ocean">{eyebrow}</p>
              ) : null}
              <h2 className="mb-4 text-[30px] leading-[1.08] text-navy sm:text-[40px]">{title}</h2>
              {description ? (
                <p className="max-w-xl text-[15.5px] leading-relaxed text-navy/72">{description}</p>
              ) : null}
              {children}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end lg:self-center">
          {primaryAction ? <CtaLink action={{ ...primaryAction, variant: primaryAction.variant ?? "primary" }} inverse={inverse} /> : null}
          {secondaryAction ? (
            <CtaLink action={{ ...secondaryAction, variant: secondaryAction.variant ?? "secondary" }} inverse={inverse} />
          ) : null}
          {tertiaryAction ? (
            <CtaLink action={{ ...tertiaryAction, variant: tertiaryAction.variant ?? "ghost" }} inverse={inverse} />
          ) : null}
        </div>
      </div>
    </Section>
  );
}
