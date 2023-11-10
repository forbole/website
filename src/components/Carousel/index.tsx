import { Box, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Arraw, { Direction } from "../arrow";
import { BoxCSS } from "./BoxCSS";

SwiperCore.use([Navigation]);

type PersonInfo = {
  name: string;
  position: string;
  desc: string;
  img: string;
};

const PersonCard = ({ desc, name, position, img }: PersonInfo) => (
  <Card
    sx={{
      display: "flex",
      gap: "20px",
      boxSizing: "border-box",
      height: "100%",
      minHeight: "368px",
      padding: "32px 24px",
      flexDirection: "column",
      alignItems: "flex-start",
      borderRadius: "24px",
      background:
        "linear-gradient(179deg, #FFF 0%, rgba(255, 255, 255, 0.89) 34.90%, #FFF 100%)",
      boxShadow:
        "0px 10px 32px -4px rgba(96, 60, 238, 0.20), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)",
    }}
  >
    {img && (
      <Avatar
        alt="Phoebe Poon"
        src={img}
        sx={{
          width: 100,
          height: 100,
          boxShadow:
            "0px 10px 32px -4px rgba(96, 60, 238, 0.50), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)",
        }}
      />
    )}
    <Box>
      {/* 姓名 */}
      <Typography
        sx={{
          fontSize: { mobile: 24, laptop: 20 },
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "normal",
          letterSpacing: 0.036,
          color: "#202A43",
        }}
      >
        {name}
      </Typography>

      {/* 职位 */}
      <Typography
        sx={{
          fontSize: { mobile: 18, laptop: 16 },
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          letterSpacing: -0.36,
          color: "#202A43",
        }}
      >
        {position}
      </Typography>
    </Box>
    {/* 描述 */}
    <Typography
      sx={{
        width: "100%",
        fontSize: { mobile: 14, laptop: 16 },
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: { mobile: "20px", laptop: "22px" },
        letterSpacing: { mobile: "-0.112px", laptop: "-0.192px" },
        color: "#2A1A6A",
      }}
    >
      {desc}
    </Typography>
  </Card>
);
type CarouselProps = {
  personList?: PersonInfo[];
};
const Carousel = ({ personList }: CarouselProps) => {
  const theme = useTheme();
  let usedList: PersonInfo[] | undefined = personList;
  const { t } = useTranslation("common");

  if (!personList) {
    usedList = [
      {
        name: t("coming_soon"),
        position: "",
        desc: ``,
        img: "",
      },
      {
        name: t("coming_soon"),
        position: "",
        desc: ``,
        img: "",
      },
      {
        name: t("coming_soon"),
        position: "",
        desc: ``,
        img: "",
      },
    ];
  }

  return (
    <BoxCSS>
      <Box
        position="relative"
        sx={{
          [theme.breakpoints.down("laptop")]: {
            margin: "0 -16px",
          },
        }}
      >
        <Swiper
          breakpoints={{
            375: {
              slidesPerView: 1,
              initialSlide: 0,
              spaceBetween: -16,
            },
            1025: {
              spaceBetween: -16,
              slidesPerView: 3,
              initialSlide: 1,
            },
          }}
          centeredSlides
          className="swiper-no-swiping"
          initialSlide={1}
          navigation={{
            nextEl: ".c-next",
            prevEl: ".c-prev",
          }}
          slidesPerView={3}
          spaceBetween={-16}
        >
          {usedList?.map((item, index) => (
            <SwiperSlide key={index}>
              <PersonCard
                key={index}
                desc={item.desc}
                img={item.img}
                name={item.name}
                position={item.position}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Arraw
          className="c-next"
          direction={Direction.Right}
          sx={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <Arraw
          className="c-prev"
          direction={Direction.Left}
          sx={{
            position: "absolute",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>
    </BoxCSS>
  );
};

export default Carousel;
