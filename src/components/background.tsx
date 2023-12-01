import { Box, useTheme } from "@mui/material";
import Image from "next/image";

const Background = ({ displayHorse }: { displayHorse?: boolean }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          height: "1200px",
          zIndex: -1,
          left: 0,
          position: "absolute",
          right: 0,

          [theme.breakpoints.down(550)]: {
            display: "none",
          },
        }}
      >
        <Image
          alt="Red background"
          fill
          src={require("@src/../public/images/assets/bg_desktop_red_background.webp")}
        />
      </Box>
      <Box
        sx={{
          "height": "260vw",
          "left": 0,
          "position": "absolute",
          "right": 0,
          "zIndex": -1,

          "& img": {
            [theme.breakpoints.up(550)]: {
              display: "none",
            },
          },
        }}
      >
        <Image
          alt="Red background"
          fill
          objectFit="cover"
          src={require("@src/../public/images/assets/bg_mobile_red_background.webp")}
        />
      </Box>
      {displayHorse && (
        <>
          <Box
            sx={{
              "top": 0,
              "right": 0,
              "left": 0,
              "height": "50vw",
              "position": "absolute",

              "& img": {
                [theme.breakpoints.down(550)]: {
                  display: "none",
                },
              },
            }}
          >
            <Image
              alt="Forbole Horse Logo"
              fill
              loading="eager"
              objectFit="contain"
              src={require("@src/../public/images/assets/bg_desktop_horse.webp")}
            />
          </Box>
          <Box
            sx={{
              "marginTop": "100px",
              "height": "120vw",
              "left": 0,
              "position": "absolute",
              "right": 0,
              "top": 0,

              "& img": {
                [theme.breakpoints.up(550)]: {
                  display: "none",
                },
              },
            }}
          >
            <Image
              alt="Forbole Horse Logo"
              fill
              objectFit="cover"
              priority
              src={require("@src/../public/images/assets/bg_mobile_horse.webp")}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Background;
