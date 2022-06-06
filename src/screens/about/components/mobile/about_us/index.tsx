import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
// import { useGetComponentDimension } from '@hooks';
import { styles } from './styles';
import { icons } from '../../../config';

const AboutUs = () => {
  const { t } = useTranslation('about');
  const theme = useTheme();
  return (
    <Box sx={styles.contentBox}>
      <Box>
        <Typography
          variant="h2"
          component="div"
          textAlign="center"
          sx={{
            paddingTop: theme.spacing(13),
            color: theme.palette.primary.main,
            fontSize: theme.spacing(3),
            fontWeight: 700,
            letterSpacing: '0.0015em',
            marginBottom: theme.spacing(3.5),
            //   [theme.breakpoints.up('laptop')]: {
            //     fontSize: theme.spacing(5),
            //     paddingTop: theme.spacing(20),
            //   },
          }}
        >
          {t('title')}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          textAlign="center"
          fontWeight={400}
          fontSize={theme.spacing(1.75)}
        >
          {t('intro 1')}
        </Typography>
      </Box>
      <Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
          fontWeight={600}
          fontSize={theme.spacing(2.5)}
          mt={10}
          mb={theme.spacing(3.5)}
        >
          {t('heading 1')}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          textAlign="center"
          fontWeight={400}
          fontSize={theme.spacing(1.75)}
          marginBottom={theme.spacing(3)}
        >
          {t('intro 2')}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          textAlign="center"
          fontWeight={400}
          fontSize={theme.spacing(1.75)}
        >
          {t('intro 3')}
        </Typography>
      </Box>
      <Box mt={10}>
        {icons.map((item) => {
          const { icon, title } = item;
          const Svg = icon;
          return (
            <Box
              display="flex"
              justifyItems="center"
              alignItems="center"
              flexDirection="column"
            >
              <Svg />
              {t(title)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AboutUs;
