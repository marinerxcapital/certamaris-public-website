import { Button } from "@/components/Button";
import type { PackageTier, PricingTier } from "@/lib/faq-pricing";

export function PricingPackageCard({
  pkg,
  pricing,
  ctaLabel = "Request quote",
  ctaHref = "/contact?intent=sales",
  ctaVariant = "secondary",
}: {
  pkg: PackageTier;
  pricing?: PricingTier;
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <article className="premium-card flex h-full flex-col p-6">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ocean">{pkg.audience}</p>
      <h3 className="mb-2 text-[19px] font-semibold">{pkg.name}</h3>
      <p className="mb-4 text-[13.5px] leading-relaxed text-structural">{pkg.summary}</p>
      {pricing ? (
        <div className="mb-4 border-t border-navy/8 pt-3">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean">
            {pricing.platformFee} + {pricing.vesselPrice}
          </p>
          <p className="mt-1 text-[12.5px] text-structural">{pricing.minimumNote}</p>
        </div>
      ) : null}
      <ul className="flex-1 space-y-2.5">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-[14px] leading-relaxed text-structural">
            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <Button href={ctaHref} variant={ctaVariant} className="w-full">
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
