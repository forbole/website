import React from "react";
import Head from "next/head";
import { useTranslation } from "i18n";
import { Layout } from "@components";
import { StakingCover, WhatIsStaking, EcoSystemProjects } from "./components";

const Staking = () => {
  const { t } = useTranslation("staking");
  return (
    <Layout title={t("title")} description={t("description")}>
      <Head>
        <meta
          name="og:image"
          content="/static/images/assets/Facebook-Get-to-know-Staking.png"
        />
        <meta
          name="twitter:image"
          content="/static/images/assets/Twitter-Get-to-know-Staking.png"
        />
      </Head>
      <StakingCover />
      <WhatIsStaking />
      <EcoSystemProjects />
    </Layout>
  );
};

export default Staking;
