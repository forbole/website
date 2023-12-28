import { Box } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRef } from "react";

import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import Tags from "@src/components/tags";

import BlogPosts from "./components/blog_posts";
import TitlePosts from "./components/title_posts";
import { useBlogHook } from "./hooks";
import * as styles from "./index.module.scss";

const Blog = ({
  error,
  meta = {},
  posts = [],
  sidePosts = [],
  tags = [],
}: any) => {
  const { t } = useTranslation("blog");
  const topRef = useRef(null);

  useBlogHook(error, t);

  return (
    <Layout blueBg footer skipLocale title={t("title")}>
      <Head>
        <link href="https://www.forbole.com/blog" rel="canonical" />
      </Head>
      <Box className={styles.flexBox}>
        <Box className={styles.top} ref={topRef}>
          <BlogPosts blogs={posts.slice(1)} main={posts[0]} meta={meta} />
          <Box className={styles.sideCss}>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
          </Box>
          <Box className={styles.topScroll}>
            <ScrollToTop topRef={topRef} />
          </Box>
        </Box>
        <Box className={styles.bottom}>
          <ScrollToTop topRef={topRef} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Blog;
