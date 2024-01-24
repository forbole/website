import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { memo } from "react";

import horseImage from "@src/../public/images/assets/image_horse_blur.png";
import horseShadow from "@src/../public/images/assets/image_water_shadow.png";
import ScrollToBottom from "@src/components/scroll_to_bottom";

import * as styles from "./index.module.scss";

type Props = {
  scrollRef: React.RefObject<HTMLDivElement>;
};

const Hero = ({ scrollRef }: Props) => {
  const { t } = useTranslation("staking");

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
      </div>
      <div className={styles.arrowWrapper}>
        <ScrollToBottom bottomRef={scrollRef} staking />
      </div>
    </div>
  );
};

export default memo(Hero);
