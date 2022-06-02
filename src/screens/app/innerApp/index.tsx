import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTemplate, lightTemplate } from '@src/styles';
import { useRecoilValue } from 'recoil';
import { readTheme } from '@recoil/settings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InnerApp = (props: any) => {
  const { pageProps, Component } = props;
  const theme = useRecoilValue(readTheme);
  const muiTheme = React.useMemo(() => {
    if (theme === 'dark') {
      return createTheme(darkTemplate);
    }
    return createTheme(lightTemplate);
  }, [theme]);
  return (
    <ThemeProvider theme={muiTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ToastContainer position="top-center" autoClose={6000} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default InnerApp;
