import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { init } from "@socialgouv/matomo-next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
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

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: `${window.location.origin}/ingest`,

    // Enable debug mode in development
    loaded: (_posthog) => {
      if (process.env.NODE_ENV === "development") _posthog.debug();
    },

    ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!MATOMO_URL) return;

    init({
      siteId: MATOMO_SITE_ID,
      url: MATOMO_URL,
    });
  }, []);

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <meta content="no-referrer" name="referrer" />
        </Head>
        <InnerApp Component={Component} pageProps={pageProps} />
      </CacheProvider>
    </PostHogProvider>
  );
}
