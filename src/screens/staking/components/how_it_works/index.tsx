import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import HowToCard from "./components/how_to_card";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const HowItWorks = () => {
  const { t } = useTranslation("staking");
  const howTos = useMemo(
    () => [
      {
        id: 1,
        image: "/images/assets/image_provider.png",
        title: t("trusted provider"),
        desc: t("trusted provider desc"),
      },
      {
        id: 2,
        image: "/images/assets/image_stake.png",
        title: t("stake"),
        desc: t("stake desc"),
      },
      {
        id: 3,
        image: "/images/assets/image_rewards.png",
        title: t("rewards"),
        desc: t("rewards desc"),
      },
      {
        id: 4,
        image: "/images/assets/image_non-custodial.png",
        title: t("non-custodial"),
        desc: t("non-custodial desc"),
      },
    ],
    [t],
  );

  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          "padding": theme.spacing(5, 3),
          "> .h3": {
            "fontWeight": 700,
            "fontSize": theme.spacing(3),
            "textAlign": "center",
            [theme.breakpoints.up("laptop")]: {
              fontSize: theme.spacing(5),
            },
            "> .h3": {
              fontWeight: 700,
              fontSize: theme.spacing(3),
              textAlign: "center",
              display: "inline",
              [theme.breakpoints.up("laptop")]: {
                fontSize: theme.spacing(5),
              },
            },
          },
          [theme.breakpoints.up("laptop")]: {
            "maxWidth": "1200px",
            "> .h3": {
              margin: "auto",
              width: "65%",
            },
          },
        }}
      >
        <Typography
          sx={{
            textShadow:
              "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
            fontWeight: 600,
            fontSize: theme.spacing(2),
            textAlign: "center",
            paddingBottom: theme.spacing(3),
            color: theme.palette.custom.forbole.blue,
            [theme.breakpoints.up("laptop")]: {
              fontWeight: 700,
              fontSize: theme.spacing(3),
            },
          }}
          variant="h4"
        >
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
            padding: theme.spacing(5, 0, 0, 0),
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gridGap: theme.spacing(2),
            [theme.breakpoints.up("laptop")]: {
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: theme.spacing(7, 0, 0, 0),
              gridGap: theme.spacing(2.75),
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
