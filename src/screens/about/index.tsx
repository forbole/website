import React from "react";
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
    <Layout
      title={t("title")}
      description={t("description")}
      image="/static/images/assets/Facebook-who-we-are.png"
      twitterImage="/static/images/assets/Twitter-who-we-are.png"
    >
      <Header />
      <WhatWeDo />
      <Milestones />
      <Team />
      <Opportunities />
    </Layout>
  );
};

export default About;
