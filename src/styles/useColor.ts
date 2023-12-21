import { useTheme } from "@mui/material";
import { useDebugValue } from "react";

export default function useColor() {
  const theme = useTheme();
  const colorObj = theme.palette.custom.forbole;

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDebugValue(colorObj);
  }

  return colorObj;
}
