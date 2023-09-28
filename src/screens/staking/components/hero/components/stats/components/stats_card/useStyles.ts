import { css, useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();

  return {
    root: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(4, 3),
      background: theme.palette.common.white,
      boxShadow:
        "0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)",
      borderRadius: theme.spacing(3),
      "& .MuiTypography-h3": {
        paddingTop: theme.spacing(2),
        fontWeight: 700,
        fontSize: theme.spacing(3),
        lineHeight: "29px",
        /* identical to box height */
        textAlign: "center",
        letterSpacing: "0.0015em",
        /* Secondary Color/Gradient/Validator/FB Validator Gradient 04 */
        background: "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
        backgroundClip: "text",
        textFillColor: "transparent",
      },
    }),
  };
};

export default useStyles;
