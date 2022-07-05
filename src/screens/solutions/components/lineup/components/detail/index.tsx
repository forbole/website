import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { ExploreIcon } from '@icons';
import { styles } from './styles';
import { DetailCardProps, blockchains, bd } from '../../config';

const DetailCard = (props: DetailCardProps) => {
  const { t } = useTranslation('solutions');
  const theme = useTheme();
  const { image, icon, title, desc1, desc2, desc3, url, details } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}
    >
      <Image
        src={image}
        // layout="fill"
        objectFit="contain"
        width="272px"
        height="170px"
        quality={100}
      />
      <Image
        src={icon}
        // layout="fill"
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
          [theme.breakpoints.up('laptop')]: {
            fontSize: theme.spacing(4),
          },
        }}
      >
        {t(title)}
      </Typography>
      <Box component="ul" sx={{ padding: theme.spacing(4, 0) }}>
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
      {details && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              border: '1px solid rgba(195, 204, 226, 0.3)',
              borderRadius: theme.spacing(5.25),
              color: 'primary.main',
              background: 'transparent',
              // height: '324px',
              padding: theme.spacing(3.5),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              [theme.breakpoints.up('laptop')]: {
                //   width: '296px',
                //   height: '373px',
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: theme.spacing(2.25),
                paddingBottom: theme.spacing(3),
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
              // height: '324px',
              padding: theme.spacing(3.5),
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gridGap: theme.spacing(5),
              [theme.breakpoints.up('laptop')]: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                //   width: '296px',
                //   height: '373px',
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
                    flexDirection: 'column',
                    color: 'primary.main',
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
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DetailCard;
