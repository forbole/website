import { lightTemplate, darkTemplate } from '@styles/index';
import { Theme } from './types';

// ================================
// CONSTANTS
// ================================

export const THEME_LIST: Theme[] = ['light', 'dark'];

export const THEME_DICTIONARY = {
  light: lightTemplate,
  dark: darkTemplate,
};

// export const getThemeTemplate = (theme: keyof Theme) => {
//   if (THEME_DICTIONARY[theme]) {
//     return THEME_DICTIONARY[theme];
//   }
//   return lightTemplate;
// };
