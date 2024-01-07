import Image from "next/image";

import * as styles from "./background.module.scss";

const Background = ({ displayHorse }: { displayHorse?: boolean }) => (
  <>
    <div className={styles.wrapper}>
      <Image
        alt="Red background"
        fill
        src={require("@src/../public/images/assets/bg_desktop_red_background.webp")}
      />
    </div>
    <div
      className={[
        styles.wrapperMobile,
        displayHorse ? styles.displayHorse : "",
      ].join(" ")}
    >
      <Image
        alt="Red background"
        fill
        src={require("@src/../public/images/assets/bg_mobile_red_background.webp")}
        style={{ objectFit: "cover" }}
      />
    </div>
    {displayHorse && (
      <>
        <div className={styles.horseWrapperDesktop}>
          <Image
            alt="Forbole Horse Logo"
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70vw"
            src={require("@src/../public/images/assets/bg_desktop_horse.webp")}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={styles.horseWrapperMobile}>
          <Image
            alt="Forbole Horse Logo"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70vw"
            src={require("@src/../public/images/assets/bg_mobile_horse.webp")}
            style={{ objectFit: "cover" }}
          />
        </div>
      </>
    )}
  </>
);

export default Background;
