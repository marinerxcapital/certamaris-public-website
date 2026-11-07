"use client";

import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  closeProductGallery,
  getProductGalleryState,
  getProductGalleryVersion,
  moveProductScreen,
  subscribeProductGallery,
  type RegisteredProductScreen,
} from "@/components/ProductScreens";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

function getFocusable(dialog: HTMLElement) {
  return Array.from(
    dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

function ProductGalleryDialog({
  pathname,
  screen,
  screenIndex,
  screenCount,
  reduced,
}: {
  pathname: string;
  screen: RegisteredProductScreen;
  screenIndex: number;
  screenCount: number;
  reduced: boolean;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const titleId = "product-gallery-title";
  const descriptionId = "product-gallery-description";

  useEffect(() => {
    setImageFailed(false);
  }, [screen.id]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0)
      document.body.style.paddingRight = `${scrollbarWidth}px`;

    const focusFrame = window.requestAnimationFrame(() => {
      getFocusable(dialog)[0]?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProductGallery(pathname);
        return;
      }
      if (screenCount > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        moveProductScreen(pathname, -1);
        return;
      }
      if (screenCount > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        moveProductScreen(pathname, 1);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [pathname, screen.id, screenCount]);

  const originalHref = screen.fullSrc || screen.src;

  return createPortal(
    <div
      className={`product-gallery-overlay ${reduced ? "product-gallery-overlay--reduced" : ""}`}
      data-testid="product-lightbox-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeProductGallery(pathname);
      }}
    >
      <div
        ref={dialogRef}
        className="product-gallery-dialog"
        data-testid="product-lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="product-gallery-header">
          <div className="min-w-0">
            <p className="product-gallery-eyebrow">
              Application exhibit · {screen.label}
            </p>
            <h2 id={titleId} className="product-gallery-title">
              {screen.title}
            </h2>
          </div>
          <button
            type="button"
            data-testid="product-lightbox-close"
            className="product-gallery-close"
            onClick={() => closeProductGallery(pathname)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close exhibit</span>
          </button>
        </header>

        <div className="product-gallery-body">
          <div className="product-gallery-stage">
            {imageFailed ? (
              <div className="product-gallery-error" role="alert">
                <strong>Exhibit unavailable</strong>
                <span>
                  The full-resolution application capture could not be loaded.
                </span>
                <a
                  href={originalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the original asset
                </a>
              </div>
            ) : (
              <img
                src={originalHref}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                loading="eager"
                fetchPriority="high"
                className="product-gallery-image"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>

          <aside className="product-gallery-details">
            <div>
              <p id={descriptionId} className="product-gallery-description">
                {screen.body}
              </p>
              <p className="product-gallery-boundary">
                Sanitized product capture · demo-data context shown in the
                application surface.
              </p>
            </div>

            {screen.annotations.length > 0 ? (
              <div className="product-gallery-callouts">
                <p className="product-gallery-section-label">
                  Read the surface
                </p>
                <ol>
                  {screen.annotations.map((annotation, index) => (
                    <li key={annotation.id}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{annotation.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="product-gallery-actions">
              <a
                href={originalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="product-gallery-original"
              >
                Open original <span aria-hidden="true">↗</span>
              </a>
              {screenCount > 1 ? (
                <div
                  className="product-gallery-navigation"
                  aria-label="Exhibit navigation"
                >
                  <span className="product-gallery-counter" aria-live="polite">
                    {String(screenIndex + 1).padStart(2, "0")} /{" "}
                    {String(screenCount).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    data-testid="product-lightbox-previous"
                    className="product-gallery-nav"
                    onClick={() => moveProductScreen(pathname, -1)}
                    aria-label="Previous application exhibit"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    data-testid="product-lightbox-next"
                    className="product-gallery-nav"
                    onClick={() => moveProductScreen(pathname, 1)}
                    aria-label="Next application exhibit"
                  >
                    →
                  </button>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ProductGalleryHost() {
  const pathname = usePathname() ?? "/";
  const reduced = usePrefersReducedMotion();
  const subscribe = useCallback(
    (listener: () => void) => subscribeProductGallery(pathname, listener),
    [pathname],
  );
  const getSnapshot = useCallback(
    () => getProductGalleryVersion(pathname),
    [pathname],
  );
  const version = useSyncExternalStore(subscribe, getSnapshot, () => 0);
  const state = getProductGalleryState(pathname);
  void version;

  const activeIndex = state.screens.findIndex(
    (screen) => screen.id === state.activeScreenId,
  );
  const activeScreen = activeIndex >= 0 ? state.screens[activeIndex] : null;

  if (!activeScreen) return null;

  return (
    <ProductGalleryDialog
      pathname={pathname}
      screen={activeScreen}
      screenIndex={activeIndex}
      screenCount={state.screens.length}
      reduced={reduced}
    />
  );
}
