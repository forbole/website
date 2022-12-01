import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { darkThemeOverride } from './dark';
import { lightThemeOverride } from './light';

// interface CustomPalette extends Palette {
//   background: { default: string };
// }

// export interface CustomTheme extends Theme {
//   palette: CustomPalette;
// }

/** Common themes that don't change across light and dark theme */
export const common = {
  breakpoints: {
    keys: ['mobile', 'tablet', 'laptop', 'desktop'],
    values: {
      // mobile: 320,
      mobile: 280,
      tablet: 768,
      laptop: 1025,
      desktop: 1201,
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontSize: '32px',
      '@media (min-width: 769px)': {
        fontSize: '64px',
      },
    },
    button: {
      textTransform: 'none',
    },
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //       @font-face {
  //         font-family: chinese font;
  //         font-style: normal;
  //         font-weight: 400;
  //         src: url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff");
  //         unicodeRange: U+4E00–9FFF;
  //         letter-spacing: 0.2rem;
  //       }
  //     `,
  //   },
  // },
};

export const lightTemplate: ThemeOptions = deepmerge(
  lightThemeOverride,
  common
);

export const darkTemplate: ThemeOptions = deepmerge(darkThemeOverride, common);
