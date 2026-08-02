"use client";

import { usePathname } from "next/navigation";

/**
 * Ledger-style mono route label for interior page heroes, e.g.
 * `PLATFORM · EVIDENCE`. Derived from the pathname so pages don't need to
 * pass anything. Decorative (breadcrumbs/nav carry the semantics), so it is
 * hidden from assistive tech.
 */
export function LedgerRoute() {
  const path = usePathname();
  if (!path || path === "/") return null;
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const label = segments.map((segment) => segment.replace(/-/g, " ")).join(" · ");
  return (
    <p className="ledger-route mb-3" aria-hidden="true">
      {label}
    </p>
  );
}
