import React from "react";
import Head from "next/head";
import { useTranslation } from "i18n";
import { Layout } from "@components";
import { BigDipperCSS } from "./styles";
import {
  BigDipperHeader,
  BigDipperContent,
  EcoProjects,
  DashboardContent,
} from "./components";

const BigDipper = () => {
  const { t } = useTranslation("big_dipper");
  return (
    <BigDipperCSS>
      <Layout title={t("title")} description={t("description")}>
        <Head>
          <meta
            name="og:image"
            content="/static/images/assets/Facebook-Bigdipper.png"
          />
          <meta
            name="twitter:image"
            content="/static/images/assets/Twitter-Bigdipper.png"
          />
        </Head>
        <BigDipperHeader />
        <BigDipperContent />
        <EcoProjects />
        <DashboardContent />
      </Layout>
    </BigDipperCSS>
  );
};

export default BigDipper;
