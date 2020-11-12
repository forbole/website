import React from "react";
import Head from "next/head";
import { useTranslation } from "i18n";
import { Layout } from "@components";
import {
  Header,
  WhatWeDo,
  Milestones,
  Team,
  Opportunities,
} from "./components";

const About = () => {
  const { t } = useTranslation("about");
  return (
    <Layout title={t("title")} description={t("description")}>
      <Head>
        <meta
          name="og:image"
          content="/static/images/assets/Facebook-who-we-are.png"
        />
        <meta
          name="twitter:image"
          content="/static/images/assets/Twitter-who-we-are.png"
        />
      </Head>
      <Header />
      <WhatWeDo />
      <Milestones />
      <Team />
      <Opportunities />
    </Layout>
  );
};

export default About;
