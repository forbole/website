/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Typography } from "@mui/material";
import { convertToMoney } from "@utils/convert_to_money";
import useStyles from "./useStyles";

const StatsCard = ({ title, stats }: any) => {
  const { t } = useTranslation("common");
  const styles = useStyles();
  return (
    <Box css={styles.root}>
      <Typography variant="h6">{t(title)}</Typography>
      {title === "full tvl" && stats === "-" && (
        <Typography variant="h3">{`$ ${stats}`}</Typography>
      )}
      {title === "full tvl" && stats !== "-" && (
        <Typography variant="h3">{`$ ${convertToMoney(stats)}`}</Typography>
      )}
      {title === "users staking" && stats === "-" && (
        <Typography variant="h3">{`${stats}`}</Typography>
      )}
      {title === "users staking" && stats !== "-" && (
        <Typography variant="h3">{convertToMoney(stats)}</Typography>
      )}
      {title === "supporting networks" && (
        <Typography variant="h3">{convertToMoney(stats)}</Typography>
      )}
    </Box>
  );
};

export default StatsCard;
