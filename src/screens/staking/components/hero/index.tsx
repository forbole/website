import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ScrollToBottom } from '@components';
import { useWindowDimensions } from '@src/hooks';
import { Stats } from './components';
import useStyles from './useStyles';

const Hero = () => {
  const { t } = useTranslation('staking');
  const theme = useTheme();
  const { windowDimensions, isDesktop } = useWindowDimensions();
  const { width } = windowDimensions;
  const styles = useStyles();
  const ref = React.useRef(null);
  return (
    <Box css={styles.root} display="flex" justifyContent="center">
      <Box
        sx={{
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
              // mixBlendMode: 'soft-light',
              mixBlendMode: 'lighten',
              opacity: 1,
              // filter: 'brightness(35%)',
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
              src="/images/assets/horse.png"
              layout="fill"
              objectFit="contain"
              width={isDesktop ? '413px' : '188px'}
              height={isDesktop ? '500px' : '232px'}
            />
          </Box>
          <Box
            sx={{
              // mixBlendMode: 'screen',
              mixBlendMode: 'soft-light',
              // filter: 'brightness(95%)',
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
              src="/images/assets/horse.png"
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
            {t('FVH title')}
          </Typography>
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
                top: '65vh',
              },
            }}
          >
            <Image
              src="/images/assets/image_water_shadow.png"
              layout="fill"
              objectFit="contain"
              width={isDesktop ? '516px' : '210px'}
              height={isDesktop ? '376px' : '177px'}
            />
          </Box>
        </Box>
        <ScrollToBottom staking bottomRef={ref} />
      </Box>
      <Box css={styles.stats} ref={ref}>
        <Stats />
      </Box>
    </Box>
  );
};

export default Hero;
