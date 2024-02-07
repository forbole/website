import { Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { memo } from "react";

import Calculator from "./components/calculator";
import * as styles from "./index.module.scss";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const CalculateRewards = () => {
  const { t } = useTranslation("staking");
  const theme = useTheme();

  return (
    <div className={styles.wrapperTop}>
      <div className={styles.wrapper} id="calculate-rewards">
        <Trans
          components={[
            <div className={["h3", styles.tr0].join(" ")} key="0" />,
            <div className={["h3", styles.tr1].join(" ")} key="1" />,
          ]}
          i18nKey="calculate rewards title"
          ns="staking"
        />
        <Typography
          sx={{
            color: theme.palette.custom.forbole.blue,
            fontSize: theme.spacing(2),
            fontWeight: 400,
            padding: theme.spacing(3, 0, 3, 0),
            textAlign: "center",
            textShadow:
              "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
            [theme.breakpoints.up("laptop")]: {
              fontSize: theme.spacing(3),
              fontWeight: 400,
              paddingBottom: theme.spacing(7),
            },
          }}
          variant="body1"
        >
          {t("calculate rewards desc")}
        </Typography>
        <Calculator />
      </div>
    </div>
  );
};

export default memo(CalculateRewards);
