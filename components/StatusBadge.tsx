type Status = "ok" | "caution" | "critical" | "pending" | "info" | "inactive";

export type TrustMaturityStatus =
  | "current"
  | "configurable"
  | "planned"
  | "not_claimed"
  | "available_under_nda";

const config: Record<Status, { label: string; bg: string; fg: string; symbol: string }> = {
  ok: { label: "Compliant", bg: "var(--status-ok-bg)", fg: "var(--status-ok)", symbol: "✓" },
  caution: { label: "In progress", bg: "var(--status-caution-bg)", fg: "var(--status-caution)", symbol: "●" },
  critical: { label: "Overdue", bg: "var(--status-critical-bg)", fg: "var(--status-critical)", symbol: "!" },
  info: { label: "Info", bg: "var(--status-info-bg)", fg: "var(--status-info)", symbol: "i" },
  inactive: { label: "Inactive", bg: "var(--status-inactive-bg)", fg: "var(--status-inactive)", symbol: "○" },
  /* pending remains supported as gray/inactive semantic */
  pending: { label: "Pending", bg: "var(--status-inactive-bg)", fg: "var(--status-inactive)", symbol: "○" },
};

/** Canonical maturity → badge mapping for Security / Trust Center pages. */
export const TRUST_MATURITY_BADGE: Record<
  TrustMaturityStatus,
  { badgeStatus: Status; label: string }
> = {
  current: { badgeStatus: "ok", label: "Current" },
  configurable: { badgeStatus: "caution", label: "Configurable" },
  planned: { badgeStatus: "inactive", label: "Planned" },
  not_claimed: { badgeStatus: "inactive", label: "Not claimed" },
  available_under_nda: { badgeStatus: "info", label: "Available under NDA" },
};

type StatusBadgeProps =
  | { status: Status; label?: string; trustStatus?: never }
  | { trustStatus: TrustMaturityStatus; label?: string; status?: never };

export function StatusBadge(props: StatusBadgeProps) {
  const resolved =
    "trustStatus" in props && props.trustStatus
      ? TRUST_MATURITY_BADGE[props.trustStatus]
      : { badgeStatus: props.status as Status, label: props.label };

  const c = config[resolved.badgeStatus];
  const text = props.label ?? resolved.label ?? c.label;

  return (
    <span
      role="status"
      aria-label={text}
      className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[12px] font-mono font-medium"
      style={{ background: c.bg, color: c.fg }}
    >
      <span aria-hidden="true">{c.symbol}</span>
      {text}
    </span>
  );
}
