import type { ThemeOptions } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

import { lightThemeOverride } from "./light";

/** Common themes that don't change across light and dark theme */
const common: ThemeOptions = {
  breakpoints: {
    keys: ["mobile", "tablet", "laptop", "desktop"],
    values: {
      desktop: 1208,
      laptop: 1025,
      mobile: 375,
      tablet: 768,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        lineHeight: "normal",
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      "@media (min-width: 769px)": {
        fontSize: "64px",
      },
      "fontSize": "32px",
    },
  },
};

export const lightTemplate: ThemeOptions = deepmerge(
  lightThemeOverride,
  common,
);
