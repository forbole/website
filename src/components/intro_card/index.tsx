import { Typography } from "@mui/material";
import Image from "next/image";

import { CtaLink } from "../cta-button";
import * as styles from "./index.module.scss";

type Props = {
  btnLink?: string;
  btnName?: string;
  desc?: string;
  disabled?: boolean;
  imageHref?: string;
  list?: string[];
  title?: string;
};

const IntroCard = ({
  btnLink,
  btnName,
  desc,
  disabled,
  imageHref = "",
  list,
  title,
}: Props) => (
  <div className={styles.wrapper}>
    <div className={styles.imageWrapper}>
      {imageHref && (
        <Image
          alt={title ? `${title} image` : ""}
          className={styles.image}
          fill
          src={imageHref}
        />
      )}
    </div>
    <div className={styles.contentWrapper}>
      <div>
        <Typography className={styles.title}>{title}</Typography>

        {typeof desc && <Typography className={styles.desc}>{desc}</Typography>}
        <ul style={{ listStyle: "none" }}>
          {list?.map((item, index) => (
            <Typography className={styles.listItem} component="li" key={index}>
              {item}
            </Typography>
          ))}
        </ul>
      </div>
      <CtaLink
        className={styles.ctaButton}
        disabled={disabled}
        href={btnLink || ""}
      >
        {btnName}
      </CtaLink>
    </div>
  </div>
);

export default IntroCard;
