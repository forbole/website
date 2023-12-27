import { Box } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import Layout from "@src/components/layout";
import Tags from "@src/components/tags";

import TitlePosts from "../blog/components/title_posts";
import TagPosts from "./components/tag_posts";
import { useBlogHook } from "./hooks";
import * as styles from "./index.module.scss";

const TagTitlePosts = ({ post, sidePosts = [], tags, meta, error }: any) => {
  const { t } = useTranslation("blog");

  useBlogHook(error, t);

  if (!post) return null;

  const currentPage = meta?.pagination?.page;

  return (
    <Layout
      blueBg
      footer
      noIndex={Number(currentPage) !== 1}
      title={t("title")}
    >
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
