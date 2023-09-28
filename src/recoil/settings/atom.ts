import { atom } from "recoil";
import { AtomState } from "./types";

const initialState: AtomState = {
  theme: "light",
};

export const atomState = atom<AtomState>({
  key: "settings",
  default: initialState,
});

export const navigationId = atom<null | number>({
  key: "navigation",
  default: null,
});
