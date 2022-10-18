/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography } from '@mui/material';
import { convertToMoney } from '@utils/convert_to_money';
import useStyles from './useStyles';

const InfoCard = ({ title, stats, type }: any) => {
  const { t } = useTranslation('staking');
  const styles = useStyles();

  return (
    <Box css={styles.root}>
      <Typography variant="h6">{t(title)}</Typography>
      {type === 'money' ? (
        <Typography variant="h3">
          {t(type)}
          {convertToMoney(stats)}
        </Typography>
      ) : type === 'percentage' ? (
        <Typography variant="h3">
          {stats} {t(type)}
        </Typography>
      ) : (
        <Typography variant="h3">
          {stats} {t(type)}
        </Typography>
      )}
    </Box>
  );
};

export default InfoCard;
