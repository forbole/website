import { Forbole as ForboleLogo, ForboleShadowIcon } from "@icons";
import { Box, Button, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import type { RefObject } from "react";
import React from "react";

import useColor from "@src/styles/useColor";

import { DesktopNavMenu, MobileNavMenu } from "./components";
import LangMenuButton from "./components/lang_menu_button";
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

  const scrollToRef = (e: React.MouseEvent<HTMLElement>) => {
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
        "backdropFilter": displayBackground ? "blur(16px)" : "none",
        "boxSizing": "content-box",
        "display": "flex",
        "height": "100px",
        "justifyContent": "center",
        "position": "fixed",
        "top": 0,
        "transition": "all .3s",
        "width": "100%",
        "zIndex": 5,

        "background": (() => {
          if (displayBackground && !staking) {
            return "rgba(47, 58, 86, 0.60)";
          }

          return displayBackground && staking
            ? " rgba(47, 58, 86, 0.60)"
            : "transparent";
        })(),
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
          height: "auto",
          maxWidth: "desktop",
          position: "fixed",
          px: "16px",
          top: 0,
          width: "100%",
          zIndex: 2,

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
            alignItems: "center",
            background: "transparent",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: theme.spacing(5, 0, 0, 0),

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
            <Link
              aria-label={t("common:forboleLogo")}
              href="/"
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
            </Link>
          </Box>
          {staking ? (
            <Box
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={scrollToRef}
                sx={{
                  background:
                    "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                  borderRadius: theme.spacing(3),
                  boxShadow: "none",
                  color: "primary.main",
                  fontWeight: 600,
                  height: "32px",
                  lineHeight: "17px",
                  padding: 0,
                  whiteSpace: "nowrap",
                  width: "97px",

                  [theme.breakpoints.up("laptop")]: {
                    width: "111px",
                    height: "45px",
                  },
                }}
                variant="contained"
              >
                {t("stake_now")}
              </Button>
              <Box
                sx={{
                  [theme.breakpoints.down("laptop")]: {
                    display: "none",
                  },
                }}
              >
                <LangMenuButton />
              </Box>
            </Box>
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
