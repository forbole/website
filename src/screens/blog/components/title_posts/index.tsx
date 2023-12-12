import { Box, Divider, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import * as styles from "./index.module.scss";

const TitlePosts = ({ posts }: any) => {
  const { t } = useTranslation("blog");

  return (
    <Box className={styles.titlePost} component="ul">
      <Typography className={styles.contents} variant="h3">
        {t("contents")}
      </Typography>
      {posts.map((post: any, i: number) => (
        <div key={post.id}>
          <Box className={styles.post}>
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <li className={styles.listItem}>{post.title}</li>
            </Link>
          </Box>
          {i === posts.length - 1 ? null : (
            <Divider className={styles.divider} />
          )}
        </div>
      ))}
    </Box>
  );
};

export default TitlePosts;
