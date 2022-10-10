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
  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();
    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop - 100,
      behavior: 'smooth',
    });
  };
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
          '& svg': {
            '& path': {
              stroke:
                theme.palette.mode === 'dark'
                  ? '#fff'
                  : 'rgba(29, 30, 34, 0.3)',
            },
            '&:hover': {
              borderRadius: '50%',
              background: 'rgba(29, 30, 34, 0.3)',
            },
          },
        }}
      >
        <TopIcon
          fill={mobile ? theme.palette.custom.forbole.indigo : 'transparent'}
          onClick={(e: React.MouseEvent<HTMLElement>) => scrollToRef(e, topRef)}
        />
      </Box>
    </Box>
  );
};

export default ScrollToTop;
