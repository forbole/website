import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { concat, uniq } from "ramda";
import type { ReactNode } from "react";
import { memo } from "react";
import isURL from "validator/lib/isURL";

import Footer from "../footer";
import GuideNav from "../guide_nav";
import Nav from "../nav";
import * as styles from "./index.module.scss";

type Props = {
  canonical?: string;
  children?: ReactNode;
  description?: string;
  footer?: boolean;
  image?: string;
  keywords?: string[];
  stakingGuide?: boolean;
  title?: string;
  twitterImage?: string;
  type?: string;
};

const LayoutVal = ({
  canonical,
  children,
  description,
  footer,
  image,
  keywords = [],
  stakingGuide,
  title = "Forbole",
  twitterImage,
  type = "website",
}: Props) => {
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
    <div className={styles.wrapper}>
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
        {canonical && <link href={canonical} rel="canonical" />}
      </Head>
      <div
        style={{
          background: "transparent",
        }}
      >
        <div
          className={[
            styles.content,
            stakingGuide ? styles.stakingGuide : "",
          ].join(" ")}
        >
          {stakingGuide ? <GuideNav staking /> : <Nav staking />}

          {children}
          {!!footer && <Footer staking />}
        </div>
      </div>
    </div>
  );
};

export default memo(LayoutVal);
