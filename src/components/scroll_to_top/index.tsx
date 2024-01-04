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
        behavior: "smooth",
        left: 0,
        top: topRef?.current.offsetTop - 100,
      });
    },
    [topRef],
  );

  return (
    <div className={styles.wrapper}>
      <TopIcon onClick={scrollToRef} role="button" />
    </div>
  );
};

export default ScrollToTop;
