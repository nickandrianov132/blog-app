import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // agentFeedback: true,
    // globalNotFound: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [new URL('https://bqezaqgwkajiuqvwsuye.supabase.co/storage/v1/object/public/**')],
  },
};

export default nextConfig;
