import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';

const MissionHeader = () => {
  const theme = useTheme();
  const { t } = useTranslation('mission');
  return (
    <Box>
      <Typography
        variant="h2"
        pt={theme.spacing(20)}
        // pb={theme.spacing(2.5)}
        textAlign="center"
        letterSpacing="0.0015em"
        fontWeight={700}
        color="primary.main"
        sx={{
          fontSize: theme.spacing(3),
          [theme.breakpoints.up('laptop')]: {
            fontSize: theme.spacing(5),
          },
        }}
      >
        {t('heading')}
      </Typography>
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
        {t('description')}
      </Typography>
    </Box>
  );
};

export default MissionHeader;
