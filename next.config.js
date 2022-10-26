/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true
  },
  images: {
    loader: "default",
    domains: ["localhost", "cmsmediaproduction.s3.amazonaws.com", "cmsmediastaging.s3.amazonaws.com", "avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig
