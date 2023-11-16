import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useEffect, useState } from "react";

export const useNavHook = () => {
  const [displayBackground, setDisplayBackground] = useState(false);
  // initial check
  useEffect(() => {
    if (window.pageYOffset === 0 && displayBackground) {
      setDisplayBackground(false);
    }
    if (window.pageYOffset > 0 && !displayBackground) {
      setDisplayBackground(true);
    }
  }, [displayBackground]);

  useScrollPosition(({ currPos }) => {
    if (currPos.y === 0 && displayBackground) {
      setDisplayBackground(false);
    }
    if (currPos.y < 0 && !displayBackground) {
      setDisplayBackground(true);
    }
  });

  return {
    displayBackground,
  };
};
