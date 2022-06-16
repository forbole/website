/* eslint-disable react/require-default-props */
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { TopIcon } from '../icons';

interface TopProps {
  topRef: any;
  mobile?: boolean;
  height?: string;
}

const ScrollToTop = ({ topRef, mobile, height }: TopProps) => {
  const theme = useTheme();
  const scrollTop = () => topRef.current.scrollIntoView();
  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={theme.spacing(10)}
      height={height}
      zIndex={2}
      sx={{
        [theme.breakpoints.down('laptop')]: {
          display: mobile ? 'flex' : 'none',
        },
      }}
    >
      <Box
        height="max-content"
        sx={{
          cursor: 'pointer',
        }}
      >
        <TopIcon
          fill={mobile ? theme.palette.custom.forbole.indigo : 'transparent'}
          onClick={scrollTop}
        />
      </Box>
    </Box>
  );
};

export default ScrollToTop;