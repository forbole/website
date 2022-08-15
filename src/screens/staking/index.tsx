import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { LayoutVal } from '@components';
import { FAQ } from './components';

const Staking = () => {
  const { t } = useTranslation('staking');
  const theme = useTheme();

  return (
    <LayoutVal navLink="staking">
      <FAQ />
    </LayoutVal>
  );
};

export default Staking;
