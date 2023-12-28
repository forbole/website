import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import * as styles from "./index.module.scss";

type BaseTag = {
  name: string;
  slug: string;
};

interface TagsProps {
  details?: boolean;
  noPadding?: boolean;
  tags: BaseTag[];
}

const Tags = ({ details, noPadding, tags }: TagsProps) => {
  const { t } = useTranslation("blog");
  const theme = useTheme();

  if (!tags?.length) return null;

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
        {tags.map((tag) => (
          <Box className={styles.list} component="li" key={tag.slug}>
            <Link href={`/tag/${tag.slug}`}>{tag.name}</Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
