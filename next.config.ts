import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This disables ESLint errors from failing the build
  },
  // You can add more Next.js config options here if needed
};

export default nextConfig;
