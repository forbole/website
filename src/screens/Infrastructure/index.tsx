import {
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Layout, ScrollToTop } from "@src/components";
import Carousel from "@src/components/Carousel";
import IntroPanel from "@src/components/Intro_panel";
import CtaButton from "@src/components/cta-button";
import HeaderCard from "@src/components/header-card";
import KeyData from "@src/components/key_data";
import ProductPanel from "@src/components/product-panel";
import ScrollLogo from "@src/components/scroll_logo";
import Section from "@src/components/section";
import { StyledTab, StyledTabs } from "@src/components/selection-tab";
import { scrollBottom } from "@src/utils/scroll";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";

import style from "./index.module.css";

type Props = {};
const Infrastructure = (props: Props) => {
  const theme = useTheme();
  // const { isMobile } = useWindowDimensions();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });
  const [v1, setV1] = React.useState(0);
  const topRef = React.useRef(null);
  const PanelRef = React.useRef(null);
  const { t } = useTranslation("validator_infrastructure");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setV1(newValue);
  };
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"), {
    noSsr: true,
  });

  const router = useRouter();
  const personList = React.useMemo(() => {
    if (onlyLargeScreen) {
      return [
        {
          name: "Michael McCaffrey",
          position: "Lead Business Developer, Coreum",
          desc: `Forbole is an exceptional SaaS provider that offers valuable solutions, especially within the Cosmos
          ecosystem. Their expertise and commitment to delivering high-quality services have greatly benefited the
          Coreum blockchain. Their team has been responsive, knowledgeable, and efficient in addressing our
          needs and ensuring a seamless experience. I highly recommend Forbole to anyone seeking reliable and
          innovative SaaS solutions.`,
          img: "/icons/Michael McCaffrey-Coreum.png",
        },
        {
          name: "Boz Menzalji",
          position: "COO of Overclock Labs, creator of Akash Network",
          desc: `Forbole's team has been a reliable partner from the earliest days for Akash Network, allowing us to tap
          into deep know-how for testnets, mainnet upgrades, and more. The tools they have contributed to the
          ecosystem, such as Big Dipper's Explorer, has been a great value-add to our growing ecosystem. We are
          fortunate to have a great partner with Forbole.`,
          img: "/icons/person_avatar.png",
        },
        {
          name: "Calin Pasat",
          position: "Node Foundation Director, Humans.ai",
          desc: `Working with Forbole has been an enlightening experience. As validators, they are reliably efficient, but
          it's their commitment to contributing to the broader ecosystem that truly sets them apart with open-source
          tools like Big Dipper Explorer. Their forward-thinking nature is evident in their proactive involvement in
          various projects, reflecting a deep understanding and a promising vision for the blockchain industry.`,
          img: "/icons/Calin Pasat-humansai.png",
        },
      ];
    }
    return [
      {
        name: "Boz Menzalji",
        position: "COO of Overclock Labs, creator of Akash Network",
        desc: `Forbole's team has been a reliable partner from the earliest days for Akash Network, allowing us to tap
            into deep know-how for testnets, mainnet upgrades, and more. The tools they have contributed to the
            ecosystem, such as Big Dipper's Explorer, has been a great value-add to our growing ecosystem. We are
            fortunate to have a great partner with Forbole.`,
        img: "/icons/person_avatar.png",
      },
      {
        name: "Michael McCaffrey",
        position: "Lead Business Developer, Coreum",
        desc: `Forbole is an exceptional SaaS provider that offers valuable solutions, especially within the Cosmos
            ecosystem. Their expertise and commitment to delivering high-quality services have greatly benefited the
            Coreum blockchain. Their team has been responsive, knowledgeable, and efficient in addressing our
            needs and ensuring a seamless experience. I highly recommend Forbole to anyone seeking reliable and
            innovative SaaS solutions.`,
        img: "/icons/Michael McCaffrey-Coreum.png",
      },
      {
        name: "Calin Pasat",
        position: "Node Foundation Director, Humans.ai",
        desc: `Working with Forbole has been an enlightening experience. As validators, they are reliably efficient, but
            it's their commitment to contributing to the broader ecosystem that truly sets them apart with open-source
            tools like Big Dipper Explorer. Their forward-thinking nature is evident in their proactive involvement in
            various projects, reflecting a deep understanding and a promising vision for the blockchain industry.`,
        img: "/icons/Calin Pasat-humansai.png",
      },
    ];
  }, [onlyLargeScreen]);
  const textList = [
    // 专业技能和优势对应的文本
    [
      "infrastructure_item1",
      "infrastructure_item2",
      "infrastructure_item3",
      "infrastructure_item4",
      "infrastructure_item5",
      // "infrastructure_item6",
    ],
    [
      "expertise_item1",
      "expertise_item2",
      "expertise_item3",
      "expertise_item4",
      "expertise_item5",
      "expertise_item6",
    ],
  ];

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
          desc_1st={t("headercard_desc")}
          head_bg={
            isMobile
              ? "/validator_infastructure/head_bg_m@2x.png"
              : "/validator_infastructure/head_bg@2x.png"
          }
        />
        <KeyData />
        <ScrollLogo />

        <Stack
          sx={{
            gap: "40px",
            alignItems: "center",
            [theme.breakpoints.down("laptop")]: {
              gap: "32px",
            },
          }}
        >
          <Section
            title={t("section_1st_title")}
            title_large_trans={t("section_1st_large_title")}
            desc={t("section_1st_desc")}
          />
          <CtaButton
            onClick={() => router.push("/staking")}
            className={style.mobile}
          >
            {t("see_more_networks")}
          </CtaButton>
          <Grid
            container
            rowSpacing={{ mobile: theme.spacing(2), laptop: theme.spacing(3) }}
            columnSpacing={{
              mobile: theme.spacing(2),
              laptop: theme.spacing(2),
            }}
          >
            <Grid item mobile={12} tablet={6} laptop={4}>
              <IntroPanel
                title={t("grid_1st_title")}
                desc={t("grid_1st_desc")}
                imageHref={require("/public/validator_infastructure/grid_1@2x.png")}
              />
            </Grid>
            <Grid item mobile={12} tablet={6} laptop={4}>
              <IntroPanel
                title={t("grid_2nd_title")}
                desc={t("grid_2nd_desc")}
                imageHref={require("/public/validator_infastructure/grid_2@2x.png")}
              />
            </Grid>
            <Grid item mobile={12} tablet={6} laptop={4}>
              <IntroPanel
                title={t("grid_3rd_title")}
                desc={t("grid_3rd_desc")}
                imageHref={require("/public/validator_infastructure/grid_3@2x.png")}
              />
            </Grid>
          </Grid>

          <CtaButton
            onClick={() => router.push("/staking")}
            className={style.desktop}
          >
            {t("see_more_networks")}
          </CtaButton>
        </Stack>

        <Stack
          sx={{
            gap: "40px",
            alignItems: "center",
            [theme.breakpoints.down("laptop")]: {
              gap: "32px",
            },
          }}
        >
          <Section
            title={t("section_2nd_title")}
            title_large_trans={t("section_2nd_large_title")}
          />

          <StyledTabs value={v1} onChange={handleChange}>
            <StyledTab
              label={t("toggle_btn_left")}
              icon={
                <img
                  src="/validator_infastructure/tab1.svg"
                  className={style.icon}
                />
              }
              onClick={(e: any) => {
                scrollBottom(e, PanelRef);
              }}
            />
            <StyledTab
              label={t("toggle_btn_right")}
              icon={
                <img
                  src="/validator_infastructure/tab2.svg"
                  className={style.icon}
                />
              }
              onClick={(e: any) => {
                scrollBottom(e, PanelRef);
              }}
            />
          </StyledTabs>
          {[
            { title: "infrastructure_item", img: "desk_toggle_1@2x.png" },
            { title: "expertise_item", img: "desk_toggle_2@2x.png" },
          ].map((opt, index) => (
            <ProductPanel
              ref={PanelRef}
              imageHref={`/validator_infastructure/${opt.img}`}
              index={index}
              value={v1}
              key={index}
              imgFull
            >
              <Stack
                sx={{
                  gap: "24px",
                  maxWidth: "490px",
                }}
              >
                {textList[index].map((item, index) => (
                  <Typography
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      maxWidth: "489px",
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
                    {t(`${item}`)}
                  </Typography>
                ))}
              </Stack>
            </ProductPanel>
          ))}
        </Stack>

        <Stack
          sx={{
            gap: "40px",
            alignItems: "center",
            [theme.breakpoints.down("laptop")]: {
              gap: "32px",
            },
          }}
        >
          <Section
            title={t("section_3rd_title")}
            title_large_trans={t("section_3rd_large_title")}
            desc={t("section_3rd_desc")}
          />
          <CtaButton
            onClick={() => {
              router.push("/staking");
            }}
          >
            {t("stake_now")}
          </CtaButton>
        </Stack>
        <Stack>
          <Carousel personList={personList} />
        </Stack>
        <ScrollToTop topRef={topRef} />
      </Container>
    </Layout>
  );
};

export default Infrastructure;
