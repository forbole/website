import { css, useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();

  return {
    grid: css({
      display: "grid",
      gridTemplateRows: "repeat(5, 1fr)",
      gridTemplateColumns: "repeat(2, 1fr)",
      [theme.breakpoints.up("tablet")]: {
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateColumns: "repeat(5, 1fr)",
      },
    }),
    root: css({
      "& .home__networks": {
        padding: theme.spacing(3, 0, 12, 0),
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${theme.spacing(
          15,
        )}, 1fr))`,
        justifyContent: "space-between",
        gridGap: theme.spacing(2),
        [theme.breakpoints.up("laptop")]: {
          gridTemplateColumns: `repeat(5, minmax(${theme.spacing(15)}, 1fr))`,
          padding: theme.spacing(5, 0, 12, 0),
          gridGap: theme.spacing(3),
        },
      },
    }),
  };
};

export default useStyles;
