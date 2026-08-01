"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProductProofScreen, ProductScreenAnnotation } from "@/lib/product-screens";
import { productProofSequence } from "@/lib/product-screens";

type ProductScreenFrameProps = {
  src: string;
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
  /** Optional override for the gallery metadata used by legacy call sites. */
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
        className={className}
      />
    </picture>
  );
}

function focusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

function ProductGalleryLightbox({
  screen,
  onClose,
}: {
  screen: ProductProofScreen;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [activeOrder, setActiveOrder] = useState(screen.galleryOrder);
  const dialogRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.max(
    0,
    productProofSequence.findIndex((candidate) => candidate.galleryOrder === activeOrder),
  );
  const activeScreen = productProofSequence[activeIndex] ?? screen;
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < productProofSequence.length - 1;

  const move = (direction: -1 | 1) => {
    const nextIndex = Math.min(
      productProofSequence.length - 1,
      Math.max(0, activeIndex + direction),
    );
    setActiveOrder(productProofSequence[nextIndex].galleryOrder);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const focusInitial = window.requestAnimationFrame(() => {
      const closeButton = dialogRef.current?.querySelector<HTMLElement>("[data-lightbox-close]");
      closeButton?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusInitial);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (hasPrevious) move(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (hasNext) move(1);
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusableElements(dialog);
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, hasNext, hasPrevious, mounted, onClose]);

  const titleId = `product-lightbox-title-${activeScreen.galleryOrder}`;
  const descriptionId = `product-lightbox-description-${activeScreen.galleryOrder}`;
  const annotations = clampAnnotations(activeScreen.annotations);

  const content = (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-navy/90 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="mx-auto flex min-h-full w-full max-w-6xl items-center justify-center py-4 sm:py-8"
      >
        <div className="w-full overflow-hidden rounded-lg border border-white/20 bg-paper shadow-2xl">
          <div className="flex items-center justify-between gap-3 border-b border-navy/10 px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ocean">
                Product gallery · {activeIndex + 1} of {productProofSequence.length}
              </p>
              <h2 id={titleId} className="mt-1 truncate text-[15px] font-semibold text-navy sm:text-base">
                {activeScreen.title}
              </h2>
            </div>
            <button
              type="button"
              data-lightbox-close
              onClick={onClose}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded border border-navy/20 bg-white px-3 text-[12px] font-semibold text-navy transition hover:border-ocean/50 hover:text-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              aria-label="Close product screenshot gallery"
            >
              <span aria-hidden="true" className="text-lg leading-none">×</span>
              Close
            </button>
          </div>

          <div className="grid gap-5 p-3 sm:p-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <div className="relative min-w-0 rounded-md border border-navy/15 bg-white p-2 shadow-card sm:p-3">
              <ProductScreenImage
                src={activeScreen.src}
                alt={activeScreen.alt}
                width={activeScreen.width}
                height={activeScreen.height}
                sizes="(min-width: 1024px) 72vw, 100vw"
                priority
                className="mx-auto h-auto max-h-[72vh] w-auto max-w-full object-contain"
              />
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-navy/10 pt-3">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  disabled={!hasPrevious}
                  className="min-h-10 rounded border border-navy/20 bg-white px-3 text-[12px] font-semibold text-navy transition hover:border-ocean/50 hover:text-ocean disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
                  aria-label="Previous product screenshot"
                >
                  ← Previous
                </button>
                <span aria-live="polite" className="font-mono text-[11px] text-structural">
                  {activeIndex + 1} / {productProofSequence.length}
                </span>
                <button
                  type="button"
                  onClick={() => move(1)}
                  disabled={!hasNext}
                  className="min-h-10 rounded border border-navy/20 bg-white px-3 text-[12px] font-semibold text-navy transition hover:border-ocean/50 hover:text-ocean disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
                  aria-label="Next product screenshot"
                >
                  Next →
                </button>
              </div>
            </div>

            <aside className="min-w-0">
              <p id={descriptionId} className="text-[13.5px] leading-relaxed text-structural">
                {activeScreen.body}
              </p>
              {annotations.length > 0 ? (
                <div className="mt-5 border-t border-navy/10 pt-4">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ocean">Screen highlights</h3>
                  <ol className="mt-2 grid gap-2">
                    {annotations.map((annotation, index) => (
                      <li key={annotation.id} className="flex gap-2 text-[12px] leading-snug text-structural">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ocean/45 font-mono text-[10px] font-semibold text-ocean">
                          {index + 1}
                        </span>
                        <span>{annotation.label}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </aside>
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-navy/10 bg-white/70 p-3 sm:p-4" aria-label="Product screenshot navigation">
            {productProofSequence.map((candidate, index) => (
              <button
                key={candidate.src}
                type="button"
                onClick={() => setActiveOrder(candidate.galleryOrder)}
                aria-label={`View ${candidate.title}`}
                aria-current={candidate.galleryOrder === activeScreen.galleryOrder ? "true" : undefined}
                className="group w-24 shrink-0 rounded border border-navy/15 bg-paper p-1 text-left transition hover:border-ocean/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 aria-[current=true]:border-ocean aria-[current=true]:ring-1 aria-[current=true]:ring-ocean sm:w-28"
              >
                <ProductScreenImage
                  src={candidate.src}
                  alt=""
                  width={candidate.width}
                  height={candidate.height}
                  sizes="112px"
                  className="h-14 w-full object-cover object-top sm:h-16"
                />
                <span className="mt-1 block truncate px-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-structural">
                  {index + 1}. {candidate.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return mounted ? createPortal(content, document.body) : null;
}

function ProductScreenFrameInner({
  src,
  alt,
  label,
  title,
  body,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw",
  lightboxTitle,
  lightboxBody,
  annotations,
  ...screen
}: ProductScreenFrameProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const visibleAnnotations = clampAnnotations(annotations);
  const registeredScreen = productProofSequence.find((candidate) => candidate.src === src);
  const galleryScreen = useMemo<ProductProofScreen>(
    () => ({
      ...registeredScreen,
      src,
      alt,
      label,
      width: screen.width ?? registeredScreen?.width ?? 1440,
      height: screen.height ?? registeredScreen?.height ?? 1040,
      title: lightboxTitle ?? title ?? label,
      body: lightboxBody ?? body ?? alt,
      galleryOrder: screen.galleryOrder ?? registeredScreen?.galleryOrder ?? 1,
      annotations,
    }),
    [alt, annotations, body, label, lightboxBody, lightboxTitle, registeredScreen, screen.galleryOrder, screen.height, screen.width, src, title],
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`group relative block w-full rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-4 ${className}`}
        onClick={() => setIsOpen(true)}
        aria-label={`Open ${galleryScreen.title} screenshot in product gallery`}
      >
        <span className="product-screen-frame block overflow-hidden rounded-md border border-navy/15 bg-white shadow-card transition duration-200 group-hover:-translate-y-0.5 group-hover:border-ocean/35 group-hover:shadow-lg">
          <span className="flex h-9 items-center justify-between gap-2 border-b border-navy/10 bg-paper px-3">
            <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-structural">{label}</span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ocean opacity-80">Expand</span>
          </span>
          <span className="relative block bg-paper">
            <ProductScreenImage
              src={src}
              alt={alt}
              width={galleryScreen.width}
              height={galleryScreen.height}
              sizes={sizes}
              priority={priority}
              className="h-auto w-full object-contain object-top"
            />
            {visibleAnnotations.length > 0 ? (
              <span className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
                {visibleAnnotations.map((annotation, index) => (
                  <span
                    key={annotation.id}
                    className="absolute max-w-[11rem] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
                  >
                    <span className="inline-flex max-w-full items-center gap-1.5 rounded border border-navy/20 bg-white/95 px-1.5 py-0.5 shadow-sm">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ocean/45 bg-white font-mono text-[9px] font-semibold leading-none text-ocean">
                        {index + 1}
                      </span>
                      <span className="truncate text-[10px] font-medium leading-tight text-navy">{annotation.label}</span>
                    </span>
                  </span>
                ))}
              </span>
            ) : null}
          </span>
        </span>
      </button>
      {visibleAnnotations.length > 0 ? (
        <ol className="mt-2.5 grid gap-1.5 md:hidden" aria-label="Screen highlights">
          {visibleAnnotations.map((annotation, index) => (
            <li key={annotation.id} className="flex items-start gap-2 text-[12.5px] leading-snug text-structural">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ocean/40 font-mono text-[9px] font-semibold text-ocean">
                {index + 1}
              </span>
              <span>{annotation.label}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {isOpen ? (
        <ProductGalleryLightbox
          screen={galleryScreen}
          onClose={() => {
            setIsOpen(false);
            window.requestAnimationFrame(() => triggerRef.current?.focus());
          }}
        />
      ) : null}
    </>
  );
}

export function ProductScreenFrame({ label, alt, ...screen }: ProductScreenFrameProps) {
  return <ProductScreenFrameInner {...screen} alt={alt} label={label} />;
}

export function ProductScreenTile({
  title,
  body,
  tileClassName = "",
  ...screen
}: ProductScreenTileProps) {
  return (
    <article className={`product-screen-tile grid content-start gap-3.5 ${tileClassName}`}>
      <ProductScreenFrameInner
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
