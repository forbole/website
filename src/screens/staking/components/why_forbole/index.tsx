/* eslint-disable no-unused-vars */
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

import { reasons } from "./config";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const WhyForbole = () => {
  const { t } = useTranslation("staking");
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));
  return (
    <Box
      sx={{
        padding: theme.spacing(5, 3),
      }}
    >
      <Box display="flex" justifyContent="center">
        <Box
          sx={{
            padding: 0,
            [theme.breakpoints.up("tablet")]: {
              padding: theme.spacing(5, 3),
            },
            [theme.breakpoints.up("laptop")]: {
              padding: theme.spacing(5, 3),
              maxWidth: "1200px",
            },
          }}
        >
          <Box
            sx={{
              "background":
                "linear-gradient(179.61deg, #FFFFFF 0.33%, rgba(255, 255, 255, 0) 34.99%, #FFFFFF 99.66%)",
              "boxShadow":
                "0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)",
              "borderRadius": theme.spacing(5),
              "padding": theme.spacing(5, 3),
              "display": "flex",
              "flexDirection": "column",
              "justifyContent": "center",
              "alignItems": "center",
              "> .h3": {
                "fontWeight": 700,
                "fontSize": theme.spacing(3),
                "textAlign": "center",
                "textShadow":
                  "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
                "paddingBottom": theme.spacing(3),
                [theme.breakpoints.up("laptop")]: {
                  fontSize: theme.spacing(5),
                },
                "> .h3": {
                  fontWeight: 700,
                  fontSize: theme.spacing(3),
                  textAlign: "center",
                  display: "inline",
                  textShadow:
                    "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
                  [theme.breakpoints.up("laptop")]: {
                    fontSize: theme.spacing(5),
                  },
                },
              },
              [theme.breakpoints.up("laptop")]: {
                padding: theme.spacing(8, 10),
              },
            }}
          >
            <Typography
              color={theme.palette.custom.forbole.blue}
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(2),
                paddingBottom: theme.spacing(3),
                [theme.breakpoints.up("laptop")]: {
                  fontWeight: 700,
                  fontSize: theme.spacing(3),
                },
              }}
              variant="body1"
            >
              {t("why forbole?")}
            </Typography>
            <Trans
              components={[
                <Box
                  className="h3"
                  sx={{
                    color: theme.palette.custom.forbole.indigo6,
                    width: "80%",
                  }}
                />,
                <Box
                  className="h3"
                  sx={{
                    background:
                      "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    width: "80%",
                  }}
                />,
              ]}
              i18nKey={t("why forbole title")}
            />
            {reasons.map((reason, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: theme.spacing(7),
                  [theme.breakpoints.up("laptop")]: {
                    flexDirection: i % 2 === 0 ? "row-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  },
                }}
              >
                {reason?.image && (
                  <Image
                    height={onlyLargeScreen ? "370px" : "260px"}
                    objectFit="contain"
                    src={reason.image}
                    width={onlyLargeScreen ? "314px" : "220px"}
                  />
                )}
                <Box
                  alignItems={onlyLargeScreen ? "flex-start" : "center"}
                  display="flex"
                  flexDirection="column"
                  justifyContent={onlyLargeScreen ? "flex-start" : "center"}
                  sx={{ [theme.breakpoints.up("laptop")]: { width: "50%" } }}
                >
                  <Typography
                    color={theme.palette.custom.forbole.blue}
                    fontSize={
                      onlyLargeScreen ? theme.spacing(4) : theme.spacing(2.25)
                    }
                    fontWeight={600}
                    sx={{
                      padding: theme.spacing(5.75, 0, 3, 0),
                      [theme.breakpoints.up("laptop")]: {
                        paddingTop: 0,
                      },
                    }}
                    variant="h4"
                  >
                    {t(reason.title)}
                  </Typography>
                  <Typography
                    color={theme.palette.custom.forbole.blue}
                    fontSize={
                      onlyLargeScreen ? theme.spacing(2) : theme.spacing(1.75)
                    }
                    sx={{
                      textAlign: "center",
                      lineHeight: theme.spacing(2.5),
                      [theme.breakpoints.up("laptop")]: {
                        textAlign: "start",
                        lineHeight: theme.spacing(3),
                      },
                    }}
                    variant="body1"
                  >
                    {t(reason.desc)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhyForbole;
