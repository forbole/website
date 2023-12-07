import type { Theme } from "@mui/material";
import type { SxProps } from "@mui/system";

export const styles = {
  gridBox: (theme) => ({
    [theme.breakpoints.up("laptop")]: {
      display: "grid",
      gridTemplateColumns: "6fr 4fr",
      gridGap: 0,
    },
  }),
  iconBox: () => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#2A1A6A",
    boxShadow: "4px 8px 24px 0px rgba(116, 81, 255, 0.28)",
  }),
} satisfies { [index: string]: SxProps<Theme> };
