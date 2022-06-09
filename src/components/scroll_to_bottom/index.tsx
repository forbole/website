import React from 'react';
import { Box, useTheme } from '@mui/material';
import { BottomIcon } from '../icons';

const ScrollToBottom = ({ bottomRef }: any) => {
  const theme = useTheme();
  const scrollBottom = () => bottomRef.current.scrollIntoView();
  return (
    <Box
      display="flex"
      justifyContent="center"
      pt={theme.spacing(10)}
      sx={{
        cursor: 'pointer',
      }}
    >
      <BottomIcon onClick={scrollBottom} />
    </Box>
  );
};

export default ScrollToBottom;
