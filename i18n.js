/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
module.exports = {
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'blog', 'careers', 'staking'],
    '/': ['home'],
    '/contact': ['contact'],
    '/about': ['about'],
    '/mission': ['mission'],
    '/blog': ['blog'],
    '/careers': ['careers'],
    '/terms-and-conditions': ['terms_and_conditions'],
    '/privacy-policy': ['policy'],
    '/solutions': ['solutions'],
    '/forbole-staking-services-terms': ['staking_services_terms'],
    '/staking': ['staking'],
  },
  loadLocaleFrom: (lang, ns) => require(`./public/locales/${lang}/${ns}.json`),
};
