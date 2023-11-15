import type { Theme } from "@mui/material";
import type { SxProps } from "@mui/system";

export const styles: { [index: string]: SxProps<Theme> } = {
  flexBox: (theme) => ({
    [theme.breakpoints.up("laptop")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }),
  sideCSS: (theme) => ({
    [theme.breakpoints.up("laptop")]: {
      width: "30%",
      minWidth: "300px",
      marginLeft: theme.spacing(4.25),
    },
  }),
};
