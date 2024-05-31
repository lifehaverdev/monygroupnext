/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.PINATA_APPEND,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'mony.mypinata.cloud',
            port: '',
            pathname: '/ipfs/**',
          },
        ],
      },
  }

export default nextConfig;
