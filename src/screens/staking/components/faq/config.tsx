import { Typography, useTheme } from "@mui/material";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useMemo } from "react";

export interface FAQProps {
  question: string;
  para1?: string;
  para2?: string;
  trans?: string;
  para3?: string;
  desc?: string;
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  expanded?: boolean;
  setExpanded?: () => void;
}

export const useFaq = (): FAQProps[] => {
  const { t } = useTranslation("staking");
  const theme = useTheme();

  return useMemo(
    () =>
      [
        {
          question: t("staking q"),
          para1: t("staking para 1"),
          para2: t("staking para 2"),
        },
        {
          question: t("difference q"),
          para1: t("difference para 1"),
        },
        {
          question: t("unstaking q"),
          para1: t("unstaking para 1"),
          para2: t("unstaking para 2"),
          para3: t("unstaking para 3"),
        },
        {
          question: t("risks q"),
          para1: t("risks para 1"),
        },
        {
          question: t("benefits q"),
          desc: t("benefits desc"),
          bullet1: t("benefits bullet 1"),
          bullet2: t("benefits bullet 2"),
        },
        {
          question: t("reward q"),
          para1: t("reward para 1"),
          trans: (
            <Trans
              components={[
                <Typography
                  color={theme.palette.custom.forbole.blue}
                  sx={{
                    fontSize: theme.spacing(2),
                    [theme.breakpoints.up("laptop")]: {
                      fontSize: theme.spacing(2),
                    },
                  }}
                  variant="body1"
                />,
                <Link href="/stake-now">
                  <Typography
                    color="primary.main"
                    fontWeight={900}
                    sx={{
                      display: "inline",
                      fontSize: theme.spacing(1.5),
                      [theme.breakpoints.up("laptop")]: {
                        fontSize: theme.spacing(2),
                        display: "inline",
                      },
                    }}
                  />
                </Link>,
              ]}
              i18nKey="reward para 2"
            />
          ),
          para3: t("reward para 3"),
        },
        {
          question: t("receiving q"),
          bullet1: t("receiving bullet 1"),
          bullet2: t("receiving bullet 2"),
        },
        {
          question: t("drop q"),
          desc: t("drop desc"),
          bullet1: t("drop bullet 1"),
          bullet2: t("drop bullet 2"),
        },
        {
          question: t("claim q"),
          para1: t("claim para 1"),
        },
      ] as FAQProps[],
    [t, theme],
  );
};
