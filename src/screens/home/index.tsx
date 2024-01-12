import { Container, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useTranslation from "next-translate/useTranslation";
import type { FC } from "react";
import { useRef } from "react";

import IntroCard from "@src/components/intro_card";
import IntroPanel from "@src/components/intro_panel";
import Layout from "@src/components/layout";
import ScrollToBottom from "@src/components/scroll_to_bottom";
import ScrollToTop from "@src/components/scroll_to_top";

import * as styles from "./index.module.scss";

export type Page = {
  btnClick: string;
  btnName: string;
  id: string;
  imageHref: string;
  list: string[];
  title: string;
};

type Props = { pages: Page[] };

const Home: FC<Props> = ({ pages }) => {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const topRef = useRef(null);
  const bottomRef = useRef(null);

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
      <div ref={topRef}>
        <Container className={styles.container} disableGutters>
          <Stack className={styles.stack}>
            <h1 className={styles.topTitle}>{t("coBuildingInterchain")}</h1>
            <ScrollToBottom bottomRef={bottomRef} />
            <div className={styles.filterBg} />
          </Stack>
        </Container>
        <div className={styles.containerTitle} ref={bottomRef}>
          <h2 className={styles.title}>{t("title")}</h2>
          <Grid
            className={styles.grid}
            columnSpacing={{ laptop: theme.spacing(2), mobile: "0" }}
            container
            rowSpacing={{ laptop: theme.spacing(3), mobile: theme.spacing(2) }}
          >
            <Grid item laptop={8} mobile={12}>
              <IntroPanel
                btnLink="/infrastructure"
                btnName={t("see_more")}
                desc={t("Validator_Infrastructure_desc")}
                imageHrefs={[
                  require("/public/home/mobile@2x.png"),
                  require("/public/home/Desktop@2x.png"),
                ]}
                img_not_response
                title={t("Validator_Infrastructure_title")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                btnLink="/staking-service"
                btnName={t("see_more")}
                desc={t("Native_Staking_Service_desc")}
                imageHrefs={[
                  require("/public/home/mobile-1@2x.png"),
                  require("/public/home/Desktop-1@2x.png"),
                ]}
                img_not_response
                title={t("Native_Staking_Service_title")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                btnLink="/analytics-tools"
                btnName={t("see_more")}
                desc={t("Blockchain_Data_Analytics_Tools_desc")}
                imageHrefs={[
                  require("/public/home/mobile-2@2x.png"),
                  require("/public/home/Desktop-2@2x.png"),
                ]}
                img_not_response
                title={t("Blockchain_Data_Analytics_Tools_title")}
              />
            </Grid>
            <Grid item laptop={8} mobile={12}>
              <IntroPanel
                btnLink="/developer-tools"
                btnName={t("see_more")}
                desc={t("Developer_Tools_desc")}
                imageHrefs={[
                  require("/public/home/mobile-3@2x.png"),
                  require("/public/home/Desktop-3@2x.png"),
                ]}
                img_not_response
                title={t("Developer_Tools_title")}
              />
            </Grid>
            <Grid item laptop={8} mobile={12}>
              <IntroPanel
                btnLink="/enterprise-solution"
                btnName={t("see_more")}
                desc={t("Enterprise_Solution_desc")}
                imageHrefs={[
                  require("/public/home/mobile-4@2x.png"),
                  require("/public/home/Desktop-4@2x.png"),
                ]}
                img_not_response
                title={t("Enterprise_Solution_title")}
              />
            </Grid>
          </Grid>
          <h2 className={styles.whatIsNew}>{t("What_is_New?")}</h2>
          <Grid
            className={[styles.introCard, styles.grid].join(" ")}
            container
            spacing={theme.spacing(2)}
          >
            {filteredPages.map(
              ({ btnClick, btnName, id, imageHref, list, title }, idx) => (
                <Grid item key={`${id}_${idx}`} laptop={4} mobile={12}>
                  <IntroCard
                    btnLink={btnClick}
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
          <div className={styles.scrollTop}>
            <ScrollToTop topRef={topRef} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
