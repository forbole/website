import { Box, useTheme } from "@mui/material";
import useColor from "@src/styles/useColor";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import * as R from "ramda";
import { ReactNode, useEffect } from "react";
import validator from "validator";

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
  redBgFooter?: boolean;
  redBg?: boolean;
  blueBg?: boolean;
};

const Layout = ({
  navLink,
  children,
  title = "Forbole",
  footer,
  description,
  keywords = [],
  type = "website",
  image,
  twitterImage,
  redBgFooter, // 首页红色页脚
  redBg, // 首页红色背景
  blueBg,
}: Props) => {
  const theme = useTheme();
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
  const color = useColor();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (blueBg) {
      const currentColor = document.body.style.background;
      document.body.style.background = "rgb(23, 26, 75)";
      return () => {
        document.body.style.background = currentColor;
      };
    }

    return undefined;
  }, [blueBg, theme.palette.mode]);

  const background = (() => {
    if (blueBg) {
      const backgroundColor = "url(/images/assets/image_BG_gradient.png) top";

      return {
        background: backgroundColor,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 0",
        backgroundSize: "cover",
        [theme.breakpoints.up("laptop")]: {
          backgroundSize: "100%",
        },
      };
    }

    return {
      backgroundImage: redBg
        ? "url(/images/assets/bg1.png)"
        : "url(/images/assets/bg2.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: redBg ? "0 -10vw" : "0 0",
      backgroundColor: color.primary,
      backgroundSize: "100% auto",
      [theme.breakpoints.between("mobile", 550)]: {
        backgroundImage: redBg
          ? "url(/images/assets/bg1.png)"
          : "url(/images/assets/bg2.png)",
      },
    };
  })();
  const itemColor = (() => {
    if (blueBg) {
      return "#fff";
    }

    return "";
  })();

  return (
    <Box position="relative">
      <Head>
        <title>{title}</title>
        {!!(url === "https://staging.forbole.com") && (
          <meta name="googlebot" content="noindex" />
        )}
        <meta name="description" content={description || t("description")} />
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
          content={description || t("description")}
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
            ...background,
          }}
        >
          <Nav navLink={navLink} itemColor={itemColor} />
          {children}
          {!!footer && <Footer red={redBgFooter} itemColor={itemColor} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
