"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { APP_SIGN_IN_URL, APP_GET_STARTED_URL, PRIMARY_CTA_LABEL, SECONDARY_CTA_LABEL } from "@/lib/constants";

const primaryLinks: [string, string][] = [
  ["Platform", "/platform"],
  ["Solutions", "/solutions"],
  ["Industries", "/industries"],
  ["Compliance", "/compliance"],
  ["Resources", "/resources"],
];

const companyLinks: [string, string][] = [
  ["About", "/about"],
  ["Security & Trust", "/security"],
  ["Pricing", "/pricing"],
  ["FAQ", "/faq"],
];

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Nav() {
  const path = usePathname();
  const drawerId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const companyButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    // Restore focus after unmount
    requestAnimationFrame(() => mobileButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [path]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Body scroll lock
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
    const focusInitial = () => {
      closeButtonRef.current?.focus();
    };
    // Defer until portal paints
    const t = window.setTimeout(focusInitial, 0);

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

  // Desktop company menu Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      companyButtonRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const navLinkClass = (active: boolean) =>
    `px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
      active ? "bg-ocean-wash text-navy" : "text-navy hover:text-ocean"
    }`;

  const mobileLinks = [...primaryLinks, ...companyLinks, ["Contact", "/contact"] as [string, string]];

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
              {mobileLinks.map(([label, href]) => {
                const active = href === "/resources" ? path.startsWith("/resources") : path === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`nav-mobile-link ${active ? "nav-mobile-link--active" : ""}`}
                      onClick={closeMobile}
                    >
                      {label}
                    </Link>
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
                Sign in
              </a>
              <a
                href={APP_GET_STARTED_URL}
                className="nav-mobile-action nav-mobile-action--primary"
                data-integration-point="get-started"
                onClick={closeMobile}
              >
                {PRIMARY_CTA_LABEL}
              </a>
              <Link href="/platform" className="nav-mobile-action nav-mobile-action--ghost" onClick={closeMobile}>
                {SECONDARY_CTA_LABEL}
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
          className={`nav-bar liquid-glass liquid-glass--strong relative z-50 flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4 ${
            scrolled ? "shadow-[0_12px_36px_rgba(1,43,109,0.12)]" : ""
          }`}
        >
          <Link href="/" className="flex min-w-0 shrink items-center" aria-label="CertaMaris home">
            <BrandLogo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex" ref={menuRef}>
            {primaryLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={navLinkClass(href === "/resources" ? path.startsWith("/resources") : path === href)}
              >
                {label}
              </Link>
            ))}
            <button
              ref={companyButtonRef}
              type="button"
              className={`flex items-center gap-1 ${navLinkClass(menuOpen || companyLinks.some(([, href]) => path === href))}`}
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? "mega-menu" : undefined}
              onClick={() => setMenuOpen((v) => !v)}
            >
              Company
              <span aria-hidden="true" className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}>
                ⌄
              </span>
            </button>

            {menuOpen && (
              <div id="mega-menu" className="nav-dropdown absolute right-0 top-full z-[60] mt-2 w-[min(320px,calc(100vw-2rem))]">
                <div className="p-5">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-structural">Company</p>
                  <ul className="grid gap-1">
                    {companyLinks.map(([label, href]) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="block rounded-md px-3 py-2 text-[15px] text-navy transition-colors hover:bg-ocean-wash hover:text-navy"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </nav>

          <div className="hidden items-center gap-1 lg:flex">
            <a
              href={APP_SIGN_IN_URL}
              className="rounded-md px-3 py-2 text-[15px] font-medium text-navy transition-colors hover:text-ocean"
              data-integration-point="sign-in"
            >
              Sign in
            </a>
            <a
              href={APP_GET_STARTED_URL}
              className="inline-flex items-center rounded-md bg-navy px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0e3a68]"
              data-integration-point="get-started"
            >
              {PRIMARY_CTA_LABEL}
            </a>
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
