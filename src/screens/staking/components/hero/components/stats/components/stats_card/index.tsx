/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography } from '@mui/material';
import { convertToMoney } from '@utils/convert_to_money';
import useStyles from './useStyles';

const StatsCard = ({ title, stats }: any) => {
  const { t } = useTranslation('staking');
  const styles = useStyles();

  return (
    <Box css={styles.root}>
      <Typography variant="h6">{t(title)}</Typography>
      <Typography variant="h3">{convertToMoney(stats)}</Typography>
    </Box>
  );
};

export default StatsCard;
