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
          <meta content="noindex" name="googlebot" />
        )}
        <meta content={description || t("description")} name="description" />
        <meta content={formattedKeyworks.join(", ")} name="keywords" />
        <meta
          content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
          name="viewport"
        />
        <meta
          content={type}
          prefix="og: http://ogp.me/ns#"
          property="og:type"
        />
        <meta
          content={title}
          prefix="og: http://ogp.me/ns#"
          property="og:title"
        />
        <meta
          content="Forbole"
          prefix="og: http://ogp.me/ns#"
          property="og:site_name"
        />
        <meta
          content={`${url}${currentPath}`}
          prefix="og: http://ogp.me/ns#"
          property="og:url"
        />
        <meta
          content={description || t("description")}
          prefix="og: http://ogp.me/ns#"
          property="og:description"
        />
        <meta
          content={ogImage}
          prefix="og: http://ogp.me/ns#"
          property="og:image"
        />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content={metaTwitterImage} name="twitter:image" />
        <link
          href={`${url}/icons/favicon-96x96.png`}
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link
          href={`${url}/icons/favicon-32x32.png`}
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href={`${url}/icons/favicon-16x16.png`}
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href={`${url}/icons/manifest.json`} rel="manifest" />
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
          <Nav itemColor={itemColor} />
          {children}
          {!!footer && <Footer itemColor={itemColor} red={redBgFooter} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
