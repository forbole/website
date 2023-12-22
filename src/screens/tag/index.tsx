import { Box } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import Layout from "@src/components/layout";
import Tags from "@src/components/tags";

import TitlePosts from "../blog/components/title_posts";
import { TagPosts } from "./components";
import { useBlogHook } from "./hooks";
import * as styles from "./index.module.scss";

const TagTitlePosts = (props: any) => {
  const { post, sidePosts = [], tags, meta, error } = props;
  const { t } = useTranslation("blog");

  useBlogHook(error, t);

  return (
    <Layout blueBg footer title={t("title")}>
      <Box className={styles.flex}>
        <Box className={styles.wrapper}>
          <TagPosts blogs={post.slice(1)} main={post[0]} meta={meta} />
          <Box className={styles.side}>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TagTitlePosts;
