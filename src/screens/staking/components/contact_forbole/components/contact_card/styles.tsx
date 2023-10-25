import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

export const styles: { [index: string]: SxProps<Theme> } = {
  nameBox: (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    color: theme.palette.custom.forbole.indigo6,
    [theme.breakpoints.up("laptop")]: {
      gridColumn: "1 / span 3",
      gridRow: "1 / span 1",
    },
  }),
  mailBox: (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    color: theme.palette.custom.forbole.indigo6,
    [theme.breakpoints.up("laptop")]: {
      gridColumn: "4 / span 3",
      gridRow: "1 / span 1",
    },
  }),
  inputField: (theme) => ({
    "> .MuiOutlinedInput-root": {
      boxShadow:
        "0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)",
      borderRadius: theme.spacing(1),
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      borderColor: "transparent",
    },
    "& :-webkit-autofill": {
      transitionDelay: "9999s",
      WebkitTextFillColor: theme.palette.common.black,
    },
  }),
  select: (theme) => ({
    ".MuiFormControl-root": {
      width: "100%",
      boxShadow:
        "0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)",
      borderRadius: theme.spacing(1),
    },
    ".MuiFormLabel-root": {
      color: "#878787",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      borderColor: "transparent",
    },
    [theme.breakpoints.up("laptop")]: {
      gridColumn: "1 / span 5",
      gridRow: "2 / span 1",
    },
  }),
  paper: (theme) => ({
    backgroundColor: theme.palette.primary.main,
  }),
  buttonDiv: (theme) => ({
    padding: theme.spacing(3, 0, 0, 0),
    [theme.breakpoints.up("laptop")]: {
      gridColumn: "6 / span 1",
      gridRow: "2 / span 1",
      justifyContent: "flex-end",
    },
  }),
  button: (theme) => ({
    background: "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
    boxShadow:
      "0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1.25, 2),
    fontSize: theme.spacing(1.875),
    lineHeight: 1.5,
    [theme.breakpoints.up("laptop")]: {
      width: "125px",
    },
  }),
};
