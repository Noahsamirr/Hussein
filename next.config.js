/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "files.stripe.com",
      "utfs.io",
      "img.clerk.com",
      "images.unsplash.com",
      "uploadthing.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "avatars.githubusercontent.com",
      "github.com",
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mux/mux-player-react', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
}

module.exports = nextConfig
