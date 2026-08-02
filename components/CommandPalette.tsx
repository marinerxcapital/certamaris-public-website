"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NAV_PRIMARY, TRUST_LINKS, UTILITY_LINKS } from "@/lib/constants";

type PaletteEntry = {
  label: string;
  href: string;
  group: string;
  /** lowercase haystack for matching */
  haystack: string;
};

function buildEntries(): PaletteEntry[] {
  const seen = new Set<string>();
  const entries: PaletteEntry[] = [];
  const add = (label: string, href: string, group: string) => {
    if (seen.has(href)) return;
    seen.add(href);
    entries.push({ label, href, group, haystack: `${label} ${group} ${href}`.toLowerCase() });
  };
  add("Home", "/", "Navigate");
  for (const group of NAV_PRIMARY) {
    for (const link of group.children) add(link.label, link.href, group.label);
  }
  for (const link of TRUST_LINKS) add(link.label, link.href, "Trust");
  for (const link of UTILITY_LINKS) add(link.label, link.href, "Company");
  return entries;
}

function matchEntries(entries: PaletteEntry[], query: string): PaletteEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return entries.slice(0, 12);
  const starts: PaletteEntry[] = [];
  const includes: PaletteEntry[] = [];
  for (const entry of entries) {
    if (entry.label.toLowerCase().startsWith(q)) starts.push(entry);
    else if (entry.haystack.includes(q)) includes.push(entry);
  }
  return [...starts, ...includes].slice(0, 12);
}

/**
 * Site-wide command palette (Ctrl+K / ⌘K). First-party, keyboard-first
 * navigation over the same IA constants the nav and footer already use.
 * ARIA combobox + listbox pattern; focus is restored on close.
 */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const listId = useId();
  const entries = useMemo(buildEntries, []);
  const results = useMemo(() => matchEntries(entries, query), [entries, query]);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    previousFocus.current?.focus?.();
  }, []);

  const openPalette = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  // Global shortcut
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else openPalette();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, openPalette]);

  // Focus the input when opened; lock page scroll while open
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[activeIndex];
      if (target) go(target.href);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      // single-field dialog: keep focus on the input
      event.preventDefault();
    }
  };

  return (
    <>
      <button
        type="button"
        className="palette-trigger"
        onClick={openPalette}
        aria-label="Open site search (Control K)"
      >
        <span aria-hidden="true" className="palette-trigger-icon">
          ⌕
        </span>
        <span className="palette-trigger-hint" aria-hidden="true">
          Ctrl K
        </span>
      </button>
      {mounted && open
        ? createPortal(
            <div
              className="palette-overlay"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation search"
                className="palette-panel liquid-glass liquid-glass--strong"
              >
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-activedescendant={results[activeIndex] ? `${listId}-${activeIndex}` : undefined}
                  aria-label="Search pages"
                  placeholder="Search pages — try “pricing”, “evidence”, “trust”…"
                  className="palette-input"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                />
                <ul id={listId} role="listbox" aria-label="Pages" className="palette-results">
                  {results.length === 0 ? (
                    <li className="palette-empty" role="presentation">
                      No pages match “{query}”.
                    </li>
                  ) : (
                    results.map((entry, index) => (
                      <li
                        key={entry.href}
                        id={`${listId}-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`palette-option ${index === activeIndex ? "palette-option--active" : ""}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          go(entry.href);
                        }}
                      >
                        <span className="palette-option-label">{entry.label}</span>
                        <span className="palette-option-group">{entry.group}</span>
                      </li>
                    ))
                  )}
                </ul>
                <p className="palette-footer" aria-hidden="true">
                  ↑↓ navigate · Enter open · Esc close
                </p>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
