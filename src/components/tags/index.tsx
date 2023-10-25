/* eslint-disable react/require-default-props */

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

import { styles } from "./styles";

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
      sx={{
        padding: theme.spacing(7, 3),
        color: theme.palette.primary.main,
        "& h3": {
          fontWeight: 700,
          fontSize: theme.spacing(3),
          paddingBottom: theme.spacing(3.5),
        },
        [theme.breakpoints.up("laptop")]: {
          padding: noPadding ? 0 : theme.spacing(3.75),
          background: details ? "transparent" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          borderRadius: theme.spacing(0.75),
        },
      }}
    >
      <Typography variant="h3" color={theme.palette.primary.main}>
        {t("tags")}
      </Typography>
      <Box component="ul" sx={styles.tagCSS}>
        {tags.map((tag: any) => (
          <Box component="li" key={tag.slug} sx={styles.listCSS}>
            <Link href="/tag/[tag]" as={`/tag/${tag.slug}`}>
              <a>{tag.name}</a>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
