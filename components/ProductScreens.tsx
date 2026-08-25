"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductScreenAnnotation } from "@/lib/product-screens";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Product screenshots rendered as annotated exhibits — inline, aspect-correct,
 * labeled like evidence rather than a photo gallery (replaced the modal
 * lightbox, 2026-08-01). Callouts are functional motion: pins "set" once on
 * first view (staggered drop), and hovering a caption row highlights its pin
 * and vice versa, teaching the pin↔caption mapping.
 *
 * Progressive enhancement per README §8: SSR/no-JS/reduced-motion renders
 * pins fully placed and legible — the set animation only ever runs forward
 * from a near-visible state after hydration.
 */
type ProductScreenFrameProps = {
  src: string;
  fullSrc?: string;
  alt: string;
  label: string;
  width?: number;
  height?: number;
  title?: string;
  body?: string;
  galleryOrder?: number;
  annotations?: ProductScreenAnnotation[];
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Legacy props from the removed lightbox — accepted so existing call sites compile; unused. */
  lightboxTitle?: string;
  lightboxBody?: string;
  interactive?: boolean;
};

type ProductScreenTileProps = ProductScreenFrameProps & {
  title: string;
  body: string;
  tileClassName?: string;
};

function getOptimizedBase(src: string) {
  return src.replace(/\/product\/dashboard-v2\//, "/product/dashboard-v2/optimized/").replace(/\.png$/, "");
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
  width,
  height,
}: Pick<ProductScreenFrameProps, "src" | "alt" | "sizes" | "priority" | "className" | "width" | "height">) {
  const optimizedBase = getOptimizedBase(src);
  const canUseResponsiveWebp = src.startsWith("/product/dashboard-v2/") && src.endsWith(".png");

  return (
    <picture>
      {canUseResponsiveWebp ? (
        <source
          type="image/webp"
          srcSet={`${optimizedBase}-384.webp 384w, ${optimizedBase}-640.webp 640w, ${optimizedBase}-960.webp 960w, ${optimizedBase}-1440.webp 1440w`}
          sizes={sizes}
        />
      ) : null}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}

function ProductScreenExhibit({
  src,
  alt,
  label,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw",
  fullSrc,
  annotations,
  width = 1440,
  height = 1040,
}: ProductScreenFrameProps) {
  const visibleAnnotations = clampAnnotations(annotations);
  const resolvedFullSrc = fullSrc ?? src;
  const reduced = usePrefersReducedMotion();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  /** "idle" (SSR/no-JS: fully placed) → "pending" → "set" (animation done). */
  const [pinPhase, setPinPhase] = useState<"idle" | "pending" | "set">("idle");
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || visibleAnnotations.length === 0) return;
    const el = imageWrapRef.current;
    if (!el) return;
    setPinPhase("pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPinPhase("set");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    // Bounded fallback: a fast flick-scroll can carry the exhibit past the
    // threshold before the observer ever fires, and one that never returns
    // would otherwise leave the pins in "pending" indefinitely.
    const fallback = window.setTimeout(() => setPinPhase("set"), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <figure className={`product-exhibit m-0 ${className}`}>
      <div className="overflow-hidden rounded-lg border border-navy/15 bg-white shadow-card">
        <div className="flex min-h-10 items-center justify-between gap-2 border-b border-navy/10 bg-paper px-3">
          <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-structural">
            Exhibit · {label}
          </span>
          <a
            href={resolvedFullSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded border border-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#0b6597] underline-offset-2 hover:border-ocean/20 hover:bg-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean"
          >
            Full resolution<span aria-hidden="true"> ↗</span>
            <span className="sr-only"> — opens {label} screenshot in a new tab</span>
          </a>
        </div>
        <div ref={imageWrapRef} className="relative block bg-paper">
          <ProductScreenImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full object-contain object-top"
          />
          {visibleAnnotations.length > 0 ? (
            <svg
              className={`pointer-events-none absolute inset-0 hidden h-full w-full md:block exhibit-pins exhibit-pins--${pinPhase}`}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {visibleAnnotations.map((annotation, index) => (
                <g
                  key={annotation.id}
                  className={`exhibit-pin-g${hoveredId === annotation.id ? " exhibit-pin-g--hot" : ""}`}
                  transform={`translate(${annotation.x} ${annotation.y})`}
                  onMouseEnter={() => setHoveredId(annotation.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <title>{annotation.label}</title>
                  <circle className="exhibit-pin-halo" cx="0" cy="0" r="3.1" />
                  <circle className="exhibit-pin-dot" cx="0" cy="0" r="2.05" />
                  <text className="exhibit-pin-text" x="0" y="0.1" textAnchor="middle" dominantBaseline="central">
                    {index + 1}
                  </text>
                </g>
              ))}
            </svg>
          ) : null}
        </div>
      </div>
      {visibleAnnotations.length > 0 ? (
        <figcaption className="mt-3">
          <ol className="grid gap-1.5" aria-label="Exhibit callouts">
            {visibleAnnotations.map((annotation, index) => (
              <li
                key={annotation.id}
                className={`exhibit-caption-row flex items-start gap-2 rounded px-2 py-1 -mx-2 text-[12.5px] leading-snug text-structural ${
                  hoveredId === annotation.id ? "exhibit-caption-row--hot" : ""
                }`}
                onMouseEnter={() => setHoveredId(annotation.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ocean/40 font-mono text-[9px] font-semibold text-ocean">
                  {index + 1}
                </span>
                <span>{annotation.label}</span>
              </li>
            ))}
          </ol>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ProductScreenFrame(props: ProductScreenFrameProps) {
  return <ProductScreenExhibit {...props} />;
}

export function ProductScreenTile({
  title,
  body,
  tileClassName = "",
  ...screen
}: ProductScreenTileProps) {
  return (
    <article className={`product-screen-tile grid content-start gap-3.5 ${tileClassName}`}>
      <ProductScreenExhibit
        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
        {...screen}
        title={title}
        body={body}
      />
      <div>
        <h3 className="mb-1.5 text-[15px] font-semibold leading-snug">{title}</h3>
        <p className="text-[13.5px] leading-relaxed text-structural">{body}</p>
      </div>
    </article>
  );
}
