import { Container, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";

import { Layout, ScrollToTop } from "@src/components";
import IntroPanel from "@src/components/Intro_panel";
import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import { Horse } from "@src/components/icons";
import KeyData from "@src/components/key_data";
import ScrollLogo from "@src/components/scroll_logo";
import Section from "@src/components/section";

const StakingService = () => {
  const { t } = useTranslation("staking_service");
  const topRef = React.useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });
  const router = useRouter();

  return (
    <Layout description={t("desc")} footer title={t("page_title")}>
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
        <HeaderCard
          desc_1st={t("desc")}
          head_bg={
            isMobile
              ? "/staking_service/head_bg_m@2x.png"
              : "/staking_service/head_bg@2x.png"
          }
          title={t("title")}
        />

        <KeyData />

        <Stack
          sx={{
            gap: "40px",
            [theme.breakpoints.down("laptop")]: {
              gap: "32px",
            },
          }}
        >
          <Section
            desc={t("section_1st_desc")}
            title={t("section_1st_title")}
            title_large_trans={t("section_1st_large_title")}
          />
          <ScrollLogo />
        </Stack>

        <Stack>
          <Section
            desc={t("section_2nd_desc")}
            title={t("section_2nd_title")}
            title_large_trans={t("section_2nd_large_title")}
          />
          <CtaButton
            onClick={() => {
              router.push("/staking");
            }}
            sx={{
              display: "block",
              margin: "54px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
          >
            {t("stake_now")}
          </CtaButton>
          <Grid container spacing={theme.spacing(2)}>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("grid_1st_desc")}
                imageHref={
                  isMobile
                    ? require("/public/staking_service/mobile_section_3@2x.png")
                    : require("/public/staking_service/desk_section_3@2x.png")
                }
                title={t("grid_1st_title")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("grid_2nd_desc")}
                imageHref={
                  isMobile
                    ? require("/public/staking_service/mobile_section_1@2x.png")
                    : require("/public/staking_service/desk_section_1@2x.png")
                }
                title={t("grid_2nd_title")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("grid_3rd_desc")}
                imageHref={
                  isMobile
                    ? require("/public/staking_service/mobile_section_2@2x.png")
                    : require("/public/staking_service/desk_section_2@2x.png")
                }
                title={t("grid_3rd_title")}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack>
          <Section
            desc={t("section_3rd_desc")}
            title={t("section_3rd_title")}
            title_large_trans={t("section_3rd_large_title")}
          />
          <CtaButton
            onClick={() => {
              router.push("/staking");
            }}
            sx={{
              display: "block",
              margin: "54px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
          >
            {t("stake_now")}
          </CtaButton>
          <Horse style={{ display: "block", margin: "0 auto" }} />
          <ScrollToTop topRef={topRef} />
        </Stack>
      </Container>
    </Layout>
  );
};
export default StakingService;
