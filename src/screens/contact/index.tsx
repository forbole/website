import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Layout } from '@components';
import { ContactForm, ContactInfo } from './components';
import useContactForm from './hooks';
import { styles } from './styles';

const Contact = () => {
  const { t } = useTranslation('contact');
  const theme = useTheme();
  const {
    inputs,
    handleInputChange,
    handleMouseDownClear,
    handleSubmit,
    handleClear,
    canSubmit,
  } = useContactForm();
  return (
    <Layout title={t('title')} navLink="/contact" footer>
      <Box
        sx={{
          padding: theme.spacing(0, 3),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '140vh',
          [theme.breakpoints.down('laptop')]: {
            minHeight: 'auto',
          },
          [theme.breakpoints.up('laptop')]: { minHeight: '130vh' },
        }}
      >
        <Box sx={{ [theme.breakpoints.up('laptop')]: { maxWidth: '1200px' } }}>
          <Typography
            variant="h2"
            sx={{
              paddingTop: theme.spacing(12),
              color: theme.palette.primary.main,
              fontSize: theme.spacing(3),
              fontWeight: 700,
              letterSpacing: '0.0015em',
              paddingBottom: theme.spacing(5),
              textAlign: 'center',
              [theme.breakpoints.up('laptop')]: {
                fontSize: theme.spacing(5),
                paddingTop: theme.spacing(20),
                textAlign: 'left',
              },
            }}
          >
            {t('heading')}
          </Typography>
          <Box sx={styles.gridBox}>
            <ContactForm
              inputs={inputs}
              handleInputChange={handleInputChange}
              handleMouseDownClear={handleMouseDownClear}
              handleSubmit={handleSubmit}
              handleClear={handleClear}
              canSubmit={canSubmit}
            />
            <ContactInfo handleSubmit={handleSubmit} canSubmit={canSubmit} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Contact;
