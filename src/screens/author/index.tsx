import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import { Layout } from "@components";

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
      blueBg
      description={excerpt}
      footer
      image={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? "")}
      skipLocale
      title={post.title}
      type="article"
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
                alt={author.name}
                src={
                  author.profile_image == null
                    ? "/images/assets/blog-placeholder.png"
                    : author.profile_image
                }
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "8px",
                }}
              />
              <span>
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    paddingTop: theme.spacing(3),
                  }}
                  variant="body1"
                >
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
