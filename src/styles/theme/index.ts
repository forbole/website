import type { ThemeOptions } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

import { darkThemeOverride } from "./dark";
import { lightThemeOverride } from "./light";

/** Common themes that don't change across light and dark theme */
const common: ThemeOptions = {
  breakpoints: {
    keys: ["mobile", "tablet", "laptop", "desktop"],
    values: {
      mobile: 375,
      tablet: 768,
      laptop: 1025,
      desktop: 1208,
    },
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      "fontSize": "32px",
      "@media (min-width: 769px)": {
        fontSize: "64px",
      },
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        lineHeight: "normal",
      },
    },
  },
};

export const lightTemplate: ThemeOptions = deepmerge(
  lightThemeOverride,
  common,
);

export const darkTemplate: ThemeOptions = deepmerge(darkThemeOverride, common);
