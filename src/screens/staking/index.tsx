import useTranslation from "next-translate/useTranslation";
import posthog from "posthog-js";
import { useEffect, useRef } from "react";

import LayoutVal from "@src/components/layout_val";
import Tooltip from "@src/components/tooltip";
import GQLProvider from "@src/utils/gql";

import CalculateRewards from "./components/calculate_rewards";
import ContactForbole from "./components/contact_forbole";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import HowItWorks from "./components/how_it_works";
import Networks from "./components/networks";
import ShowMore from "./components/show_more";
import WhyForbole from "./components/why_forbole";
import * as styles from "./index.module.scss";
import { useStakingRef } from "./lib/staking_sdk/context";
import { getHasConnectedWallets } from "./lib/staking_sdk/context/selectors";

const Staking = () => {
  const { t } = useTranslation("staking");
  const stakingRef = useStakingRef();
  const ref = useRef(null);

  const hasConnectedWallets = getHasConnectedWallets(stakingRef.current.state);

  useEffect(() => {
    posthog.opt_in_capturing();

    return () => posthog.opt_out_capturing();
  }, []);

  const extraInfo = (
    <>
      <div className={styles.container}>
        <HowItWorks />
      </div>
      <div className={styles.container}>
        <WhyForbole />
      </div>
    </>
  );

  return (
    <GQLProvider>
      <LayoutVal
        footer
        image="/images/assets/image_forbole_validator_website_preview.png"
        title={t("title")}
        twitterImage="/images/assets/image_forbole_validator_website_preview.png"
      >
        <div className={styles.container}>
          <Hero scrollRef={ref} />
        </div>
        <div className={styles.container}>
          <Networks scrollRef={ref} />
        </div>
        {hasConnectedWallets ? <ShowMore>{extraInfo}</ShowMore> : extraInfo}
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
