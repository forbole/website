import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { readTheme } from "@recoil/settings";
import { darkTemplate, lightTemplate } from "@src/styles";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilEnv, useRecoilValue } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const InnerApp = (props: any) => {
  const { pageProps, Component } = props;
  const theme = useRecoilValue(readTheme);
  const muiTheme = React.useMemo(() => {
    if (theme === "dark") {
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
