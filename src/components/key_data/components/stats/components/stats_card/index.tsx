import { Box, Typography } from "@mui/material";
import { useCounter } from "@screens/staking/components/hooks";
import { convertToMoney } from "@utils/convert_to_money";

import useStyles from "./useStyles";

const StatsCard = ({ title, stats }: any) => {
  const styles = useStyles();
  const { counterValue, counterRef } = useCounter(stats);

  return (
    <Box ref={counterRef} css={styles.root}>
      <Typography variant="h6">{title}</Typography>
      {title === "full tvl" && stats === "-" && (
        <Typography variant="h3">{`$ ${stats}`}</Typography>
      )}
      {title === "full tvl" && stats !== "-" && (
        <Typography variant="h3">{`$ ${convertToMoney(
          counterValue,
        )}`}</Typography>
      )}
      {title === "users staking" && stats === "-" && (
        <Typography variant="h3">{`${stats}`}</Typography>
      )}
      {title === "users staking" && stats !== "-" && (
        <Typography variant="h3">{convertToMoney(counterValue)}</Typography>
      )}
      {title === "supporting networks" && (
        <Typography variant="h3">{convertToMoney(counterValue)}</Typography>
      )}
    </Box>
  );
};

export default StatsCard;
