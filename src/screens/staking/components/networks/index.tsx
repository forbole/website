import React from 'react';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { SearchBar, NetworkGrid } from './components';

const Trans = dynamic(() => import('next-translate/Trans'), { ssr: false });

const Networks = () => {
  const { t } = useTranslation('staking');
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          padding: theme.spacing(5, 3),
          '> .h3': {
            fontWeight: 700,
            fontSize: theme.spacing(3),
            textAlign: 'center',
            [theme.breakpoints.up('laptop')]: {
              fontSize: theme.spacing(5),
            },
            '> .h3': {
              fontWeight: 700,
              fontSize: theme.spacing(3),
              textAlign: 'center',
              display: 'inline',
              [theme.breakpoints.up('laptop')]: {
                fontSize: theme.spacing(5),
              },
            },
          },
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
            '> .h3': {
              margin: 'auto',
              width: '65%',
            },
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textShadow:
              '0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)',
            fontWeight: 600,
            fontSize: theme.spacing(2),
            textAlign: 'center',
            paddingBottom: theme.spacing(3),
            [theme.breakpoints.up('laptop')]: {
              fontWeight: 700,
              fontSize: theme.spacing(3),
            },
          }}
        >
          {t('stake with Forbole')}
        </Typography>
        <Trans
          i18nKey={t('stake with Forbole title')}
          components={[
            <Box
              className="h3"
              sx={{
                color: theme.palette.custom.forbole.indigo6,
              }}
            />,
            <Box
              className="h3"
              sx={{
                background:
                  'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            />,
          ]}
        />
        <Typography
          variant="body1"
          sx={{
            textShadow:
              '0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)',
            fontWeight: 400,
            fontSize: theme.spacing(2),
            textAlign: 'center',
            padding: theme.spacing(3, 0, 3, 0),
            color: theme.palette.custom.forbole.blue,
            [theme.breakpoints.up('laptop')]: {
              fontWeight: 400,
              fontSize: theme.spacing(3),
            },
          }}
        >
          {t('stake with Forbole desc')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <SearchBar label="" network={[]} />
          <NetworkGrid />
        </Box>
      </Box>
    </Box>
  );
};

export default Networks;
