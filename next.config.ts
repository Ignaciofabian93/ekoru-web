import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname),
    };
    return config;
  },
  /* config options here */
};

export default nextConfig;
