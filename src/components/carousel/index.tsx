import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import useTranslation from "next-translate/useTranslation";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Arrow, { Direction } from "../arrow";
import * as styles from "./index.module.scss";

SwiperCore.use([Navigation]);

type PersonInfo = {
  desc: string;
  img: string;
  name: string;
  position: string;
};

const PersonCard = ({ desc, img, name, position }: PersonInfo) => (
  <Card className={styles.personCard}>
    {img && <Avatar alt="Person Avatar" className={styles.avatar} src={img} />}
    <div>
      <p className={styles.name}>{name}</p>
      <p className={styles.position}>{position}</p>
    </div>
    <p className={styles.description}>{desc}</p>
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
    <div className={styles.boxCss}>
      <div className={styles.wrapper}>
        <Swiper
          breakpoints={{
            1025: {
              initialSlide: 1,
              slidesPerView: 3,
              spaceBetween: -16,
            },
            375: {
              initialSlide: 0,
              slidesPerView: 1,
              spaceBetween: -16,
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
          role="button"
        />
        <Arrow
          className={["c-prev", styles.arrowLeft].join(" ")}
          direction={Direction.Left}
          role="button"
        />
      </div>
    </div>
  );
};

export default Carousel;
