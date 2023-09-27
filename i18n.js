/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
module.exports = {
  locales: ['en', 'zh-HK','zh-CN'],
  // locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/contact': ['contact'],
    '/about': ['about'],
    '/terms-and-conditions': ['terms_and_conditions'],
    '/privacy-policy': ['policy'],
    '/staking-service': ['staking_service'],
    '/infrastructure': ['validator_infrastructure'],
    '/developer-tools': ['developer_tools'],
    '/products': ['products'],
    "/analytics-tools":["analytics_tools"],
    "/enterprise-solution":["enterprise_solution"]
  },
  loadLocaleFrom: (lang, ns) =>require(`./public/locales/${lang}/${ns}.json`)
  // loadLocaleFrom: (lang, ns) => import(`./public/locales/${lang}/${ns}.json`).then(m => {console.log(m.default); return m.default}),
};
