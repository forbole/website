import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { init } from "@socialgouv/matomo-next";
import { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
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
  React.useEffect(() => {
    init({
      url: MATOMO_URL,
      siteId: MATOMO_SITE_ID,
    });
  }, []);
  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
          />
          {/* 解决图片403防盗链问题  */}
          <meta name="referrer" content="no-referrer" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <InnerApp pageProps={pageProps} Component={Component} />
        </ApolloProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
