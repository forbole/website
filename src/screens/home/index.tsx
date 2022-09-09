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
  const { t } = useTranslation('home');
  const theme = useTheme();
  const { windowDimensions, isDesktop } = useWindowDimensions();
  const { width } = windowDimensions;
  return (
    <Layout
      navLink="/"
      title={t('forbole')}
      description={t('description')}
      image="/images/assets/Facebook-Forbole.png"
      twitterImage="/images/assets/Twitter-Forbole.png"
      footer
      homeAnimation
    >
      <Box
        sx={{
          // backgroundImage: 'url(/images/assets/image_BG.png)',
          backgroundImage: '',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // backgroundPosition: '52px -59px',
          minHeight: '75vh',
          userSelect: 'none',
        }}
      >
        <Box
          sx={{
            // display: 'none',
            // [theme.breakpoints.up('laptop')]: {
            display: 'inherit',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // zIndex: 1,
            height: '100vh',
            objectFit: 'cover',
          }}
        >
          <HomeAnimation />
        </Box>
        {/* <Box
          sx={{
            height: '70vh',
            width: '50%',
            position: 'absolute',
            left: '5%',
            top: theme.spacing(10),
            [theme.breakpoints.down('tablet')]: {
              display: 'none',
            },
          }}
        >
          <Image
            src="/images/assets/image_stars.png"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Box
          sx={{
            height: '70vh',
            width: '50%',
            position: 'absolute',
            right: '5%',
            top: theme.spacing(10),
            [theme.breakpoints.down('tablet')]: {
              display: 'none',
            },
          }}
        >
          <Image
            src="/images/assets/image_stars.png"
            layout="fill"
            objectFit="contain"
          />
        </Box> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '70vh',
            alignItems: 'flex-end',
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
                top: '20vh',
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
              },
              [theme.breakpoints.up('tablet')]: {
                maxWidth: '610px',
                lineHeight: theme.spacing(9),
                letterSpacing: '0.013em',
                fontSize: theme.spacing(8),
                padding: 0,
              },
            })}
          >
            {width < theme.breakpoints.values.tablet
              ? t('title', { variable: '\n' })
              : t('titleD')}
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              mixBlendMode: 'lighten',
              bottom: '10vh',
              width: width / 2,
              [theme.breakpoints.up('mobile')]: {
                backgroundSize: 'contain',
                height: '300px',
                // width: theme.spacing(45),
                // styling after review 1:
                width: '100%',
                // width: `${width}px`,
                right: '15px',
              },
              [theme.breakpoints.up('tablet')]: {
                backgroundSize: 'contain',
                height: '500px',
                width: '550px',
                left: 'auto',
                right: 'auto',
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
                width: theme.spacing(40),
                bottom: '25vh',
              },
              position: 'absolute',
              [theme.breakpoints.up('tablet')]: {
                bottom: '20vh',
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
