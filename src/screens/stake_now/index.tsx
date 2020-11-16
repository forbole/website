import React from "react";
import { useTranslation } from "i18n";
import { Layout } from "@components";
import {
  ForboleStakes,
  CalculateRewards,
  SupportedNetworks,
} from "./components";

const StakeNow = () => {
  const { t } = useTranslation("stake_now");

  return (
    <Layout
      title={t("title")}
      description={t("description")}
      image="/static/images/assets/Facebook-stake-with-Forbole.png"
      twitterImage="/static/images/assets/Twitter-stake-with-Forbole.png"
    >
      <ForboleStakes />
      <CalculateRewards />
      <SupportedNetworks />
    </Layout>
  );
};

export default StakeNow;
