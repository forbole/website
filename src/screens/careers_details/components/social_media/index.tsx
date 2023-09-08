/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import { Box, useTheme } from '@mui/material';
import { Telegram, Facebook, Twitter, LinkedIn } from '@icons';

interface SocialMediaProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  noPadding?: boolean;
}

const SocialMedia = (props: SocialMediaProps) => {
  const theme = useTheme();
  const { title = 'Forbole ', noPadding } = props;
  const router = useRouter();
  const path = router.asPath;
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}${path}`;

  const handleClick = (url: string) => {
    const config: { [key: string]: string | number } = {
      height: 400,
      width: 550,
      location: 'no',
      toolbar: 'no',
      status: 'no',
      directories: 'no',
      menubar: 'no',
      scrollbars: 'yes',
      resizable: 'no',
      centerscreen: 'yes',
      chrome: 'yes',
    };

    window.open(
      url,
      '',
      Object.keys(config)
        .map((key) => `${key}=${config[key]}`)
        .join(', ')
    );
  };
  return (
    <Box
      sx={{
        paddingBottom: noPadding ? 0 : theme.spacing(3),
        '& svg': {
          marginRight: theme.spacing(2),
          '& path': {
            fill:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.main
                : theme.palette.custom.forbole.indigo,
          },
          '&:hover': {
            cursor: 'pointer',
            borderRadius: '50%',
            background:
              theme.palette.mode === 'dark'
                ? theme.palette.custom.forbole.indigo
                : 'rgba(29, 30, 34, 0.3)',
          },
        },
      }}
    >
      <span
        onClick={() =>
          handleClick(
            `https://telegram.me/share/?url=${shareUrl}&text=${title}`
          )
        }
      >
        <Telegram />
      </span>
      <span
        onClick={() =>
          handleClick(
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${title}`
          )
        }
      >
        <Facebook />
      </span>
      <span
        onClick={() =>
          handleClick(
            `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`
          )
        }
      >
        <Twitter />
      </span>
      <span
        onClick={() =>
          handleClick(
            `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&text=${title}`
          )
        }
      >
        <LinkedIn />
      </span>
    </Box>
  );
};

export default SocialMedia;