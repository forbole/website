import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, ScrollToTop, ScrollToBottom } from '@components';
import { MissionHeader, MissionItems } from './components';

const Mission = () => {
  const { t } = useTranslation('mission');
  const theme = useTheme();
  const topRef = React.useRef(null);
  const bottomRef = React.useRef(null);
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
            background: 'url(/images/assets/image_waveBG.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            // backgroundPosition: '52px -59px',
            minHeight: '75vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.up('laptop')]: {
              zIndex: 1,
            },
          }}
        >
          <Box
            ref={bottomRef}
            sx={{
              //   padding: theme.spacing(0, 3),
              padding: theme.spacing(18, 3, 0, 3),
              [theme.breakpoints.up('laptop')]: {
                maxWidth: '1200px',
                padding: theme.spacing(18, 0, 0, 0),
              },
            }}
          >
            <MissionItems />
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

export default Mission;
