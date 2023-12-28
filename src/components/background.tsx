import { Box, useTheme } from "@mui/material";
import Image from "next/image";

import * as styles from "./background.module.scss";

const Background = ({ displayHorse }: { displayHorse?: boolean }) => {
  const theme = useTheme();

  return (
    <>
      <Box className={styles.wrapper}>
        <Image
          alt="Red background"
          fill
          src={require("@src/../public/images/assets/bg_desktop_red_background.webp")}
        />
      </Box>
      <Box
        sx={{
          "height": displayHorse ? "260vw" : "190vw",
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
          src={require("@src/../public/images/assets/bg_mobile_red_background.webp")}
          style={{ objectFit: "cover" }}
        />
      </Box>
      {displayHorse && (
        <>
          <Box className={styles.horseWrapperDesktop}>
            <Image
              alt="Forbole Horse Logo"
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70vw"
              src={require("@src/../public/images/assets/bg_desktop_horse.webp")}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box className={styles.horseWrapperMobile}>
            <Image
              alt="Forbole Horse Logo"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70vw"
              src={require("@src/../public/images/assets/bg_mobile_horse.webp")}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Background;
