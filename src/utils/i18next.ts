export const locales = ["en", "zh-HK", "zh-CN"];

// This should return BCP47 language tag which is used for SEO
// https://en.wikipedia.org/wiki/IETF_language_tag
export const getLanguageFromLocale = (locale?: string) => {
  if (!locale || locale === "en") return "en-US";

  if (["zh-HK", "zh-CN"].includes(locale)) return locale;

  throw new Error(`Unsupported locale: ${locale}`);
};
