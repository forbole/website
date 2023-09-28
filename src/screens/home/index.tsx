import useTranslation from "next-translate/useTranslation";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Layout, ScrollToBottom, ScrollToTop } from "@components";
import { useWindowDimensions } from "@src/hooks";
import { FilterBG } from "./styles";
import IntroPanel from "@src/components/Intro_panel";
import IntroCard from "@src/components/intro_card";
import React from "react";
import { useRouter } from "next/router";

type Props = {
  pages: {
    title: string;
    list: string[];
    imageHref: string;
    btnName: string;
    btnClick: string;
    id: string;
  }[];
};

const Home: React.FC<Props> = ({ pages }) => {
  const { t, lang } = useTranslation("home");
  const theme = useTheme();
  const topRef = React.useRef(null);
  const bottomRef = React.useRef(null);
  const router = useRouter();
  const { windowDimensions, isMobile, isTablet } = useWindowDimensions();
  const { width } = windowDimensions;
  return (
    <Layout
      navLink="/"
      title={t("coBuildingInterchain")}
      description={t("description")}
      footer
      homeAnimation
      redBgFooter
      redBg
    >
      <Box ref={topRef}>
        <Container
          disableGutters
          sx={{
            position: "relative",
            [theme.breakpoints.between("mobile", 550)]: {
              minHeight: "100vh",
            },
          }}
        >
          <Stack
            alignItems="center"
            mt="47%"
            sx={{
              [theme.breakpoints.between("mobile", 550)]: {
                position: "absolute",
                top: 0,
                left: "0",
                right: "0",
                margin: "auto",
                marginTop: "126%",
                zIndex: "1",
              },
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                textShadow: "0px 0px 20px rgba(0, 0, 0, 0.60)",
                letterSpacing: "0.832px",
                [theme.breakpoints.up("laptop")]: {
                  fontSize: "64px",
                  mb: "65px",
                },
                [theme.breakpoints.up("tablet")]: {
                  fontSize: "48px",
                  mb: "65px",
                },
                [theme.breakpoints.down("tablet")]: {
                  fontSize: "32px",
                  mb: "22px",
                  px: "10%",
                },
              }}
            >
              {t("coBuildingInterchain")}
            </Typography>
            <ScrollToBottom bottomRef={bottomRef} />
            <FilterBG />
          </Stack>
        </Container>
        <Container
          maxWidth={isTablet ? "tablet" : "desktop"}
          sx={{ zIndex: "1" }}
          ref={bottomRef}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#202A43",
              [theme.breakpoints.down("laptop")]: {
                fontSize: "24px",
                m: "50px 0 32px 0",
              },
              [theme.breakpoints.up("laptop")]: {
                fontSize: "40px",
                m: "200px 0 60px 0",
              },
            }}
          >
            {t("title")}
          </Typography>
          <Grid
            container
            rowSpacing={{ mobile: theme.spacing(2), laptop: theme.spacing(3) }}
            columnSpacing={{ mobile: "0", laptop: theme.spacing(2) }}
          >
            <Grid item mobile={12} laptop={8}>
              <IntroPanel
                title={t("Validator_Infrastructure_title")}
                desc={t("Validator_Infrastructure_desc")}
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("infrastructure");
                }}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile@2x.png")
                    : require("/public/home/Desktop@2x.png")
                }
                img_not_response
              />
            </Grid>
            <Grid item mobile={12} laptop={4}>
              <IntroPanel
                title={t("Native_Staking_Service_title")}
                desc={t("Native_Staking_Service_desc")}
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("staking-service");
                }}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-1@2x.png")
                    : require("/public/home/Desktop-1@2x.png")
                }
                img_not_response
              />
            </Grid>
            <Grid item mobile={12} laptop={4}>
              <IntroPanel
                title={t("Blockchain_Data_Analytics_Tools_title")}
                desc={t("Blockchain_Data_Analytics_Tools_desc")}
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("analytics-tools");
                }}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-2@2x.png")
                    : require("/public/home/Desktop-2@2x.png")
                }
                img_not_response
              />
            </Grid>
            <Grid item mobile={12} laptop={8}>
              <IntroPanel
                title={t("Developer_Tools_title")}
                desc={t("Developer_Tools_desc")}
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("developer-tools");
                }}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-3@2x.png")
                    : require("/public/home/Desktop-3@2x.png")
                }
                img_not_response
              />
            </Grid>
            <Grid item mobile={12} laptop={8}>
              <IntroPanel
                title={t("Enterprise_Solution_title")}
                desc={t("Enterprise_Solution_desc")}
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("enterprise-solution");
                }}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-4@2x.png")
                    : require("/public/home/Desktop-4@2x.png")
                }
                img_not_response
              />
            </Grid>
            <Grid item mobile={12} laptop={4}>
              <IntroPanel
                title={t("Forbole_Academy_title")}
                desc={t("Forbole_Academy_desc")}
                btnName={t("coming_soon")}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-5@2x.png")
                    : require("/public/home/Desktop-5@2x.png")
                }
                img_not_response
                disabled={true}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#202A43",
              [theme.breakpoints.down("laptop")]: {
                fontSize: "24px",
                p: "48px 0 32px 0",
              },
              [theme.breakpoints.up("laptop")]: {
                fontSize: "40px",
                p: "122px 0 40px 0",
              },
            }}
          >
            {t("What_is_New?")}
          </Typography>
          <Grid container spacing={theme.spacing(2)}>
            {pages.map(({ title, list, imageHref, btnName, btnClick, id }) => {
              return (
                <Grid item laptop={4} mobile={12} key={id}>
                  <IntroCard
                    title={title}
                    list={list}
                    imageHref={imageHref}
                    btnName={btnName}
                    btnClick={() => router.push(btnClick)}
                    disabled={!btnClick || false}
                  ></IntroCard>
                </Grid>
              );
            })}
          </Grid>
          <Box mt="100px">
            <ScrollToTop topRef={topRef}></ScrollToTop>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
