import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { ExploreIcon } from '@icons';
import { styles } from './styles';
import { ProductCardProps } from '../../config';

const ProductCard = (props: ProductCardProps) => {
  const { t } = useTranslation('solutions');
  const theme = useTheme();
  const { icon, title, desc, url } = props;
  return (
    <Box
      sx={{
        border: '1px solid rgba(195, 204, 226, 0.3)',
        borderRadius: theme.spacing(5.25),
        color: 'primary.main',
        background: 'transparent',
        height: '324px',
        padding: theme.spacing(3.5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        [theme.breakpoints.up('laptop')]: {
          width: '296px',
          height: '373px',
        },
      }}
    >
      <Box
        // height={isDesktop ? '416px' : '180px'}
        sx={{
          '> span': {
            // width: '100%!important' as any,
          },
        }}
      >
        <Image
          src={icon}
          // layout="fill"
          objectFit="contain"
          width="52px"
          height="52px"
          quality={100}
        />
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          fontSize: theme.spacing(2.25),
          //   paddingBottom: theme.spacing(3),
          textAlign: 'left',
          [theme.breakpoints.up('laptop')]: {
            fontSize: theme.spacing(4),
          },
        }}
      >
        {t(title)}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 400,
          fontSize: theme.spacing(1.75),
          //   paddingBottom: theme.spacing(3),
          textAlign: 'left',
          [theme.breakpoints.up('laptop')]: {
            fontSize: theme.spacing(2),
          },
        }}
      >
        {t(desc)}
      </Typography>
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
  );
};

export default ProductCard;
