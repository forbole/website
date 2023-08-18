import { useLottie } from 'lottie-react';
import { useTheme, useMediaQuery } from '@mui/material';
import HomeAnimationLaptopJsonData from '@public/images/assets/lotties/home-animation.json';
import HomeAnimationMobileJsonData from '@public/images/assets/lotties/home-animation-mobile.json';

const BackgroundAnimation = () => {
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('laptop'));
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: onlyLargeScreen
      ? HomeAnimationLaptopJsonData
      : HomeAnimationMobileJsonData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      className: 'lottie-svg-class',
      id: 'lottie-svg-id',
    },
  };
  const lottieStyle = {
    width: '100%',
    height: '100vh',
  };
  const { View } = useLottie(defaultOptions, lottieStyle);

  return View;
};

export default BackgroundAnimation;
