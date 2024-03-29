import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { concat, uniq } from "ramda";
import type { ReactNode } from "react";
import isURL from "validator/lib/isURL";

import Background from "@src/components/background";

import bgGradientImg from "../../../public/images/assets/image_BG_gradient.png";
import Footer from "../footer";
import Nav from "../nav";
import BlueBg from "./blue-bg";
import * as styles from "./index.module.scss";

type Props = {
  blueBg?: boolean;
  children?: ReactNode;
  description?: string;
  displayHorse?: boolean;
  footer?: boolean;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  redBgFooter?: boolean;
  skipLocale?: boolean;
  title?: string;
  twitterImage?: string;
  type?: string;
};

const Layout = ({
  blueBg,
  children,
  description,
  displayHorse,
  footer,
  image,
  keywords = [],
  noIndex,
  redBgFooter,
  skipLocale,
  title = "Forbole",
  twitterImage,
  type = "website",
}: Props) => {
  const router = useRouter();
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

  const { lang, t } = useTranslation("common");

  const itemColor = (() => {
    if (blueBg) {
      return "#fff";
    }

    return "";
  })();

  const locale = (() => {
    if (lang === "en" || !lang) return "en_US";

    return lang.replace(/-/, "_");
  })();

  return (
    <div className={styles.wrapper}>
      {blueBg && <BlueBg />}
      <Head>
        <title>{title}</title>
        {!!(url === "https://staging.forbole.com") && (
          <meta content="noindex" name="googlebot" />
        )}
        {!!noIndex && <meta content="noindex" name="robots" />}
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
        {!skipLocale && (
          <meta
            content={locale}
            prefix="og: http://ogp.me/ns#"
            property="og:locale"
          />
        )}
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
      <div>
        <div
          className={[styles.content, blueBg ? styles.blue : ""].join(" ")}
          style={
            blueBg
              ? { backgroundImage: `url(${bgGradientImg.src})` }
              : undefined
          }
        >
          {!blueBg && <Background displayHorse={displayHorse} />}
          <Nav itemColor={itemColor} />
          {children}
          {!!footer && <Footer itemColor={itemColor} red={redBgFooter} />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
