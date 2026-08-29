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
};

export default nextConfig;
