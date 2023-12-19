import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";

import CtaButton from "../cta-button";
import * as styles from "./index.module.scss";

type Props = {
  title?: string;
  desc?: string;
  list?: string[];
  imageHref?: string;
  btnName?: string;
  btnClick?: () => void;
  disabled?: boolean;
};
const IntroCard = (props: Props) => {
  const {
    title,
    desc,
    list,
    imageHref = "",
    btnName,
    disabled,
    btnClick,
  } = props;

  return (
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

          {typeof desc && (
            <Typography className={styles.desc}>{desc}</Typography>
          )}
          <ul style={{ listStyle: "none" }}>
            {list?.map((item, index) => (
              <Typography
                className={styles.listItem}
                component="li"
                key={index}
              >
                {item}
              </Typography>
            ))}
          </ul>
        </Box>
        <CtaButton
          className={styles.ctaButton}
          disabled={disabled}
          onClick={btnClick}
        >
          {btnName}
        </CtaButton>
      </Box>
    </Box>
  );
};

export default IntroCard;
