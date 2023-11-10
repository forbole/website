import { Container, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Layout, ScrollToTop } from "@src/components";
import IntroPanel from "@src/components/Intro_panel";
import CardSwiper from "@src/components/cardSwiper";
import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import Section from "@src/components/section";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

const AnalyticsTools = () => {
  const topRef = React.useRef(null);
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
    <Layout footer title={t("title")}>
      <Container
        ref={topRef}
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
            onClick={() => router.push("https://bigdipper.live/")}
            sx={{
              display: "block",
              margin: "40px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
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
        <CardSwiper imagesList={noteBook} style={{ marginTop: "40px" }} />
        <ScrollToTop topRef={topRef} />
      </Stack>
    </Layout>
  );
};
export default AnalyticsTools;
