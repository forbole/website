import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useRef } from "react";

import IntroPanel from "@src/components/Intro_panel";
import IntroCard from "@src/components/intro_card";
import Layout from "@src/components/layout";
import ScrollToBottom from "@src/components/scroll_to_bottom";
import ScrollToTop from "@src/components/scroll_to_top";
import { useWindowDimensions } from "@src/hooks/get_screen_size";

import * as styles from "./index.module.scss";
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
      displayHorse
      footer
      redBgFooter
      title={t("coBuildingInterchain")}
    >
      <Box ref={topRef}>
        <Container className={styles.container} disableGutters>
          <Stack className={styles.stack}>
            <Typography className={styles.topTitle}>
              {t("coBuildingInterchain")}
            </Typography>
            <ScrollToBottom bottomRef={bottomRef} />
            <FilterBG />
          </Stack>
        </Container>
        <Container
          className={styles.containerTitle}
          maxWidth={isTablet ? "tablet" : "desktop"}
          ref={bottomRef}
        >
          <Typography className={styles.title}>{t("title")}</Typography>
          <Grid
            columnSpacing={{ mobile: "0", laptop: theme.spacing(2) }}
            container
            rowSpacing={{ mobile: theme.spacing(2), laptop: theme.spacing(3) }}
          >
            <Grid item laptop={8} mobile={12}>
              <IntroPanel
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("infrastructure");
                }}
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
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("staking-service");
                }}
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
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("analytics-tools");
                }}
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
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("developer-tools");
                }}
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
                btnName={t("see_more")}
                btn_Click={() => {
                  router.push("enterprise-solution");
                }}
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
          <Typography className={styles.whatIsNew}>
            {t("What_is_New?")}
          </Typography>
          <Grid
            className={styles.introCard}
            container
            spacing={theme.spacing(2)}
          >
            {filteredPages.map(
              ({ title, list, imageHref, btnName, btnClick, id }, idx) => (
                <Grid item key={`${id}_${idx}`} laptop={4} mobile={12}>
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
          <Box className={styles.scrollTop}>
            <ScrollToTop topRef={topRef} />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
