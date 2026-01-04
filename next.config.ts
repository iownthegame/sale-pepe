import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Enable Static Export
  output: 'export',

  // 2. Set the base path (Must match your repo name)
  basePath: '/sale-pepe',

  // 3. Optional: Recommended for GitHub Pages to avoid issues with folders
  trailingSlash: true,

  // 4. Required for next/image to work on static exports
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
