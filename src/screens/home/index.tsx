import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FC, useRef } from "react";

import { Layout, ScrollToBottom, ScrollToTop } from "@components";
import IntroPanel from "@src/components/Intro_panel";
import IntroCard from "@src/components/intro_card";
import { useWindowDimensions } from "@src/hooks";

import { FilterBG } from "./styles";

export type Page = {
  title: string;
  list: string[];
  imageHref: string;
  btnName: string;
  btnClick: string;
  id: string;
};

type Props = { pages: Page[] };

const Home: FC<Props> = ({ pages }) => {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const router = useRouter();
  const { isMobile, isTablet } = useWindowDimensions();
  const filteredPages = pages.reduce((pageList: Page[], current) => {
    // filter out forbole academy page
    if (
      current.btnClick !==
      "https://www.eventbrite.hk/e/-aug-22-29-tickets-686420260477?ref=forbole"
    ) {
      pageList.push(current);
    }

    return pageList;
  }, []);

  return (
    <Layout
      description={t("description")}
      footer
      redBg
      redBgFooter
      title={t("coBuildingInterchain")}
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
          ref={bottomRef}
          maxWidth={isTablet ? "tablet" : "desktop"}
          sx={{ zIndex: "1" }}
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
            columnSpacing={{ mobile: "0", laptop: theme.spacing(2) }}
            container
            rowSpacing={{ mobile: theme.spacing(2), laptop: theme.spacing(3) }}
          >
            <Grid item laptop={8} mobile={12}>
              <IntroPanel
                btn_Click={() => {
                  router.push("infrastructure");
                }}
                btnName={t("see_more")}
                desc={t("Validator_Infrastructure_desc")}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile@2x.png")
                    : require("/public/home/Desktop@2x.png")
                }
                img_not_response
                title={t("Validator_Infrastructure_title")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                btn_Click={() => {
                  router.push("staking-service");
                }}
                btnName={t("see_more")}
                desc={t("Native_Staking_Service_desc")}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-1@2x.png")
                    : require("/public/home/Desktop-1@2x.png")
                }
                img_not_response
                title={t("Native_Staking_Service_title")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                btn_Click={() => {
                  router.push("analytics-tools");
                }}
                btnName={t("see_more")}
                desc={t("Blockchain_Data_Analytics_Tools_desc")}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-2@2x.png")
                    : require("/public/home/Desktop-2@2x.png")
                }
                img_not_response
                title={t("Blockchain_Data_Analytics_Tools_title")}
              />
            </Grid>
            <Grid item laptop={8} mobile={12}>
              <IntroPanel
                btn_Click={() => {
                  router.push("developer-tools");
                }}
                btnName={t("see_more")}
                desc={t("Developer_Tools_desc")}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-3@2x.png")
                    : require("/public/home/Desktop-3@2x.png")
                }
                img_not_response
                title={t("Developer_Tools_title")}
              />
            </Grid>
            <Grid item laptop={8} mobile={12}>
              <IntroPanel
                btn_Click={() => {
                  router.push("enterprise-solution");
                }}
                btnName={t("see_more")}
                desc={t("Enterprise_Solution_desc")}
                imageHref={
                  isMobile
                    ? require("/public/home/mobile-4@2x.png")
                    : require("/public/home/Desktop-4@2x.png")
                }
                img_not_response
                title={t("Enterprise_Solution_title")}
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
          <Grid
            container
            spacing={theme.spacing(2)}
            sx={{
              justifyContent: "center",
            }}
          >
            {filteredPages.map(
              ({ title, list, imageHref, btnName, btnClick, id }, idx) => (
                <Grid key={`${id}_${idx}`} item laptop={4} mobile={12}>
                  <IntroCard
                    btnClick={() => router.push(btnClick)}
                    btnName={btnName}
                    disabled={!btnClick || false}
                    imageHref={imageHref}
                    list={list}
                    title={title}
                  />
                </Grid>
              ),
            )}
          </Grid>
          <Box mt="100px">
            <ScrollToTop topRef={topRef} />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
