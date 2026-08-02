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
  return src
    .replace(/\/product\/(?:clean|updated)\//, "/product/updated/optimized/")
    .replace(/\.png$/, "");
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

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${optimizedBase}-384.webp 384w, ${optimizedBase}-640.webp 640w, ${optimizedBase}-960.webp 960w, ${optimizedBase}-1440.webp 1440w`}
        sizes={sizes}
      />
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
      <div className="overflow-hidden rounded-md border border-navy/15 bg-white shadow-card">
        <div className="flex h-9 items-center justify-between gap-2 border-b border-navy/10 bg-paper px-3">
          <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-structural">
            Exhibit · {label}
          </span>
          <a
            href={resolvedFullSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded font-mono text-[10px] uppercase tracking-[0.08em] text-[#0b6597] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean"
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
            <span
              className={`pointer-events-none absolute inset-0 hidden md:block exhibit-pins exhibit-pins--${pinPhase}`}
              aria-hidden="true"
            >
              {visibleAnnotations.map((annotation, index) => (
                <span
                  key={annotation.id}
                  className="absolute max-w-[11rem] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
                >
                  <span
                    className={`exhibit-pin pointer-events-auto inline-flex max-w-full items-center gap-1.5 rounded border bg-white/95 px-1.5 py-0.5 shadow-sm ${
                      hoveredId === annotation.id ? "exhibit-pin--hot" : "border-navy/20"
                    }`}
                    style={{ transitionDelay: pinPhase === "set" ? `${index * 120}ms` : undefined }}
                    onMouseEnter={() => setHoveredId(annotation.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ocean/45 bg-white font-mono text-[9px] font-semibold leading-none text-ocean">
                      {index + 1}
                    </span>
                    <span className="truncate text-[10px] font-medium leading-tight text-navy">{annotation.label}</span>
                  </span>
                </span>
              ))}
            </span>
          ) : null}
        </div>
      </div>
      {visibleAnnotations.length > 0 ? (
        <figcaption className="mt-2.5">
          <ol className="grid gap-1.5" aria-label="Exhibit callouts">
            {visibleAnnotations.map((annotation, index) => (
              <li
                key={annotation.id}
                className={`exhibit-caption-row flex items-start gap-2 rounded px-1.5 py-0.5 -mx-1.5 text-[12.5px] leading-snug text-structural ${
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
