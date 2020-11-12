import React from "react";
import Head from "next/head";
import { useTranslation } from "i18n";
import { Layout } from "@components";
import { ContactHeader, ContactMessage, ContactInfo } from "./components";
import { ContactPageCSS } from "./styles";

const Contact = () => {
  const { t } = useTranslation("contact");
  return (
    <Layout title={t("title")} description={t("description")}>
      <Head>
        <meta
          name="og:image"
          content="/static/images/assets/Facebook-Contact-us.png"
        />
        <meta
          name="twitter:image"
          content="/static/images/assets/Twitter-Contact-us.png"
        />
      </Head>
      <ContactPageCSS>
        <ContactHeader />
        <div className="wrapper">
          <div className="left">
            <ContactMessage />
          </div>
          <div className="right">
            <ContactInfo />
          </div>
        </div>
      </ContactPageCSS>
    </Layout>
  );
};

export default Contact;
