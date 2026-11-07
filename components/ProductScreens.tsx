"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { ProductScreenAnnotation } from "@/lib/product-screens";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Product screenshots rendered as annotated exhibits — inline, aspect-correct,
 * labeled like evidence rather than a generic photo gallery. Each interactive
 * exhibit also registers with the route-scoped viewer hosted by the root
 * layout, so the inline proof and full-resolution reading experience stay in
 * sync. Callouts are functional motion: pins "set" once on first view
 * (staggered drop), and hovering a caption row highlights its pin and vice
 * versa, teaching the pin↔caption mapping.
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
  /**
   * Art-directed crop of a tall product screenshot.
   * `top` keeps the upper operating surface visible (hero / feature windows).
   */
  crop?: "none" | "top";
  /** Optional viewer copy for callers that need a title/body distinct from the inline label. */
  lightboxTitle?: string;
  lightboxBody?: string;
  interactive?: boolean;
  showFullResolution?: boolean;
};

type ProductScreenTileProps = ProductScreenFrameProps & {
  title: string;
  body: string;
  tileClassName?: string;
};

export type RegisteredProductScreen = {
  id: string;
  src: string;
  fullSrc: string;
  alt: string;
  label: string;
  title: string;
  body: string;
  width: number;
  height: number;
  annotations: ProductScreenAnnotation[];
  galleryOrder?: number;
  registrationOrder: number;
};

type ProductGalleryState = {
  activeScreenId: string | null;
  listeners: Set<() => void>;
  screens: RegisteredProductScreen[];
  trigger: HTMLButtonElement | null;
  version: number;
  nextRegistrationOrder: number;
};

const galleryStore = new Map<string, ProductGalleryState>();

export function getProductGalleryState(pathname: string): ProductGalleryState {
  const existing = galleryStore.get(pathname);
  if (existing) return existing;

  const created: ProductGalleryState = {
    activeScreenId: null,
    listeners: new Set(),
    screens: [],
    trigger: null,
    version: 0,
    nextRegistrationOrder: 0,
  };
  galleryStore.set(pathname, created);
  return created;
}

export function getProductGalleryVersion(pathname: string) {
  return getProductGalleryState(pathname).version;
}

export function subscribeProductGallery(
  pathname: string,
  listener: () => void,
) {
  const state = getProductGalleryState(pathname);
  state.listeners.add(listener);
  return () => state.listeners.delete(listener);
}

function notifyProductGallery(pathname: string) {
  const state = getProductGalleryState(pathname);
  state.version += 1;
  for (const listener of state.listeners) listener();
}

export function registerProductScreen(
  pathname: string,
  screen: Omit<RegisteredProductScreen, "registrationOrder">,
) {
  const state = getProductGalleryState(pathname);
  const existingIndex = state.screens.findIndex(
    (item) => item.id === screen.id,
  );
  const registrationOrder =
    existingIndex >= 0
      ? state.screens[existingIndex].registrationOrder
      : state.nextRegistrationOrder++;
  const nextScreen = { ...screen, registrationOrder };
  const nextScreens = [...state.screens];

  if (existingIndex >= 0) nextScreens[existingIndex] = nextScreen;
  else nextScreens.push(nextScreen);

  state.screens = nextScreens.sort(
    (left, right) =>
      (left.galleryOrder ?? Number.MAX_SAFE_INTEGER) -
        (right.galleryOrder ?? Number.MAX_SAFE_INTEGER) ||
      left.registrationOrder - right.registrationOrder,
  );
  notifyProductGallery(pathname);
}

export function unregisterProductScreen(pathname: string, screenId: string) {
  const state = getProductGalleryState(pathname);
  state.screens = state.screens.filter((screen) => screen.id !== screenId);
  if (state.activeScreenId === screenId) state.activeScreenId = null;
  notifyProductGallery(pathname);
}

export function openProductScreen(
  pathname: string,
  screenId: string,
  trigger: HTMLButtonElement | null,
) {
  const state = getProductGalleryState(pathname);
  state.activeScreenId = screenId;
  state.trigger = trigger;
  notifyProductGallery(pathname);
}

export function closeProductGallery(pathname: string) {
  const state = getProductGalleryState(pathname);
  const trigger = state.trigger;
  state.activeScreenId = null;
  state.trigger = null;
  notifyProductGallery(pathname);
  if (trigger) window.requestAnimationFrame(() => trigger.focus());
}

export function moveProductScreen(pathname: string, direction: -1 | 1) {
  const state = getProductGalleryState(pathname);
  const currentIndex = state.screens.findIndex(
    (screen) => screen.id === state.activeScreenId,
  );
  if (currentIndex < 0 || state.screens.length < 2) return;
  const nextIndex =
    (currentIndex + direction + state.screens.length) % state.screens.length;
  state.activeScreenId = state.screens[nextIndex]?.id ?? state.activeScreenId;
  notifyProductGallery(pathname);
}

function getOptimizedBase(src: string) {
  return src
    .replace(/\/product\/dashboard-v2\//, "/product/dashboard-v2/optimized/")
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
}: Pick<
  ProductScreenFrameProps,
  "src" | "alt" | "sizes" | "priority" | "className" | "width" | "height"
>) {
  const optimizedBase = getOptimizedBase(src);
  const canUseResponsiveWebp =
    src.startsWith("/product/dashboard-v2/") && src.endsWith(".png");

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

export function ProductExhibit({
  src,
  alt,
  label,
  title,
  body,
  lightboxTitle,
  lightboxBody,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw",
  fullSrc,
  annotations,
  width = 1440,
  height = 1040,
  crop = "none",
  galleryOrder,
  interactive = true,
  showFullResolution = true,
}: ProductScreenFrameProps) {
  const visibleAnnotations = clampAnnotations(annotations);
  const resolvedFullSrc = fullSrc ?? src;
  const resolvedTitle = lightboxTitle ?? title ?? label;
  const resolvedBody = lightboxBody ?? body ?? alt;
  const reduced = usePrefersReducedMotion();
  const isTopCrop = crop === "top";
  const pathname = usePathname() ?? "/";
  const reactId = useId();
  const screenId = `product-screen-${reactId.replace(/:/g, "-")}`;
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  /** "idle" (SSR/no-JS: fully placed) → "pending" → "set" (animation done). */
  const [pinPhase, setPinPhase] = useState<"idle" | "pending" | "set">("idle");
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (interactive === false) return;

    registerProductScreen(pathname, {
      id: screenId,
      src,
      fullSrc: resolvedFullSrc,
      alt,
      label,
      title: resolvedTitle,
      body: resolvedBody,
      width,
      height,
      annotations: visibleAnnotations,
      galleryOrder,
    });

    return () => unregisterProductScreen(pathname, screenId);
  }, [
    alt,
    galleryOrder,
    height,
    interactive,
    label,
    pathname,
    resolvedBody,
    resolvedFullSrc,
    resolvedTitle,
    screenId,
    src,
    visibleAnnotations,
    width,
  ]);

  const imageContent = (
    <div
      ref={imageWrapRef}
      className={
        isTopCrop
          ? "product-exhibit-viewport product-exhibit-viewport--crop-top relative block bg-paper"
          : "relative block bg-paper"
      }
    >
      <ProductScreenImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={
          isTopCrop
            ? "h-full w-full object-cover object-top"
            : "h-auto w-full object-contain object-top"
        }
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
              <text
                className="exhibit-pin-text"
                x="0"
                y="0.1"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {index + 1}
              </text>
            </g>
          ))}
        </svg>
      ) : null}
      {interactive !== false ? (
        <span className="product-exhibit-open-hint" aria-hidden="true">
          View exhibit <span>↗</span>
        </span>
      ) : null}
    </div>
  );

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
      { threshold: 0.35 },
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
    <figure
      className={`product-exhibit m-0 ${isTopCrop ? "product-exhibit--crop-top " : ""}${className}`}
    >
      <div className="overflow-hidden rounded-lg border border-navy/15 bg-white shadow-card">
        <div className="flex min-h-11 items-center justify-between gap-2 border-b border-navy/10 bg-paper px-3">
          <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-structural">
            Exhibit · {label}
          </span>
          {showFullResolution ? (
            <a
              href={resolvedFullSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center rounded border border-transparent px-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#0b6597] underline-offset-2 hover:border-ocean/20 hover:bg-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean"
            >
              Full resolution<span aria-hidden="true"> ↗</span>
              <span className="sr-only">
                {" "}
                — opens {label} screenshot in a new tab
              </span>
            </a>
          ) : null}
        </div>
        {interactive !== false ? (
          <button
            ref={triggerRef}
            type="button"
            data-testid="product-screen-trigger"
            data-exhibit-label={label}
            aria-haspopup="dialog"
            aria-label={`Open full exhibit: ${resolvedTitle}`}
            onClick={() =>
              openProductScreen(pathname, screenId, triggerRef.current)
            }
            className="product-exhibit-trigger group block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
          >
            {imageContent}
          </button>
        ) : (
          imageContent
        )}
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
  return <ProductExhibit {...props} />;
}

export function ProductScreenTile({
  title,
  body,
  tileClassName = "",
  ...screen
}: ProductScreenTileProps) {
  return (
    <article
      className={`product-screen-tile grid content-start gap-3.5 ${tileClassName}`}
    >
      <ProductExhibit
        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
        {...screen}
        title={title}
        body={body}
      />
      <div>
        <h3 className="mb-1.5 text-[15px] font-semibold leading-snug">
          {title}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-structural">{body}</p>
      </div>
    </article>
  );
}
