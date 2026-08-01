import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  /** Omit href for the current page (non-linked). */
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  /** Accessible name for the nav landmark. */
  label?: string;
};

/**
 * Breadcrumb trail for deep IA pages.
 * Pass the full trail including the current page (last item without href).
 */
export function Breadcrumbs({ items, className = "", label = "Breadcrumb" }: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <nav aria-label={label} className={`breadcrumbs ${className}`.trim()}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-snug text-navy/65">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex min-w-0 items-center gap-x-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="select-none text-navy/35">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="truncate font-medium text-navy/70 transition-colors hover:text-ocean focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`truncate ${isLast ? "font-semibold text-navy" : "font-medium text-navy/70"}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
