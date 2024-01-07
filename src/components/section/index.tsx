import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";

import * as styles from "./index.module.scss";

const Trans = dynamic(async () => import("next-translate/Trans"), {
  ssr: false,
});

type Props = {
  desc?: string;
  maxWidth?: string;
  title?: string;
  title_large?: string;
  title_large_trans?: string;
};

// Rename the component so the i18next parser doesn't try to parse it
const Translate = Trans;

const Section = ({
  desc,
  maxWidth,
  title,
  title_large,
  title_large_trans,
}: Props) => (
  <Stack className={styles.wrapper} {...(maxWidth && { style: { maxWidth } })}>
    {title && <h2 className={styles.title}>{title}</h2>}
    {title_large && <h2 className={styles.titleLarge}>{title_large}</h2>}

    {title_large_trans && (
      <Translate
        components={[
          <Typography className={styles.tr0} key="0" />,
          <Typography className={styles.tr1} component="span" key="1" />,
        ]}
        i18nKey={title_large_trans}
      />
    )}

    {desc && <h3 className={styles.desc}>{desc}</h3>}
  </Stack>
);

export default Section;
