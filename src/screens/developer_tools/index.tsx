import {
  Box,
  Container,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useState } from "react";

import SignatureCard from "@components/signature-card";
import { Layout, ScrollToTop } from "@src/components";
import IntroPanel from "@src/components/Intro_panel";
import CtaButton from "@src/components/cta-button";
import FourTable from "@src/components/four-table";
import HeaderCard from "@src/components/header-card";
import Section from "@src/components/section";
import SuccessModal from "@src/components/success-modal";
import TalkModal from "@src/components/talk-modal";

import useTalkModalForm from "./hooks";

const DeveloperTools = () => {
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    handleClear,
    canSubmit,
    handleCheckedChange,
    success,
    setSuccess,
    isLoading,
  } = useTalkModalForm();
  const router = useRouter();
  const { t } = useTranslation("developer_tools");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });
  const topRef = React.useRef(null);
  const [show, setShow] = useState(false);
  return (
    <Layout footer title={t("page_title")}>
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
          desc_1st={t("headercard_1st_desc")}
          desc_2nd={t("headercard_2nd_desc")}
          head_bg={
            isMobile
              ? "/developer_tools/mobile_headercard@2x.png"
              : "/developer_tools/desk_headercard@2x.png"
          }
          title={t("headercard_title")}
        />

        <Stack>
          <Section
            desc={t("section_1st_desc")}
            title={t("section_1st_title")}
            title_large={t("section_1st_large_title")}
          />
          <Stack
            sx={{
              flexDirection: "row",
              margin: "40px auto",
              gap: "16px",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
          >
            <CtaButton
              data-test="devtools-cta"
              onClick={() => {
                router.push("https://devtools.forbole.com");
              }}
            >
              {t("sign_up_now")}
            </CtaButton>
          </Stack>
          <Grid container spacing={theme.spacing(2)}>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                imageHref={
                  !isMobile
                    ? require("/public/developer_tools/desk_productcard_item_3@2x.png")
                    : require("/public/developer_tools/mobile_productcard_item_3@2x.png")
                }
                title={t("pinfo_item1")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                imageHref={
                  !isMobile
                    ? require("/public/developer_tools/desk_productcard_item_1@2x.png")
                    : require("/public/developer_tools/mobile_productcard_item_1@2x.png")
                }
                title={t("pinfo_item2")}
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                imageHref={
                  !isMobile
                    ? require("/public/developer_tools/desk_productcard_item_2@2x.png")
                    : require("/public/developer_tools/mobile_productcard_item_2@2x.png")
                }
                title={t("pinfo_item3")}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack>
          <Section title={t("section_2nd_title")} />
          <CtaButton
            onClick={() => {
              router.push("https://devtools.forbole.com");
            }}
            sx={{
              display: "block",
              margin: "40px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
          >
            {t("start_trial")}
          </CtaButton>
          <FourTable btnHref={() => setShow(true)} />
          <Stack
            sx={{
              mt: { laptop: "128px", mobile: "40px" },
              gap: "40px",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <Section title_large={t("signature")} />
            <Box
              sx={{
                maxWidth: { laptop: "1100px", mobile: "65%" },
                alignSelf: "center",
              }}
            >
              <SignatureCard />
            </Box>
          </Stack>
        </Stack>

        <Stack maxWidth="desktop">
          <Section
            desc={t("section_4th_large_title")}
            title_large_trans={t("section_4th_title")}
          />
          <CtaButton
            onClick={() => {
              setShow(true);
            }}
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
        </Stack>

        <ScrollToTop topRef={topRef} />
      </Container>

      <TalkModal
        canSubmit={canSubmit}
        close={setShow}
        handleCheckedChange={handleCheckedChange}
        handleClear={handleClear}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        inputs={inputs}
        isLoading={isLoading}
        open={show}
      />
      <SuccessModal
        bottom_word={isMobile ? t("thanks") : ""}
        close={(b) => {
          setSuccess(b);
          setShow(b);
        }}
        fixed
        middle_word={!isMobile ? t("thanks") : ""}
        open={success}
        up_word={t("contact")}
      />
    </Layout>
  );
};
export default DeveloperTools;
