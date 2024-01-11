import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/legacy/image";
import { forwardRef } from "react";

import Close from "../icons/close.svg";
import Modal from "../modal";
import * as styles from "./index.module.scss";

type Props = {
  bottom_word?: string;
  close?: (b: boolean) => void;
  fixed?: any;
  middle_word?: string;
  open: boolean;
  up_word?: string;
};

const Alert = forwardRef<HTMLDivElement, Omit<Props, "open">>(
  ({ bottom_word, close, fixed, middle_word, up_word }, ref) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("laptop"));

    return (
      <Stack
        className={[
          styles.wrapper,
          fixed ? styles.fixed : "",
          matches ? styles.matches : "",
        ].join(" ")}
        ref={ref}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
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
                  color: "#202A43",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "22px",
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
                alignSelf: "flex-start",
                boxSizing: "content-box",
                cursor: "pointer",
                flexShrink: "0",
                marginRight: matches ? "-4px" : "0",
                marginTop: matches ? "-4px" : "0",
                padding: matches ? "8px" : "1em",
              }}
            />
          )}
        </Stack>
        <div className={styles.image}>
          {matches ? (
            <Image
              alt=""
              objectFit="contain"
              src={require("/public/home/Success-m@2x.png")}
            />
          ) : (
            <Image
              alt=""
              objectFit="contain"
              src={require("/public/home/Success@2x.png")}
            />
          )}
        </div>
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
  bottom_word,
  close,
  fixed,
  middle_word,
  open,
  up_word,
}: Props) {
  if (!fixed) {
    return (
      <Alert
        bottom_word={bottom_word}
        close={close}
        fixed={fixed}
        middle_word={middle_word}
        up_word={up_word}
      />
    );
  }

  return (
    <Modal disableEnforceFocus onClose={() => close?.(false)} open={open}>
      <Alert
        bottom_word={bottom_word}
        close={close}
        fixed={fixed}
        middle_word={middle_word}
        up_word={up_word}
      />
    </Modal>
  );
}
