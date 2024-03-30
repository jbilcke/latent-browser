/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // output: 'standalone',
  output: 'export', // <-- Tauri doc says we should use this?

  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  }
 
  /*
    EMERGENCY FIX - TEMPORARY DISABLE
    rewrites: async () => ({
      afterFiles: [
        {
          source: '/:path*',
          destination: '/api/mocker/:path*'
        }
      ],
    }),
  */
};

module.exports = nextConfig;