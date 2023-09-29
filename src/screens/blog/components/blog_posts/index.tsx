/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import React from "react";
import * as R from "ramda";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Box, Button, Pagination, useTheme } from "@mui/material";
import { useWindowDimensions } from "@hooks";
import Post from "./components/post";
import { IProps } from "./interface";
import { useBlogPostsHook } from "./hooks";

const BlogPosts = ({ main, blogs, meta }: IProps) => {
  const { t } = useTranslation("blog");
  const router = useRouter();
  const theme = useTheme();

  const { windowDimensions, isMobile } = useWindowDimensions();
  const { width } = windowDimensions;

  const currentPage = R.pathOr(0, ["pagination", "page"], meta);
  const totalPages = R.pathOr(0, ["pagination", "pages"], meta);
  const totalPosts = R.pathOr(0, ["pagination", "total"], meta);

  const [limit, setLimit] = React.useState(15);
  const [lastView, setLastView] = React.useState(0);
  const postRef = React.useCallback(
    (node: any) => {
      if (node && isMobile && lastView !== 0) {
        node.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
      return node;
    },
    [lastView]
  );

  const seeMorePages = (e: any, { limit, blogs }: any) => {
    const lastPost = blogs.length;
    limit + 15 >= totalPosts ? setLimit(totalPosts) : setLimit(limit + 15);
    setLastView(lastPost);
    router.push({
      pathname: router.pathname,
      query: { limit },
    });
  };
  const responsive: any = {
    desktop: {
      breakpoint: { max: 3000, min: 1100 },
    },
    tablet: {
      breakpoint: { max: 1100, min: 464 },
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
    },
  };

  const { handlePageChange } = useBlogPostsHook();

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
          <Post
            key={post.id}
            id={i}
            refProp={i === lastView ? postRef : null}
            post={post}
          />
        ))}
      </Box>
      {width >= responsive.mobile.breakpoint.max ? (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
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
      ) : (
        <Button
          variant="text"
          sx={{
            color: theme.palette.primary.main,
            paddingTop: theme.spacing(10),
            fontWeight: 600,
            fontSize: theme.spacing(2),
          }}
          onClick={(e) => seeMorePages(e, { limit, blogs })}
        >
          {t("see more")}
        </Button>
      )}
    </Box>
  );
};

export default BlogPosts;
