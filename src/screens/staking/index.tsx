import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";

import LayoutVal from "@src/components/layout_val";
import Tooltip from "@src/components/tooltip";
import GQLProvider from "@src/utils/gql";

import CalculateRewards from "./components/calculate_rewards";
import ContactForbole from "./components/contact_forbole";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import HowItWorks from "./components/how_it_works";
import Networks from "./components/networks";
import WhyForbole from "./components/why_forbole";
import * as styles from "./index.module.scss";
import {
  getHasConnectedWallets,
  useStakingRef,
} from "./lib/staking_sdk/context";

const Staking = () => {
  const { t } = useTranslation("staking");
  const stakingRef = useStakingRef();

  const hasConnectedWallets = getHasConnectedWallets(stakingRef.current.state);

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
        title={t("title")}
        twitterImage="/images/assets/image_forbole_validator_website_preview.png"
      >
        <div className={styles.container}>
          <Hero />
        </div>
        <div className={styles.container}>
          <Networks />
        </div>
        {!hasConnectedWallets && (
          <div className={styles.container}>
            <HowItWorks />
          </div>
        )}
        {!hasConnectedWallets && (
          <div className={styles.container}>
            <WhyForbole />
          </div>
        )}
        <div className={styles.container}>
          <CalculateRewards />
        </div>
        {!hasConnectedWallets && (
          <div className={styles.container}>
            <ContactForbole />
          </div>
        )}
        <div className={styles.container}>
          <FAQ />
        </div>
      </LayoutVal>
      <Tooltip />
    </GQLProvider>
  );
};

export default Staking;
