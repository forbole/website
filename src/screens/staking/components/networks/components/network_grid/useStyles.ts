import { css, useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();

  return {
    grid: css({
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(5, 1fr)",
      [theme.breakpoints.up("tablet")]: {
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
      },
    }),
    root: css({
      "& .home__networks": {
        display: "grid",
        gridGap: theme.spacing(2),
        gridTemplateColumns: `repeat(auto-fit, minmax(${theme.spacing(
          15,
        )}, 1fr))`,
        justifyContent: "space-between",
        padding: theme.spacing(3, 0, 12, 0),
        [theme.breakpoints.up("laptop")]: {
          gridGap: theme.spacing(3),
          gridTemplateColumns: `repeat(5, minmax(${theme.spacing(15)}, 1fr))`,
          padding: theme.spacing(5, 0, 12, 0),
        },
      },
    }),
  };
};

export default useStyles;
