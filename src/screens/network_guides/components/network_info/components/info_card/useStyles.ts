import { css, useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();

  return {
    root: css({
      "& .MuiTypography-h3": {
        /* Secondary Color/Gradient/Validator/FB Validator Gradient 04 */
        background: "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
        backgroundClip: "text",
        fontSize: theme.spacing(3),
        fontWeight: 700,
        letterSpacing: "0.0015em",
        lineHeight: "29px",
        paddingTop: theme.spacing(2),
        /* identical to box height */
        textAlign: "center",
        textFillColor: "transparent",
      },
      "alignItems": "center",
      "background": theme.palette.common.white,
      "borderRadius": theme.spacing(3),
      "boxShadow":
        "0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)",
      "display": "flex",
      "flexDirection": "column",
      "padding": theme.spacing(4, 3),
    }),
  };
};

export default useStyles;
