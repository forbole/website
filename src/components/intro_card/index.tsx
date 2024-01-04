import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
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
  <Box className={styles.wrapper} component="div">
    <Box className={styles.imageWrapper}>
      {imageHref && (
        <Image
          alt={title ? `${title} image` : ""}
          className={styles.image}
          fill
          src={imageHref}
        />
      )}
    </Box>
    <Box className={styles.contentWrapper} component="div">
      <Box>
        <Typography className={styles.title}>{title}</Typography>

        {typeof desc && <Typography className={styles.desc}>{desc}</Typography>}
        <ul style={{ listStyle: "none" }}>
          {list?.map((item, index) => (
            <Typography className={styles.listItem} component="li" key={index}>
              {item}
            </Typography>
          ))}
        </ul>
      </Box>
      <CtaLink
        className={styles.ctaButton}
        disabled={disabled}
        href={btnLink || ""}
      >
        {btnName}
      </CtaLink>
    </Box>
  </Box>
);

export default IntroCard;
