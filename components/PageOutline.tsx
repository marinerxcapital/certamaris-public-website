export type PageOutlineItem = {
  id: string;
  label: string;
};

export function PageOutline({
  items,
  label = "On this page",
}: {
  items: PageOutlineItem[];
  label?: string;
}) {
  if (!items.length) return null;

  return (
    <nav aria-label={label} className="border-b border-navy/10 bg-white/80">
      <div className="shell py-3">
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ocean-deep">
          {label}
        </p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-navy/12 bg-white px-3 text-[13px] font-medium text-navy transition-colors hover:border-ocean/40 hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
