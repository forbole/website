/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

module.exports = {
  locales: ["en", "zh-HK", "zh-CN"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    "/": ["home"],
    "/contact": ["contact"],
    "/about": ["about"],
    "/terms-and-conditions": ["terms_and_conditions"],
    "/privacy-policy": ["policy"],
    "/staking-service": ["staking_service"],
    "/infrastructure": ["validator_infrastructure"],
    "/developer-tools": ["developer_tools"],
    "/products": ["products"],
    "/analytics-tools": ["analytics_tools"],
    "/enterprise-solution": ["enterprise_solution"],
    "/staking": ["staking"],
    "/blog": ["blog"],
    "/blog/[title]": ["blog"],
    "/tag/[tag]": ["blog"],
    "/author/[author]": ["blog"],
  },
  loadLocaleFrom: (lang, ns) => require(`./public/locales/${lang}/${ns}.json`),
};
