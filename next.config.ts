import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: isDev ? undefined : "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.56.1', 'localhost'],
  async rewrites() {
    if (!isDev) return [];
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://simpbb.technosmart.id/api/rpc/:path*',
      },
    ];
  },
};

export default nextConfig;
