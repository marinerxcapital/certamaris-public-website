import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { SamplePlatformClientRedirect } from "./SamplePlatformClientRedirect";

/**
 * Legacy path: /sample-platform permanently redirects to /demo.
 * Worker also issues HTTP 301 for static-export edge routing.
 * Client fallback for local dev and crawlers that hit the HTML export.
 */
export const metadata: Metadata = pageMetadata(
  "Sample Platform Moved",
  "The sample platform tour has moved to the product demo at /demo.",
  "/sample-platform"
);

export default function SamplePlatformRedirectPage() {
  return (
    <main className="shell py-24">
      <SamplePlatformClientRedirect />
      <div className="premium-card mx-auto max-w-lg p-8 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ocean mb-2">Moved permanently</p>
        <h1 className="text-[24px] font-semibold mb-3">Sample platform is now the product demo.</h1>
        <p className="text-[14.5px] text-structural leading-relaxed mb-6">
          This path has moved to <span className="font-mono text-navy">/demo</span>. If you are not redirected
          automatically, use the link below.
        </p>
        <Link
          href="/demo"
          className="inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#0e3a68]"
        >
          Go to product demo
        </Link>
      </div>
    </main>
  );
}
