import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import * as styles from "./index.module.scss";

interface TagsProps {
  tags: any[];
  details?: boolean;
  noPadding?: boolean;
}

const Tags = (props: TagsProps) => {
  const { t } = useTranslation("blog");
  const theme = useTheme();
  const { tags, details, noPadding } = props;

  return (
    <Box
      className={[
        styles.wrapper,
        details ? styles.details : "",
        noPadding ? styles.noPadding : "",
      ].join(" ")}
    >
      <Typography color={theme.palette.primary.main} variant="h3">
        {t("tags")}
      </Typography>
      <Box className={styles.tag} component="ul">
        {tags.map((tag: any) => (
          <Box className={styles.list} component="li" key={tag.slug}>
            <Link href={`/tag/${tag.slug}`}>{tag.name}</Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
