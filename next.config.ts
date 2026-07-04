import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Silence the "multiple lockfiles" turbopack root warning
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Compress responses with gzip
  compress: true,
  // Remove X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
