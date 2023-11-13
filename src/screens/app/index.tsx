import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { init } from "@socialgouv/matomo-next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

import createEmotionCache from "../../misc/createEmotionCache";
import InnerApp from "./innerApp";

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache(),
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  // eslint-disable-next-line react/require-default-props
  emotionCache?: EmotionCache;
}

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useEffect(() => {
    init({
      url: MATOMO_URL,
      siteId: MATOMO_SITE_ID,
    });
  }, []);
  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta content="initial-scale=1, width=device-width" name="viewport" />
          <meta
            content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
            name="viewport"
          />
          {/* 解决图片403防盗链问题  */}
          <meta content="no-referrer" name="referrer" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <InnerApp Component={Component} pageProps={pageProps} />
        </ApolloProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
