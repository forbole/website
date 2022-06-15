/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import DOMPurify from 'isomorphic-dompurify';
import { css, jsx } from '@emotion/react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { Layout, Tags, ScrollToTop, ThemeModeSwitch } from '@components';
import { Author, SocialMedia } from './components';
import { ContentBox, ContentCSS } from './styles';

const BlogDetails = ({ post }: any) => {
  const theme = useTheme();
  const url = process.env.NEXT_PUBLIC_URL;
  const {
    title,
    publishedAt,
    modified,
    slug,
    author,
    tags,
    excerpt,
    featureImage,
    html,
  } = post;
  const { t } = useTranslation('blog');
  const { sanitize } = DOMPurify;
  return (
    <Layout
      title={post.title}
      description={excerpt}
      type="article"
      image={featureImage}
      twitterImage={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? '')}
      navLink="/blog"
      footer
    >
      <Box
        // ref={topRef}
        sx={{
          padding: theme.spacing(12, 3, 0, 3),
          [theme.breakpoints.up('laptop')]: {
            // padding: theme.spacing(15, 0),
            // display: 'flex',
            maxWidth: '1200px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: theme.spacing(3),
          }}
        >
          <ThemeModeSwitch />
        </Box>
      </Box>
      <img
        src={
          post.featureImage == null
            ? '/static/images/assets/blog-placeholder.png'
            : post.featureImage
        }
        alt={title}
        style={{
          width: '100%',
          height: '180px',
        }}
      />
      <Box sx={{ padding: theme.spacing(3) }}>
        <ContentCSS theme={theme}>
          <Author post={post} />
          <SocialMedia title={post.title} />
          <Typography
            variant="h3"
            sx={{
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              fontWeight: 600,
              fontSize: theme.spacing(2.5),
            }}
          >
            {title}
          </Typography>
          <Divider
            variant="middle"
            sx={{
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(29, 30, 34, 0.3)',
              margin: theme.spacing(4.375, 0, 4.375, 0),
            }}
          />
          <ContentBox
            dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
          />
        </ContentCSS>
      </Box>
      <Tags tags={tags} />
    </Layout>
  );
};

export default BlogDetails;
