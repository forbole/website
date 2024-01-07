/* eslint-disable no-nested-ternary */
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import placeholderImage from "@src/../public/images/assets/blog-placeholder.png";
import { NoSSR } from "@src/components/no-ssr";

import * as styles from "./index.module.scss";

const Post = ({ main = false, post, refProp }: any) => {
  const { t } = useTranslation("blog");

  const [[isDesktop, isMobile], setWindowSize] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  useEffect(() => {
    const listener = () => {
      const newIsDesktop = window.innerWidth > 1024;
      const newIsMobile = window.innerWidth < 768;

      setWindowSize([newIsDesktop, newIsMobile]);
    };

    listener();

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  const { author, excerpt, featureImage, publishedAt, slug, title } = post;

  const cmsLoader = ({ quality, src, width }: any) =>
    `${src}?w=${width}&q=${quality || 75}`;

  const imgWrapperStyle = {
    style: {
      height: isDesktop && main ? ("324px" as any) : ("156px" as any),
      width: "100%",
    },
  };

  const titleStyle = {
    style: {
      width:
        isDesktop && main
          ? ("690px!important" as any)
          : isMobile
            ? ("270px!important" as any)
            : ("100%!important" as any),
    },
  };

  return (
    <div
      className={[styles.wrapper, main ? styles.main : ""].join(" ")}
      data-test="post-summary-item"
    >
      <div className={styles.content} ref={refProp}>
        <Link as={`/blog/${slug}`} href="/blog/[title]">
          <div className={styles.imgWrapper} {...imgWrapperStyle}>
            <Image
              alt={title}
              className={styles.img}
              height={isDesktop && main ? "324" : isMobile ? "156" : "156"}
              loader={cmsLoader}
              src={!featureImage ? placeholderImage : featureImage}
              width={isDesktop && main ? "500" : isMobile ? "270" : "500"}
            />
          </div>
          <div
            className={[styles.textWrapper, main ? styles.main : ""].join(" ")}
            {...titleStyle}
          >
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.excerpt}>{excerpt}</span>
          </div>
        </Link>
        <div className={styles.info}>
          <span className={styles.authorWrapper}>
            <p>
              {t("Posted by")}{" "}
              <Link
                as={`/author/${author.slug}`}
                className={styles.author}
                href="/author/[author]"
              >
                {author.name}
              </Link>
            </p>
            <NoSSR>
              <p className="date">{publishedAt}</p>
            </NoSSR>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
