"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { CommandPalette } from "@/components/CommandPalette";
import {
  APP_GET_STARTED_URL,
  APP_SIGN_IN_URL,
  NAV_PRIMARY,
  PRIMARY_CTA_LABEL,
  SIGN_IN_LABEL,
  hrefPathname,
  isNavGroupActive,
  isNavLinkActive,
  type NavMenuGroup,
  type SiteLink,
} from "@/lib/constants";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function megaColumns(groupId: string): string {
  if (groupId === "product" || groupId === "solutions") return "sm:grid-cols-2 lg:grid-cols-3";
  if (groupId === "company") return "sm:grid-cols-2";
  return "sm:grid-cols-2";
}

function MegaPanel({
  group,
  path,
  onNavigate,
}: {
  group: NavMenuGroup;
  path: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural">{group.label}</p>
        {group.href ? (
          <Link
            href={group.href}
            className="text-[13px] font-semibold text-ocean transition-colors hover:text-navy"
            onClick={onNavigate}
          >
            View all
            <span aria-hidden="true"> →</span>
          </Link>
        ) : null}
      </div>
      <ul className={`grid gap-0.5 ${megaColumns(group.id)}`}>
        {group.children.map((item) => {
          const active = isNavLinkActive(path, item.href);
          return (
            <li key={`${group.id}-${item.href}-${item.label}`}>
              <Link
                href={item.href}
                className={`block rounded-md px-3 py-2 text-[14px] leading-snug transition-colors ${
                  active
                    ? "bg-ocean-wash font-semibold text-navy"
                    : "text-navy hover:bg-ocean-wash hover:text-navy"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Nav() {
  const path = usePathname();
  const drawerId = useId();
  const menuBaseId = useId();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const closeDesktopMenu = useCallback(() => setOpenMenuId(null), []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    requestAnimationFrame(() => mobileButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    setOpenMenuId(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [path]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop mega on outside click
  useEffect(() => {
    function close(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Body scroll lock for mobile sheet
  useEffect(() => {
    if (!mobileOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    const prevWidth = body.style.width;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.style.position = prevPosition;
      body.style.top = prevTop;
      body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  // Focus trap + Escape for mobile sheet
  useEffect(() => {
    if (!mobileOpen) return;

    const sheet = sheetRef.current;
    const t = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobile();
        return;
      }
      if (event.key !== "Tab" || !sheet) return;
      const nodes = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey) {
        if (active === first || !sheet.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, closeMobile]);

  // Desktop mega Escape + left/right between menu buttons
  useEffect(() => {
    if (!openMenuId) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        const id = openMenuId;
        setOpenMenuId(null);
        if (id) menuButtonRefs.current[id]?.focus();
        return;
      }
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const ids = NAV_PRIMARY.map((g) => g.id);
      const idx = ids.indexOf(openMenuId!);
      if (idx < 0) return;
      event.preventDefault();
      const next =
        event.key === "ArrowRight"
          ? ids[(idx + 1) % ids.length]
          : ids[(idx - 1 + ids.length) % ids.length];
      setOpenMenuId(next);
      menuButtonRefs.current[next]?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenuId]);

  const navLinkClass = (active: boolean) =>
    `px-2.5 py-2 rounded-md text-[14px] font-medium transition-colors xl:px-3 xl:text-[15px] ${
      active ? "bg-ocean-wash text-navy" : "text-navy hover:text-ocean"
    }`;

  const openGroup = NAV_PRIMARY.find((g) => g.id === openMenuId) ?? null;

  const toggleMobileSection = (id: string) => {
    setMobileExpanded((prev) => (prev === id ? null : id));
  };

  const mobileSheet =
    mounted &&
    mobileOpen &&
    createPortal(
      <div className="nav-mobile-root lg:hidden" role="presentation">
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={closeMobile}
        />
        <nav
          ref={sheetRef}
          id={drawerId}
          className="nav-mobile-sheet"
          aria-label="Mobile navigation"
          aria-modal="true"
          role="dialog"
        >
          <div className="nav-mobile-sheet-header">
            <Link href="/" className="flex min-w-0 items-center" aria-label="CertaMaris home" onClick={closeMobile}>
              <BrandLogo />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="nav-mobile-close"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <span aria-hidden="true">✕</span>
              <span>Close</span>
            </button>
          </div>

          <div className="nav-mobile-sheet-body">
            <ul className="nav-mobile-link-list">
              {NAV_PRIMARY.map((group) => {
                const groupActive = isNavGroupActive(path, group);
                const expanded = mobileExpanded === group.id;
                const panelId = `${drawerId}-${group.id}-panel`;
                return (
                  <li key={group.id}>
                    <button
                      type="button"
                      className={`nav-mobile-link flex w-full items-center justify-between text-left ${
                        groupActive ? "nav-mobile-link--active" : ""
                      }`}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => toggleMobileSection(group.id)}
                    >
                      <span>{group.label}</span>
                      <span
                        aria-hidden="true"
                        className={`ml-2 text-[12px] transition-transform ${expanded ? "rotate-180" : ""}`}
                      >
                        ⌄
                      </span>
                    </button>
                    {expanded ? (
                      <ul id={panelId} className="border-b border-[rgba(11,42,74,0.08)] bg-[rgba(231,243,251,0.35)] pb-2">
                        {group.children.map((item: SiteLink) => {
                          const active = isNavLinkActive(path, item.href);
                          const isHub =
                            group.href != null && hrefPathname(item.href) === hrefPathname(group.href);
                          return (
                            <li key={`m-${group.id}-${item.href}-${item.label}`}>
                              <Link
                                href={item.href}
                                className={`block px-5 py-2.5 text-[15px] ${
                                  isHub || active ? "font-semibold " : ""
                                }${active ? "text-ocean" : "text-navy/85"}`}
                                aria-current={active ? "page" : undefined}
                                onClick={closeMobile}
                              >
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <div className="nav-mobile-actions">
              <a
                href={APP_SIGN_IN_URL}
                className="nav-mobile-action nav-mobile-action--secondary"
                data-integration-point="sign-in"
                onClick={closeMobile}
              >
                {SIGN_IN_LABEL}
              </a>
              <Link
                href={APP_GET_STARTED_URL}
                className="nav-mobile-action nav-mobile-action--primary"
                data-integration-point="get-started"
                onClick={closeMobile}
              >
                {PRIMARY_CTA_LABEL}
              </Link>
            </div>
          </div>
        </nav>
      </div>,
      document.body
    );

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="shell relative">
        <div
          className={`nav-bar liquid-glass liquid-glass--strong liquid-glass--unclipped relative z-50 flex items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 ${
            scrolled ? "shadow-[0_12px_36px_rgba(1,43,109,0.12)]" : ""
          }`}
        >
          <Link href="/" className="flex min-w-0 shrink items-center" aria-label="CertaMaris home">
            <BrandLogo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0 lg:flex" ref={menuRef}>
            {NAV_PRIMARY.map((group) => {
              const active = isNavGroupActive(path, group) || openMenuId === group.id;
              const panelId = `${menuBaseId}-${group.id}`;
              const isOpen = openMenuId === group.id;
              return (
                <button
                  key={group.id}
                  ref={(el) => {
                    menuButtonRefs.current[group.id] = el;
                  }}
                  type="button"
                  className={`flex items-center gap-1 ${navLinkClass(active)}`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-controls={isOpen ? panelId : undefined}
                  onClick={() => setOpenMenuId((prev) => (prev === group.id ? null : group.id))}
                >
                  {group.label}
                  <span
                    aria-hidden="true"
                    className={`text-[11px] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    ⌄
                  </span>
                </button>
              );
            })}

            {openGroup ? (
              <div
                id={`${menuBaseId}-${openGroup.id}`}
                role="region"
                aria-label={`${openGroup.label} menu`}
                className="nav-dropdown absolute left-0 right-0 top-full z-[60] mt-2 w-full max-h-[min(70vh,560px)] overflow-y-auto"
              >
                <MegaPanel group={openGroup} path={path} onNavigate={closeDesktopMenu} />
              </div>
            ) : null}
          </nav>

          <div className="hidden items-center gap-1 lg:flex">
            <CommandPalette />
            <a
              href={APP_SIGN_IN_URL}
              className="rounded-md px-3 py-2 text-[14px] font-medium text-navy transition-colors hover:text-ocean xl:text-[15px]"
              data-integration-point="sign-in"
            >
              {SIGN_IN_LABEL}
            </a>
            <Link
              href={APP_GET_STARTED_URL}
              className="inline-flex items-center rounded-md bg-navy px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0e3a68] xl:px-5 xl:text-[15px]"
              data-integration-point="get-started"
            >
              {PRIMARY_CTA_LABEL}
            </Link>
          </div>

          <button
            ref={mobileButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-md px-3 py-2 text-[15px] font-semibold text-navy lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={drawerId}
            aria-haspopup="dialog"
            onClick={() => setMobileOpen((v) => !v)}
          >
            Menu
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>
      {mobileSheet}
    </header>
  );
}
