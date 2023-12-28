import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef } from "react";

import LayoutVal from "@src/components/layout_val";
import AppApolloProvider from "@src/utils/apollo";

import CalculateRewards from "./components/calculate_rewards";
import ContactForbole from "./components/contact_forbole";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import HowItWorks from "./components/how_it_works";
import Networks from "./components/networks";
import WhyForbole from "./components/why_forbole";
import { LaptopCSS } from "./styles";

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
