import { css } from "@mui/material";

const useStyles = () => ({
  word: css({
    "fontSize": "14px",
    "fontStyle": "normal",
    "fontWeight": "590",
    "lineHeight": "20px",
    "letterSpacing": "0.336px",
    "textDecoration": "none",
    "color": "inherit",
    "padding": "4px 8px",
    "&:hover": {
      background: "rgba(0,0,0,0.2)",
      borderRadius: "24px",
    },
  }),
});

export default useStyles;
