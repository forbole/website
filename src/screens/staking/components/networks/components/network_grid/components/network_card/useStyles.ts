import { alpha, css, useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();

  return {
    root: css({
      "backgroundColor": alpha(theme.palette.common.white, 0.6),

      "& .MuiLinearProgress-root": {
        width: "100%",
      },
      "& .MuiTypography-h3, & .MuiTypography-h6, & .MuiTypography-body1": {
        whiteSpace: "nowrap",
      },
      "& .networkbox__explore-btn": {
        "padding": "0.75rem 1rem",
        "borderRadius": "200px",
        /* Primary Color/BD Red Gradient 02 */
        "backgroundColor": "#F6504B",
        "backgroundImage":
          "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
        /* Neutral Color/White */
        "color": "#FFFFFF",
        "width": "111px",
        "height": "45px",
        "&:hover": {
          filter: "brightness(1.2)",
        },
        // additional style:
        "fontSize": theme.typography.body1.fontSize,
      },
      "& .networkbox__close-btn": {
        position: "absolute",
        right: theme.spacing(2),
        marginTop: `-${theme.spacing(1)}`,
        [theme.breakpoints.up("tablet")]: {
          display: "none",
        },
      },
      "& .networkbox__mobile-anchor": {
        "display": "flex",
        "position": "static",
        "gap": theme.spacing(3),
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
        [theme.breakpoints.up("tablet")]: {
          display: "none",
        },
      },
      "& .networkbox__mobile-popover-contaier": {
        "display": "block",
        "alignSelf": "flex-start",
        [theme.breakpoints.up("tablet")]: {
          display: "none",
        },
        "&.networkbox__active .networkbox__popover": {
          display: "flex !important",
        },
        "& .networkbox__popover": {
          left: theme.spacing(3),
          right: theme.spacing(3),
        },
        "& .MuiTypography-h3": {
          fontSize: theme.spacing(2),
          color: theme.palette.custom.forbole.indigo6,
        },
        "& .MuiTypography-h6, & .MuiTypography-body1": {
          fontSize: theme.spacing(2),
          color: theme.palette.custom.forbole.indigo6,
        },
      },
      "& .networkbox__popover": {
        "& > .MuiBox-root:nth-of-type(2)": {
          "display": "flex",
          "flexFlow": "column nowrap",
          "justifyContent": "space-between",
          "gap": theme.spacing(1),
          "width": "100%",
          "& > .MuiBox-root": {
            "display": "flex",
            "flexFlow": "row nowrap",
            "justifyContent": "space-between",
            "gap": theme.spacing(3),
            "alignItems": "center",
            "& > .MuiBox-root": {
              flex: "1 0 auto",
            },
          },
        },
      },
    }),
  };
};

export default useStyles;
