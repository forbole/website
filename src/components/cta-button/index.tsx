import type { LoadingButtonProps } from "@mui/lab";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

const ColorButton = styled(LoadingButton)<LoadingButtonProps>(() => ({
  "&:disabled": {
    background: "#EBEEF5",
    boxShadow:
      "0px 10px 32px -4px rgba(125, 92, 255, 0.1),0px 6px 14px -6px rgba(126, 94, 255, 0.28)",
    color: "rgba(195, 204, 226, 1)",
  },
  "&:hover": {
    background:
      "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))",
    boxShadow:
      "0px 10px 32px -4px rgba(125, 92, 255, 0.1), 0px 6px 14px -6px rgba(126, 94, 255, 0.28)",
    transform: "scale(1.02)",
  },
  "background": "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%)",
  "borderRadius": "45px",
  "color": "rgba(235, 238, 245, 1)",
  "flexShrink": 0,
  "fontSize": "16px",
  "fontWeight": "590",
  "height": "45px",
  "padding": " 0px 16px",
  "transition": "transform 0.2s ease-in-out",
  "whiteSpace": "nowrap",
}));

export default function CtaButton(props: LoadingButtonProps) {
  return <ColorButton {...props} />;
}
