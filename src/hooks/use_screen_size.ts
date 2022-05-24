import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';

// Nextjs doesn't neccessarily work on frontend,
// this hook needs to be refactored later on in development:
// https://morioh.com/p/f7b08fe33a67

export const useScreenSize = () => {
  const isClient = typeof window === 'object';

  function getSize(): any {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>(getSize());
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  const theme: any = useTheme();

  useEffect((): any => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const width = windowSize?.width ?? 0;
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
  }, [windowSize.width]);

  return {
    windowSize,
    isDesktop,
    isTablet,
    isMobile,
  };
};
