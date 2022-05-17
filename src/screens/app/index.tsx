import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
// import theme from '../src/theme';
// import { darkTemplate, lightTemplate } from '@src/styles';
import { RecoilRoot } from 'recoil';
// import { readTheme } from '@recoil/settings';
import createEmotionCache from '../../misc/createEmotionCache';
import InnerApp from './innerApp';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  // eslint-disable-next-line react/require-default-props
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <InnerApp pageProps={pageProps} Component={Component} />
      </CacheProvider>
    </RecoilRoot>
  );
}
