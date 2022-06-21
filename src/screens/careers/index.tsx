import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { Layout, ScrollToTop, ScrollToBottom } from '@components';
import { CareersHeader } from './components';

const Careers = (props: any) => {
  const { t } = useTranslation('careers');
  const theme = useTheme();
  const topRef = React.useRef(null);

  return (
    <Layout title={t('title')} navLink="/careers" waveBG footer>
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
            background: 'url(/images/assets/image_BG.png) top',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '200%',
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
      </Box>
    </Layout>
  );
};

export default Careers;
