/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { LayoutVal } from '@components';
import {
  WhyForbole,
  CalculateRewards,
  ContactForbole,
  FAQ,
  HowItWorks,
  Networks,
  Hero,
} from './components';
import { LaptopCSS } from './styles';

const Staking = () => {
  const { t } = useTranslation('staking');
  const theme = useTheme();

  return (
    <LayoutVal navLink="staking" footer>
      <LaptopCSS>
        <Hero />
      </LaptopCSS>
      <LaptopCSS>
        <Networks />
      </LaptopCSS>
      <LaptopCSS>
        <HowItWorks />
      </LaptopCSS>
      <LaptopCSS>
        <WhyForbole />
      </LaptopCSS>
      <LaptopCSS>
        <CalculateRewards />
      </LaptopCSS>
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
