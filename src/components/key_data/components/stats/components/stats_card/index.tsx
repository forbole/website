import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import { useCounter } from "@src/screens/staking/components/hooks";
import { convertToMoney } from "@src/utils/convert_to_money";

import useStyles from "./useStyles";

const StatsCard = ({ stats, title }: any) => {
  const styles = useStyles();
  const { counterRef, counterValue } = useCounter(stats);
  const { t } = useTranslation("common");

  return (
    <Box css={styles.root} ref={counterRef}>
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
        <Typography variant="h3">{convertToMoney(counterValue)}</Typography>
      )}
    </Box>
  );
};

export default StatsCard;
