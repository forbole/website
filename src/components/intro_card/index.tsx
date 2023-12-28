import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";

import CtaButton from "../cta-button";
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
  title,
  desc,
  list,
  imageHref = "",
  btnName,
  disabled,
  btnLink,
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
      <Link href={btnLink || ""}>
        <CtaButton className={styles.ctaButton} disabled={disabled}>
          {btnName}
        </CtaButton>
      </Link>
    </Box>
  </Box>
);

export default IntroCard;
