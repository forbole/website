import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Layout } from '@components';
import { useWindowDimensions } from '@src/hooks';
import { HomeAnimation } from './components';
import { TransitionCSS } from './styles';

const Home = () => {
  const { t, lang } = useTranslation('home');
  const theme = useTheme();
  const { windowDimensions, isDesktop } = useWindowDimensions();
  const { width } = windowDimensions;
  return (
    <Layout
      navLink="/"
      title={t('forbole')}
      description={t('description')}
      image="/images/assets/website-preview.png"
      twitterImage="/images/assets/website-preview.png"
      footer
      homeAnimation
    >
      <Box
        sx={{
          backgroundImage: '',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '65vh',
          userSelect: 'none',
          [theme.breakpoints.up('laptop')]: {
            minHeight: '75vh',
            height: '100vh',
          },
        }}
      >
        <Box
          sx={{
            display: 'inherit',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: '100vh',
            objectFit: 'cover',
            '#lottie-svg-id': {
              transform: 'unset !important' as any,
            },
          }}
        >
          <HomeAnimation />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '55vh',
            alignItems: 'flex-end',
            [theme.breakpoints.up('tablet')]: {
              height: '75vh',
              alignItems: 'center',
            },
            [theme.breakpoints.up('laptop')]: {
              alignItems: 'flex-end',
              height: '65vh',
            },
          }}
        >
          <Box
            sx={{
              mixBlendMode: 'lighten',
              position: 'absolute',
              top: '10vh',
              margin: 'auto',
              height: '50vh',
              width: theme.spacing(50),
              [theme.breakpoints.down('laptop')]: {
                width: width / 2,
                top: '5vh',
              },
              [theme.breakpoints.up('tablet')]: {
                width: width / 2,
                top: '10vh',
              },
            }}
          >
            <Image
              src="/images/assets/image_horse.png"
              layout="fill"
              objectFit="contain"
              width={isDesktop ? '413px' : '188px'}
              height={isDesktop ? '500px' : '232px'}
            />
          </Box>
          {lang === 'en' ? (
            <Typography
              sx={(s) => ({
                whiteSpace: 'pre-wrap',
                zIndex: 3,
                [s.breakpoints.up('mobile')]: {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: theme.spacing(4),
                  lineHeight: theme.spacing(5),
                  textAlign: 'center',
                  letterSpacing: '0.032em',
                  textShadow: '0px 0px 20px rgba(0, 0, 0, 0.88)',
                  padding: 0,
                },
                [theme.breakpoints.up('tablet')]: {
                  maxWidth: '610px',
                  lineHeight: theme.spacing(9),
                  letterSpacing: '0.013em',
                  fontSize: theme.spacing(8),
                  padding: 0,
                  paddingTop: theme.spacing(30),
                },
              })}
            >
              {width < theme.breakpoints.values.tablet
                ? t('title', { variable: '\n' })
                : t('titleD')}
            </Typography>
          ) : (
            <Typography
              sx={(s) => ({
                whiteSpace: 'pre-wrap',
                zIndex: 3,
                [s.breakpoints.up('mobile')]: {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: theme.spacing(4),
                  lineHeight: theme.spacing(5),
                  textAlign: 'center',
                  letterSpacing: '0.032em',
                  textShadow: '0px 0px 20px rgba(0, 0, 0, 0.88)',
                  padding: 0,
                },
                [theme.breakpoints.up('tablet')]: {
                  maxWidth: '610px',
                  lineHeight: theme.spacing(9),
                  letterSpacing: '0.013em',
                  fontSize: theme.spacing(8),
                  padding: 0,
                  paddingTop: theme.spacing(30),
                },
              })}
            >
              {t('title', { variable: '\n' })}
            </Typography>
          )}
          <Box
            sx={{
              position: 'absolute',
              mixBlendMode: 'lighten',
              width: width / 2,
              [theme.breakpoints.up('mobile')]: {
                backgroundSize: 'contain',
                height: '300px',
                width: `${width * 0.6}px`,
                margin: 'auto',
                top: '45vh',
              },
              [theme.breakpoints.up('tablet')]: {
                backgroundSize: 'contain',
                height: '400px',
                width: '550px',
                left: 'auto',
                right: 'auto',
                top: '50vh',
              },
              [theme.breakpoints.up('laptop')]: {
                height: '322px',
                width: '431px',
              },
            }}
          >
            <TransitionCSS>
              <Image
                src="/images/assets/image_horseInWater.png"
                layout="fill"
                objectFit="contain"
                width={isDesktop ? '516px' : '210px'}
                height={isDesktop ? '376px' : '177px'}
              />
            </TransitionCSS>
          </Box>
          <Box
            sx={{
              [theme.breakpoints.up('mobile')]: {
                height: '140px',
                width: theme.spacing(35),
                top: '50vh',
              },
              position: 'absolute',
              [theme.breakpoints.up('tablet')]: {
                top: '55vh',
                width: theme.spacing(80),
              },
            }}
          >
            <Image
              src="/images/assets/image_watershadow.png"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
