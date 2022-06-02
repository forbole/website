import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Layout } from '@components';
// import { useWindowDimensions } from '@src/hooks';
import { ContactForm } from './components';

const Contact = () => {
  const { t } = useTranslation('contact');
  const theme = useTheme();
  //   const { width, height } = useWindowDimensions();
  return (
    <Layout title={t('title')} navLink="/contact" footer>
      <Box
        sx={{
          backgroundImage: 'url(/images/assets/image_BG.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // backgroundPosition: '52px -59px',
          minHeight: '85vh',
          //   height,
          height: '150vh',
          padding: theme.spacing(0, 3),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            paddingTop: theme.spacing(12),
            color: theme.palette.primary.main,
            fontSize: theme.spacing(3),
            fontWeight: 700,
            letterSpacing: '0.0015em',
            paddingBottom: theme.spacing(5),
          }}
        >
          {t('heading')}
        </Typography>
        <ContactForm />
      </Box>
    </Layout>
  );
};

export default Contact;
