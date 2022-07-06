import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { ExploreIcon } from '@icons';
import { useWindowDimensions } from '@hooks';
import { styles } from './styles';
import { DetailCardProps, blockchains, bd } from '../../config';

const DetailCard = (props: DetailCardProps) => {
  const { t } = useTranslation('solutions');
  const theme = useTheme();
  const { isDesktop } = useWindowDimensions();
  const { image, icon, title, desc1, desc2, desc3, url, extra } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          [theme.breakpoints.up('laptop')]: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
          },
        }}
      >
        <Box
          sx={{
            paddingBottom: isDesktop ? 0 : theme.spacing(4),
            width: '100%',
            '> span': { width: '100%!important' as any },
            [theme.breakpoints.up('tablet')]: {
              width: 'initial',
            },
          }}
        >
          <Image
            src={image}
            objectFit="contain"
            width={isDesktop ? '427px' : '272px'}
            height={isDesktop ? '270px' : '170px'}
            quality={100}
          />
        </Box>
        <Box>
          <Image
            src={icon}
            objectFit="contain"
            width="52px"
            height="52px"
            quality={100}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: theme.spacing(2.5),
              //   paddingBottom: theme.spacing(3),
              textAlign: 'left',
              color: 'primary.main',
              paddingTop: theme.spacing(2),
              [theme.breakpoints.up('laptop')]: {
                fontSize: theme.spacing(4),
              },
            }}
          >
            {t(title)}
          </Typography>
          <Box
            component="ul"
            sx={{
              color: 'primary.main',
              padding: theme.spacing(4, 0),
              '& li': {
                // listStyleType: 'none',
                listStylePosition: 'inside',
              },
            }}
          >
            <Box component="li">{t(desc1)}</Box>
            <Box component="li">{t(desc2)}</Box>
            <Box component="li">{t(desc3)}</Box>
          </Box>
          <Button
            sx={styles.button}
            href={url || ''}
            disabled={!url}
            rel="noreferrer"
            target="_blank"
          >
            <ExploreIcon />
          </Button>
        </Box>
        {extra && !isDesktop && (
          <>
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
                  fontSize: theme.spacing(2.25),
                  padding: theme.spacing(4, 0, 0, 3),
                  textAlign: 'left',
                  [theme.breakpoints.up('laptop')]: {
                    fontSize: theme.spacing(4),
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
                  justifyContent: 'space-between',
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
                            i === bd.length - 1 ? 0 : theme.spacing(6),
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
                    {isDesktop && i < bd.length - 1 && (
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
          </>
        )}
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{
            borderColor: theme.palette.primary.main,
            opacity: 0.3,
            margin: theme.spacing(4, 0, 4, 0),
            [theme.breakpoints.up('laptop')]: {
              display: 'none',
            },
          }}
        />
      </Box>
      <Divider
        orientation="horizontal"
        variant="middle"
        flexItem
        sx={{
          borderColor: theme.palette.primary.main,
          opacity: 0.3,
          margin: theme.spacing(4, 0, 4, 0),
          [theme.breakpoints.down('laptop')]: {
            display: 'none',
          },
        }}
      />
    </Box>
  );
};

export default DetailCard;
