import { Divider } from "@mui/material";
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
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <span className={styles.copy}>{t("copyright", { year })}</span>
        <Divider
          className={dividerClass}
          flexItem
          orientation="vertical"
          variant="middle"
        />
        <Link className={styles.word} href="/terms-and-conditions">
          <span>{t("tnc")}</span>
        </Link>
        <Divider
          className={dividerClass}
          flexItem
          orientation="vertical"
          variant="middle"
        />
        <Link className={styles.word} href="/privacy-policy">
          <span>{t("policy")}</span>
        </Link>
      </div>

      <div className={styles.right}>
        <Link
          className={styles.word}
          href="https://drive.google.com/drive/folders/1w93woI10nRmH3ei6rfFQm4eZxyvk_4-2"
        >
          <span>{t("brand guide")}</span>
        </Link>
        <Divider
          className={dividerClass}
          flexItem
          orientation="vertical"
          variant="middle"
        />
        <Link className={styles.word} href="/blog">
          <span>{t("blog")}</span>
        </Link>
      </div>
    </div>
  );
};

export default FooterItems;
