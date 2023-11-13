const nextTranslate = require("next-translate");

const localePrefixes = ["", "/zh-HK", "/zh-CN"];

module.exports = nextTranslate({
  poweredByHeader: false,
  images: {
    unoptimized: true,
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
