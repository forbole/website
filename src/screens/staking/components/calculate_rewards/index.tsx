import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

import Calculator from "./components/calculator";
import * as styles from "./index.module.scss";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const CalculateRewards = () => {
  const { t } = useTranslation("staking");
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center">
      <Box className={styles.wrapper} id="calculate-rewards">
        <Trans
          components={[
            <Box
              className="h3"
              key="0"
              sx={{
                color: theme.palette.custom.forbole.indigo6,
              }}
            />,
            <Box
              className="h3"
              key="1"
              sx={{
                background:
                  "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                backgroundClip: "text",
                textFillColor: "transparent",
              }}
            />,
          ]}
          i18nKey="calculate rewards title"
          ns="staking"
        />
        <Typography
          sx={{
            textShadow:
              "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
            fontWeight: 400,
            fontSize: theme.spacing(2),
            textAlign: "center",
            padding: theme.spacing(3, 0, 3, 0),
            color: theme.palette.custom.forbole.blue,
            [theme.breakpoints.up("laptop")]: {
              fontWeight: 400,
              fontSize: theme.spacing(3),
              paddingBottom: theme.spacing(7),
            },
          }}
          variant="body1"
        >
          {t("calculate rewards desc")}
        </Typography>
        <Calculator />
      </Box>
    </Box>
  );
};

export default CalculateRewards;
