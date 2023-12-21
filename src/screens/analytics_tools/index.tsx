import { Container, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useMemo, useRef } from "react";

import IntroPanel from "@src/components/Intro_panel";
import CardSwiper from "@src/components/cardSwiper";
import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import Section from "@src/components/section";

import * as styles from "./index.module.scss";

const AnalyticsTools = () => {
  const topRef = useRef(null);
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation("analytics_tools");
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });
  const imagesList = useMemo(() => {
    if (isMobile) {
      return [
        require("/public/data_visualization/opensource_m@2x.png"),
        require("/public/data_visualization/staking_m@2x.png"),
        require("/public/data_visualization/product details_m@2x.png"),
      ];
    }

    return [
      require("/public/data_visualization/opensource@2x.png"),
      require("/public/data_visualization/staking@2x.png"),
      require("/public/data_visualization/product details@2x.png"),
    ];
  }, [isMobile]);
  const noteBook = useMemo(() => {
    if (isMobile) {
      return [
        require("/public/data_visualization/MacBook1@2x.png"),
        require("/public/data_visualization/MacBook2@2x.png"),
        require("/public/data_visualization/MacBook3@2x.png"),
      ];
    }

    return [
      require("/public/data_visualization/MacBook2@2x.png"),
      require("/public/data_visualization/MacBook1@2x.png"),
      require("/public/data_visualization/MacBook3@2x.png"),
    ];
  }, [isMobile]);

  return (
    <Layout description={t("empowering")} footer title={t("title")}>
      <Container className={styles.container} ref={topRef}>
        <HeaderCard
          desc_1st={t("empowering")}
          head_bg={
            isMobile
              ? "/data_visualization/head_bg_m@2x.png"
              : "/data_visualization/head_bg@2x.png"
          }
          title={t("title")}
        />
        <Stack>
          <Section
            desc={t("our")}
            title={t("data_visualization")}
            title_large_trans={t("free")}
          />
          <CtaButton
            className={styles.ctaButton}
            onClick={() => router.push("https://bigdipper.live/")}
          >
            {t("try_now")}
          </CtaButton>
          <Grid container spacing={theme.spacing(2)}>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("desc_1")}
                imageHref={imagesList[0]}
                title={t("always")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("desc_2")}
                imageHref={imagesList[1]}
                title={t("staking_tool")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("desc_3")}
                imageHref={imagesList[2]}
                title={t("governance_tool")}
              />
            </Grid>
          </Grid>
        </Stack>

        <Section
          desc={t("big_dipper")}
          title={t("customizable")}
          title_large_trans={t("networks")}
        />
      </Container>
      <Stack>
        <CardSwiper className={styles.swiper} imagesList={noteBook} />
        <ScrollToTop topRef={topRef} />
      </Stack>
    </Layout>
  );
};

export default AnalyticsTools;
