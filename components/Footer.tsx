import Link from "next/link";
import {
  APP_GET_STARTED_URL,
  APP_SIGN_IN_URL,
  FOOTER_GROUPS,
  FOOTER_STANDING_LINE,
  PRIMARY_CTA_LABEL,
  SIGN_IN_LABEL,
  SITE_TAGLINE,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="footer-premium bg-navy text-white">
      <div className="shell py-16 sm:py-20">
        <div className="mb-12 flex flex-col gap-6 border-b border-white/15 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/certamaris-footer-transparent.png"
              alt="CertaMaris"
              width={2048}
              height={357}
              className="footer-logo mb-4 h-auto w-[188px] sm:w-[212px]"
            />
            <p className="text-[14px] leading-relaxed text-white/70">{SITE_TAGLINE}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={APP_SIGN_IN_URL}
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
              data-integration-point="sign-in"
            >
              {SIGN_IN_LABEL}
            </a>
            <Link
              href={APP_GET_STARTED_URL}
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-[14px] font-semibold text-navy transition-colors hover:bg-white/92"
              data-integration-point="get-started"
            >
              {PRIMARY_CTA_LABEL}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">{group.title}</p>
              <ul className="space-y-2.5">
                {group.links.map(([label, href]) => (
                  <li key={`${group.title}-${href}-${label}`}>
                    <Link href={href} className="text-[14px] text-white/85 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl text-[13px] leading-relaxed text-white/55">{FOOTER_STANDING_LINE}</p>
          <p className="whitespace-nowrap text-[13px] text-white/60 md:pt-0.5">
            © {new Date().getFullYear()} CertaMaris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
