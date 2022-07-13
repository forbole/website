import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useWindowDimensions } from '@src/hooks';
import { SocialMedia, FooterItems } from './components';

const Footer = () => {
  const theme = useTheme();
  const { windowDimensions } = useWindowDimensions();
  const { width } = windowDimensions;
  return (
    <Box
      sx={{
        [theme.breakpoints.up('mobile')]: {
          width: '100%',
          background: 'url(/images/assets/footer_mobile.png)',
          backgroundPosition: '0 50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          // height: '40vh',
          // minHeight: '320px',
          // paddingBottom: theme.spacing(4),
          zIndex: 1,
          // position: 'static',
          // styling after review 1:
          minHeight: '280px',
          position: 'static',
          bottom: 0,
          paddingBottom: 0,
        },
        [theme.breakpoints.up('tablet')]: {
          // minHeight: '35vh',
          backgroundSize: '100%',
          // backgroundSize: '100%',
          backgroundPosition: '0 5%',
          bottom: 0,
        },
        [theme.breakpoints.up('laptop')]: {
          width: '100%',
          background: 'url(/images/assets/footer_desktop2.svg) bottom',
          backgroundPosition: '0 100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          // height: '20vh',
          minHeight: '367px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        // overflowY: 'scroll',
        // overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          maxWidth: width,
          width: '100%',
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
            width: '100%',
          },
        }}
      >
        <Box
          sx={{
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('laptop')]: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: theme.spacing(0, 2, 5, 2),
            },
          }}
        >
          <SocialMedia />
          <FooterItems />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
