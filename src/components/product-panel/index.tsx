import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

type Props = {
  title?: string;
  imageHref: string;
  children?: React.ReactNode;
  index: number;
  value: number;
  imgFull?: boolean;
};

const productPanel = React.forwardRef<HTMLDivElement, Props>(
  ({ title, imageHref, children, index, value, imgFull }, ref) => {
    const theme = useTheme();
    if (index != value) {
      return <></>;
    }
    return (
      <Box
        component="div"
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          borderRadius: "40px",
          background:
            "linear-gradient(179deg, #FFF 0%, rgba(255, 255, 255, 0.50) 34.90%, #FFF 100%)",
          boxShadow: "4px 8px 24px 0px rgba(116, 81, 255, 0.16)",
          [theme.breakpoints.down("laptop")]: {
            padding: "32px 24px",
          },
          [theme.breakpoints.up("laptop")]: {
            padding: "64px",
          },
        }}
      >
        {title && (
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#202A43",
            }}
          >
            {title}
          </Typography>
        )}
        <Stack
          direction="row"
          sx={{
            gap: imgFull ? theme.spacing(4) : theme.spacing(7),
            [theme.breakpoints.down("tablet")]: {
              flexDirection: "column",
            },
            [theme.breakpoints.up("tablet")]: {
              flexDirection: "row",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "420px",
              height: "max-content",
              m: "16px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow:
                "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
              "& img": {
                display: "block",
                width: "100%",
              },
              [theme.breakpoints.down("tablet")]: {
                m: "8px",
                width: "auto",
                mx: imgFull ? "-24px" : "",
                boxShadow: imgFull ? "0" : "",
              },
            }}
          >
            <img src={imageHref} alt="" loading="lazy" />
          </Box>
          <Stack
            sx={{
              gap: theme.spacing(4),
              textAlign: "left",
              alignItems: "flex-start",
            }}
          >
            {children}
          </Stack>
        </Stack>
      </Box>
    );
  },
);

export default productPanel;
