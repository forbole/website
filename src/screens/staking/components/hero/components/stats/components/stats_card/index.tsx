import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import { useCounter } from "@src/screens/staking/components/hooks";
import { convertToMoney } from "@src/utils/convert_to_money";

import * as styles from "./index.module.scss";

const StatsCard = ({ title, stats }: any) => {
  const { t } = useTranslation("common");
  const { counterValue, counterRef } = useCounter(stats);

  return (
    <Box className={styles.root} ref={counterRef}>
      <Typography variant="h6">{title}</Typography>
      {title === t("full tvl") && stats === "-" && (
        <Typography variant="h3">{`$ ${stats}`}</Typography>
      )}
      {title === t("full tvl") && stats !== "-" && (
        <Typography variant="h3">{`$ ${convertToMoney(
          counterValue,
        )}`}</Typography>
      )}
      {title === t("users staking") && stats === "-" && (
        <Typography variant="h3">{`${stats}`}</Typography>
      )}
      {title === t("users staking") && stats !== "-" && (
        <Typography variant="h3">{convertToMoney(counterValue)}</Typography>
      )}
      {title === t("supporting networks") && (
        <Typography variant="h3">
          {Math.floor(counterValue as number)}
        </Typography>
      )}
    </Box>
  );
};

export default StatsCard;
