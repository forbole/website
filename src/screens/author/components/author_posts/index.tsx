import { Box, Pagination } from "@mui/material";

import Post from "@src/screens/blog/components/blog_posts/components/post";

import type { AuthorMeta } from "../../types";
import { useBlogPostsHook } from "./hooks";
import * as styles from "./index.module.scss";

interface IProps {
  blogs: any[];
  main: any;
  meta: AuthorMeta;
}

const AuthorPosts = ({ blogs, main, meta }: IProps) => {
  const currentPage = meta.pagination?.page || 0;
  const totalPages = meta.pagination?.pages || 0;

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
