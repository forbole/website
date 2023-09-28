/* eslint-disable react/require-default-props */
import React from "react";
import { Box, useTheme } from "@mui/material";
import { TopIcon } from "../icons";

interface TopProps {
  topRef: any;
  mobile?: boolean;
  height?: string;
}

const ScrollToTop = ({ topRef }: TopProps) => {
  const theme = useTheme();
  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();
    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };
  return (
    <Box position="relative" alignSelf="center" zIndex={2}>
      <Box
        sx={{
          my: "60px",
          mx: "auto",
          width: "48px",
          height: "48px",
          [theme.breakpoints.down("laptop")]: {
            my: "24px",
            width: "36px",
            height: "36px",
          },
          cursor: "pointer",
          "& svg": {
            filter:
              "drop-shadow(0px 14px 64px rgba(2, 38, 225, 0.12)) drop-shadow(0px 8px 22px rgba(2, 38, 225, 0.12))",
            fill: " #FFF",
            transition: "all 0.3s",
            "& :last-child": {
              stroke: theme.palette.custom.forbole.blue,
            },
            "&:hover ": {
              fill: "rgba(241, 243, 248)",
            },
          },
        }}
      >
        <TopIcon
          onClick={(e: React.MouseEvent<HTMLElement>) => scrollToRef(e, topRef)}
        />
      </Box>
    </Box>
  );
};

export default ScrollToTop;
