/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
  },
  loadLocaleFrom: (lang, ns) => require(`./public/locales/${lang}/${ns}.json`),
};
