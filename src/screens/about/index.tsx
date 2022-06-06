import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Divider, useTheme } from '@mui/material';
import { Layout } from '@components';
import {
  AboutUsMobile,
  MilestonesMobile,
  AboutUsDesktop,
  MilestonesDesktop,
} from './components';

const About = () => {
  const { t } = useTranslation('about');
  const theme = useTheme();
  return (
    <Layout title={t('title')} navLink="/about" footer>
      <Box
        sx={{
          [theme.breakpoints.up('laptop')]: { display: 'none' },
        }}
      >
        <AboutUsMobile />
        <Divider
          variant="middle"
          sx={{ border: '1px solid rgba(255, 255, 255, 0.3)' }}
        />
        <MilestonesMobile />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          [theme.breakpoints.down('laptop')]: { display: 'none' },
        }}
      >
        <AboutUsDesktop />
        <MilestonesDesktop />
      </Box>
    </Layout>
  );
};

export default About;
