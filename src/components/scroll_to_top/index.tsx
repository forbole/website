import React from 'react';
import { Box, useTheme } from '@mui/material';
import { TopIcon } from '../icons';

interface TopProps {
  topRef: any;
  // eslint-disable-next-line react/require-default-props
  mobile?: boolean;
}

const ScrollToTop = ({ topRef, mobile }: TopProps) => {
  const theme = useTheme();
  const scrollTop = () => topRef.current.scrollIntoView();
  return (
    <Box
      display="flex"
      justifyContent="center"
      pt={theme.spacing(10)}
      sx={{
        cursor: 'pointer',
      }}
    >
      <TopIcon
        fill={mobile ? theme.palette.custom.forbole.indigo : 'transparent'}
        onClick={scrollTop}
      />
    </Box>
  );
};

export default ScrollToTop;
