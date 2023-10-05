import React from "react";
import Box from "@mui/material/Box";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import CtaButton from "../cta-button";

type Props = {
  title?: string;
  desc?: string;
  imageHref: StaticImageData | string;
  btn_Click?: () => void;
  btnName?: string;
  disabled?: boolean;
  img_not_response?: boolean;
};
const IntroPanel = (props: Props) => {
  const {
    title,
    desc,
    imageHref,
    btn_Click,
    btnName,
    img_not_response,
    disabled,
  } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(500));
  return (
    <Stack
      component="div"
      justifyContent="space-between"
      minHeight="100%"
      bgcolor="white"
      borderRadius="24px"
      boxShadow="0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12);"
      color="black"
      overflow="hidden"
      gap="8px"
    >
      <Box p="24px">
        <Stack
          direction="row"
          justifyContent="space-between"
          mb="12px"
          alignItems="center"
        >
          <Typography
            sx={{
              fontWeight: "590",
              pr: "10px",
              color: "#202A43",
              [theme.breakpoints.up("tablet")]: {
                fontSize: "20px",
              },
              [theme.breakpoints.down("tablet")]: {
                width: "max-content",
                fontSize: "18px",
              },
            }}
          >
            {title}
          </Typography>
          {btnName && (
            <CtaButton
              variant="contained"
              disabled={disabled}
              onClick={btn_Click}
            >
              {btnName}
            </CtaButton>
          )}
        </Stack>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "400",
              color: "#2A1A6A",
            }}
          >
            {desc}
          </Typography>
        </Box>
      </Box>
      <Box
        position="relative"
        // justifyContent="flex-end"
        // alignItems=" flex-end"
        flex="0 0 250px"
        sx={{
          [theme.breakpoints.down("tablet")]: {
            flex: img_not_response ? "" : "0 0 220px",
          },
        }}
      >
        {imageHref && (
          <Image
            src={imageHref}
            alt=""
            layout="fill"
            objectFit={matches ? "fill" : "contain"}
            objectPosition="bottom right"
          />
        )}
      </Box>
    </Stack>
  );
};

export default IntroPanel;
