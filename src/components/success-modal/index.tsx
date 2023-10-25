import {
  Backdrop,
  Box,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { forwardRef } from "react";

import { Close } from "../icons";

type Props = {
  fixed?: any;
  close?: (b: boolean) => void;
  up_word?: string;
  middle_word?: string;
  bottom_word?: string;
  open: boolean;
};
const Alert = forwardRef<HTMLDivElement, Omit<Props, "open">>(
  ({ fixed, close, up_word, middle_word, bottom_word }, ref) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("laptop"));
    return (
      <Stack
        ref={ref}
        sx={{
          width: "823px",
          padding: "64px",
          gap: matches ? "24px" : "40px",
          borderRadius: "24px",
          margin: fixed ? "164px auto" : "0 auto",
          background:
            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.64) 64.58%, #FFF 100%)",
          boxShadow:
            "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
          color: "#202A43",
          [theme.breakpoints.down("laptop")]: {
            padding: "24px",
            width: "343px",
            gap: "24px",
            mt: "104px",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            {up_word && (
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: 590,
                  mb: "8px",
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: "18px",
                    mb: "14px",
                  },
                }}
              >
                {up_word}
              </Typography>
            )}
            {middle_word && (
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  color: "#202A43",
                  [theme.breakpoints.down("laptop")]: {
                    opacity: "0.6",
                  },
                }}
              >
                {middle_word}
              </Typography>
            )}
          </Stack>
          {close && (
            <Close
              onClick={() => close?.(false)}
              style={{
                cursor: "pointer",
                flexShrink: "0",
                padding: matches ? "8px" : "1em",
                marginTop: matches ? "-4px" : "0",
                marginRight: matches ? "-4px" : "0",
                alignSelf: "flex-start",
                boxSizing: "content-box",
              }}
            />
          )}
        </Stack>
        <Box
          sx={{
            display: "flex",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow:
              "0px 10px 32px -4px rgba(96, 60, 238, 0.10), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)",
            [theme.breakpoints.down("laptop")]: {
              borderRadius: "16px",
            },
          }}
        >
          {matches ? (
            <Image
              src={require("/public/home/Success-m@2x.png")}
              objectFit="contain"
              alt=""
            />
          ) : (
            <Image
              src={require("/public/home/Success@2x.png")}
              objectFit="contain"
              alt=""
            />
          )}
        </Box>
        {bottom_word && (
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 300,
            }}
          >
            {bottom_word}
          </Typography>
        )}
      </Stack>
    );
  },
);
export default function SuccessModal({
  fixed,
  close,
  open,
  up_word,
  middle_word,
  bottom_word,
}: Props) {
  if (!fixed) {
    return (
      <Alert
        fixed={fixed}
        close={close}
        up_word={up_word}
        middle_word={middle_word}
        bottom_word={bottom_word}
      />
    );
  }
  return (
    <Modal
      disableEnforceFocus
      open={open}
      onClose={() => close?.(false)}
      sx={{
        overflow: "auto",
      }}
      slotProps={{
        backdrop: {
          sx() {
            return {
              background: "rgba(123, 123, 123, 0.20)",
              backdropFilter: "blur(8px)",
            };
          },
        },
      }}
    >
      <Alert
        fixed={fixed}
        up_word={up_word}
        close={close}
        middle_word={middle_word}
        bottom_word={bottom_word}
      />
    </Modal>
  );
}
