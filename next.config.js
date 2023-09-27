const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  poweredByHeader: false,
  nextConfig: {
    reactStrictMode: true,
  },
  experimental: {
    outputStandalone: true,
  },
  images: {
    unoptimized: true,
  },
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
