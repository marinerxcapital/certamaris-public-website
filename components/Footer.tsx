import Link from "next/link";
import { FOOTER_GROUPS, FOOTER_STANDING_LINE, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="footer-premium bg-navy text-white">
      <div className="shell py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-10">
          <div className="col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/certamaris-footer-transparent.png"
              alt="CertaMaris"
              width={2048}
              height={357}
              className="footer-logo mb-4 h-auto w-[188px] sm:w-[212px]"
            />
            <p className="text-white/70 text-[14px] max-w-[16rem] leading-relaxed">{SITE_TAGLINE}</p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55 mb-4">{group.title}</p>
              <ul className="space-y-2.5">
                {group.links.map(([label, href]) => (
                  <li key={`${group.title}-${href}-${label}`}>
                    <Link href={href} className="text-[14px] text-white/85 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <p className="text-white/55 text-[13px] max-w-2xl leading-relaxed">{FOOTER_STANDING_LINE}</p>
          <p className="text-white/60 text-[13px] whitespace-nowrap md:pt-0.5">
            © {new Date().getFullYear()} CertaMaris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
