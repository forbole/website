import { selector } from "recoil";
import { mergeStateChange } from "@utils/merge_state_change";
import { THEME_KEY, setItem } from "@utils/localStorage";
import { atomState } from "./atom";
import { Theme } from "./types";

const getTheme = ({ get }: any): Theme => {
  const state = get(atomState);
  return state.theme;
};

export const writeTheme = selector({
  key: "settings.write.theme",
  get: getTheme,
  set: ({ get, set }, newTheme: any) => {
    setItem(THEME_KEY, newTheme);
    const prevState = get(atomState);
    const newState = mergeStateChange(prevState, {
      theme: newTheme,
    });
    set(atomState, newState);
  },
});

export const readTheme = selector({
  key: "settings.read.theme",
  get: getTheme,
});
