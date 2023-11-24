import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { Card } from "./components";
import { useFaq } from "./config";

const FAQ = () => {
  const theme = useTheme();
  const { t } = useTranslation("staking");
  const [expanded, setExpanded] = React.useState<string>();
  const faq = useFaq();
  const middleIndex = Math.ceil(faq.length / 2) - 1;

  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          [theme.breakpoints.up("laptop")]: {
            maxWidth: "1200px",
          },
        }}
      >
        <Typography
          sx={{
            textShadow:
              "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
            fontWeight: 700,
            fontSize: theme.spacing(3),
            textAlign: "center",
            paddingBottom: theme.spacing(5),
            color: theme.palette.custom.forbole.blue,
            [theme.breakpoints.up("laptop")]: {
              fontSize: theme.spacing(5),
            },
          }}
          variant="h3"
        >
          {t("faq")}
        </Typography>
        <Box
          sx={{
            [theme.breakpoints.up("laptop")]: {
              paddingBottom: theme.spacing(25),
            },
          }}
        >
          <Box alignContent="flex-start" display="flex" flexWrap="wrap">
            <Box
              sx={{
                flexBasis: "100%",
                [theme.breakpoints.up("laptop")]: {
                  flexBasis: "50%",
                },
              }}
            >
              {faq.map((x, i) => {
                if (i > middleIndex) return null;
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
                } = x;

                return (
                  <Card
                    bullet1={bullet1}
                    bullet2={bullet2}
                    bullet3={bullet3}
                    desc={desc}
                    expanded={expanded === question}
                    key={question}
                    para1={para1}
                    para2={para2}
                    para3={para3}
                    question={question}
                    setExpanded={() =>
                      setExpanded((prev) =>
                        prev === question ? undefined : question,
                      )
                    }
                    trans={trans}
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                flexBasis: "100%",
                [theme.breakpoints.up("laptop")]: {
                  flexBasis: "50%",
                },
              }}
            >
              {faq.map((x, i) => {
                if (i <= middleIndex) return null;
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
                } = x;

                return (
                  <Card
                    bullet1={bullet1}
                    bullet2={bullet2}
                    bullet3={bullet3}
                    desc={desc}
                    expanded={expanded === question}
                    key={question}
                    para1={para1}
                    para2={para2}
                    para3={para3}
                    question={question}
                    setExpanded={() =>
                      setExpanded((prev) =>
                        prev === question ? undefined : question,
                      )
                    }
                    trans={trans}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;
