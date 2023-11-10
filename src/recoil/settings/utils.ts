import { darkTemplate, lightTemplate } from "@styles/index";

import { Theme } from "./types";

// ================================
// CONSTANTS
// ================================

export const THEME_LIST: Theme[] = ["light", "dark"];

export const THEME_DICTIONARY = {
  light: lightTemplate,
  dark: darkTemplate,
};
