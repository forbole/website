import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

import * as commonStyles from "@src/screens/staking/common.module.scss";

import { GuideDetails } from "./components";
import * as styles from "./index.module.scss";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const Guide = ({ post }: any) => {
  const { t } = useTranslation("staking");
  const { title } = post;
  const titleArray = title.split(" ");
  const coloredTitle = title.split(" ")[2] + title.split(" ")[3];

  return (
    <Box className={styles.wrapper} data-test="staking-guide-info">
      <Box className={commonStyles.stakingContent}>
        <Typography className={commonStyles.stakingTitle}>
          {t("guideline")}
        </Typography>
        <Trans
          components={[
            <Box
              className={["h3", styles.tr0].join(" ")}
              component="h1"
              key="0"
            />,
            <Box
              className={["h3", styles.tr1].join(" ")}
              component="span"
              key="1"
            />,
          ]}
          i18nKey="staking title"
          ns="staking"
          values={{
            title1: titleArray.slice(0, 1).join(" "),
            coloredTitle,
            title2: titleArray.slice(4).join(" "),
          }}
        />
        <GuideDetails post={post} />
      </Box>
    </Box>
  );
};

export default Guide;
