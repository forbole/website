/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, Tags, ScrollToTop, ThemeModeSwitch } from '@components';
import { Author, SocialMedia } from './components';

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
  //   console.log(
  //     'post',
  //     title,
  //     publishedAt,
  //     modified,
  //     slug,
  //     author,
  //     tags,
  //     excerpt,
  //     featureImage,
  //     html
  //   );
  console.log('post mode', theme.palette.mode);
  return (
    <Layout
      title={post.title}
      //   navColor={colors.gray600}
      //   mobileNavColor={colors.gray600}
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
        <Author post={post} />
        <SocialMedia title={post.title} />
      </Box>
    </Layout>
  );
};

export default BlogDetails;
