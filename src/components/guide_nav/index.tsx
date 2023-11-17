import { Forbole as ForboleLogo, ForboleShadowIcon } from "@icons";
import { Box, Button, useTheme } from "@mui/material";
import Link from "next/link";

import { useNavHook } from "./hooks";

interface GuideNavProps {
  staking?: boolean;
}

const GuideNav = ({ staking }: GuideNavProps) => {
  const theme = useTheme();
  const { displayBackground } = useNavHook();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        zIndex: 5,
        width: "100%",
        height: "100px",
        background: displayBackground
          ? " rgba(47, 58, 86, 0.4)"
          : "transparent",
        backdropFilter: displayBackground ? "blur(12px)" : "none",
        webkitBackdropFilter: "blur(12px)",
        [theme.breakpoints.up("laptop")]: {
          height: "100px",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          position: "fixed",
          top: 0,
          overflowY: "hidden",
          overflowX: "hidden",
          zIndex: 2,
          [theme.breakpoints.up("laptop")]: {
            maxWidth: "1200px",
            width: "100%",
            height: "auto",
            position: "fixed",
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
            padding: theme.spacing(4, 3, 0, 3),
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            [theme.breakpoints.up("laptop")]: {
              padding: theme.spacing(4, 0, 0, 0),
              justifyContent: "space-between",
              height: "100px",
              overflowY: "hidden",
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
                <ForboleLogo
                  color={
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.main
                      : theme.palette.custom.forbole.red
                  }
                />
              )}
            </Link>
          </Box>
          <Button
            href="#stake-now"
            sx={{
              display: "none",
              width: "97px",
              height: "32px",
              lineHeight: "17px",
              fontWeight: 600,
              padding: 0,
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
            Stake Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GuideNav;
