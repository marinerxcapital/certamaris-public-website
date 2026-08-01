"use client";

import { useEffect, useState } from "react";

type ComponentStatus = {
  id: string;
  name: string;
  status: "operational" | "degraded";
};

type StatusResponse = {
  checkedAt: string;
  components: ComponentStatus[];
};

export function StatusMonitor() {
  const [result, setResult] = useState<StatusResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/status", { signal: controller.signal, cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Status request failed");
        return response.json() as Promise<StatusResponse>;
      })
      .then(setResult)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  if (failed) {
    return (
      <div
        role="status"
        className="rounded-md border p-5 text-[14px] text-navy"
        style={{ borderColor: "color-mix(in srgb, var(--status-caution) 30%, transparent)", background: "var(--status-caution-bg)" }}
      >
        Live status is temporarily unavailable. Use the support channel below for current operational information.
      </div>
    );
  }

  if (!result) {
    return <p role="status" className="text-[14px] text-structural">Checking live service status…</p>;
  }

  return (
    <div aria-live="polite">
      <ul className="grid gap-3" aria-label="Current CertaMaris component status">
        {result.components.map((component) => (
          <li key={component.id} className="flex items-center justify-between gap-4 rounded-md border border-navy/10 bg-white p-4">
            <span className="text-[14px] font-semibold text-navy">{component.name}</span>
            <span
              className={
                component.status === "operational"
                  ? "rounded-sm bg-[#e8f5ed] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#17663a]"
                  : "rounded-sm px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
              }
              style={component.status === "degraded" ? { background: "var(--status-caution-bg)", color: "var(--status-caution)" } : undefined}
            >
              {component.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12.5px] text-structural">
        Last checked <time dateTime={result.checkedAt}>{new Date(result.checkedAt).toLocaleString()}</time>. Status is based on live endpoint probes and does not represent a contractual SLA.
      </p>
    </div>
  );
}
