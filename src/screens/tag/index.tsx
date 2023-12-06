import { Box, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import { Layout, Tags } from "@src/components";

import { TitlePosts } from "../blog/components";
import { TagPosts } from "./components";
import { useBlogHook } from "./hooks";
import { styles } from "./styles";

const TagTitlePosts = (props: any) => {
  const theme = useTheme();
  const { post, sidePosts = [], tags, meta, error } = props;

  const { t } = useTranslation("blog");
  useBlogHook(error, t);

  return (
    <Layout blueBg footer title={t("title")}>
      <Box sx={styles.flexBox}>
        <Box
          sx={{
            [theme.breakpoints.up("laptop")]: {
              padding: theme.spacing(15, 0),
              display: "flex",
              maxWidth: "1200px",
            },
          }}
        >
          <TagPosts blogs={post.slice(1)} main={post[0]} meta={meta} />
          <Box sx={styles.sideCSS}>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TagTitlePosts;
