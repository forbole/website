import { alpha, useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();

  return {
    listItem: {
      "& .MuiListItemIcon-root": {
        "& .image": {
          alignItems: "center",
          border: "1px solid rgba(177, 177, 242, 0.3)",
          borderRadius: "100%",
          boxShadow:
            "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
          display: "flex",
          height: `${theme.spacing(4)} !important`,
          justifyContent: "center",
          margin: 0,
          padding: 0,
          width: `${theme.spacing(4)} !important`,
        },
        "flex": `0 0 ${theme.spacing(7)} !important`,
        "justifyContent": "center !important",
        "width": theme.spacing(7),
      },
      "& .MuiListItemText-root": {
        /* Neutral Color/Light Grey 01 */
        color: theme.palette.custom.forbole.indigo6,
        flex: `1 0 ${theme.spacing(3)} !important`,
        flexFlow: "row wrap !important",
        fontSize: theme.typography.body2.fontSize,
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: 1.42,
        padding: "0 !important",
      },
      "alignItems": "center !important",
      "cursor": "pointer !important",
      "display": "flex !important",
      "flexFlow": "row nowrap !important",
      "height": `${theme.spacing(7)} !important`,
      "justifyContent": "space-between !important",
      "padding": `0 !important`,
    },
    paper: {
      backdropFilter: "blur(24px)",
      /* Secondary Color/Royal Blue Transparent 04 */
      backgroundColor: alpha(theme.palette.primary.main, 0.9),
      borderRadius: theme.spacing(1.5),
      margin: theme.spacing(2, 0),
    },
    popper: {
      "& .MuiAutocomplete-listbox": {
        maxHeight: `calc(50vh - ${theme.spacing(10)})`,
        [theme.breakpoints.up("tablet")]: {
          maxHeight: "70vh",
        },
      },
      "& .MuiAutocomplete-noOptions": {
        color: "#1D1E22",
      },
      "& .MuiPaper-root": {
        boxShadow:
          "0px 6px 14px -6px rgb(2 38 225 / 12%), 0px 10px 32px -4px rgb(2 38 225 / 10%)",
      },
      [theme.breakpoints.down("tablet")]: {
        backdropFilter: "blur(16px)",
        backgroundColor:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%) !important",
        bottom: "0 !important",
        /* Shadow/Secondary (Validator)/Drop Shadow 02 */
        boxShadow:
          "0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)",
        left: "0 !important",
        padding: `${theme.spacing(0, 4)} !important`,
        position: "fixed !important",
        right: "0 !important",
        top: `${theme.spacing(8)} !important`,
        transform: "none !important",
        width: "100% !important",
      },
      "zIndex": "2001 !important",
    },
    textField: {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  };
};

export default useStyles;
