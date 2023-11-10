import { ExpandIcon } from "@icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

import { FAQProps } from "../../config";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const Card = (props: FAQProps) => {
  const theme = useTheme();
  const { t } = useTranslation("staking");
  const {
    question,
    para1,
    para2,
    trans,
    para3,
    desc,
    bullet1,
    bullet2,
    bullet3,
    expanded,
    setExpanded,
  } = props;

  return (
    <Box
      sx={{
        padding: theme.spacing(2, 5),
        borderRadius: theme.spacing(2),
      }}
    >
      <Accordion
        expanded={expanded}
        onChange={setExpanded}
        sx={{
          "background": theme.palette.primary.main,
          "borderRadius": `${theme.spacing(2)} !important` as any,
          "display": "flex",
          "flexDirection": "column",
          "alignItems": "flex-start",
          "boxShadow": "4px 8px 24px rgba(116, 81, 255, 0.28)",
          "& .MuiAccordionSummary-content": {
            flexGrow: 12,
          },
          "& .MuiIconButton-root": {
            flexGrow: 1,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandIcon />}
          sx={{
            "width": "100%",
            "padding": expanded
              ? theme.spacing(3, 5, 2, 3)
              : theme.spacing(3, 5, 3, 3),
            "> .MuiAccordionSummary-expandIconWrapper": {
              svg: {
                fill: "#878787",
              },
            },
            "& .Mui-expanded": {
              h3: {
                background:
                  "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                backgroundClip: "text",
                textFillColor: "transparent",
              },
            },
          }}
        >
          <Typography
            sx={{
              color: theme.palette.custom.forbole.blue,
              textShadow:
                "0px 8px 22px rgba(2, 38, 225, 0.12), 0px 14px 64px rgba(2, 38, 225, 0.12)",
              fontSize: theme.spacing(2),
              lineHeight: "20px",
              letterSpacing: "-0.034em",
              fontWeight: 600,
              width: "80%",
            }}
            variant="h3"
          >
            {t(question)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            p: {
              "letterSpacing": "-0.012em",
              "color": theme.palette.custom.forbole.blue,
              "padding": theme.spacing(0, 3, 3, 3),
              "> p": {
                "paddingBottom": theme.spacing(2),
                "&:last-child": {
                  paddingBottom: theme.spacing(1),
                },
              },
              "> li": {
                padding: theme.spacing(0, 0, 1, 0),
              },
            },
          }}
        >
          {para1 && <Typography variant="body1">{t(para1)}</Typography>}
          {para2 && <Typography variant="body1">{t(para2)}</Typography>}
          {trans && (
            <Trans
              components={[
                <Typography
                  color={theme.palette.custom.forbole.blue}
                  sx={{
                    fontSize: theme.spacing(2),
                    [theme.breakpoints.up("laptop")]: {
                      fontSize: theme.spacing(2),
                    },
                  }}
                  variant="body1"
                />,
                <Link href="/stake-now">
                  <Typography
                    color="primary.main"
                    fontWeight={900}
                    sx={{
                      display: "inline",
                      fontSize: theme.spacing(1.5),
                      [theme.breakpoints.up("laptop")]: {
                        fontSize: theme.spacing(2),
                        display: "inline",
                      },
                    }}
                  />
                </Link>,
              ]}
              i18nKey={t(trans)}
            />
          )}
          {para3 && <Typography variant="body1">{t(para3)}</Typography>}
          {desc && <Typography variant="body1">{t(desc)}</Typography>}
          {bullet1 && (
            <ListItem sx={{ display: "list-item" }}>{t(bullet1)}</ListItem>
          )}
          {bullet2 && (
            <ListItem sx={{ display: "list-item" }}>{t(bullet2)}</ListItem>
          )}
          {bullet3 && (
            <ListItem sx={{ display: "list-item" }}>{t(bullet3)}</ListItem>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Card;
