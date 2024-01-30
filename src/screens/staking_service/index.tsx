import { Grid, Stack } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useRef } from "react";

import { CtaLink } from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import Horse from "@src/components/icons/horse.svg";
import IntroPanel from "@src/components/intro_panel";
import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import Section from "@src/components/section";
import * as commonStyles from "@src/styles/common.module.scss";

import * as styles from "./index.module.scss";

const Stats = dynamic(
  () => import("@src/components/stats").then((mod) => mod.StatsWithProvider),
  {
    ssr: false,
  },
) as FC<{ red?: boolean }>;

const StakingService = () => {
  const { t } = useTranslation("staking_service");
  const topRef = useRef(null);

  const horseStyle = {
    style: { display: "block", margin: "0 auto" },
  };

  return (
    <Layout description={t("desc")} footer title={t("page_title")}>
      <div className={commonStyles.pageContainer} ref={topRef}>
        <HeaderCard
          desc_1st={t("desc")}
          head_bgs={[
            "/staking_service/head_bg_m@2x.png",
            "/staking_service/head_bg@2x.png",
          ]}
          title={t("title")}
        />

        <Stats red />

        <Stack className={styles.topStack}>
          <Section
            desc={t("section_1st_desc")}
            title={t("section_1st_title")}
            title_large_trans={t("section_1st_large_title")}
          />
        </Stack>

        <Stack>
          <Section
            desc={t("section_2nd_desc")}
            title={t("section_2nd_title")}
            title_large_trans={t("section_2nd_large_title")}
          />
          <CtaLink className={styles.stakingCta} href="/staking">
            {t("stake_now")}
          </CtaLink>
          <Grid container spacing={2}>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("grid_1st_desc")}
                imageHrefs={[
                  require("/public/staking_service/mobile_section_3@2x.png"),
                  require("/public/staking_service/desk_section_3@2x.png"),
                ]}
                level={2}
                title={t("grid_1st_title")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("grid_2nd_desc")}
                imageHrefs={[
                  require("/public/staking_service/mobile_section_1@2x.png"),
                  require("/public/staking_service/desk_section_1@2x.png"),
                ]}
                level={2}
                title={t("grid_2nd_title")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                desc={t("grid_3rd_desc")}
                imageHrefs={[
                  require("/public/staking_service/mobile_section_2@2x.png"),
                  require("/public/staking_service/desk_section_2@2x.png"),
                ]}
                level={2}
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
          <CtaLink className={styles.stakingCta} href="/staking">
            {t("stake_now")}
          </CtaLink>
          <Horse {...horseStyle} />
          <ScrollToTop topRef={topRef} />
        </Stack>
      </div>
    </Layout>
  );
};

export default StakingService;
