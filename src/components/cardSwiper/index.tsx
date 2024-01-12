import { Stack } from "@mui/material";
import Image from "next/legacy/image";
import type { CSSProperties } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Arrow, { Direction } from "../arrow";
import * as styles from "./index.module.scss";

SwiperCore.use([Navigation]);

type Props = {
  className?: string;
  imagesList: string[];
  style?: CSSProperties;
};

const CardSwiper = ({ className, imagesList, style }: Props) => (
  <div className={styles.boxCss}>
    <div className={styles.wrapper}>
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
            <Stack className={styles.slide}>
              {item && <Image alt="" src={item} />}
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
      <Arrow
        className={["c-next", styles.next].join(" ")}
        direction={Direction.Right}
      />
      <Arrow
        className={["c-prev", styles.prev].join(" ")}
        direction={Direction.Left}
      />
    </div>
  </div>
);

export default CardSwiper;
