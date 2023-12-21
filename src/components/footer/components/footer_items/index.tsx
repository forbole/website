import { Box, Divider, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import type { FooterProps } from "../../types";
import * as styles from "./index.module.scss";

const FooterItems = ({ staking }: FooterProps) => {
  const { t } = useTranslation("common");
  const today = new Date();
  const year = today.getFullYear();

  const dividerClass = [styles.divider, staking ? styles.staking : ""].join(
    " ",
  );

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.left}>
        <Typography className={styles.copy}>
          {t("copyright", { year })}
        </Typography>
        <Divider
          className={dividerClass}
          flexItem
          orientation="vertical"
          variant="middle"
        />
        <Link className={styles.word} href="/terms-and-conditions">
          <Typography component="span">{t("tnc")}</Typography>
        </Link>
        <Divider
          className={dividerClass}
          flexItem
          orientation="vertical"
          variant="middle"
        />
        <Link className={styles.word} href="/privacy-policy">
          <Typography component="span">{t("policy")}</Typography>
        </Link>
      </Box>

      <Box>
        <Box className={styles.right}>
          <Link
            className={styles.word}
            href="https://drive.google.com/drive/folders/1w93woI10nRmH3ei6rfFQm4eZxyvk_4-2"
          >
            <Typography component="span">{t("brand guide")}</Typography>
          </Link>
          <Divider
            className={dividerClass}
            flexItem
            orientation="vertical"
            variant="middle"
          />
          <Link className={styles.word} href="/blog">
            <Typography component="span">{t("blog")}</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterItems;
