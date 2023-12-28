import { Box, useTheme } from "@mui/material";
import Link from "next/link";

import {
  Forbole as ForboleLogo,
  ForboleShadowIcon,
} from "@src/components/icons";

import { useNavHook } from "./hooks";
import * as styles from "./index.module.scss";

interface GuideNavProps {
  staking?: boolean;
}

const GuideNav = ({ staking }: GuideNavProps) => {
  const theme = useTheme();
  const { displayBackground } = useNavHook();

  return (
    <Box
      className={[styles.wrapper, displayBackground ? styles.bg : ""].join(" ")}
    >
      <Box className={styles.container}>
        <Box className={styles.inner}>
          <Box className={styles.logo}>
            <Link
              href="/"
              style={{
                alignItems: "center",
                display: "flex",
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
        </Box>
      </Box>
    </Box>
  );
};

export default GuideNav;
