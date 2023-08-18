import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useStakingContext } from '@contexts';
import { getNetworkInfo } from '@src/utils/network_info';
import { allNetworkKeys } from './config';
import Card from './Card';
import { TransitionCSS } from './style';

const ScrollLogo = () => {
  const theme = useTheme();
  //分割数组
  function splitArray(array: any[], length: number) {
    var result = [];
    for (var i = 0; i < array.length; i += length) {
      result.push(array.slice(i, i + length));
    }
    return result;
  }
  const allNetworkData = allNetworkKeys.map((x: string | number) =>
    getNetworkInfo(x)
  );
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('laptop'));
  const data = useMemo(
    () =>
      splitArray(
        allNetworkData,
        allNetworkData.length / (onlyLargeScreen ? 4 : 3)
      ),
    [onlyLargeScreen]
  );
  return (
    <Container
      disableGutters
      sx={{
        height: '330px',
        [theme.breakpoints.down('laptop')]: {
          height: '250px',
        },
      }}
    >
      <Box
        className="swiper-no-swiping"
        sx={{
          position: 'absolute',
          left: 0,
          width: '100vw',
          overflow: 'hidden',
          py: '10px',
        }}
      >
        <Box position={'relative'}>
          {data.map((networkData, index) => (
            <TransitionCSS key={index}>
              <Card
                networkData={networkData.concat(networkData)}
                sx={{
                  animation:
                    '35s linear 0s infinite alternate none running jss634',
                  animationName:
                    index == 1 ? ' horizontalRightMove' : 'horizontalMove',
                }}
              ></Card>
            </TransitionCSS>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
export default ScrollLogo;
