import useTranslation from "next-translate/useTranslation";
import React, { useRef } from "react";

import { LayoutVal } from "@src/components";
import AppApolloProvider from "@src/utils/apollo";

import {
  CalculateRewards,
  ContactForbole,
  FAQ,
  Hero,
  HowItWorks,
  Networks,
  WhyForbole,
} from "./components";
import { LaptopCSS } from "./styles";

const Staking = () => {
  const { t } = useTranslation("staking");
  const stakeNowRef = useRef(null);

  React.useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <AppApolloProvider>
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
    </AppApolloProvider>
  );
};

export default Staking;
