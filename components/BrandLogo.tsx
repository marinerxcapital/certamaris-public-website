type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <span className={`certamaris-logo inline-flex items-center gap-1.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/optimized/certamaris-mark-64.webp"
        alt=""
        width={32}
        height={32}
        className="certamaris-logo-mark h-8 w-8 shrink-0"
        aria-hidden="true"
        role="presentation"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/optimized/certamaris-wordmark-284.webp"
        alt="CertaMaris"
        width={142}
        height={32}
        className="h-8 w-auto"
      />
    </span>
  );
}
