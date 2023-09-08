import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { Box, Typography, useTheme } from '@mui/material';
import { Layout, ScrollToTop } from '@components';
import { useWindowDimensions } from '@hooks';
import { ClientOnly } from '@src/utils/clientOnly';
import { TNCCSS } from './styles';

const StakingServicesTerms = () => {
  const { t } = useTranslation('staking_services_terms');
  const theme = useTheme();

  const { isDesktop } = useWindowDimensions();

  const topRef = React.useRef(null);

  return (
    <Layout
      title={t('title')}
      navLink="/forbole-staking-services-terms"
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
              <ClientOnly>
                <Trans
                  i18nKey={t('description')}
                  components={[
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: theme.spacing(1.75),
                        paddingBottom: theme.spacing(5),
                      }}
                    />,
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                      }}
                    />,
                  ]}
                />
              </ClientOnly>
              <p>
                Staking service is operated by Forbole Limited, a company
                incorporated in Hong Kong with company registration number
                2595991, having its registered office at Flat 3B, Tontex
                Industrial Building, 2-4 Sheung Hei Street, San Po Kong,
                Kowloon, Hong Kong (&ldquo;Forbole&rdquo;, &ldquo;we&rdquo; or
                &ldquo;us&rdquo;). Users of our staking service are referred to
                as &ldquo;delegators&rdquo; or &ldquo;you&rdquo;.&nbsp;
              </p>

              <h3>BACKGROUND</h3>

              <p>
                (A)&nbsp; &nbsp;&nbsp;A number of blockchain networks use the
                Proof-of-Stake consensus mechanism to verify transactions in a
                distributed manner. Each Proof-of-Stake network requires a
                number of nodes to validate transaction records and secure the
                network. In return for validating and securing the network,
                tokens are distributed as a reward.
              </p>

              <p>
                (B)&nbsp; &nbsp;&nbsp;Forbole has developed knowledge, skills
                and infrastructure in validating and securing blockchain
                networks. Forbole runs validator nodes to secure a number of
                networks (&ldquo;Supported Networks&rdquo;), which benefit all
                holders of tokens of these networks. Each Supported Network has
                its own protocols and terms.
              </p>

              <p>
                (C)&nbsp; &nbsp;&nbsp;Incidental to validating and securing the
                Supported Networks, Forbole
                offers&nbsp;non-custodial&nbsp;staking services, whereby token
                holders may delegate their rights to validate transactions and
                to vote in respect of their tokens to Forbole, without
                relinquishing custody or ownership of their own tokens.
              </p>

              <p>
                (D)&nbsp; &nbsp;&nbsp;The non-custodial staking services are
                offered on and subject to these Terms.&nbsp;By delegating tokens
                to Forbole, you agree to be bound by these Terms as amended from
                time to time.&nbsp;
              </p>

              <h3>AGREED TERMS</h3>

              <h4>1.&nbsp; &nbsp;&nbsp;Delegation and Staking</h4>

              <p>
                1.1&nbsp; &nbsp;&nbsp;On and subject to the protocols of the
                Supported Networks and these Terms, you may:&nbsp;
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;delegate any whole or fractional number of
                digital blockchain assets (&ldquo;Tokens&rdquo;) of a Supported
                Network to Forbole at any time; and&nbsp;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;(subject to unbonding and any other
                applicable requirements) withdraw any number of Tokens from
                delegation at any time.
              </p>

              <p>
                1.2&nbsp; &nbsp;&nbsp;On and subject to the protocols of the
                Supported Networks and these Terms, we: &nbsp;
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;exercise the rights of the delegated
                Tokens to validate and sign the next definitive serial
                transaction record on a Supported Network (&ldquo;Validation
                Rights&rdquo;); and&nbsp;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;exercise the rights of the delegated
                Tokens to vote upon proposals relating to the operation and
                governance of a Supported Network (&ldquo;Voting
                Rights&rdquo;),&nbsp;unless&nbsp;you elect to exercise the
                Voting Rights directly in accordance with the protocols of the
                Supported Network&nbsp;
              </p>

              <p>
                (the Validation Rights and the Voting Rights collectively, the
                &ldquo;Token Rights&rdquo;; and the exercise of the Token Rights
                on your behalf, the &ldquo;Services&rdquo;).
              </p>

              <p>
                1.3&nbsp; &nbsp;&nbsp;We use commercially reasonable efforts to
                operate validator nodes and perform the Services in a diligent
                and professional manner, in accordance with applicable industry
                standards. You must note that in performing the Services, we
                have sole and absolute discretion in making all decisions.&nbsp;
              </p>

              <p>
                1.4&nbsp; &nbsp;&nbsp;We may consolidate the Token Rights
                delegated to us by various delegators, or with Token Rights
                otherwise exercisable by us.
              </p>

              <p>
                1.5&nbsp; &nbsp;&nbsp;For the avoidance of doubt, your
                delegation of Tokens as contemplated under these Terms:&nbsp;
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;does not represent or constitute any loan
                or any contribution of capital to, or other investment in,
                Forbole or its securities;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;does not create or imply any partnership,
                agency or fiduciary relationship between you and Forbole.
              </p>

              <p>
                1.6&nbsp; &nbsp;&nbsp;Our Services are technological in nature.
                Our offer of Services does not constitute the offering of any
                financial services or financial advice to anyone.
              </p>

              <p>
                1.7&nbsp; &nbsp;&nbsp;Please bear in mind that our Services are
                at all times subject to the protocols of the Supported Networks,
                which may vary from chain to chain and may change from time to
                time.
              </p>

              <h4>2.&nbsp; &nbsp;&nbsp;Rewards</h4>

              <p>
                2.1&nbsp; &nbsp;&nbsp;It is expected, though&nbsp;Forbole cannot
                guarantee, that the staking of Tokens with Forbole on a
                Supported Network will result in Rewards (as defined below)
                being sent by the Supported Network as follows:
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;to your wallet address from which you have
                delegated Tokens to Forbole, or if you so specified, another
                wallet address of your choice; and
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;to Forbole as a service fee for providing
                the Services.
              </p>

              <p>
                2.2&nbsp; &nbsp;&nbsp;It is important to note that no payment is
                made by delegators to Forbole nor by Forbole to delegators. All
                Rewards are generated by the Supported Networks according to
                their protocols and sent by the Supported Networks to qualified
                wallet addresses by operation of code. Forbole does not take
                custody over any Rewards on behalf of any delegator.&nbsp;
              </p>

              <p>
                2.3&nbsp; &nbsp;&nbsp;As between Forbole and a delegator, the
                results of the operation of a Supported Network are
                determinative of their respective rights and obligations, and
                are final and binding upon both parties to these Terms.
              </p>

              <p>
                2.4&nbsp; &nbsp;&nbsp;As all Rewards are generated and sent by
                Supported Networks directly to the qualified wallet addresses,
                Forbole has no control over whether a particular Supported
                Network distributes Rewards to any delegator, and is not
                responsible in any way for any failure by a Supported Network to
                send Rewards to delegators.
              </p>

              <p>
                2.5&nbsp; &nbsp;&nbsp;The protocol of each Supported Network
                dictates the number of validators in the active set or the
                prerequisites to be fulfilled to be in the active set, i.e. the
                operator of validator nodes who will receive Rewards. Such
                numbers or prerequisites may change from time to time. No
                representation, warranty or promise is given to the effect that
                the validator nodes operated by us will remain in the active set
                at all times or at any specific period of time.&nbsp;
              </p>

              <p>
                2.6&nbsp; &nbsp;&nbsp;The rate of our service fee for providing
                the Services in respect of each Supported Network is as stated
                on our platform or the platform of the wallet service or
                exchange service that you use, and may be adjusted from time to
                time without prior notice to you.&nbsp;
              </p>

              <p>
                2.7&nbsp; &nbsp;&nbsp;Any portion of Rewards or other awards
                distributed to Forbole by operation of a Supported Network is
                our sole and exclusive property, to which you have no access and
                on which you have no claim.&nbsp;
              </p>

              <p>
                2.8&nbsp; &nbsp;&nbsp;Please make sure that you provide the
                correct wallet address for receiving the Rewards. Forbole is not
                liable for any loss, destruction or sending of Rewards to an
                incorrect wallet address.
              </p>

              <p>
                2.9&nbsp; &nbsp;&nbsp;For the purposes of these Terms,
                &ldquo;Rewards&rdquo; include: block rewards and transaction
                fees in return for the exercising of Validation Rights, in each
                case as actually granted by the Supported Network.&nbsp;
              </p>

              <h4>
                3.&nbsp; &nbsp;&nbsp;Protocol Changes, Airdrops and Forks&nbsp;
              </h4>

              <p>
                3.1&nbsp; &nbsp;&nbsp;From time to time the protocols of
                Supported Networks may change, and airdrops or forks may arise,
                in each case out of the control of Forbole. Unless otherwise
                expressly provided in these Terms:&nbsp;
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;Forbole has sole and absolute discretion
                in determining actions in response to protocol changes, airdrops
                and forks;&nbsp;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;our exercise (or non-exercise) of any
                right or power available to us in our capacity as a validator on
                the Supported Network does not constitute any breach or
                violation of these Terms; and&nbsp;
              </p>

              <p>
                (c)&nbsp; &nbsp;&nbsp;Forbole is not responsible for any losses,
                liabilities, damages, loss of profits or reduction in value in
                respect of the relevant Tokens or otherwise suffered or incurred
                by the Delegators in connection with any protocol changes,
                airdrops or forks.
              </p>

              <p>
                3.2&nbsp; &nbsp;&nbsp;In cases of forks, Forbole has no
                obligation or responsibility to:
              </p>

              <p>
                (a)&nbsp;&nbsp; &nbsp;&nbsp;notify Delegators of pending,
                threatened or actual forks; nor
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;respond to forks in ways that benefit the
                Delegators over Forbole itself.&nbsp;
              </p>

              <h4>4.&nbsp; &nbsp;&nbsp;Conditions Precedent</h4>

              <p>
                4.1&nbsp; &nbsp;&nbsp;There are a number of pre-conditions that
                must be satisfied for us to offer our Services to you. If these
                pre-conditions are not satisfied, we do not and cannot offer our
                Services to you.
              </p>

              <p>
                4.2&nbsp; &nbsp;&nbsp;Our offer of our Services to you in
                respect of a Supported Network is conditional
                upon&nbsp;all&nbsp;of the following being satisfied at all times
                from the Effective Date (as defined in Clause 8.1), for as long
                as you delegate Token Rights of such Supported Network to us:
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;your representations and warranties under
                Clauses 5.1 and 5.2 are and remain true, accurate and
                complete;&nbsp;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;the nodes operated by us are and remain in
                the active set of such Supported Network;&nbsp;
              </p>

              <p>
                (c)&nbsp; &nbsp;&nbsp;the performance of these Terms by us does
                not require any licences, permits or registrations (under
                securities laws or otherwise) not possessed by us;&nbsp;
              </p>

              <p>
                (d)&nbsp; &nbsp;&nbsp;the performance of these Terms by either
                Party does not constitute any breach, default or violation of
                any applicable laws and regulations (including securities laws,
                financial services laws, anti-money-laundering laws,
                anti-terrorist and anti-terrorist-financing laws); and
              </p>

              <p>
                (e)&nbsp; &nbsp;&nbsp;the performance of these Terms by either
                Party does not constitute any breach, default or violation of
                any contracts to which that Party is a party (including these
                Terms and the protocols of the Supported Network).
              </p>

              <p>
                4.3&nbsp; &nbsp;&nbsp;Below are some examples of circumstances
                where one or more of the conditions precedent set out in Clause
                4.2 are not satisfied, and as a result you must immediately
                revoke your delegation to us:
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;where one or more Tokens you delegated to
                us are determined under applicable laws and regulations to
                constitute &ldquo;securities&rdquo;, and the act of operating
                validator nodes in connection with such Tokens becomes subject
                to licences, permits or registrations which we do not hold at
                relevant times;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;where you become an entity or individual
                located, organised or ordinarily resident in a sanctioned
                jurisdiction (currently,&nbsp;Cuba, Iran, North Korea, Russia,
                Syria and Crimea, Donetsk and Luhansk of Ukraine), or an entity
                or individual on the Specially Designated Nationals and Blocked
                Persons List of the Office of Foreign Assets Control of the
                United States Treasury Department (or other lists to similar
                effect in applicable jurisdictions), or you become directly or
                indirectly owned or controlled by any such entity or individual;
                and&nbsp;
              </p>

              <p>
                (c)&nbsp; &nbsp;&nbsp;where we are deemed to have a &ldquo;money
                transmitter&rdquo; or similar status under applicable
                anti-money-laundering laws, anti-terrorist or
                anti-terrorist-financing laws, but we cannot reasonably comply
                with the associated obligations due to the decentralised and
                permissionless design of the Supported Networks.
              </p>

              <p>
                4.4&nbsp; &nbsp;&nbsp;Due to the decentralised and
                permissionless design of the Supported Networks, any person
                holding Tokens may anonymously delegate their Token Rights to
                us. By holding private keys, you have full access to and control
                over your Tokens. We have no way to stop delegation. However, if
                we suffer or incur any losses or liabilities in connection with
                or as a result of your delegation of Tokens to us while one or
                more of the conditions precedent set out in Clause 4.2 are not
                satisfied, we reserve the right to take legal action against you
                to compensate our losses or liabilities.&nbsp;
              </p>

              <h4>5.&nbsp; &nbsp;&nbsp;Representations and Warranties</h4>

              <p>
                5.1&nbsp; &nbsp;&nbsp;Each Party represents and warrants to the
                other that, as at of the Effective Date and on each day that the
                delegation continues:
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;(if a Party is an individual) the Party is
                of legal age in its jurisdiction of residence;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;(if a Party is a business entity,
                partnership or other forms of organisation) the Party is duly
                incorporated or organised, validly existing and in good standing
                under the laws of the jurisdiction of its incorporation or
                organisation; and&nbsp;
              </p>

              <p>
                (c)&nbsp; &nbsp;&nbsp;the Party has all requisite authority,
                capacity and power to enter into and perform its obligations
                under these Terms, and that these Terms constitutes a legal,
                valid and binding obligation of the Party enforceable against it
                in accordance with its terms (save for exceptions due to
                bankruptcy, insolvency or other laws of general application
                relating to or affecting the enforcement of creditors&rsquo;
                rights generally and principles of equity).&nbsp;
              </p>

              <p>
                5.2&nbsp; &nbsp;&nbsp;In addition to the representations and
                warranties set out in Clause 5.1, you further represent and
                warrant to us that, as at of the Effective Date and on each day
                that the delegation continues:
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;you have full right, title and interest in
                and to the Tokens delegated to us;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;you are experienced and sophisticated in
                using and evaluating the Supported Networks and related
                technologies, and you have conducted your own independent
                research, due diligence and analysis of the Supported Networks
                and you enter into these Terms solely relying on your own
                independent research, due diligence and analysis;
              </p>

              <p>
                (c)&nbsp; &nbsp;&nbsp;you are not (as an entity or individual)
                located, organised or ordinarily resident in a sanctioned
                jurisdiction (currently,&nbsp;Cuba, Iran, North Korea, Russia,
                Syria and Crimea, Donetsk and Luhansk of Ukraine), nor directly
                or indirectly owned or controlled by any such entity or
                individual;
              </p>

              <p>
                (d)&nbsp; &nbsp;&nbsp;you are not on the Specially Designated
                Nationals and Blocked Persons List published by the Office of
                Foreign Assets Control of the United States Treasury Department
                (or other lists to similar effect in applicable jurisdictions),
                nor directly or indirectly owned or controlled by any such
                entity or individual;
              </p>

              <p>
                (e)&nbsp; &nbsp;&nbsp;you have not been convicted of any
                money-laundering, terrorist-financing, trafficking in controlled
                substances (or similar crimes) at any domestic, military,
                foreign or international court; and
              </p>

              <p>
                (f)&nbsp; &nbsp;&nbsp;the Tokens delegated to us are not derived
                from, nor otherwise represent the proceeds of, any activities
                done in violation or contravention of any applicable domestic,
                military, foreign or international laws.
              </p>

              <h4>6.&nbsp; &nbsp;&nbsp;Limitations and Disclaimers</h4>

              <p>
                6.1&nbsp; &nbsp;&nbsp;Our Services, together with the
                website(s), platform(s), application(s) and their components
                offered by Forbole, its holding company(ies), subsidiary(ies)
                and affiliates, are provided on an &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo; basis.&nbsp;
              </p>

              <p>
                6.2&nbsp; &nbsp;&nbsp;Forbole makes&nbsp;no representation or
                warranty&nbsp;that:&nbsp;
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;the Services comply with any obligations
                that the Delegators may have under any applicable laws, rules or
                regulations; or
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;the Services will always be
                available.&nbsp;
              </p>

              <p>
                6.3&nbsp; &nbsp;&nbsp;Forbole owes no liability or obligation to
                any delegator if and when (i) Forbole is not within the active
                set of validators or (ii) slashing occurs.
              </p>

              <p>
                6.4&nbsp; &nbsp;&nbsp;To the fullest extent permitted by law,
                Forbole and its holding company(ies), subsidiary(ies),
                affiliates, directors, officers, employees, agents and
                representatives expressly disclaim any liability or
                responsibility for:&nbsp;
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;any error or interruption in usage or any
                loss, inaccuracy or corruption of data, nor any cost of
                procurement of substitute goods, services or technology;
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;any damages, losses, claims (whether in
                contract, tort or otherwise), costs (including professional fees
                and expenses), whether direct, indirect, special, incidental,
                punitive, exemplary, consequential, or of any other kind
                (including, without limitation, any loss of revenue, profits,
                opportunities, business, goodwill or reputation), arising out of
                or in connection with your use of our Services;
              </p>

              <p>
                (c)&nbsp; &nbsp;&nbsp;any damages or losses arising out of or in
                connection with any acts or omissions on the part of the
                Delegator or of any third parties, including any loss of private
                keys, losses or theft of digital assets, malfunction or failure
                of any Supported Network, execution or settlement errors,
                configuration errors, connectivity failure, programming language
                errors, security breaches, weaknesses or bugs; and
              </p>

              <p>
                (d)&nbsp; &nbsp;&nbsp;any other matters beyond the reasonable
                control of Forbole.
              </p>

              <h4>7.&nbsp; &nbsp;&nbsp;Taxes and other obligations</h4>

              <p>
                7.1&nbsp; &nbsp;&nbsp;You are solely responsible for any and all
                taxes, duties and levies payable to any governmental authorities
                in connection with or arising out of the Rewards or any other
                amounts received or receivable by you in connection with these
                Terms.
              </p>

              <p>
                7.2&nbsp; &nbsp;&nbsp;You are strongly encouraged to seek
                independent professional advice to understand your legal, tax or
                other obligations in connection with or arising out of the
                Rewards or any other amounts received or receivable by you in
                connection with these Terms. Forbole (nor any of its holding
                company(ies), subsidiary(ies), affiliates, directors, officers,
                employees, agents and representatives) does not provide any
                advice in respect of your legal, tax or other obligations in
                connection with your use of our Services.
              </p>

              <h4>8.&nbsp; &nbsp;&nbsp;Term, Termination and Withdrawal</h4>

              <p>
                8.1&nbsp; &nbsp;&nbsp;These Terms come into effect and become
                legally binding on the date on which you first delegate any
                Tokens to Forbole (the &ldquo;Effective Date&rdquo;) and will
                continue to remain in effect for as long as the delegation
                continues.
              </p>

              <p>
                8.2&nbsp; &nbsp;&nbsp;Subject to the protocol of the applicable
                Supported Network (in particular any unbonding requirement),
                either Party may terminate these Terms at any time for any
                reason with immediate effect:
              </p>

              <p>
                (a)&nbsp; &nbsp;&nbsp;in case of the Delegator, by withdrawing
                your Tokens from delegation; or
              </p>

              <p>
                (b)&nbsp; &nbsp;&nbsp;in case of Forbole, by terminating or
                sunsetting validator nodes.
              </p>

              <p>
                8.3&nbsp; &nbsp;&nbsp;Supported Networks typically impose a
                period of time as &ldquo;unbonding periods&rdquo; during which
                you will not receive Rewards in respect of the Tokens and cannot
                perform any transaction in respect of the Tokens.
              </p>

              <p>
                8.4&nbsp; &nbsp;&nbsp;In the event that Forbole sunsets its
                validator node on a Supported Network, subject to the protocol
                of the Supported Network, all delegated tokens will unbond
                automatically after a certain period of time. We will make
                public announcements if and when we decide to sunset our node.
              </p>

              <p>
                8.5&nbsp; &nbsp;&nbsp;Forbole is not liable for any damages,
                losses, claims (whether in contract, tort or otherwise), costs
                (including professional fees and expenses), whether direct,
                indirect, special, incidental, punitive, exemplary,
                consequential, or of any other kind (including, without
                limitation, any loss of revenue, profits, opportunities,
                business, goodwill or reputation), arising out of or in
                connection with your delegation, withdrawal or unbonding of
                Tokens.
              </p>

              <p>
                8.6&nbsp; &nbsp;&nbsp;Termination of these Terms will not affect
                any rights, remedies, obligations or liabilities of the Parties
                that have accrued up to the date of termination, including the
                right to claim damages in respect of any antecedent breaches.
              </p>

              <p>
                8.7&nbsp; &nbsp;&nbsp;All provisions which by nature extend
                beyond the termination of these Terms will survive termination,
                including, without limitation, disclaimers and limitations of
                liability, governing law and dispute resolution mechanisms, and
                general provisions relating to the interpretation and operation
                of these Terms.
              </p>

              <h4>9.&nbsp; &nbsp;&nbsp;Force majeure</h4>

              <p>
                9.1&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp;Neither Party will be in breach of these Terms or be
                liable for any delay in performing, or any failure to perform,
                any of its obligations under these Terms if such delay or
                failure result from events, circumstances or causes beyond its
                reasonable control. In such circumstances, the time for
                performance will be extended by a period equivalent to the
                period during which performance of the obligation has been
                delayed or failed to be performed.
              </p>
              <p>
                9.2&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;A
                force majeure event includes: an act of God, fire, flood,
                typhoon, storm, war, riot, civil unrest, act of terrorism,
                strike, industrial dispute, outbreak of epidemic or pandemic
                illness, failure of utility service or transportation, shortage
                and unavailability of energy or resources, and operation and
                action of and changes to the protocols of Supported Networks.
              </p>

              <h4>10.&nbsp; &nbsp;&nbsp;General Provisions</h4>

              <p>
                10.1&nbsp; &nbsp;&nbsp;These Terms may be updated from time to
                time by Forbole.&nbsp;
              </p>
              <p>
                10.2&nbsp; &nbsp;&nbsp;These Terms constitute the entire
                agreement between the Parties, and supersede all prior or
                contemporaneous negotiations, discussions or records with
                respect to the subject matter hereof.
              </p>
              <p>
                10.3&nbsp; &nbsp;&nbsp;If any provision of these Terms becomes
                invalid or unenforceable, it will be deemed modified (to the
                minimum extent necessary) to make it valid and enforceable, or
                where such modification is not possible, deemed deleted and will
                not affect the validity and enforceability of the remaining
                provisions.&nbsp;
              </p>
              <p>
                10.4&nbsp; &nbsp;&nbsp;The failure of either Party at any time
                to insist on the performance of, or to exercise a right or
                remedy under, any provision of these Terms is not a waiver of
                its right at any later time to insist on the performance of, or
                exercise a right or remedy under, that or any other provision of
                these Terms.
              </p>
              <p>
                10.5&nbsp; &nbsp;&nbsp;A reference to a person includes a
                natural person, a corporation, or an unincorporated body
                (whether or not having a separate legal personality). A
                reference to writing or written includes fax, e-mail and instant
                messaging. A reference to one gender will include a reference to
                the other genders.
              </p>
              <p>
                10.6&nbsp; &nbsp;&nbsp;Clause and schedule headings are for
                convenience only and do not affect the interpretation of the
                provisions of this Agreement.
              </p>
              <h4>11&nbsp; &nbsp; &nbsp;Governing Law</h4>
              <p>
                These Terms and any dispute or claim arising out of or in
                connection with it or its subject matter or formation (including
                non-contractual disputes or claims) will be governed by and
                construed in accordance with the laws of the Hong Kong Special
                Administrative Region.
              </p>
              <h4>12&nbsp; &nbsp;&nbsp;Dispute Resolution</h4>
              <p>
                12.1&nbsp; &nbsp;&nbsp;Any dispute, controversy, difference or
                claim arising out of or relating to these Terms, including the
                existence, validity, interpretation, performance, breach or
                termination thereof, will be referred to and finally resolved by
                arbitration administered by the Hong Kong International
                Arbitration Centre (HKIAC) under the HKIAC Administered
                Arbitration Rules in force when the Notice of Arbitration is
                submitted.
              </p>
              <p>
                12.2 &nbsp; &nbsp;The law of this arbitration clause will be the
                laws of the Hong Kong Special Administrative Region. The seat of
                the arbitration will be Hong Kong. The number of arbitrators
                will be one. The arbitration proceedings will be conducted in
                English.
              </p>
              <Box
                sx={{
                  height: 0,
                  [theme.breakpoints.up('laptop')]: {
                    height: '300px',
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
                    bottom: '350px',
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

export default StakingServicesTerms;
