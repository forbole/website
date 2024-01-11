import { useEffect, useState } from "react";

// Thwse hooks are safer to use for SSR hydration, but they can trigger a
// re-render after mounth

export const useDelayedIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else if (isMobile) {
        setIsMobile(false);
      }
    };

    listener();
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [isMobile]);

  return isMobile;
};

export const useDelayedIsLaptop = () => {
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.innerWidth <= 768) {
        setIsLaptop(true);
      } else if (isLaptop) {
        setIsLaptop(false);
      }
    };

    listener();
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [isLaptop]);

  return isLaptop;
};
