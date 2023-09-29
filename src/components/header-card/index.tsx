import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useWindowDimensions } from "@src/hooks";
import Image from "next/image";

type Props = {
  title: string;
  desc_1st: string;
  desc_2nd?: string;
  head_bg: string;
};

export default function HeaderCard({
  head_bg,
  title,
  desc_1st,
  desc_2nd,
}: Props) {
  const theme = useTheme();
  const { isMobile, isDesktop } = useWindowDimensions();

  return (
    <Stack
      spacing={3}
      sx={{
        bgcolor: "#ffffff",
        alignItems: "center",
        pt: "40px",
        gap: "24px",
        color: "#202A43",
        borderRadius: "24px",
        boxShadow:
          " 0px 14px 64px -4px rgba(2, 38, 225, 0.12), 0px 8px 22px -6px rgba(2, 38, 225, 0.12)",
        overflow: "hidden",
        [theme.breakpoints.down("laptop")]: {
          mt: "103px",
          fontSize: "24px",
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.up("laptop")]: {
          mt: "164px",
          fontSize: "64px",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: "center",
          px: "24px",
        }}
      >
        {title && (
          <Typography
            sx={{
              [theme.breakpoints.down("laptop")]: {
                fontWeight: 590,
                fontSize: "16px",
              },
              [theme.breakpoints.up("laptop")]: {
                fontWeight: 700,
                fontSize: "24px",
              },
            }}
          >
            {title}
          </Typography>
        )}
        {desc_1st && (
          <Typography
            sx={{
              [theme.breakpoints.down("laptop")]: {
                fontWeight: 700,
                fontSize: "24px",
              },
              [theme.breakpoints.up("laptop")]: {
                fontWeight: 590,
                fontSize: "40px",
                width: "900px",
              },
            }}
          >
            {desc_1st}
          </Typography>
        )}
        {desc_2nd && (
          <Typography
            sx={{
              fontWeight: 400,
              [theme.breakpoints.down("laptop")]: {
                fontSize: "16px",
              },
              [theme.breakpoints.up("laptop")]: {
                fontSize: "24px",
              },
            }}
          >
            {desc_2nd}
          </Typography>
        )}
      </Stack>
      <Box
        sx={{
          position: "relative",
          height: "338px",
          width: "100%",
          [theme.breakpoints.down("laptop")]: {
            height: "338px",
          },
          [theme.breakpoints.up("laptop")]: {
            height: "546px",
          },
        }}
      >
        {head_bg && (
          <Image
            src={head_bg}
            alt=""
            objectFit="cover"
            layout="fill"
            priority
          />
        )}
      </Box>
    </Stack>
  );
}
