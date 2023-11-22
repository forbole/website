import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { readTheme } from "@recoil/settings";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilEnv, useRecoilValue } from "recoil";

import { darkTemplate, lightTemplate } from "@src/styles";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const InnerApp = (props: any) => {
  const { pageProps, Component } = props;
  const theme = useRecoilValue(readTheme);
  const muiTheme = useMemo(() => {
    if (theme === "dark") {
      return createTheme(darkTemplate);
    }

    return createTheme(lightTemplate);
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ToastContainer autoClose={6000} position="top-center" />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default InnerApp;
