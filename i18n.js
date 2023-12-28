module.exports = {
  defaultLocale: "en",
  loadLocaleFrom: (lang, ns) =>
    import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),
  locales: ["en", "zh-HK", "zh-CN"],
  pages: {
    "*": ["common"],
    "/": ["home"],
    "/about": ["about"],
    "/analytics-tools": ["analytics_tools"],
    "/author/[author]": ["blog"],
    "/blog": ["blog"],
    "/blog/[title]": ["blog"],
    "/contact": ["contact"],
    "/developer-tools": ["developer_tools"],
    "/enterprise-solution": ["enterprise_solution"],
    "/infrastructure": ["validator_infrastructure"],
    "/privacy-policy": ["policy"],
    "/products": ["products"],
    "/staking": ["staking"],
    "/staking-service": ["staking_service"],
    "/staking/[title]": ["staking"],
    "/tag/[tag]": ["blog"],
    "/terms-and-conditions": ["terms_and_conditions"],
  },
};
