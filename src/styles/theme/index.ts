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
      laptop: 1024,
      desktop: 1201,
    },
  },
  typography: {
    fontFamily: 'SF Pro',
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
};

export const lightTemplate: ThemeOptions = deepmerge(
  lightThemeOverride,
  common
);

export const darkTemplate: ThemeOptions = deepmerge(darkThemeOverride, common);
