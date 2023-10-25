import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

const FormInput = styled(InputBase)(({ theme }) => ({
  display: "block",
  boxShadow: "4px 8px 24px 0px rgba(116, 81, 255, 0.28)",
  borderRadius: "8px",

  "& .MuiInputBase-input:placeholder": {
    color: "#878787",
  },
  "& .MuiInputBase-input": {
    display: "block",
    width: "calc( 100% - 36px)",
    marginTop: theme.spacing(2),
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#1A2027",
    border: "2px solid",
    borderColor: theme.palette.mode === "light" ? "#fff" : "#2D3843",
    borderRadius: "8px",
    fontSize: "16px",
    padding: "12px 16px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.custom.forbole.indigo,
    },
  },
}));
export default FormInput;
