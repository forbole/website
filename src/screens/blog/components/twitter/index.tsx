import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import { styles } from "./styles";

const Twitter = () => {
  const { t } = useTranslation("blog");
  const theme = useTheme();

  return (
    <Box sx={styles.twitterCSS}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: theme.spacing(3),
          paddingBottom: theme.spacing(1.5),
        }}
        variant="h3"
      >
        {t("twitter")}
      </Typography>
      <Box>
        <TwitterTimelineEmbed
          borderColor="rgba(116, 136, 188, 0.3)"
          linkColor={
            theme.palette.mode === "dark"
              ? theme.palette.primary.main
              : theme.palette.text.primary
          }
          noHeader
          options={{
            height: 500,
          }}
          screenName="forbole"
          sourceType="profile"
          theme="dark"
          transparent
        />
      </Box>
    </Box>
  );
};

export default Twitter;
