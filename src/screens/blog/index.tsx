import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, Tags } from '@components';
import { BlogPosts, TitlePosts, Twitter } from './components';
import { useBlogHook } from './hooks';
import { styles } from './styles';

const Blog = (props: any) => {
  const theme = useTheme();
  const { posts = [], meta = {}, tags = [], sidePosts = [], error } = props;
  const { t } = useTranslation('blog');
  useBlogHook(error, t);
  return (
    <Layout title={t('title')} navLink="/blog" footer>
      <Box sx={styles.flexBox}>
        <Box
          sx={{
            padding: theme.spacing(12, 1.5),
            [theme.breakpoints.up('laptop')]: {
              padding: theme.spacing(15, 0),
              display: 'flex',
              maxWidth: '1200px',
            },
          }}
        >
          <BlogPosts main={posts[0]} blogs={posts.slice(1)} meta={meta} />
          <Box sx={styles.sideCSS}>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
            <Twitter />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Blog;
