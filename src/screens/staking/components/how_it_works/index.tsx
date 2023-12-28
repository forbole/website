import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import * as commonStyles from "@src/screens/staking/common.module.scss";

import HowToCard from "./components/how_to_card";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const HowItWorks = () => {
  const { t } = useTranslation("staking");

  const howTos = useMemo(
    () => [
      {
        desc: t("trusted provider desc"),
        id: 1,
        image: "/images/assets/image_provider.png",
        title: t("trusted provider"),
      },
      {
        desc: t("stake desc"),
        id: 2,
        image: "/images/assets/image_stake.png",
        title: t("stake"),
      },
      {
        desc: t("rewards desc"),
        id: 3,
        image: "/images/assets/image_rewards.png",
        title: t("rewards"),
      },
      {
        desc: t("non-custodial desc"),
        id: 4,
        image: "/images/assets/image_non-custodial.png",
        title: t("non-custodial"),
      },
    ],
    [t],
  );

  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center">
      <Box className={commonStyles.stakingContent}>
        <Typography className={commonStyles.stakingTitle} variant="h4">
          {t("how it works")}
        </Typography>
        <Trans
          components={[
            <Box
              className="h3"
              key="0"
              sx={{
                color: theme.palette.custom.forbole.indigo6,
              }}
            />,
            <Box
              className="h3"
              key="1"
              sx={{
                background:
                  "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                backgroundClip: "text",
                textFillColor: "transparent",
              }}
            />,
          ]}
          i18nKey="how it works title"
          ns="staking"
        />
        <Box
          sx={{
            display: "grid",
            gridGap: theme.spacing(2),
            gridTemplateColumns: "repeat(1, 1fr)",
            padding: theme.spacing(5, 0, 0, 0),
            [theme.breakpoints.up("laptop")]: {
              gridGap: theme.spacing(2.75),
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: theme.spacing(7, 0, 0, 0),
            },
          }}
        >
          {howTos.map((howTo) => (
            <HowToCard
              desc={howTo.desc}
              id={howTo.id}
              image={howTo.image}
              key={howTo.id}
              title={howTo.title}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HowItWorks;
