/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { Layout, ScrollToTop } from '@components';
import { useWindowDimensions } from '@hooks';
import { TNCCSS } from './styles';

const TermsAndConditions = () => {
  const { t } = useTranslation('terms_and_conditions');
  const theme = useTheme();

  const { isDesktop } = useWindowDimensions();

  const topRef = React.useRef(null);
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);
  const ref4 = React.useRef(null);

  const scrollToRef = (e: any, ref: any) => {
    e.preventDefault();
    window.scrollTo(0, ref.current.offsetTop - 100);
  };

  return (
    <Layout
      title={t('title')}
      navLink="/terms-and-conditions"
      waveBG={!!isDesktop}
      footer
    >
      <Box
        ref={topRef}
        sx={{
          [theme.breakpoints.up('laptop')]: {
            background: 'url(/images/assets/image_BG.png) top',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
          },
        }}
      >
        <Box pt={isDesktop ? theme.spacing(20) : 0}>
          <Typography
            variant="h1"
            sx={{
              display: 'none',
              [theme.breakpoints.up('laptop')]: {
                display: 'block',
                color: 'primary.main',
                fontSize: theme.spacing(4),
                fontWeight: 600,
                textAlign: 'center',
              },
            }}
          >
            {t('title')}
          </Typography>
        </Box>
        <Box
          sx={{
            [theme.breakpoints.up('laptop')]: {
              background: 'url(/images/assets/image_waveBG.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '150%',
              backgroundPosition: 'top 0px left -150px',
              minHeight: '75vh',
              width: '100%',
              zIndex: 1,
            },
          }}
        >
          <TNCCSS>
            <Box
              sx={{
                color: 'primary.main',
                [theme.breakpoints.up('laptop')]: {
                  maxWidth: '1200px',
                  margin: 'auto',
                },
              }}
            >
              <Typography
                variant="h2"
                // ref={topRef}
                sx={{
                  paddingTop: theme.spacing(12),
                  color: theme.palette.primary.main,
                  fontSize: `${theme.spacing(3)} !important` as any,
                  fontWeight: 600,
                  letterSpacing: '0.0015em',
                  paddingBottom: theme.spacing(5),
                  textAlign: 'left',
                  [theme.breakpoints.up('laptop')]: {
                    display: 'none',
                  },
                }}
              >
                {t('title')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: theme.spacing(1.75),
                  fontWeight: 600,
                }}
              >
                {t('updatedDate')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: theme.spacing(1.75),
                  fontWeight: 600,
                  paddingBottom: theme.spacing(5),
                }}
              >
                {t('description')}
              </Typography>
              <p>
                The following terms and conditions govern your access to and use
                of Forbole website(s), application(s), content and services
                offered by Forbole (collectively, our &rdquo;<b>Platform</b>
                &rdquo;).&nbsp;
                <b>
                  Please read these terms and conditions carefully before using
                  our Platform.
                </b>
                &nbsp;Please in particular read &nbsp;
                <a
                  href=""
                  style={{ textDecoration: 'underline' }}
                  onClick={(e) => scrollToRef(e, ref2)}
                >
                  Section 2 Additional Terms for Staking Service
                </a>
                &nbsp;before delegating any tokens to us.
              </p>

              <p>
                The Forbole Platform is operated by Forbole Limited, a company
                incorporated in Hong Kong with company registration number
                2595991, having its registered office at Flat 3B, Tontex
                Industrial Building, 2-4 Sheung Hei Street, San Po Kong,
                Kowloon, Hong Kong (&ldquo;<b>Forbole</b>&rdquo;,
                &ldquo;we&rdquo; or &ldquo;us&rdquo;). Users of our services are
                referred to as &ldquo;<b>users</b>&rdquo; or &ldquo;you&rdquo;.
              </p>

              <p>
                By using our Platform,&nbsp;you agree to be legally bound by
                these terms and conditions, as they may be modified or
                supplemented from time to time (these &ldquo;<b>Terms</b>
                &rdquo;).&nbsp;If you are accessing or using our Platform as a
                representative of an organisation, you are agreeing to these
                Terms on their behalf.
              </p>

              <span style={{ textDecoration: 'underline' }} ref={ref1}>
                <p>Section 1 General Terms</p>
              </span>

              <p>
                1. &nbsp; &nbsp; &nbsp; &nbsp;<b>Our Platform</b>
              </p>

              <p>
                1.1 &nbsp; &nbsp; &nbsp; &nbsp;The Forbole Platform gives you
                information about and (where applicable) access to our
                operations, products and services, including:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;our staking services (please
                refer to&nbsp;
                <a
                  href=""
                  style={{ textDecoration: 'underline' }}
                  onClick={(e) => scrollToRef(e, ref2)}
                >
                  Section 2 Additional Terms for Staking Service
                </a>
                );
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;Big Dipper, our block explorer
                and crypto analytics tool (please refer to&nbsp;
                <a
                  href=""
                  style={{ textDecoration: 'underline' }}
                  onClick={(e) => scrollToRef(e, ref3)}
                >
                  Section 3 Additional Terms for Big Dipper
                </a>
                ); and
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;Forbole Ventures, private
                investment arm of Forbole &nbsp;(please refer to&nbsp;{' '}
                <a
                  href=""
                  style={{ textDecoration: 'underline' }}
                  onClick={(e) => scrollToRef(e, ref4)}
                >
                  Section 4 Additional Terms for Forbole Ventures
                </a>
                ).
              </p>

              <p>
                1.2 &nbsp; &nbsp; &nbsp; &nbsp;We may update, upgrade, improve
                or change our Platform and the products or services we provide
                from time to time. We may also change or discontinue any of the
                products or services we offer, or add or remove functionalities
                or features, and we may suspend or stop certain products,
                services, functionalities or features altogether.
              </p>

              <p>
                1.3 &nbsp; &nbsp; &nbsp; &nbsp;Our Platform includes links to
                third-party websites, such as the websites of various blockchain
                networks or crypto projects. If you access any of these
                third-party websites, you will be doing so at your own risk. We
                do not examine or evaluate the information of any third-party
                websites. We expressly disclaim any liability or responsibility
                for any material or information contained in any third-party
                websites, or any products or services offered by third parties.
              </p>

              <p>
                2. &nbsp; &nbsp; &nbsp; &nbsp;
                <b>Intellectual property rights</b>
              </p>

              <p>
                2.1 &nbsp; &nbsp; &nbsp; &nbsp;All intellectual property rights
                subsisting in our Platform (including our applications, source
                code, software, content, text, graphics, images, audio or visual
                files and other materials, offered from time to time, and all
                improvements, enhancements, modifications, updates from time to
                time, collectively, our{' '}
                <b>&ldquo;Proprietary Materials&rdquo;</b>) belong to us. All
                rights in the Proprietary Materials under applicable laws are
                hereby reserved.
              </p>

              <p>
                2.2 &nbsp; &nbsp; &nbsp; &nbsp;Subject to Clause 2.5, using,
                copying, reproducing, publishing, distributing, selling of any
                parts or components of our Proprietary Materials, is strictly
                prohibited, unless:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;as expressly permitted by these
                Terms; or
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;with our prior written approval.
              </p>

              <p>
                2.3 &nbsp; &nbsp; &nbsp; &nbsp;You are given a personal,
                worldwide, royalty-free, non-assignable, non-transferrable,
                non-exclusive and revocable licence to access and use our
                Proprietary Materials. Such licence:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;is for the sole purpose of
                enabling you to use and enjoy the benefit of our Platform as
                offered by us and in such manner as permitted by these Terms;
                and
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;will be revoked and terminated if
                you breach any of these Terms, including the Acceptable Use
                Policy.
              </p>

              <p>
                2.4 &nbsp; &nbsp; &nbsp; &nbsp;Subject to Clause 2.5, any
                commercial distribution, publishing or exploitation of our
                Platform is strictly prohibited unless with our prior written
                approval.
              </p>

              <p>
                2.5 &nbsp; &nbsp; &nbsp; &nbsp;The use, reproduction and
                distribution of Big Dipper is governed by the Apache Licence
                (Version 2.0, January 2004).
              </p>

              <p>
                2.6 &nbsp; &nbsp; &nbsp; &nbsp;Our brand names and trade names,
                trade marks, service marks, logos and trade dress, whether
                registered or unregistered, belong to us, and may not be used,
                displayed or reproduced without our express written consent.
              </p>

              <p>
                2.7 &nbsp; &nbsp; &nbsp; &nbsp;In these Terms,{' '}
                <b>&ldquo; intellectual property rights&rdquo;</b> include
                patents, rights to inventions, copyright and related rights, all
                other rights in the nature of copyright, trade marks, business
                names and domain names, rights in get-up, goodwill and the right
                to sue for passing off, rights in designs, database rights,
                rights to use and protect the confidentiality of confidential
                information (including know-how), and all other intellectual
                property rights, in each case whether registered or unregistered
                and including all applications and rights to apply for and be
                granted renewals or extensions of, and rights to claim priority
                from, such rights and all similar or equivalent rights or forms
                of protection which subsist or will subsist now or in the future
                in any part of the world.
              </p>

              <p>
                3. &nbsp; &nbsp; &nbsp; &nbsp;<b>Disclaimers</b>
              </p>

              <p>
                3.1 &nbsp; &nbsp; &nbsp; &nbsp;We provide the Platform and any
                products or services we offer on an <b>&ldquo;as is&rdquo;</b>{' '}
                and <b>&ldquo;as available&rdquo;</b> basis, and your access to
                or use of our Platform is at your own risk.
              </p>

              <p>
                3.2 &nbsp; &nbsp; &nbsp; &nbsp;We try our best to ensure that
                our Platform is available at all times, but we do not guarantee
                that the operation of or access to our Platform will always be
                uninterrupted or continuous. Our Platform may be interrupted for
                maintenance, archiving, repairs, upgrades, or due to network or
                equipment failures. &nbsp;
              </p>

              <p>
                3.3 &nbsp; &nbsp; &nbsp; &nbsp;We give no assurance,
                representation or warranty of any kind (whether express or
                implied) about the Platform and any products or services we
                provide.
              </p>

              <p>
                3.4 &nbsp; &nbsp; &nbsp; &nbsp;We do not guarantee that the
                information or content you find on the Platform is always
                accurate, truthful, complete and up-to-date.
              </p>

              <p>
                3.5 &nbsp; &nbsp; &nbsp; &nbsp;You are responsible for
                configuring your information technology, computer programmes and
                platform or system in order to access our Platform. We are not
                responsible for any delay or disruption in our Platform or any
                defect, viruses, bugs or errors.
              </p>

              <p>
                3.6 &nbsp; &nbsp; &nbsp; &nbsp;We are not responsible for the
                conduct of or any content or information submitted or posted by
                any user of the Platform (whether online or offline).
              </p>

              <p>
                3.7 &nbsp; &nbsp; &nbsp; &nbsp;No warranties or representations
                (for example, warranties of merchantability, fitness for a
                particular purpose, and non-infringement) are given in respect
                of the Platform.
              </p>

              <p>
                4. &nbsp; &nbsp; &nbsp; &nbsp;<b>Acceptable Use Policy</b>
              </p>

              <p>
                4.1 &nbsp; &nbsp; &nbsp; &nbsp;As part of these Terms, you agree
                not to misuse the Platform or facilitate anyone else to do so.
                In particular, you agree not to do any of the following in
                connection with the Platform:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;use our Platform for any unlawful
                or unauthorised purposes;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;use our Platform to engage in any
                commercial activities (except as expressly permitted under these
                Terms or with our prior written approval), including without
                limitation, fundraising, advertising or promoting any products,
                services or projects;
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;sell, re-sell or attempt to
                benefit in a commercial fashion from any data, content or
                information available on the Platform;
              </p>

              <p>
                (d) &nbsp; &nbsp; &nbsp; &nbsp;probe, scan, or test the
                vulnerability of any system or network;
              </p>

              <p>
                (e) &nbsp; &nbsp; &nbsp; &nbsp;breach or otherwise circumvent
                any security or authentication measures or service usage limits;
              </p>

              <p>
                (f) &nbsp; &nbsp; &nbsp; &nbsp;access, tamper with, or use
                non-public areas or parts of the Platform;
              </p>

              <p>
                (g) &nbsp; &nbsp; &nbsp; &nbsp;interfere with or disrupt any
                user, host, or network, for example by sending a virus, trojan,
                worm, logic bomb, or any other material that is malicious or
                technologically harmful, overloading, flooding, spamming, or
                mail-bombing any part of the Platform, or by scripting the
                creation of any content in such manner as to interfere with or
                create an undue burden on the Platform;
              </p>

              <p>
                (h) &nbsp; &nbsp; &nbsp; &nbsp;reverse engineer, decompile,
                disassemble, or otherwise attempt to derive the source code for
                the Platform or any related technology that is not open source,
                or create any derivative works on our Platform;
              </p>

              <p>
                (i) &nbsp; &nbsp; &nbsp; &nbsp;copy, translate, make adaptations
                of our Platform or any of its content without authorisation;
              </p>

              <p>
                (i) &nbsp; &nbsp; &nbsp; &nbsp;send unsolicited communications,
                promotions or advertisements, or spam;
              </p>

              <p>
                (k) &nbsp; &nbsp; &nbsp; &nbsp;take any action that overloads or
                disrupts the integrity of infrastructure of our Platform or any
                of our features or functions;
              </p>

              <p>
                (l) &nbsp; &nbsp; &nbsp; &nbsp;spoof, phish, pharm, pretext,
                spider, crawl, or scrape, or use any robot or automated means to
                access our Platform without our express prior written consent,
                except that we grant permission to operators of public search
                engines to use spiders to copy materials from our Platform for
                the sole purpose of, and solely to the extent necessary for,
                creating publicly-available searchable indices of materials on
                our Platform;
              </p>

              <p>
                (m) &nbsp; &nbsp; &nbsp; &nbsp;post, publish, upload, display,
                distribute, or share materials that are unlawful, inappropriate,
                profane, pornographic, obscene, indecent, libelous, defamatory,
                abusive, or fraudulent;
              </p>

              <p>
                (n) &nbsp; &nbsp; &nbsp; &nbsp;violate or infringe upon our
                intellectual property rights or the intellectual property rights
                of others,
              </p>

              <p>
                (o) &nbsp; &nbsp; &nbsp; &nbsp;violate the letter or spirit of
                these Terms, or violate applicable laws or regulations in any
                way.
              </p>

              <p>
                5. &nbsp; &nbsp; &nbsp; &nbsp;
                <b>General Limitations of Liability</b>
              </p>

              <p>
                5.1 &nbsp; &nbsp; &nbsp; &nbsp;Our Services, together with the
                website(s), platform(s), application(s) and their components
                offered by Forbole, its holding company(ies), subsidiary(ies)
                and affiliates, are provided on an <b>&ldquo;as is&rdquo;</b>{' '}
                and <b>&ldquo;as available&rdquo;</b> basis.
              </p>

              <p>
                5.2 &nbsp; &nbsp; &nbsp; &nbsp;Forbole makes&nbsp;no
                representation or warranty&nbsp;that:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;the Services comply with any
                obligations that the users may have under any applicable laws,
                rules or regulations; or
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;the Services will always be
                available.
              </p>

              <p>
                5.3 &nbsp; &nbsp; &nbsp; &nbsp;To the fullest extent permitted
                by law, Forbole and its holding company(ies), subsidiary(ies),
                affiliates, directors, officers, employees, agents and
                representatives expressly disclaim any liability or
                responsibility for:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;any error or interruption in
                usage or any loss, inaccuracy or corruption of data, nor any
                cost of procurement of substitute goods, services or technology;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;any damages, losses, claims
                (whether in contract, tort or otherwise), costs (including
                professional fees and expenses), whether direct, indirect,
                special, incidental, punitive, exemplary, consequential, or of
                any other kind (including, without limitation, any loss of
                revenue, profits, opportunities, business, goodwill or
                reputation);
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;any damages or losses arising out
                of or in connection with any acts or omissions on your part or
                on the part of any third parties, including any loss of private
                keys, losses or theft of digital assets, malfunction or failure
                of any blockchain network, execution or settlement errors,
                configuration errors, connectivity failure, programming language
                errors, security breaches, weaknesses or bugs; and
              </p>

              <p>
                (d) &nbsp; &nbsp; &nbsp; &nbsp;any other matters beyond the
                reasonable control of Forbole
              </p>

              <p>
                arising out of or in connection with your use of our Platform or
                any products or services we offer.
              </p>

              <p>
                5.4 &nbsp; &nbsp; &nbsp; &nbsp;Some countries or jurisdictions
                may not allow the disclaimers in this clause, in which case
                these disclaimers will not apply to you.
              </p>

              <p>
                6. &nbsp; &nbsp; &nbsp; &nbsp;<b>Termination and Withdrawal</b>
              </p>

              <p>
                6.1 &nbsp; &nbsp; &nbsp; &nbsp;These Terms are effective unless
                and until terminated in accordance with this clause.
              </p>

              <p>
                6.2 &nbsp; &nbsp; &nbsp; &nbsp;We reserve the right to suspend
                or terminate your access to our Platform (or to certain parts or
                functionalities of our Platform), if we reasonably believe:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;you are in serious or repeated
                breach of these Terms;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;you are using the Platform in a
                manner that would cause a real risk of harm or loss to us, other
                users, or the public;
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;we are requested to do so by
                government or regulatory authorities or as required under
                applicable laws, regulations or legal processes; or
              </p>

              <p>
                (d) &nbsp; &nbsp; &nbsp; &nbsp;our provision of the Platform to
                you is no longer possible or viable.
              </p>

              <p>
                6.3 &nbsp; &nbsp; &nbsp; &nbsp;Termination of these Terms will
                not affect any&nbsp;rights, remedies, obligations or
                liabilities&nbsp;of the Parties that have accrued up to the date
                of termination, including the right to claim damages in respect
                of any antecedent breaches.
              </p>

              <p>
                6.4 &nbsp; &nbsp; &nbsp; &nbsp;All provisions which by nature
                extend beyond the termination of these Terms will survive
                termination, including, without limitation, disclaimers and
                limitations of liability, governing law and dispute resolution
                mechanisms, and general provisions relating to the
                interpretation and operation of these Terms.
              </p>

              <p>
                7. &nbsp; &nbsp; &nbsp; &nbsp;<b>Force majeure</b>
              </p>

              <p>
                7.1&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp;Neither Party will be in breach of these Terms or
                be liable for any delay in performing, or any failure to
                perform, any of its obligations under these Terms if such delay
                or failure result from events, circumstances or causes beyond
                its reasonable control. In such circumstances, the time for
                performance will be extended by a period equivalent to the
                period during which performance of the obligation has been
                delayed or failed to be performed.
              </p>
              <p>
                7.2&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp;A force majeure event includes: an act of God,
                fire, flood, typhoon, storm, war, riot, civil unrest, act of
                terrorism, strike, industrial dispute, outbreak of epidemic or
                pandemic illness, failure of utility service or transportation,
                shortage and unavailability of energy or resources, and
                operation and action of and changes to the protocols of
                Supported Networks.
              </p>

              <p>
                8. &nbsp; &nbsp; &nbsp; &nbsp;<b>General Provisions</b>
              </p>

              <p>
                8.1&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Forbole may modify these
                Terms of Use at any time, and will post the modified Terms of
                Use on this site. Any modification is effective immediately upon
                posting. Your continued use of our Platform will be conclusive
                evidence of your acceptance of the Terms of Use as modified.
              </p>
              <p>
                8.2&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;These Terms&nbsp;constitute
                the entire agreement between the Parties, and supersede all
                prior or contemporaneous negotiations, discussions or records
                with respect to the subject matter hereof.
              </p>
              <p>
                8.3&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;If any provision of these
                Terms becomes invalid or unenforceable, it will be deemed
                modified (to the minimum extent necessary) to make it valid and
                enforceable, or where such modification is not possible, deemed
                deleted and will not affect the validity and enforceability of
                the remaining provisions.
              </p>
              <p>
                8.4&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;The failure of either Party
                at any time to insist on the performance of, or to exercise a
                right or remedy under, any provision of these Terms is not a
                waiver of its right at any later time to insist on the
                performance of, or exercise a right or remedy under, that or any
                other provision of these Terms.
              </p>
              <p>
                8.5 &nbsp; &nbsp; &nbsp; &nbsp;A reference to a person includes
                a natural person, a corporation, or an unincorporated body
                (whether or not having a separate legal personality). A
                reference to writing or written includes fax, e-mail and instant
                messaging. A reference to one gender will include a reference to
                the other genders.
              </p>
              <p>
                8.6 &nbsp; &nbsp; &nbsp; &nbsp;Clause and schedule headings are
                for convenience only and do not affect the interpretation of the
                provisions of this Agreement.
              </p>
              <p>
                9&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<b>Governing Law</b>
              </p>
              <p>
                These Terms&nbsp;and any dispute or claim arising out of or in
                connection with it or its subject matter or formation (including
                non-contractual disputes or claims) will be governed by and
                construed in accordance with the laws of the Hong Kong Special
                Administrative Region.
              </p>
              <p>
                10 &nbsp; &nbsp; &nbsp; &nbsp;<b>Dispute Resolution</b>
              </p>
              <p>
                10.1 &nbsp; &nbsp; &nbsp; &nbsp;Any dispute, controversy,
                difference or claim arising out of or relating to these Terms,
                including the existence, validity, interpretation, performance,
                breach or termination thereof, will be referred to and finally
                resolved by arbitration administered by the Hong Kong
                International Arbitration Centre (HKIAC) under the HKIAC
                Administered Arbitration Rules in force when the Notice of
                Arbitration is submitted.
              </p>
              <p>
                10.2 &nbsp; &nbsp; &nbsp; &nbsp;The law of this arbitration
                clause will be the laws of the Hong Kong Special Administrative
                Region. The seat of the arbitration will be Hong Kong. The
                number of arbitrators will be one. The arbitration proceedings
                will be conducted in English.
              </p>

              <span ref={ref2} style={{ textDecoration: 'underline' }}>
                <p>Section 2 Additional Terms for Staking Service</p>
              </span>

              <p>
                <b>BACKGROUND</b>
              </p>

              <p>
                (A) &nbsp; &nbsp; &nbsp; &nbsp;A number of blockchain networks
                use the Proof-of-Stake consensus mechanism to verify
                transactions in a distributed manner. Each Proof-of-Stake
                network requires a number of nodes to validate transaction
                records and secure the network. In return for validating and
                securing the network, tokens are distributed as a reward.
              </p>

              <p>
                (B) &nbsp; &nbsp; &nbsp; &nbsp;Forbole has developed knowledge,
                skills and infrastructure in validating and securing blockchain
                networks. Forbole runs validator nodes to secure a number of
                networks (<b>&ldquo;Supported Networks&rdquo;</b>), which
                benefit all holders of tokens of these networks. Each Supported
                Network has its own protocols and terms.
              </p>

              <p>
                (C) &nbsp; &nbsp; &nbsp; &nbsp;Incidental to validating and
                securing the Supported Networks, Forbole
                offers&nbsp;non-custodial&nbsp;staking services, whereby token
                holders may delegate their rights to validate transactions and
                to vote in respect of their tokens to Forbole, without
                relinquishing custody or ownership of their own tokens.
              </p>

              <p>
                (D) &nbsp; &nbsp; &nbsp; &nbsp;The non-custodial staking
                services are offered on and subject to these Terms.&nbsp;
                <b>
                  By delegating tokens to Forbole, you agree to be bound by
                  these Terms as amended from time to time.
                </b>
              </p>

              <p>
                <b>AGREED TERMS</b>
              </p>

              <p>
                11. &nbsp; &nbsp; &nbsp; &nbsp;<b>Delegation and Staking</b>
              </p>

              <p>
                11.1 &nbsp; &nbsp; &nbsp; &nbsp;On and subject to the protocols
                of the Supported Networks and these Terms, you may:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;delegate any whole or fractional
                number of digital blockchain assets (<b>&ldquo;Tokens&rdquo;</b>
                ) of a Supported Network to Forbole at any time; and
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;(subject to unbonding and any
                other applicable requirements) withdraw any number of Tokens
                from delegation at any time.
              </p>

              <p>
                11.2 &nbsp; &nbsp; &nbsp; &nbsp;On and subject to the protocols
                of the Supported Networks and these Terms, we: &nbsp;
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;exercise the rights of the
                delegated Tokens to validate and sign the next definitive serial
                transaction record on a Supported Network (
                <b>&ldquo;Validation Rights&rdquo;</b>); and
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;exercise the rights of the
                delegated Tokens to vote upon proposals relating to the
                operation and governance of a Supported Network (
                <b>&ldquo;Voting Rights&rdquo;</b>),&nbsp;unless&nbsp;you elect
                to exercise the Voting Rights directly in accordance with the
                protocols of the Supported Network
              </p>

              <p>
                (the Validation Rights and the Voting Rights collectively, the
                <b>&ldquo;Token Rights&rdquo;</b>; and the exercise of the Token
                Rights on your behalf, the <b>&ldquo;Services&rdquo;</b>).
              </p>

              <p>
                11.3 &nbsp; &nbsp; &nbsp; &nbsp;We use commercially reasonable
                efforts to operate validator nodes and perform the Services in a
                diligent and professional manner, in accordance with applicable
                industry standards. You must note that in performing the
                Services, we have sole and absolute discretion in making all
                decisions.
              </p>

              <p>
                11.4 &nbsp; &nbsp; &nbsp; &nbsp;We may consolidate the Token
                Rights delegated to us by various delegators, or with Token
                Rights otherwise exercisable by us.
              </p>

              <p>
                11.5 &nbsp; &nbsp; &nbsp; &nbsp;For the avoidance of doubt, your
                delegation of Tokens as contemplated under these Terms:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;does not represent or constitute
                any loan or any contribution of capital to, or other investment
                in, Forbole or its securities;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;does not create or imply any
                partnership, agency or fiduciary relationship between you and
                Forbole.
              </p>

              <p>
                11.6 &nbsp; &nbsp; &nbsp; &nbsp;Our Services are technological
                in nature. Our offer of Services does not constitute the
                offering of any financial services or financial advice to
                anyone.
              </p>

              <p>
                11.7 &nbsp; &nbsp; &nbsp; &nbsp;Please bear in mind that our
                Services are at all times subject to the protocols of the
                Supported Networks, which may vary from chain to chain and may
                change from time to time.
              </p>

              <p>
                12. &nbsp; &nbsp; &nbsp; &nbsp;<b>Rewards</b>
              </p>

              <p>
                12.1 &nbsp; &nbsp; &nbsp; &nbsp;It is expected,
                though&nbsp;Forbole cannot guarantee, that the staking of Tokens
                with Forbole on a Supported Network will result in Rewards (as
                defined below) being sent by the Supported Network as follows:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;to your wallet address from which
                you have delegated Tokens to Forbole, or if you so specified,
                another wallet address of your choice; and
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;to Forbole as a service fee for
                providing the Services.
              </p>

              <p>
                12.2 &nbsp; &nbsp; &nbsp; &nbsp;It is important to note that no
                payment is made by delegators to Forbole nor by Forbole to
                delegators. All Rewards are generated by the Supported Networks
                according to their protocols and sent by the Supported Networks
                to qualified wallet addresses by operation of code. Forbole does
                not take custody over any Rewards on behalf of any delegator.
              </p>

              <p>
                12.3 &nbsp; &nbsp; &nbsp; &nbsp;As between Forbole and a
                delegator, the results of the operation of a Supported Network
                are determinative of their respective rights and obligations,
                and are final and binding upon both parties to these Terms.
              </p>

              <p>
                12.4 &nbsp; &nbsp; &nbsp; &nbsp;As all Rewards are generated and
                sent by Supported Networks directly to the qualified wallet
                addresses, Forbole has no control over whether a particular
                Supported Network distributes Rewards to any delegator, and is
                not responsible in any way for any failure by a Supported
                Network to send Rewards to delegators.
              </p>

              <p>
                12.5 &nbsp; &nbsp; &nbsp; &nbsp;The protocol of each Supported
                Network dictates the number of validators in the active set or
                the prerequisites to be fulfilled to be in the active set, i.e.
                the operator of validator nodes who will receive Rewards. Such
                numbers or prerequisites may change from time to time. No
                representation, warranty or promise is given to the effect that
                the validator nodes operated by us will remain in the active set
                at all times or at any specific period of time.
              </p>

              <p>
                12.6 &nbsp; &nbsp; &nbsp; &nbsp;The rate of our service fee for
                providing the Services in respect of each Supported Network is
                as stated on our platform or the platform of the wallet service
                or exchange service that you use, and may be adjusted from time
                to time without prior notice to you.
              </p>

              <p>
                12.7 &nbsp; &nbsp; &nbsp; &nbsp;Any portion of Rewards or other
                awards distributed to Forbole by operation of a Supported
                Network is our sole and exclusive property, to which you have no
                access and on which you have no claim.
              </p>

              <p>
                12.8 &nbsp; &nbsp; &nbsp; &nbsp;Please make sure that you
                provide the correct wallet address for receiving the Rewards.
                Forbole is not liable for any loss, destruction or sending of
                Rewards to an incorrect wallet address.
              </p>

              <p>
                12.9 &nbsp; &nbsp; &nbsp; &nbsp;For the purposes of these Terms,
                <b>&ldquo;Rewards&rdquo;</b> include: block rewards and
                transaction fees in return for the exercising of Validation
                Rights, in each case as actually granted by the Supported
                Network.
              </p>

              <p>
                13. &nbsp; &nbsp; &nbsp; &nbsp;
                <b>Protocol Changes, Airdrops and Forks</b>
              </p>

              <p>
                13.1 &nbsp; &nbsp; &nbsp; &nbsp;From time to time the protocols
                of Supported Networks may change, and airdrops or forks may
                arise, in each case out of the control of Forbole. Unless
                otherwise expressly provided in these Terms:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;Forbole has sole and absolute
                discretion in determining actions in response to protocol
                changes, airdrops and forks;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;our exercise (or non-exercise) of
                any right or power available to us in our capacity as a
                validator on the Supported Network does not constitute any
                breach or violation of these Terms; and
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;Forbole is not responsible for
                any losses, liabilities, damages, loss of profits or reduction
                in value in respect of the relevant Tokens or otherwise suffered
                or incurred by you in connection with any protocol changes,
                airdrops or forks.
              </p>

              <p>
                13.2 &nbsp; &nbsp; &nbsp; &nbsp;In cases of forks, Forbole has
                no obligation or responsibility to:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp; notify you of pending,
                threatened or actual forks; nor
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;respond to forks in ways that
                benefit you over Forbole itself.
              </p>

              <p>
                14. &nbsp; &nbsp; &nbsp; &nbsp;<b>Conditions Precedent</b>
              </p>

              <p>
                14.1 &nbsp; &nbsp; &nbsp; &nbsp;There are a number of
                pre-conditions that must be satisfied for us to offer our
                Services to you. If these pre-conditions are not satisfied, we
                do not and cannot offer our Services to you.
              </p>

              <p>
                14.2 &nbsp; &nbsp; &nbsp; &nbsp;Our offer of our Services to you
                in respect of a Supported Network is conditional
                upon&nbsp;all&nbsp;of the following being satisfied at all times
                from the Effective Date (as defined in Clause 17.1), for as long
                as you delegate Token Rights of such Supported Network to us:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;your representations and
                warranties under Clauses 15.1 and 15.2 are and remain true,
                accurate and complete;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;the nodes operated by us are and
                remain in the active set of such Supported Network;
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;the performance of these Terms by
                us does not require any licences, permits or registrations
                (under securities laws or otherwise) not possessed by us;
              </p>

              <p>
                (d) &nbsp; &nbsp; &nbsp; &nbsp;the performance of these Terms by
                either Party does not constitute any breach, default or
                violation of any applicable laws and regulations (including
                securities laws, financial services laws, anti-money-laundering
                laws, anti-terrorist and anti-terrorist-financing laws); and
              </p>

              <p>
                (e) &nbsp; &nbsp; &nbsp; &nbsp;the performance of these Terms by
                either Party does not constitute any breach, default or
                violation of any contracts to which that Party is a party
                (including these Terms and the protocols of the Supported
                Network).
              </p>

              <p>
                14.3 &nbsp; &nbsp; &nbsp; &nbsp;Below are some examples of
                circumstances where one or more of the conditions precedent set
                out in Clause 14.2 are not satisfied, and as a result you must
                immediately revoke your delegation to us:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;where one or more Tokens you
                delegated to us are determined under applicable laws and
                regulations to constitute &ldquo;securities&rdquo;, and the act
                of operating validator nodes in connection with such Tokens
                becomes subject to licences, permits or registrations which we
                do not hold at relevant times;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;where you become an entity or
                individual located, organised or ordinarily resident in a
                sanctioned jurisdiction (currently,&nbsp;Cuba, Iran, North
                Korea, Russia, Syria and Crimea, Donetsk and Luhansk of
                Ukraine), or an entity or individual on the Specially Designated
                Nationals and Blocked Persons List of the Office of Foreign
                Assets Control of the United States Treasury Department (or
                other lists to similar effect in applicable jurisdictions), or
                you become directly or indirectly owned or controlled by any
                such entity or individual; and
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;where we are deemed to have a
                &ldquo;money transmitter&rdquo; or similar status under
                applicable anti-money-laundering laws, anti-terrorist or
                anti-terrorist-financing laws, but we cannot reasonably comply
                with the associated obligations due to the decentralised and
                permissionless design of the Supported Networks.
              </p>

              <p>
                14.4 &nbsp; &nbsp; &nbsp; &nbsp;Due to the decentralised and
                permissionless design of the Supported Networks, any person
                holding Tokens may anonymously delegate their Token Rights to
                us. By holding private keys, you have full access to and control
                over your Tokens. We have no way to stop delegation. However, if
                we suffer or incur any losses or liabilities in connection with
                or as a result of your delegation of Tokens to us while one or
                more of the conditions precedent set out in Clause 14.2 are not
                satisfied, we reserve the right to take legal action against you
                to compensate our losses or liabilities.
              </p>

              <p>
                14.5 &nbsp; &nbsp; &nbsp; &nbsp;Forbole owes no liability or
                obligation to any delegator if and when (i) Forbole is not
                within the active set of validators or (ii) slashing occurs.
              </p>

              <p>
                15. &nbsp; &nbsp; &nbsp; &nbsp;
                <b>Representations and Warranties</b>
              </p>

              <p>
                15.1 &nbsp; &nbsp; &nbsp; &nbsp;Each Party represents and
                warrants to the other that, as at of the Effective Date and on
                each day that the delegation continues:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;(if a Party is an individual) the
                Party is of legal age in its jurisdiction of residence;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;(if a Party is a business entity,
                partnership or other forms of organisation) the Party is duly
                incorporated or organised, validly existing and in good standing
                under the laws of the jurisdiction of its incorporation or
                organisation; and
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;the Party has all requisite
                authority, capacity and power to enter into and perform its
                obligations under these Terms, and that these Terms constitutes
                a legal, valid and binding obligation of the Party enforceable
                against it in accordance with its terms (save for exceptions due
                to bankruptcy, insolvency or other laws of general application
                relating to or affecting the enforcement of creditors&rsquo;
                rights generally and principles of equity).
              </p>

              <p>
                15.2 &nbsp; &nbsp; &nbsp; &nbsp;In addition to the
                representations and warranties set out in Clause 15.1, you
                further represent and warrant to us that, as at of the Effective
                Date and on each day that the delegation continues:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;you have full right, title and
                interest in and to the Tokens delegated to us;
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;you are experienced and
                sophisticated in using and evaluating the Supported Networks and
                related technologies, and you have conducted your own
                independent research, due diligence and analysis of the
                Supported Networks and you enter into these Terms solely relying
                on your own independent research, due diligence and analysis;
              </p>

              <p>
                (c) &nbsp; &nbsp; &nbsp; &nbsp;you are not (as an entity or
                individual) located, organised or ordinarily resident in a
                sanctioned jurisdiction (currently,&nbsp;Cuba, Iran, North
                Korea, Russia, Syria and Crimea, Donetsk and Luhansk of
                Ukraine), nor directly or indirectly owned or controlled by any
                such entity or individual;
              </p>

              <p>
                (d) &nbsp; &nbsp; &nbsp; &nbsp;you are not on the Specially
                Designated Nationals and Blocked Persons List published by the
                Office of Foreign Assets Control of the United States Treasury
                Department (or other lists to similar effect in applicable
                jurisdictions), nor directly or indirectly owned or controlled
                by any such entity or individual;
              </p>

              <p>
                (e) &nbsp; &nbsp; &nbsp; &nbsp;you have not been convicted of
                any money-laundering, terrorist-financing, trafficking in
                controlled substances (or similar crimes) at any domestic,
                military, foreign or international court; and
              </p>

              <p>
                (f) &nbsp; &nbsp; &nbsp; &nbsp;the Tokens delegated to us are
                not derived from, nor otherwise represent the proceeds of, any
                activities done in violation or contravention of any applicable
                domestic, military, foreign or international laws.
              </p>

              <p>
                16. &nbsp; &nbsp; &nbsp; &nbsp;
                <b>Taxes and other obligations</b>
              </p>

              <p>
                16.1 &nbsp; &nbsp; &nbsp; &nbsp;You are solely responsible for
                any and all taxes, duties and levies payable to any governmental
                authorities in connection with or arising out of the Rewards or
                any other amounts received or receivable by you in connection
                with these Terms.
              </p>

              <p>
                16.2 &nbsp; &nbsp; &nbsp; &nbsp;You are strongly encouraged to
                seek independent professional advice to understand your legal,
                tax or other obligations in connection with or arising out of
                the Rewards or any other amounts received or receivable by you
                in connection with these Terms. Forbole (nor any of its holding
                company(ies), subsidiary(ies), affiliates, directors, officers,
                employees, agents and representatives) does not provide any
                advice in respect of your legal, tax or other obligations in
                connection with your use of our Services.
              </p>

              <p>
                17. &nbsp; &nbsp; &nbsp; &nbsp;
                <b>Term, Termination and Withdrawal</b>
              </p>

              <p>
                17.1 &nbsp; &nbsp; &nbsp; &nbsp;These Terms come into effect and
                become legally binding on the date on which you first delegate
                any Tokens to Forbole (the <b>&ldquo;Effective Date&rdquo;</b>)
                and will continue to remain in effect for as long as the
                delegation continues.
              </p>

              <p>
                17.2 &nbsp; &nbsp; &nbsp; &nbsp;Subject to the protocol of the
                applicable Supported Network (in particular any unbonding
                requirement), either Party may terminate these Terms at any time
                for any reason with immediate effect:
              </p>

              <p>
                (a) &nbsp; &nbsp; &nbsp; &nbsp;in case of the delegator, by
                withdrawing your Tokens from delegation; or
              </p>

              <p>
                (b) &nbsp; &nbsp; &nbsp; &nbsp;in case of Forbole, by
                terminating or sunsetting validator nodes.
              </p>

              <p>
                17.3 &nbsp; &nbsp; &nbsp; &nbsp;Supported Networks typically
                impose a period of time as &ldquo;unbonding periods&rdquo;
                during which you will not receive Rewards in respect of the
                Tokens and cannot perform any transaction in respect of the
                Tokens.
              </p>

              <p>
                17.4 &nbsp; &nbsp; &nbsp; &nbsp;In the event that Forbole
                sunsets its validator node on a Supported Network, subject to
                the protocol of the Supported Network, all delegated tokens will
                unbond automatically after a certain period of time. We will
                make public announcements if and when we decide to sunset our
                node.
              </p>

              <p>
                17.5 &nbsp; &nbsp; &nbsp; &nbsp;Forbole is not liable for any
                damages, losses, claims (whether in contract, tort or
                otherwise), costs (including professional fees and expenses),
                whether direct, indirect, special, incidental, punitive,
                exemplary, consequential, or of any other kind (including,
                without limitation, any loss of revenue, profits, opportunities,
                business, goodwill or reputation), arising out of or in
                connection with your delegation, withdrawal or unbonding of
                Tokens.
              </p>

              <p>
                17.6 &nbsp; &nbsp; &nbsp; &nbsp;Termination of these Terms will
                not affect any rights, remedies, obligations or liabilities of
                the Parties that have accrued up to the date of termination,
                including the right to claim damages in respect of any
                antecedent breaches.
              </p>

              <p>
                17.7 &nbsp; &nbsp; &nbsp; &nbsp;All provisions which by nature
                extend beyond the termination of these Terms will survive
                termination, including, without limitation, disclaimers and
                limitations of liability, governing law and dispute resolution
                mechanisms, and general provisions relating to the
                interpretation and operation of these Terms.
              </p>

              <span ref={ref3} style={{ textDecoration: 'underline' }}>
                <p>Section 3 Additional Terms for Big Dipper</p>
              </span>

              <p>
                18 &nbsp; &nbsp; &nbsp; &nbsp;<b>Big Dipper</b>
              </p>

              <p>
                18.1 &nbsp; &nbsp; &nbsp; &nbsp;Big Dipper is an open-source
                block explorer and crypto analytics tool. Big Dipper offers a
                user-friendly view of blockchain data.
              </p>

              <p>
                18.2 &nbsp; &nbsp; &nbsp; &nbsp;Big Dipper is for general
                information purposes only. Projects supported by Big Dipper and
                features available on Big Dipper are subject to change from time
                to time.
              </p>

              <p>
                18.3 &nbsp; &nbsp; &nbsp; &nbsp;No guarantee or warranty is
                given as to the accuracy, completeness, timeliness or
                reliability of the information presented on or through Big
                Dipper, nor as to the future availability of any projects or
                services referred to in our Platform or their future performance
                or value.
              </p>

              <p>
                18.4 &nbsp; &nbsp; &nbsp; &nbsp;No material available or
                information presented on or through Big Dipper represents any
                offer of securities, any solicitation for investment, or any
                offer to sell any assets, whether digital or otherwise.
              </p>

              <span ref={ref4} style={{ textDecoration: 'underline' }}>
                <p>Section 4 Additional Terms for Forbole Ventures</p>
              </span>

              <p>
                19 &nbsp; &nbsp; &nbsp; &nbsp;<b>Forbole Ventures</b>
              </p>

              <p>
                19.1 &nbsp; &nbsp; &nbsp; &nbsp;Forbole Ventures is a private
                investment arm of Forbole. Forbole Ventures performs asset
                management and investment advisory activities solely for fellow
                group companies within the Forbole Group.
              </p>

              <p>
                19.2 &nbsp; &nbsp; &nbsp; &nbsp;Forbole Ventures does not offer
                any services to the public that constitute a regulated activity
                under the Securities and Futures Ordinance (Cap. 571 of the Laws
                of Hong Kong).
              </p>

              <p>
                19.3 &nbsp; &nbsp; &nbsp; &nbsp;The Forbole Ventures website and
                any applications or services offered by Forbole Ventures are for
                general information purposes only, and are subject to change or
                update from time to time.
              </p>

              <p>
                19.4 &nbsp; &nbsp; &nbsp; &nbsp;No guarantee or warranty is
                given as to the accuracy, completeness, timeliness or
                reliability of the information presented on or through Forbole
                Ventures website and any applications or services offered by
                Forbole Ventures, nor as to the future availability of any
                projects or services referred to in our Platform or their future
                performance or value.
              </p>

              <p>
                19.5 &nbsp; &nbsp; &nbsp; &nbsp;No material available or
                information presented on or through Forbole Ventures website and
                any applications or services offered by Forbole Ventures
                represents any offer of securities, any solicitation for
                investment, or any offer to sell any assets, whether digital or
                otherwise.
              </p>
              <Box
                sx={{
                  height: 0,
                  [theme.breakpoints.up('laptop')]: {
                    height: '200px',
                  },
                }}
              />

              <Box
                sx={{
                  display: 'none',
                  [theme.breakpoints.up('laptop')]: {
                    display: 'flex',
                    position: 'absolute',
                    left: '50%',
                    justifyContent: 'center',
                    bottom: '250px',
                  },
                }}
              >
                <ScrollToTop topRef={topRef} />
              </Box>
            </Box>
          </TNCCSS>{' '}
          <Box
            position="fixed"
            right="5%"
            bottom="10%"
            sx={{
              display: 'block',
              [theme.breakpoints.up('laptop')]: {
                display: 'none',
              },
            }}
          >
            <ScrollToTop topRef={topRef} mobile />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TermsAndConditions;
