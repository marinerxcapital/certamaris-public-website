/**
 * Canonical founder biography, credentials, and portrait assets for CertaMaris public marketing.
 * Approved content only — do not invent titles, legal entity claims, customers, or certifications.
 */

export const FOUNDER_NAME = "Skyler Brown";
export const FOUNDER_TITLE = "Founder";
export const FOUNDER_TITLE_LONG = "Founder, CertaMaris";
/** Executive contact only — do not promote as a general sales inbox. */
export const FOUNDER_EMAIL = "skyler@certamaris.com";

export const FOUNDER_FULL_BIO =
  "Skyler Brown is the founder of CertaMaris, a maritime cybersecurity compliance and continuous-assurance platform designed to connect regulatory requirements, vessel systems, assessments, evidence, findings, cyber risks, corrective actions, cybersecurity plans, quality review, and readiness reporting across maritime companies and their fleets.\n\n" +
  "Brown earned a Bachelor of Science in Marine Transportation in 2025 and holds a United States Merchant Mariner credential as Third Mate, Unlimited Tonnage, Oceans. His maritime background provides direct familiarity with vessel operations, shipboard responsibilities, safety-management systems, documentation, inspections, shoreside oversight, and the practical constraints under which vessel personnel work.\n\n" +
  "Alongside his maritime background, Brown works in software development, data-driven systems design, and the development of maritime cybersecurity and compliance technology. He founded CertaMaris to address a recurring operational problem: cybersecurity and compliance information is often distributed across spreadsheets, shared drives, email, consulting reports, vessel records, and disconnected technical systems.\n\n" +
  "His work on CertaMaris focuses on connecting company, fleet, and vessel-level requirements, systems, controls, assessments, evidence, findings, risks, corrective actions, plans, quality review, and controlled reporting in one traceable operating environment.";

export const FOUNDER_SHORT_BIO =
  "Skyler Brown founded CertaMaris after working across commercial maritime operations, software development, data-driven systems design, and maritime cybersecurity technology.";

export const FOUNDER_COMPACT_BIO =
  "Skyler Brown founded CertaMaris to bring company, fleet, and vessel-level cybersecurity compliance records into one controlled and traceable operating environment. He holds a B.S. in Marine Transportation and a U.S. Merchant Mariner credential as Third Mate, Unlimited Tonnage, Oceans.";

/** Restrained credentials row — not exaggerated badges. */
export const FOUNDER_CREDENTIALS = [
  "B.S. Marine Transportation, 2025",
  "U.S. Merchant Mariner",
  "Third Mate, Unlimited Tonnage, Oceans",
] as const;

/**
 * Portrait assets under /public/images/leadership/ (EXIF stripped on production assets).
 * Master + responsive JPEG/WebP/AVIF variants for srcset.
 */
export const FOUNDER_IMAGE = {
  /** Master / fallback JPEG */
  src: "/images/leadership/skyler-brown-founder-certamaris.jpg",
  alt: "Skyler Brown, Founder of CertaMaris",
  /** Intrinsic size of master export (use for layout stability). Actual master is 1251×1361. */
  width: 1251,
  height: 1361,
  /** Widths available as responsive derivatives. */
  widths: [400, 640, 800, 1200, 1600] as const,
  avifWidths: [640, 1200] as const,
  basePath: "/images/leadership/skyler-brown-founder-certamaris",
} as const;

function variantPath(ext: "jpg" | "webp" | "avif", width: number): string {
  return `${FOUNDER_IMAGE.basePath}-${width}.${ext}`;
}

/** srcset strings for picture/img elements. */
export const FOUNDER_IMAGE_SRCSET = {
  avif: FOUNDER_IMAGE.avifWidths.map((w) => `${variantPath("avif", w)} ${w}w`).join(", "),
  webp: FOUNDER_IMAGE.widths.map((w) => `${variantPath("webp", w)} ${w}w`).join(", "),
  jpeg: FOUNDER_IMAGE.widths.map((w) => `${variantPath("jpg", w)} ${w}w`).join(", "),
} as const;

export const FOUNDER_IMAGE_SIZES = "(min-width: 1024px) 360px, (min-width: 640px) 320px, 85vw";

/** Structured founder object for pages and leadership consumers. */
export const founder = {
  name: FOUNDER_NAME,
  title: FOUNDER_TITLE,
  titleLong: FOUNDER_TITLE_LONG,
  email: FOUNDER_EMAIL,
  fullBio: FOUNDER_FULL_BIO,
  shortBio: FOUNDER_SHORT_BIO,
  compactBio: FOUNDER_COMPACT_BIO,
  credentials: FOUNDER_CREDENTIALS,
  image: FOUNDER_IMAGE,
  imageSrcSet: FOUNDER_IMAGE_SRCSET,
  imageSizes: FOUNDER_IMAGE_SIZES,
} as const;

export type Founder = typeof founder;
