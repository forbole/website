import type { PaletteMode } from "@mui/material";

const backgroundDefault = "#FFFFFF";

/** Custom theme overrides for dark mode */
export const lightThemeOverride = {
  palette: {
    background: {
      default: backgroundDefault,
    },
    custom: {
      background: {
        default: backgroundDefault,
      },
      forbole: {
        blue: "#202A43",
        grey02: "#C2C2C2",
        indigo: "#362187",
        indigo04: "#5047BA",
        indigo6: "#2A1A6A",
        primary: "#FFFFFF",
        purple: "#6061E4",
        red: "#BD081C",
      },
    },
    mode: "light" as PaletteMode,
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#4D2FC2",
    },
    text: {
      primary: "#000000",
    },
    type: "light" as PaletteMode,
  },
};
