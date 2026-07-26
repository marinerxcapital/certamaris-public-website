import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy-Report-Only",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; font-src 'self' data:; connect-src 'self' https://app.certamaris.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';",
  },
];

const nextConfig: NextConfig = {
  output: staticExport ? "export" : undefined,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: staticExport,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [...securityHeaders, { key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/brand/:path*",
        headers: [...securityHeaders, { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/product/:path*",
        headers: [...securityHeaders, { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/video/:path*",
        headers: [...securityHeaders, { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/og/:path*",
        headers: [...securityHeaders, { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
