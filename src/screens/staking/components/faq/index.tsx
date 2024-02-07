import useTranslation from "next-translate/useTranslation";
import { memo, useState } from "react";

import Card from "./components/card";
import { useFaq } from "./config";
import * as styles from "./index.module.scss";

const FAQ = () => {
  const { t } = useTranslation("staking");
  const [expanded, setExpanded] = useState<string>();
  const faq = useFaq();
  const middleIndex = Math.ceil(faq.length / 2) - 1;

  return (
    <div className={styles.wrapperTop}>
      <div className={styles.wrapper}>
        <h3 className={styles.faqText}>{t("faq")}</h3>
        <div className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.container}>
              {faq.map((x, i) => {
                if (i > middleIndex) return null;

                const {
                  bullet1,
                  bullet2,
                  bullet3,
                  desc,
                  para1,
                  para2,
                  para3,
                  question,
                  trans,
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
            </div>
            <div className={styles.faqItem}>
              {faq.map((x, i) => {
                if (i <= middleIndex) return null;

                const {
                  bullet1,
                  bullet2,
                  bullet3,
                  desc,
                  para1,
                  para2,
                  para3,
                  question,
                  trans,
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FAQ);
