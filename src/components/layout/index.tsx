/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";
import Head from "next/head";
import * as R from "ramda";
import validator from "validator";
import { useRouter } from "next/router";
import { Box, useTheme } from "@mui/material";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { Theme } from "@recoil/settings/types";
import { writeTheme } from "@recoil/settings";
import useColor from "@src/styles/useColor";
import Footer from "../footer";
import Nav from "../nav";

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
  redBgFooter?: boolean;
  redBg?: boolean;
};

const Layout = ({
  navLink,
  children,
  title = "Forbole",
  footer,
  description = "Too many friends. Too few relationships. Let's change our social network. Recommend trusted people and start making meaningful relationships with rewards.",
  keywords = [],
  type = "website",
  image,
  twitterImage,
  themeModeButton,
  waveBG,
  homeAnimation,
  redBgFooter, // 首页红色页脚
  redBg, // 首页红色背景
}: Props) => {
  const theme = useTheme();
  const [themeMode, setTheme] = useRecoilState(writeTheme) as [
    Theme,
    SetterOrUpdater<Theme>
  ];
  const router = useRouter();
  const currentPath = router.asPath === "/" ? "/" : `${router.asPath}`;
  const url = process.env.NEXT_PUBLIC_URL;
  let ogImage = image ?? `${url}/static/icons/favicon-96x96.png`;
  let metaTwitterImage = twitterImage ?? ogImage;
  const baseKeywords = ["Forbole", "blockchain", "social network"];
  const formattedKeyworks = R.uniq(R.concat(keywords, baseKeywords));
  if (!validator.isURL(ogImage)) {
    ogImage = `${url}${ogImage}`;
  }
  if (!validator.isURL(metaTwitterImage)) {
    metaTwitterImage = `${url}${metaTwitterImage}`;
  }
  // React.useEffect(() => {
  //   if (navLink !== '/blog' && theme.palette.mode === 'light') {
  //     setTheme('dark');
  //   } else if (navLink !== '/careers' && theme.palette.mode === 'light') {
  //     setTheme('dark');
  //   }
  // }, [navLink]);
  const color = useColor();
  return (
    <Box position="relative">
      <Head>
        <title>{title}</title>
        {!!(url === "https://staging.forbole.com") && (
          <meta name="googlebot" content="noindex" />
        )}
        <meta name="description" content={description} />
        <meta name="keywords" content={formattedKeyworks.join(", ")} />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
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
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundImage: redBg
              ? "url(/images/assets/bg1.png)"
              : "url(/images/assets/bg2.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: redBg ? "0 -10vw" : "0 0",
            backgroundColor: color.primary,
            backgroundSize: "100% auto",
            [theme.breakpoints.between("mobile", 550)]: {
              backgroundImage: redBg
                ? "url(/images/assets/bg1_m.png)"
                : "url(/images/assets/bg2_m.png)",
            },
            [theme.breakpoints.up("laptop")]: {},
          }}
        >
          <Nav navLink={navLink} />
          {children}
          {!!footer && <Footer red={redBgFooter} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
