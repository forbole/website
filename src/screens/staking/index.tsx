import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef } from "react";

import LayoutVal from "@src/components/layout_val";
import GQLProvider from "@src/utils/gql";

import CalculateRewards from "./components/calculate_rewards";
import ContactForbole from "./components/contact_forbole";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import HowItWorks from "./components/how_it_works";
import Networks from "./components/networks";
import WhyForbole from "./components/why_forbole";
import * as styles from "./index.module.scss";

const Staking = () => {
  const { t } = useTranslation("staking");
  const stakeNowRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);

  return (
    <GQLProvider>
      <LayoutVal
        footer
        image="/images/assets/image_forbole_validator_website_preview.png"
        stakeNowRef={stakeNowRef}
        title={t("title")}
        twitterImage="/images/assets/image_forbole_validator_website_preview.png"
      >
        <div className={styles.container}>
          <Hero />
        </div>
        <div className={styles.container}>
          <Networks />
        </div>
        <div className={styles.container}>
          <HowItWorks />
        </div>
        <div className={styles.container}>
          <WhyForbole />
        </div>
        <div className={styles.container} ref={stakeNowRef}>
          <CalculateRewards />
        </div>
        <div className={styles.container}>
          <ContactForbole />
        </div>
        <div className={styles.container}>
          <FAQ />
        </div>
      </LayoutVal>
    </GQLProvider>
  );
};

export default Staking;
