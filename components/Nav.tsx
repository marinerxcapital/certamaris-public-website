"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { NAV_GROUPS, APP_SIGN_IN_URL, APP_GET_STARTED_URL } from "@/lib/constants";

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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-shadow duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur border-structural/10 shadow-sm" : "bg-white/70 border-transparent"
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center" aria-label="CertaMaris home">
          <BrandLogo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1" ref={menuRef}>
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-navy hover:text-ocean transition-colors"
            aria-expanded={menuOpen}
            aria-controls="mega-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            Product
            <span aria-hidden="true" className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}>
              ⌄
            </span>
          </button>
          <Link href="/resources" className={`px-3 py-2 text-[15px] font-medium hover:text-ocean transition-colors ${path.startsWith("/resources") ? "text-ocean" : "text-navy"}`}>
            Resources
          </Link>
          <Link href="/pricing" className={`px-3 py-2 text-[15px] font-medium hover:text-ocean transition-colors ${path === "/pricing" ? "text-ocean" : "text-navy"}`}>
            Pricing
          </Link>
          <Link href="/about" className={`px-3 py-2 text-[15px] font-medium hover:text-ocean transition-colors ${path === "/about" ? "text-ocean" : "text-navy"}`}>
            About
          </Link>

          {menuOpen && (
            <div id="mega-menu" className="absolute left-0 right-0 top-full bg-white border-b border-structural/10 shadow-card">
              <div className="shell grid grid-cols-2 gap-8 py-8">
                {NAV_GROUPS.map((group) => (
                  <div key={group.title}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-structural mb-3">{group.title}</p>
                    <ul className="space-y-2">
                      {group.links.map(([label, href]) => (
                        <li key={href}>
                          <Link href={href} className="text-[15px] text-navy hover:text-ocean transition-colors">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a href={APP_SIGN_IN_URL} className="px-4 py-2 text-[15px] font-medium text-navy hover:text-ocean transition-colors" data-integration-point="sign-in">
            Sign in
          </a>
          <a
            href={APP_GET_STARTED_URL}
            className="inline-flex items-center rounded-sm bg-navy px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#0e3a68] transition-colors"
            data-integration-point="get-started"
          >
            Get started
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center gap-2 text-navy font-medium"
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "Close" : "Menu"}
          <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-drawer" aria-label="Mobile" className="lg:hidden border-t border-structural/10 bg-white">
          <div className="shell py-6 flex flex-col gap-1">
            {NAV_GROUPS.flatMap((g) => g.links).map(([label, href]) => (
              <Link key={href} href={href} className="py-2.5 text-[16px] font-medium text-navy hairline-b">
                {label}
              </Link>
            ))}
            <Link href="/pricing" className="py-2.5 text-[16px] font-medium text-navy hairline-b">
              Pricing
            </Link>
            <Link href="/contact" className="py-2.5 text-[16px] font-medium text-navy">
              Contact
            </Link>
            <div className="flex flex-col gap-3 mt-4">
              <a href={APP_SIGN_IN_URL} className="text-center py-2.5 text-[15px] font-medium border border-navy/20 rounded-sm" data-integration-point="sign-in">
                Sign in
              </a>
              <a href={APP_GET_STARTED_URL} className="text-center py-2.5 text-[15px] font-semibold bg-navy text-white rounded-sm" data-integration-point="get-started">
                Get started
              </a>
              <Button href="/contact" variant="secondary" className="justify-center">
                Book a demo
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
