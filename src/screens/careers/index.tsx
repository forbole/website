import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, ScrollToTop } from '@components';
import { ClientOnly } from '@src/utils/clientOnly';
import { CareersHeader, Opportunities } from './components';

const Careers = (props: any) => {
  const { t } = useTranslation('careers');
  const theme = useTheme();
  const topRef = React.useRef(null);

  return (
    <Layout title={t('title')} navLink="/careers" waveBG footer>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '140vh',
          [theme.breakpoints.down('laptop')]: {
            minHeight: 'auto',
            background: 'url(/images/assets/image_BG.png) top',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '600%',
          },
          [theme.breakpoints.up('laptop')]: {
            background: 'url(/images/assets/image_BG.png) top',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
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
          <CareersHeader />
        </Box>
        <Box
          sx={{
            background: 'url(/images/assets/image_waveBG.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '300%',
            backgroundPosition: 'top 0px left -150px',
            minHeight: '75vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.up('tablet')]: {
              backgroundPosition: 'top -50px left -550px',
            },
            [theme.breakpoints.up('laptop')]: {
              zIndex: 1,
              backgroundSize: '200%',
            },
          }}
        >
          <Box
            sx={{
              padding: theme.spacing(13, 3, 0, 3),
              [theme.breakpoints.up('laptop')]: {
                maxWidth: '1200px',
                padding: theme.spacing(35, 0, 0, 0),
              },
            }}
          >
            <ClientOnly>
              <Opportunities jobPosts={props} />
            </ClientOnly>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'none',
            [theme.breakpoints.up('laptop')]: {
              display: 'flex',
              position: 'absolute',
              left: '50%',
              justifyContent: 'center',
              bottom: '300px',
            },
          }}
        >
          <ScrollToTop topRef={topRef} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Careers;
