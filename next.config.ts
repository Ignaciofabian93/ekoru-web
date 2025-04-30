import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  /* config options here */
};

export default nextConfig;
