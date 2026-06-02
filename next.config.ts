import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '3000',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'example.com',
        port: '3000',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'theblog.angelogreenhalgh.dev.br',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
    // Em desenvolvimento, você pode desativar a otimização
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
