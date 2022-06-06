import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Divider, useTheme } from '@mui/material';
import { Layout } from '@components';
import { AboutUsMobile, MilestonesMobile } from './components';

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
    </Layout>
  );
};

export default About;
