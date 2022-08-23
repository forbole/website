import React from 'react';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { ContactCard } from './components';

const Trans = dynamic(() => import('next-translate/Trans'), { ssr: false });

const ContactForbole = () => {
  const { t } = useTranslation('staking');
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          padding: theme.spacing(5, 3),
          '> h3': {
            fontWeight: 700,
            fontSize: theme.spacing(3),
            textAlign: 'center',
            '> h3': {
              fontWeight: 700,
              fontSize: theme.spacing(3),
              textAlign: 'center',
              display: 'inline',
            },
          },
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textShadow:
              '0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)',
            fontWeight: 600,
            fontSize: theme.spacing(2),
            textAlign: 'center',
            paddingBottom: theme.spacing(5),
            [theme.breakpoints.up('laptop')]: {
              fontWeight: 700,
              fontSize: theme.spacing(3),
            },
          }}
        >
          {t('contact Forbole')}
        </Typography>
        <Trans
          i18nKey={t('contact forbole title')}
          components={[
            <Typography
              variant="h3"
              sx={{ color: theme.palette.custom.forbole.indigo6 }}
            />,
            <Typography
              variant="h3"
              sx={{
                background:
                  'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            />,
          ]}
        />
        <ContactCard />
      </Box>
    </Box>
  );
};

export default ContactForbole;
