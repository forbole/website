// Import Swiper React components
import { Box, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import { CSSProperties } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Arraw, { Direction } from "../arrow";
import { BoxCSS } from "./BoxCSS";

SwiperCore.use([Navigation]);
type Props = {
  imagesList: string[];
  style?: CSSProperties;
};
const CardSwiper = ({ imagesList, style }: Props) => {
  const theme = useTheme();
  return (
    <BoxCSS>
      <Box position="relative">
        <Swiper
          className="scale"
          style={{
            ...style,
          }}
          spaceBetween={-80}
          slidesPerView={3}
          centeredSlides
          initialSlide={1}
          navigation={{
            nextEl: ".c-next", // 下一个箭头的类名或DOM元素
            prevEl: ".c-prev", // 上一个箭头的类名或DOM元素
          }}
          breakpoints={{
            375: {
              spaceBetween: -30,
              slidesPerView: 1,
              initialSlide: 0,
            },
            1025: {
              spaceBetween: -80,
              slidesPerView: 3,
              initialSlide: 1,
            },
          }}
        >
          {imagesList.map((item, index) => (
            <SwiperSlide className="scale" key={index}>
              <Stack
                sx={{
                  [theme.breakpoints.down("laptop")]: {
                    width: "100%",
                  },
                }}
              >
                {item && <Image src={item} alt="" />}
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
        <Arraw
          className="c-next"
          direction={Direction.Right}
          sx={{
            position: "absolute",
            right: "5px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <Arraw
          className="c-prev"
          direction={Direction.Left}
          sx={{
            position: "absolute",
            left: "5px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>
    </BoxCSS>
  );
};

export default CardSwiper;
