import Link from "next/link";
import { FOOTER_GROUPS, FOOTER_STANDING_LINE, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="shell py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/certamaris-footer-transparent.png"
              alt="CertaMaris"
              width={2048}
              height={357}
              className="footer-logo mb-4 h-auto w-[188px] sm:w-[212px]"
            />
            <p className="text-white/65 text-[14px] max-w-[15rem] leading-relaxed">{SITE_TAGLINE}</p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/65 mb-4">{group.title}</p>
              <ul className="space-y-2.5">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-[14px] text-white/80 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white/55 text-[13px] max-w-2xl leading-relaxed">{FOOTER_STANDING_LINE}</p>
          <p className="text-white/65 text-[13px] whitespace-nowrap">© {new Date().getFullYear()} CertaMaris. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
