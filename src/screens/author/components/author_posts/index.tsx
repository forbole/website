import { Box, Pagination } from "@mui/material";
import { pathOr } from "ramda";

import Post from "@src/screens/blog/components/blog_posts/components/post";

import { useBlogPostsHook } from "./hooks";
import * as styles from "./index.module.scss";
import type { IProps } from "./interface";

const AuthorPosts = ({ main, blogs, meta }: IProps) => {
  const currentPage = pathOr(0, ["pagination", "page"], meta);
  const totalPages = pathOr(0, ["pagination", "pages"], meta);

  const { handleAuthorPageChange } = useBlogPostsHook();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        {!!main && <Post main post={main} />}
        {blogs.map((post, i) => (
          <Post id={i} key={post.id} post={post} />
        ))}
      </Box>
      <Pagination
        className={styles.pagination}
        count={totalPages}
        onChange={handleAuthorPageChange}
        page={currentPage}
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default AuthorPosts;
