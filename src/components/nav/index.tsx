/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { RefObject } from "react";
import Link from "next/link";
import { Box, Button, useTheme } from "@mui/material";
import { Forbole as ForboleLogo, ForboleShadowIcon } from "@icons";
import useColor from "@src/styles/useColor";
import { MobileNavMenu, DesktopNavMenu } from "./components";
import { useNavHook } from "./hooks";

interface NavProps {
  navLink: string | null;
  staking?: boolean;
  stakeNowRef?: RefObject<HTMLElement>;
}

const Nav = ({ navLink, staking, stakeNowRef }: NavProps) => {
  const theme = useTheme();
  const colors = useColor();
  const { displayBackground } = useNavHook();
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
      sx={{
        boxSizing: "content-box",
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        zIndex: 5,
        width: "100%",
        height: "100px",
        transition: "all .3s",
        background:
          displayBackground && !staking
            ? "rgba(47, 58, 86, 0.60)"
            : displayBackground && staking
            ? " rgba(47, 58, 86, 0.60)"
            : "transparent",
        backdropFilter: displayBackground ? "blur(16px)" : "none",
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
              // overflowY: 'hidden',
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
                  <ForboleLogo color={colors.primary} />
                )}
              </a>
            </Link>
          </Box>
          {staking ? (
            <Button
              variant="contained"
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
            >
              Stake Now
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
                <MobileNavMenu link={navLink} />
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
                <DesktopNavMenu link={navLink} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Nav;
