import { Box, Container, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";

import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import Layout from "@src/components/layout";
import ProductPanel from "@src/components/product-panel";
import ScrollToTop from "@src/components/scroll_to_top";
import { StyledTab, StyledTabs } from "@src/components/selection-tab";
import { scrollBottom } from "@src/utils/scroll";

import * as styles from "./index.module.scss";

const Trans = dynamic(async () => import("next-translate/Trans"), {
  ssr: false,
});

const Products = () => {
  const { t } = useTranslation("products");

  const individuals = useMemo(
    () => [
      {
        title: t("staking"),
        benefits: [t("earn"), t("secure"), t("ownership")],
        usecases: [t("stake"), t("income")],
        imageHref: "/products/tab2@2x.png",
        imageHref_m: "/products/tab2_m@2x.png",
        btnName: t("seemore"),
        btnHref: "/staking-service",
      },
      {
        title: t("analytics"),
        benefits: [t("real-time"), t("bird-eye-view"), t("free")],
        usecases: [t("transactions"), t("viewandvote")],
        imageHref: "/products/tab3@2x.png",
        imageHref_m: "/products/tab3_m@2x.png",
        btnName: t("seemore"),
        btnHref: "/analytics-tools",
      },
      {
        title: t("developer"),
        benefits: [t("nodes"), t("free-trial"), t("pricing")],
        usecases: [t("RPC"), t("GraphQL"), t("data-api")],
        imageHref: "/products/tab4@2x.png",
        imageHref_m: "/products/tab4_m@2x.png",
        btnName: t("seemore"),
        btnHref: "/developer-tools",
      },
    ],
    [t],
  );

  const businesses = useMemo(
    () => [
      {
        title: t("validator-infrastructure"),
        benefits: [t("security"), t("expertise"), t("record")],
        usecases: [t("new-network"), t("strengthen-network")],
        imageHref: "/products/tab1@2x.png",
        imageHref_m: "/products/tab1_m@2x.png",
        btnName: t("seemore"),
        btnHref: "/infrastructure",
      },
      {
        title: t("staking"),
        benefits: [t("100% control"), t("asset-variety"), t("balance")],
        usecases: [t("stake-token"), t("stake-of-clients")],
        imageHref: "/products/tab2@2x.png",
        imageHref_m: "/products/tab2_m@2x.png",
        btnName: t("seemore"),
        btnHref: "/staking-service",
      },
      {
        title: t("analytics"),
        benefits: [
          t("custom-visualization"),
          t("modularized-development"),
          t("fast"),
        ],
        usecases: [t("own-explorer"), t("query-data")],
        imageHref: "/products/tab3@2x.png",
        imageHref_m: "/products/tab3_m@2x.png",
        btnName: t("seemore"),
        btnHref: "/analytics-tools",
      },
      {
        title: t("developer"),
        benefits: [t("high"), t("custom-offering"), t("team-support")],
        usecases: [
          t("run-decentralized-apps"),
          t("analyze-decentralized-apps"),
        ],
        imageHref: "/products/tab4@2x.png",
        imageHref_m: "/products/tab4_m@2x.png",
        btnName: t("seemore"),
        btnHref: "/developer-tools",
      },
      {
        title: t("enterprise-solution"),
        benefits: [t("free-consultation"), t("iteration"), t("end-to-end")],
        usecases: [t("staking-API"), t("Implementation")],
        imageHref: "/products/tab5@2x.png",
        imageHref_m: "/products/tab5_m@2x.png",
        btnName: t("seemore"),
        btnHref: "/enterprise-solution",
      },
    ],
    [t],
  );

  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  const topRef = useRef(null);
  const individualsRef = useRef(null);
  const businessesRef = useRef(null);
  const PanelRef1 = useRef(null);
  const PanelRef2 = useRef(null);
  const router = useRouter();

  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();

    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setV1(newValue);
  };

  const handleChange2 = (_event: React.SyntheticEvent, newValue: number) => {
    setV2(newValue);
  };

  return (
    <Layout description={t("desc")} footer title={t("product")}>
      <Container maxWidth="desktop" ref={topRef}>
        <HeaderCard
          desc_1st={t("desc")}
          desc_2nd={t("customized")}
          head_bgs={["/products/head_bg_m@2x.png", "/products/head_bg@2x.png"]}
          title={t("product")}
        />
        <Stack className={styles.why}>
          <Typography className={styles.whyText}>{t("why")}</Typography>
          <Trans
            components={[
              <Typography className={styles.tr0} key="0" variant="h2" />,
              <Typography className={styles.tr1} component="span" key="1" />,
            ]}
            i18nKey="bridging"
            ns="products"
          />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={{ mobile: 1, desktop: 2 }}
          >
            <CtaButton
              className={styles.response}
              onClick={(e) => scrollToRef(e, individualsRef)}
              startIcon={<img className={styles.icon} src="/products/p1.svg" />}
            >
              {t("for-individuals")}
            </CtaButton>
            <CtaButton
              className={styles.response}
              onClick={(e) => scrollToRef(e, businessesRef)}
              startIcon={<img className={styles.icon} src="/products/p2.svg" />}
            >
              {t("for-businesses")}
            </CtaButton>
          </Stack>
        </Stack>
        <Stack className={styles.individuals}>
          <Typography className={styles.individualsTitle} ref={individualsRef}>
            {t("for-individuals")}
          </Typography>
          <Trans
            components={[
              <Typography className={styles.tr2} key="0" variant="h2" />,
              <Typography className={styles.tr3} component="span" key="1" />,
            ]}
            i18nKey="safe-path"
            ns="products"
          />
          <Stack
            className={styles.individualsStack}
            direction="column"
            spacing={{ mobile: 1, desktop: 2 }}
          >
            <StyledTabs
              aria-label="basic tabs example"
              className={styles.notMobile}
              onChange={handleChange}
              value={v1}
            >
              <StyledTab
                icon={<img className={styles.icon} src="/products/p3.svg" />}
                label={t("staking")}
              />
              <StyledTab
                icon={<img className={styles.icon} src="/products/p4.svg" />}
                label={t("analytics")}
              />
              <StyledTab
                icon={<img className={styles.icon} src="/products/p5.svg" />}
                label={t("developer")}
              />
            </StyledTabs>
            <Box className={styles.mobileOnly}>
              <CtaButton
                className={styles.response36}
                onClick={(e) => {
                  handleChange(e, 0);
                  scrollBottom(e, PanelRef1);
                }}
                startIcon={
                  <img className={styles.icon} src="/products/p3.svg" />
                }
              >
                {t("staking")}
              </CtaButton>
              <CtaButton
                className={styles.response36}
                onClick={(e) => {
                  handleChange(e, 1);
                  scrollBottom(e, PanelRef1);
                }}
                startIcon={
                  <img className={styles.icon} src="/products/p4.svg" />
                }
              >
                {t("analytics")}
              </CtaButton>
              <CtaButton
                className={styles.response36}
                onClick={(e) => {
                  handleChange(e, 2);
                  scrollBottom(e, PanelRef1);
                }}
                startIcon={
                  <img className={styles.icon} src="/products/p5.svg" />
                }
              >
                {t("developer")}
              </CtaButton>
            </Box>
          </Stack>
          {individuals.map((item, index) => (
            <ProductPanel
              imageHrefs={[item.imageHref_m, item.imageHref]}
              index={index}
              key={index}
              ref={PanelRef1}
              title={item.title}
              value={v1}
            >
              <Stack className={styles.dl} component="dl">
                <Typography className={styles.dt} component="dt">
                  {t("benefits")}
                </Typography>
                {item.benefits.map((i, k) => (
                  <Typography className={styles.dd} component="dd" key={k}>
                    {i}
                  </Typography>
                ))}
              </Stack>
              <Stack className={styles.dl} component="dl">
                <Typography className={styles.dt} component="dt">
                  {t("usecases")}
                </Typography>
                {item.usecases.map((i, k) => (
                  <Typography className={styles.dd} component="dl" key={k}>
                    {i}
                  </Typography>
                ))}
              </Stack>
              <CtaButton onClick={() => router.push(item.btnHref)}>
                {item.btnName}
              </CtaButton>
            </ProductPanel>
          ))}
        </Stack>
        <Stack className={styles.businesses}>
          <Typography className={styles.businessesTitle} ref={businessesRef}>
            {t("for-businesses")}
          </Typography>
          <Trans
            components={[
              <Typography className={styles.tr4} key="0" variant="h2" />,
              <Typography className={styles.tr5} component="span" key="1" />,
            ]}
            i18nKey="trusted"
            ns="products"
          />

          <Stack
            className={styles.businessesStack}
            direction="column"
            spacing={{ mobile: 1, desktop: 2 }}
          >
            <StyledTabs
              className={styles.notMobile}
              onChange={handleChange2}
              value={v2}
            >
              <StyledTab
                icon={<img className={styles.icon} src="/products/p3.svg" />}
                label={t("validator-infrastructure")}
              />
              <StyledTab
                icon={<img className={styles.icon} src="/products/p6.svg" />}
                label={t("staking")}
              />
              <StyledTab
                icon={<img className={styles.icon} src="/products/p4.svg" />}
                label={t("analytics")}
              />
              <StyledTab className={styles.tab} label="" />
              <StyledTab className={styles.tab} label="" />
            </StyledTabs>
            <StyledTabs
              className={styles.notMobile}
              onChange={handleChange2}
              value={v2}
            >
              <StyledTab className={styles.tab} label="" />
              <StyledTab className={styles.tab} label="" />
              <StyledTab className={styles.tab} label="" />
              <StyledTab
                icon={<img className={styles.icon} src="/products/p5.svg" />}
                label={t("developer")}
              />
              <StyledTab
                icon={<img className={styles.icon} src="/products/p7.svg" />}
                label={t("enterprise-solution")}
              />
            </StyledTabs>
            <Box className={styles.mobileOnly}>
              <CtaButton
                className={styles.response}
                onClick={(e) => {
                  handleChange2(e, 0);
                  scrollBottom(e, PanelRef2);
                }}
                startIcon={
                  <img className={styles.icon} src="/products/p3.svg" />
                }
              >
                {t("validator-infrastructure")}
              </CtaButton>
              <CtaButton
                className={styles.response}
                onClick={(e) => {
                  handleChange2(e, 1);
                  scrollBottom(e, PanelRef2);
                }}
                startIcon={
                  <img className={styles.icon} src="/products/p6.svg" />
                }
              >
                {t("staking")}
              </CtaButton>
              <CtaButton
                className={styles.response}
                onClick={(e) => {
                  handleChange2(e, 2);
                  scrollBottom(e, PanelRef2);
                }}
                startIcon={
                  <img className={styles.icon} src="/products/p4.svg" />
                }
              >
                {t("analytics")}
              </CtaButton>
              <Stack direction="row" spacing={1}>
                <CtaButton
                  className={styles.response}
                  onClick={(e) => {
                    handleChange2(e, 3);
                    scrollBottom(e, PanelRef2);
                  }}
                  startIcon={
                    <img className={styles.icon} src="/products/p5.svg" />
                  }
                >
                  {t("developer")}
                </CtaButton>
                <CtaButton
                  className={styles.response}
                  onClick={(e) => {
                    handleChange2(e, 4);
                    scrollBottom(e, PanelRef2);
                  }}
                  startIcon={
                    <img className={styles.icon} src="/products/p7.svg" />
                  }
                >
                  {t("enterprise-solution")}
                </CtaButton>
              </Stack>
            </Box>
          </Stack>
          {businesses.map((item, index) => (
            <ProductPanel
              imageHrefs={[item.imageHref_m, item.imageHref]}
              index={index}
              key={index}
              ref={PanelRef2}
              title={item.title}
              value={v2}
            >
              <Stack className={styles.dl} component="dl">
                <Typography className={styles.dt} component="dt">
                  {t("benefits")}
                </Typography>
                {item.benefits.map((i, k) => (
                  <Typography className={styles.dd} component="dd" key={k}>
                    {i}
                  </Typography>
                ))}
              </Stack>
              <Stack className={styles.dl} component="dl">
                <Typography className={styles.dt} component="dt">
                  {t("usecases")}
                </Typography>
                {item.usecases.map((i, k) => (
                  <Typography className={styles.dd} component="dd" key={k}>
                    {i}
                  </Typography>
                ))}
              </Stack>
              <CtaButton onClick={() => router.push(item.btnHref)}>
                {item.btnName}
              </CtaButton>
            </ProductPanel>
          ))}
        </Stack>
        <ScrollToTop topRef={topRef} />
      </Container>
    </Layout>
  );
};

export default Products;
