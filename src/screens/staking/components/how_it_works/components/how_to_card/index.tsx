/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const HowToCard = (props: any) => {
  const { t } = useTranslation('staking');
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('laptop'));
  const { image, title, desc } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: theme.spacing(4, 3),
        background: theme.palette.common.white,
        borderRadius: theme.spacing(3),
        boxShadow:
          '0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)',
      }}
    >
      <Image src={image} objectFit="contain" width="100%" height="60px" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography
          variant="h4"
          color={theme.palette.custom.forbole.blue}
          fontWeight={600}
          sx={{
            padding: theme.spacing(5.75, 0, 3, 0),
            fontSize: theme.spacing(2.25),
            [theme.breakpoints.up('laptop')]: {
              fontSize: theme.spacing(2.5),
              padding: theme.spacing(2.5, 0),
            },
          }}
        >
          {t(title)}
        </Typography>
        <Typography
          variant="body1"
          color={theme.palette.custom.forbole.blue}
          fontSize={onlyLargeScreen ? theme.spacing(2) : theme.spacing(1.75)}
          sx={{
            textAlign: 'start',
            lineHeight: theme.spacing(2.5),
            [theme.breakpoints.up('laptop')]: {
              lineHeight: theme.spacing(3),
            },
          }}
        >
          {t(desc)}
        </Typography>
      </Box>
    </Box>
  );
};

export default HowToCard;
