import { Container, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Layout, ScrollToTop } from "@src/components";
import IntroPanel from "@src/components/Intro_panel";
import ContactFrom from "@src/components/contact-form";
import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import Section from "@src/components/section";
import SuccessModal from "@src/components/success-modal";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useContactForm from "./hook";

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

  const topRef = React.useRef(null);
  const ContactRef = React.useRef(null);
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
    <Layout title={t("page_title")} footer>
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
          title={t("enterprise_solution")}
          desc_1st={t("trusted")}
          head_bg={
            isMobile
              ? "/enterprise_solution/head_bg_m@2x.png"
              : "/enterprise_solution/head_bg@2x.png"
          }
        />
        <Stack>
          <Section
            maxWidth="900px"
            title={t("technical_consultation")}
            title_large_trans={t("customized")}
            desc={t("provides")}
          />
          <CtaButton
            sx={{
              display: "block",
              margin: "80px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              scrollToRef(e, ContactRef)
            }
          >
            {t("talk_to_us")}
          </CtaButton>
          <Grid container spacing={theme.spacing(2)}>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                title={t("API")}
                imageHref={
                  isMobile
                    ? require("/public/enterprise_solution/c1_m@2x.png")
                    : require("/public/enterprise_solution/c1@2x.png")
                }
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                title={t("collection")}
                imageHref={
                  isMobile
                    ? require("/public/enterprise_solution/c2_m@2x.png")
                    : require("/public/enterprise_solution/c2@2x.png")
                }
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                title={t("decentralized")}
                imageHref={
                  isMobile
                    ? require("/public/enterprise_solution/c3_m@2x.png")
                    : require("/public/enterprise_solution/c3@2x.png")
                }
              />
            </Grid>
          </Grid>
        </Stack>

        {/*  <Stack>
          <Section
            title={t("testimonials")}
            title_large_trans={t("building")}
            desc={t("services")}
          />
          <Carousel></Carousel>
          <CtaButton
            sx={{
              display: "block",
              margin: "40px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              scrollToRef(e, ContactRef)
            }
          >
            {t("talk_to_us")}
          </CtaButton>
        </Stack>
 */}
        <Stack mx="auto">
          <Section
            maxWidth="750px"
            title={t("contact")}
            title_large_trans={t("get")}
            desc={t("our")}
          />
          <ContactFrom
            ref={ContactRef}
            inputs={inputs}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            canSubmit={canSubmit}
            isLoading={isLoading}
          />
          <ScrollToTop topRef={topRef} />
        </Stack>
        <SuccessModal
          fixed
          open={success}
          close={setSuccess}
          up_word={t("contact_soon")}
          middle_word={!isMobile ? t("success") : ""}
          bottom_word={isMobile ? t("thanks") : ""}
        />
      </Container>
    </Layout>
  );
};
export default EnterpriseSolution;
