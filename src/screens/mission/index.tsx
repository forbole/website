import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { Layout, ScrollToTop, ScrollToBottom } from '@components';
import { MissionHeader, MissionItems } from './components';

const Mission = () => {
  const { t } = useTranslation('mission');
  const theme = useTheme();
  const topRef = React.useRef(null);
  return (
    <Layout title={t('title')} navLink="/mission" waveBG footer>
      <Box
        sx={{
          //   padding: theme.spacing(0, 3),
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '140vh',
          [theme.breakpoints.down('laptop')]: {
            minHeight: 'auto',
          },
          [theme.breakpoints.up('laptop')]: { minHeight: '130vh' },
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(0, 3),
            [theme.breakpoints.up('laptop')]: { maxWidth: '1200px' },
          }}
          ref={topRef}
        >
          <MissionHeader />
        </Box>
        <Box
          sx={{
            // background: 'url(/images/assets/footer_mobile.svg) bottom',
            background: 'url(/images/assets/image_BG_wave.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // backgroundSize: '200%',
            backgroundPosition: '50%',
            // backgroundPosition: '60% 0%',
            // backgroundPosition: '52px -59px',
            minHeight: '75vh',
            width: '100%',
          }}
        >
          <Box
            sx={{
              //   padding: theme.spacing(0, 3),
              padding: theme.spacing(18, 3, 0, 3),
              [theme.breakpoints.up('laptop')]: { maxWidth: '1200px' },
            }}
          >
            <MissionItems />
          </Box>
        </Box>
        <Box
          position="fixed"
          right="5%"
          bottom="10%"
          sx={{
            display: 'block',
            // zIndex: 2,
            [theme.breakpoints.up('laptop')]: {
              display: 'none',
            },
          }}
        >
          <ScrollToTop topRef={topRef} mobile />
        </Box>
      </Box>
    </Layout>
  );
};

export default Mission;
