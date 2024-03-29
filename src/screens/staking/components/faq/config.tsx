import { Typography } from "@mui/material";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useMemo } from "react";

import * as styles from "./config.module.scss";

export interface FAQProps {
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  desc?: string;
  expanded?: boolean;
  para1?: string;
  para2?: string;
  para3?: string;
  question: string;
  setExpanded?: () => void;
  trans?: string;
}

export const useFaq = (): FAQProps[] => {
  const { t } = useTranslation("staking");

  return useMemo(
    () =>
      [
        {
          para1: t("staking para 1"),
          para2: t("staking para 2"),
          question: t("staking q"),
        },
        {
          para1: t("difference para 1"),
          question: t("difference q"),
        },
        {
          para1: t("unstaking para 1"),
          para2: t("unstaking para 2"),
          para3: t("unstaking para 3"),
          question: t("unstaking q"),
        },
        {
          para1: t("risks para 1"),
          question: t("risks q"),
        },
        {
          bullet1: t("benefits bullet 1"),
          bullet2: t("benefits bullet 2"),
          desc: t("benefits desc"),
          question: t("benefits q"),
        },
        {
          para1: t("reward para 1"),
          para3: t("reward para 3"),
          question: t("reward q"),
          trans: (
            <Trans
              components={[
                <Typography className={styles.tr0} key="0" variant="body1" />,
                <Link
                  href="#"
                  key="1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const calculator =
                      document.getElementById("calculate-rewards");

                    if (!calculator) {
                      return;
                    }

                    calculator.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <Typography className={styles.tr1} />
                </Link>,
              ]}
              i18nKey="reward para 2"
              ns="staking"
            />
          ),
        },
        {
          bullet1: t("receiving bullet 1"),
          bullet2: t("receiving bullet 2"),
          question: t("receiving q"),
        },
        {
          bullet1: t("drop bullet 1"),
          bullet2: t("drop bullet 2"),
          desc: t("drop desc"),
          question: t("drop q"),
        },
        {
          para1: t("claim para 1"),
          question: t("claim q"),
        },
      ] as FAQProps[],
    [t],
  );
};
