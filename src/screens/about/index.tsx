import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useRef, useState } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import Arrow, { Direction } from "@src/components/arrow";
import Horse from "@src/components/icons/horse.svg";
import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import * as commonStyles from "@src/styles/common.module.scss";
import { IS_E2E } from "@src/utils/e2e";

import * as styles from "./index.module.scss";

SwiperCore.use([Navigation].concat(!IS_E2E ? [Autoplay] : []));

const About = () => {
  const { t } = useTranslation("about");
  const [onlyLargeScreen, setOnlyLargeScreen] = useState(false);
  const topRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 1200) {
      setOnlyLargeScreen(true);
    }
  }, []);

  const imagList = [
    "/about/aboutus_01.webp",
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
      <div className={commonStyles.pageContainer} ref={topRef}>
        <div className={styles.topStack}>
          <div className={styles.topStackInner}>
            <h1 className={styles.cardTitle}>{t("headercard_title")}</h1>
            <h2 className={styles.cardDesc}>{t("headercard_1st_desc")}</h2>
            <Trans
              components={[
                // eslint-disable-next-line jsx-a11y/heading-has-content
                <h3 className={styles.cardDescTrans0} key="0" />,
                <span className={styles.cardDescTrans1} key="1" />,
              ]}
              i18nKey="headercard_2nd_desc"
              ns="about"
            />
          </div>
          <div className={styles.swiperContainer}>
            <div className={styles.imgBox}>
              <Swiper
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                  stopOnLastSlide: false,
                }}
                breakpoints={{
                  1023: {
                    centeredSlides: false,
                    spaceBetween: 16,
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
            </div>
            <Arrow
              className={[styles.arrow, styles.right, "h-next"].join(" ")}
              direction={Direction.Right}
              role="button"
            />
            <Arrow
              className={[styles.arrow, styles.left, "h-prev"].join(" ")}
              direction={Direction.Left}
              role="button"
            />
          </div>
        </div>

        <div className={styles.sectionStack}>
          <h2 className={styles.section1Title}>{t("section_1st_title")}</h2>
          <span className={styles.sectionDesc}>{t("section_1st_sesc")}</span>
        </div>
      </div>
      <div className={styles.ytbSwiperBox}>
        <div className={styles.ytbStack}>
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
                <div
                  className={[
                    styles.skeleton,
                    loading ? styles.active : "",
                  ].join(" ")}
                />
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  height="100%"
                  onLoad={() => setLoading(false)}
                  src={item.src}
                  title={item.title}
                  width="100%"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Arrow className="v-next" direction={Direction.Right} role="button" />
          <Arrow className="v-prev" direction={Direction.Left} role="button" />
        </div>
      </div>

      <div className={commonStyles.pageContainer}>
        <div>
          <div className={styles.sectionStack}>
            <Trans
              components={[
                // eslint-disable-next-line jsx-a11y/heading-has-content
                <h3 className={styles.tr0} key="0" />,
                <span className={styles.tr1} key="1" />,
              ]}
              i18nKey="section_2nd_large_title"
              ns="about"
            />

            <span className={styles.sectionDesc}>{t("section_2nd_desc")}</span>
            <span className={styles.sectionDesc}>{t("section_3rd_desc")}</span>
            <Horse {...horseStyle} />
            <ScrollToTop topRef={topRef} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
