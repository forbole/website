/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_COINGECKO_API: string;
    NEXT_PUBLIC_MATOMO_SITE_ID: string;
    NEXT_PUBLIC_MATOMO_URL: string;
  }
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export = classes;
}
