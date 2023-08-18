import { Container, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Layout, ScrollToTop } from '@src/components';
import React, { useState } from 'react';
import Section from '@src/components/section';
import CtaButton from '@src/components/cta-button';
import IntroPanel from '@src/components/Intro_panel';
import FourTable from '@src/components/four-table';
import HeaderCard from '@src/components/header-card';
import useTranslation from 'next-translate/useTranslation';
import TalkModal from '@src/components/talk-modal';

import SuccessModal from '@src/components/success-modal';
import useTalkModalForm from './hooks';

const DeveloperTools = () => {
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    handleClear,
    canSubmit,
    handleCheckedChange,
    success,
    setSuccess,isLoading
  } = useTalkModalForm();
  const { t } = useTranslation("developer_tools");
  const theme = useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down('tablet'),{noSsr:true})
  const topRef = React.useRef(null);
  let [show, setShow] = useState(false);

  return (
    <Layout title={t("page_title")} navLink="/products" footer>
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
          title={t("headercard_title")}
          desc_1st={t("headercard_1st_desc")}
          desc_2nd={t("headercard_2nd_desc")}
          head_bg={
            isMobile
              ? "/developer_tools/mobile_headercard@2x.png"
              : "/developer_tools/desk_headercard@2x.png"
          }
        />

        <Stack>
          <Section
            title={t("section_1st_title")}
            title_large={t("section_1st_large_title")}
            desc={t("section_1st_desc")}
          />
          <CtaButton
            sx={{
              display: "block",
              margin: "40px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
            onClick={() => {
              setShow(true);
            }}
          >
            {t("sign_up_now")}
          </CtaButton>
          <Grid container spacing={theme.spacing(2)}>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                title={t("pinfo_item1")}
                imageHref={
                  !isMobile
                  ? require("/public/developer_tools/desk_productcard_item_3@2x.png")
                  : require("/public/developer_tools/mobile_productcard_item_3@2x.png")
                }
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                title={t("pinfo_item2")}
                imageHref={
                  !isMobile
                  ? require("/public/developer_tools/desk_productcard_item_1@2x.png")
                  : require("/public/developer_tools/mobile_productcard_item_1@2x.png")

                }
              />
            </Grid>
            <Grid item laptop={4} mobile={12}>
              <IntroPanel
                title={t("pinfo_item3")}
                imageHref={
                  !isMobile
                  ? require("/public/developer_tools/desk_productcard_item_2@2x.png")
                  : require("/public/developer_tools/mobile_productcard_item_2@2x.png")

                }
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack>
          <Section
            title={t("section_2nd_title")}
            // title_large={t("section_2nd_large_title")}
          />
          <CtaButton
            sx={{
              display: "block",
              margin: "40px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
            onClick={() => {
              setShow(true);
            }}
          >
            {t("start_trial")}
          </CtaButton>
          <FourTable></FourTable>
        </Stack>

        <Stack maxWidth="desktop">
          <Section title_large_trans={t('section_4th_title')} desc={t("section_4th_large_title")}/>
          <CtaButton
            sx={{
              display: "block",
              margin: "40px auto",
              [theme.breakpoints.down("laptop")]: {
                my: "32px",
              },
            }}
            onClick={() => {
              setShow(true);
            }}
          >
            {t("sign_up_now")}
          </CtaButton>
        </Stack>

        <ScrollToTop topRef={topRef}></ScrollToTop>
      </Container>

      <TalkModal
        open={show}
        close={setShow}
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        canSubmit={canSubmit}
        handleCheckedChange={handleCheckedChange}
        isLoading={isLoading}
      />
      <SuccessModal
        open={success}
        fixed
        close={(b)=>{setSuccess(b);setShow(b)}}
        up_word={t("contact")}
        middle_word={!isMobile ? t("thanks") : ""}
        bottom_word={isMobile ? t("thanks") : ""}
      />
    </Layout>
  );
};
export default DeveloperTools;
