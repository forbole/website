import { PaletteMode } from '@mui/material';

// const backgroundDefault = '#252345';
// const backgroundDefault = 'rgba(30, 41, 67, 1)';
// const backgroundDefault = 'url(/images/assets/image_BG.png)';
// const backgroundDefault = 'transaprent';
const backgroundDefault = '#171A4B';

/** Custom theme overrides for dark mode */
export const darkThemeOverride = {
  palette: {
    mode: 'dark' as PaletteMode,
    type: 'dark' as PaletteMode,
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#4D2FC2',
    },
    text: {
      primary: '#000000',
    },
    background: {
      default: backgroundDefault,
    },
    custom: {
      background: {
        default: backgroundDefault,
      },
      forbole: {
        red: '#BD081C',
        indigo: '#362187',
        purple: '#6061E4',
        blue: '#202A43',
        indigo04: '#5047BA',
        indigo6: '#2A1A6A',
        grey02:'#C2C2C2',
        primary: '#000',
      },
    },
  },
};
