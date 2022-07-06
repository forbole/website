import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { Layout, ScrollToTop, ScrollToBottom } from '@components';
import { useWindowDimensions } from '@hooks';
import { Overview, Lineup } from './components';
import { bd, blockchains } from './components/lineup/config';

const Solutions = () => {
  const { t } = useTranslation('solutions');
  const theme = useTheme();
  const { isDesktop } = useWindowDimensions();
  const topRef = React.useRef(null);
  const bottomRef = React.useRef(null);
  return (
    <Layout title={t('title')} navLink="/solutions" waveBG footer>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '140vh',
          [theme.breakpoints.down('laptop')]: {
            minHeight: 'auto',
            background: 'url(/images/assets/image_BG.png) top',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          },
          [theme.breakpoints.up('laptop')]: {
            background: 'url(/images/assets/image_BG.png) top',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '150%',
            minHeight: '130vh',
          },
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(0, 3),
            [theme.breakpoints.up('laptop')]: { maxWidth: '1200px' },
          }}
          ref={topRef}
        >
          <Overview />
          <Box
            sx={{
              display: 'none',
              [theme.breakpoints.up('laptop')]: {
                display: 'flex',
                justifyContent: 'center',
              },
            }}
          >
            <ScrollToBottom bottomRef={bottomRef} />
          </Box>
        </Box>
        <Box
          sx={{
            background: 'url(/images/assets/image_wave.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            minHeight: '75vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.up('laptop')]: {
              background: 'url(/images/assets/image_wave.png)',
              backgroundPosition: '0 0%',
              backgroundSize: 'cover',
              WebkitBackgroundSize: 'cover',
              MozBackgroundSize: 'cover',
              OBackgroundSize: 'cover',
              zIndex: 1,
            },
          }}
        >
          <Box
            ref={bottomRef}
            sx={{
              padding: theme.spacing(25, 3, 0, 3),
              width: '100%',
              [theme.breakpoints.up('tablet')]: {
                padding: theme.spacing(18, 3, 0, 3),
                width: '100%',
              },
              [theme.breakpoints.up('laptop')]: {
                maxWidth: '1200px',
                padding: theme.spacing(25, 0, 0, 0),
                width: '100%',
              },
            }}
          >
            <Lineup />

            {/* big dipper stats as a seperate component: */}
            {isDesktop && (
              <Box sx={{ height: '1000px' }}>
                <Box
                  sx={{
                    border: '1px solid rgba(195, 204, 226, 0.3)',
                    borderRadius: theme.spacing(5.25),
                    color: 'primary.main',
                    background: 'transparent',
                    padding: theme.spacing(1),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    width: '100%',
                    margin: theme.spacing(4, 0),
                    [theme.breakpoints.up('laptop')]: {
                      padding: theme.spacing(3.5),
                      width: '100%',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      textAlign: 'left',
                      [theme.breakpoints.up('laptop')]: {
                        fontSize: theme.spacing(4),
                        padding: theme.spacing(0, 0, 0, 3),
                      },
                    }}
                  >
                    {t('supported blockchains')}
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridTemplateRows: 'repeat(5, 1fr)',
                      gridGap: theme.spacing(5),
                      padding: theme.spacing(2),
                      width: '100%',
                      [theme.breakpoints.up('laptop')]: {
                        gridTemplateColumns: 'repeat(10, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gridGap: theme.spacing(6),
                      },
                    }}
                  >
                    {blockchains.map((blockchain) => {
                      const { networkIcon, key } = blockchain;
                      return (
                        <Image
                          key={key}
                          src={networkIcon}
                          alt={key}
                          objectFit="contain"
                          width="48px"
                          height="48px"
                          quality={100}
                        />
                      );
                    })}
                  </Box>
                </Box>
                <Box
                  sx={{
                    border: '1px solid rgba(195, 204, 226, 0.3)',
                    borderRadius: theme.spacing(5.25),
                    color: 'primary.main',
                    background: 'transparent',
                    padding: theme.spacing(2),
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gridGap: theme.spacing(3),
                    width: '100%',
                    [theme.breakpoints.up('laptop')]: {
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      justifyContent: 'space-around',
                      padding: theme.spacing(5),
                      width: '100%',
                    },
                  }}
                >
                  {bd.map((stat, i) => {
                    const { stats, desc } = stat;
                    return (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          color: 'primary.main',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'primary.main',
                            [theme.breakpoints.up('laptop')]: {
                              paddingRight:
                                i === bd.length - 1
                                  ? theme.spacing(4)
                                  : theme.spacing(6),
                            },
                          }}
                        >
                          <Typography
                            variant="h1"
                            sx={{
                              fontWeight: 600,
                              fontSize: theme.spacing(6),
                              textAlign: 'center',
                            }}
                          >
                            {`${stats}+`}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 400,
                              fontSize: theme.spacing(1.75),
                              textAlign: 'center',
                            }}
                          >
                            {desc}
                          </Typography>
                        </Box>{' '}
                        {isDesktop && i !== bd.length - 1 && (
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{
                              borderColor: theme.palette.primary.main,
                              opacity: 0.3,
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
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
        </Box>
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
    </Layout>
  );
};

export default Solutions;
