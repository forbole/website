import * as React from 'react';
import { useTheme } from '@mui/material';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: 0,
    height: 0,
  }); // <-- don't invoke the function here

  const theme = useTheme();
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);
  const [isTablet, setIsTablet] = React.useState<boolean>(false);
  const [isMobile, setIsMobile] = React.useState<boolean>(true);

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    handleResize(); // <-- invoke this function on component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
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
  }, [windowDimensions.width]);

  return { windowDimensions, isDesktop, isTablet, isMobile };
};
