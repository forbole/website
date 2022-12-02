/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
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
  const stakeNowRef = useRef(null);
  React.useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <LayoutVal
      stakeNowRef={stakeNowRef}
      navLink="staking"
      image="/images/assets/image_forbole_validator_website_preview.png"
      twitterImage="/images/assets/image_forbole_validator_website_preview.png"
      footer
    >
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
      <LaptopCSS ref={stakeNowRef}>
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
