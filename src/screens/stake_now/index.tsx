import React from "react";
import Head from "next/head";
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
    <Layout title={t("title")} description={t("description")}>
      <Head>
        <meta
          name="og:image"
          content="/static/images/assets/Facebook-stake-with-Forbole.png"
        />
        <meta
          name="twitter:image"
          content="/static/images/assets/Twitter-stake-with-Forbole.png"
        />
      </Head>
      <ForboleStakes />
      <CalculateRewards />
      <SupportedNetworks />
    </Layout>
  );
};

export default StakeNow;
