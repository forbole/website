import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

import LayoutVal from "@src/components/layout_val";
import Tooltip from "@src/screens/staking/components/tooltip";
import GQLProvider from "@src/utils/gql";

import CalculateRewards from "./components/calculate_rewards";
import ContactForbole from "./components/contact_forbole";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import HowItWorks from "./components/how_it_works";
import Networks from "./components/networks";
import WhyForbole from "./components/why_forbole";
import { StakingProvider } from "./lib/context";
import { LaptopCSS } from "./styles";

const StakingSection = dynamic(() => import("./components/staking_section"), {
  ssr: false,
}) as unknown as React.FC;

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
    <StakingProvider>
      <GQLProvider>
        <LayoutVal
          footer
          image="/images/assets/image_forbole_validator_website_preview.png"
          stakeNowRef={stakeNowRef}
          title={t("title")}
          twitterImage="/images/assets/image_forbole_validator_website_preview.png"
        >
          <LaptopCSS>
            <Hero />
          </LaptopCSS>
          <LaptopCSS>
            <StakingSection />.
          </LaptopCSS>
          <LaptopCSS>
            <Networks />
          </LaptopCSS>
          <LaptopCSS>
            <HowItWorks />
          </LaptopCSS>
          <LaptopCSS>
            <WhyForbole />
          </LaptopCSS>
          <LaptopCSS ref={stakeNowRef}>
            <CalculateRewards />
          </LaptopCSS>
          <LaptopCSS>
            <ContactForbole />
          </LaptopCSS>
          <LaptopCSS>
            <FAQ />
          </LaptopCSS>
        </LayoutVal>
        <Tooltip />
      </GQLProvider>
    </StakingProvider>
  );
};

export default Staking;
