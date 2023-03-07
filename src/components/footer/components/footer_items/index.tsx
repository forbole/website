import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { FooterProps } from '../../types';

const FooterItems = ({ staking }: FooterProps) => {
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
        color: staking
          ? theme.palette.custom.forbole.indigo
          : theme.palette.primary.main,
        padding: staking ? theme.spacing(2, 0, 4, 0) : theme.spacing(6, 0),
        '> .MuiTypography-root': {
          fontSize: theme.spacing(1.75),
        },
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
          borderColor: staking
            ? theme.palette.custom.forbole.indigo
            : theme.palette.primary.main,
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
          borderColor: staking
            ? theme.palette.custom.forbole.indigo
            : theme.palette.primary.main,
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
    </Box>
  );
};

export default FooterItems;
