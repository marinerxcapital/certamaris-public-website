type ProductScreenFrameProps = {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

type ProductScreenTileProps = ProductScreenFrameProps & {
  title: string;
  body: string;
};

export function ProductScreenFrame({
  src,
  alt,
  label,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw",
}: ProductScreenFrameProps) {
  const optimizedBase = src.replace("/product/clean/", "/product/optimized/").replace(/\.png$/, "");

  return (
    <figure
      className={`overflow-hidden rounded-md border bg-white shadow-card ${className}`}
      style={{ borderColor: "var(--hairline-strong)" }}
    >
      <div
        className="flex h-9 items-center gap-2 border-b bg-paper px-3"
        style={{ borderColor: "var(--hairline)" }}
      >
        <span className="size-2 rounded-full bg-status-critical" aria-hidden="true" />
        <span className="size-2 rounded-full bg-status-caution" aria-hidden="true" />
        <span className="size-2 rounded-full bg-status-ok" aria-hidden="true" />
        <span className="ml-2 truncate font-mono text-[11px] uppercase tracking-[0.1em] text-structural">
          {label}
        </span>
      </div>
      <picture>
        <source
          type="image/webp"
          srcSet={`${optimizedBase}-384.webp 384w, ${optimizedBase}-640.webp 640w, ${optimizedBase}-960.webp 960w`}
          sizes={sizes}
        />
        <img
          src={src}
          alt={alt}
          width={1440}
          height={1040}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="aspect-[1440/1040] w-full object-cover object-top"
        />
      </picture>
    </figure>
  );
}

export function ProductScreenTile({ title, body, ...screen }: ProductScreenTileProps) {
  return (
    <article className="grid gap-4">
      <ProductScreenFrame sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw" {...screen} />
      <div>
        <h3 className="mb-1.5 text-[15px] font-semibold">{title}</h3>
        <p className="text-[13.5px] leading-relaxed text-structural">{body}</p>
      </div>
    </article>
  );
}
