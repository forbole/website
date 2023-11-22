import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  }); // <-- don't invoke the function here

  const theme = useTheme();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    handleResize(); // <-- invoke this function on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const width = windowDimensions?.width ?? 0;
    // is mobile
    if (width < theme?.breakpoints?.values?.tablet) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    // is tablet
    if (
      width >= theme?.breakpoints?.values?.tablet &&
      width < theme?.breakpoints?.values?.laptop
    ) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }

    // is desktop
    if (width >= theme?.breakpoints?.values?.laptop) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, [
    windowDimensions.width,
    theme?.breakpoints?.values?.tablet,
    theme?.breakpoints?.values?.laptop,
  ]);

  return { windowDimensions, isDesktop, isTablet, isMobile };
};
