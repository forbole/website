import { Container, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import type { MouseEvent } from "react";
import { useRef } from "react";

import IntroPanel from "@src/components/Intro_panel";
import ContactFrom from "@src/components/contact-form";
import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import Section from "@src/components/section";
import SuccessModal from "@src/components/success-modal";

import useContactForm from "./hook";
import * as styles from "./index.module.scss";

const EnterpriseSolution = () => {
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    canSubmit,
    success,
    setSuccess,
    isLoading,
  } = useContactForm();

  const topRef = useRef(null);
  const ContactRef = useRef(null);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });

  const { t } = useTranslation("enterprise_solution");

  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();

    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <Layout description={t("trusted")} footer title={t("page_title")}>
      <Container className={styles.container} ref={topRef}>
        <HeaderCard
          desc_1st={t("trusted")}
          head_bg={
            isMobile
              ? "/enterprise_solution/head_bg_m@2x.png"
              : "/enterprise_solution/head_bg@2x.png"
          }
          title={t("enterprise_solution")}
        />
        <Stack>
          <Section
            desc={t("provides")}
            maxWidth="900px"
            title={t("technical_consultation")}
            title_large_trans={t("customized")}
          />
          <CtaButton
            className={styles.ctaButton}
            onClick={(e: MouseEvent<HTMLElement>) => scrollToRef(e, ContactRef)}
          >
            {t("talk_to_us")}
          </CtaButton>
          <Grid container spacing={theme.spacing(2)}>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                imageHref={
                  isMobile
                    ? require("/public/enterprise_solution/c1_m@2x.png")
                    : require("/public/enterprise_solution/c1@2x.png")
                }
                title={t("API")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                imageHref={
                  isMobile
                    ? require("/public/enterprise_solution/c2_m@2x.png")
                    : require("/public/enterprise_solution/c2@2x.png")
                }
                title={t("collection")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                imageHref={
                  isMobile
                    ? require("/public/enterprise_solution/c3_m@2x.png")
                    : require("/public/enterprise_solution/c3@2x.png")
                }
                title={t("decentralized")}
              />
            </Grid>
          </Grid>
        </Stack>
        <Stack mx="auto">
          <Section
            desc={t("our")}
            maxWidth="750px"
            title={t("contact")}
            title_large_trans={t("get")}
          />
          <ContactFrom
            canSubmit={canSubmit}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            inputs={inputs}
            isLoading={isLoading}
            ref={ContactRef}
          />
          <ScrollToTop topRef={topRef} />
        </Stack>
        <SuccessModal
          bottom_word={isMobile ? t("thanks") : ""}
          close={setSuccess}
          fixed
          middle_word={!isMobile ? t("success") : ""}
          open={success}
          up_word={t("contact_soon")}
        />
      </Container>
    </Layout>
  );
};

export default EnterpriseSolution;
