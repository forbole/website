const bundleAnalyzer = require("@next/bundle-analyzer");
const nextTranslate = require("next-translate-plugin");

const localePrefixes = ["", "/zh-HK", "/zh-CN"];

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER === "true",
});

const baseConfig = nextTranslate({
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "www.gravatar.com",
        protocol: "https",
      },
      {
        hostname: "www.forbole.com",
        protocol: "https",
      },
    ],
  },
  poweredByHeader: false,
  redirects: async () => [
    {
      destination: "/zh-HK/:path*",
      permanent: false,
      source: "/zh/:path*",
    },
    ...localePrefixes.map((prefix) => ({
      destination: `${prefix}/staking-service`,
      permanent: false,
      source: `${prefix}/native-staking`,
    })),
  ],
  rewrites: async () =>
    ["/rss", "/rss/"].map((path) => ({
      destination: "/rss.xml",
      source: path,
    })),
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});

module.exports = withBundleAnalyzer(baseConfig);
