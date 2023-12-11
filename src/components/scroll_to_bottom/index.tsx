import { Box } from "@mui/material";
import React from "react";

import { BottomIcon } from "../icons";
import * as styles from "./index.module.scss";

const ScrollToBottom = ({ bottomRef }: any) => {
  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();

    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <Box className={styles.wrapper}>
      <BottomIcon
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          scrollToRef(e, bottomRef)
        }
        role="button"
      />
    </Box>
  );
};

export default ScrollToBottom;
