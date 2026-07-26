type Status = "ok" | "caution" | "critical" | "pending";

const config: Record<Status, { label: string; bg: string; fg: string; symbol: string }> = {
  ok: { label: "Compliant", bg: "var(--status-ok-bg)", fg: "var(--status-ok)", symbol: "✓" },
  caution: { label: "In progress", bg: "var(--status-caution-bg)", fg: "var(--status-caution)", symbol: "●" },
  critical: { label: "Overdue", bg: "var(--status-critical-bg)", fg: "var(--status-critical)", symbol: "!" },
  pending: { label: "Pending", bg: "var(--surface-raised)", fg: "var(--ink-tertiary)", symbol: "○" },
};

export function StatusBadge({ status, label }: { status: Status; label?: string }) {
  const c = config[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[12px] font-mono font-medium"
      style={{ background: c.bg, color: c.fg }}
    >
      <span aria-hidden="true">{c.symbol}</span>
      {label ?? c.label}
    </span>
  );
}
