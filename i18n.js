/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'blog'],
    '/': ['home'],
    '/contact': ['contact'],
    '/about': ['about'],
    '/mission': ['mission'],
    '/blog': ['blog'],
  },
  loadLocaleFrom: (lang, ns) => require(`./public/locales/${lang}/${ns}.json`),
};
