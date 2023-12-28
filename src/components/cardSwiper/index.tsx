import { Box, Stack, useTheme } from "@mui/material";
import Image from "next/legacy/image";
import type { CSSProperties } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Arraw, { Direction } from "../arrow";
import { BoxCSS } from "./BoxCSS";

SwiperCore.use([Navigation]);

type Props = {
  className?: string;
  imagesList: string[];
  style?: CSSProperties;
};

const CardSwiper = ({ className, imagesList, style }: Props) => {
  const theme = useTheme();

  return (
    <BoxCSS>
      <Box position="relative">
        <Swiper
          breakpoints={{
            1025: {
              initialSlide: 1,
              slidesPerView: 3,
              spaceBetween: -80,
            },
            375: {
              initialSlide: 0,
              slidesPerView: 1,
              spaceBetween: -30,
            },
          }}
          centeredSlides
          className={["scale", className || ""].join(" ")}
          initialSlide={1}
          navigation={{
            nextEl: ".c-next", // 下一个箭头的类名或DOM元素
            prevEl: ".c-prev", // 上一个箭头的类名或DOM元素
          }}
          slidesPerView={3}
          spaceBetween={-80}
          style={{
            ...style,
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
                {item && <Image alt="" src={item} />}
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
            left: "5px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>
    </BoxCSS>
  );
};

export default CardSwiper;
