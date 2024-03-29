const locales = require("./locales");

const { NEXT_LEGACY_WEBSITE_HOST, APP_ENV } = process.env;

// API endpoints that should be forwarded to the legacy site
const legacyAPIPaths = [
  "/total-ogn",
  "/total-ogv",
  "/total-ousd",
  "/circulating-ogn",
  "/circulating-ogv",
  "/social-stats",
  "/mailing-list/:action*",
];

// Map legacy routes to new ones here
const legacyPageMappings = [
  // [source, destination]
  ["/tos", "https://originprotocol.com/tos"],
  ["/privacy", "https://originprotocol.com/privacy"],
  ["/stake", "https://app.story.xyz/stake"],
];

const legacyAPIRedirects = legacyAPIPaths.map((path) => ({
  source: path,
  destination: `${NEXT_LEGACY_WEBSITE_HOST}${path}`,
  // For some weird reason, locale is enabled on API endpoints
  // on the legacy python stack
  // locale: false,
  permanent: true,
}));

const legacyPageRedirects = legacyPageMappings.map(([source, destination]) => ({
  source,
  destination,
  permanent: true,
}));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    loader: "default",
    domains: [
      "localhost",
      "0.0.0.0",
      "lh5.googleusercontent.com",
      "cmsmediaproduction.s3.amazonaws.com",
      "cmsmediastaging.s3.amazonaws.com",
      "avatars.githubusercontent.com",
      "origin-cms.herokuapp.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.s3.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  i18n: {
    locales,
    defaultLocale: "en",
  },
};

module.exports = {
  ...nextConfig,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Cross-Origin-Opener-Policy-Report-Only",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [...legacyAPIRedirects, ...legacyPageRedirects];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/sitemap.xml",
          destination: `${process.env.STRAPI_API_URL}/story/sitemap`,
        },
        {
          source: "/robots.txt",
          destination:
            APP_ENV === "prod" ? "/robots.prod.txt" : "/robots.staging.txt",
        },
      ],
    };
  },
};
