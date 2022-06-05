import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useWindowDimensions } from '@src/hooks';
import { SocialMedia, FooterItems } from './components';

const Footer = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  return (
    <Box
      sx={{
        [theme.breakpoints.down('laptop')]: {
          width: '100%',
          background: 'url(/images/assets/footer_mobile.svg) bottom',
          backgroundPosition: '0 0',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          height: '40vh',
          minHeight: '320px',
          paddingBottom: theme.spacing(4),
        },
        width: '100%',
        background: 'url(/images/assets/footer_desktop.svg) bottom',
        backgroundPosition: '0 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: '20vh',
        minHeight: '450px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
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
            padding: theme.spacing(0, 2, 5, 2),
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
