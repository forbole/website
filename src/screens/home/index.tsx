import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Layout } from '@components';
import { useWindowDimensions } from '@src/hooks';

const Home = () => {
  const { t } = useTranslation('home');
  const theme = useTheme();
  const { width } = useWindowDimensions();
  return (
    <Layout
      navLink="/"
      title={t('forbole')}
      description={t('description')}
      image="/images/assets/Facebook-Forbole.png"
      twitterImage="/images/assets/Twitter-Forbole.png"
      footer
    >
      <Box
        sx={{
          backgroundImage: 'url(/images/assets/image_BG.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // backgroundPosition: '52px -59px',
          minHeight: '85vh',
        }}
      >
        <Box
          sx={{
            backgroundImage: 'url(/images/assets/image_stars.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            height: '70vh',
            width: '100%',
            position: 'absolute',
            backgroundPosition: '25% 75%',
            top: theme.spacing(10),
            [theme.breakpoints.down('tablet')]: {
              display: 'none',
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '60vh',
            alignItems: 'flex-end',
            [theme.breakpoints.up('laptop')]: {
              alignItems: 'flex-end',
              height: '70vh',
            },
          }}
        >
          <Box
            sx={{
              backgroundImage: 'url(/images/assets/image_horse.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
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
          />
          <Typography
            sx={(s) => ({
              whiteSpace: 'pre-wrap',
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
              backgroundImage: 'url(/images/assets/image_horseInWater.png)',
              position: 'absolute',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              [theme.breakpoints.up('tablet')]: {
                backgroundSize: 'contain',
              },
              mixBlendMode: 'lighten',
              bottom: '10vh',
              width: width / 2,
              [theme.breakpoints.up('mobile')]: {
                height: '300px',
                width: theme.spacing(45),
              },
            }}
          />
          <Box
            sx={{
              [theme.breakpoints.up('mobile')]: {
                height: '140px',
                width: theme.spacing(40),
                bottom: '20vh',
              },
              backgroundImage: 'url(/images/assets/image_watershadow.png)',
              position: 'absolute',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
