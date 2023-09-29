/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Layout, Tags, ScrollToTop, Markdown } from "@components";
import { Author, SocialMedia } from "./components";
import { ContentBox, ContentCSS, MobileCSS, LaptopCSS } from "./styles";

const BlogDetails = ({ post }: any) => {
  const theme = useTheme();
  const topRef = React.useRef(null);
  const { title, tags, excerpt, featureImage, featureImageCaption } = post;

  return (
    <Layout
      title={post.title}
      description={excerpt}
      type="article"
      image={featureImage}
      twitterImage={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? "")}
      navLink="/blog"
      blueBg
      footer
    >
      <MobileCSS>
        <Box sx={{ padding: theme.spacing(3) }}>
          <ContentCSS theme={theme}>
            <Author post={post} />
            <SocialMedia title={post.title} />
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                paddingBottom: theme.spacing(4),
                fontSize: theme.spacing(3.5),
              }}
            >
              {title}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              paddingBottom={
                featureImageCaption === null ? theme.spacing(8) : 0
              }
            >
              <img
                src={
                  post.featureImage == null
                    ? "/images/assets/blog-placeholder.png"
                    : post.featureImage
                }
                alt={title}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
              {featureImageCaption === null ? null : (
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.primary.main,
                    padding: theme.spacing(2, 0, 8, 0),
                    fontSize: theme.spacing(1.75),
                  }}
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
        <Box
          ref={topRef}
          sx={{
            padding: theme.spacing(15, 0),
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: theme.spacing(6),
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: theme.spacing(5),
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box height="100%">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: theme.spacing(7),
              }}
            >
              <Author post={post} />
              <SocialMedia title={post.title} />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              paddingBottom={
                featureImageCaption === null ? theme.spacing(8) : 0
              }
            >
              {featureImage === null ? (
                <img
                  src="/images/assets/blog-placeholder.png"
                  alt={title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                />
              ) : (
                <img
                  src={featureImage}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                />
              )}
              {featureImageCaption === null ? null : (
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.primary.main,
                    padding: theme.spacing(4, 0, 8, 0),
                    fontSize: theme.spacing(2),
                    width: "80%",
                    a: {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <Markdown>{featureImageCaption}</Markdown>
                </Typography>
              )}
            </Box>
            <ContentCSS theme={theme}>
              <ContentBox dangerouslySetInnerHTML={{ __html: post.html }} />
            </ContentCSS>
            <Box display="flex" justifyContent="center">
              <Box
                sx={{
                  paddingTop: theme.spacing(8),
                  height: tags.length > 50 ? "850px" : "550px",
                  width: "100%",
                }}
              >
                <Tags tags={tags} details noPadding />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "none",
              [theme.breakpoints.up("laptop")]: {
                display: "flex",
                position: "absolute",
                left: "50%",
                justifyContent: "center",
                bottom: tags.length > 50 ? "200px" : "250px",
              },
            }}
          >
            <ScrollToTop topRef={topRef} />
          </Box>
        </Box>
      </LaptopCSS>
    </Layout>
  );
};

export default BlogDetails;
