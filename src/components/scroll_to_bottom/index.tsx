import React from "react";
import { Box, useTheme } from "@mui/material";
import { BottomIcon } from "../icons";

const ScrollToBottom = ({ bottomRef, staking }: any) => {
  const theme = useTheme();
  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();
    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop-100,
      behavior: "smooth",
    });
  };
  
  return (
    <Box
      position='relative'
      alignSelf="center"
      zIndex={2}
      sx={{
        m: "28px",
        mb: "24px",
        width: "48px",
        height: "48px",
        borderRadius:'48px',
        boxShadow: '0px 10px 32px -4px rgba(125, 92, 255, 0.10), 0px 6px 14px -6px rgba(126, 94, 255, 0.28)',
        filter:
          "drop-shadow(0px 14px 64px rgba(2, 38, 225, 0.12)) drop-shadow(0px 8px 22px rgba(2, 38, 225, 0.12))",
        [theme.breakpoints.down("laptop")]: {
          m: "6px",
          width: "36px",
          height: "36px",
          mb: "24px",
        },
        cursor: "pointer",
        "& svg": {
          transition: "all 0.3s",
         
          fill: " #FFF",
          "& path": {
            stroke: theme.palette.custom.forbole.blue,
          },
          "&:hover": {
            fill: "rgba(241, 243, 248)",
          },
          
        },
      }}
    >
      <BottomIcon
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          scrollToRef(e, bottomRef)
        }
      />
    </Box>
  );
};

export default ScrollToBottom;
