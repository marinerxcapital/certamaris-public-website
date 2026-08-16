import Link from "next/link";
import { EvidenceChain } from "@/components/EvidenceChain";

/**
 * Shared custody-thread strip band for interior section landings.
 * Keeps the homepage signature motif visible without re-running the spine.
 */
export function CustodyStripBand({
  href = "/#evidence-chain",
  label = "Follow the chain of custody",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <div className="custody-strip-band border-b" style={{ borderColor: "var(--hairline)" }}>
      <div className="shell py-5 sm:py-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
            01 REQ → 10 PKG
          </p>
          <Link href={href} className="text-[13px] font-semibold text-ocean hover:underline">
            {label}
          </Link>
        </div>
        <EvidenceChain variant="strip" />
      </div>
    </div>
  );
}
