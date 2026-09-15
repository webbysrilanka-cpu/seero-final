import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  // Anyone landing on the old vercel.app address is sent to seero.lk.
  // This stops Google treating the two as separate, competing websites.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "seero-final.vercel.app" }],
        destination: "https://seero.lk/:path*",
        permanent: true,
      },
    ];
  },

  // Security headers to prevent XSS, clickjacking, MIME sniffing, etc.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://qejxbsdwsdgkpvnuqoym.supabase.co https://www.google-analytics.com; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
