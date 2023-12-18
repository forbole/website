import { Box, Typography, useTheme } from "@mui/material";
import Markdown from "markdown-to-jsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import Tags from "@src/components/tags";
import { getLanguageFromLocale } from "@src/utils/i18next";

import blogPlaceholderImg from "../../../public/images/assets/blog-placeholder.png";
import { Author, SocialMedia } from "./components";
import * as styles from "./index.module.scss";
import { ContentBox, ContentCSS, LaptopCSS, MobileCSS } from "./styles";

// https://schema.org/TechArticle

const BlogDetails = ({ post }: any) => {
  const theme = useTheme();
  const topRef = useRef(null);
  const { locale } = useRouter();

  if (!post) return null;

  const {
    title,
    tags,
    excerpt,
    featureImage,
    featureImageCaption,
    slug,
    primaryAuthor: author,
    publishedAt,
  } = post;

  const manyTagsStyle = tags.length > 50 ? styles.manyTags : "";

  return (
    <Layout
      blueBg
      description={excerpt}
      footer
      image={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? "")}
      skipLocale
      title={post.title}
      twitterImage={featureImage}
      type="article"
    >
      <Head>
        {slug && (
          <link href={`https://www.forbole.com/blog/${slug}`} rel="canonical" />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "abstract": excerpt,
              "headline": title,
              "image": [featureImage],
              "inLanguage": getLanguageFromLocale(locale),
              "datePublished": publishedAt,
              "keywords": tags
                .map((x: { name: any }) => x.name ?? "")
                .filter(Boolean)
                .join(", "),
              "author": [
                {
                  "@type": "Person",
                  "name": author.name,
                  "url": `https://www.forbole.com/author/${author.slug}`,
                },
              ],
            }),
          }}
          type="application/ld+json"
        />
      </Head>
      <MobileCSS>
        <Box className={styles.topSpacing} />
        <Box className={styles.wrapper}>
          <ContentCSS theme={theme}>
            <Author post={post} />
            <SocialMedia title={post.title} />
            <Typography className={styles.title} variant="h1">
              {title}
            </Typography>
            <Box className={[styles.featureImageWrapper].join(" ")}>
              <Image
                alt={title}
                className={[styles.img, styles.mobile].join(" ")}
                fill
                priority
                src={
                  post.featureImage == null
                    ? blogPlaceholderImg.src
                    : post.featureImage
                }
              />
              {featureImageCaption === null ? null : (
                <Typography
                  className={styles.featureImageCaption}
                  variant="body1"
                >
                  <Markdown>{featureImageCaption}</Markdown>
                </Typography>
              )}
            </Box>
            <ContentBox dangerouslySetInnerHTML={{ __html: post.html }} />
          </ContentCSS>
        </Box>
        <Tags tags={tags} />
      </MobileCSS>
      <LaptopCSS>
        <Box className={styles.wrapper} ref={topRef}>
          <Box className={styles.titleWrapper}>
            <Typography className={styles.title} variant="h1">
              {title}
            </Typography>
          </Box>
          <Box height="100%">
            <Box className={styles.author}>
              <Author post={post} />
              <SocialMedia title={post.title} />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              paddingBottom={
                featureImageCaption === null ? theme.spacing(4) : 0
              }
            >
              {featureImage === null ? (
                <Image
                  alt={title}
                  className={[styles.img, styles.desktop].join(" ")}
                  fill
                  src={blogPlaceholderImg.src}
                />
              ) : (
                <Image
                  alt={title}
                  className={[styles.img, styles.desktop].join(" ")}
                  fill
                  src={featureImage}
                />
              )}
              {featureImageCaption === null ? null : (
                <Typography
                  className={styles.featureImageCaption}
                  variant="body1"
                >
                  <Markdown>{featureImageCaption}</Markdown>
                </Typography>
              )}
            </Box>
            <ContentCSS theme={theme}>
              <ContentBox dangerouslySetInnerHTML={{ __html: post.html }} />
            </ContentCSS>
            <Box display="flex" justifyContent="center">
              <Box className={[styles.tags, manyTagsStyle].join(" ")}>
                <Tags details noPadding tags={tags} />
              </Box>
            </Box>
          </Box>
          <Box className={[styles.scrollToTop, manyTagsStyle].join(" ")}>
            <ScrollToTop topRef={topRef} />
          </Box>
        </Box>
      </LaptopCSS>
    </Layout>
  );
};

export default BlogDetails;
