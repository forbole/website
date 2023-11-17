import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

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
        "padding": theme.spacing(7, 3),
        "color": theme.palette.primary.main,
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
      <Typography color={theme.palette.primary.main} variant="h3">
        {t("tags")}
      </Typography>
      <Box component="ul" sx={styles.tagCSS}>
        {tags.map((tag: any) => (
          <Box key={tag.slug} component="li" sx={styles.listCSS}>
            <Link as={`/tag/${tag.slug}`} href="/tag/[tag]">
              {tag.name}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
