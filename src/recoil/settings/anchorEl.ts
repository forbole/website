import { atom } from "recoil";

import type { AnchorElState } from "./types";

const initialState: AnchorElState = null;

export const anchorElState = atom<AnchorElState>({
  key: "anchorEl",
  default: initialState,
});
