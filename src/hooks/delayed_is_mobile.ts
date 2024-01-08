import { useEffect, useState } from "react";

// This hook is safer to use for SSR hydration, but it can trigger a re-render
// in mobile
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
