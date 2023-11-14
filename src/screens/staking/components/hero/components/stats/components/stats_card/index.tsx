import { Box, Typography } from "@mui/material";
import { useCounter } from "@screens/staking/components/hooks";
import { convertToMoney } from "@utils/convert_to_money";
import useTranslation from "next-translate/useTranslation";

import useStyles from "./useStyles";

const StatsCard = ({ title, stats }: any) => {
  const { t } = useTranslation("staking");
  const styles = useStyles();
  const { counterValue, counterRef } = useCounter(stats);

  return (
    <Box ref={counterRef} css={styles.root}>
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
