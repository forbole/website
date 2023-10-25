import { useMediaQuery, useTheme } from "@mui/material";
import HomeAnimationMobileJsonData from "@public/images/assets/lotties/home-animation-mobile.json";
import HomeAnimationLaptopJsonData from "@public/images/assets/lotties/home-animation.json";
import { useLottie } from "lottie-react";

const BackgroundAnimation = () => {
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: onlyLargeScreen
      ? HomeAnimationLaptopJsonData
      : HomeAnimationMobileJsonData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      className: "lottie-svg-class",
      id: "lottie-svg-id",
    },
  };
  const lottieStyle = {
    width: "100%",
    height: "100vh",
  };
  const { View } = useLottie(defaultOptions, lottieStyle);

  return View;
};

export default BackgroundAnimation;
