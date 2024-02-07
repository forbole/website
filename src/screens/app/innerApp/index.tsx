import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { lightTemplate } from "@src/styles";
import * as commonStyles from "@src/styles/common.module.scss";

const InnerApp = ({ Component, pageProps }: any) => {
  const muiTheme = createTheme(lightTemplate);

  return (
    <ThemeProvider theme={muiTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ToastContainer
        autoClose={6000}
        className={commonStyles.notification}
        closeOnClick
        position="top-center"
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default InnerApp;
