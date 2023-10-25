/* eslint-disable no-unused-vars */
import { Layout } from "@components";
import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import { AuthorPosts } from "./components";
import { useBlogHook } from "./hooks";

const AuthorTitlePosts = (props: any) => {
  const { t } = useTranslation("blog");
  const theme = useTheme();
  const { post, tags, author, meta } = props;
  const { featureImage, excerpt, error } = post;
  useBlogHook(error, t);
  return (
    <Layout
      title={post.title}
      description={excerpt}
      type="article"
      image={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? "")}
      navLink="/blog"
      blueBg
      footer
    >
      <Box
        sx={{
          [theme.breakpoints.up("laptop")]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.up("laptop")]: {
              padding: theme.spacing(15, 0),
              display: "flex",
              maxWidth: "1200px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              [theme.breakpoints.up("laptop")]: {
                flexDirection: "row",
                alignItems: "flex-start",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "flex-start",
                padding: theme.spacing(12, 3, 0, 3),
                [theme.breakpoints.up("laptop")]: {
                  padding: theme.spacing(0, 5, 0, 0),
                },
              }}
            >
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "8px",
                }}
                src={
                  author.profile_image == null
                    ? "/images/assets/blog-placeholder.png"
                    : author.profile_image
                }
                alt={author.name}
              />
              <span>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.primary.main,
                    paddingTop: theme.spacing(3),
                  }}
                >
                  {author.name}
                </Typography>
              </span>
            </Box>
            <AuthorPosts main={post[0]} blogs={post.slice(1)} meta={meta} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default AuthorTitlePosts;
