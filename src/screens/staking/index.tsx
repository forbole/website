/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { LayoutVal } from '@components';
import { ContactForbole, FAQ } from './components';
import { LaptopCSS } from './styles';

const Staking = () => {
  const { t } = useTranslation('staking');
  const theme = useTheme();

  return (
    <LayoutVal navLink="staking" footer>
      <LaptopCSS>
        <ContactForbole />
      </LaptopCSS>
      <LaptopCSS>
        <FAQ />
      </LaptopCSS>
    </LayoutVal>
  );
};

export default Staking;
