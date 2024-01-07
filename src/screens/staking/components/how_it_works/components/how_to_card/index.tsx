import Image from "next/legacy/image";

import * as styles from "./index.module.scss";

const HowToCard = ({ desc, image, title }: any) => (
  <div className={styles.wrapper}>
    <div className={styles.imageWrapper}>
      {image && (
        <Image alt="" height="60" objectFit="contain" src={image} width="70" />
      )}
    </div>
    <div className={styles.content}>
      <h4 className={styles.title}>{title}</h4>
      <span className={styles.desc}>{desc}</span>
    </div>
  </div>
);

export default HowToCard;
