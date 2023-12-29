import {
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import type { SyntheticEvent } from "react";
import { useMemo, useRef, useState } from "react";

import Carousel from "@src/components/Carousel";
import IntroPanel from "@src/components/Intro_panel";
import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import KeyData from "@src/components/key_data";
import Layout from "@src/components/layout";
import { NoSSR } from "@src/components/no-ssr";
import ProductPanel from "@src/components/product-panel";
import ScrollToTop from "@src/components/scroll_to_top";
import Section from "@src/components/section";
import { StyledTab, StyledTabs } from "@src/components/selection-tab";
import GQLProvider from "@src/utils/gql";
import { scrollBottom } from "@src/utils/scroll";

import style from "./index.module.css";

const Infrastructure = () => {
  const theme = useTheme();
  const [v1, setV1] = useState(0);
  const topRef = useRef(null);
  const PanelRef = useRef(null);
  const { t } = useTranslation("validator_infrastructure");

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setV1(newValue);
  };

  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"), {
    noSsr: true,
  });

  const personList = useMemo(() => {
    if (onlyLargeScreen) {
      return [
        {
          desc: `Forbole is an exceptional SaaS provider that offers valuable solutions, especially within the Cosmos
          ecosystem. Their expertise and commitment to delivering high-quality services have greatly benefited the
          Coreum blockchain. Their team has been responsive, knowledgeable, and efficient in addressing our
          needs and ensuring a seamless experience. I highly recommend Forbole to anyone seeking reliable and
          innovative SaaS solutions.`,
          img: "/icons/Michael McCaffrey-Coreum.png",
          name: "Michael McCaffrey",
          position: "Lead Business Developer, Coreum",
        },
        {
          desc: `Forbole's team has been a reliable partner from the earliest days for Akash Network, allowing us to tap
          into deep know-how for testnets, mainnet upgrades, and more. The tools they have contributed to the
          ecosystem, such as Big Dipper's Explorer, has been a great value-add to our growing ecosystem. We are
          fortunate to have a great partner with Forbole.`,
          img: "/icons/person_avatar.png",
          name: "Boz Menzalji",
          position: "COO of Overclock Labs, creator of Akash Network",
        },
        {
          desc: `Working with Forbole has been an enlightening experience. As validators, they are reliably efficient, but
          it's their commitment to contributing to the broader ecosystem that truly sets them apart with open-source
          tools like Big Dipper Explorer. Their forward-thinking nature is evident in their proactive involvement in
          various projects, reflecting a deep understanding and a promising vision for the blockchain industry.`,
          img: "/icons/Calin Pasat-humansai.png",
          name: "Calin Pasat",
          position: "Node Foundation Director, Humans.ai",
        },
      ];
    }

    return [
      {
        desc: `Forbole's team has been a reliable partner from the earliest days for Akash Network, allowing us to tap
            into deep know-how for testnets, mainnet upgrades, and more. The tools they have contributed to the
            ecosystem, such as Big Dipper's Explorer, has been a great value-add to our growing ecosystem. We are
            fortunate to have a great partner with Forbole.`,
        img: "/icons/person_avatar.png",
        name: "Boz Menzalji",
        position: "COO of Overclock Labs, creator of Akash Network",
      },
      {
        desc: `Forbole is an exceptional SaaS provider that offers valuable solutions, especially within the Cosmos
            ecosystem. Their expertise and commitment to delivering high-quality services have greatly benefited the
            Coreum blockchain. Their team has been responsive, knowledgeable, and efficient in addressing our
            needs and ensuring a seamless experience. I highly recommend Forbole to anyone seeking reliable and
            innovative SaaS solutions.`,
        img: "/icons/Michael McCaffrey-Coreum.png",
        name: "Michael McCaffrey",
        position: "Lead Business Developer, Coreum",
      },
      {
        desc: `Working with Forbole has been an enlightening experience. As validators, they are reliably efficient, but
            it's their commitment to contributing to the broader ecosystem that truly sets them apart with open-source
            tools like Big Dipper Explorer. Their forward-thinking nature is evident in their proactive involvement in
            various projects, reflecting a deep understanding and a promising vision for the blockchain industry.`,
        img: "/icons/Calin Pasat-humansai.png",
        name: "Calin Pasat",
        position: "Node Foundation Director, Humans.ai",
      },
    ];
  }, [onlyLargeScreen]);

  const textList = [
    [
      t("infrastructure_item1"),
      t("infrastructure_item2"),
      t("infrastructure_item3"),
      t("infrastructure_item4"),
      t("infrastructure_item5"),
    ],
    [
      t("expertise_item1"),
      t("expertise_item2"),
      t("expertise_item3"),
      t("expertise_item4"),
      t("expertise_item5"),
      t("expertise_item6"),
    ],
  ];

  return (
    <GQLProvider>
      <Layout description={t("expertise_item1")} footer title={t("page_title")}>
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
            desc_1st={t("headercard_desc")}
            head_bgs={[
              "/validator_infastructure/head_bg_m@2x.png",
              "/validator_infastructure/head_bg@2x.png",
            ]}
            title={t("headercard_title")}
          />
          <KeyData />
          <Stack
            sx={{
              alignItems: "center",
              gap: "40px",
              [theme.breakpoints.down("laptop")]: {
                gap: "32px",
              },
            }}
          >
            <Section
              desc={t("section_1st_desc")}
              title={t("section_1st_title")}
              title_large_trans={t("section_1st_large_title")}
            />
            <Link href="/staking">
              <CtaButton className={style.mobile}>
                {t("see_more_networks")}
              </CtaButton>
            </Link>
            <Grid
              columnSpacing={{
                laptop: theme.spacing(2),
                mobile: theme.spacing(2),
              }}
              container
              rowSpacing={{
                laptop: theme.spacing(3),
                mobile: theme.spacing(2),
              }}
            >
              <Grid item laptop={4} mobile={12} tablet={6}>
                <IntroPanel
                  desc={t("grid_1st_desc")}
                  imageHref={require("/public/validator_infastructure/grid_1@2x.png")}
                  level={2}
                  title={t("grid_1st_title")}
                />
              </Grid>
              <Grid item laptop={4} mobile={12} tablet={6}>
                <IntroPanel
                  desc={t("grid_2nd_desc")}
                  imageHref={require("/public/validator_infastructure/grid_2@2x.png")}
                  level={2}
                  title={t("grid_2nd_title")}
                />
              </Grid>
              <Grid item laptop={4} mobile={12} tablet={6}>
                <IntroPanel
                  desc={t("grid_3rd_desc")}
                  imageHref={require("/public/validator_infastructure/grid_3@2x.png")}
                  level={2}
                  title={t("grid_3rd_title")}
                />
              </Grid>
            </Grid>
            <Link href="/staking">
              <CtaButton className={style.desktop}>
                {t("see_more_networks")}
              </CtaButton>
            </Link>
          </Stack>

          <Stack
            sx={{
              alignItems: "center",
              gap: "40px",
              [theme.breakpoints.down("laptop")]: {
                gap: "32px",
              },
            }}
          >
            <Section
              title={t("section_2nd_title")}
              title_large_trans={t("section_2nd_large_title")}
            />

            <StyledTabs onChange={handleChange} value={v1}>
              <StyledTab
                icon={
                  <img
                    alt=""
                    className={style.icon}
                    src="/validator_infastructure/tab1.svg"
                  />
                }
                label={t("toggle_btn_left")}
                onClick={(e: any) => {
                  scrollBottom(e, PanelRef);
                }}
              />
              <StyledTab
                icon={
                  <img
                    alt=""
                    className={style.icon}
                    src="/validator_infastructure/tab2.svg"
                  />
                }
                label={t("toggle_btn_right")}
                onClick={(e: any) => {
                  scrollBottom(e, PanelRef);
                }}
              />
            </StyledTabs>
            {[
              { img: "desk_toggle_1@2x.png", title: "infrastructure_item" },
              { img: "desk_toggle_2@2x.png", title: "expertise_item" },
            ].map((opt, indexUpper) => (
              <ProductPanel
                imageHref={`/validator_infastructure/${opt.img}`}
                imgFull
                index={indexUpper}
                key={indexUpper}
                ref={PanelRef}
                value={v1}
              >
                <Stack
                  sx={{
                    gap: "24px",
                    maxWidth: "490px",
                  }}
                >
                  {textList[indexUpper].map((item, index) => (
                    <Typography
                      key={index}
                      sx={{
                        "&:before": {
                          content: "url(/icons/outlined.svg)",
                          marginRight: "16px",
                        },
                        "alignItems": "baseline",
                        "display": "flex",
                        "maxWidth": "489px",
                        [theme.breakpoints.down("laptop")]: {
                          fontSize: "16px",
                        },
                        [theme.breakpoints.up("laptop")]: {
                          fontSize: "20px",
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </ProductPanel>
            ))}
          </Stack>

          <Stack
            sx={{
              alignItems: "center",
              gap: "40px",
              [theme.breakpoints.down("laptop")]: {
                gap: "32px",
              },
            }}
          >
            <Section
              desc={t("section_3rd_desc")}
              title={t("section_3rd_title")}
              title_large_trans={t("section_3rd_large_title")}
            />
            <Link href="/staking">
              <CtaButton>{t("stake_now")}</CtaButton>
            </Link>
          </Stack>
          <Stack>
            <NoSSR>
              <Carousel personList={personList} />
            </NoSSR>
          </Stack>
          <ScrollToTop topRef={topRef} />
        </Container>
      </Layout>
    </GQLProvider>
  );
};

export default Infrastructure;
