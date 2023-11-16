import { atom } from "recoil";

import type { AtomState } from "./types";

const initialState: AtomState = {
  theme: "light",
};

export const atomState = atom<AtomState>({
  key: "settings",
  default: initialState,
});
