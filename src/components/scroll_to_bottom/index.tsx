import { Box } from "@mui/material";
import type { MouseEvent } from "react";

import { BottomIcon } from "../icons";
import * as styles from "./index.module.scss";

const ScrollToBottom = ({ bottomRef }: any) => {
  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();

    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: ref.current.offsetTop - 100,
    });
  };

  return (
    <Box className={styles.wrapper}>
      <BottomIcon
        onClick={(e: MouseEvent<HTMLElement>) => scrollToRef(e, bottomRef)}
        role="button"
      />
    </Box>
  );
};

export default ScrollToBottom;
