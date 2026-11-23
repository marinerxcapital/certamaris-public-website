import Link from "next/link";

export type PageHeroSignalItem = {
  label: string;
  value: string;
};

export function PageHeroSignal({
  eyebrow,
  items,
  href,
  linkLabel,
}: {
  eyebrow: string;
  items: PageHeroSignalItem[];
  href?: string;
  linkLabel?: string;
}) {
  return (
    <aside className="page-hero-signal" aria-label={eyebrow}>
      <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
        {eyebrow}
      </p>
      <dl className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.label} className="page-hero-signal-row">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      {href && linkLabel ? (
        <Link
          href={href}
          className="mt-5 inline-flex min-h-11 items-center text-[15px] font-semibold text-ocean xl:text-[16px] hover:underline"
        >
          {linkLabel}{" "}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </Link>
      ) : null}
    </aside>
  );
}
