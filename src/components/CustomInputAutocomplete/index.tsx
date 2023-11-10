import { Box, useTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
  options: any;
  label: string;
  onChange: (even: any, label: any) => void;
};

export default function CustomInputAutocomplete({
  options,
  label,
  onChange,
}: Props) {
  const theme = useTheme();
  return (
    <Autocomplete
      disablePortal
      id="custom-input-demo"
      onChange={onChange}
      options={options}
      renderInput={(params) => (
        <Box
          ref={params.InputProps.ref}
          sx={{
            "display": "block",
            "position": "relative",
            "& input:focus": {
              outlineColor: theme.palette.custom.forbole.indigo,
            },
            "& input:placeholder": {
              color: "#878787",
              fontSize: "16px",
            },
            "&:after": {
              content: "url(/icons/Vector.png)",
              position: "absolute",
              right: "10px",
              top: "14px",
              transition: "transform 0.3s",
            },
            "&:focus-within:after": {
              transform: "rotate(-180deg)",
            },
            "& input": {
              display: "block",
              width: "100%",
              position: "relative",
              backgroundColor:
                theme.palette.mode === "light" ? "#FFF" : "#1A2027",
              border: "2px solid ",
              borderColor: theme.palette.mode === "light" ? "#fff" : "#2D3843",
              borderRadius: "8px",
              boxShadow: "4px 8px 24px 0px rgba(116, 81, 255, 0.28)",
              fontSize: "16px",
              padding: "13px 16px",
              transition: theme.transitions.create([
                "border-color",
                "background-color",
                "box-shadow",
              ]),
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
            },
          }}
        >
          <input
            type="text"
            {...params.inputProps}
            name="11"
            placeholder={label}
          />
        </Box>
      )}
      sx={{
        display: "block",
      }}
    />
  );
}
