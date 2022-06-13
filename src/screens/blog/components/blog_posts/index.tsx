import React from 'react';
import * as R from 'ramda';
import { Box, Pagination, useTheme } from '@mui/material';
import Post from './components/post';
import { IProps } from './interface';
import { useBlogPostsHook } from './hooks';

const BlogPosts = ({ main, blogs, meta }: IProps) => {
  const theme = useTheme();
  const currentPage = R.pathOr(0, ['pagination', 'page'], meta);
  const totalPages = R.pathOr(0, ['pagination', 'pages'], meta);

  const { handlePageChange } = useBlogPostsHook();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridGap: theme.spacing(4),
          gridTemplateColumns: 'repeat(1, 1fr)',
          width: '100%',
          [theme.breakpoints.up('laptop')]: {
            padding: 0,
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridAutoRows: 'min-content',
            gridGap: '30px 20px',
          },
        }}
      >
        {!!main && <Post main post={main} />}
        {blogs.map((post, i) => (
          <Post key={Math.random()} id={i} post={post} />
        ))}
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        sx={{
          [theme.breakpoints.down('tablet')]: {
            display: 'none',
            margin: theme.spacing(32, 0),
          },
        }}
      />
    </Box>
  );
};

export default BlogPosts;
