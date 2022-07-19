import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { ProductCard } from './components';
import { products } from './config';

const Overview = () => {
  const theme = useTheme();
  const { t } = useTranslation('solutions');
  return (
    <Box>
      <Typography
        variant="h2"
        pt={theme.spacing(12)}
        pb={theme.spacing(4)}
        textAlign="center"
        letterSpacing="0.0015em"
        fontWeight={700}
        color="primary.main"
        sx={{
          fontSize: theme.spacing(3),
          [theme.breakpoints.up('laptop')]: {
            fontSize: theme.spacing(8),
          },
        }}
      >
        {t('title')}
      </Typography>
      <Box
        sx={{
          //   display: 'flex',
          //   flexDirection: 'column',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'repeat(4, 1fr)',
          gridGap: theme.spacing(3),
          [theme.breakpoints.up('laptop')]: {
            // display: 'grid',
            // gridTemplateColumns: '1fr 1fr 1fr',
            // gridTemplateRows: 'repeat(2, 1fr)',
            // gridGap: theme.spacing(7),
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        }}
      >
        {products.map((product, i) => {
          const { icon, title, desc, url } = product;
          return (
            <ProductCard
              key={i}
              icon={icon}
              title={title}
              desc={desc}
              url={url}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Overview;
