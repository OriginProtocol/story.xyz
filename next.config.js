const locales = require('./locales');

const { NEXT_LEGACY_WEBSITE_HOST } = process.env

// API endpoints that should be forwarded to the legacy site
const legacyAPIPaths = [
  '/total-ogn',
  '/total-ogv',
  '/total-ousd',
  '/circulating-ogn',
  '/circulating-ogv',
  '/social-stats',
  '/mailing-list/:action*',
]

const legacyAPIRedirects = legacyAPIPaths.map(path => ({
  source: path,
  destination: `${NEXT_LEGACY_WEBSITE_HOST}${path}`,
  // For some weird reason, locale is enabled on API endpoints
  // on the legacy python stack
  // locale: false,
  permanent: true
}))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true
  },
  images: {
    loader: "default",
    domains: ["localhost", "0.0.0.0", "lh5.googleusercontent.com", "cmsmediaproduction.s3.amazonaws.com", "cmsmediastaging.s3.amazonaws.com", "avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  },
  i18n: {
    locales,
    defaultLocale: 'en',
  },
}

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      ...legacyAPIRedirects,
    ]
  },
};
