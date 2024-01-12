import { Stack } from "@mui/material";
import Image from "next/image";

import * as styles from "./index.module.scss";

type Props = {
  desc_1st: string;
  desc_2nd?: string;
  head_bgs?: string[];
  title: string;
};

const HeaderCard = ({ desc_1st, desc_2nd, head_bgs, title }: Props) => (
  <Stack className={styles.wrapper} spacing={3}>
    <Stack className={styles.content} spacing={3}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {desc_1st && <h2 className={styles.desc}>{desc_1st}</h2>}
      {desc_2nd && <p className={styles.desc2}>{desc_2nd}</p>}
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

export default HeaderCard;
