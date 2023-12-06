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
import React, { useState } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import { Layout, ScrollToTop } from "@components";
import Arraw, { Direction } from "@src/components/arrow";
import { Horse } from "@src/components/icons";
import { ImgBox, YTBSwiperCSS } from "@src/screens/about/SwiperCSS";

// 挂载到当前swiper实例
SwiperCore.use([Navigation, Autoplay]);
const About = () => {
  const { t } = useTranslation("about");
  const theme = useTheme();
  const topRef = React.useRef(null);
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
  const vidoeList = [
    {
      src: "https://www.youtube.com/embed/K5t6Q0OAVzI",
      title: "Ep.2 Forbole is an Infrastructure Provider",
    },
    {
      src: "https://www.youtube.com/embed/aU_TNscGcdM",
      title: "Ep.3 Compliance and Ecosystem",
    },
    {
      src: "https://www.youtube.com/embed/Ye4mmNTw5J8",
      title: "Ep.4 Infrastructure",
    },
    {
      src: "https://www.youtube.com/embed/J78MM7eoHnw",
      title: "About Forbole",
    },
  ];

  return (
    <Layout
      description={t("headercard_1st_desc")}
      footer
      redBgFooter
      title={t("page_title")}
    >
      <Container
        maxWidth="desktop"
        ref={topRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "184px",
          [theme.breakpoints.down("laptop")]: {
            gap: "40px",
          },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            bgcolor: "#ffffff",
            alignItems: "center",
            color: "#202A43",
            borderRadius: "24px",
            py: "40px",
            background:
              "linear-gradient(179deg, #FFF 0%, rgba(255, 255, 255, 0.64) 50%)",
            boxShadow:
              " 0px 14px 64px -4px rgba(2, 38, 225, 0.12), 0px 8px 22px -6px rgba(2, 38, 225, 0.12)",
            overflow: "hidden",
            [theme.breakpoints.down("laptop")]: {
              mt: "103px",
              fontSize: "24px",
              flexDirection: "column",
            },
            [theme.breakpoints.up("laptop")]: {
              mt: "164px",
              fontSize: "64px",
            },
          }}
        >
          <Stack
            maxWidth="1000px"
            spacing={3}
            sx={{
              alignItems: "center",
              textAlign: "center",
              px: "24px",
            }}
          >
            <Typography
              sx={{
                [theme.breakpoints.down("laptop")]: {
                  fontWeight: 590,
                  fontSize: "16px",
                },
                [theme.breakpoints.up("laptop")]: {
                  fontWeight: 700,
                  fontSize: "24px",
                },
              }}
            >
              {t("headercard_title")}
            </Typography>
            <Typography
              sx={{
                [theme.breakpoints.down("laptop")]: {
                  fontWeight: 700,
                  fontSize: "24px",
                },
                [theme.breakpoints.up("laptop")]: {
                  fontWeight: 590,
                  fontSize: "40px",
                  width: "900px",
                },
              }}
            >
              {t("headercard_1st_desc")}
            </Typography>
            <Trans
              components={[
                <Typography
                  key="0"
                  sx={{
                    textShadow:
                      "0px 1px 10px  rgba(16, 24, 40, 0.05), 0px 1px 8px  rgba(16, 24, 40, 0.06)",
                    fontWeight: 400,
                    [theme.breakpoints.down("laptop")]: {
                      fontSize: "16px",
                    },
                    [theme.breakpoints.up("laptop")]: {
                      fontSize: "24px",
                    },
                  }}
                />,
                <Typography
                  component="span"
                  key="1"
                  sx={{
                    textShadow:
                      "0px 1px 10px  rgba(16, 24, 40, 0.05), 0px 1px 8px  rgba(16, 24, 40, 0.06)",
                    fontWeight: "700",
                    [theme.breakpoints.down("laptop")]: {
                      fontSize: "16px",
                    },
                    [theme.breakpoints.up("laptop")]: {
                      fontSize: "24px",
                    },
                  }}
                />,
              ]}
              i18nKey="headercard_2nd_desc"
              ns="about"
            />
          </Stack>
          <Box
            sx={{
              position: "relative",
              height: "272px",
              width: "100%",
              mt: "24px",
              padding: "0px 16px",
              [theme.breakpoints.down("laptop")]: {
                height: "220px",
              },
            }}
          >
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
                loop // 循环滚动
                navigation={{
                  nextEl: ".h-next",
                  prevEl: ".h-prev",
                }}
                slidesPerView="auto"
                spaceBetween={24}
              >
                {imagList.map((item) => (
                  <SwiperSlide
                    key={item}
                    style={{
                      boxSizing: "border-box",
                      width: "auto",
                      padding: "28px 0",
                    }}
                  >
                    <img
                      alt=""
                      onError={(e: any) => {
                        e.target.style.width = "300px";
                      }}
                      src={item}
                      style={{
                        height: "100%",
                        width: "auto",
                        border: "1px solid rgba(2, 38, 225, 0.12)",
                        borderRadius: "4px",
                        overflow: "hidden",
                        boxShadow:
                          "0px 7.8450517654418945px 25.10416603088379px -3.1380207538604736px rgba(2, 38, 225, 0.10), 0px 4.70703125px 10.983072280883789px -4.70703125px rgba(2, 38, 225, 0.12)",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ImgBox>
            <Arraw
              className="h-next"
              direction={Direction.Right}
              sx={{
                position: "absolute",
                right: "5px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <Arraw
              className="h-prev"
              direction={Direction.Left}
              sx={{
                position: "absolute",
                left: "5px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </Box>
        </Stack>

        <Stack>
          <Stack
            sx={{
              maxWidth: "1000px",
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: "24px",
              color: "#202A43",
              textShadow:
                "0px 14px 64px  rgba(2, 38, 225, 0.12), 0px 8px 22px  rgba(2, 38, 225, 0.12)",
            }}
          >
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: "590",
                textShadow:
                  "0px 1px 10px  rgba(16, 24, 40, 0.05), 0px 1px 8px  rgba(16, 24, 40, 0.06)",
                [theme.breakpoints.down("laptop")]: {
                  fontWeight: "700",
                  fontSize: "24px",
                },
              }}
            >
              {t("section_1st_title")}
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "400",
                textShadow:
                  "0px 1px 10px  rgba(16, 24, 40, 0.05), 0px 1px 8px  rgba(16, 24, 40, 0.06)",
                [theme.breakpoints.down("laptop")]: {
                  fontSize: "16px",
                  fontWeight: "400",
                },
              }}
            >
              {t("section_1st_sesc")}
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <YTBSwiperCSS>
        <Stack
          sx={{
            position: "relative",
            mt: "40px",
            mb: "184px",
            padding: onlyLargeScreen ? "8px" : "0",
            height: "400px",
            width: "1200px",
            mx: "auto",
            [theme.breakpoints.down("laptop")]: {
              height: "245px",
              width: "100%",
              mb: "40px",
            },
          }}
        >
          <Swiper
            className="swiper-no-swiping"
            navigation={{
              nextEl: ".v-next",
              prevEl: ".v-prev",
            }}
            slidesPerView={onlyLargeScreen ? 2 : "auto"}
            spaceBetween={16}
            style={{
              width: "100%",
              height: "100%",
              overflow: onlyLargeScreen ? "visible" : "hidden",
              padding: onlyLargeScreen ? "0" : "0 32px",
            }}
          >
            {vidoeList.map((item, indexUpper) => (
              <SwiperSlide
                key={indexUpper}
                style={{
                  height: "100%",
                  maxWidth: onlyLargeScreen ? "576px" : "90%",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
              >
                <Skeleton
                  sx={{ display: loading ? "block" : "none", height: "100%" }}
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
          <Arraw className="v-next" direction={Direction.Right} />
          <Arraw className="v-prev" direction={Direction.Left} />
        </Stack>
      </YTBSwiperCSS>

      <Container
        maxWidth="desktop"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "184px",
          [theme.breakpoints.down("laptop")]: {
            gap: "40px",
          },
        }}
      >
        <Stack>
          <Stack
            sx={{
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: "24px",
              color: "#202A43",
              textShadow:
                "0px 14px 64px  rgba(2, 38, 225, 0.12), 0px 8px 22px  rgba(2, 38, 225, 0.12)",
            }}
          >
            <Trans
              components={[
                <Typography
                  display="inline"
                  key="0"
                  sx={{
                    fontSize: "40px",
                    fontWeight: "590",
                    textShadow:
                      "0px 1px 10px  rgba(16, 24, 40, 0.05), 0px 1px 8px  rgba(16, 24, 40, 0.06)",
                    [theme.breakpoints.down("laptop")]: {
                      fontWeight: "700",
                      fontSize: "24px",
                    },
                  }}
                />,
                <Typography
                  color="#EE3131"
                  component="span"
                  display="inline"
                  key="1"
                  sx={{
                    fontSize: "40px",
                    fontWeight: "590",
                    textShadow:
                      "0px 1px 10px  rgba(16, 24, 40, 0.05), 0px 1px 8px  rgba(16, 24, 40, 0.06)",
                    [theme.breakpoints.down("laptop")]: {
                      fontWeight: "700",
                      fontSize: "24px",
                    },
                  }}
                />,
              ]}
              i18nKey="section_2nd_large_title"
              ns="about"
            />

            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "400",
                textShadow:
                  "0px 1px 10px  rgba(16, 24, 40, 0.05), 0px 1px 8px  rgba(16, 24, 40, 0.06)",
                [theme.breakpoints.down("laptop")]: {
                  fontSize: "16px",
                  fontWeight: "400",
                },
              }}
            >
              {t("section_2nd_desc")}
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "400",
                textShadow:
                  "0px 1px 10px  rgba(16, 24, 40, 0.05), 0px 1px 8px  rgba(16, 24, 40, 0.06)",
                [theme.breakpoints.down("laptop")]: {
                  fontSize: "16px",
                  fontWeight: "400",
                },
              }}
            >
              {t("section_3rd_desc")}
            </Typography>
            <Horse style={{ display: "block", marginTop: "30px" }} />
            <ScrollToTop topRef={topRef} />
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
};

export default About;
