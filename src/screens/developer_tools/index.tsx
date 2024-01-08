import { Container, Grid, Stack, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState } from "react";

import CtaButton, { CtaLink } from "@src/components/cta-button";
import FourTable from "@src/components/four-table";
import HeaderCard from "@src/components/header-card";
import IntroPanel from "@src/components/intro_panel";
import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";
import Section from "@src/components/section";
import SignatureCard from "@src/components/signature-card";
import SuccessModal from "@src/components/success-modal";
import TalkModal from "@src/components/talk-modal";
import { useDelayedIsMobile } from "@src/hooks/delayed_is_mobile";

import useTalkModalForm from "./hooks";
import * as styles from "./index.module.scss";

type Props = {
  setShow: (b: boolean) => void;
  setSuccess: (b: boolean) => void;
  success: boolean;
};

const ResultModal = ({ setShow, setSuccess, success }: Props) => {
  const isMobile = useDelayedIsMobile();
  const { t } = useTranslation("developer_tools");

  return (
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
  );
};

const DeveloperTools = () => {
  const { t } = useTranslation("developer_tools");

  const {
    canSubmit,
    handleCheckedChange,
    handleClear,
    handleInputChange,
    handleSubmit,
    inputs,
    isLoading,
    setSuccess,
    success,
  } = useTalkModalForm();

  const theme = useTheme();

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
            <CtaLink
              data-test="devtools-cta"
              href="https://devtools.forbole.com"
            >
              {t("sign_up_now")}
            </CtaLink>
          </Stack>
          <Grid container spacing={theme.spacing(2)}>
            <Grid className={styles.card} item laptop={4} mobile={12}>
              <IntroPanel
                imageAlt="RPC service"
                imageHrefs={[
                  require("/public/developer_tools/mobile_productcard_item_3@2x.png"),
                  require("/public/developer_tools/desk_productcard_item_3@2x.png"),
                ]}
                title={t("pinfo_item1")}
              />
            </Grid>
            <Grid className={styles.card} item laptop={4} mobile={12}>
              <span className={styles.label}>{t("common:coming_soon")}</span>
              <IntroPanel
                imageAlt="GraphQL service"
                imageHrefs={[
                  require("/public/developer_tools/mobile_productcard_item_1@2x.png"),
                  require("/public/developer_tools/desk_productcard_item_1@2x.png"),
                ]}
                title={t("pinfo_item2")}
              />
            </Grid>
            <Grid className={styles.card} item laptop={4} mobile={12}>
              <IntroPanel
                imageAlt="Data API service"
                imageHrefs={[
                  require("/public/developer_tools/mobile_productcard_item_2@2x.png"),
                  require("/public/developer_tools/desk_productcard_item_2@2x.png"),
                ]}
                title={t("pinfo_item3")}
              />
            </Grid>
          </Grid>
        </Stack>
        <Stack>
          <Section title={t("section_2nd_title")} />
          <CtaLink
            className={styles.ctaButton}
            href="https://devtools.forbole.com"
          >
            {t("start_trial")}
          </CtaLink>
          <FourTable btnHref={() => setShow(true)} />
          <Stack className={styles.signatureStack}>
            <Section title_large={t("signature")} />
            <div className={styles.signatureBox}>
              <SignatureCard />
            </div>
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
      <ResultModal
        setShow={setShow}
        setSuccess={setSuccess}
        success={success}
      />
    </Layout>
  );
};

export default DeveloperTools;
