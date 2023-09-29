import { PaletteMode } from "@mui/material";

const backgroundDefault = "#FFFFFF";
// const backgroundDefault = 'rgba(30, 41, 67, 1)';

/** Custom theme overrides for dark mode */
export const lightThemeOverride = {
  palette: {
    mode: "light" as PaletteMode,
    type: "light" as PaletteMode,
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#4D2FC2",
    },
    text: {
      primary: "#000000",
    },
    background: {
      default: backgroundDefault,
    },
    custom: {
      background: {
        default: backgroundDefault,
      },
      forbole: {
        red: "#BD081C",
        indigo: "#362187",
        purple: "#6061E4",
        blue: "#202A43",
        indigo04: "#5047BA",
        indigo6: "#2A1A6A",
        grey02: "#C2C2C2",
        primary: "#FFFFFF",
      },
    },
  },
};
