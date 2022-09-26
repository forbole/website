import React from 'react';
import { Box, useTheme } from '@mui/material';
import { BottomIcon } from '../icons';

const ScrollToBottom = ({ bottomRef, staking }: any) => {
  const theme = useTheme();
  const scrollBottom = () => bottomRef.current.scrollIntoView();
  return (
    <Box
      display="flex"
      justifyContent="center"
      pt={theme.spacing(10)}
      sx={{
        cursor: 'pointer',
        '& svg': {
          '& path': {
            boxShadow: staking
              ? '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)'
              : 'none',
            stroke: staking ? theme.palette.custom.forbole.indigo6 : '#FFF',
          },
          '&:hover': {
            borderRadius: '50%',
            background: 'rgba(29, 30, 34, 0.3)',
          },
        },
      }}
    >
      <BottomIcon
        onClick={scrollBottom}
        fill={staking ? theme.palette.common.white : 'transparent'}
      />
    </Box>
  );
};

export default ScrollToBottom;
