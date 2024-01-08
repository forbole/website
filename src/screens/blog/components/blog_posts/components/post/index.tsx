/* eslint-disable no-nested-ternary */
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

import placeholderImage from "@src/../public/images/assets/blog-placeholder.png";
import { NoSSR } from "@src/components/no-ssr";

import * as styles from "./index.module.scss";

const Post = ({ main = false, post, refProp }: any) => {
  const { t } = useTranslation("blog");

  const { author, excerpt, featureImage, publishedAt, slug, title } = post;

  const cmsLoader = ({ quality, src, width }: any) =>
    `${src}?w=${width}&q=${quality || 75}`;

  return (
    <div
      className={[styles.wrapper, main ? styles.main : ""].join(" ")}
      data-test="post-summary-item"
    >
      <div className={styles.content} ref={refProp}>
        <Link as={`/blog/${slug}`} href="/blog/[title]">
          <div
            className={[styles.imgWrapper, main ? styles.main : ""].join(" ")}
          >
            <Image
              alt={title}
              className={styles.img}
              fill
              loader={cmsLoader}
              src={!featureImage ? placeholderImage : featureImage}
            />
          </div>
          <div
            className={[styles.textWrapper, main ? styles.main : ""].join(" ")}
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
