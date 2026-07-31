import type { ProductScreenAnnotation } from "@/lib/product-screens";

type ProductScreenFrameProps = {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** @deprecated Lightbox removed — accepted as no-op for call-site compatibility */
  lightboxTitle?: string;
  /** @deprecated Lightbox removed — accepted as no-op for call-site compatibility */
  lightboxBody?: string;
  galleryOrder?: number;
  interactive?: boolean;
  annotations?: ProductScreenAnnotation[];
};

type ProductScreenTileProps = ProductScreenFrameProps & {
  title: string;
  body: string;
  galleryOrder: number;
  tileClassName?: string;
};

function getOptimizedBase(src: string) {
  return src.replace("/product/clean/", "/product/optimized/").replace(/\.png$/, "");
}

function clampAnnotations(annotations?: ProductScreenAnnotation[]) {
  if (!annotations?.length) return [];
  return annotations.slice(0, 3);
}

export function ProductScreenImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: Pick<ProductScreenFrameProps, "src" | "alt" | "sizes" | "priority" | "className">) {
  const optimizedBase = getOptimizedBase(src);

  return (
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
        className={className}
      />
    </picture>
  );
}

function ProductScreenFrameInner({
  src,
  alt,
  label,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw",
  annotations,
}: ProductScreenFrameProps) {
  const visibleAnnotations = clampAnnotations(annotations);

  return (
    <div className={`relative block w-full rounded-md text-left ${className}`}>
      <figure className="product-screen-frame overflow-hidden rounded-md border border-navy/15 bg-white shadow-card">
        <div className="flex h-9 items-center border-b border-navy/10 bg-paper px-3">
          <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-structural">
            {label}
          </span>
        </div>
        <div className="relative bg-paper">
          <ProductScreenImage
            src={src}
            alt={alt}
            sizes={sizes}
            priority={priority}
            className="aspect-[1440/1040] w-full object-contain object-top"
          />
          {visibleAnnotations.length > 0 ? (
            <ul className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
              {visibleAnnotations.map((annotation, index) => (
                <li
                  key={annotation.id}
                  className="absolute max-w-[11rem] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
                >
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded border border-navy/20 bg-white/95 px-1.5 py-0.5 shadow-sm">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ocean/45 bg-white font-mono text-[9px] font-semibold leading-none text-ocean">
                      {index + 1}
                    </span>
                    <span className="truncate text-[10px] font-medium leading-tight text-navy">
                      {annotation.label}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </figure>
      {visibleAnnotations.length > 0 ? (
        <ol className="mt-2.5 grid gap-1.5 md:hidden" aria-label="Screen highlights">
          {visibleAnnotations.map((annotation, index) => (
            <li
              key={annotation.id}
              className="flex items-start gap-2 text-[12.5px] leading-snug text-structural"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ocean/40 font-mono text-[9px] font-semibold text-ocean">
                {index + 1}
              </span>
              <span>{annotation.label}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function ProductScreenFrame({ label, alt, ...screen }: ProductScreenFrameProps) {
  return <ProductScreenFrameInner {...screen} alt={alt} label={label} />;
}

export function ProductScreenTile({
  title,
  body,
  tileClassName = "",
  // Dense tiles already have title/body copy; keep callouts for featured frames.
  annotations: _annotations,
  ...screen
}: ProductScreenTileProps) {
  return (
    <article className={`product-screen-tile grid content-start gap-3.5 ${tileClassName}`}>
      <ProductScreenFrameInner
        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
        {...screen}
      />
      <div>
        <h3 className="mb-1.5 text-[15px] font-semibold leading-snug">{title}</h3>
        <p className="text-[13.5px] leading-relaxed text-structural">{body}</p>
      </div>
    </article>
  );
}
