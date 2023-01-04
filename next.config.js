/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
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
