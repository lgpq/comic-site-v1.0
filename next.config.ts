import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'comic-site-v1.0';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'comic-site-v1-images-lgpq.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
