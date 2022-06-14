import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, Tags } from '@components';
import { BlogPosts, TitlePosts } from './components';
import { useBlogHook } from './hooks';
import { styles } from './styles';

const Blog = (props: any) => {
  const theme = useTheme();
  const { posts = [], meta = {}, tags = [], sidePosts = [], error } = props;
  const { t } = useTranslation('blog');
  useBlogHook(error, t);
  return (
    <Layout title={t('title')} navLink="/blog" footer>
      <Box>
        <Box
          sx={{
            padding: theme.spacing(12, 3),
            [theme.breakpoints.up('laptop')]: {
              maxWidth: '1200px',
            },
          }}
        >
          <BlogPosts main={posts[0]} blogs={posts.slice(1)} meta={meta} />
          <Box sx={styles.sideCSS}>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Blog;
