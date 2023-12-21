import { Box } from "@mui/material";
import { useCallback } from "react";

import { TopIcon } from "../icons";
import * as styles from "./index.module.scss";

interface TopProps {
  topRef: any;
}

const ScrollToTop = ({ topRef }: TopProps) => {
  const scrollToRef = useCallback(
    (e: any) => {
      e.preventDefault();

      window.scrollTo({
        left: 0,
        top: topRef?.current.offsetTop - 100,
        behavior: "smooth",
      });
    },
    [topRef],
  );

  return (
    <Box className={styles.wrapper}>
      <TopIcon onClick={scrollToRef} role="button" />
    </Box>
  );
};

export default ScrollToTop;
