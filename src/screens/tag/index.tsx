/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, Tags } from '@components';
import { TitlePosts, Twitter } from '../blog/components';
import { TagPosts } from './components';
import { useBlogHook } from './hooks';
import { styles } from './styles';

const TagTitlePosts = (props: any) => {
  const theme = useTheme();
  const {
    post,
    main = false,
    sidePosts = [],
    tags,
    author,
    meta,
    error,
  } = props;

  const { t } = useTranslation('blog');
  useBlogHook(error, t);

  return (
    <Layout title={t('title')} navLink="/blog" footer>
      <Box sx={styles.flexBox}>
        <Box
          sx={{
            [theme.breakpoints.up('laptop')]: {
              padding: theme.spacing(15, 0),
              display: 'flex',
              maxWidth: '1200px',
            },
          }}
        >
          <TagPosts main={post[0]} blogs={post.slice(1)} meta={meta} />
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

export default TagTitlePosts;
