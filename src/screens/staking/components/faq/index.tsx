import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

import Card from "./components/card";
import { useFaq } from "./config";
import * as styles from "./index.module.scss";

const FAQ = () => {
  const { t } = useTranslation("staking");
  const [expanded, setExpanded] = useState<string>();
  const faq = useFaq();
  const middleIndex = Math.ceil(faq.length / 2) - 1;

  return (
    <Box display="flex" justifyContent="center">
      <Box className={styles.wrapper}>
        <Typography className={styles.faqText} variant="h3">
          {t("faq")}
        </Typography>
        <Box className={styles.content}>
          <Box alignContent="flex-start" display="flex" flexWrap="wrap">
            <Box className={styles.container}>
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
            <Box className={styles.faqItem}>
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
