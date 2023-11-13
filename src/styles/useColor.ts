import { useTheme } from "@mui/material";
import { useDebugValue } from "react";

export default function useColor() {
  const theme = useTheme();
  const colorObj = theme.palette.custom.forbole;
  if (process.env.NODE_ENV !== "production") {
    useDebugValue(colorObj);
  }

  return colorObj;
}
