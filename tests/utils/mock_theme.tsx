import React from 'react';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material';

import { darkTemplate } from '@styles';

/**
 * Theme mocker to handle custom keys
 */
const MockTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(darkTemplate)}>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MockTheme;
