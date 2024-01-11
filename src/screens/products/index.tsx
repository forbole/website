import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useMemo, useRef, useState } from "react";

import CtaButton, { CtaLink } from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import Layout from "@src/components/layout";
import ProductPanel from "@src/components/product-panel";
import ScrollToTop from "@src/components/scroll_to_top";
import { StyledTab, StyledTabs } from "@src/components/selection-tab";
import * as commonStyles from "@src/styles/common.module.scss";
import { scrollBottom } from "@src/utils/scroll";

import * as styles from "./index.module.scss";

const Products = () => {
  const { t } = useTranslation("products");

  const individuals = useMemo(
    () => [
      {
        benefits: [t("earn"), t("secure"), t("ownership")],
        btnHref: "/staking-service",
        btnName: t("seemore"),
        imageHref: "/products/tab2@2x.png",
        imageHref_m: "/products/tab2_m@2x.png",
        title: t("staking"),
        usecases: [t("stake"), t("income")],
      },
      {
        benefits: [t("real-time"), t("bird-eye-view"), t("free")],
        btnHref: "/analytics-tools",
        btnName: t("seemore"),
        imageHref: "/products/tab3@2x.png",
        imageHref_m: "/products/tab3_m@2x.png",
        title: t("analytics"),
        usecases: [t("transactions"), t("viewandvote")],
      },
      {
        benefits: [t("nodes"), t("free-trial"), t("pricing")],
        btnHref: "/developer-tools",
        btnName: t("seemore"),
        imageHref: "/products/tab4@2x.png",
        imageHref_m: "/products/tab4_m@2x.png",
        title: t("developer"),
        usecases: [t("RPC"), t("GraphQL"), t("data-api")],
      },
    ],
    [t],
  );

  const businesses = useMemo(
    () => [
      {
        benefits: [t("security"), t("expertise"), t("record")],
        btnHref: "/infrastructure",
        btnName: t("seemore"),
        imageHref: "/products/tab1@2x.png",
        imageHref_m: "/products/tab1_m@2x.png",
        title: t("validator-infrastructure"),
        usecases: [t("new-network"), t("strengthen-network")],
      },
      {
        benefits: [t("100% control"), t("asset-variety"), t("balance")],
        btnHref: "/staking-service",
        btnName: t("seemore"),
        imageHref: "/products/tab2@2x.png",
        imageHref_m: "/products/tab2_m@2x.png",
        title: t("staking"),
        usecases: [t("stake-token"), t("stake-of-clients")],
      },
      {
        benefits: [
          t("custom-visualization"),
          t("modularized-development"),
          t("fast"),
        ],
        btnHref: "/analytics-tools",
        btnName: t("seemore"),
        imageHref: "/products/tab3@2x.png",
        imageHref_m: "/products/tab3_m@2x.png",
        title: t("analytics"),
        usecases: [t("own-explorer"), t("query-data")],
      },
      {
        benefits: [t("high"), t("custom-offering"), t("team-support")],
        btnHref: "/developer-tools",
        btnName: t("seemore"),
        imageHref: "/products/tab4@2x.png",
        imageHref_m: "/products/tab4_m@2x.png",
        title: t("developer"),
        usecases: [
          t("run-decentralized-apps"),
          t("analyze-decentralized-apps"),
        ],
      },
      {
        benefits: [t("free-consultation"), t("iteration"), t("end-to-end")],
        btnHref: "/enterprise-solution",
        btnName: t("seemore"),
        imageHref: "/products/tab5@2x.png",
        imageHref_m: "/products/tab5_m@2x.png",
        title: t("enterprise-solution"),
        usecases: [t("staking-API"), t("Implementation")],
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

  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();

    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: ref.current.offsetTop - 100,
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
      <div className={commonStyles.pageContainer} ref={topRef}>
        <HeaderCard
          desc_1st={t("desc")}
          desc_2nd={t("customized")}
          head_bgs={["/products/head_bg_m@2x.png", "/products/head_bg@2x.png"]}
          title={t("product")}
        />
        <div className={styles.why}>
          <span className={styles.whyText}>{t("why")}</span>
          <Trans
            components={[
              // eslint-disable-next-line
              <h2 className={styles.tr0} key="0" />,
              <span className={styles.tr1} key="1" />,
            ]}
            i18nKey="bridging"
            ns="products"
          />
          <div className={styles.responseWrap}>
            <CtaButton
              className={styles.response}
              onClick={(e) => scrollToRef(e, individualsRef)}
            >
              <img alt="" className={styles.icon} src="/products/p1.svg" />{" "}
              {t("for-individuals")}
            </CtaButton>
            <CtaButton
              className={styles.response}
              onClick={(e) => scrollToRef(e, businessesRef)}
            >
              <img alt="" className={styles.icon} src="/products/p2.svg" />
              {t("for-businesses")}
            </CtaButton>
          </div>
        </div>
        <div className={styles.individuals}>
          <span className={styles.individualsTitle} ref={individualsRef}>
            {t("for-individuals")}
          </span>
          <Trans
            components={[
              // eslint-disable-next-line
              <h2 className={styles.tr2} key="0" />,
              <span className={styles.tr3} key="1" />,
            ]}
            i18nKey="safe-path"
            ns="products"
          />
          <div className={styles.individualsStack}>
            <StyledTabs
              aria-label="basic tabs example"
              className={styles.notMobile}
              onChange={handleChange}
              value={v1}
            >
              <StyledTab
                icon={
                  <img alt="" className={styles.icon} src="/products/p3.svg" />
                }
                label={t("staking")}
              />
              <StyledTab
                icon={
                  <img alt="" className={styles.icon} src="/products/p4.svg" />
                }
                label={t("analytics")}
              />
              <StyledTab
                icon={
                  <img alt="" className={styles.icon} src="/products/p5.svg" />
                }
                label={t("developer")}
              />
            </StyledTabs>
            <div className={styles.mobileOnly}>
              <CtaButton
                className={styles.response36}
                onClick={(e) => {
                  handleChange(e, 0);
                  scrollBottom(e, PanelRef1);
                }}
              >
                <img alt="" className={styles.icon} src="/products/p3.svg" />
                {t("staking")}
              </CtaButton>
              <CtaButton
                className={styles.response36}
                onClick={(e) => {
                  handleChange(e, 1);
                  scrollBottom(e, PanelRef1);
                }}
              >
                <img alt="" className={styles.icon} src="/products/p4.svg" />
                {t("analytics")}
              </CtaButton>
              <CtaButton
                className={styles.response36}
                onClick={(e) => {
                  handleChange(e, 2);
                  scrollBottom(e, PanelRef1);
                }}
              >
                <img alt="" className={styles.icon} src="/products/p5.svg" />
                {t("developer")}
              </CtaButton>
            </div>
          </div>
          {individuals.map((item, index) => (
            <ProductPanel
              imageHrefs={[item.imageHref_m, item.imageHref]}
              index={index}
              key={index}
              ref={PanelRef1}
              title={item.title}
              value={v1}
            >
              <dl className={styles.dl}>
                <dt className={styles.dt}>{t("benefits")}</dt>
                {item.benefits.map((i, k) => (
                  <dd className={styles.dd} key={k}>
                    {i}
                  </dd>
                ))}
              </dl>
              <dl className={styles.dl}>
                <dt className={styles.dt}>{t("usecases")}</dt>
                {item.usecases.map((i, k) => (
                  <dl className={styles.dd} key={k}>
                    {i}
                  </dl>
                ))}
              </dl>
              <CtaLink href={item.btnHref}>{item.btnName}</CtaLink>
            </ProductPanel>
          ))}
        </div>
        <div className={styles.businesses}>
          <span className={styles.businessesTitle} ref={businessesRef}>
            {t("for-businesses")}
          </span>
          <Trans
            components={[
              // eslint-disable-next-line
              <h2 className={styles.tr4} key="0" />,
              <span className={styles.tr5} key="1" />,
            ]}
            i18nKey="trusted"
            ns="products"
          />

          <div className={styles.businessesStack}>
            <StyledTabs
              className={styles.notMobile}
              onChange={handleChange2}
              value={v2}
            >
              <StyledTab
                icon={
                  <img alt="" className={styles.icon} src="/products/p3.svg" />
                }
                label={t("validator-infrastructure")}
              />
              <StyledTab
                icon={
                  <img alt="" className={styles.icon} src="/products/p6.svg" />
                }
                label={t("staking")}
              />
              <StyledTab
                icon={
                  <img alt="" className={styles.icon} src="/products/p4.svg" />
                }
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
                icon={
                  <img alt="" className={styles.icon} src="/products/p5.svg" />
                }
                label={t("developer")}
              />
              <StyledTab
                icon={
                  <img alt="" className={styles.icon} src="/products/p7.svg" />
                }
                label={t("enterprise-solution")}
              />
            </StyledTabs>
            <div className={styles.mobileOnly}>
              <CtaButton
                className={styles.response}
                onClick={(e) => {
                  handleChange2(e, 0);
                  scrollBottom(e, PanelRef2);
                }}
              >
                <img alt="" className={styles.icon} src="/products/p3.svg" />
                {t("validator-infrastructure")}
              </CtaButton>
              <CtaButton
                className={styles.response}
                onClick={(e) => {
                  handleChange2(e, 1);
                  scrollBottom(e, PanelRef2);
                }}
              >
                <img alt="" className={styles.icon} src="/products/p6.svg" />
                {t("staking")}
              </CtaButton>
              <CtaButton
                className={styles.response}
                onClick={(e) => {
                  handleChange2(e, 2);
                  scrollBottom(e, PanelRef2);
                }}
              >
                <img alt="" className={styles.icon} src="/products/p4.svg" />
                {t("analytics")}
              </CtaButton>
              <div className={styles.enterpriseStack}>
                <CtaButton
                  className={styles.response}
                  onClick={(e) => {
                    handleChange2(e, 3);
                    scrollBottom(e, PanelRef2);
                  }}
                >
                  <img alt="" className={styles.icon} src="/products/p5.svg" />
                  {t("developer")}
                </CtaButton>
                <CtaButton
                  className={styles.response}
                  onClick={(e) => {
                    handleChange2(e, 4);
                    scrollBottom(e, PanelRef2);
                  }}
                >
                  <img alt="" className={styles.icon} src="/products/p7.svg" />
                  {t("enterprise-solution")}
                </CtaButton>
              </div>
            </div>
          </div>
          {businesses.map((item, index) => (
            <ProductPanel
              imageHrefs={[item.imageHref_m, item.imageHref]}
              index={index}
              key={index}
              ref={PanelRef2}
              title={item.title}
              value={v2}
            >
              <dl className={styles.dl}>
                <dt className={styles.dt}>{t("benefits")}</dt>
                {item.benefits.map((i, k) => (
                  <dd className={styles.dd} key={k}>
                    {i}
                  </dd>
                ))}
              </dl>
              <dl className={styles.dl}>
                <dt className={styles.dt}>{t("usecases")}</dt>
                {item.usecases.map((i, k) => (
                  <dd className={styles.dd} key={k}>
                    {i}
                  </dd>
                ))}
              </dl>
              <CtaLink href={item.btnHref}>{item.btnName}</CtaLink>
            </ProductPanel>
          ))}
        </div>
        <ScrollToTop topRef={topRef} />
      </div>
    </Layout>
  );
};

export default Products;
