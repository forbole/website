import { Box, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRef } from "react";

import { Layout, ScrollToTop, Tags } from "@src/components";

import { BlogPosts, TitlePosts } from "./components";
import { useBlogHook } from "./hooks";
import { styles } from "./styles";

const Blog = (props: any) => {
  const theme = useTheme();
  const { posts = [], meta = {}, tags = [], sidePosts = [], error } = props;
  const { t } = useTranslation("blog");
  const topRef = useRef(null);

  useBlogHook(error, t);

  return (
    <Layout blueBg footer skipLocale title={t("title")}>
      <Head>
        <link href="https://forbole.com/blog" rel="canonical" />
      </Head>
      <Box sx={styles.flexBox}>
        <Box
          ref={topRef}
          sx={{
            [theme.breakpoints.up("laptop")]: {
              padding: theme.spacing(15, 0),
              display: "flex",
              maxWidth: "1200px",
            },
          }}
        >
          <BlogPosts blogs={posts.slice(1)} main={posts[0]} meta={meta} />
          <Box sx={styles.sideCSS}>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
          </Box>
          <Box
            sx={{
              display: "none",
              [theme.breakpoints.up("laptop")]: {
                display: "flex",
                position: "absolute",
                left: "50%",
                justifyContent: "center",
                bottom: "250px",
              },
            }}
          >
            <ScrollToTop topRef={topRef} />
          </Box>
        </Box>
        <Box
          bottom="10%"
          position="fixed"
          right="5%"
          sx={{
            display: "block",
            [theme.breakpoints.up("laptop")]: {
              display: "none",
            },
          }}
        >
          <ScrollToTop topRef={topRef} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Blog;
