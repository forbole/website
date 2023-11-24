import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";

import { NoSSR } from "@components/no-ssr";
import { allNetworkKeys, getNetworkInfo } from "@utils/network_info";

import Card from "./Card";
import classes from "./scroll_logo.module.css";

function splitArray(array: any[], length: number) {
  const result = [];
  for (let i = 0; i < array.length; i += length) {
    result.push(array.slice(i, i + length));
  }

  return result;
}

const ScrollLogo = () => {
  const theme = useTheme();

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
    [onlyLargeScreen, allNetworkData],
  );

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
        <NoSSR>
          <Box position="relative" width="max-content">
            {data.map((networkData, index) => (
              <div
                className={[classes.animatedRow, classes[`left${index}`]].join(
                  " ",
                )}
                key={index}
              >
                <Card
                  imageSize={30}
                  networkData={networkData.concat(networkData)}
                />
              </div>
            ))}
          </Box>
        </NoSSR>
      </Box>
    </Container>
  );
};
export default ScrollLogo;
