import React from 'react';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { Layout, ScrollToTop } from '@components';
import { useWindowDimensions } from '@hooks';
import Link from '@mui/material/Link';
import { TNCCSS } from '../terms_and_conditions/styles';

const Trans = dynamic(async () => import('next-translate/Trans'), {
  ssr: false,
});

const Policy = () => {
  const { t } = useTranslation('policy');
  const theme = useTheme();

  const { isDesktop } = useWindowDimensions();

  const topRef = React.useRef(null);

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
              {/* <Typography
                variant="body1"
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: theme.spacing(1.75),
                  fontWeight: 600,
                  paddingBottom: theme.spacing(5),
                }}
              >
                {t('description1', {})}
              </Typography> */}
              <Trans
                i18nKey={t('description1')}
                components={[
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: theme.spacing(1.375),
                      fontWeight: 400,
                      // paddingBottom: theme.spacing(5),
                    }}
                  />,
                  <Typography
                    color="primary.main"
                    sx={{
                      fontWeight: 700,
                      display: 'inline',
                      fontSize: theme.spacing(1.375),
                      [theme.breakpoints.up('laptop')]: {
                        fontSize: theme.spacing(1.375),
                        display: 'inline',
                      },
                    }}
                  />,
                  <Link
                    color="primary.main"
                    href="https://forbole.com"
                    rel="noreferrer"
                    target="_blank"
                    sx={{
                      fontWeight: 500,
                      display: 'inline',
                      fontSize: theme.spacing(1.7),
                      [theme.breakpoints.up('laptop')]: {
                        fontSize: theme.spacing(1.7),
                        display: 'inline',
                      },
                    }}
                  />,
                ]}
              />
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: theme.spacing(1.75),
                  fontWeight: 600,
                  paddingBottom: theme.spacing(5),
                }}
              >
                {t('description2')}
              </Typography>

              <>
                <meta
                  content="text/html; charset=UTF-8"
                  httpEquiv="content-type"
                />
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c13"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span>
                    By engaging with our Platform and using our Services, you
                    accept the privacy practices as set out in this policy, as
                    may be modified or supplemented from time to time
                  </span>
                  <span className="c8" style={{ fontWeight: 700 }}>
                    .{' '}
                  </span>
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    If you are engaging with our Platform or using our Services
                    as a representative of an organisation, you are accepting
                    these practices on their behalf.{' '}
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c13"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    If you have any questions about this policy or any privacy
                    issues related to your use of our Services, please contact
                    us by email to privacy@forbole.com .
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    1. About us
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '36pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    1.1 Forbole is a leading provider of blockchain solutions.
                    We offer non-custodial staking service for tokenholders with
                    enterprise-grade security. We also offer open source tools
                    such as Big Dipper, our award-winning block explorer that
                    helps users visualise and interact with on-chain data.
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    marginLeft: '36pt',
                    fontSize: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    1.2 Forbole Limited is a company incorporated in Hong Kong
                    with company registration number 3210522, having its
                    registered office at Flat 3B, Tontex Industrial Building,
                    2-4 Sheung Hei Street, San Po Kong, Kowloon, Hong Kong.
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    2. Personal information we collect from you
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    marginLeft: '36pt',
                    fontSize: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span>2.1 For the purpose of this policy, “</span>
                  <span className="c8" style={{ fontWeight: 700 }}>
                    personal data
                  </span>
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    ” refers to any information which is related to an
                    identified or identifiable natural person. “Personal data”
                    and “personal information” are used interchangeably.
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    marginLeft: '36pt',
                    fontSize: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    2.2 We collect from you:
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (a) personal information you provide to us through the
                    Services, including:
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c6"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (i) account data, such as your blockchain wallet public
                    address;
                  </span>
                </p>
                <p
                  className="c0"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c6"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (ii) contact information, such as your email address;
                  </span>
                </p>
                <p
                  className="c0"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c6"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (iii) social information, such as your social media account
                    that you disclose to us or your blockchain wallet or
                    blockchain profile you connect to the Services;
                  </span>
                </p>
                <p
                  className="c0"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c6"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (iv) transaction information, such as transaction record of
                    your blockchain wallet address; and
                  </span>
                </p>
                <p
                  className="c0"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c6"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (v) content that you create, such as any posts or comments
                    you publish on our Platform or our Services;{' '}
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (b) information we (or through third-party services that we
                    engage) automatically collect from you through the Services,
                    including:
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c6"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (i) information about your computer or mobile device that
                    you use to access our Platform or our Services, such as
                    device IP addresses, device operating systems, browser types
                    and settings;
                  </span>
                </p>
                <p
                  className="c0"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c6"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (ii) information about your online activities and actions on
                    the Platform, such as your usage data, navigation path,
                    frequency of visit and length of access to the Platform,
                    whether you are returning or new user; and
                  </span>
                </p>
                <p
                  className="c0"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c6"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '85pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (iii) information about your web traffic, settings or
                    preferences collected via cookies (text files that websites
                    store on a visitor’s device to uniquely identify the
                    visitor’s browser or store information), browser web storage
                    or locally stored objects, web beacons or similar
                    technologies.
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span>2.3 </span>
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    Due to the immutable, permanent and transparent nature of
                    blockchain protocols and applications, you must carefully
                    consider what information you choose to publish about
                    yourself or share with others, since you may not be able to
                    erase, remove or delete it, nor control who has access to
                    it.
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    2.4 We do not collect sensitive data or special category
                    data about you. This includes details about your race,
                    ethnic origin, politics, religion, trade union membership,
                    genetics, biometrics, health, or sexual orientation.
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    2.5 We do not knowingly collect or use personal data from
                    minors.
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    3. How we use personal information
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    3.1 We use your personal information as necessary to deliver
                    our Services to you, including:
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (a) to operate the Services and our business;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (b) to maintain and improve our Services or certain
                    functionalities or features of our Services;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (c) to process your transactions or your interactions with
                    various blockchain networks and protocols;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (d) to communicate with you regarding the Services, such as
                    announcements, updates, security alerts, and system
                    administrative information; and
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (e) to provide support when you use our Services, such as
                    responding to your requests and enquiries.
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    3.2 In addition, we use your personal information for
                    legitimate business purposes, including:
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (a) to update you about our Services or notifying you about
                    our new products and features;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (b) to analyse, research and review user behaviour
                    anonymously or on an aggregated basis, and to develop and
                    evaluate new products or features;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (c) to investigate issues such as security breaches,
                    cyberattacks or scams;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (d) to comply with applicable laws and regulations, or to
                    defend legal actions against you, us or other users of the
                    Platform; and
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (e) to enforce the Terms of Use that govern the use of the
                    Platform and the Services.{' '}
                  </span>
                </p>
                <p
                  className="c3"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    height: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    3.3 We may also use personal information for any purposes
                    for which you grant us your specific consent.
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span>4. </span>
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    How we share your personal information
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    4.1 We do not sell your personal information.
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    4.2 We share your personal information with the following
                    parties:
                  </span>
                </p>
                <p
                  className="c4 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (a) other companies within our group, in order to operate
                    our Platform and offer our products and services;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (b) service providers (including companies and individuals)
                    that help us operate the Services, such as web traffic
                    tracking, analytics, storage, communication or payment
                    solutions;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (c) professional advisors, including lawyers, attorneys,
                    auditors, bankers and insurers where necessary;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (d) law enforcement, judicial, regulatory or governmental
                    authorities where applicable;
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (e) parties that acquire control over all or any substantial
                    portion of the business or assets of Forbole, such as in a
                    business merger, acquisition or reorganisation or
                    transactions with similar nature; and{' '}
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c1"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    (f) third party platforms where you have enabled features or
                    functionality that connect the Services with any third
                    party’s services, in which case you must review the terms
                    and conditions and privacy policy of such third party.
                  </span>
                </p>
                <p
                  className="c1 c10"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    marginLeft: '72pt',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',

                    widows: 2,
                    height: '11pt',
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  />
                </p>
                <p
                  className="c4"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: 0,
                    paddingTop: 0,
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    4.3 We require our third-party service providers to maintain
                    confidentiality and security of all personal information
                    that they process for us or on our behalf. We also require
                    that they implement and maintain reasonable security
                    measures to protect the confidentiality of your personal
                    information.
                  </span>
                </p>
                <p
                  className="c12"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    5. Your choices
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span>
                    5.1 You may update or correct any personal information we
                    hold in our systems anytime by contacting us at
                    privacy@forbole.com .{' '}
                  </span>
                  <span className="c8" style={{ fontWeight: 700 }}>
                    However, due to the immutable, permanent and transparent
                    nature of blockchain protocols and applications, we are
                    unable to erase, remove or delete your information recorded
                    on-chain, or any files that have been posted to the
                    InterPlanetary File System or similar decentralised storage
                    systems
                  </span>
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    .
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    5.2 You may opt out of our updates, newsletters or
                    notifications by unsubscribing the relevant mailing lists or
                    contacting us at privacy@forbole.com . However, you may not
                    opt out of receiving notifications that are transactional
                    (such as completion of on-chain transaction) or
                    administrative (such as announcement related to security
                    breaches or cyberattacks).
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    5.3 You may opt out from online tracking, such as blocking
                    cookies in your browser by following instructions in your
                    browser settings, or installing and configuring browser
                    plugins.
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    5.4 If you have given us consent to use your personal
                    information for a specific purpose, you may withdraw your
                    consent anytime by contacting us at privacy@forbole.com .
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    5.5 If you have any questions or feedback regarding how we
                    address your requests concerning your personal data, please
                    contact us at privacy@forbole.com .
                  </span>
                </p>
                <p
                  className="c12"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    6. Third-party websites
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span>
                    6.1 Our Platform includes links to third-party websites,
                    such as the websites of various blockchain networks or
                    crypto projects. If you access any of these third-party
                    websites, you will be doing so at your own risk. We do not
                    control any third-party websites, or any products or
                    services offered by third parties and we are not responsible
                    for their actions or omissions in privacy practices.
                  </span>
                </p>
                <p
                  className="c12"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    7. Retention of your personal data
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    7.1 We only keep your personal information for as long as
                    necessary to fulfil the purposes for which your personal
                    information is collected, including for the purposes of
                    fulfilling any legal, accounting or reporting requirements.{' '}
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    7.2 However, due to the immutable, permanent and transparent
                    nature of blockchain protocols and applications, we are
                    unable to erase, remove or delete your information recorded
                    on-chain, or any files that have been posted to the
                    InterPlanetary File System or similar decentralised storage
                    systems even after the retention period has expired.
                  </span>
                </p>
                <p
                  className="c12"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span className="c8" style={{ fontWeight: 700 }}>
                    8. Security and transfer of your personal data
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    8.1 We employ a number of technical and organisational
                    measures to safeguard the security of the personal
                    information we collect. However, we are unable to guarantee
                    the security of your personal information.
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    8.2 Within Forbole, access to your personal information is
                    restricted to personnel or service providers on a strictly
                    need-to-know basis.{' '}
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    8.3 We collect personal information globally. We may
                    transfer, process and store your personal information
                    outside your country of residence, and the parties with whom
                    we share your personal information may operate in a country
                    outside your country of residence.
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    marginLeft: '36pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    8.4 Some of the countries in which the parties with whom we
                    share your personal information operate may not have the
                    privacy and data protection laws that are equivalent to
                    those in your country of residence. When we share
                    information with these parties, we use our best endeavours
                    (such as by entering into contractual terms) to safeguard
                    the security of the information transferred.{' '}
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,

                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',

                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',

                    widows: 2,
                  }}
                >
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,

                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    9. Update or amendment
                  </span>
                </p>
                <p
                  className="c12 c15"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    We reserve the right to update or amend this policy at any
                    time.
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c5"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    10. Contact us
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    {' '}
                    You may reach us by email at privacy@forbole.com , or at the
                    following address:
                  </span>
                </p>
                <p
                  className="c7"
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: '11pt',
                    margin: 0,
                    lineHeight: '1.15',
                    orphans: 2,
                    paddingBottom: '12pt',
                    paddingTop: '12pt',
                    textAlign: 'left',
                    widows: 2,
                  }}
                >
                  <span
                    className="c2"
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: '11pt',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      textDecoration: 'none',
                      verticalAlign: 'baseline',
                    }}
                  >
                    {' '}
                    Flat 3B, Tontex Industrial Building, <br />
                    2-4 Sheung Hei Street, San Po Kong, <br />
                    Kowloon, Hong Kong
                  </span>
                </p>
              </>

              <Box
                sx={{
                  height: 0,
                  [theme.breakpoints.up('laptop')]: {
                    height: '150px',
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

export default Policy;
