import Link from "next/link";
import {
  FOUNDER_IMAGE,
  FOUNDER_IMAGE_SRCSET,
  FOUNDER_NAME,
  FOUNDER_TITLE_LONG,
} from "@/lib/founder";

/**
 * Trimmed founder summary derived from FOUNDER_FULL_BIO in lib/founder.ts.
 * The long-form biography stays intact on /about/leadership.
 */
const FOUNDER_CARD_SUMMARY =
  "Skyler Brown founded CertaMaris to bring maritime cyber compliance and continuous assurance into one controlled, traceable operating environment across company, fleet, and vessel levels. His background spans vessel operations, software development, data-systems design, and maritime cybersecurity technology.";

const FOUNDER_CREDENTIAL_TAG = "Third Mate, Unlimited Tonnage, Oceans";

/** Responsive srcset sizing for a three-column grid card. */
const GRID_IMAGE_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw";

const PLACEHOLDER_COUNT = 5;

function FounderCard() {
  return (
    <article className="premium-card flex h-full flex-col p-6">
      <div className="relative mb-5 aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[12px] bg-ocean-wash">
        <picture>
          <source type="image/avif" srcSet={FOUNDER_IMAGE_SRCSET.avif} sizes={GRID_IMAGE_SIZES} />
          <source type="image/webp" srcSet={FOUNDER_IMAGE_SRCSET.webp} sizes={GRID_IMAGE_SIZES} />
          <source type="image/jpeg" srcSet={FOUNDER_IMAGE_SRCSET.jpeg} sizes={GRID_IMAGE_SIZES} />
          {/* eslint-disable-next-line @next/next/no-img-element -- static export; unoptimized plain img */}
          <img
            src={FOUNDER_IMAGE.src}
            alt={FOUNDER_IMAGE.alt}
            width={FOUNDER_IMAGE.width}
            height={FOUNDER_IMAGE.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </picture>
      </div>
      <h3 className="mb-1 text-[17px] font-semibold text-navy">{FOUNDER_NAME}</h3>
      <p className="mb-3 text-[13.5px] font-medium text-ocean">{FOUNDER_TITLE_LONG}</p>
      <p className="mb-4 text-[14px] leading-relaxed text-structural">{FOUNDER_CARD_SUMMARY}</p>
      <span className="mb-3 inline-flex w-fit items-center rounded-full border border-navy/15 bg-white/70 px-3 py-1 text-[12px] font-medium text-navy/85">
        {FOUNDER_CREDENTIAL_TAG}
      </span>
      <Link
        href="/about/leadership"
        className="text-[13.5px] font-semibold text-ocean hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
      >
        Full profile
      </Link>
    </article>
  );
}

function PlaceholderCard() {
  return (
    <article className="premium-card flex h-full flex-col p-6">
      <div className="relative mb-5 aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[12px] bg-ocean-wash">
        <svg
          viewBox="0 0 120 150"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <rect width="120" height="150" fill="#E7F3FB" />
          <circle cx="60" cy="48" r="23" fill="#4FADE0" />
          <path d="M60 78c-25 0-41 20-41 45v27h82v-27c0-25-16-45-41-45z" fill="#4FADE0" />
        </svg>
      </div>
      <p className="mb-3 text-[13.5px] font-medium text-ocean">Executive — Joining Soon</p>
      <p className="text-[14px] leading-relaxed text-structural">Biography will be published when the role is filled.</p>
    </article>
  );
}

export function LeadershipGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <FounderCard />
      {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
        <PlaceholderCard key={index} />
      ))}
    </div>
  );
}
