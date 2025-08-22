import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'comic-site-v1-images-lgpq.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
