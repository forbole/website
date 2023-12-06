import { Box, Pagination, useTheme } from "@mui/material";
import { pathOr } from "ramda";

import Post from "@src/screens/blog/components/blog_posts/components/post";

import { useBlogPostsHook } from "./hooks";
import type { IProps } from "./interface";

const AuthorPosts = ({ main, blogs, meta }: IProps) => {
  const theme = useTheme();

  const currentPage = pathOr(0, ["pagination", "page"], meta);
  const totalPages = pathOr(0, ["pagination", "pages"], meta);

  const { handleAuthorPageChange } = useBlogPostsHook();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridGap: theme.spacing(4),
          gridTemplateColumns: "repeat(1, 1fr)",
          width: "100%",
          padding: theme.spacing(12, 3, 0, 3),
          [theme.breakpoints.up("laptop")]: {
            padding: 0,
            gridTemplateColumns: "repeat(2, 1fr)",
            gridAutoRows: "min-content",
            gridGap: "30px 20px",
          },
        }}
      >
        {!!main && <Post main post={main} />}
        {blogs.map((post, i) => (
          <Post id={i} key={post.id} post={post} />
        ))}
      </Box>
      <Pagination
        count={totalPages}
        onChange={handleAuthorPageChange}
        page={currentPage}
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            color: theme.palette.primary.main,
          },
          "& .MuiPaginationItem-root.Mui-disabled": {
            opacity: 1,
            background: "rgba(239, 239, 239, 1)",
            color: "rgba(175, 175, 175, 1)",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: theme.palette.custom.forbole.purple,
            color: theme.palette.primary.main,
          },
          "& .MuiPaginationItem-previousNext": {
            opacity: 1,
            background: "rgba(239, 239, 239, 1)",
            color: "rgba(52, 56, 62, 1)",
          },
          "& .MuiPaginationItem-firstLast": {
            opacity: 1,
            background: "rgba(239, 239, 239, 1)",
            color: "rgba(52, 56, 62, 1)",
          },
          [theme.breakpoints.down("tablet")]: {
            display: "none",
            margin: theme.spacing(32, 0),
          },
          [theme.breakpoints.up("tablet")]: {
            paddingTop: theme.spacing(7),
          },
          [theme.breakpoints.up("laptop")]: {
            height: "366px",
            zIndex: 3,
          },
        }}
      />
    </Box>
  );
};

export default AuthorPosts;
