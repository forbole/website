import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Divider, useTheme } from '@mui/material';
import { Layout, ScrollToTop } from '@components';
import {
  AboutUsMobile,
  MilestonesMobile,
  AboutUsDesktop,
  MilestonesDesktop,
} from './components';

const About = () => {
  const { t } = useTranslation('about');
  const theme = useTheme();
  const topRef = React.useRef(null);
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
        ref={topRef}
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
        <ScrollToTop topRef={topRef} height="40vh" />
      </Box>
    </Layout>
  );
};

export default About;
