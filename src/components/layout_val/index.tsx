/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import * as R from 'ramda';
import validator from 'validator';
import { useRouter } from 'next/router';
import { Box, useTheme } from '@mui/material';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { Theme } from '@recoil/settings/types';
import { writeTheme } from '@recoil/settings';
import Footer from '../footer';
import Nav from '../nav';

type Props = {
  navLink: string | null;
  children?: ReactNode;
  title?: string;
  footer?: boolean;
  description?: string;
  keywords?: string[];
  type?: string;
  image?: string;
  twitterImage?: string;
  themeModeButton?: boolean;
  waveBG?: boolean;
  homeAnimation?: boolean;
  staking?: boolean;
  searchBar?: boolean;
  stakingGuide?: boolean;
};

const LayoutVal = ({
  navLink,
  children,
  title = 'Forbole Validator Website',
  footer,
  description = "Too many friends. Too few relationships. Let's change our social network. Recommend trusted people and start making meaningful relationships with rewards.",
  keywords = [],
  type = 'website',
  image,
  twitterImage,
  themeModeButton,
  waveBG,
  homeAnimation,
  staking,
  searchBar,
  stakingGuide,
}: Props) => {
  const theme = useTheme();
  const [themeMode, setTheme] = useRecoilState(writeTheme) as [
    Theme,
    SetterOrUpdater<Theme>
  ];
  const router = useRouter();
  const currentPath = router.asPath === '/' ? '/' : `${router.asPath}`;
  const url = process.env.NEXT_PUBLIC_URL;
  let ogImage = image ?? `${url}/static/icons/favicon-96x96.png`;
  let metaTwitterImage = twitterImage ?? ogImage;
  const baseKeywords = ['Forbole', 'blockchain', 'social network'];
  const formattedKeyworks = R.uniq(R.concat(keywords, baseKeywords));
  if (!validator.isURL(ogImage)) {
    ogImage = `${url}${ogImage}`;
  }
  if (!validator.isURL(metaTwitterImage)) {
    metaTwitterImage = `${url}${metaTwitterImage}`;
  }
  React.useEffect(() => {
    if (theme.palette.mode === 'light') setTheme('dark');
  }, [navLink]);
  return (
    <Box position="relative">
      <Head>
        <title>{title}</title>
        {!!(url === 'https://staging.forbole.com') && (
          <meta name="googlebot" content="noindex" />
        )}
        <meta name="description" content={description} />
        <meta name="keywords" content={formattedKeyworks.join(', ')} />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:type"
          content={type}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:title"
          content={title}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:site_name"
          content="Forbole"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:url"
          content={`${url}${currentPath}`}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:description"
          content={description}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:image"
          content={ogImage}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={metaTwitterImage} />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={`${url}/icons/favicon-96x96.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${url}/icons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${url}/icons/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${url}/icons/manifest.json`} />
      </Head>
      <Box
        sx={{
          //   backgroundImage: homeAnimation
          //     ? ''
          //     : 'url(/images/assets/image_val_BG_desktop.png)',
          // background: 'url(/images/assets/image_BG_FVH.png)',
          background: 'transparent',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            // background: waveBG
            //   ? 'rgba(37, 35, 69, 1)'
            //   : theme.palette.mode === 'dark'
            //   ? 'url(/images/assets/image_BG.png)'
            //   : theme.palette.primary.main,
            // backgroundImage: 'url(/images/assets/image_BG_staking_mobile.png)',
            // background: theme.palette.primary.main,
            background: stakingGuide
              ? 'url(/images/assets/image_BG_FVH_guide.png)'
              : 'url(/images/assets/bg_mobile.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            [theme.breakpoints.up('laptop')]: {
              background: stakingGuide
                ? 'url(/images/assets/image_BG_FVH_guide.png)'
                : 'url(/images/assets/bg_laptop.webp)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            },
          }}
        >
          <Nav navLink={navLink} staking />
          {children}
          {!!footer && <Footer staking />}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutVal;
