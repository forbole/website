/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Typography } from "@mui/material";
import { convertToMoney } from "@utils/convert_to_money";
import useStyles from "./useStyles";

const InfoCard = ({ title, stats, type }: any) => {
  const { t } = useTranslation("staking");
  const styles = useStyles();

  return (
    <Box css={styles.root}>
      <Typography variant="h6">{t(title)}</Typography>
      {title === "staked by forbole" ? (
        <Typography variant="h3">
          {t(type)}
          {stats === "-" ? stats : convertToMoney(stats)}
        </Typography>
      ) : title === "apy" ? (
        <Typography variant="h3">
          {(parseFloat(stats) * 100).toFixed(1)} {t(type)}
        </Typography>
      ) : title === "commission" ? (
        <Typography variant="h3">
          {parseFloat(stats) * 100} {t(type)}
        </Typography>
      ) : (
        <Typography variant="h3">{stats}</Typography>
      )}
    </Box>
  );
};

export default InfoCard;
