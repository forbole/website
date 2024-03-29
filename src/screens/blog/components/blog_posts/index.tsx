import { Pagination, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { pathOr } from "ramda";
import { useCallback, useState } from "react";

import { useWindowDimensions } from "@src/hooks/get_screen_size";

import Post from "./components/post";
import { useBlogPostsHook } from "./hooks";
import * as styles from "./index.module.scss";
import type { IProps } from "./interface";

const BlogPosts = ({ blogs: blogsUpper, main, meta }: IProps) => {
  const { t } = useTranslation("blog");
  const router = useRouter();
  const theme = useTheme();

  const { isMobile, windowDimensions } = useWindowDimensions();
  const { width } = windowDimensions;

  const currentPage = pathOr(0, ["pagination", "page"], meta);
  const totalPages = pathOr(0, ["pagination", "pages"], meta);
  const totalPosts = pathOr(0, ["pagination", "total"], meta);

  const [limitUpper, setLimitUpper] = useState(15);
  const [lastView, setLastView] = useState(0);

  const postRef = useCallback(
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
    [lastView, isMobile],
  );

  const seeMorePages = (_e: any, { blogs, limit }: any) => {
    const lastPost = blogs.length;

    if (limit + 15 >= totalPosts) {
      setLimitUpper(totalPosts);
    } else {
      setLimitUpper(limit + 15);
    }

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
    mobile: {
      breakpoint: { max: 464, min: 0 },
    },
    tablet: {
      breakpoint: { max: 1100, min: 464 },
    },
  };

  const paginationStyle = {
    sx: {
      "& .MuiPaginationItem-firstLast": {
        background: "rgba(239, 239, 239, 1)",
        color: "rgba(52, 56, 62, 1)",
        opacity: 1,
      },
      "& .MuiPaginationItem-previousNext": {
        background: "rgba(239, 239, 239, 1)",
        color: "rgba(52, 56, 62, 1)",
        opacity: 1,
      },
      "& .MuiPaginationItem-root": {
        color: theme.palette.primary.main,
      },
      "& .MuiPaginationItem-root.Mui-disabled": {
        background: "rgba(239, 239, 239, 1)",
        color: "rgba(175, 175, 175, 1)",
        opacity: 1,
      },
      "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: theme.palette.custom.forbole.purple,
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down("tablet")]: {
        display: "none",
        margin: theme.spacing(32, 0),
      },
      [theme.breakpoints.up("laptop")]: {
        height: "366px",
        zIndex: 3,
      },
      [theme.breakpoints.up("tablet")]: {
        paddingTop: theme.spacing(7),
      },
    },
  };

  const { handlePageChange } = useBlogPostsHook();

  return (
    <div className={styles.wrapper}>
      <div className={styles.posts}>
        {!!main && <Post main post={main} />}
        {blogsUpper.map((post, i) => (
          <Post
            id={i}
            key={post.id}
            post={post}
            refProp={i === lastView ? postRef : null}
          />
        ))}
      </div>
      {width >= responsive.mobile.breakpoint.max ? (
        <Pagination
          count={totalPages}
          onChange={handlePageChange}
          page={currentPage}
          shape="rounded"
          showFirstButton
          showLastButton
          {...paginationStyle}
        />
      ) : (
        <button
          className={styles.seeMore}
          onClick={(e) =>
            seeMorePages(e, { blogs: blogsUpper, limit: limitUpper })
          }
        >
          {t("see more")}
        </button>
      )}
    </div>
  );
};

export default BlogPosts;
