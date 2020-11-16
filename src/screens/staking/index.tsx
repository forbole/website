import React from "react";
import { useTranslation } from "i18n";
import { Layout } from "@components";
import { StakingCover, WhatIsStaking, EcoSystemProjects } from "./components";

const Staking = () => {
  const { t } = useTranslation("staking");
  return (
    <Layout
      title={t("title")}
      description={t("description")}
      image="/static/images/assets/Facebook-Get-to-know-Staking.png"
      twitterImage="/static/images/assets/Twitter-Get-to-know-Staking.png"
    >
      <StakingCover />
      <WhatIsStaking />
      <EcoSystemProjects />
    </Layout>
  );
};

export default Staking;
