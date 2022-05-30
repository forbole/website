import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

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
        color: theme.palette.primary.main,
        fontSize: theme.spacing(2),
        [theme.breakpoints.up('laptop')]: {
          flexDirection: 'row',
          alignItems: 'center',
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
      <Typography>{t('tnc')}</Typography>
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
      <Typography>{t('policy')}</Typography>
    </Box>
  );
};

export default FooterItems;
