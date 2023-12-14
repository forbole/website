import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

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
      <Box className={styles.content}>
        <Typography className={styles.guideline} variant="h4">
          {t("guideline")}
        </Typography>
        <Trans
          components={[
            <Box className={[styles.tr0, "h3"].join(" ")} key="0" />,
            <Box className={["h3", styles.tr1].join(" ")} key="1" />,
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
