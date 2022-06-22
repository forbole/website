import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { useWindowDimensions } from '@hooks';

const CareersHeader = () => {
  const theme = useTheme();
  const { t } = useTranslation('careers');
  const { isDesktop } = useWindowDimensions();
  return (
    <Box
      sx={{
        [theme.breakpoints.up('laptop')]: {
          width: '100%',
          margin: 'auto',
          letterSpacing: '0.028em',
        },
      }}
    >
      <Typography
        variant="h2"
        pt={theme.spacing(12)}
        textAlign="center"
        letterSpacing="0.0015em"
        fontWeight={700}
        color="primary.main"
        sx={{
          fontSize: theme.spacing(3),
          [theme.breakpoints.up('laptop')]: {
            fontSize: theme.spacing(5),
            paddingTop: theme.spacing(20),
          },
        }}
      >
        {t('heading')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          [theme.breakpoints.up('laptop')]: {
            flexDirection: 'column-reverse',
          },
        }}
      >
        <Box pt={3.75}>
          <img
            src="/images/assets/icon_careers.svg"
            alt="careers"
            style={{ width: isDesktop ? 372 : 220 }}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            textAlign="center"
            letterSpacing="0.0015em"
            fontWeight={400}
            color="primary.main"
            sx={{
              fontSize: theme.spacing(1.75),
              paddingTop: theme.spacing(3.5),
              [theme.breakpoints.up('laptop')]: {
                fontSize: theme.spacing(2.5),
                paddingTop: theme.spacing(4.25),
              },
            }}
          >
            {t('description 1')}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            letterSpacing="0.0015em"
            fontWeight={400}
            color="primary.main"
            sx={{
              fontSize: theme.spacing(1.75),
              paddingTop: theme.spacing(3),
              [theme.breakpoints.up('laptop')]: {
                fontSize: theme.spacing(2.5),
                paddingTop: theme.spacing(4),
              },
            }}
          >
            {t('description 2')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CareersHeader;
