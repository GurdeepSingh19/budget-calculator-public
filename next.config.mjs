/** @type {import('next').NextConfig} */
const nextConfig = {
    watchOptions: {
        ignored: ['**/node_modules', '**/.next', '**/out'],
    },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
