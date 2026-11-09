import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → `out/` (served by Firebase Hosting, no server needed)
  output: "export",
  images: {
    // The default image optimizer needs a server; images in /public are pre-sized instead.
    unoptimized: true,
  },
  experimental: {
    agentFeedback: true,
  },
  // Note: cacheComponents/partialPrefetching (PPR) are not supported with `output: "export"`.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
