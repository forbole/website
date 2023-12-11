import {
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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

import style from "./index.module.css";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });
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
          head_bg={
            !isMobile
              ? "/products/head_bg@2x.png"
              : "/products/head_bg_m@2x.png"
          }
          title={t("product")}
        />
        <Stack
          sx={{
            textAlign: "center",
            [theme.breakpoints.down("laptop")]: {
              my: "40px",
            },
            [theme.breakpoints.up("laptop")]: {
              my: "184px",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              mb: "24px",
              color: "#202A43",
              [theme.breakpoints.down("laptop")]: {
                fontSize: "16px",
              },
              [theme.breakpoints.up("laptop")]: {
                fontSize: "24px",
              },
            }}
          >
            {t("why")}
          </Typography>

          <Trans
            components={[
              <Typography
                display="inline"
                key="0"
                sx={{
                  maxWidth: "950px",
                  mx: "auto",
                  color: "#202A43",
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: "24px",
                    fontWeight: "700",
                    mb: "16px",
                  },
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: "40px",
                    fontWeight: "590",
                    mb: "40px",
                  },
                }}
              />,
              <Typography
                color="#EE3131"
                component="span"
                key="1"
                sx={{
                  textShadow: "0px 0px 20px #ffffff",
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: "24px",
                    fontWeight: "700",
                    mb: "16px",
                  },
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: "40px",
                    fontWeight: "590",
                    mb: "40px",
                  },
                }}
              />,
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
              className={style.response}
              onClick={(e) => scrollToRef(e, individualsRef)}
              startIcon={<img className={style.icon} src="/products/p1.svg" />}
            >
              {t("for-individuals")}
            </CtaButton>
            <CtaButton
              className={style.response}
              onClick={(e) => scrollToRef(e, businessesRef)}
              startIcon={<img className={style.icon} src="/products/p2.svg" />}
            >
              {t("for-businesses")}
            </CtaButton>
          </Stack>
        </Stack>
        <Stack
          sx={{
            textAlign: "center",
            [theme.breakpoints.down("laptop")]: {
              my: "40px",
            },
            [theme.breakpoints.up("laptop")]: {
              my: "184px",
            },
          }}
        >
          <Typography
            ref={individualsRef}
            sx={{
              fontWeight: 700,
              mb: "24px",
              color: "#202A43",
              [theme.breakpoints.down("laptop")]: {
                fontSize: "16px",
              },
              [theme.breakpoints.up("laptop")]: {
                fontSize: "24px",
              },
            }}
          >
            {t("for-individuals")}
          </Typography>

          <Trans
            components={[
              <Typography
                display="inline"
                key="0"
                sx={{
                  color: "#202A43",
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: "24px",
                    fontWeight: "700",
                    mb: "16px",
                  },
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: "40px",
                    fontWeight: "590",
                    mb: "40px",
                  },
                }}
              />,
              <Typography
                color="#EE3131"
                component="span"
                display="inline"
                key="1"
                sx={{
                  textShadow: "0px 0px 20px #ffffff",
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: "24px",
                    fontWeight: "700",
                    mb: "16px",
                  },
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: "40px",
                    fontWeight: "590",
                    mb: "40px",
                  },
                }}
              />,
            ]}
            i18nKey="safe-path"
            ns="products"
          />
          <Stack
            alignItems="center"
            direction="column"
            justifyContent="center"
            spacing={{ mobile: 1, desktop: 2 }}
            sx={{
              mb: "40px",
              [theme.breakpoints.down("laptop")]: {
                mb: "32px",
              },
            }}
          >
            {!isMobile && (
              <StyledTabs
                aria-label="basic tabs example"
                onChange={handleChange}
                value={v1}
              >
                <StyledTab
                  icon={<img className={style.icon} src="/products/p3.svg" />}
                  label={t("staking")}
                />
                <StyledTab
                  icon={<img className={style.icon} src="/products/p4.svg" />}
                  label={t("analytics")}
                />
                <StyledTab
                  icon={<img className={style.icon} src="/products/p5.svg" />}
                  label={t("developer")}
                />
              </StyledTabs>
            )}
            {isMobile && (
              <>
                <CtaButton
                  className={style.response36}
                  onClick={(e) => {
                    handleChange(e, 0);
                    scrollBottom(e, PanelRef1);
                  }}
                  startIcon={
                    <img className={style.icon} src="/products/p3.svg" />
                  }
                >
                  {t("staking")}
                </CtaButton>
                <CtaButton
                  className={style.response36}
                  onClick={(e) => {
                    handleChange(e, 1);
                    scrollBottom(e, PanelRef1);
                  }}
                  startIcon={
                    <img className={style.icon} src="/products/p4.svg" />
                  }
                >
                  {t("analytics")}
                </CtaButton>
                <CtaButton
                  className={style.response36}
                  onClick={(e) => {
                    handleChange(e, 2);
                    scrollBottom(e, PanelRef1);
                  }}
                  startIcon={
                    <img className={style.icon} src="/products/p5.svg" />
                  }
                >
                  {t("developer")}
                </CtaButton>
              </>
            )}
          </Stack>
          {individuals.map((item, index) => (
            <ProductPanel
              imageHref={isMobile ? item.imageHref_m : item.imageHref}
              index={index}
              key={index}
              ref={PanelRef1}
              title={item.title}
              value={v1}
            >
              <Stack
                component="dl"
                sx={{
                  gap: "16px",
                }}
              >
                <Typography
                  component="dt"
                  sx={{ fontSize: "24px", fontWeight: 700, color: "#202A43" }}
                >
                  {t("benefits")}
                </Typography>
                {item.benefits.map((i, k) => (
                  <Typography
                    component="dd"
                    display="flex"
                    key={k}
                    sx={{
                      "color": "#202A43",
                      "alignItems": "baseline",
                      [theme.breakpoints.down("laptop")]: {
                        fontSize: "16px",
                      },
                      [theme.breakpoints.up("laptop")]: {
                        fontSize: "20px",
                      },
                      "&:before": {
                        content: "url(/icons/outlined.svg)",
                        marginRight: "16px",
                      },
                    }}
                  >
                    {i}
                  </Typography>
                ))}
              </Stack>
              <Stack
                component="dl"
                sx={{
                  gap: "16px",
                }}
              >
                <Typography
                  component="dt"
                  sx={{ fontSize: "24px", fontWeight: 700, color: "#202A43" }}
                >
                  {t("usecases")}
                </Typography>
                {item.usecases.map((i, k) => (
                  <Typography
                    component="dl"
                    key={k}
                    sx={{
                      "color": "#202A43",
                      "alignItems": "baseline",
                      [theme.breakpoints.down("laptop")]: {
                        fontSize: "16px",
                      },
                      [theme.breakpoints.up("laptop")]: {
                        fontSize: "20px",
                      },
                      "&:before": {
                        content: "url(/icons/outlined.svg)",
                        marginRight: "16px",
                        verticalAlign: "middle",
                      },
                    }}
                  >
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
        <Stack
          sx={{
            textAlign: "center",
            [theme.breakpoints.down("laptop")]: {
              my: "40px",
            },
            [theme.breakpoints.up("laptop")]: {
              my: "184px",
            },
          }}
        >
          <Typography
            ref={businessesRef}
            sx={{
              fontWeight: 700,
              mb: "24px",
              color: "#202A43",
              [theme.breakpoints.down("laptop")]: {
                fontSize: "16px",
              },
              [theme.breakpoints.up("laptop")]: {
                fontSize: "24px",
              },
            }}
          >
            {t("for-businesses")}
          </Typography>
          <Trans
            components={[
              <Typography
                key="0"
                sx={{
                  color: "#202A43",
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: "24px",
                    fontWeight: "700",
                    mb: "16px",
                  },
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: "40px",
                    fontWeight: "590",
                    mb: "40px",
                  },
                }}
              />,
              <Typography
                color="#EE3131"
                component="span"
                display="inline"
                key="1"
                sx={{
                  textShadow: "0px 0px 20px #ffffff",
                  [theme.breakpoints.down("laptop")]: {
                    fontSize: "24px",
                    fontWeight: "700",
                    mb: "16px",
                  },
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: "40px",
                    fontWeight: "590",
                    mb: "40px",
                  },
                }}
              />,
            ]}
            i18nKey="trusted"
            ns="products"
          />

          <Stack
            alignItems="center"
            direction="column"
            justifyContent="center"
            spacing={{ mobile: 1, desktop: 2 }}
            sx={{
              mb: "48px",
              [theme.breakpoints.down("laptop")]: {
                mb: "32px",
              },
            }}
          >
            {!isMobile && (
              <>
                <StyledTabs onChange={handleChange2} value={v2}>
                  <StyledTab
                    icon={<img className={style.icon} src="/products/p3.svg" />}
                    label={t("validator-infrastructure")}
                  />
                  <StyledTab
                    icon={<img className={style.icon} src="/products/p6.svg" />}
                    label={t("staking")}
                  />
                  <StyledTab
                    icon={<img className={style.icon} src="/products/p4.svg" />}
                    label={t("analytics")}
                  />
                  <StyledTab
                    label=""
                    sx={{ minWidth: "0", minHeight: 0, padding: 0 }}
                  />
                  <StyledTab
                    label=""
                    sx={{ minWidth: "0", minHeight: 0, padding: 0 }}
                  />
                </StyledTabs>
                <StyledTabs onChange={handleChange2} value={v2}>
                  <StyledTab
                    label=""
                    sx={{ minWidth: "0", minHeight: 0, padding: 0 }}
                  />
                  <StyledTab
                    label=""
                    sx={{ minWidth: "0", minHeight: 0, padding: 0 }}
                  />
                  <StyledTab
                    label=""
                    sx={{ minWidth: "0", minHeight: 0, padding: 0 }}
                  />
                  <StyledTab
                    icon={<img className={style.icon} src="/products/p5.svg" />}
                    label={t("developer")}
                  />
                  <StyledTab
                    icon={<img className={style.icon} src="/products/p7.svg" />}
                    label={t("enterprise-solution")}
                  />
                </StyledTabs>
              </>
            )}
            {isMobile && (
              <>
                <CtaButton
                  className={style.response}
                  onClick={(e) => {
                    handleChange2(e, 0);
                    scrollBottom(e, PanelRef2);
                  }}
                  startIcon={
                    <img className={style.icon} src="/products/p3.svg" />
                  }
                >
                  {t("validator-infrastructure")}
                </CtaButton>
                <CtaButton
                  className={style.response}
                  onClick={(e) => {
                    handleChange2(e, 1);
                    scrollBottom(e, PanelRef2);
                  }}
                  startIcon={
                    <img className={style.icon} src="/products/p6.svg" />
                  }
                >
                  {t("staking")}
                </CtaButton>
                <CtaButton
                  className={style.response}
                  onClick={(e) => {
                    handleChange2(e, 2);
                    scrollBottom(e, PanelRef2);
                  }}
                  startIcon={
                    <img className={style.icon} src="/products/p4.svg" />
                  }
                >
                  {t("analytics")}
                </CtaButton>
                <Stack direction="row" spacing={1}>
                  <CtaButton
                    className={style.response}
                    onClick={(e) => {
                      handleChange2(e, 3);
                      scrollBottom(e, PanelRef2);
                    }}
                    startIcon={
                      <img className={style.icon} src="/products/p5.svg" />
                    }
                  >
                    {t("developer")}
                  </CtaButton>
                  <CtaButton
                    className={style.response}
                    onClick={(e) => {
                      handleChange2(e, 4);
                      scrollBottom(e, PanelRef2);
                    }}
                    startIcon={
                      <img className={style.icon} src="/products/p7.svg" />
                    }
                  >
                    {t("enterprise-solution")}
                  </CtaButton>
                </Stack>
              </>
            )}
          </Stack>
          {businesses.map((item, index) => (
            <ProductPanel
              imageHref={isMobile ? item.imageHref_m : item.imageHref}
              index={index}
              key={index}
              ref={PanelRef2}
              title={item.title}
              value={v2}
            >
              <Stack
                component="dl"
                sx={{
                  gap: "16px",
                }}
              >
                <Typography
                  component="dt"
                  sx={{ fontSize: "24px", fontWeight: 700, color: "#202A43" }}
                >
                  {t("benefits")}
                </Typography>
                {item.benefits.map((i, k) => (
                  <Typography
                    component="dd"
                    display="flex"
                    key={k}
                    sx={{
                      "color": "#202A43",
                      "alignItems": "baseline",
                      [theme.breakpoints.down("laptop")]: {
                        fontSize: "16px",
                      },
                      [theme.breakpoints.up("laptop")]: {
                        fontSize: "20px",
                      },
                      "&:before": {
                        content: "url(/icons/outlined.svg)",
                        marginRight: "16px",
                      },
                    }}
                  >
                    {i}
                  </Typography>
                ))}
              </Stack>
              <Stack
                component="dl"
                sx={{
                  gap: "16px",
                }}
              >
                <Typography
                  component="dt"
                  sx={{ fontSize: "24px", fontWeight: 700, color: "#202A43" }}
                >
                  {t("usecases")}
                </Typography>
                {item.usecases.map((i, k) => (
                  <Typography
                    component="dd"
                    display="flex"
                    key={k}
                    sx={{
                      "color": "#202A43",
                      "alignItems": "baseline",
                      [theme.breakpoints.down("laptop")]: {
                        fontSize: "16px",
                      },
                      [theme.breakpoints.up("laptop")]: {
                        fontSize: "20px",
                      },
                      "&:before": {
                        content: "url(/icons/outlined.svg)",
                        marginRight: "16px",
                      },
                    }}
                  >
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
