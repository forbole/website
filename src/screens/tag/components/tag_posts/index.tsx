import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { pathOr } from "ramda";

import Post from "@src/screens/blog/components/blog_posts/components/post";

import * as styles from "./index.module.scss";
import type { IProps } from "./interface";

const TagPosts = ({ blogs, main, meta }: IProps) => {
  const currentPage = pathOr(0, ["pagination", "page"], meta);
  const totalPages = pathOr(0, ["pagination", "pages"], meta);

  const router: any = useRouter();

  const handleTagPageChange = (_e: any, value: any) => {
    router.push({
      pathname: `/tag/${router.query.tag}/${value === 1 ? "" : value}`,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.posts}>
        {!!main && <Post main post={main} />}
        {blogs.map((post, i) => (
          <Post id={i} key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        className={styles.pagination}
        count={totalPages}
        onChange={handleTagPageChange}
        page={currentPage}
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default TagPosts;
