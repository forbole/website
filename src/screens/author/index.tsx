import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import Layout from "@src/components/layout";

import AuthorPosts from "./components/author_posts";
import { useBlogHook } from "./hooks";
import * as styles from "./index.module.scss";

const AuthorTitlePosts = (props: any) => {
  const { t } = useTranslation("blog");
  const { post, tags, author, meta } = props;
  const { featureImage, excerpt, error } = post;

  useBlogHook(error, t);

  return (
    <Layout
      blueBg
      description={excerpt}
      footer
      image={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? "")}
      skipLocale
      title={post.title}
      type="article"
    >
      <Box className={styles.container}>
        <Box className={styles.content}>
          <Box className={styles.innerContent}>
            <Box className={styles.imgWrapper}>
              <img
                alt={author.name}
                className={styles.img}
                src={
                  author.profile_image == null
                    ? "/images/assets/blog-placeholder.png"
                    : author.profile_image
                }
              />
              <span>
                <Typography className={styles.authorName} variant="body1">
                  {author.name}
                </Typography>
              </span>
            </Box>
            <AuthorPosts blogs={post.slice(1)} main={post[0]} meta={meta} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default AuthorTitlePosts;
