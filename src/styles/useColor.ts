import { useTheme } from '@mui/material';
import * as React from 'react';
export default function useColor() {
  const theme = useTheme();
    let colorObj=theme.palette.custom.forbole
  if (process.env.NODE_ENV !== 'production') {
    React.useDebugValue(colorObj);
  }

  return colorObj;
}