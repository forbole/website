import React from "react";
import Head from "next/head";
import { useTranslation } from "i18n";
import { theme } from "@styles";
import { Layout } from "@components";
import { DesmosBody, MooncakeBody } from "./components";

const { colors } = theme;

const Desmos = () => {
  const { t } = useTranslation("desmos");

  return (
    <Layout
      title={t("title")}
      description={t("description")}
      navColor={colors.gray600}
    >
      <Head>
        <meta
          name="og:image"
          content="/static/images/assets/Facebook-Desmos.png"
        />
        <meta
          name="twitter:image"
          content="/static/images/assets/Twitter-Desmos.png"
        />
      </Head>
      <div>
        <DesmosBody />
        <MooncakeBody />
      </div>
    </Layout>
  );
};

export default Desmos;
