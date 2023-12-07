import type { Theme } from "@mui/material";
import type { SxProps } from "@mui/system";

export const styles = {
  tagCSS: {
    "& ul": {
      listStyleType: "none",
      display: "flex",
      flexWrap: "wrap",
    },
  },
  listCSS: (theme) => ({
    "display": "inline-block",
    "padding": theme.spacing(1, 2),
    "background": theme.palette.secondary.main,
    "borderRadius": theme.spacing(25),
    "margin": theme.spacing(0, 1, 1, 0),
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontWeight: 600,
      fontSize: theme.spacing(2),
    },
    "&:hover": {
      background: theme.palette.custom.forbole.purple,
    },
  }),
} satisfies { [index: string]: SxProps<Theme> };
