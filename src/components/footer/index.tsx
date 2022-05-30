import React from 'react';
import { Box, useTheme } from '@mui/material';
import { SocialMedia, FooterItems } from './components';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        [theme.breakpoints.down('laptop')]: { display: 'none' },
        width: '100%',
        background: 'url(/images/assets/footer_desktop.svg) bottom',
        backgroundPosition: '0 center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height: '20vh',
        minHeight: '367px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Box
        sx={{
          //   display: 'flex',
          //   flexDirection: 'column',
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
            width: '100%',
            padding: theme.spacing(0, 2, 5, 2),
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // alignItems: 'flex-end',
          },
        }}
      >
        <Box
          sx={{
            background: 'transparent',
            display: 'flex',
            [theme.breakpoints.up('laptop')]: {
              flexDirection: 'row',
              justifyContent: 'space-between',
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
