import { Stack, Typography } from "@mui/material";
import Image from "next/image";

import * as styles from "./index.module.scss";

type Props = {
  desc_1st: string;
  desc_2nd?: string;
  head_bgs?: string[];
  title: string;
};

export default function HeaderCard({
  desc_1st,
  desc_2nd,
  head_bgs,
  title,
}: Props) {
  return (
    <Stack className={styles.wrapper} spacing={3}>
      <Stack className={styles.content} spacing={3}>
        {title && (
          <Typography className={styles.title} variant="h1">
            {title}
          </Typography>
        )}
        {desc_1st && (
          <Typography className={styles.desc} variant="h2">
            {desc_1st}
          </Typography>
        )}
        {desc_2nd && (
          <Typography className={styles.desc2}>{desc_2nd}</Typography>
        )}
      </Stack>
      <div className={styles.image}>
        {head_bgs && (
          <>
            <div className={styles.image2}>
              <Image alt={title} fill priority src={head_bgs[0]} />
            </div>
            <div className={styles.image3}>
              <Image alt={title} fill priority src={head_bgs[1]} />
            </div>
          </>
        )}
      </div>
    </Stack>
  );
}
