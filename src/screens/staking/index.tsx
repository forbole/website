import { LayoutVal } from "@components";
import { StakingContextProvider } from "@src/contexts";
import React, { useRef } from "react";

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
  const stakeNowRef = useRef(null);
  React.useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <LayoutVal
      stakeNowRef={stakeNowRef}
      navLink="staking"
      image="/images/assets/image_forbole_validator_website_preview.png"
      twitterImage="/images/assets/image_forbole_validator_website_preview.png"
      footer
    >
      <StakingContextProvider>
        <LaptopCSS>
          <Hero />
        </LaptopCSS>
        <LaptopCSS>
          <Networks />
        </LaptopCSS>
      </StakingContextProvider>
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
  );
};

export default Staking;
