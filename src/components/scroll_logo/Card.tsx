import React from "react";
import {
  Box,
  Container,
  Stack,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.min.css";
// 挂载到当前swiper实例
SwiperCore.use([Autoplay]);
type Props = {
  networkData: { image: string; name: string }[];
  sx?: SxProps<Theme> | undefined;
};
const Card = ({ networkData, sx }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={sx} display={"flex"} maxWidth={"max-content"}>
      {networkData.map((item: any, index) => (
        <Box
          key={index}
          sx={{
            my: "20px",
            display: "inline-flex",
            flex: "0 0 auto",
            padding: "8px 23px",
            gap: "8px",
            mr: "8px",
            [theme.breakpoints.down("laptop")]: {
              padding: "8px 20px",
              mr: "24px",
            },
            alignItems: "center",
            borderRadius: "40px",
            background: "#FFF",
            boxShadow:
              "0px 10px 32px -4px rgba(96, 60, 238, 0.10), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "28px",
              height: "28px",
              filter:
                "drop-shadow(0px 10px 32px rgba(96, 60, 238, 0.10)) drop-shadow(0px 6px 14px rgba(96, 60, 238, 0.28))",
            }}
          >
            {item.image && (
              <Image
                src={item.image}
                objectFit="contain"
                layout="fill"
                alt=""
              />
            )}
          </Box>
          <Typography
            component={"span"}
            sx={{
              whiteSpace: "nowrap",
              fontSize: "18px",
              fontWeight: "590",
            }}
          >
            {item.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default Card;
