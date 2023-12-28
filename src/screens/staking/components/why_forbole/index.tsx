import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import { useMemo } from "react";

import * as styles from "./index.module.scss";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const WhyForbole = () => {
  const { t } = useTranslation("staking");

  const reasons = useMemo(
    () => [
      {
        desc: t("reputable validator desc"),
        image: "/images/assets/image_journey.png",
        title: t("reputable validator"),
      },
      {
        desc: t("security focus desc"),
        image: "/images/assets/image_security.png",
        title: t("security focus"),
      },
      {
        desc: t("our future desc"),
        image: "/images/assets/image_future.png",
        title: t("our future"),
      },
    ],
    [t],
  );

  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <Box className={styles.inner}>
          <Box className={styles.content}>
            <Typography className={styles.whyForbole} variant="body1">
              {t("why forbole?")}
            </Typography>
            <Trans
              components={[
                <Box className={styles.tr0} key="0" />,
                <Box className={styles.tr1} key="1" />,
              ]}
              i18nKey="why forbole title"
              ns="staking"
            />
            {reasons.map((reason, i) => (
              <Box className={styles.reasonWrapper} key={i}>
                {reason?.image && (
                  <Image
                    alt=""
                    height={onlyLargeScreen ? "370" : "260"}
                    objectFit="contain"
                    src={reason.image}
                    width={onlyLargeScreen ? "314" : "220"}
                  />
                )}
                <Box className={styles.reasonContent}>
                  <Typography className={styles.reasonTitle} variant="h4">
                    {reason.title}
                  </Typography>
                  <Typography className={styles.reasonDesc} variant="body1">
                    {reason.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhyForbole;
