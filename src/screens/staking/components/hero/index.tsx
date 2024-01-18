import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { memo, useRef } from "react";

import horseImage from "@src/../public/images/assets/image_horse_blur.png";
import horseShadow from "@src/../public/images/assets/image_water_shadow.png";
import ScrollToBottom from "@src/components/scroll_to_bottom";
import Stats from "@src/components/stats";

import * as styles from "./index.module.scss";

const Hero = () => {
  const { t } = useTranslation("staking");
  const ref = useRef(null);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.imgWrapper}>
            <Image
              alt="Forbole Horse Logo"
              layout="fill"
              priority
              src={horseImage}
            />
          </div>
          <h1 className={styles.title}>{t("FVH title")}</h1>
          <div className={styles.shadow}>
            <Image alt="Forbole Logo Shadow" fill src={horseShadow} />
          </div>
        </div>
        <ScrollToBottom bottomRef={ref} staking />
      </div>
      <div className={styles.stats} ref={ref}>
        <Stats />
      </div>
    </div>
  );
};

export default memo(Hero);
