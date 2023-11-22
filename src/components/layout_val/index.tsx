import { Box, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { concat, uniq } from "ramda";
import type { ReactNode, RefObject } from "react";
import isURL from "validator/lib/isURL";

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
  title = "Forbole",
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
  const { t } = useTranslation("staking");
  const currentPath = router.asPath === "/" ? "/" : `${router.asPath}`;
  const url = process.env.NEXT_PUBLIC_URL;
  let ogImage = image ?? `${url}/static/icons/favicon-96x96.png`;
  let metaTwitterImage = twitterImage ?? ogImage;
  const baseKeywords = ["Forbole", "blockchain", "social network"];
  const formattedKeyworks = uniq(concat(keywords, baseKeywords));
  if (!isURL(ogImage)) {
    ogImage = `${url}${ogImage}`;
  }
  if (!isURL(metaTwitterImage)) {
    metaTwitterImage = `${url}${metaTwitterImage}`;
  }

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
      <Box
        sx={{
          background: "transparent",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
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
