import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Typography sx={{ fontSize: theme.typography.h1 }}>
      {t('hello world')}
    </Typography>
  );
};

export default Home;
