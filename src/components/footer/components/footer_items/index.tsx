import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

const FooterItems = () => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const today = new Date();
  const year = today.getFullYear();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.primary.main,
        fontSize: theme.spacing(2),
        paddingTop: theme.spacing(4),
        paddingBottom: 4,
        [theme.breakpoints.up('laptop')]: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 0,
          paddingBottom: 0,
          '& hr': {
            mx: 2,
          },
        },
      }}
    >
      <Typography>{t('copyright', { year })}</Typography>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          borderColor: theme.palette.primary.main,
          [theme.breakpoints.down('laptop')]: {
            display: 'none',
          },
        }}
      />
      <Link href="/terms-and-conditions">
        <Typography
          sx={{
            '&:hover': {
              cursor: 'pointer',
              color: theme.palette.custom.forbole.purple,
            },
          }}
        >
          {t('tnc')}
        </Typography>
      </Link>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          borderColor: theme.palette.primary.main,
          [theme.breakpoints.down('laptop')]: {
            display: 'none',
          },
        }}
      />
      <Link href="/privacy-policy">
        <Typography
          sx={{
            '&:hover': {
              cursor: 'pointer',
              color: theme.palette.custom.forbole.purple,
            },
          }}
        >
          {t('policy')}
        </Typography>
      </Link>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          borderColor: theme.palette.primary.main,
          [theme.breakpoints.down('laptop')]: {
            display: 'none',
          },
        }}
      />
      <Link href="/staking-services-terms">
        <Typography
          sx={{
            '&:hover': {
              cursor: 'pointer',
              color: theme.palette.custom.forbole.purple,
            },
          }}
        >
          {t('staking terms')}
        </Typography>
      </Link>
    </Box>
  );
};

export default FooterItems;
