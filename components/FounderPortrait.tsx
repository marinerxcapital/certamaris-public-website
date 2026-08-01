import {
  FOUNDER_IMAGE,
  FOUNDER_IMAGE_SIZES,
  FOUNDER_IMAGE_SRCSET,
} from "@/lib/founder";

export type FounderPortraitSize = "sm" | "md" | "lg";

export type FounderPortraitProps = {
  className?: string;
  /** Eager-load for above-the-fold placements (about/leadership hero). */
  priority?: boolean;
  /** Display scale for the frame. Defaults to `md`. */
  size?: FounderPortraitSize;
  /**
   * Optional sizes override for responsive srcset selection.
   * Defaults to FOUNDER_IMAGE_SIZES from lib/founder.
   */
  sizes?: string;
};

/**
 * Display widths for the portrait frame (CSS). Intrinsic img width/height
 * stay at FOUNDER_IMAGE master dimensions to preserve aspect and prevent CLS;
 * object-fit cover + object-position center top keeps the face framed.
 */
const SIZE_CLASS: Record<FounderPortraitSize, string> = {
  sm: "w-36 sm:w-40",
  md: "w-52 sm:w-60 md:w-72",
  lg: "w-64 sm:w-80 md:w-[22rem] lg:w-96",
};

/**
 * Responsive founder portrait using pre-generated AVIF / WebP / JPEG derivatives.
 * Plain picture + img for static export compatibility (no next/image).
 *
 * Assets: `public/images/leadership/skyler-brown-founder-certamaris*`
 * Alt text is fixed from FOUNDER_IMAGE (approved string).
 */
export function FounderPortrait({
  className = "",
  priority = false,
  size = "md",
  sizes = FOUNDER_IMAGE_SIZES,
}: FounderPortraitProps) {
  const { src, alt, width, height } = FOUNDER_IMAGE;

  return (
    <figure
      className={[
        "founder-portrait premium-card relative m-0 overflow-hidden p-0",
        SIZE_CLASS[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <picture>
        <source type="image/avif" srcSet={FOUNDER_IMAGE_SRCSET.avif} sizes={sizes} />
        <source type="image/webp" srcSet={FOUNDER_IMAGE_SRCSET.webp} sizes={sizes} />
        <source type="image/jpeg" srcSet={FOUNDER_IMAGE_SRCSET.jpeg} sizes={sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element -- static export; unoptimized plain img */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="block h-auto w-full object-cover object-top"
          style={{ aspectRatio: `${width} / ${height}` }}
        />
      </picture>
    </figure>
  );
}
