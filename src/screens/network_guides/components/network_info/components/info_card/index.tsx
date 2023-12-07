/* eslint-disable no-nested-ternary */
import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

import { convertToMoney } from "@src/utils/convert_to_money";

import useStyles from "./useStyles";

const InfoCard = ({ title, stats, type }: any) => {
  const { t } = useTranslation("staking");
  const styles = useStyles();

  return (
    <Box css={styles.root}>
      <Typography variant="h6">{title}</Typography>
      {title === t("staked by forbole") ? (
        <Typography variant="h3">
          {type}
          {stats === "-" ? stats : convertToMoney(stats)}
        </Typography>
      ) : title === t("apy") ? (
        <Typography variant="h3">
          {(parseFloat(stats) * 100).toFixed(1)} {type}
        </Typography>
      ) : title === t("commission") ? (
        <Typography variant="h3">
          {parseFloat(stats) * 100} {type}
        </Typography>
      ) : (
        <Typography variant="h3">{stats}</Typography>
      )}
    </Box>
  );
};

export default InfoCard;
