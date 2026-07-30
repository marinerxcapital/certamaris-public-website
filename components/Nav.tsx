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

  const navLinkClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-[15px] font-medium transition-colors ${
      // Opaque wash + navy text (not translucent ocean/10 + ocean text): the
      // floating nav sits over the hero photo when unscrolled, and a
      // translucent tint's effective contrast depends on whatever photo
      // region is behind it. Measured worst case for the previous
      // combination (dark photo region under bg-white/80 backdrop-blur)
      // was ~3:1, failing AA. This pairing holds ~12.9:1 regardless of backdrop.
      active ? "bg-ocean-wash text-navy" : "text-navy hover:text-ocean"
    }`;
  const mobileLinks = [...primaryLinks, ...companyLinks, ["Contact", "/contact"] as [string, string]];

  return (
    <header className="sticky top-3 sm:top-4 z-50 px-3 sm:px-4">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="shell">
        <div
          className={`relative mx-auto flex items-center justify-between gap-2 rounded-full border backdrop-blur-xl px-3 sm:px-4 py-2 transition-shadow duration-200 ${
            scrolled ? "bg-white/95 border-structural/10 shadow-card" : "bg-white/80 border-structural/10 shadow-sm"
          }`}
        >
          <Link href="/" className="flex items-center pl-1" aria-label="CertaMaris home">
            <BrandLogo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1" ref={menuRef}>
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
              type="button"
              className={`flex items-center gap-1 ${navLinkClass(menuOpen || companyLinks.some(([, href]) => path === href))}`}
              aria-expanded={menuOpen}
              aria-controls="mega-menu"
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
                className="absolute right-4 top-full mt-3 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-structural/10 bg-white shadow-card"
              >
                <div className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mb-3">Company</p>
                  <ul className="grid gap-2">
                    {companyLinks.map(([label, href]) => (
                      <li key={href}>
                        <Link href={href} className="block rounded-md px-3 py-2 text-[15px] text-navy transition-colors hover:bg-ocean-wash hover:text-navy">
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
            <a href={APP_SIGN_IN_URL} className="px-4 py-2 rounded-full text-[15px] font-medium text-navy hover:text-ocean transition-colors" data-integration-point="sign-in">
              Sign in
            </a>
            <a
              href={APP_GET_STARTED_URL}
              className="inline-flex items-center rounded-full bg-navy px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#0e3a68] transition-colors"
              data-integration-point="get-started"
            >
              {PRIMARY_CTA_LABEL}
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center gap-2 text-navy font-medium pr-1"
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
              className="lg:hidden absolute left-0 right-0 top-full mt-3 rounded-2xl border border-structural/10 bg-white shadow-card"
            >
              <div className="py-6 px-6 flex flex-col gap-1">
                {mobileLinks.map(([label, href]) => (
                  <Link key={href} href={href} className="py-2.5 text-[16px] font-medium text-navy hairline-b">
                    {label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <a href={APP_SIGN_IN_URL} className="text-center py-2.5 text-[15px] font-medium border border-navy/20 rounded-full" data-integration-point="sign-in">
                    Sign in
                  </a>
                  <a href={APP_GET_STARTED_URL} className="text-center py-2.5 text-[15px] font-semibold bg-navy text-white rounded-full" data-integration-point="get-started">
                    {PRIMARY_CTA_LABEL}
                  </a>
                  <Button href="/platform" variant="secondary" className="justify-center rounded-full">
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
