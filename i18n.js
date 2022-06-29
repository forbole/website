/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'blog', 'careers'],
    '/': ['home'],
    '/contact': ['contact'],
    '/about': ['about'],
    '/mission': ['mission'],
    '/blog': ['blog'],
    '/careers': ['careers'],
    '/terms-and-conditions': ['terms_and_conditions'],
    '/privacy-policy': ['policy'],
  },
  loadLocaleFrom: (lang, ns) => require(`./public/locales/${lang}/${ns}.json`),
};
