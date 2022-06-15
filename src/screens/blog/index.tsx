import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, Tags, ScrollToTop } from '@components';
import { BlogPosts, TitlePosts, Twitter } from './components';
import { useBlogHook } from './hooks';
import { styles } from './styles';

const Blog = (props: any) => {
  const theme = useTheme();
  const { posts = [], meta = {}, tags = [], sidePosts = [], error } = props;
  const { t } = useTranslation('blog');
  useBlogHook(error, t);
  const topRef = React.useRef(null);
  return (
    <Layout title={t('title')} navLink="/blog" footer>
      <Box sx={styles.flexBox}>
        <Box
          ref={topRef}
          sx={{
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
          <Box
            sx={{
              display: 'none',
              [theme.breakpoints.up('laptop')]: {
                display: 'flex',
                position: 'absolute',
                left: '50%',
                justifyContent: 'center',
                bottom: '250px',
              },
            }}
          >
            <ScrollToTop topRef={topRef} />
          </Box>
        </Box>
        <Box
          position="fixed"
          right="5%"
          bottom="10%"
          sx={{
            display: 'block',
            [theme.breakpoints.up('laptop')]: {
              display: 'none',
            },
          }}
        >
          <ScrollToTop topRef={topRef} mobile />
        </Box>
      </Box>
    </Layout>
  );
};

export default Blog;
