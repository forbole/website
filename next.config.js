const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  basePath: '/staking',
  poweredByHeader: false,
  nextConfig: {
    reactStrictMode: true,
  },
  experimental: {
    outputStandalone: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
