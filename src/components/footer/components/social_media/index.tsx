import React from 'react';
import { Box, useTheme } from '@mui/material';
import { getSocialMediaInfo } from '@utils/social_media_info';
import { socialKeys } from './config';

interface SocialMediaProps {
  // eslint-disable-next-line react/require-default-props
  contact?: boolean;
}

const SocialMedia = ({ contact }: SocialMediaProps) => {
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
          fill: 'rgba(250, 250, 250, 1)',
        },
        a: {
          paddingRight: '1rem',
          alignItems: 'center',
          display: 'flex',
          '&:hover': {
            cursor: 'pointer',
            'svg path': {
              fill: 'rgba(250, 250, 250, 1)',
            },
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
