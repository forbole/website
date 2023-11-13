import { Box, Divider, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import { styles } from "./styles";

const TitlePosts = (props: any) => {
  const { posts } = props;
  const theme = useTheme();
  const { t } = useTranslation("blog");
  return (
    <Box component="ul" sx={styles.titlePostCSS}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: theme.spacing(3),
          paddingBottom: theme.spacing(1.5),
        }}
        variant="h3"
      >
        {t("contents")}
      </Typography>
      {posts.map((post: any, i: number) => (
        <div key={post.id}>
          <Box
            sx={{
              padding: theme.spacing(3, 0),
            }}
          >
            <Link key={post.id} as={`/blog/${post.slug}`} href="/blog/[title]">
              <a>
                <li
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.title}
                </li>
              </a>
            </Link>
          </Box>
          {i === posts.length - 1 ? null : (
            <Divider sx={{ borderColor: "rgba(116, 136, 188, 0.3)" }} />
          )}
        </div>
      ))}
    </Box>
  );
};

export default TitlePosts;
