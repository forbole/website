import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";

export const anchorElContext = createContext<{
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => unknown;
}>({ anchorEl: null, setAnchorEl: () => undefined });
const { Provider } = anchorElContext;

export const AnchorElContextProvider = ({ children }: PropsWithChildren) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return <Provider value={{ anchorEl, setAnchorEl }}>{children}</Provider>;
};
