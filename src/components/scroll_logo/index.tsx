import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { getNetworkInfo } from "@src/utils/network_info";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import { allNetworkKeys } from "./config";
import { TransitionCSS } from "./style";

const Card = dynamic(() => import("./Card"), { ssr: false });
const ScrollLogo = () => {
  const theme = useTheme();
  // 分割数组
  function splitArray(array: any[], length: number) {
    const result = [];
    for (let i = 0; i < array.length; i += length) {
      result.push(array.slice(i, i + length));
    }
    return result;
  }
  const allNetworkData = allNetworkKeys.map((x: string | number) =>
    getNetworkInfo(x),
  );
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"), {
    noSsr: true,
  });
  const data = useMemo(
    () =>
      splitArray(
        allNetworkData,
        allNetworkData.length / (onlyLargeScreen ? 4 : 3),
      ),
    [onlyLargeScreen],
  );
  console.log("data", data);
  return (
    <Container
      disableGutters
      sx={{
        height: "330px",
        [theme.breakpoints.down("laptop")]: {
          height: "250px",
        },
      }}
    >
      <Box
        className="swiper-no-swiping"
        sx={{
          position: "absolute",
          left: 0,
          width: "100vw",
          overflow: "hidden",
          py: "10px",
        }}
      >
        <Box position="relative" width="max-content">
          {data.map((networkData, index) => (
            <TransitionCSS
              key={index}
              style={{
                animation:
                  "35s linear 0s infinite alternate none running jss634",
                animationName:
                  index == 1
                    ? " horizontalRightMove"
                    : `horizontalMove${index}`,
                // [theme.breakpoints.down("laptop")]: {
                //   animationDuration: '50s'
                // },
              }}
            >
              <Card networkData={networkData.concat(networkData)} />
            </TransitionCSS>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
export default ScrollLogo;
