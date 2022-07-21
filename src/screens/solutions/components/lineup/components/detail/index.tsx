import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { ExploreIcon } from '@icons';
import { useWindowDimensions } from '@hooks';
import { styles } from './styles';
import { DetailCardProps } from '../../config';

const DetailCard = (props: DetailCardProps) => {
  const { t } = useTranslation('solutions');
  const theme = useTheme();
  const { isDesktop } = useWindowDimensions();
  const { image, icon, title, desc1, desc2, desc3, url, last } = props;
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
            '> span': {
              width: '100%!important' as any,
              '> img': {
                borderRadius: theme.spacing(1.5),
              },
            },
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
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{
            borderColor: theme.palette.primary.main,
            opacity: 0.3,
            margin: theme.spacing(4, 0, 4, 0),
            display: last ? 'none' : 'inherit',
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
          display: last ? 'none' : 'inherit',
          [theme.breakpoints.down('laptop')]: {
            display: 'none',
          },
        }}
      />
    </Box>
  );
};

export default DetailCard;
