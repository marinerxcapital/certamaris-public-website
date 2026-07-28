"use client";

import {
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

type ProductScreenFrameProps = {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  lightboxTitle?: string;
  lightboxBody?: string;
  galleryOrder?: number;
};

type ProductScreenTileProps = ProductScreenFrameProps & {
  title: string;
  body: string;
  galleryOrder: number;
};

type RegisteredScreen = {
  id: string;
  src: string;
  alt: string;
  label: string;
  title: string;
  body: string;
  galleryOrder: number;
};

type GalleryState = {
  activeScreenId: string | null;
  listeners: Set<() => void>;
  screens: RegisteredScreen[];
  trigger: HTMLButtonElement | null;
};

const galleryStore = new Map<string, GalleryState>();

function getGalleryState(pathname: string) {
  const existing = galleryStore.get(pathname);
  if (existing) return existing;

  const created: GalleryState = {
    activeScreenId: null,
    listeners: new Set(),
    screens: [],
    trigger: null,
  };
  galleryStore.set(pathname, created);
  return created;
}

function notifyGallery(pathname: string) {
  for (const listener of getGalleryState(pathname).listeners) {
    listener();
  }
}

function registerScreen(pathname: string, screen: RegisteredScreen) {
  const state = getGalleryState(pathname);
  const existingIndex = state.screens.findIndex((item) => item.id === screen.id);
  if (existingIndex === -1) {
    state.screens = [...state.screens, screen];
  } else {
    const nextScreens = [...state.screens];
    nextScreens[existingIndex] = screen;
    state.screens = nextScreens;
  }
  state.screens.sort((left, right) => left.galleryOrder - right.galleryOrder);
  notifyGallery(pathname);
}

function unregisterScreen(pathname: string, screenId: string) {
  const state = getGalleryState(pathname);
  state.screens = state.screens.filter((item) => item.id !== screenId);
  if (state.activeScreenId === screenId) {
    state.activeScreenId = null;
  }
  notifyGallery(pathname);
}

function openScreen(pathname: string, screenId: string, trigger: HTMLButtonElement | null) {
  const state = getGalleryState(pathname);
  state.trigger = trigger;
  state.activeScreenId = screenId;
  notifyGallery(pathname);
}

function closeScreen(pathname: string) {
  const state = getGalleryState(pathname);
  state.activeScreenId = null;
  const trigger = state.trigger;
  notifyGallery(pathname);
  if (trigger) {
    window.requestAnimationFrame(() => {
      trigger.focus();
    });
  }
}

function moveScreen(pathname: string, direction: -1 | 1) {
  const state = getGalleryState(pathname);
  const currentIndex = state.screens.findIndex((screen) => screen.id === state.activeScreenId);
  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + direction + state.screens.length) % state.screens.length;
  state.activeScreenId = state.screens[nextIndex]?.id ?? state.activeScreenId;
  notifyGallery(pathname);
}

function getOptimizedBase(src: string) {
  return src.replace("/product/clean/", "/product/optimized/").replace(/\.png$/, "");
}

function ProductScreenImage({
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
  title,
  body,
  galleryOrder = Number.MAX_SAFE_INTEGER,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw",
}: ProductScreenFrameProps & { title: string; body: string }) {
  const pathname = usePathname();
  const screenId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerScreen(pathname, {
      id: screenId,
      src,
      alt,
      label,
      title,
      body,
      galleryOrder,
    });

    return () => {
      unregisterScreen(pathname, screenId);
    };
  }, [alt, body, galleryOrder, label, pathname, screenId, src, title]);

  return (
    <button
      ref={buttonRef}
      type="button"
      data-testid="product-screen-trigger"
      data-screen-title={title}
      aria-haspopup="dialog"
      aria-label={`Open full product view for ${title}`}
      onClick={() => openScreen(pathname, screenId, buttonRef.current)}
      className={`group relative block w-full cursor-zoom-in rounded-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean ${className}`}
    >
      <figure
        className="overflow-hidden rounded-md border bg-white shadow-card transition-transform duration-200 group-hover:-translate-y-0.5"
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
        <ProductScreenImage
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className="aspect-[1440/1040] w-full object-cover object-top"
        />
      </figure>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/40 bg-navy/82 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        Expand
      </span>
    </button>
  );
}

function ProductLightbox({
  screens,
  activeScreenId,
  onClose,
  onPrevious,
  onNext,
}: {
  screens: RegisteredScreen[];
  activeScreenId: string | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeIndex = screens.findIndex((screen) => screen.id === activeScreenId);
  const activeScreen = activeIndex >= 0 ? screens[activeIndex] : null;
  const hasMultiple = screens.length > 1;

  useEffect(() => {
    if (!activeScreen || !dialogRef.current) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (focusable[0] ?? dialogRef.current).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (hasMultiple && event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (hasMultiple && event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const trapTargets = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled"));

      if (trapTargets.length === 0) {
        event.preventDefault();
        return;
      }

      const first = trapTargets[0];
      const last = trapTargets[trapTargets.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeScreen, hasMultiple, onClose, onNext, onPrevious]);

  if (!isMounted || !activeScreen) return null;

  return createPortal(
    <div
      data-testid="product-lightbox-overlay"
      className="fixed inset-0 z-[90] bg-[rgba(5,24,43,0.82)] px-3 py-4 backdrop-blur-[3px] sm:px-6 sm:py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex h-full items-center justify-center">
        <div
          ref={dialogRef}
          data-testid="product-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-lightbox-title"
          aria-describedby="product-lightbox-description"
          tabIndex={-1}
          className="flex max-h-full w-full max-w-[1180px] flex-col overflow-hidden rounded-md border bg-[rgba(245,248,250,0.985)] shadow-[0_28px_90px_rgba(5,24,43,0.32)]"
          style={{ borderColor: "rgba(255,255,255,0.18)" }}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
        >
          <div
            className="flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-5 sm:py-4"
            style={{ borderColor: "var(--hairline)" }}
          >
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-structural">{activeScreen.label}</p>
              <h2
                id="product-lightbox-title"
                className="mt-1 text-[22px] font-semibold leading-[1.12] text-navy sm:text-[26px]"
              >
                {activeScreen.title}
              </h2>
            </div>
            <button
              type="button"
              data-testid="product-lightbox-close"
              onClick={onClose}
              className="rounded-full border border-navy/15 bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-navy transition-colors hover:border-navy/30 hover:bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean"
            >
              Close
            </button>
          </div>

          <div className="grid gap-4 overflow-auto px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
            <div
              className="overflow-hidden rounded-sm border bg-white p-2 sm:p-3"
              style={{ borderColor: "var(--hairline-strong)" }}
            >
              <img
                src={activeScreen.src}
                alt={activeScreen.alt}
                width={1440}
                height={1040}
                loading="eager"
                fetchPriority="high"
                className="mx-auto max-h-[70vh] w-auto max-w-full rounded-[2px] object-contain sm:max-h-[74vh]"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <p
                id="product-lightbox-description"
                className="max-w-3xl text-[14px] leading-relaxed text-structural sm:text-[14.5px]"
              >
                {activeScreen.body}
              </p>

              {hasMultiple ? (
                <div className="flex items-center gap-2 sm:justify-end">
                  <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.12em] text-structural">
                    {activeIndex + 1} / {screens.length}
                  </span>
                  <button
                    type="button"
                    data-testid="product-lightbox-previous"
                    onClick={onPrevious}
                    className="rounded-full border border-navy/15 bg-white px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-navy transition-colors hover:border-navy/30 hover:bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    data-testid="product-lightbox-next"
                    onClick={onNext}
                    className="rounded-full border border-navy/15 bg-white px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-navy transition-colors hover:border-navy/30 hover:bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean"
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ProductScreenGallery({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const [, forceUpdate] = useReducer((count: number) => count + 1, 0);

  useEffect(() => {
    const state = getGalleryState(pathname);
    const listener = () => forceUpdate();
    state.listeners.add(listener);

    return () => {
      state.listeners.delete(listener);
    };
  }, [pathname]);

  const state = getGalleryState(pathname);

  return (
    <>
      {children}
      <ProductLightbox
        screens={state.screens}
        activeScreenId={state.activeScreenId}
        onClose={() => closeScreen(pathname)}
        onPrevious={() => moveScreen(pathname, -1)}
        onNext={() => moveScreen(pathname, 1)}
      />
    </>
  );
}

export function ProductScreenFrame({
  lightboxTitle,
  lightboxBody,
  label,
  alt,
  ...screen
}: ProductScreenFrameProps) {
  return (
    <ProductScreenFrameInner
      {...screen}
      alt={alt}
      label={label}
      title={lightboxTitle ?? label}
      body={lightboxBody ?? alt}
    />
  );
}

export function ProductScreenTile({ title, body, ...screen }: ProductScreenTileProps) {
  return (
    <article className="grid gap-4">
      <ProductScreenFrameInner
        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
        {...screen}
        title={title}
        body={body}
      />
      <div>
        <h3 className="mb-1.5 text-[15px] font-semibold">{title}</h3>
        <p className="text-[13.5px] leading-relaxed text-structural">{body}</p>
      </div>
    </article>
  );
}
