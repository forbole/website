import type { Theme } from "@mui/material";
import type { SxProps } from "@mui/system";

export const styles = {
  amountResult: () => ({
    display: "flex",
    flexDirection: "column",
  }),
  button: (theme) => ({
    background: "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
    borderRadius: theme.spacing(3),
    boxShadow:
      "0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)",
    fontSize: theme.spacing(2),
    padding: theme.spacing(1.25, 2),
  }),
  buttonDiv: (theme) => ({
    display: "flex",
    justifyContent: "center",
    paddingTop: 3,
    [theme.breakpoints.up("laptop")]: {
      justifyContent: "flex-end",
      paddingTop: 4,
    },
    width: "100%",
  }),
  card: (theme) => ({
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(1),
    boxShadow:
      "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.up("laptop")]: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    width: "100%",
  }),
  innerText: (theme) => ({
    color: theme.palette.custom.forbole.blue,
    fontSize: theme.spacing(2),
    fontWeight: 600,
    padding: theme.spacing(4, 0, 1, 0),
  }),
  input: (theme) => ({
    ".MuiFormLabel-root": {
      color: "#878787",
    },
    ".MuiOutlinedInput-root": {
      background: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      boxShadow:
        "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
      width: "100%",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      borderColor: "transparent",
    },
  }),
  inputBase: (theme) => ({
    "> input": {
      padding: theme.spacing(0.5, 0, 0.5, 1.5),
      width: "fit-content",
    },
    "background": theme.palette.primary.main,
    "borderRadius": theme.spacing(1),
    "boxShadow":
      "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
    "display": "flex",
    "height": theme.spacing(7),
    "justifyContent": "flex-end",
    "paddingRight": 1,
  }),
  network: (theme) => ({
    "& .image": {
      borderRadius: "100%",
      boxShadow:
        "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
      height: `${theme.spacing(6.5)} !important`,
      width: `${theme.spacing(6.5)} !important`,
    },
    "alignContent": "center",
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "flex-start",
  }),
  networkInfo: (theme) => ({
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: theme.spacing(2),
  }),
  select: (theme) => ({
    ".MuiFormControl-root": {
      borderRadius: theme.spacing(1),
      boxShadow:
        "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
      width: "100%",
    },
    ".MuiFormLabel-root": {
      color: "#878787",
    },
    ".MuiOutlinedInput-root": {
      ".MuiSelect-select": {
        "> .MuiBox-root": {
          "> span": {
            borderRadius: "50%",
            boxShadow:
              "0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)",
          },
        },
      },
      "> .MuiSvgIcon-root": {
        fill: "#878787",
      },
      "background": theme.palette.primary.main,
      "borderRadius": theme.spacing(1),
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      borderColor: "transparent",
    },
    "& .MuiSelect-icon": {
      margin: theme.spacing(0.5, 2.5, 0, 0),
    },
    [theme.breakpoints.up("laptop")]: {},
  }),
  slider: (theme) => ({
    "& .MuiSlider-rail": {
      color: "#76819B",
      height: 2.5,
    },
    "& .MuiSlider-thumb": {
      "&:focus, &:hover, &.Mui-active": {
        "@media (hover: none)": {
          boxShadow:
            "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
        },
        "boxShadow": "none",
      },
      "background": "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
      "border":
        "2px solid linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
      "boxShadow": "none",
      "height": theme.spacing(2.25),
      "width": theme.spacing(2.25),
    },
    "& .MuiSlider-track": {
      background: "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
      height: 2.5,
    },
  }),
  textBase: (theme) => ({
    color: theme.palette.custom.forbole.blue,
    fontSize: theme.spacing(2),
    fontWeight: 600,
  }),
  tokenResult: (theme) => ({
    "& .image": {
      borderRadius: "100%",
      boxShadow:
        "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
      height: `${theme.spacing(3.5)} !important`,
      width: `${theme.spacing(3.5)} !important`,
    },
    "alignItems": "center",
    "display": "flex",
    "paddingBottom": theme.spacing(2),
    [theme.breakpoints.up("laptop")]: {
      paddingBottom: 0,
    },
  }),
  wrapper: (theme) => ({
    background:
      "linear-gradient(269.66deg, rgba(2, 158, 225, 0.4) -12.39%, rgba(2, 38, 225, 0.2) 99.38%), rgba(255, 255, 255, 0.8)",
    borderRadius: theme.spacing(3),
    boxShadow:
      "10px 8px 12px -6px rgba(2, 38, 225, 0.08), 18px 14px 24px -4px rgba(2, 38, 225, 0.04), inset 6px 6px 6px rgba(255, 255, 255, 0.2)",
    padding: theme.spacing(4, 2.5),
    [theme.breakpoints.up("laptop")]: {
      padding: theme.spacing(5),
    },
  }),
} satisfies { [index: string]: SxProps<Theme> };
