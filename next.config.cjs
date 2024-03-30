/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  }
 
  // this is the old config used by the latent browser:
  // I'm not sure we still need it
  /*
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