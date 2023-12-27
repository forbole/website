import {
  Box,
  Container,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRef, useState } from "react";

import IntroPanel from "@src/components/Intro_panel";
import CtaButton from "@src/components/cta-button";
import FourTable from "@src/components/four-table";
import HeaderCard from "@src/components/header-card";
import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import Section from "@src/components/section";
import SignatureCard from "@src/components/signature-card";
import SuccessModal from "@src/components/success-modal";
import TalkModal from "@src/components/talk-modal";

import useTalkModalForm from "./hooks";
import * as styles from "./index.module.scss";

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

  const { t } = useTranslation("developer_tools");
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });

  const topRef = useRef(null);
  const [show, setShow] = useState(false);

  return (
    <Layout
      description={t("headercard_1st_desc")}
      footer
      title={t("page_title")}
    >
      <Container className={styles.container} ref={topRef}>
        <HeaderCard
          desc_1st={t("headercard_1st_desc")}
          desc_2nd={t("headercard_2nd_desc")}
          head_bgs={[
            "/developer_tools/mobile_headercard@2x.png",
            "/developer_tools/desk_headercard@2x.png",
          ]}
          title={t("headercard_title")}
        />

        <Stack>
          <Section
            desc={t("section_1st_desc")}
            title={t("section_1st_title")}
            title_large={t("section_1st_large_title")}
          />
          <Stack className={styles.ctaStack}>
            <Link href="https://devtools.forbole.com">
              <CtaButton data-test="devtools-cta">{t("sign_up_now")}</CtaButton>
            </Link>
          </Stack>
          <Grid container spacing={theme.spacing(2)}>
            <Grid className={styles.card} item laptop={4} mobile={12}>
              <IntroPanel
                imageAlt="RPC service"
                imageHref={
                  !isMobile
                    ? require("/public/developer_tools/desk_productcard_item_3@2x.png")
                    : require("/public/developer_tools/mobile_productcard_item_3@2x.png")
                }
                title={t("pinfo_item1")}
              />
            </Grid>
            <Grid className={styles.card} item laptop={4} mobile={12}>
              <span className={styles.label}>{t("common:coming_soon")}</span>
              <IntroPanel
                imageAlt="GraphQL service"
                imageHref={
                  !isMobile
                    ? require("/public/developer_tools/desk_productcard_item_1@2x.png")
                    : require("/public/developer_tools/mobile_productcard_item_1@2x.png")
                }
                title={t("pinfo_item2")}
              />
            </Grid>
            <Grid className={styles.card} item laptop={4} mobile={12}>
              <IntroPanel
                imageAlt="Data API service"
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
          <Link href="https://devtools.forbole.com">
            <CtaButton className={styles.ctaButton}>
              {t("start_trial")}
            </CtaButton>
          </Link>
          <FourTable btnHref={() => setShow(true)} />
          <Stack className={styles.signatureStack}>
            <Section title_large={t("signature")} />
            <Box className={styles.signatureBox}>
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
            className={styles.ctaButton}
            onClick={() => {
              setShow(true);
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
