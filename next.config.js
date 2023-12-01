const bundleAnalyzer = require("@next/bundle-analyzer");
const nextTranslate = require("next-translate-plugin");

const localePrefixes = ["", "/zh-HK", "/zh-CN"];

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER === "true",
});

const baseConfig = nextTranslate({
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.forbole.com",
      },
    ],
  },
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = withBundleAnalyzer(baseConfig);
