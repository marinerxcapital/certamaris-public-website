import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PixelGridBackground } from "@/components/PixelGridBackground";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import { organizationSchema, softwareApplicationSchema, websiteSchema } from "@/lib/seo-schema";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${SITE_TAGLINE}`, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og/certamaris-og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/og/certamaris-og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSchemas = [organizationSchema(), websiteSchema(), softwareApplicationSchema()];

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <div className="site-root relative min-h-screen overflow-x-clip">
          {/* PixelGridBackground client-gates aidesigner runtime + host (no load under prefers-reduced-motion) */}
          <PixelGridBackground className="fixed inset-0 z-0 pointer-events-none" />
          {siteSchemas.map((schema, index) => (
            <script
              // eslint-disable-next-line react/no-danger
              key={`root-jsonld-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}
          <div className="relative z-10">
            <Nav />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
