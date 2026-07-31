"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
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

export function Nav() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const companyButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        companyButtonRef.current?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, mobileOpen]);

  const navLinkClass = (active: boolean) =>
    `px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
      // Opaque wash + navy text so contrast holds over any page backdrop (~12.9:1).
      active ? "bg-ocean-wash text-navy" : "text-navy hover:text-ocean"
    }`;
  const mobileLinks = [...primaryLinks, ...companyLinks, ["Contact", "/contact"] as [string, string]];

  return (
    <header className="sticky top-0 z-50 px-0 pt-0 sm:px-3 sm:pt-3">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="shell">
        <div
          className={`liquid-glass liquid-glass--strong liquid-glass--unclipped lg-pad-sm relative z-50 mx-auto flex items-center justify-between gap-2 transition-shadow duration-200 ${
            scrolled ? "shadow-[0_12px_36px_rgba(1,43,109,0.12)]" : ""
          }`}
          style={{ borderRadius: 9999, paddingTop: "0.55rem", paddingBottom: "0.55rem" }}
        >
          <Link href="/" className="flex items-center" aria-label="CertaMaris home">
            <BrandLogo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5" ref={menuRef}>
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
              <div
                id="mega-menu"
                className="liquid-glass liquid-glass--strong lg-pad-none absolute right-0 top-full z-[60] mt-2 w-[min(320px,calc(100vw-2rem))]"
              >
                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mb-3">Company</p>
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

          <div className="hidden lg:flex items-center gap-1">
            <a
              href={APP_SIGN_IN_URL}
              className="px-3 py-2 rounded-md text-[15px] font-medium text-navy hover:text-ocean transition-colors"
              data-integration-point="sign-in"
            >
              Sign in
            </a>
            <a
              href={APP_GET_STARTED_URL}
              className="inline-flex items-center rounded-md bg-navy px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#0e3a68] transition-colors"
              data-integration-point="get-started"
            >
              {PRIMARY_CTA_LABEL}
            </a>
          </div>

          <button
            ref={mobileButtonRef}
            type="button"
            className="lg:hidden inline-flex items-center gap-2 text-navy font-medium"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
            <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
          </button>

          {mobileOpen && (
            <nav
              id="mobile-drawer"
              aria-label="Mobile"
              className="liquid-glass liquid-glass--strong lg-pad-none lg:hidden absolute left-0 right-0 top-full z-[60] mt-2"
            >
              <div className="py-5 px-4 flex flex-col gap-0.5">
                {mobileLinks.map(([label, href]) => (
                  <Link key={href} href={href} className="py-2.5 text-[16px] font-medium text-navy hairline-b">
                    {label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <a
                    href={APP_SIGN_IN_URL}
                    className="text-center py-2.5 text-[15px] font-medium border border-navy/20 rounded-md bg-white"
                    data-integration-point="sign-in"
                  >
                    Sign in
                  </a>
                  <a
                    href={APP_GET_STARTED_URL}
                    className="text-center py-2.5 text-[15px] font-semibold bg-navy text-white rounded-md"
                    data-integration-point="get-started"
                  >
                    {PRIMARY_CTA_LABEL}
                  </a>
                  <Button href="/platform" variant="secondary" className="justify-center">
                    {SECONDARY_CTA_LABEL}
                  </Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
