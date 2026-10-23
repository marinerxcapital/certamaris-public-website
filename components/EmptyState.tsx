import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { Eyebrow } from "@/components/Section";

export type EmptyStateVariant =
  | "partnership"
  | "careers"
  | "press"
  | "search"
  | "resources";

export type EmptyStateStep = {
  title: string;
  body: string;
};

export type EmptyStateLink = {
  href: string;
  label: string;
  description: string;
};

type EmptyStateProps = {
  variant: EmptyStateVariant;
  eyebrow: string;
  title: string;
  body: ReactNode;
  statusLabel?: string;
  statusValue?: string;
  primaryAction?: ReactNode;
  supporting?: ReactNode;
  processEyebrow?: string;
  processTitle?: string;
  processIntro?: string;
  processSteps?: EmptyStateStep[];
  relatedTitle?: string;
  relatedLinks?: EmptyStateLink[];
  size?: "page" | "compact";
  titleAs?: "h2" | "p";
  className?: string;
};

function Motif({ variant }: { variant: EmptyStateVariant }) {
  if (variant === "partnership") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M16 19 32 31l16-12M32 31v16" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="19" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="48" cy="19" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="32" cy="31" r="5" fill="currentColor" />
        <path d="M24 47h16v8H24z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M28 51h8" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (variant === "careers") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M8 51c11 0 8-15 20-15s9-20 28-25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeDasharray="3 4"
        />
        <circle cx="8" cy="51" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="28" cy="36" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="56" cy="11" r="5" fill="currentColor" />
        <path d="m51 9 3-4 3 4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (variant === "press") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="12" y="12" width="38" height="30" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 21h22M20 28h16M20 35h20" stroke="currentColor" strokeWidth="1.8" />
        <path d="m22 42-3 9 8-5M51 20c4 3 6 7 6 12s-2 9-6 12" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (variant === "search") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="27" cy="27" r="14" stroke="currentColor" strokeWidth="1.8" />
        <path d="m38 38 13 13" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 27h14M27 20v14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M17 9h24l8 8v38H17z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M41 9v10h8M24 27h17M24 34h17M24 41h11" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function EmptyState({
  variant,
  eyebrow,
  title,
  body,
  statusLabel,
  statusValue,
  primaryAction,
  supporting,
  processEyebrow = "What to expect",
  processTitle,
  processIntro,
  processSteps = [],
  relatedTitle,
  relatedLinks = [],
  size = "page",
  titleAs = "h2",
  className = "",
}: EmptyStateProps) {
  const compact = size === "compact";
  const Wrapper: ElementType = compact ? "div" : "article";
  const Title: ElementType = titleAs;
  const titleId = `empty-state-${variant}-title`;
  const processId = `empty-state-${variant}-process`;
  const relatedId = `empty-state-${variant}-related`;

  return (
    <Wrapper
      className={`empty-state empty-state--${size} ${className}`.trim()}
      data-qa="empty-state"
      data-empty-variant={variant}
      aria-labelledby={titleId}
    >
      <header className="empty-state__header">
        <div className="empty-state__mark">
          <span className="empty-state__motif">
            <Motif variant={variant} />
          </span>
        </div>

        <div className="empty-state__copy">
          <div className="empty-state__meta">
            <Eyebrow>{eyebrow}</Eyebrow>
            {statusLabel && statusValue ? (
              <span className="empty-state__status">
                <span className="empty-state__status-dot" aria-hidden="true" />
                {statusLabel}: <strong>{statusValue}</strong>
              </span>
            ) : null}
          </div>

          <Title id={titleId} className="empty-state__title">
            {title}
          </Title>
          <div className="empty-state__body">{body}</div>
          {supporting ? <div className="empty-state__supporting">{supporting}</div> : null}

          {primaryAction ? (
            <div className="empty-state__actions" data-empty-primary>
              {primaryAction}
            </div>
          ) : null}
        </div>
      </header>

      {processTitle && processSteps.length ? (
        <section className="empty-state__process" aria-labelledby={processId}>
          <div className="empty-state__process-copy">
            <Eyebrow>{processEyebrow}</Eyebrow>
            <h3 id={processId} className="empty-state__process-title">
              {processTitle}
            </h3>
            {processIntro ? <p className="empty-state__process-intro">{processIntro}</p> : null}
          </div>
          <ol className="empty-state__steps" data-empty-process>
            {processSteps.map((step, index) => (
              <li key={step.title} className="empty-state__step">
                <span className="empty-state__step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="empty-state__step-title">{step.title}</h4>
                <p className="empty-state__step-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {relatedTitle && relatedLinks.length ? (
        <section className="empty-state__related" aria-labelledby={relatedId}>
          <div className="empty-state__related-head">
            <Eyebrow>Related paths</Eyebrow>
            <h3 id={relatedId} className="empty-state__related-title">
              {relatedTitle}
            </h3>
          </div>
          <ul className="empty-state__related-list" data-empty-related>
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="empty-state__related-link">
                  <span className="empty-state__related-label">{link.label}</span>
                  <span className="empty-state__related-description">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Wrapper>
  );
}
