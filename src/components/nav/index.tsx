import { Forbole as ForboleLogo, ForboleShadowIcon } from "@icons";
import { Box, Button, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { RefObject } from "react";

import useColor from "@src/styles/useColor";

import { DesktopNavMenu, MobileNavMenu } from "./components";
import { useNavHook } from "./hooks";

interface NavProps {
  staking?: boolean;
  stakeNowRef?: RefObject<HTMLElement>;
  itemColor?: string;
}

const Nav = ({ staking, stakeNowRef, itemColor }: NavProps) => {
  const theme = useTheme();
  const colors = useColor();
  const { displayBackground } = useNavHook();
  const { t } = useTranslation("staking");
  const scrollToRef = (e: any) => {
    e.preventDefault();
    if (stakeNowRef !== undefined && stakeNowRef.current !== null) {
      window.scrollTo({
        left: 0,
        top: stakeNowRef.current?.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      data-test="nav"
      sx={{
        "boxSizing": "content-box",
        "display": "flex",
        "justifyContent": "center",
        "position": "fixed",
        "top": 0,
        "zIndex": 5,
        "width": "100%",
        "height": "100px",
        "transition": "all .3s",
        "background": (() => {
          if (displayBackground && !staking) {
            return "rgba(47, 58, 86, 0.60)";
          }
          return displayBackground && staking
            ? " rgba(47, 58, 86, 0.60)"
            : "transparent";
        })(),
        "backdropFilter": displayBackground ? "blur(16px)" : "none",
        [theme.breakpoints.up("laptop")]: {
          height: "100px",
        },
        "&:hover": {
          background: "rgba(47, 58, 86, 0.60)",
        },
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          height: "auto",
          position: "fixed",
          top: 0,
          px: "16px",
          zIndex: 2,
          maxWidth: "desktop",
          [theme.breakpoints.up("laptop")]: {
            top: 30,
            margin: "auto",
            left: "50vw",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          },
        }}
      >
        <Box
          sx={{
            background: "transparent",
            padding: theme.spacing(5, 0, 0, 0),
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            [theme.breakpoints.up("laptop")]: {
              padding: theme.spacing(5.5, 0, 0, 0),
              justifyContent: "space-between",
              overflow: "unset",
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.up("laptop")]: {
                margin: 0,
                width: "40%",
              },
            }}
          >
            <Link href="/">
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {staking ? (
                  <ForboleShadowIcon />
                ) : (
                  <ForboleLogo color={itemColor || colors.primary} />
                )}
              </a>
            </Link>
          </Box>
          {staking ? (
            <Button
              onClick={(e: React.MouseEvent<HTMLElement>) => scrollToRef(e)}
              sx={{
                width: "97px",
                height: "32px",
                lineHeight: "17px",
                fontWeight: 600,
                padding: 0,
                whiteSpace: "nowrap",
                background:
                  "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                borderRadius: theme.spacing(3),
                color: "primary.main",
                boxShadow: "none",
                [theme.breakpoints.up("laptop")]: {
                  width: "111px",
                  height: "45px",
                },
              }}
              variant="contained"
            >
              {t("stake_now")}
            </Button>
          ) : (
            <>
              <Box
                sx={{
                  [theme.breakpoints.up("laptop")]: {
                    display: "none",
                  },
                }}
              >
                <MobileNavMenu />
              </Box>
              <Box
                sx={{
                  [theme.breakpoints.down("laptop")]: { display: "none" },
                  [theme.breakpoints.up("laptop")]: {
                    display: "flex",
                    width: "37%",
                  },
                }}
              >
                <DesktopNavMenu />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Nav;
