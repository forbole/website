import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Layout } from '@components';

const Home = () => {
  const { t } = useTranslation('home');
  const theme = useTheme();
  return (
    <Layout
      title={t('forbole')}
      description={t('description')}
      image="/static/images/assets/Facebook-Forbole.png"
      twitterImage="/static/images/assets/Twitter-Forbole.png"
    >
      <Typography
        sx={(s) => ({
          [s.breakpoints.up('tablet')]: { fontSize: theme.typography.h1 },
          // fontSize: { sm: '10px', lg: theme.typography.h1 },
        })}
      >
        {t('hello world')}
      </Typography>
      {/* <Typography
        sx={{
          fontSize: theme.typography.h1,
          color: { sm: 'red', md: 'black' },
        }}
      >
        {t('hello world')}
      </Typography> */}
    </Layout>
  );
};

export default Home;
