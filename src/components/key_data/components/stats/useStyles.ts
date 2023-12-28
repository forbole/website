import { css, useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();

  return {
    grid: css({
      display: "grid",
      gridGap: theme.spacing(2),
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(3, 1fr)",
      [theme.breakpoints.up("laptop")]: {
        gridGap: theme.spacing(3),
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(1, 1fr)",
      },
    }),
  };
};

export default useStyles;
