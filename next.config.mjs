/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: process.env.PINATA_APPEND,
    },
    images: {
      domains: ['mony.mypinata.cloud','monygroup.net'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'mony.mypinata.cloud',
          port: '',
          pathname: '/ipfs/**',
        },
        {
          protocol: 'https',
          hostname: 'monygroup.net',
          port: '',
          pathname: '/api/image/**',
        }
      ],
    },
  }

export default nextConfig;
