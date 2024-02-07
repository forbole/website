import type { NextPage } from "next";

import StakingPage from "@src/screens/staking";
import { StakingProvider } from "@src/screens/staking/lib/staking_sdk/context";

const Staking: NextPage = () => (
  <StakingProvider>
    <StakingPage />
  </StakingProvider>
);

export default Staking;
