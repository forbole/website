import { Box, Typography, useTheme } from "@mui/material";
import Markdown from "markdown-to-jsx";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import { Layout, ScrollToTop, Tags } from "@src/components";

import placeholderImg from "../../../public/images/assets/blog-placeholder.png";
import { Author, SocialMedia } from "./components";
import { ContentBox, ContentCSS, LaptopCSS, MobileCSS } from "./styles";

const BlogDetails = ({ post }: any) => {
  const theme = useTheme();
  const topRef = React.useRef(null);

  if (!post) return null;

  const { title, tags, excerpt, featureImage, featureImageCaption, slug } =
    post;

  return (
    <Layout
      blueBg
      description={excerpt}
      footer
      image={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? "")}
      skipLocale
      title={post.title}
      twitterImage={featureImage}
      type="article"
    >
      <Head>
        {slug && (
          <link href={`https://forbole.com/blog/${slug}`} rel="canonical" />
        )}
      </Head>
      <MobileCSS>
        <Box
          sx={{
            padding: theme.spacing(12, 3, 0, 3),
          }}
        />
        <Box sx={{ padding: theme.spacing(3) }}>
          <ContentCSS theme={theme}>
            <Author post={post} />
            <SocialMedia title={post.title} />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                paddingBottom: theme.spacing(4),
                fontSize: theme.spacing(3.5),
              }}
              variant="h3"
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
              {post.featureImage ? (
                <Image
                  alt={title}
                  fill
                  src={post.featureImage}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  alt={title}
                  fill
                  src={placeholderImg}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
              {featureImageCaption === null ? null : (
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    padding: theme.spacing(2, 0, 8, 0),
                    fontSize: theme.spacing(1.75),
                  }}
                  variant="body1"
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
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: theme.spacing(5),
              }}
              variant="h3"
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
              flexDirection="column"
              justifyContent="center"
              paddingBottom={
                featureImageCaption === null ? theme.spacing(8) : 0
              }
            >
              {featureImage === null ? (
                <img
                  alt={title}
                  src="/images/assets/blog-placeholder.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                />
              ) : (
                <img
                  alt={title}
                  src={featureImage}
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
                  sx={{
                    color: theme.palette.primary.main,
                    padding: theme.spacing(4, 0, 8, 0),
                    fontSize: theme.spacing(2),
                    width: "80%",
                    a: {
                      color: theme.palette.primary.main,
                    },
                  }}
                  variant="body1"
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
                <Tags details noPadding tags={tags} />
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
