import { Box, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import * as R from "ramda";
import { ReactNode, RefObject } from "react";
import validator from "validator";

import Footer from "../footer";
import GuideNav from "../guide_nav";
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
  stakingGuide?: boolean;
  stakeNowRef?: RefObject<HTMLElement>;
};

const LayoutVal = ({
  children,
  title = "Forbole Validator Website",
  footer,
  description,
  keywords = [],
  type = "website",
  image,
  twitterImage,
  stakingGuide,
  stakeNowRef,
}: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
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
      <Box
        sx={{
          //   backgroundImage: homeAnimation
          //     ? ''
          //     : 'url(/images/assets/image_val_BG_desktop.png)',
          // background: 'url(/images/assets/image_BG_FVH.png)',
          background: "transparent",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            // background: waveBG
            //   ? 'rgba(37, 35, 69, 1)'
            //   : theme.palette.mode === 'dark'
            //   ? 'url(/images/assets/image_BG.png)'
            //   : theme.palette.primary.main,
            // backgroundImage: 'url(/images/assets/image_BG_staking_mobile.png)',
            // background: theme.palette.primary.main,
            background: stakingGuide
              ? "url(/images/assets/image_BG_FVH_guide.png)"
              : "url(/images/assets/bg_mobile.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            [theme.breakpoints.up("laptop")]: {
              background: stakingGuide
                ? "url(/images/assets/image_BG_FVH_guide.png)"
                : "url(/images/assets/bg_laptop.webp)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            },
          }}
        >
          {stakingGuide ? (
            <GuideNav staking />
          ) : (
            <Nav stakeNowRef={stakeNowRef} staking />
          )}

          {children}
          {!!footer && <Footer staking />}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutVal;
