/* eslint-disable react/require-default-props */
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { getSocialMediaInfo } from '@utils/social_media_info';
import { socialKeys } from './config';
import { SocialMediaProps } from '../../types';

const SocialMedia = ({ contact, staking }: SocialMediaProps) => {
  const socialMediaInfo = socialKeys.map((x) => getSocialMediaInfo(x));
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        ...(contact && {
          [theme.breakpoints.up('laptop')]: {
            justifyContent: 'space-between',
            width: '80%',
          },
        }),
        'svg path': {
          transition: '0.3s',
          fill: staking
            ? theme.palette.custom.forbole.indigo
            : 'rgba(250, 250, 250, 1)',
        },
        a: {
          alignItems: 'center',
          display: 'flex',
          '& svg': {
            '&:hover': {
              borderRadius: '50%',
              background: theme.palette.custom.forbole.indigo,
            },
          },
          '&:hover': {
            cursor: 'pointer',
            'svg path': {
              fill: 'rgba(250, 250, 250, 1)',
            },
          },
          [theme.breakpoints.up('laptop')]: {
            paddingRight: '1rem',
          },
        },
      }}
    >
      {socialMediaInfo.map((x) => {
        return (
          <a key={x.key} href={x.url} target="_blank" rel="noreferrer">
            <x.component />
          </a>
        );
      })}
    </Box>
  );
};

export default SocialMedia;
