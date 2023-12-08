import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import React from "react";

import horseImage from "@src/../public/images/assets/image_horse_blur.png";
import horseShadow from "@src/../public/images/assets/image_water_shadow.png";
import { ScrollToBottom } from "@src/components";

import { Stats } from "./components";
import * as styles from "./index.module.scss";

const Hero = () => {
  const { t } = useTranslation("staking");
  const ref = React.useRef(null);

  return (
    <Box className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.main}>
          <Box className={styles.imgWrapper}>
            <Image
              alt="Forbole Horse Logo"
              layout="fill"
              priority
              src={horseImage}
            />
          </Box>
          <Typography className={styles.title}>{t("FVH title")}</Typography>
          <Box className={styles.shadow}>
            <Image alt="Forbole Logo Shadow" fill src={horseShadow} />
          </Box>
        </Box>
        <ScrollToBottom bottomRef={ref} staking />
      </Box>
      <Box className={styles.stats} ref={ref}>
        <Stats />
      </Box>
    </Box>
  );
};

export default Hero;
