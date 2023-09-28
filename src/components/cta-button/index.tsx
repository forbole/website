import * as React from "react";
import { styled } from "@mui/material/styles";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
const ColorButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
  flexShrink: 0,
  borderRadius: "45px",
  color: "rgba(235, 238, 245, 1)",
  background: "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%)",
  whiteSpace: "nowrap",
  fontWeight: "590",
  // [theme.breakpoints.down("tablet")]: {
  //   height: "32px",
  //   fontSize: "14px",
  //   padding: " 0px 12px",
  //   borderRadius: "24px",
  // },
  // [theme.breakpoints.up("tablet")]: {
  height: "45px",
  fontSize: "16px",
  padding: " 0px 16px",
  // },
  "&:hover": {
    background:
      "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))",
    boxShadow:
      "0px 10px 32px -4px rgba(125, 92, 255, 0.1), 0px 6px 14px -6px rgba(126, 94, 255, 0.28)",
  },
  "&:disabled": {
    background: "#EBEEF5",
    color: "rgba(195, 204, 226, 1)",
    boxShadow:
      "0px 10px 32px -4px rgba(125, 92, 255, 0.1),0px 6px 14px -6px rgba(126, 94, 255, 0.28)",
  },
}));

export default function CtaButton(props: LoadingButtonProps) {
  return <ColorButton {...props}></ColorButton>;
}
