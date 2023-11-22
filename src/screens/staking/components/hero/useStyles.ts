import { css, useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();

  return {
    root: css({
      padding: theme.spacing(5, 3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
    stats: css({
      paddingTop: theme.spacing(5),
      [theme.breakpoints.up("laptop")]: {
        paddingTop: 0,
      },
    }),
  };
};

export default useStyles;
