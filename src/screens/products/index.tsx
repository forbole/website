import { Layout, ScrollToTop } from "@components";
import {
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import ProductPanel from "@src/components/product-panel";
import { StyledTab, StyledTabs } from "@src/components/selection-tab";
import { scrollBottom } from "@src/utils/scroll";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useRef } from "react";

import { businesses, individuals } from "./config";
import style from "./index.module.css";

const Trans = dynamic(async () => import("next-translate/Trans"), {
  ssr: false,
});

const Products = () => {
  const { t } = useTranslation("products");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });
  const [v1, setV1] = React.useState(0);
  const [v2, setV2] = React.useState(0);
  const topRef = useRef(null);
  const individualsRef = useRef(null);
  const businessesRef = useRef(null);
  const PanelRef1 = React.useRef(null);
  const PanelRef2 = React.useRef(null);
  const router = useRouter();
  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();
    window.scrollTo({
      left: 0,
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setV1(newValue);
  };
  const handleChange2 = (event: React.SyntheticEvent, newValue: number) => {
    setV2(newValue);
  };
  return (
    <Layout title={t("product")} navLink="/products" footer>
      <Container maxWidth="desktop" ref={topRef}>
        <HeaderCard
          title={t("product")}
          desc_1st={t("desc")}
          desc_2nd={t("customized")}
          head_bg={
            !isMobile
              ? "/products/head_bg@2x.png"
              : "/products/head_bg_m@2x.png"
          }
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
            i18nKey={t("bridging")}
            components={[
              <Typography
                display="inline"
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
                component="span"
                color="#EE3131"
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
          />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={{ mobile: 1, desktop: 2 }}
          >
            <CtaButton
              onClick={(e) => scrollToRef(e, individualsRef)}
              className={style.response}
              startIcon={<img src="/products/p1.svg" className={style.icon} />}
            >
              {t("for-individuals")}
            </CtaButton>
            <CtaButton
              onClick={(e) => scrollToRef(e, businessesRef)}
              className={style.response}
              startIcon={<img src="/products/p2.svg" className={style.icon} />}
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
            i18nKey={t("safe-path")}
            components={[
              <Typography
                display="inline"
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
          />
          <Stack
            direction="column"
            alignItems="center"
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
                value={v1}
                onChange={handleChange}
              >
                <StyledTab
                  icon={<img src="/products/p3.svg" className={style.icon} />}
                  label={t("staking")}
                />
                <StyledTab
                  icon={<img src="/products/p4.svg" className={style.icon} />}
                  label={t("analytics")}
                />
                <StyledTab
                  icon={<img src="/products/p5.svg" className={style.icon} />}
                  label={t("developer")}
                />
              </StyledTabs>
            )}
            {isMobile && (
              <>
                <CtaButton
                  startIcon={
                    <img src="/products/p3.svg" className={style.icon} />
                  }
                  onClick={(e) => {
                    handleChange(e, 0);
                    scrollBottom(e, PanelRef1);
                  }}
                  className={style.response36}
                >
                  {t("staking")}
                </CtaButton>
                <CtaButton
                  startIcon={
                    <img src="/products/p4.svg" className={style.icon} />
                  }
                  onClick={(e) => {
                    handleChange(e, 1);
                    scrollBottom(e, PanelRef1);
                  }}
                  className={style.response36}
                >
                  {t("analytics")}
                </CtaButton>
                <CtaButton
                  startIcon={
                    <img src="/products/p5.svg" className={style.icon} />
                  }
                  onClick={(e) => {
                    handleChange(e, 2);
                    scrollBottom(e, PanelRef1);
                  }}
                  className={style.response36}
                >
                  {t("developer")}
                </CtaButton>
              </>
            )}
          </Stack>
          {individuals.map((item, index) => (
            <ProductPanel
              ref={PanelRef1}
              title={t(item.title)}
              imageHref={isMobile ? item.imageHref_m : item.imageHref}
              index={index}
              value={v1}
              key={index}
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
                {item.benefits.map((i, k) => {
                  return (
                    <Typography
                      key={k}
                      component="dd"
                      display="flex"
                      sx={{
                        color: "#202A43",
                        alignItems: "baseline",
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
                      {t(i)}
                    </Typography>
                  );
                })}
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
                {item.usecases.map((i, k) => {
                  return (
                    <Typography
                      key={k}
                      component="dl"
                      sx={{
                        color: "#202A43",
                        alignItems: "baseline",
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
                      {t(i)}
                    </Typography>
                  );
                })}
              </Stack>
              <CtaButton onClick={() => router.push(item.btnHref)}>
                {t(item.btnName)}
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
            i18nKey={t("trusted")}
            components={[
              <Typography
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
          />

          <Stack
            direction="column"
            alignItems="center"
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
                <StyledTabs value={v2} onChange={handleChange2}>
                  <StyledTab
                    icon={<img src="/products/p3.svg" className={style.icon} />}
                    label={t("validator-infrastructure")}
                  />
                  <StyledTab
                    icon={<img src="/products/p6.svg" className={style.icon} />}
                    label={t("staking")}
                  />
                  <StyledTab
                    icon={<img src="/products/p4.svg" className={style.icon} />}
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
                <StyledTabs value={v2} onChange={handleChange2}>
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
                    icon={<img src="/products/p5.svg" className={style.icon} />}
                    label={t("developer")}
                  />
                  <StyledTab
                    icon={<img src="/products/p7.svg" className={style.icon} />}
                    label={t("enterprise-solution")}
                  />
                </StyledTabs>
              </>
            )}
            {isMobile && (
              <>
                <CtaButton
                  startIcon={
                    <img src="/products/p3.svg" className={style.icon} />
                  }
                  onClick={(e) => {
                    handleChange2(e, 0);
                    scrollBottom(e, PanelRef2);
                  }}
                  className={style.response}
                >
                  {t("validator-infrastructure")}
                </CtaButton>
                <CtaButton
                  startIcon={
                    <img src="/products/p6.svg" className={style.icon} />
                  }
                  onClick={(e) => {
                    handleChange2(e, 1);
                    scrollBottom(e, PanelRef2);
                  }}
                  className={style.response}
                >
                  {t("staking")}
                </CtaButton>
                <CtaButton
                  startIcon={
                    <img src="/products/p4.svg" className={style.icon} />
                  }
                  onClick={(e) => {
                    handleChange2(e, 2);
                    scrollBottom(e, PanelRef2);
                  }}
                  className={style.response}
                >
                  {t("analytics")}
                </CtaButton>
                <Stack direction="row" spacing={1}>
                  <CtaButton
                    startIcon={
                      <img src="/products/p5.svg" className={style.icon} />
                    }
                    onClick={(e) => {
                      handleChange2(e, 3);
                      scrollBottom(e, PanelRef2);
                    }}
                    className={style.response}
                  >
                    {t("developer")}
                  </CtaButton>
                  <CtaButton
                    startIcon={
                      <img src="/products/p7.svg" className={style.icon} />
                    }
                    onClick={(e) => {
                      handleChange2(e, 4);
                      scrollBottom(e, PanelRef2);
                    }}
                    className={style.response}
                  >
                    {t("enterprise-solution")}
                  </CtaButton>
                </Stack>
              </>
            )}
          </Stack>
          {businesses.map((item, index) => (
            <ProductPanel
              ref={PanelRef2}
              title={t(item.title)}
              imageHref={isMobile ? item.imageHref_m : item.imageHref}
              index={index}
              value={v2}
              key={index}
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
                {item.benefits.map((i, k) => {
                  return (
                    <Typography
                      key={k}
                      component="dd"
                      display="flex"
                      sx={{
                        color: "#202A43",
                        alignItems: "baseline",
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
                      {t(i)}
                    </Typography>
                  );
                })}
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
                {item.usecases.map((i, k) => {
                  return (
                    <Typography
                      key={k}
                      component="dd"
                      display="flex"
                      sx={{
                        color: "#202A43",
                        alignItems: "baseline",
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
                      {t(i)}
                    </Typography>
                  );
                })}
              </Stack>
              <CtaButton onClick={() => router.push(item.btnHref)}>
                {t(item.btnName)}
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
