/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'qjmbvb3pin.ufs.sh',
      },
    ],
  },
}

module.exports = nextConfig
