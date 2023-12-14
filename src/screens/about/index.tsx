import {
  Box,
  Container,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useMemo, useRef, useState } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Arrow, { Direction } from "@src/components/arrow";
import { Horse } from "@src/components/icons";
import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import { ImgBox, YTBSwiperCSS } from "@src/screens/about/SwiperCSS";

import * as styles from "./index.module.scss";

SwiperCore.use([Navigation, Autoplay]);
const About = () => {
  const { t } = useTranslation("about");
  const theme = useTheme();
  const topRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));
  const imagList = [
    "/about/aboutus_01.webp",
    "/about/aboutus_02.webp",
    "/about/aboutus_03.webp",
    "/about/aboutus_04.webp",
    "/about/aboutus_05.webp",
    "/about/aboutus_06.webp",
    "/about/aboutus_07.webp",
  ];
  const videoList = useMemo(
    () => [
      {
        src: "https://www.youtube.com/embed/K5t6Q0OAVzI",
        title: t("aboutVideo2"),
      },
      {
        src: "https://www.youtube.com/embed/aU_TNscGcdM",
        title: t("aboutVideo3"),
      },
      {
        src: "https://www.youtube.com/embed/Ye4mmNTw5J8",
        title: t("aboutVideo4"),
      },
      {
        src: "https://www.youtube.com/embed/J78MM7eoHnw",
        title: t("aboutVideo5"),
      },
    ],
    [t],
  );

  const horseStyle = {
    style: { display: "block", marginTop: "30px" },
  };

  return (
    <Layout
      description={t("headercard_1st_desc")}
      footer
      redBgFooter
      title={t("page_title")}
    >
      <Container className={styles.container} maxWidth="desktop" ref={topRef}>
        <Stack className={styles.topStack} spacing={3}>
          <Stack className={styles.topStackInner} spacing={3}>
            <Typography className={styles.cardTitle} variant="h1">
              {t("headercard_title")}
            </Typography>
            <Typography className={styles.cardDesc} variant="h2">
              {t("headercard_1st_desc")}
            </Typography>
            <Trans
              components={[
                <Typography className={styles.cardDescTrans0} key="0" />,
                <Typography
                  className={styles.cardDescTrans1}
                  component="span"
                  key="1"
                />,
              ]}
              i18nKey="headercard_2nd_desc"
              ns="about"
            />
          </Stack>
          <Box className={styles.swiperContainer}>
            <ImgBox>
              <Swiper
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                  stopOnLastSlide: false,
                }}
                breakpoints={{
                  1023: {
                    spaceBetween: 16,
                    centeredSlides: false,
                  },
                }}
                centeredSlides
                className="swiper-style"
                loop
                navigation={{
                  nextEl: ".h-next",
                  prevEl: ".h-prev",
                }}
                slidesPerView="auto"
                spaceBetween={24}
              >
                {imagList.map((item) => (
                  <SwiperSlide className={styles.swiperSlide} key={item}>
                    <img
                      alt=""
                      className={styles.swiperImg}
                      onError={(e: any) => {
                        e.target.style.width = "300px";
                      }}
                      src={item}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ImgBox>
            <Arrow
              className={[styles.arrow, styles.right, "h-next"].join(" ")}
              direction={Direction.Right}
            />
            <Arrow
              className={[styles.arrow, styles.left, "h-prev"].join(" ")}
              direction={Direction.Left}
            />
          </Box>
        </Stack>

        <Stack>
          <Stack className={styles.sectionStack}>
            <Typography className={styles.section1Title}>
              {t("section_1st_title")}
            </Typography>
            <Typography className={styles.sectionDesc}>
              {t("section_1st_sesc")}
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <YTBSwiperCSS>
        <Stack className={styles.ytbStack}>
          <Swiper
            className={["swiper-no-swiping", styles.ytbSwiper].join(" ")}
            navigation={{
              nextEl: ".v-next",
              prevEl: ".v-prev",
            }}
            slidesPerView={onlyLargeScreen ? 2 : "auto"}
            spaceBetween={16}
          >
            {videoList.map((item, indexUpper) => (
              <SwiperSlide className={styles.swiperSlideVideo} key={indexUpper}>
                <Skeleton
                  className={[
                    styles.skeleton,
                    loading ? styles.active : "",
                  ].join(" ")}
                  variant="rectangular"
                />
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                  height="100%"
                  onLoad={() => setLoading(false)}
                  src={item.src}
                  title={item.title}
                  width="100%"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Arrow className="v-next" direction={Direction.Right} />
          <Arrow className="v-prev" direction={Direction.Left} />
        </Stack>
      </YTBSwiperCSS>

      <Container className={styles.container} maxWidth="desktop">
        <Stack>
          <Stack className={styles.sectionStack}>
            <Trans
              components={[
                <Typography className={styles.tr0} key="0" />,
                <Typography className={styles.tr1} component="span" key="1" />,
              ]}
              i18nKey="section_2nd_large_title"
              ns="about"
            />

            <Typography className={styles.sectionDesc}>
              {t("section_2nd_desc")}
            </Typography>
            <Typography className={styles.sectionDesc}>
              {t("section_3rd_desc")}
            </Typography>
            <Horse {...horseStyle} />
            <ScrollToTop topRef={topRef} />
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
};

export default About;
