import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Card, Typography, useTheme } from '@mui/material';
import { icons } from '../../../config';

const AboutUsDesktop = () => {
  const { t } = useTranslation('about');
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" maxWidth="1200px" width="100%">
      <Typography
        variant="h2"
        fontSize={theme.spacing(5)}
        pt={theme.spacing(20)}
        pb={theme.spacing(2.5)}
        textAlign="left"
        letterSpacing="0.0015em"
        fontWeight={700}
        color="primary.main"
      >
        {t('title')}
      </Typography>
      <Typography
        variant="body1"
        fontSize={theme.spacing(2.5)}
        pb={theme.spacing(6)}
        textAlign="left"
        letterSpacing="0.0015em"
        fontWeight={400}
        color="primary.main"
      >
        {t('intro 1')}
      </Typography>
      <Card
        sx={{
          color: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          background: 'transparent',
          border: '2px solid rgba(195, 204, 226, 0.3)',
          borderRadius: 2,
          padding: 5,
        }}
      >
        <Typography
          variant="h3"
          fontSize={theme.spacing(4)}
          mb={theme.spacing(4.5)}
          textAlign="left"
          letterSpacing="0.0015em"
          fontWeight={600}
          color="primary.main"
        >
          {t('heading 1')}
        </Typography>
        <Typography
          variant="h3"
          fontSize={theme.spacing(2)}
          mb={theme.spacing(2.25)}
          textAlign="left"
          letterSpacing="0.0015em"
          fontWeight={400}
          color="primary.main"
        >
          {t('intro 2')}
        </Typography>
        <Typography
          variant="h3"
          fontSize={theme.spacing(2)}
          textAlign="left"
          letterSpacing="0.0015em"
          fontWeight={400}
          color="primary.main"
        >
          {t('intro 3')}
        </Typography>
        <Box
          display="flex"
          justifyItems="center"
          alignItems="center"
          flexDirection="row"
          mt={theme.spacing(4.5)}
        >
          {icons.map((item) => {
            const { title, picture } = item;
            return (
              <Box
                key={Math.random()}
                display="flex"
                justifyItems="center"
                alignItems="center"
                flexDirection="column"
                width="100%"
              >
                <img src={picture} alt="icon" height="80px" width="80px" />
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  textAlign="center"
                  fontWeight={600}
                  fontSize={theme.spacing(2.5)}
                  mb={theme.spacing(3.5)}
                >
                  {t(title)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
};

export default AboutUsDesktop;
