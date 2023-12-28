import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

const FormInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    "&:focus": {
      borderColor: theme.palette.custom.forbole.indigo,
    },
    "backgroundColor": theme.palette.mode === "light" ? "#FFF" : "#1A2027",
    "border": "2px solid",
    "borderColor": theme.palette.mode === "light" ? "#fff" : "#2D3843",
    "borderRadius": "8px",
    "display": "block",
    // Use the system font instead of the default Roboto font.
    "fontFamily": [
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
    "fontSize": "16px",
    "marginTop": theme.spacing(2),
    "padding": "12px 16px",
    "position": "relative",
    "transition": theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "width": "calc( 100% - 36px)",
  },
  "& .MuiInputBase-input:placeholder": {
    color: "#878787",
  },
  "borderRadius": "8px",

  "boxShadow": "4px 8px 24px 0px rgba(116, 81, 255, 0.28)",
  "display": "block",
}));

export default FormInput;
