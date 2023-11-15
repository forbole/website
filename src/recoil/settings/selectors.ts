import { selector } from "recoil";

import { atomState } from "./atom";
import type { Theme } from "./types";

const getTheme = ({ get }: any): Theme => {
  const state = get(atomState);
  return state.theme;
};

export const readTheme = selector({
  key: "settings.read.theme",
  get: getTheme,
});
