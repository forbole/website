/* eslint-disable no-nested-ternary */
import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

import placeholderImage from "@src/../public/images/assets/blog-placeholder.png";
import { NoSSR } from "@src/components/no-ssr";
import { useWindowDimensions } from "@src/hooks/get_screen_size";
import useHKT from "@src/hooks/useHKT";

import * as styles from "./index.module.scss";

const Post = (props: any) => {
  const { t } = useTranslation("blog");
  const { isDesktop, isMobile } = useWindowDimensions();
  const { post, main = false, refProp } = props;
  const { featureImage, title, excerpt, publishedAt, slug, author } = post;

  const cmsLoader = ({ src, width, quality }: any) =>
    `${src}?w=${width}&q=${quality || 75}`;

  const time = useHKT(publishedAt);

  return (
    <Box
      className={[styles.wrapper, main ? styles.main : ""].join(" ")}
      data-test="post-summary-item"
    >
      <Box className={styles.content} ref={refProp}>
        <Link as={`/blog/${slug}`} href="/blog/[title]">
          <Box
            className={styles.imgWrapper}
            height={
              isDesktop && main
                ? ("324px!important" as any)
                : isMobile
                  ? ("156px!important" as any)
                  : ("156px!important" as any)
            }
            width={
              isDesktop && main
                ? ("100%!important" as any)
                : isMobile
                  ? ("100%!important" as any)
                  : ("100%!important" as any)
            }
          >
            <Image
              alt={title}
              className={styles.img}
              height={isDesktop && main ? "324" : isMobile ? "156" : "156"}
              loader={cmsLoader}
              src={!featureImage ? placeholderImage : featureImage}
              width={isDesktop && main ? "500" : isMobile ? "270" : "500"}
            />
          </Box>
          <Box
            className={[styles.textWrapper, main ? styles.main : ""].join(" ")}
            width={
              isDesktop && main
                ? ("690px!important" as any)
                : isMobile
                  ? ("270px!important" as any)
                  : ("100%!important" as any)
            }
          >
            <Typography className={styles.title} variant="h3">
              {title}
            </Typography>
            <Typography className={styles.excerpt} variant="body1">
              {excerpt}
            </Typography>
          </Box>
        </Link>
        <Box className={styles.info}>
          <Box className={styles.authorWrapper} component="span">
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
              <p className="date">{time}</p>
            </NoSSR>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
