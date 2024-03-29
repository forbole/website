import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { init } from "@socialgouv/matomo-next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import createEmotionCache from "../../utils/createEmotionCache";
import InnerApp from "./innerApp";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  // eslint-disable-next-line react/require-default-props
  emotionCache?: EmotionCache;
}

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  useEffect(() => {
    if (!MATOMO_URL) return;

    init({
      siteId: MATOMO_SITE_ID,
      url: MATOMO_URL,
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta content="no-referrer" name="referrer" />
      </Head>
      <InnerApp Component={Component} pageProps={pageProps} />
    </CacheProvider>
  );
}
