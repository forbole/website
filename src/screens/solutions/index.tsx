import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, ScrollToTop, ScrollToBottom } from '@components';
import { useWindowDimensions } from '@hooks';
import { Overview, Lineup } from './components';

const Solutions = () => {
  const { t } = useTranslation('solutions');
  const theme = useTheme();
  const { isDesktop } = useWindowDimensions();
  const topRef = React.useRef(null);
  const bottomRef = React.useRef(null);
  return (
    <Layout title={t('title')} navLink="/solutions" waveBG footer>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '140vh',
          backgroundColor: '#171A4B',
          [theme.breakpoints.down('laptop')]: {
            minHeight: 'auto',
            background: 'url(/images/assets/image_BG.png) top',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          },
          [theme.breakpoints.up('laptop')]: {
            background: 'url(/images/assets/image_BG.png) top',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '130%',
            minHeight: '130vh',
          },
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(0, 3),
            [theme.breakpoints.up('laptop')]: { maxWidth: '1200px' },
          }}
          ref={topRef}
        >
          <Overview />
          <Box
            sx={{
              display: 'none',
              [theme.breakpoints.up('laptop')]: {
                display: 'flex',
                justifyContent: 'center',
              },
            }}
          >
            <ScrollToBottom bottomRef={bottomRef} />
          </Box>
        </Box>
        <Box
          sx={{
            background: 'url(/images/assets/image_wave.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            minHeight: '75vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.up('laptop')]: {
              background: 'url(/images/assets/image_wave.png)',
              backgroundPosition: '0 0%',
              backgroundSize: 'cover',
              WebkitBackgroundSize: 'cover',
              MozBackgroundSize: 'cover',
              OBackgroundSize: 'cover',
              zIndex: 1,
            },
          }}
        >
          <Box
            ref={bottomRef}
            sx={{
              padding: theme.spacing(25, 3, 0, 3),
              width: '100%',
              [theme.breakpoints.up('tablet')]: {
                padding: theme.spacing(18, 3, 0, 3),
                width: '100%',
              },
              [theme.breakpoints.up('laptop')]: {
                maxWidth: '1200px',
                padding: theme.spacing(25, 0, 0, 0),
                width: '100%',
              },
            }}
          >
            <Lineup />
            <Box height={isDesktop ? '500px' : '0px'} />
            <Box
              sx={{
                display: 'none',
                [theme.breakpoints.up('laptop')]: {
                  display: 'flex',
                  position: 'absolute',
                  left: '50%',
                  justifyContent: 'center',
                  bottom: '350px',
                },
              }}
            >
              <ScrollToTop topRef={topRef} />
            </Box>
          </Box>
        </Box>
        <Box
          position="fixed"
          right="5%"
          bottom="10%"
          sx={{
            display: 'block',
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

export default Solutions;
