/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { LayoutVal } from '@components';
import { ContactForbole, FAQ } from './components';

const Staking = () => {
  const { t } = useTranslation('staking');
  const theme = useTheme();

  return (
    <LayoutVal navLink="staking">
      <Box
        sx={{
          [theme.breakpoints.up('laptop')]: {
            minHeight: '100vh',
          },
        }}
      >
        <ContactForbole />
      </Box>
      <Box
        sx={{
          [theme.breakpoints.up('laptop')]: {
            minHeight: '100vh',
            paddingTop: theme.spacing(20),
          },
        }}
      >
        <FAQ />
      </Box>
    </LayoutVal>
  );
};

export default Staking;
