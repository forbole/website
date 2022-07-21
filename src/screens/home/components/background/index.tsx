import { useLottie } from 'lottie-react';
import { useWindowDimensions } from '@src/hooks';
import HomeAnimationLaptopJsonData from '@public/images/assets/lotties/home-page-animation-laptop.json';
import HomeAnimationMobileJsonData from '@public/images/assets/lotties/home-page-animation-mobile.json';

const BackgroundAnimation = () => {
  const { isDesktop } = useWindowDimensions();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: isDesktop
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
