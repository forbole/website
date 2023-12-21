import { Box, Container, Typography, useTheme } from "@mui/material";
import Link from "@mui/material/Link";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

import Layout from "@src/components/layout";
import ScrollToTop from "@src/components/scroll_to_top";

import { TNCCSS } from "../terms_and_conditions/styles";
import * as styles from "./index.module.scss";

const Trans = dynamic(async () => import("next-translate/Trans"), {
  ssr: false,
});

const Policy = () => {
  const { t } = useTranslation("policy");
  const theme = useTheme();

  const topRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    (document.querySelectorAll(".t1") as NodeListOf<HTMLElement>).forEach(
      (d) => {
        if (!d.parentElement) return;
        const h = d.parentElement.offsetHeight - 1;
        // eslint-disable-next-line no-param-reassign
        d.style.height = `${h}px`;
      },
    );
  });

  return (
    <Layout footer title={t("title")}>
      <Container maxWidth="desktop">
        <Box className={styles.top} ref={topRef}>
          <Box>
            <Typography className={styles.title} variant="h2">
              {t("title")}
            </Typography>
          </Box>
          <Box className={styles.content}>
            <TNCCSS>
              <Box className={styles.tnc}>
                <Typography className={styles.contentTitle} variant="h2">
                  {t("title")}
                </Typography>
                <Typography className={styles.updatedDate} variant="body1">
                  {t("updatedDate")}
                </Typography>
                <Trans
                  components={[
                    <Typography
                      className={styles.tr0}
                      key="0"
                      variant="body1"
                    />,
                    <Typography
                      className={styles.tr1}
                      component="span"
                      key="1"
                    />,
                    <Link
                      className={styles.tr2}
                      href="https://forbole.com"
                      key="2"
                      rel="noreferrer"
                      target="_blank"
                    />,
                  ]}
                  i18nKey="description1"
                  ns="policy"
                />
                <Typography className={styles.description2} variant="body1">
                  {t("description2")}
                </Typography>

                <>
                  <meta
                    content="text/html; charset=UTF-8"
                    httpEquiv="content-type"
                  />
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={["c13", styles.sectionWrapper].join(" ")}>
                    <span>
                      By engaging with our Platform and using our Services, you
                      accept the privacy practices as set out in this policy, as
                      may be modified or supplemented from time to time
                    </span>
                    <span className="c8" style={{ fontWeight: 700 }}>
                      .{" "}
                    </span>
                    <span className={styles.c2}>
                      If you are engaging with our Platform or using our
                      Services as a representative of an organisation, you are
                      accepting these practices on their behalf.{" "}
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c13"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      If you have any questions about this policy or any privacy
                      issues related to your use of our Services, please contact
                      us by email to privacy@forbole.com .
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span
                      className="c5"
                      style={{
                        color: "#000",

                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      <span className="t1">1.</span> About us
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">1.1</span> Forbole is a leading
                      provider of blockchain solutions. We offer non-custodial
                      staking service for tokenholders with enterprise-grade
                      security. We also offer open source tools such as Big
                      Dipper, our award-winning block explorer that helps users
                      visualise and interact with on-chain data.
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">1.2</span> Forbole Technology Limited
                      is a company incorporated in Hong Kong with company
                      registration number 3282304, having its registered office
                      at 7/F, Cheung Hing Industrial Building, 12P Smithfield,
                      Kennedy Town, Hong Kong.
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span
                      className="c5"
                      style={{
                        color: "#000",

                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      <span className="t1">2.</span> Personal information we
                      collect from you
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className="t1">2.1</span> For the purpose of this
                    policy, “
                    <span className="c8" style={{ fontWeight: 700 }}>
                      personal data
                    </span>
                    <span className={styles.c2}>
                      ” refers to any information which is related to an
                      identified or identifiable natural person. “Personal data”
                      and “personal information” are used interchangeably.
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">2.2</span> We collect from you:
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(a)</span> personal information you
                      provide to us through the Services, including:
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c6"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">(i)</span> account data, such as your
                      blockchain wallet public address;
                    </span>
                  </p>
                  <p
                    className="c0"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      height: "11pt",
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c6"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">(ii)</span> contact information, such
                      as your name, company name and email address;
                    </span>
                  </p>
                  <p
                    className="c0"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      height: "11pt",
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c6"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">(iii)</span> social information, such
                      as your social media account that you disclose to us or
                      your blockchain wallet or blockchain profile you connect
                      to the Services;
                    </span>
                  </p>
                  <p
                    className="c0"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      height: "11pt",
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c6"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">(iv)</span> transaction information,
                      such as transaction record of your blockchain wallet
                      address; and
                    </span>
                  </p>
                  <p
                    className="c0"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      height: "11pt",
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c6"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">(v)</span> content that you create,
                      such as any posts or comments you publish on our Platform
                      or our Services;{" "}
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(b)</span> information we (or through
                      third-party services that we engage) automatically collect
                      from you through the Services, including:
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c6"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">(i)</span> information about your
                      computer or mobile device that you use to access our
                      Platform or our Services, such as device IP addresses,
                      device operating systems, browser types and settings;
                    </span>
                  </p>
                  <p
                    className="c0"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      height: "11pt",
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c6"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">(ii)</span> information about your
                      online activities and actions on the Platform, such as
                      your usage data, navigation path, frequency of visit and
                      length of access to the Platform, whether you are
                      returning or new user; and
                    </span>
                  </p>
                  <p
                    className="c0"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      height: "11pt",
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2} />
                  </p>
                  <p
                    className="c6"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      marginLeft: "8em",
                      orphans: 2,
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">(iii)</span> information about your
                      web traffic, settings or preferences collected via cookies
                      (text files that websites store on a visitor’s device to
                      uniquely identify the visitor’s browser or store
                      information), browser web storage or locally stored
                      objects, web beacons or similar technologies.
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className="t1">2.3 </span>
                    <span
                      className="c5"
                      style={{
                        color: "#000",

                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      Due to the immutable, permanent and transparent nature of
                      blockchain protocols and applications, you must carefully
                      consider what information you choose to publish about
                      yourself or share with others, since you may not be able
                      to erase, remove or delete it, nor control who has access
                      to it.
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">2.4</span> We do not collect
                      sensitive data or special category data about you. This
                      includes details about your race, ethnic origin, politics,
                      religion, trade union membership, genetics, biometrics,
                      health, or sexual orientation.
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">2.5</span> We do not knowingly
                      collect or use personal data from minors.
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span
                      className="c5"
                      style={{
                        color: "#000",

                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      <span className="t1">3.</span> How we use personal
                      information
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">3.1</span> We use your personal
                      information as necessary to deliver our Services to you,
                      including:
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(a)</span> to operate the Services
                      and our business;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(b)</span> to maintain and improve
                      our Services or certain functionalities or features of our
                      Services;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(c)</span> to process your
                      transactions or your interactions with various blockchain
                      networks and protocols;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(d)</span> to communicate with you
                      regarding the Services, such as announcements, updates,
                      security alerts, and system administrative information;
                      and
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(e)</span> to provide support when
                      you use our Services, such as responding to your requests
                      and enquiries.
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">3.2</span> In addition, we use your
                      personal information for legitimate business purposes,
                      including:
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(a)</span> to update you about our
                      Services or notifying you about our new products and
                      features;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(b)</span> to analyse, research and
                      review user behaviour anonymously or on an aggregated
                      basis, and to develop and evaluate new products or
                      features;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(c)</span> to investigate issues such
                      as security breaches, cyberattacks or scams;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(d)</span> to comply with applicable
                      laws and regulations, or to defend legal actions against
                      you, us or other users of the Platform; and
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(e)</span> to enforce the Terms of
                      Use that govern the use of the Platform and the Services.{" "}
                    </span>
                  </p>
                  <p className={styles.c3}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">3.3</span> We may also use personal
                      information for any purposes for which you grant us your
                      specific consent.
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className="t1">4. </span>
                    <span
                      className="c5"
                      style={{
                        color: "#000",

                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      How we share your personal information
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">4.1</span> We do not sell your
                      personal information.
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2}>
                      <span className="t1">4.2</span> We share your personal
                      information with the following parties:
                    </span>
                  </p>
                  <p className={[styles.c10, styles.c4].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(a)</span> other companies within our
                      group, in order to operate our Platform and offer our
                      products and services;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(b)</span> service providers
                      (including companies and individuals) that help us operate
                      the Services, such as web traffic tracking, analytics,
                      storage, communication or payment solutions;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(c)</span> professional advisors,
                      including lawyers, attorneys, auditors, bankers and
                      insurers where necessary;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(d)</span> law enforcement, judicial,
                      regulatory or governmental authorities where applicable;
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(e)</span> parties that acquire
                      control over all or any substantial portion of the
                      business or assets of Forbole, such as in a business
                      merger, acquisition or reorganisation or transactions with
                      similar nature; and{" "}
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c1}>
                    <span className={styles.c2}>
                      <span className="t1">(f)</span> third party platforms
                      where you have enabled features or functionality that
                      connect the Services with any third party’s services, in
                      which case you must review the terms and conditions and
                      privacy policy of such third party.
                    </span>
                  </p>
                  <p className={[styles.c1, styles.c10].join(" ")}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c4}>
                    <span className={styles.c2} />
                  </p>
                  <p className={styles.c12}>
                    <span className="t1">5.</span> Your choices
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className="t1">5.1</span> You may update or correct
                    any personal information we hold in our systems anytime by
                    contacting us at privacy@forbole.com .{" "}
                    <span className="c8" style={{ fontWeight: 700 }}>
                      However, due to the immutable, permanent and transparent
                      nature of blockchain protocols and applications, we are
                      unable to erase, remove or delete your information
                      recorded on-chain, or any files that have been posted to
                      the InterPlanetary File System or similar decentralised
                      storage systems
                    </span>
                    <span className={styles.c2}>.</span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">5.2</span> You may opt out of our
                      updates, newsletters or notifications by unsubscribing the
                      relevant mailing lists or contacting us at
                      privacy@forbole.com . However, you may not opt out of
                      receiving notifications that are transactional (such as
                      completion of on-chain transaction) or administrative
                      (such as announcement related to security breaches or
                      cyberattacks).
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">5.3</span> You may opt out from
                      online tracking, such as blocking cookies in your browser
                      by following instructions in your browser settings, or
                      installing and configuring browser plugins.
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">5.4</span> If you have given us
                      consent to use your personal information for a specific
                      purpose, you may withdraw your consent anytime by
                      contacting us at privacy@forbole.com .
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">5.5</span> If you have any questions
                      or feedback regarding how we address your requests
                      concerning your personal data, please contact us at
                      privacy@forbole.com .
                    </span>
                  </p>
                  <p className={styles.c12}>
                    <span
                      className="c5"
                      style={{
                        color: "#000",
                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      <span className="t1">6.</span> Third-party websites
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span>
                      <span className="t1">6.1</span> Our Platform includes
                      links to third-party websites, such as the websites of
                      various blockchain networks or crypto projects. If you
                      access any of these third-party websites, you will be
                      doing so at your own risk. We do not control any
                      third-party websites, or any products or services offered
                      by third parties and we are not responsible for their
                      actions or omissions in privacy practices.
                    </span>
                  </p>
                  <p className={styles.c12}>
                    <span
                      className="c5"
                      style={{
                        color: "#000",

                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      <span className="t1">7.</span> Retention of your personal
                      data
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">7.1</span> We only keep your personal
                      information for as long as necessary to fulfil the
                      purposes for which your personal information is collected,
                      including for the purposes of fulfilling any legal,
                      accounting or reporting requirements.{" "}
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">7.2</span> However, due to the
                      immutable, permanent and transparent nature of blockchain
                      protocols and applications, we are unable to erase, remove
                      or delete your information recorded on-chain, or any files
                      that have been posted to the InterPlanetary File System or
                      similar decentralised storage systems even after the
                      retention period has expired.
                    </span>
                  </p>
                  <p className={styles.c12}>
                    <span className="c8" style={{ fontWeight: 700 }}>
                      <span className="t1">8.</span> Security and transfer of
                      your personal data
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">8.1</span> We employ a number of
                      technical and organisational measures to safeguard the
                      security of the personal information we collect. However,
                      we are unable to guarantee the security of your personal
                      information.
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">8.2</span> Within Forbole, access to
                      your personal information is restricted to personnel or
                      service providers on a strictly need-to-know basis.{" "}
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">8.3</span> We collect personal
                      information globally. We may transfer, process and store
                      your personal information outside your country of
                      residence, and the parties with whom we share your
                      personal information may operate in a country outside your
                      country of residence.
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",

                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span className={styles.c2}>
                      <span className="t1">8.4</span> Some of the countries in
                      which the parties with whom we share your personal
                      information operate may not have the privacy and data
                      protection laws that are equivalent to those in your
                      country of residence. When we share information with these
                      parties, we use our best endeavours (such as by entering
                      into contractual terms) to safeguard the security of the
                      information transferred.{" "}
                    </span>
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",

                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",

                      orphans: 2,

                      textAlign: "left",

                      widows: 2,
                    }}
                  >
                    <span
                      className="c5"
                      style={{
                        color: "#000",

                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      <span className="t1">9.</span> Update or amendment
                    </span>
                  </p>
                  <p
                    className=" li"
                    style={{
                      color: "#000",
                      fontSize: "11pt",
                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    We reserve the right to update or amend this policy at any
                    time.
                  </p>
                  <p
                    className="c7"
                    style={{
                      color: "#000",
                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span
                      className="c5"
                      style={{
                        color: "#000",
                        fontSize: "11pt",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textDecoration: "none",
                        verticalAlign: "baseline",
                      }}
                    >
                      <span className="t1">10.</span> Contact us
                    </span>
                  </p>
                  <p
                    className="c7 li"
                    style={{
                      color: "#000",
                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    You may reach us by email at privacy@forbole.com , or at the
                    following address:
                  </p>
                  <p
                    className="c7  li"
                    style={{
                      color: "#000",
                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      orphans: 2,

                      textAlign: "left",
                      widows: 2,
                    }}
                  >
                    <span>
                      {" "}
                      7/F, Cheung Hing Industrial Building, <br />
                      12P Smithfield, Kennedy Town, <br />
                      Hong Kong
                    </span>
                  </p>
                  <p
                    style={{
                      color: "#000",
                      fontSize: "11pt",
                      margin: 0,
                      lineHeight: "1.15",
                      orphans: 2,
                      textAlign: "right",
                      widows: 2,
                      marginLeft: "4em",
                    }}
                  >
                    {t("desc3")?.trim()}
                  </p>
                </>
              </Box>
            </TNCCSS>
          </Box>
        </Box>
        <Box
          sx={{
            height: 0,
            [theme.breakpoints.up("laptop")]: {
              height: "150px",
            },
          }}
        />
        <ScrollToTop topRef={topRef} />
      </Container>
    </Layout>
  );
};

export default Policy;
