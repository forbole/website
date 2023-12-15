import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import useTranslation from "next-translate/useTranslation";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Arrow, { Direction } from "../arrow";
import { BoxCSS } from "./BoxCSS";
import * as styles from "./index.module.scss";

SwiperCore.use([Navigation]);

type PersonInfo = {
  desc: string;
  img: string;
  name: string;
  position: string;
};

const PersonCard = ({ desc, name, position, img }: PersonInfo) => (
  <Card className={styles.personCard}>
    {img && <Avatar alt="Person Avatar" className={styles.avatar} src={img} />}
    <Box>
      <Typography className={styles.name}>{name}</Typography>
      <Typography className={styles.position}>{position}</Typography>
    </Box>
    <Typography className={styles.description}>{desc}</Typography>
  </Card>
);

type CarouselProps = {
  personList?: PersonInfo[];
};

const Carousel = ({ personList }: CarouselProps) => {
  let usedList: PersonInfo[] | undefined = personList;
  const { t } = useTranslation("common");

  if (!personList) {
    usedList = [
      {
        desc: "",
        img: "",
        name: t("coming_soon"),
        position: "",
      },
      {
        desc: "",
        img: "",
        name: t("coming_soon"),
        position: "",
      },
      {
        desc: "",
        img: "",
        name: t("coming_soon"),
        position: "",
      },
    ];
  }

  return (
    <BoxCSS>
      <Box className={styles.wrapper}>
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
                desc={item.desc}
                img={item.img}
                key={index}
                name={item.name}
                position={item.position}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Arrow
          className={["c-next", styles.arrowRight].join(" ")}
          direction={Direction.Right}
        />
        <Arrow
          className={["c-prev", styles.arrowLeft].join(" ")}
          direction={Direction.Left}
        />
      </Box>
    </BoxCSS>
  );
};

export default Carousel;
