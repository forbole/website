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
      <div className={styles.flexBox}>
        <div className={styles.top} ref={topRef}>
          <BlogPosts blogs={posts.slice(1)} main={posts[0]} meta={meta} />
          <div className={styles.sideCss}>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
          </div>
          <div className={styles.topScroll}>
            <ScrollToTop topRef={topRef} />
          </div>
        </div>
        <div className={styles.bottom}>
          <ScrollToTop topRef={topRef} />
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
